import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { sendReservationEmails } from "@/lib/emails"
import { getConfig } from "@/lib/config-store"
import { createReservation, getAllReservations, setCalendarEventId } from "@/lib/reservations-store"
import { createCalendarEvent } from "@/lib/calendar"

const ALLOWED_EMAIL = "maranotrattoria@gmail.com"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, phone, email, date, time, guests, message, lang, allergies, honeypot } = body

  if (honeypot) return NextResponse.json({ ok: true, id: 0 })

  if (!name || !phone || !date || !time || !guests) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const config = await getConfig().catch(() => null)
  if (config && config.reservationsOpen === false) {
    return NextResponse.json({ error: "Reservations closed", code: "reservations_closed" }, { status: 423 })
  }

  const normalizedLang: "de" | "en" = lang === "en" ? "en" : "de"

  const allergyNote = allergies?.trim() ? `[${normalizedLang === "de" ? "Allergien" : "Allergies"}] ${allergies.trim()}` : null
  const fullMessage = [message, allergyNote].filter(Boolean).join("\n\n") || null

  const reservation = await createReservation({
    name, phone, email, date, time,
    guests: Number(guests),
    message: fullMessage, lang: normalizedLang,
  })

  if (config?.calendarId) {
    const eventId = await createCalendarEvent(config.calendarId, {
      name, phone, email, date, time, guests: Number(guests), message,
    })
    if (eventId) {
      await setCalendarEventId(reservation.id, eventId).catch(err =>
        console.error("[reservations] failed to persist calendarEventId:", err))
    }
  }

  sendReservationEmails({
    id: reservation.id,
    name, phone, email, date, time,
    guests: Number(guests),
    message,
    cancelToken: reservation.cancelToken,
    lang: normalizedLang,
  }).catch(err => console.error("Email send failed:", err))

  return NextResponse.json({ ok: true, id: reservation.id })
}

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const reservations = await getAllReservations()
  return NextResponse.json({ reservations })
}
