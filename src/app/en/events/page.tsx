import type { Metadata } from "next"
export { default } from "@/app/events/page"

export const metadata: Metadata = {
  title: "Events & Catering - Trattoria Marano Munich",
  description: "Catering for events up to 400 guests. Pizza from a mobile wood-fired oven, antipasti buffets, dessert stations. Wedding, company party, birthday.",
  alternates: { canonical: "/en/events", languages: { "de-DE": "/events", "en-US": "/en/events", "it-IT": "/it/events", "x-default": "/events" } },
}
