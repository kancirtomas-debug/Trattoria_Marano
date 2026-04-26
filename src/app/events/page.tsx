"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

const npInput: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: 14,
  color: "#201515",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid #201515",
  padding: "8px 2px",
  width: "100%",
  outline: "none",
}
const npLabel: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: 10,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#6b1535",
  fontWeight: 700,
  display: "block",
  marginBottom: 4,
}

export default function EventsPage() {
  const { lang } = useLanguage()

  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", guests: "", type: "", location: "", message: "", allergies: "",
  })
  const [customType, setCustomType] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState("")
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const typeOptions = t.events_page.f_type_opt[lang] as readonly string[]
  const otherLabel  = typeOptions[typeOptions.length - 1]   // "Other" / "Anderes"
  const isOther     = form.type === otherLabel

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const typeToSend = isOther && customType.trim() ? customType.trim() : form.type
      const res = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: typeToSend, lang, honeypot }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setSubmitted(true)
    } catch (err) {
      setError(lang === "de" ? "Senden fehlgeschlagen. Bitte später erneut versuchen." : "Sending failed. Please try again later.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="np-page">
      <div className="np-wrap">

        {/* Masthead */}
        <div className="np-masthead">
          <div className="np-dateline">
            <span>{t.newspaper.dateline_l[lang]}</span>
            <span>{t.newspaper.dateline_m[lang]}</span>
            <span>{t.newspaper.dateline_r[lang]}</span>
          </div>
          <div className="np-title-wrap">
            <h1 className="np-title-section">{t.events.title[lang]}</h1>
          </div>
        </div>

        <div className="np-rule-single" />

        {/* Lead */}
        <p className="np-lead np-dropcap" style={{ maxWidth: 820, margin: "14px auto 20px" }}>{t.events_page.lead[lang]}</p>

        <div className="np-rule-thin" />

        {/* Section kicker - "In Unserem Haus" */}
        <p className="np-kicker" style={{ textAlign: "center", marginBottom: 4 }}>
          {lang === "de" ? "In unserem Haus" : "Inside our house"}
        </p>
        <h2 className="np-h2" style={{ textAlign: "center", marginBottom: 18 }}>
          {lang === "de" ? "Intime Feiern" : "Intimate Celebrations"}
        </h2>

        {/* Row 1 - three intimate-event columns (Birthday / Corporate / Private) */}
        <div className="np-grid-3" style={{ marginBottom: 32 }}>
          <div>
            <p className="np-kicker">I. · {t.events_page.cap_small[lang]}</p>
            <h3 className="np-h3" style={{ marginBottom: 8 }}>{t.events_page.birthday_title[lang]}</h3>
            <p className="np-body">{t.events_page.birthday_body[lang]}</p>
          </div>
          <div className="np-col-rule" />
          <div>
            <p className="np-kicker">II. · {t.events_page.cap_medium[lang]}</p>
            <h3 className="np-h3" style={{ marginBottom: 8 }}>{t.events_page.company_title[lang]}</h3>
            <p className="np-body">{t.events_page.company_body[lang]}</p>
          </div>
          <div className="np-col-rule" />
          <div>
            <p className="np-kicker">III. · {t.events_page.cap_medium[lang]}</p>
            <h3 className="np-h3" style={{ marginBottom: 8 }}>{t.events_page.private_title[lang]}</h3>
            <p className="np-body">{t.events_page.private_body[lang]}</p>
          </div>
        </div>

        <div className="np-rule-thick" />

        {/* Row 2 - Catering feature (wide, emphasized, asymmetric) */}
        <div className="np-catering-asym" style={{ alignItems: "start", marginTop: 8, marginBottom: 36 }}>
          <div>
            <p className="np-kicker" style={{ color: "#6b1535" }}>IV. · {t.events_page.cap_large[lang]}</p>
            <h2 className="np-h1" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", margin: "0 0 10px", lineHeight: 1.02 }}>
              {t.events_page.catering_title[lang]}
            </h2>
            <p className="np-body" style={{ fontSize: 15, lineHeight: 1.6 }}>{t.events_page.catering_body[lang]}</p>
          </div>
          <div className="np-col-rule" />
          <aside style={{ fontFamily: "Georgia, serif" }}>
            <p className="np-kicker">{lang === "de" ? "Die Eckdaten" : "At a glance"}</p>
            <dl style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px dotted #c5c0b1" }}>
                <dt style={{ color: "#36342e" }}>{lang === "de" ? "Kapazität" : "Capacity"}</dt>
                <dd style={{ margin: 0, color: "#201515", fontWeight: 700 }}>{lang === "de" ? "bis 400 Gäste" : "up to 400 guests"}</dd>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px dotted #c5c0b1" }}>
                <dt style={{ color: "#36342e" }}>{lang === "de" ? "Menüs ab" : "Menus from"}</dt>
                <dd style={{ margin: 0, color: "#201515", fontWeight: 700 }}>35 €</dd>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px dotted #c5c0b1" }}>
                <dt style={{ color: "#36342e" }}>{lang === "de" ? "Mobiler Holzofen" : "Mobile oven"}</dt>
                <dd style={{ margin: 0, color: "#201515", fontWeight: 700 }}>{lang === "de" ? "inklusive" : "included"}</dd>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
                <dt style={{ color: "#36342e" }}>{lang === "de" ? "Antwortzeit" : "Response"}</dt>
                <dd style={{ margin: 0, color: "#201515", fontWeight: 700 }}>{lang === "de" ? "24 Std." : "24 hrs"}</dd>
              </div>
            </dl>
          </aside>
        </div>

        {/* Pull quote between directory and form */}
        <blockquote className="np-pullquote">
          {lang === "de"
            ? "„Ein gutes Fest beginnt nicht mit der Gästeliste, sondern mit dem ersten Bissen.\""
            : "\"A good feast does not begin with the guest list - it begins with the first bite.\""}
        </blockquote>

        {/* Catering form */}
        <div className="np-grid-even-2" style={{ marginBottom: 12 }}>
          <div>
            <p className="np-kicker">{lang === "de" ? "Anfragen" : "Inquire"}</p>
            <h2 className="np-h2">{t.events_page.form_title[lang]}</h2>
            <p className="np-body">{t.events_page.form_sub[lang]}</p>

            <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, fontFamily: "Georgia, serif" }}>
                <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b1535", fontWeight: 700, minWidth: 80 }}>
                  {lang === "de" ? "Telefon" : "Phone"}
                </span>
                <a href="tel:+4989209281230" style={{ color: "#201515", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>089 / 209 28 123</a>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, fontFamily: "Georgia, serif" }}>
                <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b1535", fontWeight: 700, minWidth: 80 }}>
                  {lang === "de" ? "E-Mail" : "Email"}
                </span>
                <a href="mailto:maranotrattoria@gmail.com" style={{ color: "#201515", fontSize: 14, fontWeight: 700, textDecoration: "none", wordBreak: "break-all" }}>maranotrattoria@gmail.com</a>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, fontFamily: "Georgia, serif" }}>
                <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b1535", fontWeight: 700, minWidth: 80 }}>
                  {lang === "de" ? "Antwort" : "Response"}
                </span>
                <span style={{ color: "#36342e", fontSize: 14 }}>{lang === "de" ? "Innerhalb von 24 Stunden" : "Within 24 hours"}</span>
              </div>
            </div>

            <p className="np-body" style={{ marginTop: 22, fontStyle: "italic", color: "#939084", fontSize: 12.5 }}>
              {lang === "de"
                ? "Planen Sie mindestens vier Wochen im Voraus, damit wir das Menü mit Ihnen feinabstimmen können."
                : "Please plan at least four weeks ahead so we can fine-tune the menu with you."}
            </p>

            {/* Restaurant photo - editorial frame */}
            <figure
              style={{
                marginTop: 32,
                width: "100%",
                maxWidth: 468,
                marginInline: 0,
              }}
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label={lang === "de" ? "Bild vergrößern" : "Enlarge image"}
                style={{
                  position: "relative",
                  aspectRatio: "4 / 3",
                  width: "100%",
                  padding: 12,
                  background: "#fdfaf3",
                  border: "1px solid #d8cfb8",
                  cursor: "zoom-in",
                  display: "block",
                  boxShadow:
                    "0 1px 0 rgba(32,21,21,0.06), 0 16px 36px -18px rgba(32,21,21,0.35)",
                  transition: "transform 200ms ease, box-shadow 200ms ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 1px 0 rgba(32,21,21,0.08), 0 22px 44px -18px rgba(32,21,21,0.45)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 1px 0 rgba(32,21,21,0.06), 0 16px 36px -18px rgba(32,21,21,0.35)"
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                  <Image
                    src="/images/events-interior.webp"
                    alt={lang === "de" ? "Trattoria Marano Innenraum" : "Trattoria Marano interior"}
                    fill
                    sizes="(max-width: 768px) 100vw, 468px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    right: 18, bottom: 18,
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "6px 10px",
                    background: "rgba(32,21,21,0.78)",
                    color: "#fdfaf3",
                    fontFamily: "Georgia, serif",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    borderRadius: 2,
                  }}
                >
                  ⤢ {lang === "de" ? "Ansehen" : "Inspect"}
                </span>
              </button>
              <figcaption
                style={{
                  marginTop: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: "Georgia, serif",
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#6b1535",
                  fontWeight: 700,
                }}
              >
                <span aria-hidden style={{ height: 1, width: 28, background: "#6b1535" }} />
                <span>{lang === "de" ? "Seit 1987 in München" : "In München since 1987"}</span>
              </figcaption>
            </figure>
          </div>
          <div className="np-col-rule" />
          <div className="np-box" style={{ padding: 20 }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p className="np-label-red" style={{ marginBottom: 8 }}>✦ {lang === "de" ? "Gesendet" : "Sent"} ✦</p>
                <p className="np-body" style={{ textAlign: "center" }}>{t.events_page.f_success[lang]}</p>
                <div
                  style={{
                    marginTop: 18, textAlign: "left",
                    background: "#fdf8f5",
                    border: "1px solid #e5e0d5",
                    borderLeft: "3px solid #6b1535",
                    padding: "14px 16px",
                  }}
                >
                  <p style={{ margin: "0 0 6px", fontFamily: "Georgia, serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b1535", fontWeight: 700 }}>
                    {lang === "de" ? "Hinweis zur Bestätigung" : "Confirmation note"}
                  </p>
                  <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 13, lineHeight: 1.55, color: "#36342e" }}>
                    {lang === "de"
                      ? "Sobald Ihr Event bestätigt und terminiert ist, erhalten Sie 3 Stunden vor dem Termin eine Erinnerung per E-Mail mit Bestätigungs-Button. Bitte bestätigen Sie Ihren Termin über den Button in dieser E-Mail."
                      : "Once your event is confirmed and scheduled, you will receive an email reminder 3 hours before the date with a confirmation button. Please confirm your booking via the button in that email."}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ display: "grid", gap: 14 }}>
                <div className="np-form-row">
                  <div>
                    <label htmlFor="cf-name" style={npLabel}>{t.events_page.f_name[lang]}</label>
                    <input id="cf-name" required style={npInput} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label htmlFor="cf-email" style={npLabel}>{t.events_page.f_email[lang]}</label>
                    <input id="cf-email" required type="email" style={npInput} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div className="np-form-row">
                  <div>
                    <label htmlFor="cf-phone" style={npLabel}>{t.events_page.f_phone[lang]}</label>
                    <input id="cf-phone" style={npInput} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <div>
                    <label htmlFor="cf-date" style={npLabel}>{t.events_page.f_date[lang]}</label>
                    <input id="cf-date" required type="date" style={npInput} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                  </div>
                </div>
                <div className="np-form-row">
                  <div>
                    <label htmlFor="cf-guests" style={npLabel}>{t.events_page.f_guests[lang]}</label>
                    <input id="cf-guests" required type="number" min={1} max={400} style={npInput} value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))} />
                  </div>
                  <div>
                    <label htmlFor="cf-type" style={npLabel}>{t.events_page.f_type[lang]}</label>
                    <select id="cf-type" style={{ ...npInput, paddingRight: 18 }} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                      <option value="">-</option>
                      {typeOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                {isOther && (
                  <div style={{ marginTop: -4, animation: "reveal-up 0.35s cubic-bezier(0.16,1,0.3,1) both" }}>
                    <label htmlFor="cf-type-custom" style={npLabel}>
                      {lang === "de" ? "Welche Art von Event?" : "What kind of event?"}
                    </label>
                    <input
                      id="cf-type-custom"
                      required
                      autoFocus
                      style={npInput}
                      value={customType}
                      onChange={e => setCustomType(e.target.value)}
                      placeholder={lang === "de" ? "z. B. Taufe, Jubiläum, Abschlussfeier…" : "e.g. christening, anniversary, graduation…"}
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="cf-location" style={npLabel}>{t.events_page.f_location[lang]}</label>
                  <input id="cf-location" style={npInput} value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                </div>
                <div>
                  <label htmlFor="cf-allergies" style={npLabel}>
                    {lang === "de" ? "Allergien / Unverträglichkeiten / Diät" : "Allergies / Intolerances / Diet"}
                  </label>
                  <textarea
                    id="cf-allergies"
                    rows={3}
                    style={{ ...npInput, borderBottom: "1px solid #201515", border: "1px solid #201515", padding: 8, resize: "vertical", fontFamily: "Georgia, serif" }}
                    value={form.allergies}
                    onChange={e => setForm(f => ({ ...f, allergies: e.target.value }))}
                    placeholder={lang === "de"
                      ? "z. B. Gluten, Laktose, Nüsse, vegetarisch, vegan…"
                      : "e.g. gluten, lactose, nuts, vegetarian, vegan…"}
                  />
                </div>
                <div>
                  <label htmlFor="cf-msg" style={npLabel}>{t.events_page.f_msg[lang]}</label>
                  <textarea id="cf-msg" rows={4} style={{ ...npInput, borderBottom: "1px solid #201515", border: "1px solid #201515", padding: 8, resize: "vertical", fontFamily: "Georgia, serif" }} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <input type="text" name="fax" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }} />
                {error && <p style={{ color: "#6b1535", fontSize: 12, fontFamily: "Georgia, serif" }}>{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 900,
                    padding: "14px 18px", marginTop: 4,
                    background: "#201515", color: "#f0ebe0",
                    border: "2px solid #201515",
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? (lang === "de" ? "Wird gesendet…" : "Sending…") : t.events_page.f_submit[lang]}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* CTA row */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", margin: "28px 0 16px" }}>
          <Link
            href="/contact"
            style={{
              fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 13,
              letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "12px 22px", background: "#201515", color: "#f0ebe0",
              border: "2px solid #201515",
            }}
          >
            {t.nav.contact[lang]}
          </Link>
        </div>

        <div className="np-footer-rule">
          <p className="np-footer-text">{t.newspaper.footer_rule[lang]}</p>
        </div>
      </div>

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lang === "de" ? "Bild vergrößert" : "Enlarged image"}
          onClick={() => setLightboxOpen(false)}
          onKeyDown={e => { if (e.key === "Escape") setLightboxOpen(false) }}
          tabIndex={-1}
          ref={el => { if (el) el.focus() }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(20,12,12,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "clamp(16px, 4vw, 48px)",
            cursor: "zoom-out",
            animation: "fadeIn 180ms ease",
          }}
        >
          <button
            type="button"
            onClick={e => { e.stopPropagation(); setLightboxOpen(false) }}
            aria-label={lang === "de" ? "Schließen" : "Close"}
            style={{
              position: "absolute", top: 20, right: 24,
              width: 40, height: 40,
              background: "transparent",
              border: "1px solid rgba(253,250,243,0.4)",
              color: "#fdfaf3",
              fontSize: 22, lineHeight: 1, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ×
          </button>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(100%, 1400px)",
              aspectRatio: "4 / 3",
              maxHeight: "90vh",
              cursor: "default",
            }}
          >
            <Image
              src="/images/events-interior.webp"
              alt={lang === "de" ? "Trattoria Marano Innenraum" : "Trattoria Marano interior"}
              fill
              sizes="100vw"
              quality={95}
              priority
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
