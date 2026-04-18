"use client"
import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Leaf, Flame } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { menuCategories } from "@/data/menu"
import type { Lang } from "@/context/LanguageContext"

// Flatten all menu items — positions assigned at render time for brick stagger
const allItems = menuCategories.flatMap(cat => cat.items)

const BLUR_URL = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI2IiBoZWlnaHQ9IjQiIGZpbGw9IiNmMGRmZDAiLz48L3N2Zz4="

function getImageSrc(image?: string) {
  if (!image) return null
  return `/images/wolt/${image}`
}

export default function MenuColumnsSection() {
  const { lang } = useLanguage()
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems
    const q = query.toLowerCase()
    return allItems.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.description[lang as Lang]?.toLowerCase().includes(q)
    )
  }, [query, lang])

  return (
    <section className="py-16" style={{ background: "transparent" }}>
      <div style={{ maxWidth: 1720, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header + search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="section-label mb-1">{lang === "de" ? "Unsere Speisekarte" : "Our Menu"}</p>
            <Link href="/#menu" className="text-xs font-semibold" style={{ color: "#6b1535" }}>
              {lang === "de" ? "Vollständige Karte ansehen →" : "View full menu →"}
            </Link>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2.5 w-full sm:w-72"
            style={{
              background: "rgba(255,254,251,0.95)",
              border: "1px solid rgba(107,21,53,0.15)",
              borderRadius: 8,
              boxShadow: "rgba(107,21,53,0.04) 0px 2px 8px",
            }}
          >
            <Search size={14} style={{ color: "#939084", flexShrink: 0 }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={lang === "de" ? "Gericht suchen…" : "Search dishes…"}
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: "#201515" }}
            />
          </div>
        </div>

        {/* Brick masonry grid — 7 cols, 3 per row, staggered offset */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
          {filtered.map((item, i) => {
            const ITEMS_PER_ROW = 3
            const row = Math.floor(i / ITEMS_PER_ROW)
            const col = i % ITEMS_PER_ROW
            // Even rows: col 1,3,5 — odd rows: col 2,4,6
            const colStart = row % 2 === 0 ? col * 2 + 1 : col * 2 + 2
            const imgSrc = getImageSrc(item.image)
            return (
              <div
                key={item.id}
                className="overflow-hidden"
                style={{
                  gridColumn: `${colStart} / span 2`,
                  gridRow: row + 1,
                  height: 160,
                  display: "flex",
                  borderRadius: 10,
                  border: "1px solid rgba(107,21,53,0.1)",
                  background: "#fffefb",
                  boxShadow: "rgba(107,21,53,0.04) 0px 4px 18px, rgba(107,21,53,0.02) 0px 1px 4px",
                  transition: "box-shadow 200ms ease, transform 200ms ease",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = "rgba(107,21,53,0.1) 0px 8px 28px, rgba(107,21,53,0.05) 0px 2px 8px"
                  el.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = "rgba(107,21,53,0.04) 0px 4px 18px, rgba(107,21,53,0.02) 0px 1px 4px"
                  el.style.transform = "none"
                }}
              >
                {/* Photo — left 42% */}
                <div
                  style={{
                    position: "relative",
                    flexShrink: 0,
                    overflow: "hidden",
                    width: "42%",
                    height: "100%",
                    background: imgSrc ? "#f0dfd0" : "linear-gradient(155deg,#6b1535 0%,#3d0e1f 100%)",
                  }}
                >
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                      style={{ objectPosition: "center" }}
                      sizes="(max-width: 768px) 42vw, 300px"
                      placeholder="blur"
                      blurDataURL={BLUR_URL}
                    />
                  )}
                  {!imgSrc && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/30 text-3xl font-heading font-bold">{item.name[0]}</span>
                    </div>
                  )}
                </div>

                {/* Text — right side */}
                <div className="flex-1 px-4 py-3 flex flex-col justify-center min-w-0 overflow-hidden">
                  {/* Name + price */}
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <span
                      className="font-heading font-semibold text-sm leading-snug"
                      style={{
                        color: "#201515",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      } as React.CSSProperties}
                    >
                      {item.name}
                    </span>
                    <span
                      className="font-heading font-semibold text-sm whitespace-nowrap shrink-0 ml-1"
                      style={{ color: "#6b1535" }}
                    >
                      {item.price.toFixed(2)} €
                    </span>
                  </div>
                  {/* Description */}
                  <p
                    className="text-xs leading-relaxed mb-1.5"
                    style={{
                      color: "#939084",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    } as React.CSSProperties}
                  >
                    {item.description[lang as Lang]}
                  </p>
                  {/* Icons */}
                  <div className="flex items-center gap-1.5">
                    {item.vegetarian && <Leaf size={10} style={{ color: "#4a7c59" }} />}
                    {item.spicy && <Flame size={10} style={{ color: "#6b1535" }} />}
                    {item.allergens && (
                      <span className="text-[10px]" style={{ color: "#c5c0b1" }}>{item.allergens}</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div style={{ gridColumn: "span 6", textAlign: "center", padding: "3rem", color: "#939084" }}>
              {lang === "de" ? "Keine Gerichte gefunden." : "No dishes found."}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
