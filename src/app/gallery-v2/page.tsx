"use client"
import { useState } from "react"
import GalleryLightbox, { type GalleryPhoto } from "@/components/GalleryLightbox"

const photos: GalleryPhoto[] = [
  { src: "/images/gallery/rest-1.webp", caption: "Eingang & Atmosphäre" },
  { src: "/images/gallery/rest-3.webp", caption: "La Cantina — Weinauswahl" },
  { src: "/images/gallery/rest-7.webp", caption: "Am Steinofen" },
  { src: "/images/gallery/rest-4.png",  caption: "Vintage Fotos" },
  { src: "/images/gallery/rest-7.webp", caption: "Die Küche" },
  { src: "/images/gallery/rest-5.jpg",  caption: "Abendstimmung" },
  { src: "/images/gallery/rest-2.webp", caption: "Die alten Holzbalken" },
  { src: "/images/gallery/rest-6.jpg",  caption: "Am Tisch" },
  { src: "/images/gallery/rest-4.png",  caption: "Vintage Dekor" },
  { src: "/images/gallery/rest-7.webp", caption: "Pizzaküche" },
  { src: "/images/gallery/rest-1.webp", caption: "Trattoria Marano" },
]

type ColItem = { src: string; h: number; photoIndex: number }

const col1: ColItem[] = [
  { src: "/images/gallery/rest-1.webp", h: 340, photoIndex: 0 },
  { src: "/images/gallery/rest-3.webp", h: 260, photoIndex: 1 },
  { src: "/images/gallery/rest-7.webp", h: 260, photoIndex: 2 },
  { src: "/images/gallery/rest-4.png",  h: 280, photoIndex: 3 },
]
const col2: ColItem[] = [
  { src: "/images/gallery/rest-7.webp", h: 300, photoIndex: 4 },
  { src: "/images/gallery/rest-5.jpg",  h: 300, photoIndex: 5 },
  { src: "/images/gallery/rest-2.webp", h: 260, photoIndex: 6 },
]
const col3: ColItem[] = [
  { src: "/images/gallery/rest-6.jpg",  h: 360, photoIndex: 7 },
  { src: "/images/gallery/rest-4.png",  h: 200, photoIndex: 8 },
  { src: "/images/gallery/rest-7.webp", h: 260, photoIndex: 9 },
  { src: "/images/gallery/rest-1.webp", h: 220, photoIndex: 10 },
]

function MasonryCol({ items, onOpen }: { items: ColItem[]; onOpen: (i: number) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
      {items.map((item, i) => (
        <div
          key={i}
          onClick={() => onOpen(item.photoIndex)}
          style={{ overflow: "hidden", borderRadius: 4, cursor: "zoom-in", position: "relative" }}
        >
          <img
            src={item.src} alt=""
            style={{ width: "100%", height: item.h, objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      ))}
    </div>
  )
}

export default function GalleryV2() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const close = () => setLightbox(null)
  const prev = () => setLightbox(i => i === null ? null : (i - 1 + photos.length) % photos.length)
  const next = () => setLightbox(i => i === null ? null : (i + 1) % photos.length)

  return (
    <div style={{ minHeight: "100vh", background: "#201515" }}>
      {lightbox !== null && <GalleryLightbox photos={photos} index={lightbox} onClose={close} onPrev={prev} onNext={next} />}

      {/* Nav */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, background: "rgba(32,21,21,0.95)", backdropFilter: "blur(8px)", padding: "10px 20px", display: "flex", gap: 12, alignItems: "center", borderBottom: "1px solid rgba(107,21,53,0.3)" }}>
        <span style={{ color: "#e0d8ce", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginRight: 8 }}>Galerie Prototyp</span>
        {[1,2,3,4].map(n => (
          <a key={n} href={`/gallery-v${n}`} style={{ padding: "4px 14px", borderRadius: 20, background: n === 2 ? "#6b1535" : "rgba(255,255,255,0.08)", color: "#e0d8ce", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
            Option {n}
          </a>
        ))}
        <a href="/" style={{ marginLeft: "auto", color: "rgba(224,216,206,0.4)", fontSize: 12, textDecoration: "none" }}>← Zurück</a>
      </div>

      <div style={{ paddingTop: 80, paddingBottom: 32, textAlign: "center" }}>
        <p style={{ color: "#6b1535", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Galerie</p>
        <h1 style={{ fontFamily: "serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#e0d8ce", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Trattoria Marano</h1>
        <div style={{ width: 40, height: 2, background: "#6b1535", margin: "16px auto 0" }} />
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px 60px", display: "flex", gap: 6 }}>
        <MasonryCol items={col1} onOpen={setLightbox} />
        <MasonryCol items={col2} onOpen={setLightbox} />
        <MasonryCol items={col3} onOpen={setLightbox} />
      </div>
    </div>
  )
}
