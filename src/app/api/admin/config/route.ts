import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getConfig, updateConfig } from "@/lib/config-store"

const ALLOWED_EMAIL = "maranotrattoria@gmail.com"

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const config = await getConfig()
  return NextResponse.json(config)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const patch: { reservationsOpen?: boolean } = {}

  if (typeof body.reservationsOpen === "boolean") {
    patch.reservationsOpen = body.reservationsOpen
  }

  const updated = await updateConfig(patch)
  return NextResponse.json({ ok: true, reservationsOpen: updated.reservationsOpen })
}
