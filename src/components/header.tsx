"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

const navLinks = [
  { href: "/",        key: "home"    },
  { href: "/menu",    key: "menu"    },
  { href: "/gallery", key: "gallery" },
  { href: "/about",   key: "about"   },
  { href: "/events",  key: "events"  },
  { href: "/contact", key: "contact" },
] as const

export default function Header() {
  const { lang, toggle } = useLanguage()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-warmgray-200">
      <div className="container-wide flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-heading text-xl md:text-2xl font-semibold text-ink tracking-wide">Trattoria Marano</span>
          <span className="text-[11px] tracking-[0.22em] uppercase text-terracotta font-sans">München · Dal 1856</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium link-grow transition-colors ${
                pathname === href ? "text-terracotta" : "text-ink-light hover:text-ink"
              }`}
            >
              {t.nav[key][lang]}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs font-medium px-2.5 py-1 rounded-pill border border-warmgray-300 hover:border-terracotta hover:text-terracotta transition-colors"
            aria-label="Toggle language"
          >
            {lang === "de" ? "EN" : "DE"}
          </button>
          <Link
            href="/contact#reservation"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-pill bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark transition-colors"
          >
            {t.nav.reserve[lang]}
          </Link>
          <button className="md:hidden p-2" onClick={() => setOpen(o => !o)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-warmgray-200 bg-cream px-5 py-4 flex flex-col gap-4">
          {navLinks.map(({ href, key }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={`text-base font-medium ${pathname === href ? "text-terracotta" : "text-ink"}`}>
              {t.nav[key][lang]}
            </Link>
          ))}
          <Link href="/contact#reservation" onClick={() => setOpen(false)}
            className="mt-2 inline-flex justify-center px-4 py-3 rounded-pill bg-terracotta text-white text-sm font-medium">
            {t.nav.reserve[lang]}
          </Link>
        </nav>
      )}
    </header>
  )
}
