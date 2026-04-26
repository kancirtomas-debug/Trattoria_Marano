import { Resend } from "resend"
import { generateICS } from "@/lib/ics"
import type { Lang } from "@/context/LanguageContext"

let _resend: Resend | null = null
function resendClient(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY ?? "re_build_placeholder")
  return _resend
}

// ── Constants ────────────────────────────────────────────────────────────────
// TODO: swap to the real trattoriamarano.de URL once the live site launches
const WEBSITE_URL = "https://trattoriamarano.de"
const RESTAURANT_NAME   = "Trattoria Marano"
const RESTAURANT_ADDR   = "Ohlmüllerstr. 22, 81541 München"
const PHONE_DISPLAY     = "089 / 209 28 123"
const PHONE_TEL         = "+498920928123"

const C = {
  cream:     "#fffefb",
  creamAlt:  "#fdf8f5",
  ink:       "#201515",
  inkLight:  "#36342e",
  muted:     "#939084",
  terra:     "#6b1535",
  sand:      "#c5c0b1",
  sandLight: "#e5e0d5",
  green:     "#4a7c59",
}

// ── Types ────────────────────────────────────────────────────────────────────
export type ReservationData = {
  id: number
  name: string
  phone: string
  email?: string
  date: string        // "2026-04-12"
  time: string        // "19:00"
  guests: number
  message?: string
  cancelToken: string
  lang?: Lang
}

export type CateringData = {
  id: number
  name: string
  email: string
  phone?: string
  date: string
  guests: number
  type?: string
  location?: string
  message?: string
  allergies?: string
  lang?: Lang
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function appUrl(): string {
  return process.env.APP_URL ?? "http://localhost:3003"
}
function fromAddr(): string {
  return process.env.RESEND_FROM ?? "onboarding@resend.dev"
}
function restaurantEmail(): string {
  return process.env.RESTAURANT_EMAIL ?? "maranotrattoria@gmail.com"
}
function fmtDate(date: string, lang: Lang): string {
  return new Date(date + "T12:00:00").toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  })
}
function normalizeLang(lang?: string): Lang {
  return lang === "en" ? "en" : "de"
}

// Thin wrapper - Resend returns `{ data, error }` instead of throwing, so
// `await resend.emails.send(...)` silently succeeds even when the API rejects.
// This surfaces delivery failures in the server log.
type SendArgs = Parameters<Resend["emails"]["send"]>[0]
async function send(args: SendArgs, label: string): Promise<void> {
  const { data, error } = await resendClient().emails.send(args)
  if (error) {
    console.error(`[email:${label}] Resend rejected send →`, {
      to: (args as { to?: unknown }).to,
      from: (args as { from?: unknown }).from,
      name: error.name,
      message: error.message,
    })
    return
  }
  console.log(`[email:${label}] sent id=${data?.id}`)
}

// ── Shared chrome ────────────────────────────────────────────────────────────
function baseLayout(opts: { preheader?: string; body: string }): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${RESTAURANT_NAME}</title></head>
<body style="margin:0;padding:0;background:${C.creamAlt};font-family:Helvetica,Arial,sans-serif;color:${C.ink};-webkit-font-smoothing:antialiased">
${opts.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${opts.preheader}</div>` : ""}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.creamAlt}">
<tr><td align="center" style="padding:32px 16px">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:${C.cream};border:1px solid ${C.sandLight};border-radius:4px">
    <tr><td style="padding:28px 32px 20px;border-bottom:1px solid ${C.sandLight};text-align:center">
      <p style="margin:0;font-family:Georgia,serif;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${C.terra};font-weight:700">Since 1987 · München</p>
      <h1 style="margin:6px 0 0;font-family:Georgia,serif;font-size:28px;font-weight:700;color:${C.ink};letter-spacing:-0.01em">Trattoria Marano</h1>
    </td></tr>
    <tr><td style="padding:28px 32px">${opts.body}</td></tr>
    <tr><td style="padding:20px 32px 28px;border-top:1px solid ${C.sandLight};text-align:center">
      <p style="margin:0;font-family:Georgia,serif;font-size:13px;color:${C.ink};font-weight:600">${RESTAURANT_NAME}</p>
      <p style="margin:4px 0 0;font-size:12px;color:${C.muted}">${RESTAURANT_ADDR}</p>
      <p style="margin:8px 0 0;font-size:12px">
        <a href="tel:${PHONE_TEL}" style="color:${C.terra};text-decoration:none;font-weight:600">${PHONE_DISPLAY}</a>
        <span style="color:${C.sand}"> · </span>
        <a href="${WEBSITE_URL}" style="color:${C.terra};text-decoration:none;font-weight:600">trattoriamarano.de</a>
      </p>
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>`
}

