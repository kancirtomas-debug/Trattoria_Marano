import type { Metadata } from "next"
export { default } from "@/app/reserve/page"

export const metadata: Metadata = {
  title: "Prenota un tavolo - Trattoria Marano Monaco",
  description: "Prenota online un tavolo alla Trattoria Marano a Monaco di Baviera. Veloce, semplice, in pochi clic - conferma via e-mail.",
  alternates: { canonical: "/it/reserve", languages: { "de-DE": "/reserve", "en-US": "/en/reserve", "it-IT": "/it/reserve", "x-default": "/reserve" } },
}
