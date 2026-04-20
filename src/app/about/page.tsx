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

const PIZZA_ANIM = [
  { dur: "9s",  del: "0s"    },
  { dur: "12s", del: "-4.5s" },
  { dur: "8s",  del: "-1.5s" },
  { dur: "11s", del: "-6s"   },
  { dur: "10s", del: "-3s"   },
  { dur: "7s",  del: "-5s"   },
]

function PizzaInBox({ dur, del }: { dur: string; del: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 56 56" aria-hidden style={{ flexShrink: 0 }}>
      {/* box depth */}
      <rect x="6" y="11" width="46" height="38" rx="2" fill="#b07428" />
      {/* box face */}
      <rect x="4" y="8" width="46" height="38" rx="2" fill="#d4974e" stroke="#a06c25" strokeWidth="1.5" />
      {/* inner base */}
      <rect x="10" y="14" width="34" height="26" rx="1" fill="#dba35a" />
      {/* corner fold marks */}
      <line x1="4"  y1="8"  x2="10" y2="14" stroke="#a06c25" strokeWidth="1" opacity="0.65" />
      <line x1="50" y1="8"  x2="44" y2="14" stroke="#a06c25" strokeWidth="1" opacity="0.65" />
      <line x1="4"  y1="46" x2="10" y2="40" stroke="#a06c25" strokeWidth="1" opacity="0.65" />
      <line x1="50" y1="46" x2="44" y2="40" stroke="#a06c25" strokeWidth="1" opacity="0.65" />
      {/* spinning pizza slice — tip anchored at box centre (27,27) */}
      <g style={{ transformOrigin: "27px 27px", animation: `pizza-tumble ${dur} linear infinite ${del}` }}>
        <path
          d="M 27 27 L 15 14 A 18 18 0 0 1 39 14 Z"
          fill="#f0ebe0"
          stroke="#201515"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M 15 14 A 18 18 0 0 1 39 14"
          fill="none"
          stroke="#201515"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

export default function AboutPage() {
  const { lang } = useLanguage()

  return (
    <div className="np-page">
      <div className="np-wrap">

        {/* Masthead — section title as headline */}
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
            <p className="np-kicker">{lang === "de" ? "Das Haus im Überblick" : "The house at a glance"}</p>
            <h3 className="np-h3">{lang === "de" ? "Merkmale" : "Highlights"}</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {features[lang].map((f, i) => (
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
                  <PizzaInBox dur={PIZZA_ANIM[i].dur} del={PIZZA_ANIM[i].del} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="np-col-rule" />
          <div className="np-box">
            <p className="np-label-red">{lang === "de" ? "Schwesterpizzeria" : "Sister Restaurant"}</p>
            <h3 className="np-h2" style={{ fontSize: 26, margin: "6px 0 4px" }}>Solo Pizza</h3>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 12, color: "#939084", margin: "0 0 10px", letterSpacing: "0.05em" }}>
              Bereiterangerstraße 18 · 81451 München
            </p>
            <p className="np-body" style={{ marginBottom: 10 }}>{t.about.sister[lang]}</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 12, color: "#36342e", marginBottom: 12 }}>
              {lang === "de"
                ? "Mo–Fr: ab 17:00 Uhr · Sa, So & Feiertag: ab 12:00 Uhr"
                : "Mon–Fri: from 17:00 · Sat, Sun & Holidays: from 12:00"}
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
