"use client"
import { useEffect, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

export default function CookieConsent() {
  const { lang } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setVisible(true)
  }, [])

  const accept = () => { localStorage.setItem("cookie-consent", "accepted"); setVisible(false) }
  const decline = () => { localStorage.setItem("cookie-consent", "declined"); setVisible(false) }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-xl mx-auto bg-charcoal text-cream rounded-2xl shadow-soft-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-warmgray-300 flex-1">{t.cookie.text[lang]}</p>
        <div className="flex gap-2 shrink-0">
          <button onClick={decline} className="px-3 py-1.5 text-sm text-warmgray-400 hover:text-cream transition-colors">
            {t.cookie.decline[lang]}
          </button>
          <button onClick={accept} className="px-4 py-1.5 text-sm bg-terracotta text-white rounded-pill hover:bg-terracotta-dark transition-colors">
            {t.cookie.accept[lang]}
          </button>
        </div>
      </div>
    </div>
  )
}
