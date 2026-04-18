import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import fs from "fs"
import path from "path"

const CONFIG_PATH = path.join(process.cwd(), "src", "data", "admin-config.json")
const ALLOWED_EMAIL = "maranotrattoria@gmail.com"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { webhookUrl } = await req.json()
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"))
  config.webhookUrl = webhookUrl || null
  config.updatedAt  = new Date().toISOString()
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2))

  return NextResponse.json({ ok: true })
}
