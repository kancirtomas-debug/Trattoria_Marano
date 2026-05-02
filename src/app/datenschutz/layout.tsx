import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutz - Trattoria Marano München",
  description: "Datenschutzerklärung der Trattoria Marano gemäß DSGVO.",
  alternates: { canonical: "/datenschutz", languages: { "de-DE": "/datenschutz", "en-US": "/en/datenschutz", "it-IT": "/it/datenschutz", "x-default": "/datenschutz" } },
  robots: { index: true, follow: false },
}

export default function DatenschutzLayout({ children }: { children: React.ReactNode }) {
  return children
}
