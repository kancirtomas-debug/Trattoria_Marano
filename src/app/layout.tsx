import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import { LanguageProvider } from "@/context/LanguageContext"
import ConditionalLayout from "@/components/ConditionalLayout"
import SkipLink from "@/components/SkipLink"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.trattoria-marano.de"),
  title: {
    default: "Trattoria Marano - Ohlmüllerstr. 22, München",
    template: "%s | Trattoria Marano München",
  },
  description: "Authentische italienische Küche im Herzen von München. Pizza, Pasta, Antipasti. Dienstag-Sonntag geöffnet.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Trattoria Marano",
    url: "https://www.trattoria-marano.de",
    images: ["/images/hero.webp"],
  },
  twitter: { card: "summary_large_image", images: ["/images/hero.webp"] },
  verification: {
    google: "_NSaEjLw4RtutUYhf-_0DGJIavr8YHw-T0CU920Ndsw",
  },
}

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Trattoria Marano",
  image: "https://www.trattoria-marano.de/images/hero.webp",
  url: "https://www.trattoria-marano.de",
  telephone: "+498920928123",
  email: "maranotrattoria@gmail.com",
  priceRange: "€€",
  servesCuisine: ["Italian", "Neapolitan", "Pizza"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ohlmüllerstraße 22",
    addressLocality: "München",
    postalCode: "81541",
    addressRegion: "BY",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.1227,
    longitude: 11.5878,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:30",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "17:30",
      closes: "22:30",
    },
  ],
  acceptsReservations: "https://www.trattoria-marano.de/reserve",
  hasMenu: "https://www.trattoria-marano.de/#menu",
  sameAs: [
    "https://www.lieferando.de/en/menu/trattoriamarano",
    "https://wolt.com/de/deu/munich/restaurant/trattoria-marano",
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans bg-cream text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        <LanguageProvider>
          <SkipLink />
          <ConditionalLayout>{children}</ConditionalLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}
