"use client"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"
import MenuTabs from "@/components/MenuTabs"
import { Leaf, Flame } from "lucide-react"

export default function MenuPage() {
  const { lang } = useLanguage()
  return (
    <div className="section-warm min-h-screen">
      {/* Page header */}
      <div className="bg-charcoal text-cream py-16 text-center grain">
        <p className="mono-label-light mb-3">Trattoria Marano</p>
        <h1 className="font-heading text-display-lg">{t.menu_page.title[lang]}</h1>
      </div>

      {/* Notes + legend */}
      <div className="container-default pt-10 pb-4">
        <div className="flex flex-wrap gap-4 text-sm text-ink-muted mb-4">
          <span className="flex items-center gap-1.5">
            <Leaf size={14} className="text-sage" /> {t.menu_page.veg_label[lang]}
          </span>
          <span className="flex items-center gap-1.5">
            <Flame size={14} className="text-terracotta" /> {t.menu_page.spicy_label[lang]}
          </span>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-warmgray-500">
          <span className="px-3 py-1 bg-cream-light rounded-pill border border-warmgray-200">
            {t.menu_page.note_spelt[lang]}
          </span>
          <span className="px-3 py-1 bg-cream-light rounded-pill border border-warmgray-200">
            {t.menu_page.note_vegan[lang]}
          </span>
        </div>
      </div>

      <div className="container-default pb-20">
        <MenuTabs />
      </div>
    </div>
  )
}
