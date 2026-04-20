"use client"
import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import deLocale from "@fullcalendar/core/locales/de"
import type { EventClickArg, EventContentArg } from "@fullcalendar/core"
import { useLanguage } from "@/context/LanguageContext"
import {
  LogOut, Loader2, X, Calendar, Clock, Users, Phone, Mail, MessageSquare, RefreshCw, Lock, Unlock,
} from "lucide-react"

const ALLOWED_EMAIL = "maranotrattoria@gmail.com"

type Reservation = {
  id: number
  name: string
  phone: string
  email?: string
  date: string
  time: string
  guests: number
  message?: string
  createdAt: string
  calendarEventId?: string | null
  status: string
  adminNotes?: string | null
}

type CalEvent = {
  id: string
  title: string
  start: string
  end: string
  extendedProps: Reservation
  backgroundColor: string
  borderColor: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { lang, toggle } = useLanguage()
  const t = lang === "de"
    ? { signOut: "Abmelden", guests: (n: number) => n === 1 ? "Gast" : "Gäste", submitted: "Eingereicht am", sync: "Synchronisieren", syncing: "Wird sync…" }
    : { signOut: "Sign out",  guests: (n: number) => n === 1 ? "guest" : "guests", submitted: "Submitted", sync: "Sync calendar", syncing: "Syncing…" }

  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading]           = useState(true)
  const [selected, setSelected]         = useState<Reservation | null>(null)
  const [syncing, setSyncing]           = useState(false)
  const [syncMsg, setSyncMsg]           = useState<string | null>(null)
  const [reservationsOpen, setReservationsOpen] = useState<boolean>(true)
  const [togglingStatus, setTogglingStatus]     = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)
    const [resRes, cfgRes] = await Promise.all([
      fetch("/api/reservations"),
      fetch("/api/admin/config"),
    ])
    if (resRes.status === 401) { router.replace("/admin"); return }
    if (resRes.ok) {
      const data = await resRes.json()
      setReservations(data.reservations ?? [])
    }
    if (cfgRes.ok) {
      const cfg = await cfgRes.json()
      setReservationsOpen(cfg.reservationsOpen !== false)
    }
    setLoading(false)
  }, [router])

  useEffect(() => {
    if (status === "unauthenticated" ||
       (status === "authenticated" && session?.user?.email !== ALLOWED_EMAIL)) {
      router.replace("/admin")
    }
    if (status === "authenticated" && session?.user?.email === ALLOWED_EMAIL) {
      loadData()
    }
  }, [status, session, router, loadData])

  // Poll every 30s while tab is visible to catch guest confirm/cancel clicks
  useEffect(() => {
    if (status !== "authenticated") return
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") loadData()
    }, 30000)
    return () => clearInterval(interval)
  }, [status, loadData])

  const toggleReservations = useCallback(async () => {
    setTogglingStatus(true)
    const next = !reservationsOpen
    const confirmMsg = next
      ? (lang === "de" ? "Reservierungen wieder öffnen?" : "Re-open reservations?")
      : (lang === "de"
          ? "Reservierungen für Gäste sperren? Neue Anfragen werden abgelehnt."
          : "Close reservations for guests? New requests will be rejected.")
    if (!window.confirm(confirmMsg)) { setTogglingStatus(false); return }

    const res = await fetch("/api/admin/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservationsOpen: next }),
    })
    if (res.ok) {
      const data = await res.json()
      setReservationsOpen(data.reservationsOpen !== false)
      setSyncMsg(data.reservationsOpen
        ? (lang === "de" ? "Reservierungen geöffnet." : "Reservations open.")
        : (lang === "de" ? "Reservierungen gesperrt." : "Reservations closed."))
      setTimeout(() => setSyncMsg(null), 3000)
    }
    setTogglingStatus(false)
  }, [reservationsOpen, lang])

  const syncCalendar = useCallback(async () => {
    setSyncing(true)
    setSyncMsg(null)
    const res = await fetch("/api/admin/sync-calendar", { method: "POST" })
    if (res.ok) {
      const { synced, failed, total } = await res.json()
      if (total === 0) setSyncMsg("All reservations already synced.")
      else if (failed === 0) setSyncMsg(`Synced ${synced} reservation${synced !== 1 ? "s" : ""} to Google Calendar.`)
      else setSyncMsg(`Synced ${synced}, failed ${failed}.`)
      if (synced > 0) await loadData()
    } else {
      setSyncMsg("Sync failed.")
    }
    setSyncing(false)
    setTimeout(() => setSyncMsg(null), 4000)
  }, [loadData])

  const events: CalEvent[] = reservations
    .filter(r => r.status !== "cancelled")
    .map(r => {
      const isTest = r.name === "TEST Reservation" || r.status === "test"
      // Color by status: confirmed = olive green, pending = burgundy, test = sand
      const color = isTest
        ? "#c5c0b1"
        : r.status === "confirmed"
          ? "#4a6b3a"
          : "#6b1535"
      return {
        id: String(r.id),
        title: `${r.status === "confirmed" ? "✓ " : ""}${r.name} · ${r.guests}p`,
        start: `${r.date}T${r.time}:00`,
        end:   `${r.date}T${r.time}:00`,
        extendedProps: r,
        backgroundColor: color,
        borderColor:     color,
      }
    })

  function handleEventClick(info: EventClickArg) {
    setSelected(info.event.extendedProps as Reservation)
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen" style={{ background: "#fffdf9" }}>
        {/* Skeleton header */}
        <div style={{ background: "#fffefb", borderBottom: "1px solid #e0dcd2", padding: "0.75rem 1.5rem" }}>
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div style={{ width: 3, height: 28, background: "#e8e5dc", borderRadius: 2 }} />
              <div>
                <div style={{ width: 140, height: 18, background: "#eceae3", borderRadius: 4, marginBottom: 4 }} />
                <div style={{ width: 100, height: 10, background: "#f0ede6", borderRadius: 4 }} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[80, 40, 72].map(w => (
                <div key={w} style={{ width: w, height: 30, background: "#eceae3", borderRadius: 6 }} />
              ))}
            </div>
          </div>
        </div>
        {/* Skeleton calendar */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              {[60, 54, 46].map(w => <div key={w} style={{ width: w, height: 30, background: "#eceae3", borderRadius: 6 }} />)}
            </div>
            <div style={{ width: 120, height: 22, background: "#eceae3", borderRadius: 4 }} />
            <div className="flex gap-2">
              {[30, 30, 52].map((w, i) => <div key={i} style={{ width: w, height: 30, background: "#eceae3", borderRadius: 6 }} />)}
            </div>
          </div>
          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, marginBottom: 1, background: "#e0dcd2", border: "2px solid #c5c0b1", borderBottom: "none" }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} style={{ background: "#fffefb", padding: "8px 12px" }}>
                <div style={{ width: 28, height: 11, background: "#eceae3", borderRadius: 3 }} />
              </div>
            ))}
          </div>
          {/* Calendar cells */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, background: "#e0dcd2", border: "2px solid #c5c0b1" }}>
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} style={{ background: "#fffefb", minHeight: 90, padding: "6px 8px" }}>
                <div style={{ width: 18, height: 14, background: "#f0ede6", borderRadius: 3, marginBottom: 4 }} />
                {i % 7 === 1 && <div style={{ width: "90%", height: 18, background: "#eceae3", borderRadius: 3 }} />}
                {i % 11 === 0 && <div style={{ width: "80%", height: 18, background: "#e8e3db", borderRadius: 3, marginTop: 3 }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* ── FullCalendar global overrides ── */}
      <style>{`
        .fc { font-family: inherit; }
        .fc .fc-toolbar-title { font-size: 1.1rem; font-weight: 600; color: #201515; letter-spacing: -0.02em; }
        .fc .fc-button {
          background: #fffefb !important; border: 1px solid #c5c0b1 !important;
          color: #36342e !important; font-size: 0.75rem !important; font-weight: 600 !important;
          padding: 0.35rem 0.75rem !important; box-shadow: none !important;
          text-transform: capitalize !important;
        }
        .fc .fc-button:hover { background: #eceae3 !important; }
        .fc .fc-button-active, .fc .fc-button:focus {
          background: #6b1535 !important; border-color: #6b1535 !important;
          color: #fffefb !important; box-shadow: none !important; outline: none !important;
        }
        .fc .fc-daygrid-day-number, .fc .fc-col-header-cell-cushion {
          color: #36342e; font-size: 0.8rem; text-decoration: none !important;
        }
        .fc .fc-day-today { background: rgba(107,21,53,0.04) !important; }
        .fc .fc-day-today .fc-daygrid-day-number { color: #6b1535; font-weight: 700; }
        .fc-event { cursor: pointer; border-radius: 3px !important; font-size: 0.72rem !important; }
        .fc-event-title { font-weight: 600; }
        .fc .fc-timegrid-slot { height: 2.5rem; }
        /* Thicker grid borders */
        .fc .fc-scrollgrid { border: 2px solid #c5c0b1 !important; }
        .fc td, .fc th { border-color: #c5c0b1 !important; border-width: 1.5px !important; }
        .fc .fc-scrollgrid-section > td { border: none !important; }
        /* Time axis */
        .fc .fc-timegrid-axis { color: #939084; font-size: 0.7rem; }
        /* Hide scroll arrow buttons on scrollbars */
        .fc *::-webkit-scrollbar-button { display: none !important; height: 0 !important; }
        .fc *::-webkit-scrollbar { width: 5px; }
        .fc *::-webkit-scrollbar-thumb { background: #c5c0b1; border-radius: 3px; }
        /* Hide event resize handles (triangles) */
        .fc-event-resizer { display: none !important; }
        /* Hide the timegrid "now" scroll arrow */
        .fc-timegrid-now-indicator-arrow { display: none !important; }
      `}</style>

      <div className="min-h-screen" style={{ background: "#fffdf9" }}>

        {/* ── Header ── */}
        <header style={{ background: "#fffefb", borderBottom: "1px solid #e0dcd2", padding: "0.75rem 1.5rem" }}>
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div style={{ width: 3, height: 28, background: "#6b1535", borderRadius: 2 }} />
              <div>
                <h1 className="font-heading font-semibold text-lg" style={{ color: "#201515", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                  Admin Dashboard
                </h1>
                <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#6b1535" }}>
                  Trattoria Marano
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {syncMsg && (
                <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(107,21,53,0.07)", color: "#6b1535" }}>{syncMsg}</span>
              )}
              <button
                onClick={toggleReservations}
                disabled={togglingStatus}
                title={lang === "de"
                  ? (reservationsOpen ? "Reservierungen für heute sperren" : "Reservierungen wieder öffnen")
                  : (reservationsOpen ? "Close reservations (not enough slots)" : "Re-open reservations")}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md"
                style={{
                  border: reservationsOpen ? "1px solid #c5c0b1" : "1px solid #6b1535",
                  color: reservationsOpen ? "#36342e" : "#fffefb",
                  background: reservationsOpen ? "#fffefb" : "#6b1535",
                  opacity: togglingStatus ? 0.6 : 1,
                  transition: "background 150ms, border-color 150ms, color 150ms",
                }}
              >
                {reservationsOpen ? <Lock size={12} /> : <Unlock size={12} />}
                {reservationsOpen
                  ? (lang === "de" ? "Reservierungen sperren" : "Close reservations")
                  : (lang === "de" ? "Gesperrt — öffnen" : "Closed — open")}
              </button>
              <button
                onClick={syncCalendar}
                disabled={syncing}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md"
                style={{ border: "1px solid #c5c0b1", color: "#36342e", background: "#fffefb", opacity: syncing ? 0.6 : 1, transition: "background 150ms, border-color 150ms" }}
                onMouseEnter={e => { if (!syncing) { (e.currentTarget as HTMLButtonElement).style.background = "#f4f1ea"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#a39d8e" } }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#fffefb"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#c5c0b1" }}
              >
                <RefreshCw size={12} className={syncing ? "animate-spin" : ""} />
                {syncing ? t.syncing : t.sync}
              </button>
              <button
                onClick={toggle}
                className="text-xs font-semibold px-3 py-1.5 rounded-md"
                style={{ border: "1px solid #c5c0b1", color: "#36342e", background: "#fffefb", minWidth: 40, transition: "background 150ms, border-color 150ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#f4f1ea"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#a39d8e" }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#fffefb"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#c5c0b1" }}
              >
                {lang === "de" ? "EN" : "DE"}
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/admin" })}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md"
                style={{ border: "1px solid #c5c0b1", color: "#36342e", background: "#fffefb", transition: "background 150ms, border-color 150ms, color 150ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#6b1535"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#6b1535"; (e.currentTarget as HTMLButtonElement).style.color = "#fffefb" }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#fffefb"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#c5c0b1"; (e.currentTarget as HTMLButtonElement).style.color = "#36342e" }}
              >
                <LogOut size={12} /> {t.signOut}
              </button>
            </div>
          </div>
        </header>

        {/* ── Calendar ── */}
        <main className="max-w-6xl mx-auto px-4 py-6" style={{ position: "relative" }}>
          {loading && (
            <div style={{
              position: "absolute", inset: 0, zIndex: 10,
              background: "rgba(255,253,249,0.65)",
              display: "flex", alignItems: "flex-start", justifyContent: "center",
              paddingTop: "6rem",
              backdropFilter: "blur(1px)",
              borderRadius: 8,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fffefb", border: "1px solid #e0dcd2", borderRadius: 8, padding: "0.5rem 1rem", boxShadow: "0 2px 12px rgba(32,21,21,0.07)" }}>
                <Loader2 size={13} className="animate-spin" style={{ color: "#6b1535" }} />
                <span className="text-xs font-semibold" style={{ color: "#939084" }}>
                  {lang === "de" ? "Lädt Reservierungen…" : "Loading reservations…"}
                </span>
              </div>
            </div>
          )}
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            locale={lang === "de" ? deLocale : "en"}
            firstDay={1}
            initialView="dayGridMonth"
            headerToolbar={{
              left:   "dayGridMonth,timeGridWeek,timeGridDay",
              center: "title",
              right:  "prev,next today",
            }}
            events={events}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            height="calc(100vh - 130px)"
            nowIndicator
            eventDisplay="block"
            dayMaxEvents={4}
            slotMinTime="11:30:00"
            slotMaxTime="23:30:00"
            scrollTime="11:30:00"
            businessHours={{
              daysOfWeek: [2, 3, 4, 5, 6, 0],
              startTime:  "12:00",
              endTime:    "23:00",
            }}
          />
        </main>

        {/* ── Reservation detail modal ── */}
        {selected && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            style={{ background: "rgba(32,21,21,0.45)" }}
            onClick={() => setSelected(null)}
          >
            <div
              style={{
                background: "#fffefb", border: "1px solid #d8d3c9",
                borderRadius: 12, width: "100%", maxWidth: 400, overflow: "hidden",
                boxShadow: "0 20px 60px rgba(32,21,21,0.18), 0 4px 12px rgba(32,21,21,0.08)",
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Branded top bar */}
              <div style={{ height: 3, background: "linear-gradient(90deg, #6b1535 0%, #9b2a50 100%)" }} />
              <div style={{ padding: "1.5rem" }}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-lg" style={{ color: "#201515", letterSpacing: "-0.01em", fontFamily: "var(--font-sans)" }}>
                    {selected.name}
                  </h2>
                  <div className="flex gap-1.5 mt-1">
                    {selected.status === "confirmed" ? (
                      <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded"
                        style={{ background: "#dde6d5", color: "#3a5a2d" }}>✓ {lang === "de" ? "Bestätigt" : "Confirmed"}</span>
                    ) : (
                      <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded"
                        style={{ background: "rgba(107,21,53,0.1)", color: "#6b1535" }}>{lang === "de" ? "Reserviert" : "Reserved"}</span>
                    )}
                    {(selected.status === "test" || selected.name === "TEST Reservation") && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded"
                        style={{ background: "#eceae3", color: "#939084" }}>test</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{ color: "#939084", transition: "color 150ms" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#201515")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#939084")}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3" style={{ color: "#36342e" }}>
                  <Calendar size={14} style={{ color: "#6b1535", flexShrink: 0 }} />
                  <span>{selected.date}</span>
                </div>
                <div className="flex items-center gap-3" style={{ color: "#36342e" }}>
                  <Clock size={14} style={{ color: "#6b1535" }} />
                  <span>{selected.time}</span>
                </div>
                <div className="flex items-center gap-3" style={{ color: "#36342e" }}>
                  <Users size={14} style={{ color: "#6b1535" }} />
                  <span>{selected.guests} {t.guests(selected.guests)}</span>
                </div>
                {selected.phone && (
                  <div className="flex items-center gap-3" style={{ color: "#36342e" }}>
                    <Phone size={14} style={{ color: "#6b1535" }} />
                    <span>{selected.phone}</span>
                  </div>
                )}
                {selected.email && (
                  <div className="flex items-center gap-3" style={{ color: "#36342e" }}>
                    <Mail size={14} style={{ color: "#6b1535" }} />
                    <span>{selected.email}</span>
                  </div>
                )}
                {selected.message && (
                  <div className="flex items-start gap-3" style={{ color: "#36342e" }}>
                    <MessageSquare size={14} style={{ color: "#6b1535", marginTop: 2 }} />
                    <span className="italic" style={{ color: "#939084" }}>"{selected.message}"</span>
                  </div>
                )}
              </div>

              <AdminNotesEditor
                reservationId={selected.id}
                initialNotes={selected.adminNotes ?? ""}
                lang={lang}
                onSaved={notes => {
                  setSelected(prev => prev ? { ...prev, adminNotes: notes } : prev)
                  setReservations(list => list.map(r => r.id === selected.id ? { ...r, adminNotes: notes } : r))
                }}
              />

              <div className="mt-5 pt-4" style={{ borderTop: "1px solid #ede9e0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="text-xs" style={{ color: "#b8b2a5" }}>
                  {t.submitted} {new Date(selected.createdAt).toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", {
                    day: "2-digit", month: "short", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  })}
                </p>
                {selected.calendarEventId && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: "rgba(107,21,53,0.07)", color: "#6b1535" }}>
                    ✓ Calendar
                  </span>
                )}
              </div>
              </div>{/* end padding wrapper */}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function renderEventContent(info: EventContentArg) {
  const r = info.event.extendedProps as Reservation
  const time = info.timeText
  const note = r.adminNotes?.trim() ?? ""
  return (
    <div style={{ padding: "2px 4px", overflow: "hidden", fontSize: 11, lineHeight: 1.25 }}>
      {time && <div style={{ opacity: 0.85, fontSize: 10 }}>{time}</div>}
      <div style={{ fontWeight: 600 }}>
        {r.status === "confirmed" ? "✓ " : ""}{r.name} · {r.guests}p
      </div>
      {note && (
        <div
          title={note}
          style={{
            marginTop: 2,
            fontSize: 10,
            opacity: 0.95,
            fontStyle: "italic",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            borderTop: "1px solid rgba(255,255,255,0.25)",
            paddingTop: 1,
          }}
        >
          ✎ {note}
        </div>
      )}
    </div>
  )
}

function AdminNotesEditor({
  reservationId,
  initialNotes,
  lang,
  onSaved,
}: {
  reservationId: number
  initialNotes: string
  lang: "de" | "en"
  onSaved: (notes: string) => void
}) {
  const [value, setValue] = useState(initialNotes)
  const [saving, setSaving] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isSavingRef = useRef(false)

  useEffect(() => {
    setValue(initialNotes)
    setError(null)
  }, [reservationId, initialNotes])

  const dirty = value !== initialNotes

  async function save() {
    if (value === initialNotes || isSavingRef.current) return
    isSavingRef.current = true
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/reservations/${reservationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: value.trim() || null }),
      })
      if (res.ok) {
        onSaved(value.trim() || "")
        setSavedFlash(true)
        setTimeout(() => setSavedFlash(false), 1600)
      } else {
        const body = await res.json().catch(() => ({}))
        setError(body.error || `HTTP ${res.status}`)
      }
    } catch (e) {
      setError((e as Error).message)
    } finally {
      isSavingRef.current = false
      setSaving(false)
    }
  }

  return (
    <div className="mt-5 pt-4" style={{ borderTop: "1px solid #ede9e0" }}>
      <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#939084" }}>
        {lang === "de" ? "Interne Notizen" : "Internal notes"}
      </label>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={lang === "de"
          ? "z.B. Allergien, Geburtstag, Stammgast, Sitzplatz-Präferenz…"
          : "e.g. allergies, birthday, regular guest, seating preference…"}
        rows={3}
        className="w-full text-sm"
        style={{
          padding: "0.6rem 0.75rem",
          border: "1px solid #c5c0b1",
          borderRadius: 6,
          background: "#fffefb",
          color: "#201515",
          fontFamily: "var(--font-sans)",
          resize: "vertical",
          outline: "none",
        }}
      />
      {error && (
        <p className="text-[11px] mt-1.5" style={{ color: "#c0392b" }}>
          ⚠ {error}
        </p>
      )}
      <div className="flex items-center justify-between mt-2">
        <p className="text-[11px]" style={{ color: "#b8b2a5" }}>
          {lang === "de"
            ? "Nur im Dashboard sichtbar — wird nicht an Gäste gesendet."
            : "Dashboard only — never sent to guests."}
        </p>
        <div className="flex items-center gap-2">
          {savedFlash && (
            <span className="text-[11px]" style={{ color: "#4a6b3a" }}>
              {lang === "de" ? "Gespeichert" : "Saved"}
            </span>
          )}
          <button
            onClick={save}
            disabled={!dirty || saving}
            className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded"
            style={{
              background: dirty ? "#6b1535" : "#eceae3",
              color: dirty ? "#fffefb" : "#939084",
              cursor: dirty && !saving ? "pointer" : "default",
              transition: "background 160ms, color 160ms",
            }}
          >
            {saving
              ? (lang === "de" ? "Speichert…" : "Saving…")
              : (lang === "de" ? "Speichern" : "Save")}
          </button>
        </div>
      </div>
    </div>
  )
}
