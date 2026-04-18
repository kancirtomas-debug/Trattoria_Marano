"use client"
import { useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export type GalleryPhoto = {
  src: string
  caption?: string
}

type Props = {
  photos: GalleryPhoto[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function GalleryLightbox({ photos, index, onClose, onPrev, onNext }: Props) {
  const photo = photos[index]

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose()
    if (e.key === "ArrowLeft") onPrev()
    if (e.key === "ArrowRight") onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [handleKey])

  return (
    <div
      onClick={onClose}
      className="np-lightbox-shell"
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption ?? "Gallery image viewer"}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.95)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "8px",
      }}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        style={{
          position: "absolute", top: 16, right: 16,
          background: "rgba(255,255,255,0.1)", border: "none",
          borderRadius: "50%", width: 44, height: 44,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#fff", transition: "background 150ms",
          zIndex: 10,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
      >
        <X size={20} />
      </button>

      {/* Prev */}
      {photos.length > 1 && (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); onPrev() }}
          aria-label="Previous image"
          style={{
            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.1)", border: "none",
            borderRadius: "50%", width: 48, height: 48,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#fff", transition: "background 150ms", zIndex: 10,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Next */}
      {photos.length > 1 && (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); onNext() }}
          aria-label="Next image"
          style={{
            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.1)", border: "none",
            borderRadius: "50%", width: 48, height: 48,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#fff", transition: "background 150ms", zIndex: 10,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Image */}
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: "98vw", maxHeight: "98vh", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <img
          key={photo.src}
          className="np-lightbox-image"
          src={photo.src}
          alt={photo.caption ?? ""}
          style={{
            maxWidth: "98vw",
            maxHeight: "90vh",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            display: "block",
            boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
            imageRendering: "auto",
          } as React.CSSProperties}
        />
        {photo.caption && (
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, fontStyle: "italic", textAlign: "center", maxWidth: 600, margin: 0 }}>
            {photo.caption}
          </p>
        )}
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: 0 }}>
          {index + 1} / {photos.length}
        </p>
      </div>
    </div>
  )
}
