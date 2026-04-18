"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

const navLinks = [
  { href: "/",        key: "home"    },
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
    <header
      className="sticky top-0 z-40 backdrop-blur-sm"
      style={{ background: "rgba(255,254,251,0.95)", borderBottom: "1px solid #c5c0b1" }}
    >
      <div className="container-wide flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span
            className="font-heading text-xl md:text-2xl font-semibold"
            style={{ color: "#201515", letterSpacing: "-0.02em" }}
          >
            Trattoria Marano
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "#6b1535" }}
          >
            München · Autentica Cucina
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-2 text-sm font-medium rounded transition-colors"
              style={{
                color: pathname === href ? "#6b1535" : "#36342e",
                background: pathname === href ? "rgba(107,21,53,0.06)" : "transparent",
              }}
            >
              {t.nav[key][lang]}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="text-xs font-semibold px-2.5 py-1 rounded transition-colors"
            style={{ border: "1px solid #c5c0b1", color: "#36342e", background: "transparent" }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = "#6b1535"
              ;(e.currentTarget as HTMLButtonElement).style.color = "#6b1535"
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = "#c5c0b1"
              ;(e.currentTarget as HTMLButtonElement).style.color = "#36342e"
            }}
            aria-label="Toggle language"
          >
            {lang === "de" ? "EN" : "DE"}
          </button>
          <Link
            href="/reserve"
            className="hidden md:inline-flex btn-orange"
          >
            {t.nav.reserve[lang]}
          </Link>
          <button
            className="md:hidden p-2 rounded"
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            style={{ color: "#201515" }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          className="md:hidden px-5 py-4 flex flex-col gap-1"
          style={{ borderTop: "1px solid #c5c0b1", background: "#fffefb" }}
        >
          {navLinks.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-medium rounded px-3 transition-colors"
              style={{ color: pathname === href ? "#6b1535" : "#201515" }}
            >
              {t.nav[key][lang]}
            </Link>
          ))}
          <Link
            href="/reserve"
            onClick={() => setOpen(false)}
            className="mt-3 btn-orange justify-center"
          >
            {t.nav.reserve[lang]}
          </Link>
        </nav>
      )}
    </header>
  )
}
