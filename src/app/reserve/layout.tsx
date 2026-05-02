import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tisch reservieren - Trattoria Marano München",
  description: "Reservieren Sie online einen Tisch in der Trattoria Marano in München. Schnell, einfach, in wenigen Klicks - Bestätigung per E-Mail.",
  alternates: { canonical: "/reserve", languages: { "de-DE": "/reserve", "en-US": "/en/reserve", "it-IT": "/it/reserve", "x-default": "/reserve" } },
  openGraph: {
    title: "Tisch reservieren - Trattoria Marano München",
    description: "Online-Reservierung für die Trattoria Marano in München.",
    url: "/reserve",
  },
}

export default function ReserveLayout({ children }: { children: React.ReactNode }) {
  return children
}
