"use client"
import { useState } from "react"
import GalleryLightbox, { type GalleryPhoto } from "@/components/GalleryLightbox"
// PROTOTYPE — Option 1: Scattered restaurant photos as torn background + polaroids on top

const torn = [
  { src: "/images/gallery/rest-1.webp", top: -20,  left: -60,  w: 420, h: 280, rotate: -8,  objPos: "center",   opacity: 0.35, clip: "polygon(0% 5%, 97% 0%, 100% 88%, 3% 100%)" },
  { src: "/images/gallery/rest-7.webp", top: 40,   left: 360,  w: 380, h: 260, rotate: 5,   objPos: "center",   opacity: 0.3,  clip: "polygon(2% 0%, 100% 3%, 98% 95%, 0% 100%)" },
  { src: "/images/gallery/rest-5.jpg",  top: -30,  left: 700,  w: 360, h: 240, rotate: -4,  objPos: "center",   opacity: 0.35, clip: "polygon(0% 2%, 98% 0%, 100% 97%, 2% 100%)" },
  { src: "/images/gallery/rest-3.webp", top: 200,  left: -40,  w: 300, h: 300, rotate: 7,   objPos: "center",   opacity: 0.3,  clip: "polygon(3% 0%, 100% 2%, 97% 100%, 0% 98%)" },
  { src: "/images/gallery/rest-6.jpg",  top: 220,  left: 580,  w: 420, h: 260, rotate: -6,  objPos: "center",   opacity: 0.32, clip: "polygon(0% 3%, 100% 0%, 98% 100%, 1% 97%)" },
  { src: "/images/gallery/rest-2.webp", top: 400,  left: 200,  w: 350, h: 240, rotate: 4,   objPos: "top",      opacity: 0.3,  clip: "polygon(2% 0%, 99% 2%, 100% 98%, 0% 100%)" },
  { src: "/images/gallery/rest-4.png",  top: 480,  left: -20,  w: 300, h: 260, rotate: -3,  objPos: "center",   opacity: 0.35, clip: "polygon(0% 0%, 97% 3%, 100% 100%, 3% 97%)" },
  { src: "/images/gallery/rest-1.webp", top: 440,  left: 680,  w: 380, h: 280, rotate: 9,   objPos: "bottom",   opacity: 0.28, clip: "polygon(3% 2%, 100% 0%, 98% 97%, 0% 100%)" },
  { src: "/images/gallery/rest-7.webp", top: 650,  left: 100,  w: 400, h: 260, rotate: -5,  objPos: "center",   opacity: 0.32, clip: "polygon(1% 0%, 100% 2%, 99% 100%, 0% 98%)" },
  { src: "/images/gallery/rest-5.jpg",  top: 700,  left: 500,  w: 360, h: 280, rotate: 6,   objPos: "top",      opacity: 0.3,  clip: "polygon(0% 3%, 98% 0%, 100% 97%, 2% 100%)" },
  { src: "/images/gallery/rest-6.jpg",  top: 860,  left: -30,  w: 420, h: 240, rotate: -7,  objPos: "center",   opacity: 0.28, clip: "polygon(2% 0%, 100% 3%, 98% 100%, 0% 97%)" },
  { src: "/images/gallery/rest-3.webp", top: 900,  left: 400,  w: 380, h: 260, rotate: 4,   objPos: "center",   opacity: 0.32, clip: "polygon(0% 2%, 99% 0%, 100% 98%, 1% 100%)" },
  { src: "/images/gallery/rest-2.webp", top: 860,  left: 760,  w: 300, h: 240, rotate: -3,  objPos: "top",      opacity: 0.3,  clip: "polygon(3% 0%, 100% 2%, 97% 100%, 0% 98%)" },
]

const polaroids: { src: string; top: number; left: number; rotate: number; w: number; zIndex: number }[] = [
  { src: "/images/gallery/rest-1.webp", top: 80,  left: 30,  rotate: -5,  w: 300, zIndex: 10 },
  { src: "/images/gallery/rest-5.jpg",  top: 60,  left: 680, rotate: 4,   w: 260, zIndex: 11 },
  { src: "/images/gallery/rest-3.webp", top: 340, left: 350, rotate: -3,  w: 280, zIndex: 12 },
  { src: "/images/gallery/rest-6.jpg",  top: 380, left: 660, rotate: 6,   w: 260, zIndex: 10 },
  { src: "/images/gallery/rest-2.webp", top: 640, left: 60,  rotate: -4,  w: 300, zIndex: 11 },
  { src: "/images/gallery/rest-7.webp", top: 620, left: 440, rotate: 3,   w: 280, zIndex: 12 },
  { src: "/images/gallery/rest-4.png",  top: 680, left: 700, rotate: 5,   w: 240, zIndex: 10 },
]

