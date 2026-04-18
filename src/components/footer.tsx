"use client"
import { MapPin, Phone, Mail, Navigation, ExternalLink } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

export default function Footer() {
  const { lang } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        width: "100%",
        background: "#6b1535",
        color: "#e0d8ce",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="container-wide grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12"
        style={{ paddingTop: "clamp(2.5rem, 4vw, 4rem)", paddingBottom: "clamp(2.5rem, 4vw, 4rem)" }}
      >

        {/* Brand */}
        <div>
          <p
            className="font-heading text-2xl font-semibold mb-1"
            style={{ color: "#e0d8ce", letterSpacing: "-0.02em" }}
          >
            Trattoria Marano
          </p>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: "rgba(224,216,206,0.5)" }}
          >
            Autentica Cucina Italiana
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(224,216,206,0.65)" }}>
            {t.welcome.body[lang]}
          </p>
        </div>

        {/* Contact */}
        <div>
          <p className="section-label mb-5" style={{ color: "rgba(224,216,206,0.5)" }}>
            {t.contact.title[lang]}
          </p>
          <ul className="space-y-3" style={{ color: "#e0d8ce", fontSize: "0.921rem" }}>
            <li className="flex gap-3">
              <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: "rgba(224,216,206,0.6)" }} />
              <span>Ohlmüllerstr. 22<br />81541 München</span>
            </li>
            <li className="flex gap-3">
              <Phone size={15} className="mt-0.5 shrink-0" style={{ color: "rgba(224,216,206,0.6)" }} />
              <a
                href="tel:+4989209281230"
                className="transition-colors"
                style={{ color: "#e0d8ce" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#e0d8ce")}
              >
                089 / 209 28 123
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={15} className="mt-0.5 shrink-0" style={{ color: "rgba(224,216,206,0.6)" }} />
              <a
                href="mailto:maranotrattoria@gmail.com"
                className="transition-colors"
                style={{ color: "#e0d8ce" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#e0d8ce")}
              >
                maranotrattoria@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <p className="section-label mb-5" style={{ color: "rgba(224,216,206,0.5)" }}>
            {t.hours.title[lang]}
          </p>
          <ul className="space-y-2" style={{ color: "#e0d8ce", fontSize: "0.921rem" }}>
            <li style={{ color: "rgba(224,216,206,0.5)" }}>{t.hours.monday[lang]}</li>
            <li>
              <span style={{ color: "#e0d8ce", fontWeight: 600 }}>{t.hours.tue_sun[lang]}</span>
              <br /><span style={{ color: "rgba(224,216,206,0.8)" }}>{t.hours.lunch[lang]}</span>
              <br /><span style={{ color: "rgba(224,216,206,0.8)" }}>{t.hours.dinner[lang]}</span>
            </li>
          </ul>
        </div>

        {/* Sister Restaurant */}
        <div>
          <p className="section-label mb-5" style={{ color: "rgba(224,216,206,0.5)" }}>
            {t.footer_extra.sister_label[lang]}
          </p>
          <p className="leading-relaxed mb-5" style={{ color: "rgba(224,216,206,0.7)", fontSize: "0.921rem" }}>
            {t.footer_extra.sister_body[lang]}
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://solopizza.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-colors"
              style={{ border: "1px solid rgba(224,216,206,0.25)", color: "#e0d8ce", background: "rgba(224,216,206,0.08)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(224,216,206,0.6)"
                ;(e.currentTarget as HTMLAnchorElement).style.background = "rgba(224,216,206,0.18)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(224,216,206,0.25)"
                ;(e.currentTarget as HTMLAnchorElement).style.background = "rgba(224,216,206,0.08)"
              }}
            >
              <ExternalLink size={12} />
              {t.footer_extra.sister_website[lang]}
            </a>
            <a
              href="https://maps.google.com/?q=Bereiterangerstr.+18,+81451+München"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-colors"
              style={{ border: "1px solid rgba(224,216,206,0.25)", color: "#e0d8ce", background: "rgba(224,216,206,0.08)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(224,216,206,0.6)"
                ;(e.currentTarget as HTMLAnchorElement).style.background = "rgba(224,216,206,0.18)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(224,216,206,0.25)"
                ;(e.currentTarget as HTMLAnchorElement).style.background = "rgba(224,216,206,0.08)"
              }}
            >
              <Navigation size={12} />
              {t.footer_extra.sister_directions[lang]}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(224,216,206,0.15)" }}>
        <div
          className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ color: "rgba(224,216,206,0.45)" }}
        >
          <span>© {year} Trattoria Marano München</span>
          <span>
            {t.footer_extra.sister_short[lang]}{" "}
            <a
              href="https://solopizza.de"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "rgba(224,216,206,0.45)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#e0d8ce")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(224,216,206,0.45)")}
            >
              Solo Pizza · Bereiterangerstr. 18
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
