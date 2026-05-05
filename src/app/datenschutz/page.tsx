"use client"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd"

type Lang = "de" | "en" | "it"

const COPY = {
  title:        { de: "Datenschutz", en: "Privacy Policy", it: "Informativa sulla privacy" },
  intro: {
    de: "Wir haben unsere Website so datenschutzfreundlich wie möglich gestaltet. Außer der für den störungsfreien Betrieb unerlässlichen Speicherung von Daten in Server-Logfiles erheben wir keine Nutzerdaten. Für Reservierungen und Catering-Anfragen verarbeiten wir ausschließlich die Daten, die Sie uns über unsere Formulare mitteilen.",
    en: "We have designed our website to be as privacy-friendly as possible. Apart from data stored in server log files that is indispensable for trouble-free operation, we do not collect any user data. For reservations and catering inquiries, we only process the data you submit via our forms.",
    it: "Abbiamo progettato il nostro sito per rispettare la vostra privacy il più possibile. A parte i dati conservati nei file di log del server, indispensabili per il regolare funzionamento, non raccogliamo alcun dato dell'utente. Per le prenotazioni e le richieste di catering, trattiamo esclusivamente i dati che ci inviate tramite i nostri moduli.",
  },
  s1_title:     { de: "Verantwortliche Stelle", en: "Data Controller", it: "Titolare del trattamento" },
  s1_lead: {
    de: "Verantwortlicher gemäß Art. 4 Abs. 7 Datenschutz-Grundverordnung (DSGVO):",
    en: "Controller pursuant to Art. 4 (7) of the General Data Protection Regulation (GDPR):",
    it: "Titolare ai sensi dell'art. 4, par. 7 del Regolamento Generale sulla Protezione dei Dati (GDPR):",
  },
  phone_label:  { de: "Tel.", en: "Phone", it: "Tel." },
  s2_title:     { de: "Ihre Rechte", en: "Your Rights", it: "I vostri diritti" },
  s2_lead: {
    de: "Sie haben uns gegenüber folgende gesetzlichen Rechte bezüglich Ihrer personenbezogenen Daten:",
    en: "You have the following statutory rights regarding your personal data:",
    it: "Avete i seguenti diritti previsti dalla legge in merito ai vostri dati personali:",
  },
  s2_rights: {
    de: ["Auskunft (Art. 15 DSGVO)", "Berichtigung oder Löschung (Art. 16 & 17 DSGVO)", "Einschränkung der Verarbeitung (Art. 18 DSGVO)", "Unterrichtung (Art. 19 DSGVO)", "Widerspruch (Art. 21 DSGVO)", "Datenübertragbarkeit (Art. 20 DSGVO)"],
    en: ["Right of access (Art. 15 GDPR)", "Rectification or erasure (Art. 16 & 17 GDPR)", "Restriction of processing (Art. 18 GDPR)", "Notification (Art. 19 GDPR)", "Objection (Art. 21 GDPR)", "Data portability (Art. 20 GDPR)"],
    it: ["Accesso (art. 15 GDPR)", "Rettifica o cancellazione (artt. 16 e 17 GDPR)", "Limitazione del trattamento (art. 18 GDPR)", "Notifica (art. 19 GDPR)", "Opposizione (art. 21 GDPR)", "Portabilità dei dati (art. 20 GDPR)"],
  },
  s2_authority_lead: {
    de: "Sie können zudem Beschwerde bei der zuständigen Aufsichtsbehörde einlegen:",
    en: "You may also lodge a complaint with the responsible data protection authority:",
    it: "Potete inoltre presentare reclamo all'autorità di controllo competente:",
  },
  s3_title:     { de: "Daten beim Besuch der Website", en: "Data Collected on Visit", it: "Dati raccolti durante la visita" },
  s3_lead: {
    de: "Beim Aufruf der Website werden gemäß Art. 6 Abs. 1 lit. f) DSGVO technisch notwendige Daten in Server-Logfiles gespeichert. Erhoben werden:",
    en: "When you visit the website, technically required data is stored in server log files pursuant to Art. 6 (1) (f) GDPR. The following data is collected:",
    it: "Durante la visita al sito, i dati tecnicamente necessari vengono memorizzati nei file di log del server ai sensi dell'art. 6, par. 1, lett. f) GDPR. Vengono raccolti:",
  },
  s3_items: {
    de: ["Browsertyp und -version", "Verwendetes Betriebssystem", "IP-Adresse des zugreifenden Rechners", "Uhrzeit der Serveranfrage", "Referrer-URL (zuvor besuchte Seite)", "Angeforderte Webseite oder Datei"],
    en: ["Browser type and version", "Operating system", "IP address of the requesting device", "Time of the server request", "Referrer URL", "Requested page or file"],
    it: ["Tipo e versione del browser", "Sistema operativo utilizzato", "Indirizzo IP del dispositivo richiedente", "Ora della richiesta al server", "URL di provenienza (referrer)", "Pagina o file richiesto"],
  },
  s3_retention: {
    de: "Die IP-Adresse dient der Bekämpfung von Missbrauch und der Gewährleistung der Funktionsfähigkeit unseres Angebots. Sie wird spätestens nach acht Tagen gelöscht, sofern kein Angriff auf unsere Infrastruktur erkennbar war.",
    en: "The IP address helps combat abuse and keeps the service operational. It is deleted after no more than eight days unless an attack on our infrastructure is detected.",
    it: "L'indirizzo IP serve a contrastare gli abusi e a garantire il funzionamento del servizio. Viene cancellato al più tardi dopo otto giorni, salvo che non venga rilevato un attacco alla nostra infrastruttura.",
  },
  s4_title:     { de: "Reservierungen und Catering-Anfragen", en: "Reservations & Catering Inquiries", it: "Prenotazioni e richieste di catering" },
  s4_p1: {
    de: "Wenn Sie über unsere Online-Formulare einen Tisch reservieren oder ein Event anfragen, verarbeiten wir Ihre Angaben (Name, Telefonnummer, E-Mail-Adresse, Datum, Uhrzeit, Personenzahl sowie optionale Angaben zu Allergien, Unverträglichkeiten oder Wünschen) ausschließlich zur Abwicklung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b) DSGVO (vorvertragliche Maßnahmen).",
    en: "When you book a table or request an event via our online forms, we process your details (name, phone number, email address, date, time, number of guests and optional information such as allergies, intolerances or requests) solely for handling your inquiry. The legal basis is Art. 6 (1) (b) GDPR (pre-contractual measures).",
    it: "Quando prenotate un tavolo o richiedete un evento tramite i nostri moduli online, trattiamo i vostri dati (nome, numero di telefono, e-mail, data, ora, numero di ospiti e informazioni facoltative quali allergie, intolleranze o richieste particolari) esclusivamente per gestire la vostra richiesta. La base giuridica è l'art. 6, par. 1, lett. b) GDPR (misure precontrattuali).",
  },
  s4_p2: {
    de: "Die Daten werden nicht an Dritte weitergegeben und nach Erfüllung des Zwecks gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.",
    en: "Data will not be shared with third parties and is deleted once the purpose has been fulfilled, unless legal retention obligations apply.",
    it: "I dati non vengono condivisi con terzi e vengono cancellati una volta esaurito lo scopo, salvo obblighi di conservazione previsti dalla legge.",
  },
  s5_title:     { de: "Impressum", en: "Imprint", it: "Note legali" },
  jump:         { de: "Zum Inhalt", en: "Skip to section", it: "Vai alla sezione" },
} as const

