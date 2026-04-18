"use client"
import { useState } from "react"
import GalleryLightbox, { type GalleryPhoto } from "@/components/GalleryLightbox"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

function Photo({ src, caption, height, objPos, onClick }: { src: string; caption: string; height: number; objPos?: string; onClick: () => void }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        aria-label={caption}
        style={{
          cursor: "zoom-in",
          display: "block",
          width: "100%",
          padding: 0,
          border: "none",
          background: "transparent",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={src}
          alt={caption}
          loading="lazy"
          style={{
            width: "100%",
            height,
            objectFit: "cover",
            objectPosition: objPos ?? "center",
            display: "block",
            filter: "saturate(0.92) contrast(1.02)",
            transition: "transform 0.5s ease, filter 0.5s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.04)"
            e.currentTarget.style.filter = "saturate(1) contrast(1.04)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)"
            e.currentTarget.style.filter = "saturate(0.92) contrast(1.02)"
          }}
        />
      </button>
      <p className="np-caption">{caption}</p>
    </div>
  )
}

export default function GalleryPage() {
  const { lang } = useLanguage()
  const [lightbox, setLightbox] = useState<number | null>(null)

  const photos: GalleryPhoto[] = [
    { src: "/images/gallery/rest-1.webp", caption: t.gallery.caption1[lang] },
    { src: "/images/gallery/rest-7.webp", caption: t.gallery.caption2[lang] },
    { src: "/images/gallery/rest-5.jpg",  caption: t.gallery.caption3[lang] },
    { src: "/images/gallery/rest-3.webp", caption: t.gallery.caption4[lang] },
    { src: "/images/gallery/rest-6.jpg",  caption: t.gallery.caption5[lang] },
    { src: "/images/gallery/rest-2.webp", caption: t.gallery.caption6[lang] },
    { src: "/images/gallery/rest-4.png",  caption: t.gallery.caption7[lang] },
  ]

  const open = (i: number) => setLightbox(i)
  const close = () => setLightbox(null)
  const prev = () => setLightbox(i => i === null ? null : (i - 1 + photos.length) % photos.length)
  const next = () => setLightbox(i => i === null ? null : (i + 1) % photos.length)

  return (
    <div className="np-page">
      {lightbox !== null && (
        <GalleryLightbox photos={photos} index={lightbox} onClose={close} onPrev={prev} onNext={next} />
      )}

      <div className="np-wrap">

        {/* Masthead */}
        <div className="np-masthead">
          <div className="np-dateline">
            <span>{t.newspaper.dateline_l[lang]}</span>
            <span>{t.newspaper.dateline_m[lang]}</span>
            <span>{t.newspaper.dateline_r[lang]}</span>
          </div>
          <div className="np-title-wrap">
            <h1 className="np-title-section">{t.gallery.masthead_sub[lang]}</h1>
          </div>
        </div>

        <div className="np-rule-single" />

        {/* Section 1: Feature photo + side column article */}
        <div className="np-grid-2">
          <Photo src={photos[0].src} caption={photos[0].caption!} height={440} onClick={() => open(0)} />
          <div className="np-col-rule" />
          <div>
            <p className="np-kicker">Cover Story</p>
            <h2 className="np-h2">{t.gallery.article1_title[lang]}</h2>
            <p className="np-body np-dropcap">{t.gallery.article1_body[lang]}</p>
            <div className="np-rule-single" />
            <Photo src={photos[1].src} caption={photos[1].caption!} height={180} onClick={() => open(1)} />
          </div>
        </div>

        <div className="np-rule-thin" />

        {/* Editorial spread 1 — two columns of text over photo bands */}
        <div className="np-grid-even-2" style={{ marginBottom: 16 }}>
          <div>
            <p className="np-kicker">{lang === "de" ? "Handwerk" : "Craft"}</p>
            <h2 className="np-h2">{t.gallery.article2_title[lang]}</h2>
            <p className="np-body">{t.gallery.article2_body[lang]}</p>
          </div>
          <div className="np-col-rule" />
          <div>
            <p className="np-kicker">{lang === "de" ? "Die Cantina" : "The Cantina"}</p>
            <h2 className="np-h2">{t.gallery.article3_title[lang]}</h2>
            <p className="np-body">{t.gallery.article3_body[lang]}</p>
          </div>
        </div>

        {/* Section 2: Three-up photo band */}
        <div className="np-grid-3">
          <Photo src={photos[2].src} caption={photos[2].caption!} height={280} onClick={() => open(2)} />
          <div className="np-col-rule" />
          <Photo src={photos[3].src} caption={photos[3].caption!} height={280} onClick={() => open(3)} />
          <div className="np-col-rule" />
          <Photo src={photos[4].src} caption={photos[4].caption!} height={280} onClick={() => open(4)} />
        </div>

        <div className="np-rule-thin" />

        {/* Pull quote */}
        <blockquote className="np-pullquote">
          {lang === "de"
            ? "„Die Zeit schmeckt anders, wenn ein Holzofen nebenan atmet.\""
            : "\"Time tastes different when a wood-fired oven breathes nearby.\""}
        </blockquote>

        <div className="np-rule-thin" />

        {/* Final editorial + two wide photos */}
        <div className="np-grid-even-2">
          <div>
            <p className="np-kicker">{lang === "de" ? "Atmosphäre" : "Atmosphere"}</p>
            <h2 className="np-h2">{t.gallery.article4_title[lang]}</h2>
            <p className="np-body">{t.gallery.article4_body[lang]}</p>
          </div>
          <div className="np-col-rule" />
          <Photo src={photos[5].src} caption={photos[5].caption!} height={260} onClick={() => open(5)} />
        </div>

        <div className="np-grid-even-2">
          <Photo src={photos[6].src} caption={photos[6].caption!} height={320} objPos="center top" onClick={() => open(6)} />
          <div className="np-col-rule" />
          <div>
            <p className="np-kicker">{lang === "de" ? "Galerie — Fortsetzung" : "Gallery — Continued"}</p>
            <p className="np-body">
              {lang === "de"
                ? "Jede Wand unseres Hauses trägt Erinnerungen — schwarzweisse Fotografien aus den 1960er Jahren, Urkunden, Postkarten aus der alten Heimat. Das Marano ist nicht nur ein Restaurant; es ist ein Archiv einer Familie, die Neapel nach München mitgenommen hat. Schauen Sie ruhig zweimal hin."
                : "Every wall of our house carries memories — black-and-white photographs from the 1960s, certificates, postcards from the old country. Marano is not merely a restaurant; it is an archive of a family who carried Naples to Munich. Look twice — there is much to find."}
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
