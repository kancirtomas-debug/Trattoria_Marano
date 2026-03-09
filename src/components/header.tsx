"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/#o-mne",    label: "O mne" },
  { href: "/kurzy",     label: "Kurzy" },
  { href: "/e-booky",   label: "E-booky" },
  { href: "/kalendar",  label: "Kalendár" },
  { href: "/recenzie",  label: "Recenzie" },
  { href: "/blog",      label: "Blog" },
  { href: "/kontakt",   label: "Kontakt" },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-sm shadow-soft border-b border-neutral-100" : "bg-white/80 backdrop-blur-sm"
    }`}>
      <div className="container-wide">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-tight">
            <span className="font-heading font-bold text-xl text-neutral-900 group-hover:text-primary-600 transition-colors">
              Olinka Kancirova
            </span>
            <span className="text-xs text-primary-500 italic font-sans tracking-wide">
              Ľúbiť ma je ľahké
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Hlavná navigácia">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-150"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+421907926904"
              className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
            >
              +421 907 926 904
            </a>
            <Link
              href="/kontakt"
              className="px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-all active:scale-[0.98] shadow-sm hover:shadow-warm"
            >
              Objednať sa
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
            aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-neutral-100 shadow-soft-lg">
          <div className="container-wide py-4 space-y-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-neutral-100">
              <Link
                href="/kontakt"
                onClick={() => setOpen(false)}
                className="block w-full text-center px-5 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all"
              >
                Objednať sa
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
