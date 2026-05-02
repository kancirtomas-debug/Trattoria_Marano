"use client"
import { usePathname } from "next/navigation"
import { localeFromPath, withLocale } from "@/context/LanguageContext"

const BASE = "https://www.trattoria-marano.de"

type Crumb = { name: string; path: string }

export default function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const pathname = usePathname() || "/"
  const lang = localeFromPath(pathname)
  const homePath = withLocale("/", lang)

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}${homePath === "/" ? "" : homePath}` },
      ...items.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: `${BASE}${withLocale(c.path, lang)}`,
      })),
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
