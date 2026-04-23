"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Phone, CalendarDays, UtensilsCrossed, MapPin } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"
import CookieConsent from "./cookie-consent"
import { useEffect } from "react"

const navLinks = [
  { href: "/",        key: "home"    },
  { href: "/menu",    key: "menu"    },
  { href: "/gallery", key: "gallery" },
  { href: "/about",   key: "about"   },
  { href: "/events",  key: "events"  },
  { href: "/contact", key: "contact" },
] as const

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const { lang, toggle } = useLanguage()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isAdmin = pathname.startsWith("/admin")

  // Tag <body> so CSS overrides activate
  useEffect(() => {
    document.body.setAttribute("data-mobile", "true")
    return () => document.body.removeAttribute("data-mobile")
  }, [])

  if (isAdmin) return <main>{children}</main>

  return (
    <>
      {/* ── Mobile header ───────────────────────────────────── */}
      <header
        className="sticky top-0 z-40"
        style={{ background: "rgba(255,254,251,0.97)", borderBottom: "1px solid #c5c0b1" }}
      >
        <div className="flex items-center justify-between px-4 h-14">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
            <span className="font-heading text-lg font-semibold" style={{ color: "#201515", letterSpacing: "-0.02em" }}>
              Trattoria Marano
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: "#6b1535" }}>
              München · Autentica Cucina
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggle}
              className="text-xs font-semibold px-2 py-1 rounded"
              style={{ border: "1px solid #c5c0b1", color: "#36342e" }}
            >
              {lang === "de" ? "EN" : "DE"}
            </button>
            {/* Hamburger */}
            <button
              onClick={() => setOpen(o => !o)}
              className="p-2 rounded"
              aria-label="Menu"
              style={{ color: "#201515" }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Slide-down nav */}
        {open && (
          <nav
            className="px-4 pb-5 flex flex-col gap-1"
            style={{ borderTop: "1px solid #c5c0b1", background: "#fffefb" }}
          >
            {navLinks.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-3 px-3 text-base font-medium rounded"
                style={{
                  color: pathname === href ? "#6b1535" : "#201515",
                  background: pathname === href ? "rgba(107,21,53,0.06)" : "transparent",
                }}
              >
                {t.nav[key][lang]}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* ── Page content ────────────────────────────────────── */}
      {/* Bottom padding so content isn't hidden behind the fixed bar */}
      <main id="main-content" style={{ paddingBottom: 80 }}>
        {children}

        {/* Legal footer strip */}
        <div
          style={{
            borderTop: "1px solid #c5c0b1",
            padding: "18px 16px 24px",
            background: "#fffefb",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            textAlign: "center",
          }}
        >
          <Link
            href="/datenschutz"
            style={{ fontSize: 13, fontWeight: 600, color: "#6b1535" }}
          >
            {lang === "de" ? "Datenschutz & Impressum" : "Privacy & Imprint"}
          </Link>
          <span style={{ fontSize: 11, color: "rgba(32,21,21,0.5)" }}>
            © {new Date().getFullYear()} Trattoria Marano München
          </span>
        </div>
      </main>

      {/* ── Fixed bottom action bar ──────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex"
        style={{
          background: "#fffefb",
          borderTop: "1px solid #c5c0b1",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <a
          href="tel:+498920928123"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3"
          style={{ color: "#36342e", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em" }}
        >
          <Phone size={20} style={{ color: "#6b1535" }} />
          {lang === "de" ? "ANRUFEN" : "CALL"}
        </a>

        <Link
          href="/#menu"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3"
          style={{
            color: "#fffefb",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.04em",
            background: "#6b1535",
          }}
        >
          <UtensilsCrossed size={20} />
          {lang === "de" ? "SPEISEKARTE" : "MENU"}
        </Link>

        <Link
          href="/contact#reservation"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3"
          style={{ color: "#36342e", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em" }}
        >
          <CalendarDays size={20} style={{ color: "#6b1535" }} />
          {lang === "de" ? "RESERVIEREN" : "RESERVE"}
        </Link>

        <a
          href="https://maps.google.com/?q=Ohlmüllerstr.+22,+81541+München"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3"
          style={{ color: "#36342e", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em" }}
        >
          <MapPin size={20} style={{ color: "#6b1535" }} />
          {lang === "de" ? "ROUTE" : "ROUTE"}
        </a>
      </div>

      <CookieConsent />
    </>
  )
}
