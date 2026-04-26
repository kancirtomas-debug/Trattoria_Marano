"use client"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

export default function DatenschutzPage() {
  const { lang } = useLanguage()
  const de = lang === "de"

  return (
    <div className="np-page">
      <div className="np-wrap">

        <div className="np-masthead">
          <div className="np-dateline">
            <span>{t.newspaper.dateline_l[lang]}</span>
            <span>{t.newspaper.dateline_m[lang]}</span>
            <span>{t.newspaper.dateline_r[lang]}</span>
          </div>
          <div className="np-title-wrap">
            <h1 className="np-title-section">{de ? "Datenschutz" : "Privacy Policy"}</h1>
          </div>
        </div>

        <div className="np-rule-single" />

        <p className="np-lead np-dropcap" style={{ maxWidth: 820, margin: "14px auto 20px" }}>
          {de
            ? "Wir haben unsere Website so datenschutzfreundlich wie möglich gestaltet. Außer der für den störungsfreien Betrieb unerlässlichen Speicherung von Daten in Server-Logfiles erheben wir keine Nutzerdaten. Für Reservierungen und Catering-Anfragen verarbeiten wir ausschließlich die Daten, die Sie uns über unsere Formulare mitteilen."
            : "We have designed our website to be as privacy-friendly as possible. Apart from data stored in server log files that is indispensable for trouble-free operation, we do not collect any user data. For reservations and catering inquiries, we only process the data you submit via our forms."}
        </p>

        <div className="np-rule-thin" />

        <div style={{ maxWidth: 820, margin: "0 auto", fontFamily: "Georgia, serif", color: "#36342e", lineHeight: 1.7 }}>

          <h2 className="np-h3" style={{ marginTop: 24 }}>{de ? "§1 Verantwortliche Stelle" : "§1 Data Controller"}</h2>
          <p className="np-body">
            {de
              ? "Verantwortlicher gemäß Art. 4 Abs. 7 Datenschutz-Grundverordnung (DSGVO) ist:"
              : "Controller pursuant to Art. 4 (7) of the General Data Protection Regulation (GDPR):"}
          </p>
          <p className="np-body" style={{ fontStyle: "normal" }}>
            Trattoria Marano<br />
            Ohlmüllerstr. 22<br />
            81541 München<br />
            {de ? "Tel." : "Phone"} <a href="tel:+4989209281230">089 / 209 28 123</a><br />
            E-Mail: <a href="mailto:maranotrattoria@gmail.com">maranotrattoria@gmail.com</a>
          </p>

          <h2 className="np-h3" style={{ marginTop: 24 }}>{de ? "§2 Ihre Rechte" : "§2 Your Rights"}</h2>
          <p className="np-body">
            {de
              ? "Sie haben uns gegenüber die folgenden gesetzlichen Rechte bezüglich Ihrer personenbezogenen Daten:"
              : "You have the following statutory rights with regard to your personal data:"}
          </p>
          <ul className="np-body" style={{ paddingLeft: 20, margin: "0 0 12px" }}>
            <li>{de ? "Auskunft nach Art. 15 DSGVO" : "Right of access (Art. 15 GDPR)"}</li>
            <li>{de ? "Berichtigung oder Löschung nach Art. 16 und 17 DSGVO" : "Rectification or erasure (Art. 16 & 17 GDPR)"}</li>
            <li>{de ? "Einschränkung der Verarbeitung nach Art. 18 DSGVO" : "Restriction of processing (Art. 18 GDPR)"}</li>
            <li>{de ? "Unterrichtung nach Art. 19 DSGVO" : "Notification (Art. 19 GDPR)"}</li>
            <li>{de ? "Widerspruch gegen die Verarbeitung nach Art. 21 DSGVO" : "Objection (Art. 21 GDPR)"}</li>
            <li>{de ? "Datenübertragbarkeit nach Art. 20 DSGVO" : "Data portability (Art. 20 GDPR)"}</li>
          </ul>
          <p className="np-body">
            {de
              ? "Sie können zudem Beschwerde bei der zuständigen Datenschutz-Aufsichtsbehörde einlegen:"
              : "You may also lodge a complaint with the responsible data protection authority:"}
          </p>
          <p className="np-body" style={{ fontStyle: "normal" }}>
            Bayerisches Landesamt für Datenschutzaufsicht<br />
            Promenade 27, 91522 Ansbach<br />
            {de ? "Telefon:" : "Phone:"} 0981 531300<br />
            E-Mail: <a href="mailto:poststelle@lda.bayern.de">poststelle@lda.bayern.de</a><br />
            <a href="https://www.lda.bayern.de/" target="_blank" rel="noopener noreferrer">www.lda.bayern.de</a>
          </p>

          <h2 className="np-h3" style={{ marginTop: 24 }}>{de ? "§3 Daten beim Besuch der Website" : "§3 Data Collected on Visit"}</h2>
          <p className="np-body">
            {de
              ? "Beim Aufruf der Website werden gemäß Art. 6 Abs. 1 lit. f) DSGVO technisch notwendige Daten in Server-Logfiles gespeichert. Erhoben werden:"
              : "When you visit the website, technically required data is stored in server log files pursuant to Art. 6 (1) (f) GDPR. The following data is collected:"}
          </p>
          <ul className="np-body" style={{ paddingLeft: 20, margin: "0 0 12px" }}>
            <li>{de ? "Browsertyp und -version" : "Browser type and version"}</li>
            <li>{de ? "Verwendetes Betriebssystem" : "Operating system"}</li>
            <li>{de ? "IP-Adresse des zugreifenden Rechners" : "IP address of the requesting device"}</li>
            <li>{de ? "Uhrzeit der Serveranfrage" : "Time of the server request"}</li>
            <li>{de ? "Referrer-URL (zuvor besuchte Seite)" : "Referrer URL"}</li>
            <li>{de ? "Angeforderte Webseite oder Datei" : "Requested page or file"}</li>
          </ul>
          <p className="np-body">
            {de
              ? "Die IP-Adresse dient der Bekämpfung von Missbrauch und der Gewährleistung der Funktionsfähigkeit unseres Angebots. Sie wird spätestens nach acht Tagen gelöscht, sofern kein Angriff auf unsere Infrastruktur erkennbar war."
              : "The IP address helps combat abuse and keeps the service operational. It is deleted after no more than eight days unless an attack on our infrastructure is detected."}
          </p>

          <h2 className="np-h3" style={{ marginTop: 24 }}>{de ? "§4 Reservierungen und Catering-Anfragen" : "§4 Reservations & Catering Inquiries"}</h2>
          <p className="np-body">
            {de
              ? "Wenn Sie über unsere Online-Formulare einen Tisch reservieren oder ein Event anfragen, verarbeiten wir Ihre Angaben (Name, Telefonnummer, E-Mail-Adresse, Datum, Uhrzeit, Personenzahl sowie optionale Angaben zu Allergien, Unverträglichkeiten oder Wünschen) ausschließlich zur Abwicklung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b) DSGVO (vorvertragliche Maßnahmen)."
              : "When you book a table or request an event via our online forms, we process your details (name, phone number, email address, date, time, number of guests and optional information such as allergies, intolerances or requests) solely for handling your inquiry. The legal basis is Art. 6 (1) (b) GDPR (pre-contractual measures)."}
          </p>
          <p className="np-body">
            {de
              ? "Die Daten werden nicht an Dritte weitergegeben und nach Erfüllung des Zwecks gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen."
              : "Data will not be shared with third parties and is deleted once the purpose has been fulfilled, unless legal retention obligations apply."}
          </p>

          <h2 className="np-h3" style={{ marginTop: 24 }}>{de ? "§5 Impressum" : "§5 Imprint"}</h2>
          <p className="np-body" style={{ fontStyle: "normal" }}>
            Trattoria Marano<br />
            Ohlmüllerstr. 22, 81541 München<br />
            {de ? "Tel." : "Phone"} 089 / 209 28 123<br />
            E-Mail: maranotrattoria@gmail.com
          </p>
        </div>

        <div className="np-footer-rule">
          <p className="np-footer-text">{t.newspaper.footer_rule[lang]}</p>
        </div>
      </div>
    </div>
  )
}
