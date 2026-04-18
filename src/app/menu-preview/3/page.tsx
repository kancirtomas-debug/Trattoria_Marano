"use client"
import Link from "next/link"
import { useState } from "react"
import { menuCategories } from "@/data/menu"
import { Leaf, Flame, ArrowRight } from "lucide-react"

const TABS = [
  { id: "antipasti",      label: "Antipasti" },
  { id: "pasta-speciale", label: "Pasta" },
  { id: "pizza-classica", label: "Pizza" },
  { id: "dolci",          label: "Dolci" },
]

export default function MagazineSpread() {
  const [active, setActive] = useState("antipasti")
  const cat   = menuCategories.find(c => c.id === active)
  const items = cat?.items ?? []
  const featured = items[0]
  const rest     = items.slice(1)

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0" }}>

      {/* Nav bar */}
      <div style={{ background: "#201515", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: "#939084", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "system-ui" }}>Layout 3 — Magazine Spread</span>
        <Link href="/menu-preview" style={{ color: "#6b1535", fontSize: 12, fontFamily: "system-ui", textDecoration: "none" }}>← All layouts</Link>
      </div>

      {/* Page header */}
      <div style={{ background: "#201515", padding: "3rem 2rem 2.5rem", textAlign: "center" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b1535", marginBottom: 8, fontFamily: "system-ui" }}>
          Trattoria Marano · München
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#fffefb", letterSpacing: "-0.02em", lineHeight: 1 }}>
          Speisekarte
        </h1>
      </div>

      {/* Sticky category tabs */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#fffefb", borderBottom: "1px solid #e0dcd2" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", overflowX: "auto", padding: "0 1.5rem" }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              style={{
                padding: "1rem 1.25rem", fontSize: "0.85rem", fontWeight: active === tab.id ? 700 : 400,
                color: active === tab.id ? "#201515" : "#939084",
                background: "transparent", border: "none", cursor: "pointer",
                borderBottom: active === tab.id ? "2.5px solid #6b1535" : "2.5px solid transparent",
                whiteSpace: "nowrap", transition: "color 160ms",
                fontFamily: "Georgia, serif",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* ── Featured dish hero ── */}
        {featured && (
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
            borderRadius: 14, overflow: "hidden", marginBottom: "3rem",
            boxShadow: "0 8px 40px rgba(32,21,21,0.12)",
            minHeight: 320,
          }}>
            {/* Photo */}
            <div style={{ position: "relative", minHeight: 320 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/featured-dish-hero/700/500"
                alt={featured.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            {/* Text */}
            <div style={{ background: "#201515", padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6b1535", marginBottom: 14, fontFamily: "system-ui" }}>
                  {cat?.label.de} · Empfehlung
                </p>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "#fffefb", lineHeight: 1.15, marginBottom: 16 }}>
                  {featured.name}
                </h2>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,254,251,0.6)", lineHeight: 1.7, fontFamily: "system-ui" }}>
                  {featured.description.de}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24 }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fffefb", fontVariantNumeric: "tabular-nums", fontFamily: "system-ui" }}>
                  {featured.price.toFixed(2)} €
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  {featured.vegetarian && <span style={{ background: "#4a7c59", borderRadius: 4, padding: "4px 8px", display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#fff", fontFamily: "system-ui" }}><Leaf size={11} /> Veggie</span>}
                  {featured.spicy && <span style={{ background: "#6b1535", borderRadius: 4, padding: "4px 8px", display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#fff", fontFamily: "system-ui" }}><Flame size={11} /> Scharf</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Two column: left = text list, right = image cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>

          {/* Left: text-only list */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#939084", marginBottom: 20, fontFamily: "system-ui" }}>
              Weitere Gerichte
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {rest.filter((_, i) => i % 2 === 0).map(item => (
                <div
                  key={item.id}
                  style={{ padding: "1rem 0", borderBottom: "1px solid #e8e4db", cursor: "pointer" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                    <span style={{ fontFamily: "Georgia, serif", fontWeight: 600, fontSize: "0.92rem", color: "#201515" }}>
                      {item.name}
                    </span>
                    <span style={{ fontWeight: 700, color: "#6b1535", fontSize: "0.88rem", whiteSpace: "nowrap", fontFamily: "system-ui", fontVariantNumeric: "tabular-nums" }}>
                      {item.price.toFixed(2)} €
                    </span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#939084", marginTop: 4, lineHeight: 1.5, fontFamily: "system-ui" }}>
                    {item.description.de}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {rest.filter((_, i) => i % 2 === 1).map((item, i) => (
              <div
                key={item.id}
                style={{
                  display: "flex", gap: 14, background: "#fffefb", borderRadius: 10,
                  border: "1px solid rgba(107,21,53,0.08)", overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(107,21,53,0.04)",
                  transition: "transform 200ms",
                  cursor: "pointer",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "none"}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/mag-item-${i}/200/140`}
                  alt={item.name}
                  style={{ width: 100, height: 90, objectFit: "cover", flexShrink: 0 }}
                />
                <div style={{ padding: "0.75rem 0.75rem 0.75rem 0", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <p style={{ fontFamily: "Georgia, serif", fontWeight: 600, fontSize: "0.85rem", color: "#201515", marginBottom: 4 }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: "0.73rem", color: "#939084", lineHeight: 1.45, fontFamily: "system-ui", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
                    {item.description.de}
                  </p>
                  <p style={{ fontWeight: 700, color: "#6b1535", fontSize: "0.82rem", marginTop: 6, fontFamily: "system-ui", fontVariantNumeric: "tabular-nums" }}>
                    {item.price.toFixed(2)} €
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full menu CTA */}
        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <a
            href="/menu"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#6b1535", color: "#fffefb", borderRadius: 6, fontWeight: 600, fontSize: "0.875rem", textDecoration: "none", fontFamily: "system-ui" }}
          >
            Vollständige Speisekarte <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
