import { supabaseAdmin } from "./supabase"

export type Lang = "de" | "en"
export type ReservationStatus = "pending" | "confirmed" | "cancelled"

export type Reservation = {
  id: number
  name: string
  phone: string
  email: string | null
  date: string
  time: string
  guests: number
  message: string | null
  lang: Lang
  cancelToken: string
  calendarEventId: string | null
  remindersSent: string[]
  status: ReservationStatus
  createdAt: string
  updatedAt: string
}

type Row = {
  id: number
  name: string
  phone: string
  email: string | null
  date: string
  time: string
  guests: number
  message: string | null
  lang: Lang
  cancel_token: string
  calendar_event_id: string | null
  reminders_sent: string[]
  status: ReservationStatus
  created_at: string
  updated_at: string
}

function rowToReservation(r: Row): Reservation {
  return {
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email,
    date: r.date,
    time: typeof r.time === "string" ? r.time.slice(0, 5) : r.time,
    guests: r.guests,
    message: r.message,
    lang: r.lang,
    cancelToken: r.cancel_token,
    calendarEventId: r.calendar_event_id,
    remindersSent: Array.isArray(r.reminders_sent) ? r.reminders_sent : [],
    status: r.status,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }
}

export async function createReservation(input: {
  name: string
  phone: string
  email?: string | null
  date: string
  time: string
  guests: number
  message?: string | null
  lang: Lang
}): Promise<Reservation> {
  const { data, error } = await supabaseAdmin
    .from("reservations")
    .insert({
      name: input.name,
      phone: input.phone,
      email: input.email ?? null,
      date: input.date,
      time: input.time,
      guests: input.guests,
      message: input.message ?? null,
      lang: input.lang,
    })
    .select()
    .single()

  if (error) throw error
  return rowToReservation(data as Row)
}

export async function getAllReservations(): Promise<Reservation[]> {
  const { data, error } = await supabaseAdmin
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return (data as Row[]).map(rowToReservation)
}

export async function getByCancelToken(token: string): Promise<Reservation | null> {
  const { data, error } = await supabaseAdmin
    .from("reservations")
    .select("*")
    .eq("cancel_token", token)
    .maybeSingle()

  if (error) throw error
  return data ? rowToReservation(data as Row) : null
}

export async function setCalendarEventId(id: number, calendarEventId: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from("reservations")
    .update({ calendar_event_id: calendarEventId })
    .eq("id", id)

  if (error) throw error
}

export async function setStatus(id: number, status: ReservationStatus): Promise<void> {
  const { error } = await supabaseAdmin
    .from("reservations")
    .update({ status })
    .eq("id", id)

  if (error) throw error
}

export async function addReminderSent(id: number, key: string): Promise<void> {
  const { data: row, error: readErr } = await supabaseAdmin
    .from("reservations")
    .select("reminders_sent")
    .eq("id", id)
    .single()

  if (readErr) throw readErr

  const current: string[] = Array.isArray(row.reminders_sent) ? row.reminders_sent : []
  if (current.includes(key)) return

  const { error: writeErr } = await supabaseAdmin
    .from("reservations")
    .update({ reminders_sent: [...current, key] })
    .eq("id", id)

  if (writeErr) throw writeErr
}

export async function getUnsynced(): Promise<Reservation[]> {
  const { data, error } = await supabaseAdmin
    .from("reservations")
    .select("*")
    .is("calendar_event_id", null)
    .neq("status", "cancelled")

  if (error) throw error
  return (data as Row[]).map(rowToReservation)
}
