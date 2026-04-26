import { NextRequest, NextResponse } from "next/server"
import { getByCancelToken, setStatus } from "@/lib/reservations-store"
import { getConfig } from "@/lib/config-store"
import { deleteCalendarEvent } from "@/lib/calendar"

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token")
  if (!token) return new NextResponse("Invalid link.", { status: 400 })

  const reservation = await getByCancelToken(token)
  if (!reservation) return new NextResponse("Reservation not found.", { status: 404 })

  if (reservation.status === "cancelled") {
    return new NextResponse(cancelledHtml("already"), { headers: { "Content-Type": "text/html" } })
  }

  await setStatus(reservation.id, "cancelled")

  if (reservation.calendarEventId) {
    const config = await getConfig().catch(() => null)
    if (config?.calendarId) {
      await deleteCalendarEvent(config.calendarId, reservation.calendarEventId)
    }
  }

  return new NextResponse(cancelledHtml("success"), { headers: { "Content-Type": "text/html" } })
}

function cancelledHtml(state: "success" | "already") {
  const msg = state === "success"
    ? { title: "Reservierung storniert", body: "Ihre Reservierung wurde erfolgreich storniert. Wir hoffen, Sie bald begrüßen zu dürfen." }
    : { title: "Bereits storniert", body: "Diese Reservierung wurde bereits storniert." }

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${msg.title} – Trattoria Marano</title>
  <style>
    body { font-family: sans-serif; display: flex; align-items: center; justify-content: center;
           min-height: 100vh; margin: 0; background: #fffdf9; color: #201515; }
    .card { max-width: 400px; text-align: center; padding: 2.5rem; border: 1px solid #c5c0b1;
            border-radius: 8px; background: #fffefb; }
    h1 { font-size: 1.4rem; margin-bottom: 0.75rem; }
    p  { color: #939084; font-size: 0.95rem; line-height: 1.6; }
    a  { display: inline-block; margin-top: 1.5rem; color: #6b1535; font-size: 0.85rem; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${msg.title}</h1>
    <p>${msg.body}</p>
    <a href="/">← Zur Website</a>
  </div>
</body>
</html>`
}
