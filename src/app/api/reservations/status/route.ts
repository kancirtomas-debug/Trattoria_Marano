import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const CONFIG_PATH = path.join(process.cwd(), "src", "data", "admin-config.json")

export async function GET() {
  try {
    const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"))
    const open = cfg.reservationsOpen !== false
    return NextResponse.json({ open }, { headers: { "Cache-Control": "no-store" } })
  } catch {
    return NextResponse.json({ open: true }, { headers: { "Cache-Control": "no-store" } })
  }
}
