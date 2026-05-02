import type { Metadata } from "next"
export { default } from "@/app/datenschutz/page"

export const metadata: Metadata = {
  title: "Privacy Policy - Trattoria Marano Munich",
  description: "Privacy policy of Trattoria Marano in accordance with GDPR.",
  robots: { index: true, follow: false },
  alternates: { canonical: "/en/datenschutz", languages: { "de-DE": "/datenschutz", "en-US": "/en/datenschutz", "it-IT": "/it/datenschutz", "x-default": "/datenschutz" } },
}
