import type { Metadata } from "next"
export { default } from "@/app/about/page"

export const metadata: Metadata = {
  title: "Chi siamo - Trattoria Marano Monaco",
  description: "Autentica pizza napoletana, pasta fatta in casa, antipasti classici. Caffè Saquella, opzioni di farro e vegane. Nel cuore di Monaco di Baviera.",
  alternates: { canonical: "/it/about", languages: { "de-DE": "/about", "en-US": "/en/about", "it-IT": "/it/about", "x-default": "/about" } },
}