function heading(text: string): string {
  return `<h2 style="margin:0 0 4px;font-family:Georgia,serif;font-size:24px;font-weight:700;color:${C.ink};letter-spacing:-0.01em">${text}</h2>`
}
function lead(text: string): string {
  return `<p style="margin:0;font-size:15px;color:${C.muted};font-family:Georgia,serif;font-style:italic">${text}</p>`
}
function paragraph(text: string): string {
  return `<p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:${C.inkLight}">${text}</p>`
}
function divider(): string {
  return `<hr style="border:none;border-top:1px solid ${C.sandLight};margin:24px 0"/>`
}
function detailsTable(rows: Array<[string, string]>): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 0">
${rows.map(([k, v]) => `<tr>
  <td style="padding:8px 0;font-size:12px;color:${C.muted};width:140px;font-family:Georgia,serif;letter-spacing:0.08em;text-transform:uppercase">${k}</td>
  <td style="padding:8px 0;font-size:15px;color:${C.ink};font-weight:600">${v}</td>
</tr>`).join("")}
</table>`
}
function ctaPrimary(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;padding:13px 26px;font-family:Georgia,serif;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#fff;background:${C.terra};text-decoration:none;border-radius:3px">${label}</a>`
}
function ctaGhost(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;padding:12px 24px;font-family:Georgia,serif;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${C.ink};background:transparent;border:1px solid ${C.sandLight};text-decoration:none;border-radius:3px">${label}</a>`
}
function noticeBox(text: string): string {
  return `<div style="margin:20px 0 0;padding:14px 16px;background:${C.creamAlt};border-left:3px solid ${C.terra};border-radius:2px">
    <p style="margin:0;font-size:13px;line-height:1.55;color:${C.inkLight}">${text}</p>
  </div>`
}

// ── Sender 1: restaurant - new reservation notification ──────────────────────
export async function sendRestaurantNewReservation(data: ReservationData): Promise<void> {
  const lang = normalizeLang(data.lang)
  const to   = restaurantEmail()
  if (!to) return

  const body = `
    ${heading(lang === "de" ? "Neue Tischreservierung" : "New reservation")}
    ${lead(lang === "de" ? "Soeben über das Online-Formular eingegangen." : "Just received via the website form.")}
    ${detailsTable([
      [lang === "de" ? "Name"     : "Name",    data.name],
      [lang === "de" ? "Datum"    : "Date",    fmtDate(data.date, lang)],
      [lang === "de" ? "Uhrzeit"  : "Time",    `${data.time} ${lang === "de" ? "Uhr" : ""}`],
      [lang === "de" ? "Personen" : "Guests",  String(data.guests)],
      [lang === "de" ? "Telefon"  : "Phone",   `<a href="tel:${data.phone}" style="color:${C.terra};text-decoration:none">${data.phone}</a>`],
      ...(data.email   ? [[lang === "de" ? "E-Mail"    : "Email",   data.email]     as [string, string]] : []),
      ...(data.message ? [[lang === "de" ? "Nachricht" : "Message", `<em>${data.message}</em>`] as [string, string]] : []),
    ])}
    ${divider()}
    <p style="margin:0;font-size:12px;color:${C.muted};font-style:italic">
      ${lang === "de"
        ? "Automatische Benachrichtigung vom Reservierungssystem."
        : "Automatic notification from the reservation system."}
    </p>`

  await send({
    from:    fromAddr(),
    to,
    subject: lang === "de"
      ? `Neue Reservierung: ${data.name} - ${fmtDate(data.date, "de")} ${data.time}`
      : `New reservation: ${data.name} - ${fmtDate(data.date, "en")} ${data.time}`,
    html: baseLayout({
      preheader: `${data.name} · ${data.guests} · ${data.time}`,
      body,
    }),
  }, "restaurant-new-reservation")
}

