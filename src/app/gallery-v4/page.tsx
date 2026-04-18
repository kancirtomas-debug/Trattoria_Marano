"use client"
import { useState } from "react"
import GalleryLightbox, { type GalleryPhoto } from "@/components/GalleryLightbox"

const photos: GalleryPhoto[] = [
  { src: "/images/gallery/rest-1.webp",  caption: "Der Eingang — das Marano-Monogramm begrüßt jeden Gast" },
  { src: "/images/gallery/rest-7.webp",  caption: "Unser Pizzabäcker am Steinofen — Handwerk seit 1988" },
  { src: "/images/gallery/rest-5.jpg",   caption: "Abendstimmung im Gastraum — Kerzen, Wein und gute Gesellschaft" },
  { src: "/images/gallery/rest-3.webp",  caption: "La Cantina — über 80 erlesene Weine aus allen Regionen Italiens" },
  { src: "/images/gallery/rest-6.jpg",   caption: "Am Tisch — jeder Platz hat seine eigene Geschichte" },
  { src: "/images/gallery/rest-2.webp",  caption: "Die alten Holzbalken — ein Hauch von rustikaler Toskana" },
  { src: "/images/gallery/rest-4.png",   caption: "Vintage-Fotografien an der Wand — das Italien der 1960er Jahre" },
]

function Photo({ src, caption, height, objPos, onClick }: { src: string; caption: string; height: number; objPos?: string; onClick: () => void }) {
  return (
    <div style={{ cursor: "zoom-in" }} onClick={onClick}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <img
          src={src} alt={caption}
          style={{ width: "100%", height, objectFit: "cover", objectPosition: objPos ?? "center", display: "block", transition: "transform 0.4s ease" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
      <p style={{ fontSize: 10, color: "#939084", fontStyle: "italic", margin: "5px 0 0", letterSpacing: "0.03em", borderTop: "1px solid #c5c0b1", paddingTop: 4 }}>
        {caption}
      </p>
    </div>
  )
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
      <div style={{ flex: 1, height: 1, background: "#36342e" }} />
      <span style={{ fontSize: 14, color: "#6b1535", lineHeight: 1 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: "#36342e" }} />
    </div>
  )
}

export default function GalleryV4() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const open = (i: number) => setLightbox(i)
  const close = () => setLightbox(null)
  const prev = () => setLightbox(i => i === null ? null : (i - 1 + photos.length) % photos.length)
  const next = () => setLightbox(i => i === null ? null : (i + 1) % photos.length)

  return (
    <div style={{ minHeight: "100vh", background: "#f0ebe0", fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <style>{`
        @media (max-width: 640px) {
          .newspaper-grid-2 { grid-template-columns: 1fr !important; }
          .newspaper-grid-2 > div[style*="background: #c5c0b1"] { display: none !important; }
          .newspaper-grid-3 { grid-template-columns: 1fr !important; }
          .newspaper-grid-3 > div[style*="background: #c5c0b1"] { display: none !important; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .newspaper-grid-3 { grid-template-columns: 1fr 1px 1fr !important; }
        }
      `}</style>

      {lightbox !== null && (
        <GalleryLightbox photos={photos} index={lightbox} onClose={close} onPrev={prev} onNext={next} />
      )}

      {/* Nav */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, background: "rgba(240,235,224,0.97)", backdropFilter: "blur(4px)", padding: "8px 20px", display: "flex", gap: 10, alignItems: "center", borderBottom: "2px solid #201515" }}>
        <span style={{ color: "#201515", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginRight: 6 }}>Galerie</span>
        {[1,2,3,4].map(n => (
          <a key={n} href={`/gallery-v${n}`} style={{ padding: "3px 10px", background: n === 4 ? "#201515" : "transparent", border: "1px solid #201515", color: n === 4 ? "#f0ebe0" : "#201515", fontSize: 10, fontWeight: 700, textDecoration: "none", letterSpacing: "0.05em" }}>
            Option {n}
          </a>
        ))}
        <a href="/" style={{ marginLeft: "auto", color: "#939084", fontSize: 10, textDecoration: "none" }}>← Zurück</a>
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 80px" }}>

        {/* Masthead */}
        <div style={{ borderTop: "5px solid #201515", paddingTop: 10, marginBottom: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, letterSpacing: "0.1em", color: "#36342e", marginBottom: 8, textTransform: "uppercase" }}>
            <span>München · Seit 1988</span>
            <span>Cucina Italiana · Ohlmüllerstr. 22</span>
            <span>Ausgabe 2026</span>
          </div>
          <div style={{ borderTop: "1px solid #36342e", borderBottom: "1px solid #36342e", padding: "6px 0", textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "#201515", margin: 0, lineHeight: 0.95, textTransform: "uppercase" }}>
              Trattoria Marano
            </h1>
          </div>
          <p style={{ textAlign: "center", fontStyle: "italic", fontSize: 13, color: "#6b1535", margin: "6px 0 0", letterSpacing: "0.08em" }}>
            Galerie — Einblicke in unser Restaurant
          </p>
        </div>

        <Divider />

        {/* Section 1: Big feature + side column */}
        <div className="newspaper-grid-2" style={{ display: "grid", gridTemplateColumns: "3fr 1px 1fr", gap: "0 24px", marginBottom: 24 }}>
          <Photo src={photos[0].src} caption={photos[0].caption!} height={400} onClick={() => open(0)} />
          <div style={{ background: "#c5c0b1" }} />
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.03em", lineHeight: 1.15, color: "#201515", margin: "0 0 10px" }}>
              Willkommen im Marano
            </h2>
            <p style={{ fontSize: 12, lineHeight: 1.75, color: "#36342e", margin: "0 0 10px", textAlign: "justify" }}>
              Seit fast vier Jahrzehnten ist das Trattoria Marano ein fester Bestandteil der Münchner Gastronomieszene. Mit seiner warmen Atmosphäre, den rustikalen Holzbalken und dem unverwechselbaren Charakter lädt es zum Verweilen ein.
            </p>
            <Photo src={photos[1].src} caption={photos[1].caption!} height={180} onClick={() => open(1)} />
          </div>
        </div>

        <Divider />

        {/* Section 2: Three equal columns */}
        <div className="newspaper-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr", gap: "0 24px", marginBottom: 24 }}>
          <Photo src={photos[2].src} caption={photos[2].caption!} height={260} onClick={() => open(2)} />
          <div style={{ background: "#c5c0b1" }} />
          <Photo src={photos[3].src} caption={photos[3].caption!} height={260} onClick={() => open(3)} />
          <div style={{ background: "#c5c0b1" }} />
          <Photo src={photos[4].src} caption={photos[4].caption!} height={260} onClick={() => open(4)} />
        </div>

        <Divider />

        {/* Section 3: Two wide photos */}
        <div className="newspaper-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: "0 24px", marginBottom: 24 }}>
          <Photo src={photos[5].src} caption={photos[5].caption!} height={300} onClick={() => open(5)} />
          <div style={{ background: "#c5c0b1" }} />
          <Photo src={photos[6].src} caption={photos[6].caption!} height={300} objPos="center top" onClick={() => open(6)} />
        </div>

        {/* Footer rule */}
        <div style={{ borderTop: "4px double #201515", paddingTop: 10, textAlign: "center" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#939084", margin: 0 }}>
            Trattoria Marano · Ohlmüllerstr. 22 · 81541 München · +49 89 209 281 230
          </p>
        </div>
      </div>
    </div>
  )
}
