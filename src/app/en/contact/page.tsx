import type { Metadata } from "next"
export { default } from "@/app/contact/page"

export const metadata: Metadata = {
  title: "Contact - Trattoria Marano Munich",
  description: "Trattoria Marano, Ohlmüllerstraße 22, 81541 Munich. Phone +49 89 209 28 123. Open Tue-Sun lunch and dinner. Directions, parking, reservations.",
  alternates: { canonical: "/en/contact", languages: { "de-DE": "/contact", "en-US": "/en/contact", "it-IT": "/it/contact", "x-default": "/contact" } },
}
