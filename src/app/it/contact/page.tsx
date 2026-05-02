import type { Metadata } from "next"
export { default } from "@/app/contact/page"

export const metadata: Metadata = {
  title: "Contatti - Trattoria Marano Monaco",
  description: "Trattoria Marano, Ohlmüllerstraße 22, 81541 Monaco di Baviera. Telefono +49 89 209 28 123. Aperto mar-dom pranzo e cena. Indicazioni, parcheggio, prenotazioni.",
  alternates: { canonical: "/it/contact", languages: { "de-DE": "/contact", "en-US": "/en/contact", "it-IT": "/it/contact", "x-default": "/contact" } },
}
