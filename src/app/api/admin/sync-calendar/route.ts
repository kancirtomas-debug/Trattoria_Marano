import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getConfig } from "@/lib/config-store"
import { getUnsynced, setCalendarEventId } from "@/lib/reservations-store"
import { createCalendarEvent } from "@/lib/calendar"

const ALLOWED_EMAIL = "maranotrattoria@gmail.com"

export async function POST(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const config = await getConfig()
  if (!config.calendarId) {
    return NextResponse.json({ error: "Calendar not configured — save a calendar ID first" }, { status: 400 })
  }

  const toSync = await getUnsynced()
  let synced = 0
  let failed = 0

  for (const r of toSync) {
    const eventId = await createCalendarEvent(config.calendarId, {
      name: r.name, phone: r.phone,
      email: r.email ?? undefined,
      date: r.date, time: r.time, guests: r.guests,
      message: r.message ?? undefined,
    })
    if (eventId) {
      await setCalendarEventId(r.id, eventId)
      synced++
    } else {
      failed++
    }
  }

  return NextResponse.json({ synced, failed, total: toSync.length })
}
