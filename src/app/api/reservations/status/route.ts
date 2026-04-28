import { NextResponse } from "next/server"
import { getConfig } from "@/lib/config-store"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const cfg = await getConfig()
    return NextResponse.json(
      { open: cfg.reservationsOpen },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch {
    return NextResponse.json(
      { open: true },
      { headers: { "Cache-Control": "no-store" } },
    )
  }
}
