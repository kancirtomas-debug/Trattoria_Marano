"use client"
import { useLanguage } from "@/context/LanguageContext"

const BASE = "https://www.trattoria-marano.de"

const FAQ = {
  de: {
    inLanguage: "de-DE",
    items: [
      ["Wann hat die Trattoria Marano geöffnet?", "Dienstag bis Sonntag, mittags 11:30 - 14:00 Uhr und abends 17:30 - 22:30 Uhr. Montag Ruhetag."],
      ["Wie kann ich einen Tisch reservieren?", `Reservierungen bequem online unter ${BASE}/reserve oder telefonisch unter 089 / 209 28 123.`],
      ["Wo befindet sich die Trattoria Marano in München?", "Ohlmüllerstraße 22, 81541 München. Tram 16/18 Haltestelle Reichenbachplatz oder U-Bahn U1/U2 Fraunhoferstraße. Parkplätze rund ums Haus."],
      ["Bietet ihr vegetarische oder vegane Gerichte an?", "Ja. Viele unserer Pizzen und Pasta sind vegetarisch, und auf Wunsch bereiten wir Pizzen mit veganem Belag zu."],
      ["Habt ihr glutenfreie oder Dinkel-Optionen?", "Auf Wunsch backen wir unsere Pizzen mit Dinkelmehl. Bitte sprecht uns bei der Reservierung oder Bestellung an."],
      ["Macht ihr Catering und Events?", `Ja. Für Events bis 400 Personen liefern wir Pizza aus dem mobilen Holzofen, Antipasti-Buffets und Dessertstationen. Anfragen über ${BASE}/events.`],
      ["Welche Zahlungsmittel akzeptiert ihr?", "Bar, EC-Karte und gängige Kreditkarten."],
      ["Liefert ihr nach Hause?", "Ja. Bestellungen über Lieferando und Wolt - Links auf der Startseite."],
    ],
  },
  en: {
    inLanguage: "en-US",
    items: [
      ["When is Trattoria Marano open?", "Tuesday to Sunday, lunch 11:30 - 14:00 and dinner 17:30 - 22:30. Closed on Mondays."],
      ["How can I book a table?", `Reserve online at ${BASE}/en/reserve or call +49 89 209 28 123.`],
      ["Where is Trattoria Marano in Munich?", "Ohlmüllerstraße 22, 81541 Munich. Tram 16/18 Reichenbachplatz or subway U1/U2 Fraunhoferstraße. Parking around the building."],
      ["Do you have vegetarian or vegan dishes?", "Yes. Many of our pizzas and pasta are vegetarian, and pizzas can be prepared with vegan toppings on request."],
      ["Do you offer gluten-free or spelt options?", "On request, we bake our pizzas with spelt flour. Please mention this when reserving or ordering."],
      ["Do you do catering and events?", `Yes. For events up to 400 guests we deliver pizza from a mobile wood-fired oven, antipasti buffets and dessert stations. Inquire at ${BASE}/en/events.`],
      ["What payment methods do you accept?", "Cash, debit card, and major credit cards."],
      ["Do you deliver?", "Yes. Order via Lieferando and Wolt - links on the homepage."],
    ],
  },
  it: {
    inLanguage: "it-IT",
    items: [
      ["Quando è aperta la Trattoria Marano?", "Da martedì a domenica, pranzo 11:30 - 14:00 e cena 17:30 - 22:30. Lunedì chiuso."],
      ["Come posso prenotare un tavolo?", `Prenota online su ${BASE}/it/reserve o chiama il +49 89 209 28 123.`],
      ["Dove si trova la Trattoria Marano a Monaco?", "Ohlmüllerstraße 22, 81541 Monaco di Baviera. Tram 16/18 fermata Reichenbachplatz o metro U1/U2 Fraunhoferstraße. Parcheggi intorno all'edificio."],
      ["Avete piatti vegetariani o vegani?", "Sì. Molte delle nostre pizze e paste sono vegetariane, e le pizze possono essere preparate con farciture vegane su richiesta."],
      ["Offrite opzioni senza glutine o farro?", "Su richiesta cuociamo le pizze con farina di farro. Segnalatelo al momento della prenotazione o dell'ordine."],
      ["Fate catering ed eventi?", `Sì. Per eventi fino a 400 ospiti portiamo pizza dal forno a legna mobile, buffet di antipasti e postazioni dolci. Richieste su ${BASE}/it/events.`],
      ["Quali metodi di pagamento accettate?", "Contanti, bancomat e principali carte di credito."],
      ["Fate consegne a domicilio?", "Sì. Ordina tramite Lieferando e Wolt - link in homepage."],
    ],
  },
} as const

export default function ContactFaqJsonLd() {
  const { lang } = useLanguage()
  const data = FAQ[lang]
  const canonicalSuffix = lang === "de" ? "" : `/${lang}`

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE}${canonicalSuffix}/contact#faq`,
    inLanguage: data.inLanguage,
    mainEntity: data.items.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
    />
  )
}
