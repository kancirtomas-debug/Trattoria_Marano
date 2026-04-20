import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { updateAdminNotes } from "@/lib/reservations-store"

const ALLOWED_EMAIL = "maranotrattoria@gmail.com"

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
    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : ((e as any)?.message ?? JSON.stringify(e))
    console.error("[reservations PATCH] failed:", msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
