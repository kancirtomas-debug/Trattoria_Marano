"use client"
import { useState, useMemo } from "react"
import { menuCategories } from "@/data/menu"
import MenuItemCard from "./MenuItemCard"
import { useLanguage } from "@/context/LanguageContext"
import { Leaf, Flame, ChevronDown } from "lucide-react"
import { t } from "@/lib/translations"

// All pizza sub-category IDs — merged into one Pizza tab
const PIZZA_IDS = [
  "pizza-classica",
  "pizza-vegetariane",
  "pizza-pesce",
  "calzoni",
  "pizza-bianca",
  "pizza-pane",
]

const PIZZA_CATS = menuCategories.filter(c => PIZZA_IDS.includes(c.id))
const ALL_PIZZA_ITEMS = PIZZA_CATS.flatMap(c => c.items)
const ALL_ITEMS = menuCategories.flatMap(c => c.items)

// Main tabs in desired order — all pizza becomes one entry
const MAIN_TABS = [
  ...menuCategories.filter(c =>
    ["antipasti", "insalate", "zuppe", "pasta-speciale", "pasta-tradizionale"].includes(c.id)
  ),
  { id: "pizza", label: { de: "Pizza", en: "Pizza" }, items: [] },
  ...menuCategories.filter(c =>
    ["dolci", "bevande"].includes(c.id)
  ),
] as const

type Filter = "none" | "vegetarian" | "spicy"

export default function MenuTabs() {
  const { lang } = useLanguage()
  const [activeTab, setActiveTab] = useState(MAIN_TABS[0].id)
  const [pizzaSub, setPizzaSub] = useState("all")
  const [filter, setFilter] = useState<Filter>("none")

  const displayedItems = useMemo(() => {
    if (filter === "vegetarian") return ALL_ITEMS.filter(item => item.vegetarian)
    if (filter === "spicy")      return ALL_ITEMS.filter(item => item.spicy)
    if (activeTab === "pizza") {
      return pizzaSub === "all"
        ? ALL_PIZZA_ITEMS
        : menuCategories.find(c => c.id === pizzaSub)?.items ?? []
    }
    return menuCategories.find(c => c.id === activeTab)?.items ?? []
  }, [activeTab, pizzaSub, filter])

  const handleTabClick = (id: string) => {
    setActiveTab(id)
    setFilter("none")
  }

  const toggleFilter = (f: Filter) => {
    setFilter(prev => prev === f ? "none" : f)
  }

  return (
    <div>
      {/* ── Filter pills ─────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap mb-5">
        <button
          onClick={() => toggleFilter("vegetarian")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-pill text-sm font-medium whitespace-nowrap transition-colors ${
            filter === "vegetarian"
              ? "text-white border border-transparent"
              : "bg-cream text-ink-light border border-warmgray-200 hover:text-green-700 hover:border-green-700"
          }`}
          style={filter === "vegetarian" ? { background: "#4d7c0f" } : {}}
        >
          <Leaf size={13} />
          {t.menu_page.veg_label[lang]}
        </button>

        <button
          onClick={() => toggleFilter("spicy")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-pill text-sm font-medium whitespace-nowrap transition-colors ${
            filter === "spicy"
              ? "bg-terracotta text-white border border-transparent"
              : "bg-cream text-ink-light border border-warmgray-200 hover:text-terracotta hover:border-terracotta"
          }`}
        >
          <Flame size={13} />
          {t.menu_page.spicy_label[lang]}
        </button>

        {filter !== "none" && (
          <button
            onClick={() => setFilter("none")}
            className="px-3 py-2 rounded-pill text-xs font-medium text-warmgray-400 border border-warmgray-200 hover:border-warmgray-400 transition-colors"
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* ── Main tab bar — underline style ───────────── */}
      <div
        className="mb-1"
        style={{ borderBottom: "1px solid #e5e0d5" }}
      >
        <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
          <div className="flex min-w-max sm:min-w-0">
            {MAIN_TABS.map(tab => {
              const isActive = activeTab === tab.id && filter === "none"
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className="flex items-center gap-1 px-5 py-3 text-sm whitespace-nowrap transition-all relative"
                  style={{
                    color:      isActive ? "#201515" : "#939084",
                    fontWeight: isActive ? 600 : 400,
                    background: "transparent",
                  }}
                >
                  {tab.label[lang]}
                  {tab.id === "pizza" && (
                    <ChevronDown
                      size={13}
                      style={{
                        transform:  activeTab === "pizza" ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 200ms ease",
                        opacity: 0.5,
                      }}
                    />
                  )}
                  {/* Underline indicator */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0"
                      style={{ height: 2.5, background: "#6b1535", marginBottom: -1 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Pizza sub-categories ──────────────────────── */}
      {activeTab === "pizza" && filter === "none" && (
        <div className="flex gap-2 flex-wrap mt-4 mb-6">
          <button
            onClick={() => setPizzaSub("all")}
            className="px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all rounded-full"
            style={{
              background:   pizzaSub === "all" ? "#201515" : "transparent",
              color:        pizzaSub === "all" ? "#fffefb" : "#939084",
              border:       "1px solid",
              borderColor:  pizzaSub === "all" ? "#201515" : "#c5c0b1",
            }}
          >
            {lang === "de" ? "Alle Pizzen" : "All Pizzas"}
          </button>
          {PIZZA_CATS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setPizzaSub(cat.id)}
              className="px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all rounded-full"
              style={{
                background:  pizzaSub === cat.id ? "#201515" : "transparent",
                color:       pizzaSub === cat.id ? "#fffefb" : "#939084",
                border:      "1px solid",
                borderColor: pizzaSub === cat.id ? "#201515" : "#c5c0b1",
              }}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>
      )}

      {/* ── Items grid ───────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedItems.map((item, i) => (
          <MenuItemCard key={item.id} item={item} lang={lang} priority={i < 6} />
        ))}
        {displayedItems.length === 0 && (
          <p className="text-ink-muted text-sm col-span-2 py-12 text-center">
            {lang === "de" ? "Keine Gerichte gefunden." : "No dishes found."}
          </p>
        )}
      </div>
    </div>
  )
}
