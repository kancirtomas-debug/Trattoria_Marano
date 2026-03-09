import type { Metadata } from "next"
import { Nunito, Playfair_Display } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CookieConsent from "@/components/cookie-consent"
import "./globals.css"

const sans = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: {
    default: "Olinka Kancirova – Ľúbiť ma je ľahké",
    template: "%s | Olinka Kancirova",
  },
  description: "Homeopatia, psychosomatika a komunikácia. Sprevádzam ľudí ich liečivým procesom s láskou a pokorou. Viac ako 4000 spokojných klientov.",
  openGraph: {
    type: "website",
    locale: "sk_SK",
    siteName: "Olinka Kancirova",
    images: ["https://www.olinkakancirova.sk/wp-content/uploads/2024/04/Doma-82-scaled.webp"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className={`${sans.variable} ${heading.variable}`}>
      <body className="font-sans bg-white text-neutral-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm"
        >
          Preskočiť na obsah
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
