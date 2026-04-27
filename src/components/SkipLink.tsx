"use client"
import { useLanguage } from "@/context/LanguageContext"

export default function SkipLink() {
  const { lang } = useLanguage()
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-terracotta text-white rounded-lg font-medium text-sm"
    >
      {lang === "de" ? "Zum Inhalt springen" : lang === "it" ? "Vai al contenuto" : "Skip to content"}
    </a>
  )
}
