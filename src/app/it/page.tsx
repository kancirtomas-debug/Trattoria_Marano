import type { Metadata } from "next"
export { default } from "@/app/page"

export const metadata: Metadata = {
  title: "Trattoria Marano - Ohlmüllerstr. 22, Monaco di Baviera",
  description: "Autentica cucina italiana nel cuore di Monaco di Baviera. Pizza napoletana al forno a pietra, pasta fatta in casa, antipasti classici.",
  alternates: { canonical: "/it", languages: { "de-DE": "/", "en-US": "/en", "it-IT": "/it", "x-default": "/" } },
}
