import type { Metadata } from "next"
export { default } from "@/app/gallery/page"

export const metadata: Metadata = {
  title: "Gallery - Trattoria Marano Munich",
  description: "Photos from Trattoria Marano - interior, stone oven, pizza, pasta and antipasti. Italian atmosphere in Munich.",
  alternates: { canonical: "/en/gallery", languages: { "de-DE": "/gallery", "en-US": "/en/gallery", "it-IT": "/it/gallery", "x-default": "/gallery" } },
}
