"use client"
import Link from "next/link"
import { ArrowRight, UtensilsCrossed, CalendarDays, ShoppingBag } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"
import DeliverySection from "@/components/DeliverySection"

export default function HomePage() {
  const { lang } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-charcoal grain">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-[#1a0e08] opacity-90" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, rgba(201,107,85,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 20%, rgba(123,143,110,0.1) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
          <p className="mono-label-light mb-6">Ohlmüllerstr. 22 · München</p>
          <h1 className="font-heading text-display-xl text-cream mb-4 leading-none">
            Trattoria<br />
            <span className="text-terracotta">Marano</span>
          </h1>
          <p className="text-warmgray-300 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            {t.hero.tagline[lang]}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/menu"
              className="flex items-center gap-2 px-6 py-3 bg-terracotta text-white rounded-pill font-medium hover:bg-terracotta-dark transition-colors"
            >
              {t.hero.cta_menu[lang]} <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact#reservation"
              className="flex items-center gap-2 px-6 py-3 border border-warmgray-600 text-cream rounded-pill font-medium hover:border-terracotta hover:text-terracotta transition-colors"
            >
              {t.hero.cta_reserve[lang]}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-warmgray-500 text-xs tracking-widest">
          <div className="w-px h-12 bg-gradient-to-b from-warmgray-600 to-transparent" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* Quick-action cards */}
      <section className="section-light py-16">
        <div className="container-default grid grid-cols-1 md:grid-cols-3 gap-6">
          {(
            [
              { icon: UtensilsCrossed, label: t.hero.cta_menu,   href: "/menu",               color: "text-terracotta" },
              { icon: CalendarDays,    label: t.hero.cta_reserve, href: "/contact#reservation", color: "text-sage" },
              { icon: ShoppingBag,     label: t.hero.cta_order,   href: "#delivery",            color: "text-terracotta-dark" },
            ] as const
          ).map(({ icon: Icon, label, href, color }) => (
            <a key={href} href={href} className="card-warm rounded-2xl p-8 flex flex-col items-center text-center gap-4 group cursor-pointer">
              <div className={`p-4 rounded-full bg-cream ${color}`}>
                <Icon size={28} />
              </div>
              <span className="font-heading text-xl font-semibold text-ink">{label[lang]}</span>
              <ArrowRight size={16} className={`${color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </a>
          ))}
        </div>
      </section>

      {/* Opening hours strip */}
      <section className="bg-terracotta py-6">
        <div className="container-default flex flex-wrap items-center justify-center gap-6 text-white text-sm">
          <span className="font-heading text-lg font-semibold">{t.hours.title[lang]}</span>
          <span className="opacity-80">{t.hours.monday[lang]}</span>
          <span className="w-px h-4 bg-white/40 hidden sm:block" />
          <span>
            {t.hours.tue_sun[lang]}: {t.hours.lunch[lang]} · {t.hours.dinner[lang]}
          </span>
        </div>
      </section>

      {/* Welcome section */}
      <section className="section-warm py-20">
        <div className="container-narrow text-center">
          <div className="w-12 h-px bg-terracotta mx-auto mb-6" />
          <h2 className="font-heading text-display-md text-ink mb-6">{t.welcome.title[lang]}</h2>
          <p className="text-ink-light text-lg leading-relaxed max-w-2xl mx-auto">{t.welcome.body[lang]}</p>
          <div className="w-12 h-px bg-terracotta mx-auto mt-6" />
        </div>
      </section>

      {/* Delivery section */}
      <div id="delivery">
        <DeliverySection />
      </div>
    </>
  )
}
