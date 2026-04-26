"use client"
import { usePathname } from "next/navigation"
import Header from "./header"
import Footer from "./footer"
import CookieConsent from "./cookie-consent"
import MobileLayout from "./MobileLayout"

const IS_MOBILE = process.env.NEXT_PUBLIC_MOBILE === "true"

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  // Mobile build (port 3001) - hand off entirely to MobileLayout
  if (IS_MOBILE) return <MobileLayout>{children}</MobileLayout>

  // Desktop build (port 3000)
  return (
    <>
      {!isAdmin && <Header />}
      <main id="main-content">{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <CookieConsent />}
    </>
  )
}
