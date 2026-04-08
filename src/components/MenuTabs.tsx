"use client"
import { useState } from "react"
import { menuCategories } from "@/data/menu"
import MenuItemCard from "./MenuItemCard"
import { useLanguage } from "@/context/LanguageContext"

export default function MenuTabs() {
  const { lang } = useLanguage()
  const [active, setActive] = useState(menuCategories[0].id)
  const category = menuCategories.find(c => c.id === active)!

  return (
    <div>
      {/* Tab bar — horizontal scroll on mobile */}
      <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
        <div className="flex gap-2 pb-2 min-w-max sm:flex-wrap sm:min-w-0">
          {menuCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 rounded-pill text-sm font-medium whitespace-nowrap transition-colors ${
                active === cat.id
                  ? "bg-terracotta text-white"
                  : "bg-cream text-ink-light border border-warmgray-200 hover:border-terracotta hover:text-terracotta"
              }`}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Items grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.items.map(item => (
          <MenuItemCard key={item.id} item={item} lang={lang} />
        ))}
      </div>
    </div>
  )
}
