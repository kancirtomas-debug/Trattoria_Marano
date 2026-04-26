"use client"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

export default function ContactPage() {
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
            <h1 className="np-title-section">{t.contact.title[lang]}</h1>
          </div>
        </div>

        <div className="np-rule-single" />

        {/* Lead */}
        <p className="np-lead np-dropcap" style={{ maxWidth: 820, margin: "14px auto 20px" }}>{t.contact_page.lead[lang]}</p>

        <div className="np-rule-thin" />

        {/* Map + right-side info */}
        <div className="np-grid-2">
          <div>
            <p className="np-kicker">{t.contact_page.map[lang]}</p>
            <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", border: "1px solid #201515", overflow: "hidden" }}>
              <iframe
                src="https://maps.google.com/maps?q=Ohlm%C3%BCller+Str.+22,+81541+M%C3%BCnchen&output=embed&z=16"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0, filter: "grayscale(0.6) contrast(1.05)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Trattoria Marano"
              />
            </div>
            <p className="np-caption">
              <a href="https://maps.google.com/?q=Ohlm%C3%BCller+Str.+22+81541+M%C3%BCnchen" target="_blank" rel="noopener noreferrer" style={{ color: "#6b1535", textDecoration: "underline", textUnderlineOffset: 3 }}>
                {t.contact_page.map_open[lang]}
              </a>
            </p>
          </div>
          <div className="np-col-rule" />
          <div>
            <p className="np-kicker">{t.contact_page.phone_h[lang]}</p>
            <a href="tel:+4989209281230" style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 900, color: "#201515", textDecoration: "none", display: "block", marginBottom: 4 }}>
              089 / 209 28 123
            </a>
            <p className="np-body" style={{ marginBottom: 16 }}>{t.contact_page.phone_sub[lang]}</p>

            <div className="np-rule-thin" />

            <p className="np-kicker">{t.contact_page.email_h[lang]}</p>
            <a href="mailto:maranotrattoria@gmail.com" style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700, color: "#201515", textDecoration: "none", display: "block", marginBottom: 4 }}>
              maranotrattoria@gmail.com
            </a>
            <p className="np-body" style={{ marginBottom: 16 }}>{t.contact_page.email_sub[lang]}</p>

            <div className="np-rule-thin" />

            <p className="np-kicker">{t.contact_page.hours_h[lang]}</p>
            <p className="np-body" style={{ margin: 0 }}>{t.hours.monday[lang]}</p>
            <p className="np-body" style={{ margin: 0, fontWeight: 700, color: "#201515" }}>{t.hours.tue_sun[lang]}</p>
            <p className="np-body" style={{ margin: 0 }}>{t.hours.lunch[lang]}</p>
            <p className="np-body" style={{ margin: 0 }}>{t.hours.dinner[lang]}</p>
          </div>
        </div>

        <div className="np-rule-thin" />

        {/* Address column */}
        <div className="np-grid-3">
          <div>
            <p className="np-kicker">{t.contact.address[lang]}</p>
            <p className="np-body" style={{ marginBottom: 0 }}>
              Ohlmüllerstraße 22<br />
              81541 München<br />
              Deutschland
            </p>
          </div>
          <div className="np-col-rule" />
          <div>
            <p className="np-kicker">{lang === "de" ? "Anreise" : "Getting here"}</p>
            <p className="np-body" style={{ marginBottom: 0 }}>
              {lang === "de"
                ? "Tram 16/18 - Haltestelle Reichenbachplatz. U-Bahn U1/U2 - Fraunhoferstraße. Parkplätze rund ums Haus."
                : "Tram 16/18 - Reichenbachplatz stop. U-Bahn U1/U2 - Fraunhoferstraße. Parking available around the building."}
            </p>
          </div>
          <div className="np-col-rule" />
          <div>
            <p className="np-kicker">{lang === "de" ? "Schwesterpizzeria" : "Sister Restaurant"}</p>
            <p className="np-body" style={{ marginBottom: 6 }}>
              Solo Pizza<br />Bereiterangerstr. 18, 81451 München
            </p>
            <a href="https://solopizza.de" target="_blank" rel="noopener noreferrer" className="np-label-red" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>
              {t.footer_extra.sister_website[lang]}
            </a>
          </div>
        </div>

        <div className="np-rule-thick" />

        {/* Reserve CTA box */}
        <div style={{ textAlign: "center", padding: "18px 0" }}>
          <p className="np-kicker">{t.contact_page.reserve_h[lang]}</p>
          <p className="np-lead" style={{ textAlign: "center", maxWidth: 640, margin: "8px auto 16px" }}>
            {t.contact_page.reserve_sub[lang]}
          </p>
          <Link
            href="/reserve"
            style={{
              fontFamily: "Georgia, serif", fontWeight: 900, fontSize: 13,
              letterSpacing: "0.25em", textTransform: "uppercase",
              padding: "14px 26px", background: "#201515", color: "#f0ebe0",
              border: "2px solid #201515", display: "inline-block",
            }}
          >
            {t.reservation.title[lang]}
          </Link>
        </div>

        <div className="np-footer-rule">
          <p className="np-footer-text">{t.newspaper.footer_rule[lang]}</p>
        </div>
      </div>
    </div>
  )
}