// ── Sender 2: guest - reservation confirmation (with .ics + cancel) ──────────
export async function sendGuestReservationConfirmation(data: ReservationData): Promise<void> {
  if (!data.email) return
  const lang      = normalizeLang(data.lang)
  const cancelUrl = `${appUrl()}/api/reservations/cancel?token=${data.cancelToken}`

  const [h, m]   = data.time.split(":").map(Number)
  const startIso = `${data.date}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00`
  const endDate  = new Date(startIso)
  endDate.setHours(endDate.getHours() + 1)
  const endIso   = endDate.toISOString().split(".")[0]
  const icsContent = generateICS({
    uid:         `res-${data.id}@trattoriamarano.de`,
    title:       lang === "de" ? "Tischreservierung - Trattoria Marano" : "Table reservation - Trattoria Marano",
    description: `Name: ${data.name}\n${lang === "de" ? "Personen" : "Guests"}: ${data.guests}\n${lang === "de" ? "Telefon" : "Phone"}: ${data.phone}${data.message ? `\n${lang === "de" ? "Nachricht" : "Note"}: ${data.message}` : ""}`,
    location:    "Trattoria Marano, Ohlmüllerstr. 22, 81541 München",
    startIso,
    endIso,
  })

  const body = `
    ${heading(lang === "de" ? "Ihre Reservierung ist eingegangen" : "Your reservation is in")}
    ${lead(lang === "de"
      ? `Wir freuen uns auf Ihren Besuch, ${data.name}.`
      : `We're looking forward to seeing you, ${data.name}.`)}
    ${detailsTable([
      [lang === "de" ? "Datum"    : "Date",    fmtDate(data.date, lang)],
      [lang === "de" ? "Uhrzeit"  : "Time",    `${data.time} ${lang === "de" ? "Uhr" : ""}`],
      [lang === "de" ? "Personen" : "Guests",  String(data.guests)],
    ])}
    ${noticeBox(lang === "de"
      ? "<strong>Wichtig:</strong> Sie erhalten <strong>3 Stunden</strong> vor Ihrem Besuch eine Erinnerung per E-Mail. Bitte bestätigen Sie Ihre Reservierung über den Button in dieser E-Mail."
      : "<strong>Important:</strong> You will receive an email reminder <strong>3 hours</strong> before your visit. Please confirm your reservation via the button in that email.")}
    ${divider()}
    <p style="margin:0 0 14px;font-size:13px;color:${C.muted}">
      ${lang === "de" ? "Pläne geändert?" : "Plans changed?"}
    </p>
    ${ctaGhost(cancelUrl, lang === "de" ? "Reservierung stornieren" : "Cancel reservation")}
    ${paragraph(lang === "de"
      ? `Der Kalendertermin mit Erinnerung ist als Anhang (<code>.ics</code>) beigefügt.`
      : `The calendar event (<code>.ics</code>) is attached - add it to your calendar with one click.`)}
  `

  await send({
    from:    fromAddr(),
    to:      data.email,
    subject: lang === "de"
      ? "Reservierungsbestätigung - Trattoria Marano"
      : "Reservation received - Trattoria Marano",
    html: baseLayout({
      preheader: lang === "de"
        ? `${fmtDate(data.date, "de")} um ${data.time} · ${data.guests} Personen`
        : `${fmtDate(data.date, "en")} at ${data.time} · ${data.guests} guests`,
      body,
    }),
    attachments: [{
      filename: "reservation.ics",
      content:  Buffer.from(icsContent).toString("base64"),
    }],
  }, "guest-reservation-confirmation")
}

// ── Sender 3: guest - 3h confirmation request ────────────────────────────────
export async function sendGuest3hConfirmation(data: ReservationData): Promise<void> {
  if (!data.email) return
  const lang       = normalizeLang(data.lang)
  const confirmUrl = `${appUrl()}/api/reservations/confirm?token=${data.cancelToken}`
  const cancelUrl  = `${appUrl()}/api/reservations/cancel?token=${data.cancelToken}`

  const body = `
    ${heading(lang === "de" ? "Kommen Sie heute Abend?" : "Still joining us tonight?")}
    ${lead(lang === "de"
      ? `Ihr Tisch ist in etwa 3 Stunden reserviert, ${data.name}.`
      : `Your table is booked in about 3 hours, ${data.name}.`)}
    ${detailsTable([
      [lang === "de" ? "Datum"    : "Date",    fmtDate(data.date, lang)],
      [lang === "de" ? "Uhrzeit"  : "Time",    `${data.time} ${lang === "de" ? "Uhr" : ""}`],
      [lang === "de" ? "Personen" : "Guests",  String(data.guests)],
    ])}
    ${paragraph(lang === "de"
      ? "Bitte bestätigen Sie Ihre Reservierung mit einem Klick, damit wir den Tisch sicher für Sie bereithalten."
      : "Please confirm your reservation with one click so we can reliably hold the table for you.")}
    <div style="margin:24px 0 0">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="padding-right:10px">${ctaPrimary(confirmUrl, lang === "de" ? "Ja, ich komme" : "Yes, I'm coming")}</td>
        <td>${ctaGhost(cancelUrl, lang === "de" ? "Stornieren" : "Cancel")}</td>
      </tr></table>
    </div>
    ${divider()}
    <p style="margin:0;font-size:12px;color:${C.muted}">
      ${lang === "de"
        ? `Falls Sie nicht bestätigen, rufen wir Sie eventuell unter <a href="tel:${data.phone}" style="color:${C.terra};text-decoration:none">${data.phone}</a> an.`
        : `If you don't confirm, we may call you at <a href="tel:${data.phone}" style="color:${C.terra};text-decoration:none">${data.phone}</a>.`}
    </p>`

  await send({
    from:    fromAddr(),
    to:      data.email,
    subject: lang === "de"
      ? "Bitte bestätigen - Ihre Reservierung in 3 Stunden"
      : "Please confirm - your table in 3 hours",
    html: baseLayout({
      preheader: lang === "de"
        ? "Ein Klick genügt, um Ihren Tisch zu sichern."
        : "One click to secure your table.",
      body,
    }),
  }, "guest-3h-confirmation")
}

// ── Sender 4: guest - catering/event thank-you ───────────────────────────────
export async function sendGuestCateringThankYou(data: CateringData): Promise<void> {
  const lang = normalizeLang(data.lang)

  const body = `
    ${heading(lang === "de" ? "Grazie für Ihre Anfrage" : "Grazie for your inquiry")}
    ${lead(lang === "de"
      ? `Wir haben Ihre Event-Anfrage erhalten, ${data.name}.`
      : `We've received your event inquiry, ${data.name}.`)}
    ${paragraph(lang === "de"
      ? "Wir melden uns innerhalb von 24 Stunden mit einem persönlichen Vorschlag - per E-Mail oder telefonisch unter der von Ihnen angegebenen Nummer."
      : "We'll get back to you within 24 hours with a personal proposal - by email or by phone on the number you provided.")}
    ${detailsTable([
      [lang === "de" ? "Datum"    : "Date",    fmtDate(data.date, lang)],
      [lang === "de" ? "Personen" : "Guests",  String(data.guests)],
      ...(data.type     ? [[lang === "de" ? "Anlass"    : "Occasion", data.type] as [string, string]]        : []),
      ...(data.location ? [[lang === "de" ? "Ort"       : "Location", data.location] as [string, string]]    : []),
    ])}
    ${divider()}
    ${paragraph(lang === "de"
      ? `Für dringende Fragen erreichen Sie uns unter <a href="tel:${PHONE_TEL}" style="color:${C.terra};text-decoration:none;font-weight:600">${PHONE_DISPLAY}</a>.`
      : `For urgent questions call us at <a href="tel:${PHONE_TEL}" style="color:${C.terra};text-decoration:none;font-weight:600">${PHONE_DISPLAY}</a>.`)}
    <p style="margin:22px 0 0;font-family:Georgia,serif;font-style:italic;color:${C.terra};font-size:15px">
      - Famiglia Marano
    </p>`

  await send({
    from:    fromAddr(),
    to:      data.email,
    subject: lang === "de"
      ? "Anfrage erhalten - Trattoria Marano"
      : "Inquiry received - Trattoria Marano",
    html: baseLayout({
      preheader: lang === "de"
        ? "Wir melden uns innerhalb von 24 Stunden."
        : "We'll get back within 24 hours.",
      body,
    }),
  }, "guest-catering-thankyou")
}

// ── Sender 8: restaurant - catering inquiry notification ─────────────────────
export async function sendRestaurantCateringInquiry(data: CateringData): Promise<void> {
  const lang = normalizeLang(data.lang)
  const to   = restaurantEmail()
  if (!to) return

  const body = `
    ${heading(lang === "de" ? "Neue Event-Anfrage" : "New event inquiry")}
    ${lead(lang === "de" ? "Über das Online-Formular eingegangen." : "Received via the website form.")}
    ${detailsTable([
      [lang === "de" ? "Name"     : "Name",    data.name],
      [lang === "de" ? "E-Mail"   : "Email",   `<a href="mailto:${data.email}" style="color:${C.terra};text-decoration:none">${data.email}</a>`],
      ...(data.phone    ? [[lang === "de" ? "Telefon"  : "Phone",    `<a href="tel:${data.phone}" style="color:${C.terra};text-decoration:none">${data.phone}</a>`] as [string, string]] : []),
      [lang === "de" ? "Datum"    : "Date",    data.date],
      [lang === "de" ? "Personen" : "Guests",  String(data.guests)],
      ...(data.type     ? [[lang === "de" ? "Anlass"   : "Type",     data.type] as [string, string]]        : []),
      ...(data.location ? [[lang === "de" ? "Ort"      : "Location", data.location] as [string, string]]    : []),
    ])}
    ${data.allergies ? `
      <div style="margin:20px 0 0;padding:14px 16px;background:${C.creamAlt};border-left:3px solid ${C.terra};border-radius:2px">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:${C.terra};font-family:Georgia,serif">${lang === "de" ? "Allergien / Unverträglichkeiten / Diät" : "Allergies / Intolerances / Diet"}</p>
        <p style="margin:0;font-size:14px;line-height:1.55;color:${C.inkLight}">${data.allergies}</p>
      </div>` : ""}
    ${data.message ? `
      <div style="margin:20px 0 0;padding:14px 16px;background:${C.creamAlt};border-left:3px solid ${C.sandLight};border-radius:2px">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:${C.muted};font-family:Georgia,serif">${lang === "de" ? "Nachricht" : "Message"}</p>
        <p style="margin:0;font-size:14px;line-height:1.55;color:${C.inkLight};font-style:italic">${data.message}</p>
      </div>` : ""}
    ${divider()}
    <p style="margin:0;font-size:12px;color:${C.muted};font-style:italic">
      ${lang === "de" ? "Automatische Benachrichtigung vom Event-Formular." : "Automatic notification from the event form."}
    </p>`

  await send({
    from:    fromAddr(),
    to,
    replyTo: data.email,
    subject: lang === "de"
      ? `Event-Anfrage: ${data.name} (${data.guests} ${data.guests === 1 ? "Person" : "Personen"})`
      : `Event inquiry: ${data.name} (${data.guests} ${data.guests === 1 ? "guest" : "guests"})`,
    html: baseLayout({
      preheader: `${data.name} · ${data.guests} · ${data.date}`,
      body,
    }),
  }, "restaurant-catering-inquiry")
}

// ── Back-compat aggregate (used by reservations POST) ────────────────────────
export async function sendReservationEmails(data: ReservationData): Promise<void> {
  await Promise.allSettled([
    sendRestaurantNewReservation(data),
    sendGuestReservationConfirmation(data),
  ])
}
