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

  // Admin is single-language: redirect /en/admin* and /it/admin* → /admin*
  if (pathname.startsWith("/en/admin") || pathname.startsWith("/it/admin")) {
    const url = req.nextUrl.clone()
    url.pathname = pathname.slice(3) // strip "/en" or "/it"
    return NextResponse.redirect(url)
  }

  const res = NextResponse.next()
  res.headers.set("x-locale", locale)
  res.headers.set("x-pathname", pathname)
  return res
}

export const config = {
  matcher: ["/((?!_next/|api/|images/|fonts/|favicon|robots.txt|sitemap.xml).*)"],
}
