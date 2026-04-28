import { NextRequest, NextResponse } from "next/server"
import { getByCancelToken, setStatus } from "@/lib/reservations-store"

type Lang = "de" | "en" | "it"

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token")
  if (!token) return new NextResponse("Invalid link.", { status: 400 })

  const reservation = await getByCancelToken(token)
  if (!reservation) return new NextResponse("Reservation not found.", { status: 404 })

  const lang: Lang =
    reservation.lang === "en" ? "en" : reservation.lang === "it" ? "it" : "de"

  if (reservation.status === "cancelled") {
    return new NextResponse(resultHtml(lang, "cancelled"), { headers: { "Content-Type": "text/html" } })
  }
  if (reservation.status === "confirmed") {
    return new NextResponse(resultHtml(lang, "already"), { headers: { "Content-Type": "text/html" } })
  }

  await setStatus(reservation.id, "confirmed")

  return new NextResponse(resultHtml(lang, "success"), { headers: { "Content-Type": "text/html" } })
}

function resultHtml(lang: Lang, state: "success" | "already" | "cancelled"): string {
  const copy = {
    de: {
      success:   { title: "Bestätigt · Grazie!",       body: "Wir freuen uns auf Sie und halten Ihren Tisch bereit." },
      already:   { title: "Bereits bestätigt",         body: "Ihre Reservierung ist bereits bestätigt. Bis gleich!" },
      cancelled: { title: "Reservierung storniert",    body: "Diese Reservierung wurde inzwischen storniert und kann nicht mehr bestätigt werden." },
    },
    en: {
      success:   { title: "Confirmed · Grazie!",       body: "We're looking forward to seeing you — your table is held." },
      already:   { title: "Already confirmed",         body: "Your reservation is already confirmed. See you soon!" },
      cancelled: { title: "Reservation cancelled",     body: "This reservation has been cancelled and can no longer be confirmed." },
    },
    it: {
      success:   { title: "Confermato · Grazie!",      body: "Siamo felici di accogliervi - il vostro tavolo è riservato." },
      already:   { title: "Già confermata",            body: "La vostra prenotazione è già confermata. A presto!" },
      cancelled: { title: "Prenotazione annullata",    body: "Questa prenotazione è stata annullata e non può più essere confermata." },
    },
  } as const
  const msg = copy[lang][state]

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${msg.title} – Trattoria Marano</title>
  <style>
    body { font-family: Helvetica, Arial, sans-serif; display: flex; align-items: center; justify-content: center;
           min-height: 100vh; margin: 0; background: #fdf8f5; color: #201515; }
    .card { max-width: 440px; text-align: center; padding: 2.5rem 2rem; border: 1px solid #e5e0d5;
            border-radius: 6px; background: #fffefb; }
    .kicker { font-family: Georgia, serif; font-size: 10px; letter-spacing: 0.3em;
              text-transform: uppercase; color: #6b1535; font-weight: 700; margin: 0 0 8px; }
    .brand { font-family: Georgia, serif; font-size: 22px; font-weight: 700; margin: 0 0 28px;
             letter-spacing: -0.01em; }
    h1 { font-family: Georgia, serif; font-size: 1.5rem; margin: 0 0 0.75rem; font-weight: 700; letter-spacing: -0.01em; }
    p  { color: #36342e; font-size: 0.95rem; line-height: 1.6; margin: 0; }
    a.back { display: inline-block; margin-top: 1.75rem; color: #fff; background: #6b1535;
             padding: 11px 22px; font-family: Georgia, serif; font-size: 12px; font-weight: 700;
             letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; border-radius: 3px; }
  </style>
</head>
<body>
  <div class="card">
    <p class="kicker">Since 2025 · München</p>
    <p class="brand">Trattoria Marano</p>
    <h1>${msg.title}</h1>
    <p>${msg.body}</p>
    <a class="back" href="/">${lang === "de" ? "Zur Website" : lang === "it" ? "Al sito" : "Back to site"}</a>
  </div>
</body>
</html>`
}
