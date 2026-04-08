"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

const features = {
  de: [
    "Authentische neapolitanische Pizza",
    "Hausgemachte Pasta & Gnocchi",
    "Kaffee von Saquella 1856, Pescara",
    "Pizza auf Wunsch mit Dinkelmehl",
    "Vegane Optionen verfügbar",
    "Take-away für fast alle Gerichte",
  ],
  en: [
    "Authentic Neapolitan pizza",
    "Homemade pasta & gnocchi",
    "Coffee from Saquella 1856, Pescara",
    "Pizza available with spelt flour on request",
    "Vegan options available",
    "Take-away for almost all dishes",
  ],
}

export default function AboutPage() {
  const { lang } = useLanguage()
  return (
    <div className="section-warm min-h-screen">
      <div className="bg-charcoal text-cream py-20 text-center grain">
        <p className="mono-label-light mb-3">Trattoria Marano</p>
        <h1 className="font-heading text-display-lg">{t.about.title[lang]}</h1>
      </div>

      <section className="container-narrow py-20">
        <div className="w-12 h-px bg-terracotta mb-8" />
        <p className="font-heading text-2xl text-ink leading-relaxed mb-6">{t.about.p1[lang]}</p>
        <p className="text-ink-light leading-relaxed mb-8">{t.about.p2[lang]}</p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {features[lang].map(f => (
            <li key={f} className="flex items-center gap-3 text-sm text-ink-light">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="w-12 h-px bg-terracotta mb-10" />

        <div className="card-warm rounded-2xl p-6">
          <p className="mono-label mb-3">
            {lang === "de" ? "Schwesterpizzeria" : "Sister Restaurant"}
          </p>
          <p className="font-heading text-xl font-semibold text-ink mb-1">Solo Pizza</p>
          <p className="text-ink-muted text-sm mb-4">Bereiterangerstraße 18 · 81451 München</p>
          <p className="text-ink-light text-sm mb-4">{t.about.sister[lang]}</p>
          <div className="text-xs text-warmgray-400">
            {lang === "de"
              ? "Mo–Fr: ab 17:00 Uhr · Sa, So & Feiertag: ab 12:00 Uhr"
              : "Mon–Fri: from 17:00 · Sat, Sun & Holidays: from 12:00"}
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <Link
            href="/menu"
            className="flex items-center gap-2 px-5 py-2.5 bg-terracotta text-white rounded-pill text-sm font-medium hover:bg-terracotta-dark transition-colors"
          >
            {t.nav.menu[lang]} <ArrowRight size={14} />
          </Link>
          <Link
            href="/contact#reservation"
            className="flex items-center gap-2 px-5 py-2.5 border border-warmgray-300 text-ink rounded-pill text-sm font-medium hover:border-terracotta hover:text-terracotta transition-colors"
          >
            {t.nav.reserve[lang]}
          </Link>
        </div>
      </section>
    </div>
  )
}
