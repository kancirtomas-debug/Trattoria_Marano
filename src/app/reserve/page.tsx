"use client"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"
import ReservationCalendar from "@/components/ReservationCalendar"

export default function ReservePage() {
  const { lang } = useLanguage()

  return (
    <div className="np-page">
      <div className="np-wrap">

        {/* Masthead */}
        <div className="np-masthead">
          <div className="np-dateline">
            <span>{t.newspaper.dateline_l[lang]}</span>
            <span>{t.newspaper.dateline_m[lang]}</span>
            <span>{t.newspaper.dateline_r[lang]}</span>
          </div>
          <div className="np-title-wrap">
            <h1 className="np-title-section">{t.reservation.title[lang]}</h1>
          </div>
        </div>

        <div className="np-rule-single" />

        {/* Lead */}
        <p className="np-lead np-dropcap" style={{ maxWidth: 820, margin: "14px auto 20px" }}>{t.reserve_page.lead[lang]}</p>

        <div className="np-rule-thin" />

        {/* Calendar + side column */}
        <div className="np-grid-2">
          <div className="np-box" style={{ padding: 20 }}>
            <p className="np-kicker">{lang === "de" ? "Online-Reservierung" : "Online reservation"}</p>
            <h2 className="np-h2" style={{ marginBottom: 12 }}>{t.reservation.title[lang]}</h2>
            <ReservationCalendar />
          </div>
          <div className="np-col-rule" />
          <div>
            <p className="np-kicker">{t.reserve_page.note_h[lang]}</p>
            <p className="np-body">{t.reserve_page.note_body[lang]}</p>

            <div className="np-rule-thin" />

            <p className="np-kicker">{t.reserve_page.hours_h[lang]}</p>
            <p className="np-body" style={{ margin: 0 }}>{t.hours.monday[lang]}</p>
            <p className="np-body" style={{ margin: 0, fontWeight: 700, color: "#201515" }}>{t.hours.tue_sun[lang]}</p>
            <p className="np-body" style={{ margin: 0 }}>{t.hours.lunch[lang]}</p>
            <p className="np-body" style={{ margin: 0 }}>{t.hours.dinner[lang]}</p>

            <div className="np-rule-thin" />

            <p className="np-kicker" style={{ marginBottom: 8 }}>{lang === "de" ? "Telefon" : "By Phone"}</p>
            <a href="tel:+4989209281230" style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 900, color: "#201515", textDecoration: "none", display: "block", lineHeight: 1.2 }}>
              089 / 209 28 123
            </a>
            <p className="np-body" style={{ marginTop: 10, lineHeight: 1.55, maxWidth: 280, textAlign: "left" }}>
              {lang === "de"
                ? "Für Gruppen ab 8 Personen oder besondere Wünsche."
                : "For groups of 8+ or special requests."}
            </p>

            <div className="np-rule-thin" />

            <p className="np-kicker" style={{ marginBottom: 8 }}>{lang === "de" ? "E-Mail" : "By Email"}</p>
            <a href="mailto:maranotrattoria@gmail.com" style={{ fontFamily: "Georgia, serif", fontSize: 17, fontWeight: 700, color: "#201515", textDecoration: "none", display: "block", lineHeight: 1.3, wordBreak: "break-all" }}>
              maranotrattoria@gmail.com
            </a>
            <p className="np-body" style={{ marginTop: 10, lineHeight: 1.55, maxWidth: 280, textAlign: "left" }}>
              {lang === "de"
                ? "Für schriftliche Anfragen und Sonderwünsche."
                : "For written inquiries and special requests."}
            </p>
          </div>
        </div>

        <div className="np-footer-rule">
          <p className="np-footer-text">{t.newspaper.footer_rule[lang]}</p>
        </div>
      </div>
    </div>
  )
}
