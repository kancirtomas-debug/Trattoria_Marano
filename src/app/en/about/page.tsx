import type { Metadata } from "next"
export { default } from "@/app/about/page"

export const metadata: Metadata = {
  title: "About - Trattoria Marano Munich",
  description: "Authentic Neapolitan pizza, homemade pasta, classic antipasti. Saquella coffee, spelt and vegan options. In the heart of Munich.",
  alternates: { canonical: "/en/about", languages: { "de-DE": "/about", "en-US": "/en/about", "it-IT": "/it/about", "x-default": "/about" } },
}
