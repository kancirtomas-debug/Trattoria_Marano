"use client"
import { useEffect, useState, useCallback } from "react"

export type AdminLang = "de" | "en"

const STORAGE_KEY = "admin-lang"

export function useAdminLang() {
  const [lang, setLangState] = useState<AdminLang>("de")

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
    if (stored === "de" || stored === "en") setLangState(stored)
  }, [])

  const setLang = useCallback((l: AdminLang) => {
    setLangState(l)
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, l)
  }, [])

  const toggle = useCallback(() => {
    setLangState(prev => {
      const next: AdminLang = prev === "de" ? "en" : "de"
      if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  return { lang, toggle, setLang }
}
