import type { Metadata } from "next"
export { default } from "@/app/page"

export const metadata: Metadata = {
  title: "Trattoria Marano - Ohlmüllerstr. 22, Munich",
  description: "Authentic Italian cuisine in the heart of Munich. Neapolitan stone-oven pizza, homemade pasta, classic antipasti.",
  alternates: { canonical: "/en", languages: { "de-DE": "/", "en-US": "/en", "it-IT": "/it", "x-default": "/" } },
}
