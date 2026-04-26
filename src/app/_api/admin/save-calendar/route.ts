import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { updateConfig } from "@/lib/config-store"

const ALLOWED_EMAIL = "maranotrattoria@gmail.com"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { calendarId, calendarName } = await req.json()
  if (!calendarId) {
    return NextResponse.json({ error: "Missing calendarId" }, { status: 400 })
  }

  const config = await updateConfig({ calendarId, calendarName: calendarName ?? null })
  return NextResponse.json({ ok: true, config })
}
