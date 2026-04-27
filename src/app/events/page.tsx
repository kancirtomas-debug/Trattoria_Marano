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
      setError(lang === "de" ? "Senden fehlgeschlagen. Bitte später erneut versuchen." : lang === "it" ? "Invio non riuscito. Riprovate più tardi." : "Sending failed. Please try again later.")
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
          {lang === "de" ? "In unserem Haus" : lang === "it" ? "Nella nostra casa" : "Inside our house"}
        </p>
        <h2 className="np-h2" style={{ textAlign: "center", marginBottom: 18 }}>
          {lang === "de" ? "Intime Feiern" : lang === "it" ? "Feste intime" : "Intimate Celebrations"}
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
            <p className="np-kicker">{lang === "de" ? "Die Eckdaten" : lang === "it" ? "In sintesi" : "At a glance"}</p>
            <dl style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px dotted #c5c0b1" }}>
                <dt style={{ color: "#36342e" }}>{lang === "de" ? "Kapazität" : lang === "it" ? "Capienza" : "Capacity"}</dt>
                <dd style={{ margin: 0, color: "#201515", fontWeight: 700 }}>{lang === "de" ? "bis 400 Gäste" : lang === "it" ? "fino a 400 ospiti" : "up to 400 guests"}</dd>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px dotted #c5c0b1" }}>
                <dt style={{ color: "#36342e" }}>{lang === "de" ? "Menüs ab" : lang === "it" ? "Menù da" : "Menus from"}</dt>
                <dd style={{ margin: 0, color: "#201515", fontWeight: 700 }}>35 €</dd>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px dotted #c5c0b1" }}>
                <dt style={{ color: "#36342e" }}>{lang === "de" ? "Mobiler Holzofen" : lang === "it" ? "Forno mobile a legna" : "Mobile oven"}</dt>
                <dd style={{ margin: 0, color: "#201515", fontWeight: 700 }}>{lang === "de" ? "inklusive" : lang === "it" ? "incluso" : "included"}</dd>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
                <dt style={{ color: "#36342e" }}>{lang === "de" ? "Antwortzeit" : lang === "it" ? "Tempo di risposta" : "Response"}</dt>
                <dd style={{ margin: 0, color: "#201515", fontWeight: 700 }}>{lang === "de" ? "24 Std." : lang === "it" ? "24 ore" : "24 hrs"}</dd>
              </div>
            </dl>
          </aside>
        </div>

        {/* Pull quote between directory and form */}
        <blockquote className="np-pullquote">
          {lang === "de"
            ? "„Ein gutes Fest beginnt nicht mit der Gästeliste, sondern mit dem ersten Bissen.\""
            : lang === "it"
            ? "«Una buona festa non inizia con la lista degli ospiti - inizia con il primo boccone.»"
            : "\"A good feast does not begin with the guest list - it begins with the first bite.\""}
        </blockquote>

        {/* Catering form */}
        <div className="np-grid-even-2" style={{ marginBottom: 12 }}>
          <div>
            <p className="np-kicker">{lang === "de" ? "Anfragen" : lang === "it" ? "Richiedi" : "Inquire"}</p>
            <h2 className="np-h2">{t.events_page.form_title[lang]}</h2>
            <p className="np-body">{t.events_page.form_sub[lang]}</p>

            <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, fontFamily: "Georgia, serif" }}>
                <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b1535", fontWeight: 700, minWidth: 80 }}>
                  {lang === "de" ? "Telefon" : lang === "it" ? "Telefono" : "Phone"}
                </span>
                <a href="tel:+4989209281230" style={{ color: "#201515", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>089 / 209 28 123</a>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, fontFamily: "Georgia, serif" }}>
                <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b1535", fontWeight: 700, minWidth: 80 }}>
                  {lang === "de" ? "E-Mail" : lang === "it" ? "E-mail" : "Email"}
                </span>
                <a href="mailto:maranotrattoria@gmail.com" style={{ color: "#201515", fontSize: 14, fontWeight: 700, textDecoration: "none", wordBreak: "break-all" }}>maranotrattoria@gmail.com</a>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, fontFamily: "Georgia, serif" }}>
                <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b1535", fontWeight: 700, minWidth: 80 }}>
                  {lang === "de" ? "Antwort" : lang === "it" ? "Risposta" : "Response"}
                </span>
                <span style={{ color: "#36342e", fontSize: 14 }}>{lang === "de" ? "Innerhalb von 24 Stunden" : lang === "it" ? "Entro 24 ore" : "Within 24 hours"}</span>
              </div>
            </div>

            <p className="np-body" style={{ marginTop: 22, fontStyle: "italic", color: "#939084", fontSize: 12.5 }}>
              {lang === "de"
                ? "Planen Sie mindestens vier Wochen im Voraus, damit wir das Menü mit Ihnen feinabstimmen können."
                : lang === "it"
                ? "Pianificate almeno quattro settimane in anticipo, così possiamo perfezionare il menù con voi."
                : "Please plan at least four weeks ahead so we can fine-tune the menu with you."}
            </p>

            {/* Restaurant photo - menu-style inspect */}
            <div
              onClick={() => setLightboxOpen(true)}
              role="button"
              tabIndex={0}
              aria-label={lang === "de" ? "Bild vergrößern" : lang === "it" ? "Ingrandisci immagine" : "Enlarge image"}
              onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setLightboxOpen(true) }}
              className="np-event-photo"
              style={{
                marginTop: 32,
                position: "relative",
                width: "100%",
                maxWidth: 468,
                aspectRatio: "4 / 3",
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid rgba(107,21,53,0.08)",
                cursor: "zoom-in",
                transition: "box-shadow 300ms ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 36px rgba(32,21,21,0.18)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none"
              }}
            >
              <Image
                src="/images/events-catering.webp"
                alt={lang === "de" ? "Catering Veranstaltung" : lang === "it" ? "Evento di catering" : "Catering event"}
                fill
                sizes="(max-width: 768px) 100vw, 468px"
                style={{ objectFit: "cover", transition: "transform 600ms cubic-bezier(0.16,1,0.3,1)" }}
                className="np-event-photo-img"
              />
            </div>
          </div>
          <div className="np-col-rule" />
          <div className="np-box" style={{ padding: 20 }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p className="np-label-red" style={{ marginBottom: 8 }}>✦ {lang === "de" ? "Gesendet" : lang === "it" ? "Inviato" : "Sent"} ✦</p>
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
                    {lang === "de" ? "Hinweis zur Bestätigung" : lang === "it" ? "Nota di conferma" : "Confirmation note"}
                  </p>
                  <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 13, lineHeight: 1.55, color: "#36342e" }}>
                    {lang === "de"
                      ? "Sobald Ihr Event bestätigt und terminiert ist, erhalten Sie 3 Stunden vor dem Termin eine Erinnerung per E-Mail mit Bestätigungs-Button. Bitte bestätigen Sie Ihren Termin über den Button in dieser E-Mail."
                      : lang === "it"
                      ? "Una volta confermato e fissato il vostro evento, riceverete un promemoria via e-mail 3 ore prima dell'appuntamento con un pulsante di conferma. Vi preghiamo di confermare la prenotazione tramite il pulsante in quell'e-mail."
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
                      {lang === "de" ? "Welche Art von Event?" : lang === "it" ? "Che tipo di evento?" : "What kind of event?"}
                    </label>
                    <input
                      id="cf-type-custom"
                      required
                      autoFocus
                      style={npInput}
                      value={customType}
                      onChange={e => setCustomType(e.target.value)}
                      placeholder={lang === "de" ? "z. B. Taufe, Jubiläum, Abschlussfeier…" : lang === "it" ? "es. battesimo, anniversario, festa di laurea…" : "e.g. christening, anniversary, graduation…"}
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="cf-location" style={npLabel}>{t.events_page.f_location[lang]}</label>
                  <input id="cf-location" style={npInput} value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                </div>
                <div>
                  <label htmlFor="cf-allergies" style={npLabel}>
                    {lang === "de" ? "Allergien / Unverträglichkeiten / Diät" : lang === "it" ? "Allergie / Intolleranze / Dieta" : "Allergies / Intolerances / Diet"}
                  </label>
                  <textarea
                    id="cf-allergies"
                    rows={3}
                    style={{ ...npInput, borderBottom: "1px solid #201515", border: "1px solid #201515", padding: 8, resize: "vertical", fontFamily: "Georgia, serif" }}
                    value={form.allergies}
                    onChange={e => setForm(f => ({ ...f, allergies: e.target.value }))}
                    placeholder={lang === "de"
                      ? "z. B. Gluten, Laktose, Nüsse, vegetarisch, vegan…"
                      : lang === "it"
                      ? "es. glutine, lattosio, frutta secca, vegetariano, vegano…"
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
                  {submitting ? (lang === "de" ? "Wird gesendet…" : lang === "it" ? "Invio in corso…" : "Sending…") : t.events_page.f_submit[lang]}
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
          onClick={() => setLightboxOpen(false)}
          onKeyDown={e => { if (e.key === "Escape") setLightboxOpen(false) }}
          tabIndex={-1}
          ref={el => { if (el) el.focus() }}
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "rgba(32,21,21,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1.5rem", cursor: "zoom-out",
            backdropFilter: "blur(4px)",
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ position: "relative", maxWidth: 1200, width: "100%", cursor: "default" }}>
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label={lang === "de" ? "Schließen" : lang === "it" ? "Chiudi" : "Close"}
              style={{
                position: "absolute", top: -14, right: -14, zIndex: 10,
                width: 32, height: 32, borderRadius: "50%",
                background: "#201515", border: "1px solid #3d2a2a",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#fffefb",
              }}
            >
              ✕
            </button>
            <div style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/events-catering.webp"
                alt={lang === "de" ? "Catering Veranstaltung" : lang === "it" ? "Evento di catering" : "Catering event"}
                style={{ width: "100%", height: "auto", display: "block", maxHeight: "92vh", objectFit: "contain" }}
              />
            </div>
            <p style={{ textAlign: "center", marginTop: 14, fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.99rem", color: "rgba(255,254,251,0.7)" }}>
              {lang === "de" ? "Catering Veranstaltung" : lang === "it" ? "Evento di catering" : "Catering Event"}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
