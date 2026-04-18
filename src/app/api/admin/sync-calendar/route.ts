import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { google } from "googleapis"
import fs from "fs"
import path from "path"

const RES_PATH = path.join(process.cwd(), "src", "data", "reservations.json")

const ALLOWED_EMAIL = "maranotrattoria@gmail.com"
const TIMEZONE      = "Europe/Berlin"
const CALENDAR_ID   = "maranotrattoria@gmail.com"

type Reservation = {
  id: number
  name: string
  phone: string
  email?: string
  date: string
  time: string
  guests: number
  message?: string
  calendarEventId: string | null
  status: string
  [key: string]: unknown
}

function getServiceAuth() {
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!b64) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON not set")
  const credentials = JSON.parse(Buffer.from(b64, "base64").toString("utf-8"))
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  })
}

async function createCalendarEvent(
  auth: InstanceType<typeof google.auth.GoogleAuth>,
  entry: Reservation,
): Promise<string | null> {
  try {
    const [h, m]  = entry.time.split(":").map(Number)
    const endMins = h * 60 + m + 90
    const endTime = `${String(Math.floor(endMins / 60)).padStart(2, "0")}:${String(endMins % 60).padStart(2, "0")}:00`

    const description = [
      entry.phone   && `Phone: ${entry.phone}`,
      entry.email   && `Email: ${entry.email}`,
      entry.message && `Note: ${entry.message}`,
    ].filter(Boolean).join("\n")

    const calendar = google.calendar({ version: "v3", auth })
    const { data } = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: {
        summary:     `Reservation: ${entry.name} (${entry.guests} ${entry.guests === 1 ? "guest" : "guests"})`,
        description,
        location:    "Trattoria Marano, Ohlmüllerstr. 22, 81541 München",
        start: { dateTime: `${entry.date}T${entry.time}:00`, timeZone: TIMEZONE },
        end:   { dateTime: `${entry.date}T${endTime}`,       timeZone: TIMEZONE },
      },
    })
    return data.id ?? null
  } catch {
    return null
  }
}

export async function POST(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let auth: InstanceType<typeof google.auth.GoogleAuth>
  try {
    auth = getServiceAuth()
  } catch {
    return NextResponse.json({ error: "Service account not configured" }, { status: 500 })
  }

  const reservations: Reservation[] = JSON.parse(fs.readFileSync(RES_PATH, "utf-8"))
  const toSync = reservations.filter(r => !r.calendarEventId)

  let synced = 0
  let failed = 0

  for (const r of toSync) {
    const eventId = await createCalendarEvent(auth, r)
    if (eventId) {
      r.calendarEventId = eventId
      synced++
    } else {
      failed++
    }
  }

  if (synced > 0) {
    fs.writeFileSync(RES_PATH, JSON.stringify(reservations, null, 2))
  }

  return NextResponse.json({ synced, failed, total: toSync.length })
}
