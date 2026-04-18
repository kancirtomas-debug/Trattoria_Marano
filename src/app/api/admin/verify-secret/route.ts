import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { secret } = await req.json()

  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  // Set httpOnly cookie — valid 1 hour
  res.cookies.set("admin_verified", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  })
  return res
}
