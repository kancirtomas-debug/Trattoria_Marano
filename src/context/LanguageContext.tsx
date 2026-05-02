"use client"
import { createContext, useContext, useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"

type Lang = "de" | "en" | "it"
export type { Lang }
type LangCtx = { lang: Lang; toggle: () => void; setLang: (l: Lang) => void }

const LanguageContext = createContext<LangCtx>({ lang: "de", toggle: () => {}, setLang: () => {} })

const ORDER: Lang[] = ["de", "en", "it"]

export function localeFromPath(pathname: string): Lang {
  if (pathname.startsWith("/en/") || pathname === "/en") return "en"
  if (pathname.startsWith("/it/") || pathname === "/it") return "it"
  return "de"
}

export function stripLocale(pathname: string): string {
  if (pathname === "/en" || pathname === "/it") return "/"
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/"
  if (pathname.startsWith("/it/")) return pathname.slice(3) || "/"
  return pathname
}

export function withLocale(pathname: string, lang: Lang): string {
  const base = stripLocale(pathname)
  if (lang === "de") return base
  return base === "/" ? `/${lang}` : `/${lang}${base}`
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/"
  const router = useRouter()

  const lang = localeFromPath(pathname)

  const value = useMemo<LangCtx>(() => {
    const setLang = (l: Lang) => router.push(withLocale(pathname, l))
    const toggle = () => {
      const next = ORDER[(ORDER.indexOf(lang) + 1) % ORDER.length]
      router.push(withLocale(pathname, next))
    }
    return { lang, toggle, setLang }
  }, [lang, pathname, router])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
