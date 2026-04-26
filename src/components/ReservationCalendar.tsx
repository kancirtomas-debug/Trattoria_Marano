"use client"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

const DAYS_DE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
const DAYS_EN = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]
const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number) {
  const d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1
}

// Current "today" in Europe/Berlin, regardless of the visitor's timezone.
// Returns a Date whose Y/M/D/H/M fields mirror Berlin wall-clock time so that
// calendar + slot filtering reflect the restaurant's local hours.
function nowInBerlin(): Date {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  }).formatToParts(new Date())
  const g = (k: string) => Number(parts.find(p => p.type === k)?.value ?? 0)
  return new Date(g("year"), g("month") - 1, g("day"), g("hour"), g("minute"), g("second"))
}

export default function ReservationCalendar() {
  const { lang } = useLanguage()
  const today = nowInBerlin()
  const [viewYear, setViewYear]     = useState(today.getFullYear())
  const [viewMonth, setViewMonth]   = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [guests, setGuests]         = useState(2)
  const [name, setName]             = useState("")
  const [phone, setPhone]           = useState("")
  const [email, setEmail]           = useState("")
  const [allergies, setAllergies]   = useState("")
  const [honeypot, setHoneypot]     = useState("")
  const [errors, setErrors]         = useState<Record<string, string>>({})
  const [submitted, setSubmitted]   = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [reservationsOpen, setReservationsOpen] = useState(true)
  const savedLoaded = useRef(false)

  useEffect(() => {
    setName(localStorage.getItem("res_name") ?? "")
    setPhone(localStorage.getItem("res_phone") ?? "")
    setEmail(localStorage.getItem("res_email") ?? "")
    savedLoaded.current = true
  }, [])

  useEffect(() => {
    if (!savedLoaded.current) return
    const t = setTimeout(() => {
      localStorage.setItem("res_name", name)
      localStorage.setItem("res_phone", phone)
      localStorage.setItem("res_email", email)
    }, 400)
    return () => clearTimeout(t)
  }, [name, phone, email])

  useEffect(() => {
    let cancelled = false
    fetch("/api/reservations/status", { cache: "no-store" })
      .then(r => r.ok ? r.json() : { open: true })
      .then(data => { if (!cancelled) setReservationsOpen(data.open !== false) })
      .catch(() => { /* fail open */ })
    return () => { cancelled = true }
  }, [])

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay    = getFirstDayOfMonth(viewYear, viewMonth)
  const dayLabels   = lang === "de" ? DAYS_DE : DAYS_EN
  const months      = lang === "de" ? MONTHS_DE : MONTHS_EN

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }
  function selectDay(day: number) {
    const d = new Date(viewYear, viewMonth, day)
    if (isPastOrMonday(d)) return
    setSelectedDate(d)
    setSelectedTime("")
  }
  function isPastOrMonday(d: Date) {
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return d < todayMidnight || d.getDay() === 1
  }
  function isSelected(day: number) {
    if (!selectedDate) return false
    return selectedDate.getFullYear() === viewYear &&
           selectedDate.getMonth() === viewMonth &&
           selectedDate.getDate() === day
  }
  function isToday(day: number) {
    return today.getFullYear() === viewYear &&
           today.getMonth() === viewMonth &&
           today.getDate() === day
  }

  const LEAD_MINUTES = 30
  const allSlots = [...t.reservation.lunch_slots, ...t.reservation.dinner_slots] as string[]
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  const nowPlusLead = new Date(today.getTime() + LEAD_MINUTES * 60_000)
  const timeSlots = selectedDate
    ? allSlots.filter(slot => {
        if (!isSameDay(selectedDate, today)) return true
        const [h, m] = slot.split(":").map(Number)
        const slotDate = new Date(selectedDate)
        slotDate.setHours(h, m, 0, 0)
        return slotDate.getTime() >= nowPlusLead.getTime()
      })
    : []

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = lang === "de" ? "Name ist erforderlich" : "Name is required"
    if (!phone.trim()) newErrors.phone = lang === "de" ? "Telefonnummer ist erforderlich" : "Phone number is required"
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setErrors({})
    setSubmitting(true)
    const dateStr = selectedDate
      ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth()+1).padStart(2,"0")}-${String(selectedDate.getDate()).padStart(2,"0")}`
      : ""
    await fetch("/api/reservations", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, date: dateStr, time: selectedTime, guests, lang, allergies, honeypot }),
    })
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-10 px-4">
        <div
          className="w-full max-w-md overflow-hidden"
          style={{
            background: "#fffefb",
            border: "1px solid #e5e0d5",
            borderRadius: 6,
            boxShadow: "0 20px 50px -20px rgba(107,21,53,0.12), 0 4px 12px -4px rgba(0,0,0,0.04)",
          }}
        >
          {/* Hero band - terracotta */}
          <div style={{ background: "#6b1535", padding: "32px 20px 28px", textAlign: "center" }}>
            <div
              className="mx-auto flex items-center justify-center"
              style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "#fffefb",
                boxShadow: "0 0 0 7px rgba(255,254,251,0.18)",
              }}
            >
              <Check size={26} strokeWidth={2.5} style={{ color: "#6b1535" }} />
            </div>
            <p
              className="mt-5"
              style={{
                fontFamily: "Georgia, serif", fontSize: 30, fontWeight: 700,
                color: "#fffefb", margin: 0, letterSpacing: "-0.01em", fontStyle: "italic",
              }}
            >
              Grazie!
            </p>
          </div>

          {/* Body */}
          <div style={{ padding: "28px 22px 22px" }}>
            {email && (
              <>
                <div
                  style={{
                    margin: "0 0 24px",
                    display: "flex", alignItems: "center", gap: 10,
                  }}
                >
                  <div style={{ flex: 1, height: 1, background: "#e5e0d5" }} />
                  <span
                    style={{
                      fontFamily: "Georgia, serif", fontSize: 10, letterSpacing: "0.3em",
                      textTransform: "uppercase", color: "#939084", fontWeight: 700,
                    }}
                  >
                    {lang === "de" ? "Was als Nächstes" : "What's next"}
                  </span>
                  <div style={{ flex: 1, height: 1, background: "#e5e0d5" }} />
                </div>

                {/* Timeline: 3h → 1h */}
                <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
                  <TimelineStep
                    label={lang === "de" ? "3 Std. vorher" : "3 hrs before"}
                    title={lang === "de" ? "Bitte bestätigen" : "Please confirm"}
                    body={lang === "de"
                      ? "E-Mail mit Bestätigungs-Button - ein Klick genügt."
                      : "Email with confirm button - one click."}
                    highlighted
                  />
                  <TimelineStep
                    label={lang === "de" ? "1 Std. vorher" : "1 hr before"}
                    title={lang === "de" ? "Kurze Erinnerung" : "Quick reminder"}
                    body={lang === "de"
                      ? "Letzte Erinnerung vor Ihrem Besuch."
                      : "Final reminder before your visit."}
                  />
                </div>

                <p
                  style={{
                    fontSize: 12, lineHeight: 1.5, color: "#939084",
                    margin: 0, textAlign: "center", fontStyle: "italic", fontFamily: "Georgia, serif",
                  }}
                >
                  {lang === "de"
                    ? "Bitte bestätigen Sie Ihre Reservierung, damit wir Ihren Tisch sicher bereithalten."
                    : "Please confirm so we can reliably hold your table."}
                </p>
              </>
            )}
          </div>

          {/* Footer action */}
          <button
            onClick={() => {
              setSubmitted(false); setSelectedDate(null)
              setSelectedTime(""); setName(""); setPhone(""); setEmail("")
            }}
            style={{
              width: "100%", padding: "14px 0",
              background: "#fdf8f5", borderTop: "1px solid #e5e0d5",
              fontFamily: "Georgia, serif", fontSize: 11, letterSpacing: "0.22em",
              textTransform: "uppercase", fontWeight: 700, color: "#6b1535",
              cursor: "pointer", border: "none", borderBottomLeftRadius: 6, borderBottomRightRadius: 6,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#f5ede6")}
            onMouseLeave={e => (e.currentTarget.style.background = "#fdf8f5")}
          >
            {lang === "de" ? "Neue Anfrage" : "New request"}
          </button>
        </div>
      </div>
    )
  }

  if (!reservationsOpen) {
    return (
      <div
        style={{
          padding: "24px",
          border: "2px solid #6b1535",
          background: "rgba(107,21,53,0.06)",
          textAlign: "center",
          fontFamily: "Georgia, serif",
        }}
      >
        <p style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "#6b1535", fontWeight: 700, margin: "0 0 8px" }}>
          {lang === "de" ? "Hinweis" : "Notice"}
        </p>
        <p style={{ fontSize: 18, color: "#201515", fontWeight: 700, margin: "0 0 8px" }}>
          {lang === "de" ? "Nicht genügend freie Plätze verfügbar" : "Not enough slots available"}
        </p>
        <p style={{ fontSize: 14, color: "#36342e", margin: "0 0 12px" }}>
          {lang === "de"
            ? "Wir nehmen zurzeit keine neuen Online-Reservierungen an. Bitte rufen Sie uns an - wir tun unser Bestes, einen Tisch für Sie zu finden."
            : "We are not accepting new online reservations at the moment. Please give us a call - we will do our best to find you a table."}
        </p>
        <a href="tel:+4989209281230" style={{ fontSize: 18, fontWeight: 900, color: "#201515", textDecoration: "underline", textUnderlineOffset: 3 }}>
          089 / 209 28 123
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── Calendar ── */}
      <div>
        <p className="mono-label mb-4">{t.reservation.select_date[lang]}</p>
        <div
          className="overflow-hidden"
          style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e0d5" }}
        >
          {/* Month nav */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid #f0ede6" }}
          >
            <button
              type="button" onClick={prevMonth}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "#939084" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#6b1535"; (e.currentTarget as HTMLButtonElement).style.background = "#fffdf9" }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#939084"; (e.currentTarget as HTMLButtonElement).style.background = "transparent" }}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-heading font-semibold" style={{ color: "#201515" }}>
              {months[viewMonth]} {viewYear}
            </span>
            <button
              type="button" onClick={nextMonth}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "#939084" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#6b1535"; (e.currentTarget as HTMLButtonElement).style.background = "#fffdf9" }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#939084"; (e.currentTarget as HTMLButtonElement).style.background = "transparent" }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day labels */}
          <div
            className="grid grid-cols-7 text-center text-xs py-2"
            style={{ borderBottom: "1px solid #f0ede6", color: "#c5c0b1" }}
          >
            {dayLabels.map(d => <span key={d}>{d}</span>)}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 text-center text-sm p-2 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <span key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day      = i + 1
              const d        = new Date(viewYear, viewMonth, day)
              const disabled = isPastOrMonday(d)
              const selected = isSelected(day)
              const todayDay = isToday(day)
              return (
                <button
                  type="button"
                  key={day}
                  disabled={disabled}
                  onClick={() => selectDay(day)}
                  className="aspect-square rounded-full flex items-center justify-center text-sm transition-all"
                  style={{
                    color: disabled
                      ? "#d8d3c9"
                      : selected
                        ? "#fffefb"
                        : todayDay
                          ? "#6b1535"
                          : "#201515",
                    background: selected ? "#6b1535" : "transparent",
                    fontWeight: selected || todayDay ? 700 : 400,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={e => {
                    if (!disabled && !selected)
                      (e.currentTarget as HTMLButtonElement).style.background = "#fffdf9"
                  }}
                  onMouseLeave={e => {
                    if (!selected)
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent"
                  }}
                >
                  {day}
                </button>
              )
            })}
          </div>

          <p className="text-center text-xs pb-3 px-3" style={{ color: "#c5c0b1" }}>
            <span
              className="inline-block w-3 h-3 rounded-full mr-1 align-middle"
              style={{ background: "#eceae3" }}
            />
            {t.reservation.closed[lang]}
          </p>
        </div>
      </div>

      {/* ── Time slots ── */}
      {selectedDate && (
        <div>
          <p className="mono-label mb-4">{t.reservation.select_time[lang]}</p>
          {timeSlots.length === 0 && (
            <p className="text-sm" style={{ color: "#939084", fontFamily: "Georgia, serif" }}>
              {lang === "de"
                ? "Für heute sind keine freien Zeiten mehr verfügbar. Bitte wählen Sie einen anderen Tag oder rufen Sie uns an."
                : "No more slots available today. Please choose another day or give us a call."}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {timeSlots.map(slot => (
              <button
                type="button"
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className="px-4 py-2 text-sm font-medium transition-all"
                style={{
                  borderRadius: 6,
                  border: selectedTime === slot ? "1px solid #6b1535" : "1px solid #e5e0d5",
                  background: selectedTime === slot ? "#6b1535" : "#fff",
                  color: selectedTime === slot ? "#fffefb" : "#36342e",
                }}
                onMouseEnter={e => {
                  if (selectedTime !== slot) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#6b1535"
                    ;(e.currentTarget as HTMLButtonElement).style.color = "#6b1535"
                  }
                }}
                onMouseLeave={e => {
                  if (selectedTime !== slot) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e0d5"
                    ;(e.currentTarget as HTMLButtonElement).style.color = "#36342e"
                  }
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Guest count + form ── */}
      {selectedTime && (
        <>
          <div>
            <p className="mono-label mb-4">{t.reservation.guests[lang]}</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setGuests(g => Math.max(1, g - 1))}
                className="w-9 h-9 rounded-full flex items-center justify-center font-medium transition-colors"
                style={{ border: "1px solid #e5e0d5", color: "#36342e" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#6b1535"; (e.currentTarget as HTMLButtonElement).style.color = "#6b1535" }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e0d5"; (e.currentTarget as HTMLButtonElement).style.color = "#36342e" }}
              >
                −
              </button>
              <span className="font-heading text-2xl font-semibold w-8 text-center" style={{ color: "#201515" }}>
                {guests}
              </span>
              <button
                type="button"
                onClick={() => setGuests(g => Math.min(10, g + 1))}
                className="w-9 h-9 rounded-full flex items-center justify-center font-medium transition-colors"
                style={{ border: "1px solid #e5e0d5", color: "#36342e" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#6b1535"; (e.currentTarget as HTMLButtonElement).style.color = "#6b1535" }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e0d5"; (e.currentTarget as HTMLButtonElement).style.color = "#36342e" }}
              >
                +
              </button>
              <span className="text-sm ml-1" style={{ color: "#939084" }}>
                {lang === "de" ? "Personen" : "guests"}
              </span>
            </div>
          </div>

          {/* honeypot - hidden from real users, caught server-side */}
          <input
            type="text"
            name="fax"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
          />

          <div>
            <label className="mono-label block mb-2">{t.reservation.name[lang]}</label>
            <input
              value={name} onChange={e => { setName(e.target.value); setErrors(er => ({ ...er, name: "" })) }}
              className="input-underline"
              placeholder={lang === "de" ? "Ihr Name" : "Your name"}
            />
            {errors.name && <p className="text-xs mt-1.5" style={{ color: "#6b1535", fontFamily: "Georgia, serif" }}>{errors.name}</p>}
          </div>

          <div>
            <label className="mono-label block mb-2">{t.reservation.phone[lang]}</label>
            <input
              value={phone} onChange={e => { setPhone(e.target.value); setErrors(er => ({ ...er, phone: "" })) }}
              className="input-underline" placeholder="+49 ..."
            />
            {errors.phone && <p className="text-xs mt-1.5" style={{ color: "#6b1535", fontFamily: "Georgia, serif" }}>{errors.phone}</p>}
          </div>

          <div>
            <label className="mono-label block mb-2">
              {lang === "de" ? "E-Mail" : "Email"}
              <span className="ml-1 normal-case font-normal" style={{ color: "#c5c0b1" }}>
                {lang === "de" ? "(für Bestätigung & Erinnerung)" : "(for confirmation & reminder)"}
              </span>
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="input-underline" placeholder="ihre@email.de"
            />
          </div>

          <div>
            <label className="mono-label block mb-2">
              {lang === "de" ? "Allergien / Unverträglichkeiten" : "Allergies / Intolerances"}
              <span className="ml-1 normal-case font-normal" style={{ color: "#c5c0b1" }}>
                {lang === "de" ? "(optional)" : "(optional)"}
              </span>
            </label>
            <textarea
              value={allergies}
              onChange={e => setAllergies(e.target.value)}
              className="input-underline"
              placeholder={lang === "de" ? "z.B. Gluten, Laktose, Nüsse…" : "e.g. gluten, lactose, nuts…"}
              rows={2}
              style={{ resize: "vertical", display: "block", width: "100%" }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-orange w-full justify-center py-3.5"
            style={{ opacity: submitting ? 0.7 : 1 }}
          >
            {submitting
              ? (lang === "de" ? "Wird gesendet…" : "Sending…")
              : t.reservation.submit[lang]}
          </button>
        </>
      )}
    </form>
  )
}

function TimelineStep({
  label, title, body, highlighted = false,
}: {
  label: string; title: string; body: string; highlighted?: boolean
}) {
  return (
    <div
      style={{
        flex: 1,
        padding: "20px 14px 16px",
        background: highlighted ? "#fdf8f5" : "transparent",
        border: "1px solid #e5e0d5",
        borderRadius: 6,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
          padding: "6px 14px",
          background: highlighted ? "#6b1535" : "#fffefb",
          color: highlighted ? "#fffefb" : "#6b1535",
          fontFamily: "Georgia, serif", fontSize: 12, letterSpacing: "0.18em",
          textTransform: "uppercase", fontWeight: 700, borderRadius: 999,
          border: highlighted ? "1px solid #6b1535" : "1px solid #6b1535",
          boxShadow: highlighted
            ? "0 4px 12px -4px rgba(107,21,53,0.35)"
            : "0 2px 6px -2px rgba(107,21,53,0.15)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
      <p
        style={{
          margin: "8px 0 4px",
          fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700,
          color: "#201515", letterSpacing: "-0.005em", textAlign: "center",
        }}
      >
        {title}
      </p>
      <p
        style={{
          margin: 0, fontSize: 12, lineHeight: 1.5, color: "#6b6660", textAlign: "center",
        }}
      >
        {body}
      </p>
    </div>
  )
}
