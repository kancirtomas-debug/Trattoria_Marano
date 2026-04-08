"use client"
import { MapPin, Phone, Mail, Clock, CreditCard } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"
import ReservationCalendar from "@/components/ReservationCalendar"

export default function ContactPage() {
  const { lang } = useLanguage()
  return (
    <div className="section-warm min-h-screen">
      <div className="bg-charcoal text-cream py-16 text-center grain">
        <p className="mono-label-light mb-3">Trattoria Marano</p>
        <h1 className="font-heading text-display-lg">{t.contact.title[lang]}</h1>
      </div>

      <div className="container-default py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: info */}
          <div className="space-y-8">
            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden bg-warmgray-200 aspect-video flex items-center justify-center">
              <div className="text-center text-warmgray-400">
                <MapPin size={40} className="mx-auto mb-2" />
                <p className="font-heading text-xl text-warmgray-600">Ohlmüllerstr. 22</p>
                <p className="text-sm">81541 München</p>
                <a
                  href="https://maps.google.com/?q=Ohlm%C3%BCller+Str.+22+81541+M%C3%BCnchen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-terracotta text-sm hover:underline"
                >
                  {lang === "de" ? "In Google Maps öffnen" : "Open in Google Maps"}
                </a>
              </div>
            </div>

            {/* Contact details card */}
            <div className="card-warm rounded-2xl p-6 space-y-5">
              <div className="flex gap-4">
                <Clock size={18} className="text-terracotta mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-ink mb-1">{t.hours.title[lang]}</p>
                  <p className="text-ink-muted text-sm">{t.hours.monday[lang]}</p>
                  <p className="text-ink-light text-sm">{t.hours.tue_sun[lang]}</p>
                  <p className="text-ink-light text-sm">{t.hours.lunch[lang]} · {t.hours.dinner[lang]}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone size={18} className="text-terracotta mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-ink mb-1">{t.contact.phone[lang]}</p>
                  <a href="tel:+4989209281230" className="text-ink-light text-sm hover:text-terracotta transition-colors">
                    089 / 209 28 123
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail size={18} className="text-terracotta mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-ink mb-1">{t.contact.email[lang]}</p>
                  <a href="mailto:kontakt@solopizza.de" className="text-ink-light text-sm hover:text-terracotta transition-colors">
                    kontakt@solopizza.de
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <CreditCard size={18} className="text-terracotta mt-0.5 shrink-0" />
                <p className="text-ink-light text-sm">{t.contact.payment[lang]}</p>
              </div>
            </div>
          </div>

          {/* Right: reservation calendar */}
          <div id="reservation" className="card-warm rounded-2xl p-6 md:p-8">
            <p className="mono-label mb-2">{t.nav.reserve[lang]}</p>
            <h2 className="font-heading text-2xl font-semibold text-ink mb-6">
              {t.reservation.title[lang]}
            </h2>
            <ReservationCalendar />
          </div>
        </div>
      </div>
    </div>
  )
}
