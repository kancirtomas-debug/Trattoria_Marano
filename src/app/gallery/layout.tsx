import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Galerie - Trattoria Marano München",
  description: "Bilder aus der Trattoria Marano - Innenraum, Steinofen, Pizza, Pasta und Antipasti. Italienisches Lebensgefühl in München.",
  alternates: { canonical: "/gallery", languages: { "de-DE": "/gallery", "en-US": "/en/gallery", "it-IT": "/it/gallery", "x-default": "/gallery" } },
  openGraph: {
    title: "Galerie - Trattoria Marano München",
    description: "Bilder aus der Trattoria Marano - Steinofen, Pizza, Pasta, Antipasti.",
    url: "/gallery",
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
