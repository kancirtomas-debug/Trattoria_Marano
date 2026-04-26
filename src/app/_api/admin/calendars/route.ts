import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { listCalendars } from "@/lib/calendar"

const ALLOWED_EMAIL = "maranotrattoria@gmail.com"

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const calendars = await listCalendars()
    return NextResponse.json({ calendars })
  } catch (err) {
    console.error("[calendars] list failed:", err)
    return NextResponse.json({ error: "Failed to list calendars" }, { status: 500 })
  }
}