const lightboxPhotos: GalleryPhoto[] = polaroids.map(p => ({ src: p.src }))

export default function GalleryV1() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const close = () => setLightbox(null)
  const prev = () => setLightbox(i => i === null ? null : (i - 1 + lightboxPhotos.length) % lightboxPhotos.length)
  const next = () => setLightbox(i => i === null ? null : (i + 1) % lightboxPhotos.length)

  return (
    <div style={{ minHeight: "100vh", background: "#1a0d06", position: "relative", overflow: "hidden" }}>
      {lightbox !== null && <GalleryLightbox photos={lightboxPhotos} index={lightbox} onClose={close} onPrev={prev} onNext={next} />}

      {/* Nav */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, background: "rgba(26,13,6,0.92)", backdropFilter: "blur(8px)", padding: "10px 20px", display: "flex", gap: 12, alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ color: "#e0d8ce", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginRight: 8 }}>Galerie Prototyp</span>
        {[1,2,3,4].map(n => (
          <a key={n} href={`/gallery-v${n}`} style={{ padding: "4px 14px", borderRadius: 20, background: n === 1 ? "#6b1535" : "rgba(255,255,255,0.08)", color: "#e0d8ce", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
            Option {n}
          </a>
        ))}
        <a href="/" style={{ marginLeft: "auto", color: "rgba(224,216,206,0.4)", fontSize: 12, textDecoration: "none" }}>← Zurück</a>
      </div>

      <div style={{ paddingTop: 72, paddingBottom: 12, textAlign: "center", position: "relative", zIndex: 20 }}>
        <p style={{ color: "#6b1535", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>Galerie</p>
        <h1 style={{ fontFamily: "serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#e0d8ce", fontWeight: 700, margin: 0 }}>Trattoria Marano</h1>
      </div>

      {/* Desktop scattered layout */}
      <div className="scatter-wrap" style={{ position: "relative", width: "100%", height: 1250, marginTop: 20 }}>

        {/* Background: torn restaurant photo fragments */}
        {torn.map((t, i) => (
          <div key={i} style={{
            position: "absolute",
            top: t.top,
            left: `calc(${t.left}px + (100% - 1000px) / 2)`,
            width: t.w, height: t.h,
            transform: `rotate(${t.rotate}deg)`,
            clipPath: t.clip,
            overflow: "hidden",
            opacity: t.opacity,
            filter: "sepia(40%) blur(0.5px)",
          }}>
            <img src={t.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: t.objPos, display: "block" }} />
          </div>
        ))}

        {/* Foreground: polaroid photos */}
        {polaroids.map((p, i) => (
          <div key={i} onClick={() => setLightbox(i)} style={{
            position: "absolute",
            top: p.top,
            left: `calc(${p.left}px + (100% - 1000px) / 2)`,
            width: p.w, zIndex: p.zIndex,
            background: "#fff",
            padding: "10px 10px 38px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.8), 0 3px 10px rgba(0,0,0,0.5)",
            transform: `rotate(${p.rotate}deg)`,
            cursor: "zoom-in",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
          }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement
              el.style.transform = "rotate(0deg) scale(1.07)"
              el.style.zIndex = "100"
              el.style.boxShadow = "0 28px 70px rgba(0,0,0,0.9)"
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement
              el.style.transform = `rotate(${p.rotate}deg)`
              el.style.zIndex = String(p.zIndex)
              el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.8), 0 3px 10px rgba(0,0,0,0.5)"
            }}
          >
            <img src={p.src} alt="" style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
          </div>
        ))}
      </div>

      {/* Mobile fallback */}
      <div className="mobile-wrap" style={{ display: "none", padding: "0 16px 60px", flexDirection: "column", gap: 20 }}>
        {polaroids.map((p, i) => (
          <div key={i} style={{ background: "#fff", padding: "8px 8px 30px", boxShadow: "0 8px 24px rgba(0,0,0,0.6)", transform: `rotate(${p.rotate * 0.4}deg)` }}>
            <img src={p.src} alt="" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 700px) {
          .scatter-wrap { display: none !important; }
          .mobile-wrap { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
