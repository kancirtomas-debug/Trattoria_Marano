import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { google } from "googleapis"
import fs from "fs"
import path from "path"
import { sendReservationEmails } from "@/lib/emails"

const RES_PATH    = path.join(process.cwd(), "src", "data", "reservations.json")
const CONFIG_PATH = path.join(process.cwd(), "src", "data", "admin-config.json")

const ALLOWED_EMAIL = "maranotrattoria@gmail.com"
const TIMEZONE      = "Europe/Berlin"

async function createCalendarEvent(entry: {
  name: string; phone: string; email?: string
  date: string; time: string; guests: number; message?: string
}): Promise<string | null> {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"))
    if (!config.refreshToken) return null

    const oauth2 = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    )
    oauth2.setCredentials({ refresh_token: config.refreshToken })

    // Build start / end (dinner = 1.5 h)
    const [h, m]   = entry.time.split(":").map(Number)
    const endMins  = h * 60 + m + 90
    const endTime  = `${String(Math.floor(endMins / 60)).padStart(2, "0")}:${String(endMins % 60).padStart(2, "0")}:00`
    const startDT  = `${entry.date}T${entry.time}:00`
    const endDT    = `${entry.date}T${endTime}`

    const description = [
      entry.phone   && `Phone: ${entry.phone}`,
      entry.email   && `Email: ${entry.email}`,
      entry.message && `Note: ${entry.message}`,
    ].filter(Boolean).join("\n")

    const calendar = google.calendar({ version: "v3", auth: oauth2 })
    const { data } = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary:     `Reservation: ${entry.name} (${entry.guests} ${entry.guests === 1 ? "guest" : "guests"})`,
        description,
        location:    "Trattoria Marano",
        start: { dateTime: startDT, timeZone: TIMEZONE },
        end:   { dateTime: endDT,   timeZone: TIMEZONE },
      },
    })
    return data.id ?? null
  } catch (err) {
    console.error("Calendar event creation failed:", err)
    return null
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, phone, email, date, time, guests, message, lang } = body

  if (!name || !date || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"))
    if (cfg.reservationsOpen === false) {
      return NextResponse.json({ error: "Reservations closed", code: "reservations_closed" }, { status: 423 })
    }
  } catch { /* if config unreadable, default to open */ }

  const cancelToken  = crypto.randomUUID()
  const normalizedLang: "de" | "en" = lang === "en" ? "en" : "de"
  const reservations = JSON.parse(fs.readFileSync(RES_PATH, "utf-8"))
  const entry = {
    id: Date.now(),
    name, phone, email, date, time, guests, message,
    lang:            normalizedLang,
    cancelToken,
    calendarEventId: null as string | null,
    remindersSent:   [] as string[],
    createdAt:       new Date().toISOString(),
    status:          "pending",
  }
  reservations.unshift(entry)
  fs.writeFileSync(RES_PATH, JSON.stringify(reservations, null, 2))

  // Create Google Calendar event directly
  const eventId = await createCalendarEvent({ name, phone, email, date, time, guests, message })
  if (eventId) {
    entry.calendarEventId = eventId
    const list = JSON.parse(fs.readFileSync(RES_PATH, "utf-8"))
    const idx  = list.findIndex((r: { id: number }) => r.id === entry.id)
    if (idx !== -1) list[idx].calendarEventId = eventId
    fs.writeFileSync(RES_PATH, JSON.stringify(list, null, 2))
  }

  // Send emails (fire-and-forget)
  sendReservationEmails({
    id: entry.id, name, phone, email, date, time, guests, message, cancelToken,
    lang: normalizedLang,
  }).catch(err => console.error("Email send failed:", err))

  return NextResponse.json({ ok: true, id: entry.id })
}

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const reservations = JSON.parse(fs.readFileSync(RES_PATH, "utf-8"))
  return NextResponse.json({ reservations })
}
