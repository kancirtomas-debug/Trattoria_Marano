import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import fs from "fs"
import path from "path"

const CONFIG_PATH = path.join(process.cwd(), "src", "data", "admin-config.json")
const ALLOWED_EMAIL = "maranotrattoria@gmail.com"

function readConfig() {
  const raw = fs.readFileSync(CONFIG_PATH, "utf-8")
  return JSON.parse(raw)
}

function writeConfig(cfg: Record<string, unknown>) {
  cfg.updatedAt = new Date().toISOString()
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2))
}

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return NextResponse.json(readConfig())
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const cfg = readConfig()

  if (typeof body.reservationsOpen === "boolean") {
    cfg.reservationsOpen = body.reservationsOpen
  }

  writeConfig(cfg)
  return NextResponse.json({ ok: true, reservationsOpen: cfg.reservationsOpen })
}
