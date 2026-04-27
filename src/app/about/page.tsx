"use client"
import Image from "next/image"
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
  it: [
    "Autentica pizza napoletana",
    "Pasta & gnocchi fatti in casa",
    "Caffè Saquella 1856, Pescara",
    "Pizza con farina di farro su richiesta",
    "Opzioni vegane disponibili",
    "Asporto per quasi tutti i piatti",
  ],
}

function PizzaIcon() {
  return (
    <Image
      src="/images/pizza-icon.png"
      alt=""
      width={192}
      height={192}
      sizes="32px"
      aria-hidden
      style={{ width: 32, height: 32, flexShrink: 0, objectFit: "contain" }}
    />
  )
}

export default function AboutPage() {
  const { lang } = useLanguage()

  return (
    <div className="np-page">
      <div className="np-wrap">

        {/* Masthead - section title as headline */}
        <div className="np-masthead">
          <div className="np-dateline">
            <span>{t.newspaper.dateline_l[lang]}</span>
            <span>{t.newspaper.dateline_m[lang]}</span>
            <span>{t.newspaper.dateline_r[lang]}</span>
          </div>
          <div className="np-title-wrap">
            <h1 className="np-title-section">{t.about.title[lang]}</h1>
          </div>
        </div>

        <div className="np-rule-single" />

        {/* Lead */}
        <p className="np-lead np-dropcap" style={{ maxWidth: 820, margin: "14px auto 20px" }}>{t.about_page.lead[lang]}</p>

        <div className="np-rule-thin" />

        {/* Three editorial columns */}
        <div className="np-grid-3">
          <div>
            <p className="np-kicker">I.</p>
            <h3 className="np-h3">{t.about_page.col1_title[lang]}</h3>
            <p className="np-body">{t.about_page.col1_body[lang]}</p>
          </div>
          <div className="np-col-rule" />
          <div>
            <p className="np-kicker">II.</p>
            <h3 className="np-h3">{t.about_page.col2_title[lang]}</h3>
            <p className="np-body">{t.about_page.col2_body[lang]}</p>
          </div>
          <div className="np-col-rule" />
          <div>
            <p className="np-kicker">III.</p>
            <h3 className="np-h3">{t.about_page.col3_title[lang]}</h3>
            <p className="np-body">{t.about_page.col3_body[lang]}</p>
          </div>
        </div>

        <div className="np-rule-thin" />

        {/* Pull quote */}
        <blockquote className="np-pullquote">{t.about_page.pullquote[lang]}</blockquote>
        <p className="np-pull-src">{t.about_page.pullquote_source[lang]}</p>

        <div className="np-rule-thin" />

        {/* Features + sister restaurant box */}
        <div className="np-grid-even-2">
          <div>
            <p className="np-kicker">{lang === "de" ? "Das Haus im Überblick" : lang === "it" ? "La casa in sintesi" : "The house at a glance"}</p>
            <h3 className="np-h3">{lang === "de" ? "Merkmale" : lang === "it" ? "Caratteristiche" : "Highlights"}</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {features[lang].map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    fontFamily: "Georgia, serif",
                    fontSize: 14.5,
                    lineHeight: 1.4,
                    color: "#36342e",
                    padding: "10px 0",
                    borderBottom: "1px dotted #c5c0b1",
                  }}
                >
                  <PizzaIcon />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="np-col-rule" />
          <div className="np-box">
            <p className="np-label-red">{lang === "de" ? "Schwesterpizzeria" : lang === "it" ? "Pizzeria gemella" : "Sister Restaurant"}</p>
            <h3 className="np-h2" style={{ fontSize: 26, margin: "6px 0 4px" }}>Solo Pizza</h3>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 12, color: "#939084", margin: "0 0 10px", letterSpacing: "0.05em" }}>
              Bereiterangerstraße 18 · 81451 München
            </p>
            <p className="np-body" style={{ marginBottom: 10 }}>{t.about.sister[lang]}</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 12, color: "#36342e", marginBottom: 12 }}>
              {lang === "de"
                ? "Mo-Fr: ab 17:00 Uhr · Sa, So & Feiertag: ab 12:00 Uhr"
                : lang === "it"
                ? "Lun-Ven: dalle 17:00 · Sab, Dom & festivi: dalle 12:00"
                : "Mon-Fri: from 17:00 · Sat, Sun & Holidays: from 12:00"}
            </p>
            <a
              href="https://solopizza.de"
              target="_blank"
              rel="noopener noreferrer"
              className="np-label-red"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              {t.footer_extra.sister_website[lang]}
            </a>
          </div>
        </div>

        <div className="np-rule-thin" />

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", margin: "24px 0 16px" }}>
          <Link
            href="/menu"
            style={{
              fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 13,
              letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "12px 22px", background: "#201515", color: "#f0ebe0",
              border: "2px solid #201515", display: "inline-flex", alignItems: "center", gap: 8,
            }}
          >
            {t.nav.menu[lang]} <ArrowRight size={14} />
          </Link>
          <Link
            href="/reserve"
            style={{
              fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 13,
              letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "12px 22px", background: "transparent", color: "#6b1535",
              border: "2px solid #6b1535", display: "inline-flex", alignItems: "center", gap: 8,
            }}
          >
            {t.nav.reserve[lang]}
          </Link>
        </div>

        <div className="np-footer-rule">
          <p className="np-footer-text">{t.newspaper.footer_rule[lang]}</p>
        </div>
      </div>
    </div>
  )
}
