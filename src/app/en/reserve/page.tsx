import type { Metadata } from "next"
export { default } from "@/app/reserve/page"

export const metadata: Metadata = {
  title: "Book a Table - Trattoria Marano Munich",
  description: "Reserve a table online at Trattoria Marano in Munich. Quick, easy, just a few clicks - confirmation by email.",
  alternates: { canonical: "/en/reserve", languages: { "de-DE": "/reserve", "en-US": "/en/reserve", "it-IT": "/it/reserve", "x-default": "/reserve" } },
}
