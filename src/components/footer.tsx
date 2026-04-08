"use client"
import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

export default function Footer() {
  const { lang } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-cream">
      <div className="container-wide py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <p className="font-heading text-2xl font-semibold mb-1">Trattoria Marano</p>
          <p className="text-xs tracking-[0.2em] uppercase text-terracotta mb-4">Autentica Cucina Italiana</p>
          <p className="text-warmgray-400 text-sm leading-relaxed">{t.welcome.body[lang]}</p>
        </div>

        {/* Contact */}
        <div>
          <p className="mono-label-light mb-4">{t.contact.title[lang]}</p>
          <ul className="space-y-3 text-sm text-warmgray-300">
            <li className="flex gap-2.5">
              <MapPin size={16} className="text-terracotta mt-0.5 shrink-0" />
              <span>Ohlmüllerstr. 22<br />81541 München</span>
            </li>
            <li className="flex gap-2.5">
              <Phone size={16} className="text-terracotta mt-0.5 shrink-0" />
              <a href="tel:+4989209281230" className="hover:text-terracotta transition-colors">089 / 209 28 123</a>
            </li>
            <li className="flex gap-2.5">
              <Mail size={16} className="text-terracotta mt-0.5 shrink-0" />
              <a href="mailto:kontakt@solopizza.de" className="hover:text-terracotta transition-colors">kontakt@solopizza.de</a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <p className="mono-label-light mb-4">{t.hours.title[lang]}</p>
          <ul className="space-y-2 text-sm text-warmgray-300">
            <li className="text-warmgray-500">{t.hours.monday[lang]}</li>
            <li>
              <span className="text-cream">{t.hours.tue_sun[lang]}</span>
              <br /><span>{t.hours.lunch[lang]}</span>
              <br /><span>{t.hours.dinner[lang]}</span>
            </li>
            <li className="pt-2 text-warmgray-500 text-xs">{t.contact.payment[lang]}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-warmgray-800">
        <div className="container-wide py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-warmgray-500">
          <span>© {year} Trattoria Marano München</span>
          <span>
            {lang === "de" ? "Schwesterpizzeria: " : "Sister restaurant: "}
            <a href="#" className="hover:text-terracotta transition-colors">Solo Pizza · Bereiterangerstr. 18</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