const sectionStyle: React.CSSProperties = { marginTop: 28 }

function Address({ lines }: { lines: React.ReactNode[] }) {
  return (
    <div style={{ display: "grid", rowGap: 4, fontFamily: "Georgia, serif", fontSize: 14, lineHeight: 1.55, color: "#6b1535", margin: "0 0 10px" }}>
      {lines.map((l, i) => <span key={i}>{l}</span>)}
    </div>
  )
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div style={{ ...sectionStyle, marginBottom: 10 }}>
      <h2 className="np-h2" style={{ fontSize: 18, margin: 0, letterSpacing: 0 }}>{title}</h2>
      <div style={{ height: 1, background: "#e5e0d5", margin: "10px 0 0" }} />
    </div>
  )
}

export default function DatenschutzPage() {
  const { lang } = useLanguage() as { lang: Lang }
  const c = (k: keyof typeof COPY) => (COPY[k] as Record<Lang, string>)[lang] ?? (COPY[k] as Record<Lang, string>).en

  return (
    <div className="np-page">
      <BreadcrumbJsonLd items={[{ name: COPY.title[lang], path: "/datenschutz" }]} />
      <div className="np-wrap">

        <div className="np-masthead">
          <div className="np-dateline">
            <span>{t.newspaper.dateline_l[lang]}</span>
            <span>{t.newspaper.dateline_m[lang]}</span>
            <span>{t.newspaper.dateline_r[lang]}</span>
          </div>
          <div className="np-title-wrap">
            <h1 className="np-title-section">{COPY.title[lang]}</h1>
          </div>
        </div>

        <div className="np-rule-single" />

        <p className="np-lead np-dropcap" style={{ maxWidth: 760, margin: "16px auto 22px" }}>
          {COPY.intro[lang]}
        </p>

        <div className="np-rule-thin" />

        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          <SectionHeading title={COPY.s1_title[lang]} />
          <p className="np-body">{c("s1_lead")}</p>
          <Address lines={[
            "Trattoria Marano",
            "Ohlmüllerstr. 22",
            "81541 München",
            <><span>{COPY.phone_label[lang]} </span><a className="np-link-strong" href="tel:+4989209281230">089 / 209 28 123</a></>,
            <><span>E-Mail: </span><a className="np-link-strong" href="mailto:maranotrattoria@gmail.com">maranotrattoria@gmail.com</a></>,
          ]} />

          <SectionHeading title={COPY.s2_title[lang]} />
          <p className="np-body">{c("s2_lead")}</p>
          <ul className="np-body" style={{ paddingLeft: 18, margin: "0 0 14px" }}>
            {(COPY.s2_rights[lang]).map(r => <li key={r} style={{ marginBottom: 2 }}>{r}</li>)}
          </ul>
          <p className="np-body">{c("s2_authority_lead")}</p>
          <Address lines={[
            "Bayerisches Landesamt für Datenschutzaufsicht",
            "Promenade 27, 91522 Ansbach",
            <><span>{COPY.phone_label[lang]} </span><a className="np-link-strong" href="tel:+49981531300">0981 531300</a></>,
            <><span>E-Mail: </span><a className="np-link-strong" href="mailto:poststelle@lda.bayern.de">poststelle@lda.bayern.de</a></>,
            <a className="np-link-strong" href="https://www.lda.bayern.de/" target="_blank" rel="noopener noreferrer">www.lda.bayern.de</a>,
          ]} />

          <SectionHeading title={COPY.s3_title[lang]} />
          <p className="np-body">{c("s3_lead")}</p>
          <ul className="np-body" style={{ paddingLeft: 18, margin: "0 0 14px" }}>
            {(COPY.s3_items[lang]).map(i => <li key={i} style={{ marginBottom: 2 }}>{i}</li>)}
          </ul>
          <p className="np-body">{c("s3_retention")}</p>

          <SectionHeading title={COPY.s4_title[lang]} />
          <p className="np-body">{c("s4_p1")}</p>
          <p className="np-body">{c("s4_p2")}</p>

          <SectionHeading title={COPY.s5_title[lang]} />
          <Address lines={[
            "Trattoria Marano",
            "Ohlmüllerstr. 22, 81541 München",
            <><span>{COPY.phone_label[lang]} </span><a className="np-link-strong" href="tel:+4989209281230">089 / 209 28 123</a></>,
            <><span>E-Mail: </span><a className="np-link-strong" href="mailto:maranotrattoria@gmail.com">maranotrattoria@gmail.com</a></>,
          ]} />
        </div>

        <div className="np-footer-rule">
          <p className="np-footer-text">{t.newspaper.footer_rule[lang]}</p>
        </div>
      </div>
    </div>
  )
}
