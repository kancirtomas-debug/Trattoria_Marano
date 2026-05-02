import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakt - Trattoria Marano München",
  description: "Trattoria Marano, Ohlmüllerstraße 22, 81541 München. Telefon 089 / 209 28 123. Öffnungszeiten Di-So mittags und abends. Anfahrt, Parken, Reservierung.",
  alternates: { canonical: "/contact", languages: { "de-DE": "/contact", "en-US": "/en/contact", "it-IT": "/it/contact", "x-default": "/contact" } },
  openGraph: {
    title: "Kontakt - Trattoria Marano München",
    description: "Adresse, Telefon, Öffnungszeiten und Anfahrt zur Trattoria Marano.",
    url: "/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
