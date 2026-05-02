import type { Metadata } from "next"
export { default } from "@/app/datenschutz/page"

export const metadata: Metadata = {
  title: "Privacy - Trattoria Marano Monaco",
  description: "Informativa sulla privacy della Trattoria Marano in conformità con il GDPR.",
  robots: { index: true, follow: false },
  alternates: { canonical: "/it/datenschutz", languages: { "de-DE": "/datenschutz", "en-US": "/en/datenschutz", "it-IT": "/it/datenschutz", "x-default": "/datenschutz" } },
}
