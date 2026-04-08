import type { Metadata } from "next"
import { Playfair_Display, Lato } from "next/font/google"
import { LanguageProvider } from "@/context/LanguageContext"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CookieConsent from "@/components/cookie-consent"
import "./globals.css"

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "700"],
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "Trattoria Marano — Ohlmüllerstr. 22, München",
    template: "%s | Trattoria Marano München",
  },
  description: "Authentische italienische Küche im Herzen von München. Pizza, Pasta, Antipasti. Dienstag–Sonntag geöffnet.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Trattoria Marano",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${lato.variable} ${playfair.variable}`}>
      <body className="font-sans bg-cream text-ink antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-terracotta text-white rounded-lg font-medium text-sm">
          Zum Inhalt springen
        </a>
        <LanguageProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
}
