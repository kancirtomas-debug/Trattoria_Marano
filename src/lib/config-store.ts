import { supabaseAdmin } from "./supabase"

export type AdminConfig = {
  webhookUrl: string | null
  calendarId: string | null
  calendarName: string | null
  reservationsOpen: boolean
  updatedAt: string
}

const SINGLETON_ID = 1

function rowToConfig(row: {
  webhook_url: string | null
  calendar_id: string | null
  calendar_name: string | null
  reservations_open: boolean
  updated_at: string
}): AdminConfig {
  return {
    webhookUrl: row.webhook_url,
    calendarId: row.calendar_id,
    calendarName: row.calendar_name,
    reservationsOpen: row.reservations_open,
    updatedAt: row.updated_at,
  }
}

export async function getConfig(): Promise<AdminConfig> {
  const { data, error } = await supabaseAdmin
    .from("admin_config")
    .select("*")
    .eq("id", SINGLETON_ID)
    .single()

  if (error) throw error
  return rowToConfig(data)
}

export async function updateConfig(
  patch: Partial<Pick<AdminConfig, "webhookUrl" | "calendarId" | "calendarName" | "reservationsOpen">>,
): Promise<AdminConfig> {
  const row: Record<string, unknown> = {}
  if (patch.webhookUrl !== undefined) row.webhook_url = patch.webhookUrl
  if (patch.calendarId !== undefined) row.calendar_id = patch.calendarId
  if (patch.calendarName !== undefined) row.calendar_name = patch.calendarName
  if (patch.reservationsOpen !== undefined) row.reservations_open = patch.reservationsOpen

  const { data, error } = await supabaseAdmin
    .from("admin_config")
    .update(row)
    .eq("id", SINGLETON_ID)
    .select()
    .single()

  if (error) throw error
  return rowToConfig(data)
}
