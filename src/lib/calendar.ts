import { google, calendar_v3 } from "googleapis"

const TIMEZONE = "Europe/Berlin"

// Re-escape raw newlines that appear inside JSON string values so JSON.parse
// can handle env-var values stored with literal newlines (common with multi-line
// service-account JSON pasted into .env files or Vercel dashboard).
function fixJsonNewlines(s: string): string {
  let out = "", inStr = false, prev = ""
  for (const c of s) {
    if (c === '"' && prev !== "\\") inStr = !inStr
    if (c === "\n" && inStr) out += "\\n"
    else out += c
    prev = c
  }
  return out
}

function getServiceAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not set")
  const trimmed = raw.trim()
  const credentials = trimmed.startsWith("{")
    ? JSON.parse(fixJsonNewlines(trimmed))
    : JSON.parse(Buffer.from(trimmed, "base64").toString("utf-8"))

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  })
}

function calendarClient(): calendar_v3.Calendar {
  return google.calendar({ version: "v3", auth: getServiceAuth() })
}

export type ReservationForCalendar = {
  name: string
  phone: string
  email?: string | null
  date: string
  time: string
  guests: number
  message?: string | null
}

function buildEventBody(entry: ReservationForCalendar): calendar_v3.Schema$Event {
  const [h, m] = entry.time.split(":").map(Number)
  const endMins = h * 60 + m + 90
  const endTime = `${String(Math.floor(endMins / 60)).padStart(2, "0")}:${String(endMins % 60).padStart(2, "0")}:00`

  const description = [
    entry.phone && `Phone: ${entry.phone}`,
    entry.email && `Email: ${entry.email}`,
    entry.message && `Note: ${entry.message}`,
  ].filter(Boolean).join("\n")

  return {
    summary: `Reservation: ${entry.name} (${entry.guests} ${entry.guests === 1 ? "guest" : "guests"})`,
    description,
    location: "Trattoria Marano, Ohlmüllerstr. 22, 81541 München",
    start: { dateTime: `${entry.date}T${entry.time}:00`, timeZone: TIMEZONE },
    end:   { dateTime: `${entry.date}T${endTime}`,       timeZone: TIMEZONE },
  }
}

export async function createCalendarEvent(
  calendarId: string,
  entry: ReservationForCalendar,
): Promise<string | null> {
  try {
    const { data } = await calendarClient().events.insert({
      calendarId,
      requestBody: buildEventBody(entry),
    })
    return data.id ?? null
  } catch (err) {
    console.error("[calendar] createEvent failed:", err)
    return null
  }
}

export async function deleteCalendarEvent(
  calendarId: string,
  eventId: string,
): Promise<boolean> {
  try {
    await calendarClient().events.delete({ calendarId, eventId })
    return true
  } catch (err) {
    console.error("[calendar] deleteEvent failed:", err)
    return false
  }
}

export async function listCalendars(): Promise<Array<{
  id: string | null | undefined
  summary: string | null | undefined
  primary: boolean
  color: string | null | undefined
}>> {
  const { data } = await calendarClient().calendarList.list()
  return (data.items ?? []).map(c => ({
    id: c.id,
    summary: c.summary,
    primary: c.primary ?? false,
    color: c.backgroundColor,
  }))
}
