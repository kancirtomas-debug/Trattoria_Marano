"use client"

import { useState, useEffect } from "react"
import { X, Cookie } from "lucide-react"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(t)
    }
  }, [])

  const save = (analytics: boolean) => {
    localStorage.setItem("cookie-consent", JSON.stringify({ essential: true, analytics }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 animate-fade-in-up">
      <div className="bg-neutral-900 text-white rounded-2xl shadow-soft-xl border border-neutral-700 p-5">
        <div className="flex items-start gap-3 mb-4">
          <Cookie size={18} className="text-primary-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-sm mb-1">Používame cookies</p>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Používame cookies na zlepšenie vášho zážitku a analýzu návštevnosti.
            </p>
          </div>
          <button
            onClick={() => save(false)}
            className="text-neutral-500 hover:text-neutral-300 transition-colors shrink-0"
            aria-label="Odmietnuť"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => save(false)}
            className="flex-1 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded-lg transition-all"
          >
            Odmietnuť
          </button>
          <button
            onClick={() => save(true)}
            className="flex-1 px-3 py-2 text-xs font-semibold bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all"
          >
            Prijať všetky
          </button>
        </div>
      </div>
    </div>
  )
}
