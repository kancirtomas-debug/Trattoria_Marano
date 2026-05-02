import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Trattoria Marano - Ohlmüllerstr. 22, Munich",
    template: "%s | Trattoria Marano Munich",
  },
  description: "Authentic Italian cuisine in the heart of Munich. Neapolitan pizza, homemade pasta, classic antipasti. Open Tuesday to Sunday.",
  alternates: {
    canonical: "/en",
    languages: {
      "de-DE": "/",
      "en-US": "/en",
      "it-IT": "/it",
      "x-default": "/",
    },
  },
  openGraph: { locale: "en_US", alternateLocale: ["de_DE", "it_IT"] },
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children
}
