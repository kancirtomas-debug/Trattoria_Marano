"use client"
import Reveal from "@/components/ui/reveal"
import { useLanguage } from "@/context/LanguageContext"

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sa=X&q=trattoria+marano+m%C3%BCnchen+reviews&rldimm=7054837083427866703&tbm=lcl#lkt=LocalPoiReviews"

const copy = {
  de: {
    eyebrow: "Bewertungen",
    title: "Was unsere Gäste sagen",
    body: "Lest echte Bewertungen von unseren Gästen direkt auf Google - geprüft, mit Foto und Datum.",
    cta: "Alle Google-Bewertungen lesen",
    write: "Eigene Bewertung schreiben",
  },
  en: {
    eyebrow: "Reviews",
    title: "What our guests say",
    body: "Read genuine reviews from our guests on Google - verified, with photos and dates.",
    cta: "Read all Google reviews",
    write: "Write your own review",
  },
  it: {
    eyebrow: "Recensioni",
    title: "Cosa dicono i nostri ospiti",
    body: "Leggi le recensioni autentiche dei nostri ospiti direttamente su Google - verificate, con foto e data.",
    cta: "Leggi tutte le recensioni Google",
    write: "Scrivi la tua recensione",
  },
} as const

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  )
}

export default function GoogleReviewsSection() {
  const { lang } = useLanguage()
  const c = copy[lang as keyof typeof copy] ?? copy.de

  return (
    <section className="py-20" style={{ background: "transparent" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 1.5rem" }}>
        <Reveal>
          <div
            style={{
              borderRadius: 16,
              padding: "clamp(28px, 5vw, 56px)",
              background: "#fffefb",
              border: "1px solid rgba(107,21,53,0.12)",
              boxShadow: "0 12px 40px rgba(32,21,21,0.06)",
              textAlign: "center",
            }}
          >
            <p
              className="section-label"
              style={{
                fontSize: 12,
                letterSpacing: "0.22em",
                color: "#6b1535",
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              {c.eyebrow}
            </p>

            <h2
              style={{
                fontFamily: "var(--font-heading), Georgia, serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 1.15,
                color: "#201515",
                marginBottom: 14,
              }}
            >
              {c.title}
            </h2>

            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                lineHeight: 1.6,
                color: "#5b4848",
                maxWidth: 600,
                margin: "0 auto 28px",
              }}
            >
              {c.body}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 22px",
                  borderRadius: 999,
                  background: "#201515",
                  color: "#fffefb",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  border: "2px solid #201515",
                }}
              >
                <GoogleLogo />
                {c.cta}
              </a>

              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 22px",
                  borderRadius: 999,
                  background: "transparent",
                  color: "#201515",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  border: "2px solid #201515",
                }}
              >
                {c.write}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
