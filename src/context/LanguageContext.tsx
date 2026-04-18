"use client"
import { createContext, useContext, useEffect, useState } from "react"

type Lang = "de" | "en"
export type { Lang }
type LangCtx = { lang: Lang; toggle: () => void }

const LanguageContext = createContext<LangCtx>({ lang: "de", toggle: () => {} })

const LS_KEY = "tm_lang"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("de")

  // Read persisted preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY)
    if (saved === "en" || saved === "de") setLang(saved)
  }, [])

  const toggle = () => setLang(l => {
    const next: Lang = l === "de" ? "en" : "de"
    localStorage.setItem(LS_KEY, next)
    return next
  })

  return <LanguageContext.Provider value={{ lang, toggle }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
