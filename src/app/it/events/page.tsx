import type { Metadata } from "next"
export { default } from "@/app/events/page"

export const metadata: Metadata = {
  title: "Eventi & Catering - Trattoria Marano Monaco",
  description: "Catering per eventi fino a 400 ospiti. Pizza dal forno a legna mobile, buffet di antipasti, postazioni dolci. Matrimonio, festa aziendale, compleanno.",
  alternates: { canonical: "/it/events", languages: { "de-DE": "/events", "en-US": "/en/events", "it-IT": "/it/events", "x-default": "/events" } },
}
