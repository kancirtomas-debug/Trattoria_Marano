"use client"
import { useState } from "react"
import GalleryLightbox, { type GalleryPhoto } from "@/components/GalleryLightbox"

const photos: GalleryPhoto[] = [
  { src: "/images/gallery/rest-7.webp",  caption: "Die Küche — Handwerk seit 1988" },
  { src: "/images/gallery/rest-1.webp",  caption: "Eingang & Atmosphäre" },
  { src: "/images/gallery/rest-5.jpg",   caption: "Abendstimmung" },
  { src: "/images/gallery/rest-3.webp",  caption: "La Cantina — Weinauswahl" },
  { src: "/images/gallery/rest-6.jpg",   caption: "Am Tisch" },
  { src: "/images/gallery/rest-7.webp",  caption: "Pizzabäcker am Steinofen" },
  { src: "/images/gallery/rest-2.webp",  caption: "Die alten Holzbalken" },
  { src: "/images/gallery/rest-4.png",   caption: "Vintage-Fotografien an der Wand" },
]

const grid = [
  { photoIndex: 0, span: 2 },
  { photoIndex: 1, span: 1 },
  { photoIndex: 2, span: 1 },
  { photoIndex: 3, span: 1 },
  { photoIndex: 4, span: 1 },
  { photoIndex: 5, span: 2 },
  { photoIndex: 6, span: 1 },
  { photoIndex: 7, span: 1 },
]

export default function GalleryV3() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const close = () => setLightbox(null)
  const prev = () => setLightbox(i => i === null ? null : (i - 1 + photos.length) % photos.length)
  const next = () => setLightbox(i => i === null ? null : (i + 1) % photos.length)

  return (
    <div style={{ minHeight: "100vh", background: "#fffdf9" }}>
      {lightbox !== null && <GalleryLightbox photos={photos} index={lightbox} onClose={close} onPrev={prev} onNext={next} />}

      {/* Nav */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, background: "rgba(255,253,249,0.97)", backdropFilter: "blur(8px)", padding: "10px 20px", display: "flex", gap: 12, alignItems: "center", borderBottom: "1px solid #e0d8ce" }}>
        <span style={{ color: "#36342e", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginRight: 8 }}>Galerie Prototyp</span>
        {[1,2,3,4].map(n => (
          <a key={n} href={`/gallery-v${n}`} style={{ padding: "4px 14px", borderRadius: 20, background: n === 3 ? "#6b1535" : "#eceae3", color: n === 3 ? "#fff" : "#36342e", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
            Option {n}
          </a>
        ))}
        <a href="/" style={{ marginLeft: "auto", color: "#939084", fontSize: 12, textDecoration: "none" }}>← Zurück</a>
      </div>

      <div style={{ paddingTop: 80, paddingBottom: 32, textAlign: "center" }}>
        <p style={{ color: "#6b1535", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Galerie</p>
        <h1 style={{ fontFamily: "serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#201515", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Trattoria Marano</h1>
        <p style={{ color: "#939084", fontSize: 14, marginTop: 8 }}>Einblicke in unser Restaurant</p>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 80px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
        {grid.map((item, i) => {
          const photo = photos[item.photoIndex]
          return (
            <div
              key={i}
              onClick={() => setLightbox(item.photoIndex)}
              style={{ gridColumn: `span ${item.span}`, position: "relative", overflow: "hidden", cursor: "zoom-in", borderRadius: 2 }}
            >
              <img
                src={photo.src} alt={photo.caption}
                style={{ width: "100%", height: item.span === 2 ? 320 : 280, objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(107,21,53,0)", transition: "background 0.3s", display: "flex", alignItems: "flex-end", padding: 16, pointerEvents: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(107,21,53,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(107,21,53,0)")}
              >
                <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, margin: 0, opacity: 0, transition: "opacity 0.3s" }}>{photo.caption}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
