"use client"
import { useState } from "react"
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

export default function ReservationCalendar() {
  const { lang } = useLanguage()
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [guests, setGuests] = useState(2)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  const dayLabels = lang === "de" ? DAYS_DE : DAYS_EN
  const months = lang === "de" ? MONTHS_DE : MONTHS_EN

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
    return (
      selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day
    )
  }
  function isToday(day: number) {
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    )
  }

  const timeSlots = selectedDate
    ? ([...t.reservation.lunch_slots, ...t.reservation.dinner_slots] as string[])
    : []

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center">
          <Check size={28} className="text-sage" />
        </div>
        <p className="font-heading text-xl text-ink">{t.reservation.success[lang]}</p>
        <p className="text-sm text-ink-muted">089 / 209 28 123</p>
        <button
          onClick={() => { setSubmitted(false); setSelectedDate(null); setSelectedTime(""); setName(""); setPhone("") }}
          className="text-sm text-terracotta hover:underline mt-2"
        >
          {lang === "de" ? "Neue Anfrage" : "New request"}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Calendar */}
      <div>
        <p className="mono-label mb-4">{t.reservation.select_date[lang]}</p>
        <div className="bg-white rounded-2xl border border-warmgray-200 overflow-hidden">
          {/* Month nav */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-warmgray-100">
            <button type="button" onClick={prevMonth} className="p-1.5 hover:text-terracotta transition-colors rounded-lg hover:bg-cream">
              <ChevronLeft size={18} />
            </button>
            <span className="font-heading font-semibold text-ink">
              {months[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={nextMonth} className="p-1.5 hover:text-terracotta transition-colors rounded-lg hover:bg-cream">
              <ChevronRight size={18} />
            </button>
          </div>
          {/* Day labels */}
          <div className="grid grid-cols-7 text-center text-xs text-warmgray-400 border-b border-warmgray-100 py-2">
            {dayLabels.map(d => <span key={d}>{d}</span>)}
          </div>
          {/* Days grid */}
          <div className="grid grid-cols-7 text-center text-sm p-2 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <span key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const d = new Date(viewYear, viewMonth, day)
              const disabled = isPastOrMonday(d)
              const selected = isSelected(day)
              const todayDay = isToday(day)
              return (
                <button
                  type="button"
                  key={day}
                  disabled={disabled}
                  onClick={() => selectDay(day)}
                  className={[
                    "aspect-square rounded-full flex items-center justify-center text-sm transition-colors",
                    disabled ? "text-warmgray-300 cursor-not-allowed" : "hover:bg-cream cursor-pointer",
                    selected ? "bg-terracotta text-white hover:bg-terracotta-dark" : "",
                    todayDay && !selected ? "font-bold text-terracotta" : "",
                  ].join(" ")}
                >
                  {day}
                </button>
              )
            })}
          </div>
          <p className="text-center text-xs text-warmgray-400 pb-3 px-3">
            <span className="inline-block w-3 h-3 rounded-full bg-warmgray-200 mr-1 align-middle" />
            {t.reservation.closed[lang]}
          </p>
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div>
          <p className="mono-label mb-4">{t.reservation.select_time[lang]}</p>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map(slot => (
              <button
                type="button"
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`px-3 py-1.5 rounded-pill text-sm font-medium transition-colors border ${
                  selectedTime === slot
                    ? "bg-terracotta text-white border-terracotta"
                    : "border-warmgray-200 text-ink-light hover:border-terracotta hover:text-terracotta"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Guest count + form */}
      {selectedTime && (
        <>
          <div>
            <p className="mono-label mb-4">{t.reservation.guests[lang]}</p>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => setGuests(g => Math.max(1, g - 1))}
                className="w-9 h-9 rounded-full border border-warmgray-300 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors font-medium">
                −
              </button>
              <span className="font-heading text-2xl font-semibold text-ink w-8 text-center">{guests}</span>
              <button type="button" onClick={() => setGuests(g => Math.min(10, g + 1))}
                className="w-9 h-9 rounded-full border border-warmgray-300 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors font-medium">
                +
              </button>
              <span className="text-ink-muted text-sm ml-1">
                {lang === "de" ? "Personen" : "guests"}
              </span>
            </div>
          </div>

          <div>
            <label className="mono-label block mb-2">{t.reservation.name[lang]}</label>
            <input
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="input-underline"
              placeholder={lang === "de" ? "Ihr Name" : "Your name"}
            />
          </div>

          <div>
            <label className="mono-label block mb-2">{t.reservation.phone[lang]}</label>
            <input
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="input-underline"
              placeholder="+49 ..."
            />
          </div>

          <button type="submit"
            className="w-full py-3.5 bg-terracotta text-white rounded-pill font-medium hover:bg-terracotta-dark transition-colors">
            {t.reservation.submit[lang]}
          </button>
        </>
      )}
    </form>
  )
}
