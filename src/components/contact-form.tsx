"use client"

import { useState } from "react"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

const LEADS_API = "https://klienti.webzatyzden.sk/api/leads/submit"
const API_KEY = process.env.NEXT_PUBLIC_LEAD_API_KEY || ""

interface FormData { name: string; email: string; phone: string; message: string }
interface FieldError { name?: string; email?: string; message?: string }

function validate(f: FormData): FieldError {
  const e: FieldError = {}
  if (!f.name.trim()) e.name = "Meno je povinné"
  if (!f.email.trim()) e.email = "E-mail je povinný"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Zadajte platný e-mail"
  if (!f.message.trim()) e.message = "Správa je povinná"
  return e
}

export default function ContactForm({ sourceForm = "contact-form" }: { sourceForm?: string }) {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", message: "" })
  const [errors, setErrors] = useState<FieldError>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const update = (field: keyof FormData, value: string) => {
    setForm(p => ({ ...p, [field]: value }))
    if (touched[field]) setErrors(p => ({ ...p, [field]: validate({ ...form, [field]: value })[field as keyof FieldError] }))
  }

  const blur = (field: keyof FormData) => {
    setTouched(p => ({ ...p, [field]: true }))
    setErrors(p => ({ ...p, [field]: validate(form)[field as keyof FieldError] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    setTouched({ name: true, email: true, phone: true, message: true })
    if (Object.keys(errs).length > 0) return
    setSubmitting(true)
    setApiError(null)
    try {
      const res = await fetch(LEADS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: API_KEY,
          name: form.name, email: form.email,
          phone: form.phone || undefined,
          message: form.message || undefined,
          sourcePage: typeof window !== "undefined" ? window.location.pathname : "/",
          sourceForm,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Odoslanie zlyhalo")
      }
      setSuccess(true)
      setForm({ name: "", email: "", phone: "", message: "" })
      setTouched({})
      setErrors({})
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Niečo sa pokazilo. Skúste prosím znova.")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="font-heading font-bold text-2xl text-neutral-900 mb-2">Ďakujem!</h3>
        <p className="text-neutral-500 max-w-sm">Ozvem sa vám do 24 hodín.</p>
        <button onClick={() => setSuccess(false)} className="mt-5 text-primary-600 hover:underline text-sm font-medium">
          Poslať ďalšiu správu
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {apiError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <AlertCircle size={16} className="shrink-0 mt-0.5" /> {apiError}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Meno a priezvisko" id="name" type="text" value={form.name} onChange={v => update("name", v)} onBlur={() => blur("name")} error={touched.name ? errors.name : undefined} placeholder="Jana Nováková" required />
        <Field label="E-mail" id="email" type="email" value={form.email} onChange={v => update("email", v)} onBlur={() => blur("email")} error={touched.email ? errors.email : undefined} placeholder="jana@example.sk" required />
      </div>
      <Field label="Telefónne číslo" id="phone" type="tel" value={form.phone} onChange={v => update("phone", v)} placeholder="+421 900 000 000" hint="Nepovinné" />
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Správa <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={e => update("message", e.target.value)}
          onBlur={() => blur("message")}
          rows={4}
          placeholder="Napíšte mi o čom by ste sa chceli porozprávať..."
          className={`w-full px-4 py-3 rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 resize-none transition-all outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${errors.message && touched.message ? "border-red-400 bg-red-50/30" : "border-neutral-300 bg-white hover:border-neutral-400"}`}
        />
        {errors.message && touched.message && (
          <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm hover:shadow-warm"
      >
        {submitting ? (
          <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Odosiela sa...</>
        ) : (
          <><Send size={16} /> Odoslať správu</>
        )}
      </button>
      <p className="text-center text-xs text-neutral-400">
        Odoslaním súhlasíte so spracovaním osobných údajov.
      </p>
    </form>
  )
}

function Field({ label, id, type, value, onChange, onBlur, error, placeholder, hint, required }: {
  label: string; id: string; type: string; value: string;
  onChange: (v: string) => void; onBlur?: () => void;
  error?: string; placeholder?: string; hint?: string; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id} type={type} value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 transition-all outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${error ? "border-red-400 bg-red-50/30" : "border-neutral-300 bg-white hover:border-neutral-400"}`}
      />
      {error && <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1"><AlertCircle size={12} /> {error}</p>}
      {hint && !error && <p className="mt-1.5 text-xs text-neutral-400">{hint}</p>}
    </div>
  )
}
