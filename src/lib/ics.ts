function fmt(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
}

export function generateICS(params: {
  uid: string
  title: string
  description: string
  location: string
  startIso: string   // e.g. "2026-04-12T19:00:00"
  endIso: string
}): string {
  const { uid, title, description, location, startIso, endIso } = params
  const start = fmt(new Date(startIso))
  const end   = fmt(new Date(endIso))
  const now   = fmt(new Date())
  const desc  = description.replace(/\n/g, "\\n").replace(/,/g, "\\,")
  const loc   = location.replace(/,/g, "\\,")

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Trattoria Marano//Reservation//EN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${loc}`,
    // 3-hour reminder
    "BEGIN:VALARM",
    "TRIGGER:-PT3H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Ihre Tischreservierung in 3 Stunden",
    "END:VALARM",
    // 1-hour reminder
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Ihre Tischreservierung in 1 Stunde",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")
}
