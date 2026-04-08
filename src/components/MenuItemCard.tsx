"use client"
import { Leaf, Flame } from "lucide-react"
import type { MenuItem } from "@/data/menu"
import type { Lang } from "@/context/LanguageContext"

type Props = { item: MenuItem; lang: Lang }

export default function MenuItemCard({ item, lang }: Props) {
  return (
    <div className="card-warm rounded-xl p-5 flex justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-heading font-semibold text-ink">{item.name}</span>
          {item.vegetarian && (
            <span title="Vegetarisch / Vegetarian">
              <Leaf size={14} className="text-sage shrink-0" />
            </span>
          )}
          {item.spicy && (
            <span title="Scharf / Spicy">
              <Flame size={14} className="text-terracotta shrink-0" />
            </span>
          )}
        </div>
        <p className="text-sm text-ink-muted leading-relaxed">{item.description[lang]}</p>
        {item.allergens && (
          <p className="text-[11px] text-warmgray-400 mt-1.5">{item.allergens}</p>
        )}
      </div>
      <div className="shrink-0 pt-0.5">
        <span className="font-heading text-lg font-semibold text-terracotta whitespace-nowrap">
          {item.price.toFixed(2)} €
        </span>
      </div>
    </div>
  )
}
