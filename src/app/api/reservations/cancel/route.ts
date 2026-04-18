import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const RES_PATH    = path.join(process.cwd(), "src", "data", "reservations.json")
const CONFIG_PATH = path.join(process.cwd(), "src", "data", "admin-config.json")

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token")
  if (!token) return new NextResponse("Invalid link.", { status: 400 })

  const reservations = JSON.parse(fs.readFileSync(RES_PATH, "utf-8")) as Array<{
    id: number
    cancelToken: string
    status: string
    calendarEventId?: string
  }>

  const idx = reservations.findIndex(r => r.cancelToken === token)
  if (idx === -1) return new NextResponse("Reservation not found.", { status: 404 })

  const reservation = reservations[idx]

  if (reservation.status === "cancelled") {
    return new NextResponse(cancelledHtml("already"), { headers: { "Content-Type": "text/html" } })
  }

  // Mark cancelled
  reservations[idx] = { ...reservation, status: "cancelled" }
  fs.writeFileSync(RES_PATH, JSON.stringify(reservations, null, 2))

  // Delete Google Calendar event via Apps Script
  const config     = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"))
  const webhookUrl = config.webhookUrl || process.env.CALENDAR_WEBHOOK_URL

  if (webhookUrl && reservation.calendarEventId) {
    try {
      await fetch(webhookUrl, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ action: "delete", eventId: reservation.calendarEventId }),
      })
    } catch {
      console.error("Failed to delete calendar event")
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
