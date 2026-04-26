import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { updateAdminNotes, setStatus, type ReservationStatus } from "@/lib/reservations-store"

const ALLOWED_EMAIL = "maranotrattoria@gmail.com"
const VALID_STATUS: ReservationStatus[] = ["pending", "confirmed", "cancelled"]

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const id = Number(params.id)
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }

  const body = await req.json().catch(() => ({}))
  try {
    if (typeof body.adminNotes === "string" || body.adminNotes === null) {
      await updateAdminNotes(id, body.adminNotes)
    }
    if (typeof body.status === "string" && VALID_STATUS.includes(body.status as ReservationStatus)) {
      await setStatus(id, body.status as ReservationStatus)
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    const raw = e as any
    const msg =
      e instanceof Error ? e.message
      : typeof raw?.message === "string" ? raw.message
      : typeof raw?.hint === "string" ? raw.hint
      : typeof raw?.details === "string" ? raw.details
      : JSON.stringify(raw)
    console.error("[reservations PATCH] failed:", msg, raw)
    return NextResponse.json({ error: String(msg) }, { status: 500 })
  }
}
