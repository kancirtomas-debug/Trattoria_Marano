"use client"
import Link from "next/link"
import { useState } from "react"
import { menuCategories } from "@/data/menu"
import { Leaf, Flame } from "lucide-react"

const TABS = [
  { id: "antipasti",         label: "Antipasti" },
  { id: "pasta-speciale",    label: "Pasta" },
  { id: "pizza-classica",    label: "Pizza" },
  { id: "dolci",             label: "Dolci" },
]

const SEEDS = ["food-italian","pizza-wood","pasta-fresh","bruschetta-tomato","tiramisu-cafe","gnocchi-truffle","pizza-margherita","antipasti-plate","carbonara-classic","panna-cotta","pizza-diavola","insalata-mista"]

export default function PhotoGrid() {
  const [active, setActive] = useState("antipasti")
  const cat = menuCategories.find(c => c.id === active)
  const items = cat?.items ?? []

  return (
    <div style={{ minHeight: "100vh", background: "#fffdf9" }}>

      {/* Nav bar */}
      <div style={{ background: "#201515", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: "#939084", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "system-ui" }}>Layout 2 — Photo Cards Grid</span>
        <Link href="/menu-preview" style={{ color: "#6b1535", fontSize: 12, fontFamily: "system-ui", textDecoration: "none" }}>← All layouts</Link>
      </div>

      {/* Sticky header */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(255,253,249,0.96)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e0dcd2", padding: "0 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.1rem", color: "#201515", letterSpacing: "-0.01em" }}>
            Trattoria Marano
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                style={{
                  padding: "6px 16px", borderRadius: 6, fontSize: "0.8rem", fontWeight: 600,
                  background: active === tab.id ? "#6b1535" : "transparent",
                  color: active === tab.id ? "#fffefb" : "#939084",
                  border: active === tab.id ? "1px solid #6b1535" : "1px solid transparent",
                  cursor: "pointer", transition: "all 160ms",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 2rem 5rem" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.75rem", fontWeight: 700, color: "#201515", letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
          {cat?.label.de}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {items.map((item, i) => (
            <div
              key={item.id}
              style={{
                background: "#fffefb", borderRadius: 12,
                border: "1px solid rgba(107,21,53,0.08)",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(107,21,53,0.05)",
                transition: "transform 200ms, box-shadow 200ms",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(107,21,53,0.12)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "none"
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(107,21,53,0.05)"
              }}
            >
              {/* Photo */}
              <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${SEEDS[i % SEEDS.length]}/480/320`}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Price badge */}
                <div style={{ position: "absolute", top: 12, right: 12, background: "#201515", color: "#fffefb", borderRadius: 6, padding: "4px 10px", fontSize: "0.8rem", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                  {item.price.toFixed(2)} €
                </div>
                {/* Diet icons */}
                {(item.vegetarian || item.spicy) && (
                  <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 4 }}>
                    {item.vegetarian && (
                      <span style={{ background: "#4a7c59", borderRadius: 4, padding: "3px 6px", display: "flex", alignItems: "center" }}>
                        <Leaf size={11} color="#fff" />
                      </span>
                    )}
                    {item.spicy && (
                      <span style={{ background: "#6b1535", borderRadius: 4, padding: "3px 6px", display: "flex", alignItems: "center" }}>
                        <Flame size={11} color="#fff" />
                      </span>
                    )}
                  </div>
                )}
              </div>
              {/* Text */}
              <div style={{ padding: "1rem 1.1rem 1.25rem" }}>
                <p style={{ fontFamily: "Georgia, serif", fontWeight: 600, fontSize: "0.95rem", color: "#201515", marginBottom: 6, lineHeight: 1.3 }}>
                  {item.name}
                </p>
                <p style={{ fontSize: "0.78rem", color: "#939084", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
                  {item.description.de}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
