import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Trattoria Marano - Ohlmüllerstr. 22, Monaco",
    template: "%s | Trattoria Marano Monaco di Baviera",
  },
  description: "Autentica cucina italiana nel cuore di Monaco di Baviera. Pizza napoletana, pasta fatta in casa, antipasti classici. Aperto da martedì a domenica.",
  alternates: {
    canonical: "/it",
    languages: {
      "de-DE": "/",
      "en-US": "/en",
      "it-IT": "/it",
      "x-default": "/",
    },
  },
  openGraph: { locale: "it_IT", alternateLocale: ["de_DE", "en_US"] },
}

export default function ItLayout({ children }: { children: React.ReactNode }) {
  return children
}
