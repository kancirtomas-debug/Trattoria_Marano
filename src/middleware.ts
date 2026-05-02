import { NextResponse, type NextRequest } from "next/server"

const LOCALES = ["de", "en", "it"] as const
type Locale = typeof LOCALES[number]

function detectLocale(pathname: string): Locale {
  if (pathname.startsWith("/en/") || pathname === "/en") return "en"
  if (pathname.startsWith("/it/") || pathname === "/it") return "it"
  return "de"
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const locale = detectLocale(pathname)

  const res = NextResponse.next()
  res.headers.set("x-locale", locale)
  res.headers.set("x-pathname", pathname)
  return res
}

export const config = {
  matcher: ["/((?!_next/|api/|images/|fonts/|favicon|robots.txt|sitemap.xml).*)"],
}
