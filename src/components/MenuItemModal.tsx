"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { Leaf, Flame, X } from "lucide-react"
import type { MenuItem } from "@/data/menu"
import type { Lang } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

type Props = {
  item: MenuItem
  lang: Lang
  onClose: () => void
}

export default function MenuItemModal({ item, lang, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const desc = item.detailedDescription?.[lang] ?? item.description[lang]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl"
        style={{ maxHeight: "92vh", overflowY: "auto" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Photo */}
        <div
          className="relative w-full"
          style={{ aspectRatio: "16/9", background: item.image ? "#f0dfd0" : "linear-gradient(135deg,#8B7355,#c5b9a8)" }}
        >
          {item.image && (
            <Image
              src={`/images/wolt/${item.image}`}
              alt={item.name}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 512px"
              quality={95}
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md transition-colors"
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Name + price */}
          <div className="flex justify-between items-start gap-4 mb-2">
            <h2 className="font-heading font-semibold text-ink text-xl leading-tight">{item.name}</h2>
            <span className="font-heading text-2xl font-semibold text-terracotta whitespace-nowrap shrink-0">
              {item.price.toFixed(2)} €
            </span>
          </div>

          {/* Icons */}
          {(item.vegetarian || item.spicy) && (
            <div className="flex items-center gap-3 mb-3">
              {item.vegetarian && (
                <span className="flex items-center gap-1 text-xs font-medium" style={{ color: "#4d7c0f" }}>
                  <Leaf size={12} /> {t.menu_page.veg_label[lang]}
                </span>
              )}
              {item.spicy && (
                <span className="flex items-center gap-1 text-xs font-medium text-terracotta">
                  <Flame size={12} /> {t.menu_page.spicy_label[lang]}
                </span>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-ink-muted leading-relaxed mb-4">{desc}</p>

          {/* Allergens */}
          {item.allergens && (
            <div className="rounded-lg p-3 mb-5" style={{ background: "#faf8f4", border: "1px solid #e8e3d9" }}>
              <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "#a09a8e" }}>
                {t.menu_modal.allergens[lang]}
              </p>
              <p className="text-xs" style={{ color: "#6b6560" }}>{item.allergens}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <a
              href="https://wolt.com/de/deu/munich/restaurant/trattoria-marano"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-opacity hover:opacity-90"
              style={{ background: "#009de0" }}
            >
              🛵 {t.menu_modal.order_wolt[lang]}
            </a>
            <a
              href="https://www.lieferando.de/en/menu/trattoriamarano"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-opacity hover:opacity-90"
              style={{ background: "#ff8000" }}
            >
              🛵 {t.menu_modal.order_lieferando[lang]}
            </a>
            <Link
              href="/contact#reservation"
              onClick={onClose}
              className="flex items-center justify-center gap-2 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-opacity hover:opacity-90"
              style={{ background: "#201515" }}
            >
              🍽️ {t.menu_modal.reserve_table[lang]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
