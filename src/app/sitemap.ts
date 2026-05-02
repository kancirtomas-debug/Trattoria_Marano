import { MetadataRoute } from "next"

const BASE = "https://www.trattoria-marano.de"

const ROUTE_DATES = {
  "/":            "2026-04-29",
  "/about":       "2026-04-27",
  "/gallery":     "2026-04-27",
  "/events":      "2026-04-27",
  "/contact":     "2026-04-27",
  "/reserve":     "2026-04-27",
  "/datenschutz": "2026-04-26",
} as const

type RoutePath = keyof typeof ROUTE_DATES

const ROUTES: { path: RoutePath; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { path: "/",            changeFrequency: "weekly",  priority: 1 },
  { path: "/about",       changeFrequency: "monthly", priority: 0.8 },
  { path: "/gallery",     changeFrequency: "monthly", priority: 0.8 },
  { path: "/events",      changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact",     changeFrequency: "yearly",  priority: 0.7 },
  { path: "/reserve",     changeFrequency: "monthly", priority: 0.9 },
  { path: "/datenschutz", changeFrequency: "yearly",  priority: 0.3 },
]

function localePath(locale: "de" | "en" | "it", path: RoutePath): string {
  if (locale === "de") return path === "/" ? "" : path
  return path === "/" ? `/${locale}` : `/${locale}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const r of ROUTES) {
    const lastModified = new Date(ROUTE_DATES[r.path])

    const langs = {
      "de-DE": `${BASE}${localePath("de", r.path)}` || BASE,
      "en-US": `${BASE}${localePath("en", r.path)}`,
      "it-IT": `${BASE}${localePath("it", r.path)}`,
    }

    for (const locale of ["de", "en", "it"] as const) {
      const url = `${BASE}${localePath(locale, r.path)}` || BASE
      entries.push({
        url,
        lastModified,
        changeFrequency: r.changeFrequency,
        priority: locale === "de" ? r.priority : r.priority * 0.95,
        alternates: { languages: langs },
      })
    }
  }

  return entries
}
