"use client"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Navigation, ExternalLink, ArrowUpRight } from "lucide-react"
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
        className="container-wide"
        style={{
          paddingTop: "clamp(2.25rem, 4vw, 4rem)",
          paddingBottom: "clamp(1.5rem, 3vw, 3rem)",
        }}
      >
        {/* Master grid — 2 cols mobile, 12 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-6 md:gap-x-10 md:items-start">

          {/* Brand block */}
          <div className="col-span-2 md:col-span-4 flex flex-col">
            <div
              style={{
                width: "clamp(200px, 38vw, 280px)",
                aspectRatio: "1 / 1",
                position: "relative",
                background: "#e0d8ce",
                borderRadius: 14,
                flexShrink: 0,
              }}
            >
              <Image
                src="/images/trattoria-logo-full.png"
                alt="Trattoria Marano"
                fill
                sizes="(max-width: 768px) 200px, 280px"
                style={{ objectFit: "contain", padding: 18 }}
              />
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-1 md:col-span-3 md:pl-8 md:border-l md:border-[rgba(224,216,206,0.14)]">
            <p
              className="section-label font-heading"
              style={{ color: "rgba(224,216,206,0.85)", fontSize: "0.8625rem", marginBottom: 14 }}
            >
              {t.contact.title[lang]}
            </p>
            <ul
              className="flex flex-col gap-3"
              style={{ color: "#e0d8ce", fontSize: "0.9rem" }}
            >
              <li className="flex gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "rgba(224,216,206,0.55)" }} />
                <span>Ohlmüllerstr. 22<br />81541 München</span>
              </li>
              <li className="flex gap-2.5">
                <Phone size={14} className="mt-0.5 shrink-0" style={{ color: "rgba(224,216,206,0.55)" }} />
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
              <li className="flex gap-2.5">
                <Mail size={14} className="mt-0.5 shrink-0" style={{ color: "rgba(224,216,206,0.55)" }} />
                <a
                  href="mailto:maranotrattoria@gmail.com"
                  className="transition-colors"
                  style={{ color: "#e0d8ce", wordBreak: "break-word" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#e0d8ce")}
                >
                  maranotrattoria@gmail.com
                </a>
              </li>
            </ul>
            <Link
              href="/datenschutz"
              className="inline-flex items-center gap-1.5 transition-colors mt-5"
              style={{
                color: "#fffefb",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                padding: "8px 16px",
                borderRadius: 999,
                border: "1px solid rgba(224,216,206,0.3)",
                background: "rgba(224,216,206,0.08)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(224,216,206,0.22)"
                e.currentTarget.style.borderColor = "rgba(224,216,206,0.6)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(224,216,206,0.08)"
                e.currentTarget.style.borderColor = "rgba(224,216,206,0.3)"
              }}
            >
              {lang === "de" ? "Datenschutz & Impressum" : "Privacy & Imprint"}
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Hours */}
          <div className="col-span-1 md:col-span-2 md:pl-8 md:border-l md:border-[rgba(224,216,206,0.14)]">
            <p
              className="section-label font-heading"
              style={{ color: "rgba(224,216,206,0.85)", fontSize: "0.8625rem", marginBottom: 14 }}
            >
              {t.hours.title[lang]}
            </p>
            <ul
              className="flex flex-col"
              style={{ color: "#e0d8ce", fontSize: "0.9rem" }}
            >
              <li style={{ color: "rgba(224,216,206,0.5)", marginBottom: 14 }}>{t.hours.monday[lang]}</li>
              <li className="flex flex-col gap-1">
                <span style={{ color: "#e0d8ce", fontWeight: 600 }}>{t.hours.tue_sun[lang]}</span>
                <span style={{ color: "rgba(224,216,206,0.78)" }}>{t.hours.lunch[lang]}</span>
                <span style={{ color: "rgba(224,216,206,0.78)" }}>{t.hours.dinner[lang]}</span>
              </li>
            </ul>
          </div>

          {/* Sister Restaurant */}
          <div className="col-span-2 md:col-span-3 md:pl-8 md:border-l md:border-[rgba(224,216,206,0.14)]">
            <p
              className="section-label font-heading"
              style={{ color: "rgba(224,216,206,0.85)", fontSize: "0.8625rem", marginBottom: 14 }}
            >
              {t.footer_extra.sister_label[lang]}
            </p>
            <p
              className="leading-relaxed"
              style={{
                color: "rgba(224,216,206,0.7)",
                fontSize: "0.9rem",
                marginBottom: 14,
                maxWidth: "36ch",
              }}
            >
              {t.footer_extra.sister_body[lang]}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="https://solopizza.de"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-colors"
                style={{
                  border: "1px solid rgba(224,216,206,0.25)",
                  color: "#e0d8ce",
                  background: "rgba(224,216,206,0.08)",
                  flex: "1 1 auto",
                  whiteSpace: "nowrap",
                }}
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
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-colors"
                style={{
                  border: "1px solid rgba(224,216,206,0.25)",
                  color: "#e0d8ce",
                  background: "rgba(224,216,206,0.08)",
                  flex: "1 1 auto",
                  whiteSpace: "nowrap",
                }}
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
      </div>

      {/* Bottom bar — agency credit */}
      <div style={{ borderTop: "1px solid rgba(224,216,206,0.18)" }}>
        <div
          className="container-wide flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left"
          style={{
            color: "rgba(224,216,206,0.6)",
            paddingTop: 18,
            paddingBottom: 18,
          }}
        >
          <p style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>
            © {year} TOMAR Group s.r.o. Všetky práva vyhradené.
            <br />
            IČO: 56449046 | DIČ: 2122311488 | IČ DPH: SK2122311488
          </p>
          <a
            href="https://webzatyzden.sk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Web za týždeň"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
              transition: "transform 160ms ease",
              textDecoration: "none",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)")}
          >
            <Image
              src="/images/webzatyzden-icon.png"
              alt=""
              width={56}
              height={56}
              style={{ height: 31, width: 31, objectFit: "contain" }}
              unoptimized
            />
            <span style={{ color: "#e0d8ce", fontFamily: "var(--font-heading), sans-serif", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
              Web za týždeň
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
