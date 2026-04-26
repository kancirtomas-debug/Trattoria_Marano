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
  title: {
    default: "Trattoria Marano - Ohlmüllerstr. 22, München",
    template: "%s | Trattoria Marano München",
  },
  description: "Authentische italienische Küche im Herzen von München. Pizza, Pasta, Antipasti. Dienstag-Sonntag geöffnet.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Trattoria Marano",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans bg-cream text-ink antialiased">
        <LanguageProvider>
          <SkipLink />
          <ConditionalLayout>{children}</ConditionalLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}
