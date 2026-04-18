import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import {
  sendGuest3hConfirmation,
  sendGuest1hReminder,
  sendGuestPostVisitThankYou,
  sendRestaurantUnconfirmedAlert,
} from "@/lib/emails"

const RES_PATH = path.join(process.cwd(), "src", "data", "reservations.json")

type Lang = "de" | "en"
type Reservation = {
  id: number
  email?: string
  name: string
  phone: string
  date: string
  time: string
  guests: number
  message?: string
  cancelToken: string
  status: string
  lang?: Lang
  remindersSent: string[]
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (
    process.env.NODE_ENV === "production" &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const reservations = JSON.parse(fs.readFileSync(RES_PATH, "utf-8")) as Reservation[]
  const now          = new Date()
  const sent: Array<{ id: number; key: string }> = []

  for (const r of reservations) {
    if (r.status === "cancelled") continue
    if (!Array.isArray(r.remindersSent)) r.remindersSent = []

    const [h, m]   = r.time.split(":").map(Number)
    const resTime  = new Date(`${r.date}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`)
    const diffMins = (resTime.getTime() - now.getTime()) / 60000

    const payload = {
      id: r.id, name: r.name, phone: r.phone, email: r.email,
      date: r.date, time: r.time, guests: r.guests, message: r.message,
      cancelToken: r.cancelToken, lang: r.lang,
    }

    // 3h before — guest confirmation request (window 150–210 min)
    if (r.email && !r.remindersSent.includes("3h") && diffMins >= 150 && diffMins <= 210) {
      try { await sendGuest3hConfirmation(payload); r.remindersSent.push("3h"); sent.push({ id: r.id, key: "3h" }) }
      catch (err) { console.error(`3h email failed for ${r.id}`, err) }
    }

    // 1h before — guest reminder (window 30–90 min)
    if (r.email && !r.remindersSent.includes("1h") && diffMins >= 30 && diffMins <= 90) {
      try { await sendGuest1hReminder(payload); r.remindersSent.push("1h"); sent.push({ id: r.id, key: "1h" }) }
      catch (err) { console.error(`1h email failed for ${r.id}`, err) }
    }

    // Unconfirmed alert — restaurant (same 1h window, only if guest has not confirmed)
    if (r.status !== "confirmed"
        && !r.remindersSent.includes("unconfirmed_alert")
        && diffMins >= 30 && diffMins <= 90) {
      try { await sendRestaurantUnconfirmedAlert(payload); r.remindersSent.push("unconfirmed_alert"); sent.push({ id: r.id, key: "unconfirmed_alert" }) }
      catch (err) { console.error(`unconfirmed alert failed for ${r.id}`, err) }
    }

    // Post-visit thank-you — guest (window 60–120 min AFTER reservation start)
    if (r.email && !r.remindersSent.includes("postvisit") && diffMins >= -120 && diffMins <= -60) {
      try { await sendGuestPostVisitThankYou(payload); r.remindersSent.push("postvisit"); sent.push({ id: r.id, key: "postvisit" }) }
      catch (err) { console.error(`postvisit email failed for ${r.id}`, err) }
    }
  }

  if (sent.length > 0) {
    fs.writeFileSync(RES_PATH, JSON.stringify(reservations, null, 2))
  }

  return NextResponse.json({ ok: true, sent })
}
