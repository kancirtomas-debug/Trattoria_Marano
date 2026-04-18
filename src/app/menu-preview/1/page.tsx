"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useMemo } from "react"
import { menuCategories } from "@/data/menu"
import { useLanguage } from "@/context/LanguageContext"
import { Leaf, Flame, Search, X } from "lucide-react"

function getImageSrc(image?: string) {
  if (!image) return null
  if (image.startsWith("lieferando-")) return `/images/lieferando/${image}`
  return `/images/wolt/${image}`
}

type Filter = "none" | "vegetarian" | "spicy"

export default function PrintedMenuWithPhotos() {
  const { lang }            = useLanguage()
  const [filter, setFilter] = useState<Filter>("none")
  const [query, setQuery]   = useState("")
  const [lightbox, setLightbox] = useState<{ src: string; name: string } | null>(null)

  const de = lang === "de"

  const filtered = useMemo(() => {
    return menuCategories.map(cat => ({
      ...cat,
      items: cat.items.filter(item => {
        const matchesFilter =
          filter === "none" ||
          (filter === "vegetarian" && item.vegetarian) ||
          (filter === "spicy" && item.spicy)
        const q = query.trim().toLowerCase()
        const matchesQuery = !q ||
          item.name.toLowerCase().includes(q) ||
          item.description.de.toLowerCase().includes(q) ||
          item.description.en.toLowerCase().includes(q)
        return matchesFilter && matchesQuery
      }),
    })).filter(cat => cat.items.length > 0)
  }, [filter, query])

  return (
    <div style={{ minHeight: "100vh", background: "#fffefb", fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* Dev nav bar */}
      <div style={{ background: "#201515", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: "#939084", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "system-ui" }}>
          Layout 1 — Printed Menu + Photos
        </span>
        <Link href="/menu-preview" style={{ color: "#6b1535", fontSize: 12, fontFamily: "system-ui", textDecoration: "none" }}>
          ← All layouts
        </Link>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "3.5rem 2rem 5rem" }}>

        {/* Restaurant header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#939084", marginBottom: 10, fontFamily: "system-ui" }}>
            Ohlmüllerstr. 22 · 81541 München · Di–So geöffnet
          </p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: "#201515", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 8 }}>
            Trattoria Marano
          </h1>
          <p style={{ fontStyle: "italic", color: "#939084", fontSize: "0.9rem" }}>
            Autentica Cucina Italiana · München
          </p>
          <div style={{ marginTop: "1.5rem", borderTop: "2px solid #201515", borderBottom: "1px solid #201515", paddingTop: 3 }} />
        </div>

        {/* ── Filter + Search bar ── */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: "2.5rem" }}>
          <button
            onClick={() => setFilter(f => f === "vegetarian" ? "none" : "vegetarian")}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 6, fontSize: "0.78rem", fontWeight: 600,
              fontFamily: "system-ui", cursor: "pointer", transition: "all 160ms",
              background: filter === "vegetarian" ? "#4a7c59" : "#fffefb",
              color:      filter === "vegetarian" ? "#fff"    : "#4a7c59",
              border:     filter === "vegetarian" ? "1px solid #4a7c59" : "1px solid #c5c0b1",
            }}
          >
            <Leaf size={13} /> {de ? "Vegetarisch" : "Vegetarian"}
          </button>

          <button
            onClick={() => setFilter(f => f === "spicy" ? "none" : "spicy")}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 6, fontSize: "0.78rem", fontWeight: 600,
              fontFamily: "system-ui", cursor: "pointer", transition: "all 160ms",
              background: filter === "spicy" ? "#b91c1c" : "#fffefb",
              color:      filter === "spicy" ? "#fff"    : "#b91c1c",
              border:     filter === "spicy" ? "1px solid #b91c1c" : "1px solid #c5c0b1",
            }}
          >
            <Flame size={13} /> {de ? "Scharf" : "Spicy"}
          </button>

          {filter !== "none" && (
            <button
              onClick={() => setFilter("none")}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "7px 12px", borderRadius: 6, fontSize: "0.75rem",
                fontFamily: "system-ui", cursor: "pointer",
                background: "transparent", color: "#939084",
                border: "1px solid #e0dcd2",
              }}
            >
              <X size={11} /> {de ? "Filter aufheben" : "Clear filter"}
            </button>
          )}

          <div style={{ flex: 1 }} />

          <div
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 14px", borderRadius: 6,
              background: "#fffefb", border: "1px solid #c5c0b1",
              width: "100%", maxWidth: 240,
            }}
          >
            <Search size={13} style={{ color: "#939084", flexShrink: 0 }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={de ? "Gericht suchen…" : "Search dishes…"}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.78rem", color: "#201515", fontFamily: "system-ui" }}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#939084", padding: 0, display: "flex" }}>
                <X size={11} />
              </button>
            )}
          </div>
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem 0", color: "#939084", fontFamily: "system-ui", fontSize: "0.875rem", fontStyle: "italic" }}>
            {de ? "Keine Gerichte gefunden." : "No dishes found."}
          </div>
        )}

        {/* ── Categories ── */}
        {filtered.map(cat => (
          <div key={cat.id} style={{ marginBottom: "2.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.5rem" }}>
              <div style={{ flex: 1, height: 1, background: "#c5c0b1" }} />
              <h2 style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#6b1535", fontFamily: "system-ui", whiteSpace: "nowrap" }}>
                {cat.label[lang]}
              </h2>
              <div style={{ flex: 1, height: 1, background: "#c5c0b1" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {cat.items.map((item, idx) => {
                const imgSrc = getImageSrc(item.image)
                return (
                  <div
                    key={item.id}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 20,
                      paddingTop: "1rem", paddingBottom: "1rem",
                      borderBottom: idx < cat.items.length - 1 ? "1px solid #f0ede6" : "none",
                    }}
                  >
                    {/* Text block */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Name + dots + price — always on same line */}
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: "0.93rem", color: "#201515", letterSpacing: "-0.005em", whiteSpace: "nowrap" }}>
                          {item.name}
                        </span>
                        {item.vegetarian && <Leaf size={11} style={{ color: "#4a7c59", flexShrink: 0, marginBottom: -1 }} />}
                        {item.spicy      && <Flame size={11} style={{ color: "#b91c1c", flexShrink: 0, marginBottom: -1 }} />}
                        {/* Dotted leader — always shown */}
                        <span style={{ flex: 1, borderBottom: "1px dotted #c5c0b1", minWidth: 20, marginBottom: 4 }} />
                        {/* Price */}
                        <span style={{ fontWeight: 700, fontSize: "0.93rem", color: "#201515", whiteSpace: "nowrap", fontFamily: "system-ui", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em", flexShrink: 0 }}>
                          {item.price.toFixed(2)} €
                        </span>
                      </div>
                      {/* Description — language-aware */}
                      <p style={{ fontStyle: "italic", fontSize: "0.8rem", color: "#939084", lineHeight: 1.6, fontFamily: "system-ui", maxWidth: "56ch" }}>
                        {item.description[lang]}
                      </p>
                      {item.allergens && (
                        <p style={{ fontSize: "0.67rem", color: "#c5c0b1", marginTop: 3, fontFamily: "system-ui" }}>
                          {de ? "Allergene" : "Allergens"}: {item.allergens}
                        </p>
                      )}
                    </div>

                    {/* Clickable photo */}
                    {imgSrc && (
                      <div
                        onClick={() => setLightbox({ src: imgSrc, name: item.name })}
                        style={{
                          position: "relative", width: 120, height: 90,
                          borderRadius: 6, overflow: "hidden", flexShrink: 0,
                          border: "1px solid rgba(107,21,53,0.08)",
                          cursor: "zoom-in", transition: "transform 200ms, box-shadow 200ms",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)"
                          ;(e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(32,21,21,0.15)"
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"
                          ;(e.currentTarget as HTMLDivElement).style.boxShadow = "none"
                        }}
                      >
                        <Image src={imgSrc} alt={item.name} fill unoptimized className="object-cover" sizes="120px" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div style={{ borderTop: "1px solid #c5c0b1", paddingTop: "1.5rem", marginTop: "1rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8 }}>
          <p style={{ fontSize: "0.72rem", fontStyle: "italic", color: "#939084", fontFamily: "system-ui" }}>
            {de ? "Alle Preise inkl. MwSt. · Auf Wunsch Pizza mit Dinkelmehl erhältlich." : "All prices incl. VAT · Pizza available with spelt flour on request."}
          </p>
          <div style={{ display: "flex", gap: 12, fontSize: "0.72rem", color: "#939084", fontFamily: "system-ui", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Leaf size={10} style={{ color: "#4a7c59" }} /> {de ? "Vegetarisch" : "Vegetarian"}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Flame size={10} style={{ color: "#b91c1c" }} /> {de ? "Scharf" : "Spicy"}</span>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "rgba(32,21,21,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1.5rem", cursor: "zoom-out",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ position: "relative", maxWidth: 640, width: "100%", cursor: "default" }}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: "absolute", top: -14, right: -14, zIndex: 10,
                width: 32, height: 32, borderRadius: "50%",
                background: "#201515", border: "1px solid #3d2a2a",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#fffefb",
              }}
            >
              <X size={15} />
            </button>
            {/* Image */}
            <div style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.src}
                alt={lightbox.name}
                style={{ width: "100%", height: "auto", display: "block", maxHeight: "75vh", objectFit: "cover" }}
              />
            </div>
            {/* Caption */}
            <p style={{
              textAlign: "center", marginTop: 14,
              fontFamily: "Georgia, serif", fontStyle: "italic",
              fontSize: "0.9rem", color: "rgba(255,254,251,0.7)",
            }}>
              {lightbox.name}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
