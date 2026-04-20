import { NextRequest, NextResponse } from "next/server"
import {
  sendRestaurantCateringInquiry,
  sendGuestCateringThankYou,
} from "@/lib/emails"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, date, guests, type, location, message, lang, honeypot } = body ?? {}

    if (honeypot) return NextResponse.json({ ok: true, id: 0 })

    if (!name || !email || !date || !guests) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const entry = {
      id: Date.now(),
      name:     String(name).slice(0, 120),
      email:    String(email).slice(0, 160),
      phone:    String(phone ?? "").slice(0, 60),
      date:     String(date).slice(0, 40),
      guests:   Number(guests) || 0,
      type:     String(type ?? "").slice(0, 80),
      location: String(location ?? "").slice(0, 200),
      message:  String(message ?? "").slice(0, 2000),
      lang:     (lang === "en" ? "en" : "de") as "de" | "en",
      createdAt: new Date().toISOString(),
    }

    console.log("[catering]", entry)

    if (process.env.RESEND_API_KEY) {
      await Promise.allSettled([
        sendRestaurantCateringInquiry(entry),
        sendGuestCateringThankYou(entry),
      ])
    }

    return NextResponse.json({ ok: true, id: entry.id })
  } catch (err) {
    console.error("Catering POST error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
