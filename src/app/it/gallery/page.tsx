import type { Metadata } from "next"
export { default } from "@/app/gallery/page"

export const metadata: Metadata = {
  title: "Galleria - Trattoria Marano Monaco",
  description: "Foto dalla Trattoria Marano - interno, forno a pietra, pizza, pasta e antipasti. Atmosfera italiana a Monaco di Baviera.",
  alternates: { canonical: "/it/gallery", languages: { "de-DE": "/gallery", "en-US": "/en/gallery", "it-IT": "/it/gallery", "x-default": "/gallery" } },
}
