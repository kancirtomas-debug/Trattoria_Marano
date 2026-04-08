"use client"
import { createContext, useContext, useState } from "react"

type Lang = "de" | "en"
export type { Lang }
type LangCtx = { lang: Lang; toggle: () => void }

const LanguageContext = createContext<LangCtx>({ lang: "de", toggle: () => {} })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("de")
  const toggle = () => setLang(l => (l === "de" ? "en" : "de"))
  return <LanguageContext.Provider value={{ lang, toggle }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
