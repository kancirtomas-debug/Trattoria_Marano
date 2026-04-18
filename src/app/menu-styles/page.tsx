"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const TABS = ["Antipasti", "Salate", "Suppen", "Pasta", "Pizza", "Desserts", "Getränke"]

function Combo() {
  const [active, setActive] = useState("Pizza")
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#6b1535" }}>
        Combo — Square tiles + underline accent
      </p>
      <div className="flex gap-0 flex-wrap">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="px-5 py-2.5 text-sm whitespace-nowrap transition-all relative"
            style={{
              background: active === tab ? "rgba(107,21,53,0.06)" : "#fffefb",
              color: active === tab ? "#201515" : "#939084",
              border: "1px solid #c5c0b1",
              marginLeft: i === 0 ? 0 : -1,
              fontWeight: active === tab ? 600 : 400,
              borderBottom: active === tab ? "2.5px solid #6b1535" : "1px solid #c5c0b1",
            }}
          >
            {tab}
            {tab === "Pizza" && (
              <ChevronDown size={12} className="inline ml-1" style={{ opacity: 0.5 }} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function Option1() {
  const [active, setActive] = useState("Pizza")
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#939084" }}>
        Option 1 — Underline tabs
      </p>
      <div className="flex gap-6 border-b overflow-x-auto pb-0" style={{ borderColor: "#e5e0d5" }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="pb-3 text-sm font-medium whitespace-nowrap transition-colors relative"
            style={{
              color: active === tab ? "#201515" : "#939084",
              fontWeight: active === tab ? 600 : 400,
            }}
          >
            {tab}
            {active === tab && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "#6b1535" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function Option2() {
  const [active, setActive] = useState("Pizza")
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#939084" }}>
        Option 2 — Bold pill with shadow
      </p>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
            style={
              active === tab
                ? {
                    background: "#201515",
                    color: "#fffefb",
                    boxShadow: "0 4px 12px rgba(32,21,21,0.25)",
                  }
                : {
                    background: "transparent",
                    color: "#36342e",
                    border: "1px solid #c5c0b1",
                  }
            }
          >
            {tab}
            {tab === "Pizza" && (
              <ChevronDown size={12} className="inline ml-1" style={{ opacity: 0.6 }} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function Option3() {
  const [active, setActive] = useState("Pizza")
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#939084" }}>
        Option 3 — Square chip tiles
      </p>
      <div className="flex gap-0 flex-wrap">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all"
            style={{
              background: active === tab ? "#6b1535" : "#fffefb",
              color: active === tab ? "#fffefb" : "#36342e",
              border: "1px solid #c5c0b1",
              marginLeft: i === 0 ? 0 : -1,
              letterSpacing: active === tab ? "0.02em" : "0",
              fontWeight: active === tab ? 600 : 400,
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function MenuStylesPreview() {
  return (
    <div className="min-h-screen py-16 px-8" style={{ background: "#fffefb" }}>
      <div className="max-w-3xl mx-auto space-y-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#939084" }}>Preview</p>
          <h1 className="font-heading font-semibold text-3xl" style={{ color: "#201515", letterSpacing: "-0.02em" }}>
            Menu button styles
          </h1>
          <p className="text-sm mt-2" style={{ color: "#939084" }}>Click the tabs to see active states. Tell me which one you want.</p>
        </div>

        <div className="p-8 rounded-xl space-y-3" style={{ background: "#fffefb", border: "1px solid #e5e0d5" }}>
          <Option1 />
        </div>

        <div className="p-8 rounded-xl space-y-3" style={{ background: "#fffefb", border: "1px solid #e5e0d5" }}>
          <Option2 />
        </div>

        <div className="p-8 rounded-xl space-y-3" style={{ background: "#fffefb", border: "1px solid #e5e0d5" }}>
          <Option3 />
        </div>

        <div className="p-8 rounded-xl space-y-3" style={{ background: "#fffefb", border: "2px solid #6b1535" }}>
          <Combo />
        </div>
      </div>
    </div>
  )
}
