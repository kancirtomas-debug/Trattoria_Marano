import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Über uns - Trattoria Marano München",
  description: "Authentische neapolitanische Pizza, hausgemachte Pasta, klassische Antipasti. Saquella-Kaffee, Dinkel- und vegane Optionen. Mitten in München.",
  alternates: { canonical: "/about", languages: { "de-DE": "/about", "en-US": "/en/about", "it-IT": "/it/about", "x-default": "/about" } },
  openGraph: {
    title: "Über uns - Trattoria Marano München",
    description: "Authentische neapolitanische Pizza, hausgemachte Pasta, klassische Antipasti.",
    url: "/about",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
