"use client"
import { signIn, useSession } from "next-auth/react"
import { useState } from "react"
import { Eye, EyeOff, ArrowRight, Loader2, ChevronRight } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

const ALLOWED_EMAIL = "maranotrattoria@gmail.com"

export default function AdminLoginPage() {
  const { data: session, status } = useSession()
  const { lang } = useLanguage()
  const de = lang === "de"

  const [step, setStep]       = useState<"password" | "google">("password")
  const [secret, setSecret]   = useState("")
  const [show, setShow]       = useState(false)
  const [error, setError]     = useState("")
  const [loading, setLoading] = useState(false)

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = await fetch("/api/admin/verify-secret", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ secret }),
    })
    setLoading(false)
    if (res.ok) {
      // Skip the intermediate step — go straight to Google
      signIn("google", { callbackUrl: "/admin/dashboard" })
    } else {
      setError(de ? "Falsches Passwort." : "Wrong password.")
      setSecret("")
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f7f5f0" }}>
        <Loader2 size={22} className="animate-spin" style={{ color: "#6b1535" }} />
      </div>
    )
  }

  if (status === "authenticated" && session?.user?.email !== ALLOWED_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#f7f5f0" }}>
        <div style={{ width: "100%", maxWidth: 380, background: "#fffefb", borderRadius: 14, padding: "2.5rem", textAlign: "center", boxShadow: "0 4px 32px rgba(107,21,53,0.10), 0 1px 4px rgba(107,21,53,0.06)", border: "1px solid rgba(197,192,177,0.6)" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(185,28,28,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <span style={{ fontSize: 20 }}>⛔</span>
          </div>
          <p className="text-sm font-semibold mb-1" style={{ color: "#b91c1c" }}>{de ? "Zugriff verweigert" : "Access denied"}</p>
          <p className="text-xs mb-5" style={{ color: "#939084" }}>{session.user?.email}</p>
          <button
            onClick={() => signIn("google")}
            className="w-full text-sm font-semibold py-2.5 rounded-lg transition-opacity hover:opacity-90 active:scale-[0.98]"
            style={{ background: "#6b1535", color: "#fffefb", transition: "opacity 160ms, transform 100ms" }}
          >
            {de ? "Anderes Konto verwenden" : "Use a different account"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107,21,53,0.06) 0%, #f7f5f0 60%)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>

        {/* Wordmark */}
        <div className="text-center mb-8">
          <p className="font-heading font-semibold text-xl" style={{ color: "#201515", letterSpacing: "-0.02em" }}>
            Trattoria Marano
          </p>
          <p className="text-xs mt-0.5 font-semibold uppercase tracking-widest" style={{ color: "#6b1535" }}>
            Admin
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "#fffefb",
          borderRadius: 14,
          border: "1px solid rgba(197,192,177,0.7)",
          boxShadow: "0 8px 40px rgba(107,21,53,0.09), 0 2px 8px rgba(107,21,53,0.05)",
          overflow: "hidden",
        }}>
          {/* Step indicator strip */}
          <div style={{ height: 3, background: "#e8e5dc", position: "relative" }}>
            <div style={{
              position: "absolute", top: 0, left: 0, height: "100%",
              width: step === "password" ? "50%" : "100%",
              background: "#6b1535",
              transition: "width 400ms cubic-bezier(0.4,0,0.2,1)",
            }} />
          </div>

          <div style={{ padding: "2rem" }}>
            {/* Step label */}
            <div className="flex items-center gap-2 mb-6">
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2].map(n => (
                  <div key={n} style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: (n === 1 && step === "password") || (n === 2 && step === "google") ? "#6b1535" : n < (step === "google" ? 2 : 1) ? "#6b1535" : "#e8e5dc",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700,
                    color: (n === 1 && step === "password") || (n === 2 && step === "google") || (n === 1 && step === "google") ? "#fffefb" : "#939084",
                    transition: "background 300ms",
                  }}>
                    {n === 1 && step === "google" ? "✓" : n}
                  </div>
                ))}
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#939084" }}>
                {step === "password"
                  ? (de ? "Schritt 1 von 2" : "Step 1 of 2")
                  : (de ? "Schritt 2 von 2" : "Step 2 of 2")}
              </span>
            </div>

            {step === "password" ? (
              <form onSubmit={handlePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#939084" }}>
                    {de ? "Passwort" : "Password"}
                  </label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      value={secret}
                      onChange={e => setSecret(e.target.value)}
                      placeholder="••••••••••"
                      required
                      autoFocus
                      style={{
                        width: "100%", fontSize: "0.875rem",
                        padding: "0.75rem 2.5rem 0.75rem 1rem",
                        borderRadius: 8,
                        background: "#f7f5f0",
                        border: error ? "1px solid #b91c1c" : "1px solid #c5c0b1",
                        color: "#201515", outline: "none",
                        transition: "border-color 160ms, box-shadow 160ms",
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = "#6b1535"
                        e.target.style.boxShadow = "0 0 0 3px rgba(107,21,53,0.08)"
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = error ? "#b91c1c" : "#c5c0b1"
                        e.target.style.boxShadow = "none"
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShow(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: "#939084" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#6b1535")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#939084")}
                    >
                      {show ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {error && (
                    <p className="text-xs mt-2 flex items-center gap-1.5" style={{ color: "#b91c1c" }}>
                      <span>⚠</span> {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !secret}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "0.75rem", borderRadius: 8, fontSize: "0.875rem", fontWeight: 600,
                    background: loading || !secret ? "#c5c0b1" : "#6b1535",
                    color: "#fffefb", border: "none",
                    cursor: loading || !secret ? "not-allowed" : "pointer",
                    transition: "background 200ms, transform 100ms",
                  }}
                  onMouseEnter={e => { if (!loading && secret) (e.currentTarget as HTMLButtonElement).style.background = "#5a1129" }}
                  onMouseLeave={e => { if (!loading && secret) (e.currentTarget as HTMLButtonElement).style.background = "#6b1535" }}
                  onMouseDown={e => { if (!loading && secret) (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)" }}
                  onMouseUp={e => (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"}
                >
                  {loading
                    ? <Loader2 size={15} className="animate-spin" />
                    : <>{de ? "Weiter" : "Continue"}<ChevronRight size={15} /></>}
                </button>
              </form>
            ) : (
              <div className="space-y-3">
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.625rem 0.875rem", borderRadius: 8, background: "rgba(107,21,53,0.06)", border: "1px solid rgba(107,21,53,0.12)" }}>
                  <span style={{ color: "#6b1535", fontSize: 14 }}>✓</span>
                  <span className="text-xs font-semibold" style={{ color: "#6b1535" }}>
                    {de ? "Passwort bestätigt" : "Password confirmed"}
                  </span>
                </div>

                <button
                  onClick={() => signIn("google", { callbackUrl: "/admin/dashboard" })}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    padding: "0.75rem", borderRadius: 8, fontSize: "0.875rem", fontWeight: 600,
                    background: "#fff", border: "1px solid #c5c0b1", color: "#201515", cursor: "pointer",
                    transition: "border-color 160ms, box-shadow 160ms, transform 100ms",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#6b1535"
                    ;(e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 3px rgba(107,21,53,0.08)"
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#c5c0b1"
                    ;(e.currentTarget as HTMLButtonElement).style.boxShadow = "none"
                  }}
                  onMouseDown={e => (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"}
                  onMouseUp={e => (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"}
                >
                  <svg width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                  </svg>
                  {de ? "Mit Google anmelden" : "Sign in with Google"}
                </button>

                <button
                  onClick={() => { setStep("password"); setSecret("") }}
                  style={{ width: "100%", padding: "0.5rem", fontSize: "0.75rem", color: "#939084", background: "transparent", border: "none", cursor: "pointer", transition: "color 160ms" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#36342e")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#939084")}
                >
                  {de ? "← Zurück" : "← Back"}
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: "#c5c0b1" }}>
          Trattoria Marano · Admin Access
        </p>
      </div>
    </div>
  )
}
