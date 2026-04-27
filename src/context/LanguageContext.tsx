"use client"
import { createContext, useContext, useEffect, useState } from "react"

type Lang = "de" | "en" | "it"
export type { Lang }
type LangCtx = { lang: Lang; toggle: () => void; setLang: (l: Lang) => void }

const LanguageContext = createContext<LangCtx>({ lang: "de", toggle: () => {}, setLang: () => {} })

const LS_KEY = "tm_lang"
const ORDER: Lang[] = ["de", "en", "it"]

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de")

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY)
    if (saved === "en" || saved === "de" || saved === "it") setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    localStorage.setItem(LS_KEY, l)
    setLangState(l)
  }

  const toggle = () => setLangState(l => {
    const next = ORDER[(ORDER.indexOf(l) + 1) % ORDER.length]
    localStorage.setItem(LS_KEY, next)
    return next
  })

  return <LanguageContext.Provider value={{ lang, toggle, setLang }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
