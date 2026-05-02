"use client"
import { useEffect, useState } from "react"
import Reveal from "@/components/ui/reveal"
import { useLanguage } from "@/context/LanguageContext"
import GoogleReviewsSection from "./GoogleReviewsSection"
import type { PlaceData, Review } from "@/lib/google-reviews"

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sa=X&q=trattoria+marano+m%C3%BCnchen+reviews&rldimm=7054837083427866703&tbm=lcl#lkt=LocalPoiReviews"

const copy = {
  de: { eyebrow: "Bewertungen", title: "Was unsere Gäste sagen", cta: "Alle Google-Bewertungen lesen", verified: "Verifiziert auf Google" },
  en: { eyebrow: "Reviews", title: "What our guests say", cta: "Read all Google reviews", verified: "Verified on Google" },
  it: { eyebrow: "Recensioni", title: "Cosa dicono i nostri ospiti", cta: "Leggi tutte le recensioni Google", verified: "Verificato su Google" },
} as const

function Stars({ value }: { value: number }) {
  return (
    <span aria-label={`${value} stars`} style={{ color: "#fbbc05", letterSpacing: 1 }}>
      {"★".repeat(Math.round(value))}{"☆".repeat(5 - Math.round(value))}
    </span>
  )
}

export default function GoogleReviewsLive() {
  const { lang } = useLanguage()
  const c = copy[lang as keyof typeof copy] ?? copy.de
  const [data, setData] = useState<PlaceData | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let alive = true
    fetch("/api/google-reviews")
      .then((r) => r.ok ? r.json() : null)
      .then((j) => { if (alive) { setData(j); setLoaded(true) } })
      .catch(() => { if (alive) setLoaded(true) })
    return () => { alive = false }
  }, [])

  if (!loaded) return null
  if (!data || data.reviews.length === 0) return <GoogleReviewsSection />

  return (
    <section className="py-20" style={{ background: "transparent" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 1.5rem" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p style={{ fontSize: 12, letterSpacing: "0.22em", color: "#6b1535", fontWeight: 700, marginBottom: 12 }}>
              {c.eyebrow}
            </p>
            <h2 style={{ fontFamily: "var(--font-heading), Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15, color: "#201515", marginBottom: 12 }}>
              {c.title}
            </h2>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "system-ui", fontSize: 16, color: "#201515" }}>
              <span style={{ fontWeight: 700, fontSize: 22 }}>{data.rating.toFixed(1)}</span>
              <Stars value={data.rating} />
              <span style={{ color: "#6b6464" }}>({data.userRatingsTotal.toLocaleString()})</span>
            </div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {data.reviews.map((rev: Review) => (
            <Reveal key={`${rev.author}-${rev.time}`}>
              <article
                style={{
                  background: "#fffefb",
                  borderRadius: 14,
                  padding: 20,
                  border: "1px solid rgba(107,21,53,0.1)",
                  boxShadow: "0 6px 20px rgba(32,21,21,0.04)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <header style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {rev.authorPhoto && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={rev.authorPhoto}
                      alt={rev.author}
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, color: "#201515", margin: 0 }}>{rev.author}</p>
                    <p style={{ fontSize: 12, color: "#6b6464", margin: 0 }}>{rev.relativeTime ?? ""}</p>
                  </div>
                  <Stars value={rev.rating} />
                </header>
                <p style={{ fontFamily: "Georgia, serif", fontSize: 14, lineHeight: 1.6, color: "#3d2a2a", margin: 0, flex: 1 }}>
                  {rev.text}
                </p>
                <p style={{ fontSize: 11, color: "#6b6464", margin: 0, fontStyle: "italic" }}>{c.verified}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
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
            {c.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
