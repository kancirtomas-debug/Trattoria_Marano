import type { Metadata } from "next"
import { headers } from "next/headers"
import { Inter, Outfit } from "next/font/google"
import { LanguageProvider } from "@/context/LanguageContext"
import ConditionalLayout from "@/components/ConditionalLayout"
import SkipLink from "@/components/SkipLink"
import { fetchPlaceData } from "@/lib/google-reviews"
import "./globals.css"

type Locale = "de" | "en" | "it"
const HTML_LANG: Record<Locale, string> = { de: "de-DE", en: "en-US", it: "it-IT" }

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
  alternates: {
    canonical: "/",
    languages: {
      "de-DE": "/",
      "en-US": "/en",
      "it-IT": "/it",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Trattoria Marano",
    url: "https://www.trattoria-marano.de",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 675,
        alt: "Trattoria Marano - italienische Trattoria in München",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trattoria Marano München",
    description: "Authentische italienische Küche im Herzen von München.",
    images: ["/images/hero.jpg"],
  },
}

const restaurantSchemaBase = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://www.trattoria-marano.de/#restaurant",
  name: "Trattoria Marano",
  alternateName: "Trattoria Marano München",
  description: "Authentische italienische Küche im Herzen von München. Neapolitanische Pizza aus dem Steinofen, hausgemachte Pasta, klassische Antipasti.",
  image: [
    "https://www.trattoria-marano.de/images/hero.webp",
    "https://www.trattoria-marano.de/images/hero.jpg",
  ],
  logo: "https://www.trattoria-marano.de/images/trattoria-logo-full.png",
  url: "https://www.trattoria-marano.de",
  telephone: "+49 89 20928123",
  email: "maranotrattoria@gmail.com",
  priceRange: "€€",
  servesCuisine: ["Italian", "Neapolitan", "Pizza"],
  paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
  currenciesAccepted: "EUR",
  smokingAllowed: false,
  areaServed: { "@type": "City", name: "München" },
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
  hasMap: "https://maps.google.com/?q=Ohlm%C3%BCller+Str.+22+81541+M%C3%BCnchen",
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
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.trattoria-marano.de/reserve",
      inLanguage: ["de-DE", "en-US", "it-IT"],
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: { "@type": "FoodEstablishmentReservation", name: "Reservation" },
  },
  sameAs: [
    "https://maps.google.com/?cid=7054837083427866703",
    "https://www.lieferando.de/en/menu/trattoriamarano",
    "https://wolt.com/de/deu/munich/restaurant/trattoria-marano",
  ],
}

type RestaurantSchema = typeof restaurantSchemaBase & {
  aggregateRating?: {
    "@type": "AggregateRating"
    ratingValue: number
    reviewCount: number
    bestRating: 5
    worstRating: 1
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (headers().get("x-locale") as Locale) || "de"
  const place = await fetchPlaceData()
  const restaurantSchema: RestaurantSchema = { ...restaurantSchemaBase }
  if (place) {
    restaurantSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: place.rating,
      reviewCount: place.userRatingsTotal,
      bestRating: 5,
      worstRating: 1,
    }
  }
  return (
    <html lang={HTML_LANG[locale]} className={`${inter.variable} ${outfit.variable}`}>
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
