import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Events & Catering - Trattoria Marano München",
  description: "Catering für Events bis 400 Personen. Pizza aus dem mobilen Holzofen, Antipasti-Buffets, Dessertstationen. Hochzeit, Firmenfeier, Geburtstag.",
  alternates: { canonical: "/events", languages: { "de-DE": "/events", "en-US": "/en/events", "it-IT": "/it/events", "x-default": "/events" } },
  openGraph: {
    title: "Events & Catering - Trattoria Marano München",
    description: "Catering für Events bis 400 Personen mit mobilem Holzofen.",
    url: "/events",
  },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children
}
