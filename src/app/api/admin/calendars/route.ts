import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { google } from "googleapis"

const ALLOWED_EMAIL = "maranotrattoria@gmail.com"

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const accessToken = (session as any).accessToken as string
  const auth = new google.auth.OAuth2()
  auth.setCredentials({ access_token: accessToken })

  const calendar = google.calendar({ version: "v3", auth })
  const { data } = await calendar.calendarList.list()

  const calendars = (data.items ?? []).map(c => ({
    id:      c.id,
    summary: c.summary,
    primary: c.primary ?? false,
    color:   c.backgroundColor,
  }))

  return NextResponse.json({ calendars })
}
