"use client"
import Link from "next/link"
import { PartyPopper, Cake, Star, Users, ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

const eventTypes = {
  de: [
    { icon: Cake,        title: "Geburtstage",          desc: "Feiern Sie Ihren Geburtstag in gemütlicher Atmosphäre mit unserer authentischen Küche." },
    { icon: PartyPopper, title: "Feste & Feiern",        desc: "Von kleinen Familienfeiern bis zu größeren Gesellschaften — wir organisieren gerne für Sie." },
    { icon: Users,       title: "Firmenevents",           desc: "Teamessen, Geschäftsdinner oder Jubiläen — die Trattoria Marano ist der perfekte Rahmen." },
    { icon: Star,        title: "Besondere Anlässe",      desc: "Verlobungen, Jahrestage oder andere Meilensteine — wir machen Ihren Abend unvergesslich." },
  ],
  en: [
    { icon: Cake,        title: "Birthdays",              desc: "Celebrate your birthday in a cosy atmosphere with our authentic Italian cuisine." },
    { icon: PartyPopper, title: "Parties & Celebrations", desc: "From small family gatherings to larger groups — we are happy to organise your event." },
    { icon: Users,       title: "Corporate Events",        desc: "Team dinners, business lunches or anniversaries — Trattoria Marano is the perfect setting." },
    { icon: Star,        title: "Special Occasions",       desc: "Engagements, anniversaries or milestones — we make your evening unforgettable." },
  ],
}

export default function EventsPage() {
  const { lang } = useLanguage()
  const types = eventTypes[lang]
  return (
    <div className="section-warm min-h-screen">
      <div className="bg-charcoal text-cream py-20 text-center grain">
        <p className="mono-label-light mb-3">Trattoria Marano</p>
        <h1 className="font-heading text-display-lg">{t.events.title[lang]}</h1>
        <p className="text-warmgray-400 mt-3 max-w-md mx-auto">{t.events.body[lang]}</p>
      </div>

      <section className="container-default py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {types.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-warm rounded-2xl p-7">
              <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center mb-4">
                <Icon size={22} className="text-terracotta" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-ink mb-2">{title}</h3>
              <p className="text-ink-light text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-terracotta rounded-2xl p-10 text-center text-white">
          <h2 className="font-heading text-display-md mb-4">
            {lang === "de" ? "Ihr Event planen?" : "Plan your event?"}
          </h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            {lang === "de"
              ? "Kontaktieren Sie uns telefonisch oder per E-Mail und wir besprechen gemeinsam alle Details."
              : "Contact us by phone or email and we will discuss all details together."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+4989209281230"
              className="flex items-center gap-2 px-6 py-3 bg-white text-terracotta rounded-pill font-medium text-sm hover:bg-cream transition-colors"
            >
              089 / 209 28 123
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3 border border-white/50 text-white rounded-pill font-medium text-sm hover:border-white transition-colors"
            >
              {t.events.cta[lang]} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
