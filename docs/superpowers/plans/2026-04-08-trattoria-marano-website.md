# Trattoria Marano Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete visual restaurant website for Trattoria Marano (Munich) with 6 pages, bilingual DE/EN toggle, full menu display, visual reservation calendar, and delivery platform links.

**Architecture:** Next.js 14 App Router with a React Context for DE/EN language state. All content hardcoded in `src/data/menu.ts` and `src/lib/translations.ts`. No backend calls this phase — forms show success toasts only. Reuses the existing Tailwind config (terracotta/cream/sage palette + grain/reveal CSS).

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Playfair Display + Lato (Google Fonts), lucide-react icons.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/context/LanguageContext.tsx` | DE/EN state provider + hook |
| Create | `src/lib/translations.ts` | All UI strings in DE + EN |
| Create | `src/data/menu.ts` | Full bilingual menu data |
| Modify | `src/app/layout.tsx` | Swap fonts, wrap with LanguageProvider |
| Modify | `src/app/globals.css` | Add parchment bg var, olive color |
| Modify | `src/components/header.tsx` | Restaurant nav + language toggle |
| Modify | `src/components/footer.tsx` | Restaurant footer |
| Modify | `src/components/cookie-consent.tsx` | Bilingual GDPR banner |
| Modify | `src/app/page.tsx` | Home page |
| Create | `src/app/menu/page.tsx` | Menu with category tabs |
| Create | `src/app/gallery/page.tsx` | Photo grid |
| Create | `src/app/about/page.tsx` | About page |
| Create | `src/app/events/page.tsx` | Events page |
| Create | `src/app/contact/page.tsx` | Contact + reservation calendar |
| Create | `src/components/DeliverySection.tsx` | Bolt/Wolt/Lieferando section |
| Create | `src/components/ReservationCalendar.tsx` | Visual calendar picker |
| Create | `src/components/MenuTabs.tsx` | Tab navigation for menu categories |
| Create | `src/components/MenuItemCard.tsx` | Single dish card |

---

## Task 1: Language Context + Translations

**Files:**
- Create: `src/context/LanguageContext.tsx`
- Create: `src/lib/translations.ts`

- [ ] **Step 1: Create LanguageContext**

```tsx
// src/context/LanguageContext.tsx
"use client"
import { createContext, useContext, useState } from "react"

type Lang = "de" | "en"
type LangCtx = { lang: Lang; toggle: () => void }

const LanguageContext = createContext<LangCtx>({ lang: "de", toggle: () => {} })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("de")
  const toggle = () => setLang(l => (l === "de" ? "en" : "de"))
  return <LanguageContext.Provider value={{ lang, toggle }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
```

- [ ] **Step 2: Create translations.ts**

```ts
// src/lib/translations.ts
export const t = {
  nav: {
    home:    { de: "Startseite",  en: "Home" },
    menu:    { de: "Speisekarte", en: "Menu" },
    gallery: { de: "Galerie",     en: "Gallery" },
    about:   { de: "Über uns",    en: "About" },
    events:  { de: "Veranstaltungen", en: "Events" },
    contact: { de: "Kontakt",     en: "Contact" },
    reserve: { de: "Reservieren", en: "Reserve" },
  },
  hero: {
    tagline: { de: "Authentische italienische Küche im Herzen von München", en: "Authentic Italian cuisine in the heart of Munich" },
    cta_menu:    { de: "Zur Speisekarte", en: "View Menu" },
    cta_reserve: { de: "Tisch reservieren", en: "Reserve a Table" },
    cta_order:   { de: "Online bestellen", en: "Order Online" },
  },
  hours: {
    title:   { de: "Öffnungszeiten", en: "Opening Hours" },
    monday:  { de: "Montag — Ruhetag", en: "Monday — Closed" },
    tue_sun: { de: "Dienstag – Sonntag", en: "Tuesday – Sunday" },
    lunch:   { de: "11:30 – 14:00 Uhr", en: "11:30 – 14:00" },
    dinner:  { de: "17:30 – 22:30 Uhr", en: "17:30 – 22:30" },
  },
  welcome: {
    title: { de: "Herzlich Willkommen", en: "Welcome" },
    body:  { de: "Das Marano Team heißt Sie herzlich willkommen! Wir arbeiten täglich daran, die Erwartungen unserer Gäste zu übertreffen und hoffen sehr, dass Sie eine schöne Zeit in unserem Restaurant verbringen.", en: "The Marano team welcomes you! We work every day to exceed the expectations of our guests and sincerely hope that you have a great time in our restaurant." },
  },
  delivery: {
    title: { de: "Online bestellen", en: "Order Online" },
    sub:   { de: "Fast alle Speisen auch zum Mitnehmen erhältlich.", en: "Almost all dishes are available for delivery and take away." },
    cta:   { de: "Jetzt bestellen", en: "Order now" },
  },
  events: {
    title:  { de: "Feste & Veranstaltungen", en: "Events & Celebrations" },
    body:   { de: "Feste, Geburtstage oder besondere Anlässe — gerne organisieren wir Ihre Veranstaltung!", en: "Parties, birthdays or special occasions — we will gladly organize your event!" },
    cta:    { de: "Anfrage senden", en: "Send inquiry" },
  },
  about: {
    title:   { de: "Über Trattoria Marano", en: "About Trattoria Marano" },
    p1:      { de: "Willkommen in der Trattoria Marano — einem Stück Italien mitten in München. Wir servieren authentische neapolitanische Pizza, hausgemachte Pasta und klassische Antipasti mit den besten Zutaten aus Italien.", en: "Welcome to Trattoria Marano — a piece of Italy in the heart of Munich. We serve authentic Neapolitan pizza, homemade pasta, and classic antipasti using the finest Italian ingredients." },
    p2:      { de: "Unser Kaffee stammt von Saquella 1856 aus Pescara, Abruzzen. Unsere Pizzen können auf Wunsch mit Dinkelmehl oder veganem Belag zubereitet werden.", en: "Our coffee comes from Saquella 1856, Pescara, Abruzzi. On request, our pizzas can also be prepared with spelt flour or vegan toppings." },
    sister:  { de: "Besuchen Sie auch unsere Schwesterpizzeria Solo Pizza, gleich um die Ecke in der Bereiterangerstraße 18.", en: "Also visit our sister restaurant Solo Pizza, just around the corner at Bereiterangerstraße 18." },
  },
  contact: {
    title:   { de: "Kontakt & Anfahrt", en: "Contact & Location" },
    address: { de: "Adresse", en: "Address" },
    phone:   { de: "Telefon", en: "Phone" },
    email:   { de: "E-Mail",  en: "E-Mail" },
    payment: { de: "Kartenzahlung ab 30,00 €", en: "Card payment from €30.00" },
  },
  reservation: {
    title:       { de: "Tisch reservieren", en: "Reserve a Table" },
    select_date: { de: "Datum wählen", en: "Select Date" },
    select_time: { de: "Uhrzeit wählen", en: "Select Time" },
    guests:      { de: "Personen", en: "Guests" },
    name:        { de: "Ihr Name", en: "Your Name" },
    phone:       { de: "Telefonnummer", en: "Phone Number" },
    submit:      { de: "Reservierung anfragen", en: "Request Reservation" },
    success:     { de: "Vielen Dank! Wir melden uns in Kürze.", en: "Thank you! We will be in touch shortly." },
    closed:      { de: "Montag geschlossen", en: "Closed on Monday" },
    lunch_slots: ["11:30", "12:00", "12:30", "13:00", "13:30"],
    dinner_slots: ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"],
  },
  gallery: {
    title: { de: "Galerie", en: "Gallery" },
    sub:   { de: "Atmosphäre & Küche", en: "Atmosphere & Cuisine" },
  },
  menu_page: {
    title: { de: "Speisekarte", en: "Menu" },
    veg_label:   { de: "Vegetarisch", en: "Vegetarian" },
    spicy_label: { de: "Scharf",      en: "Spicy" },
    note_spelt:  { de: "Pizza auf Wunsch mit Dinkelmehl (+1,90 €)", en: "Pizza available with spelt flour on request (+€1.90)" },
    note_vegan:  { de: "Veganer Belag möglich (+1,30 €)", en: "Vegan topping available on request (+€1.30)" },
  },
  cookie: {
    text:   { de: "Wir verwenden Cookies, um Ihr Erlebnis zu verbessern.", en: "We use cookies to improve your experience." },
    accept: { de: "Akzeptieren", en: "Accept" },
    decline:{ de: "Ablehnen", en: "Decline" },
  },
} as const
```

- [ ] **Step 3: Commit**
```bash
git add src/context/LanguageContext.tsx src/lib/translations.ts
git commit -m "feat: add language context and translations for DE/EN toggle"
```

---

## Task 2: Menu Data

**Files:**
- Create: `src/data/menu.ts`

- [ ] **Step 1: Create menu.ts with full bilingual data**

```ts
// src/data/menu.ts
export type MenuItem = {
  id: string
  name: string
  description: { de: string; en: string }
  price: number
  vegetarian?: boolean
  spicy?: boolean
  allergens?: string
}

export type MenuCategory = {
  id: string
  label: { de: string; en: string }
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    id: "antipasti",
    label: { de: "Antipasti", en: "Starters" },
    items: [
      { id: "a1", name: "Antipasti misti alla Marano", price: 14.90, description: { de: "Mariniertes Grillgemüse, Parmaschinken, Tomaten, Mozarella, Oliven, Fisch (nach Tagesangebot) und eine Überraschung des Hauses", en: "Marinated grilled vegetables, Parma ham, tomatoes, mozzarella, olives, fish (daily availability) and a surprise from the house" }, allergens: "7,10,13 / A,B,C,D,F" },
      { id: "a2", name: "Acciughe Grigliate", price: 11.90, description: { de: "Gegrillte Sardellen, Rucola, Avocado", en: "Grilled anchovies, rocket salad and avocado" }, allergens: "4 / A,C,D" },
      { id: "a3", name: "Bruschetta al pomodoro", price: 7.90, vegetarian: true, description: { de: "Geröstetes Brot mit frischen Tomaten, Olivenöl, Knoblauch und Basilikum", en: "Toasted bread with fresh tomatoes, olive oil, garlic, and basil" }, allergens: "1a" },
      { id: "a4", name: "Montanara", price: 7.90, description: { de: "Frittiertes Pizzastück auf neapolitanische Art — Mozarella, Tomatensauce, Tomaten, Basilikum", en: "Neapolitan-style fried pizza slice — mozzarella, tomato sauce, tomatoes, basil" }, allergens: "4 / A,C,D" },
      { id: "a5", name: "Parmigiana di Melanzane", price: 8.90, vegetarian: true, description: { de: "Überbackene Auberginenscheiben mit Tomatensauce, Mozzarella, Parmezan und frischem Basilikum", en: "Aubergine slices au gratin with tomato sauce, mozzarella, parmesan, and fresh basil" }, allergens: "4 / A,C,D" },
    ],
  },
  {
    id: "insalate",
    label: { de: "Salate", en: "Salads" },
    items: [
      { id: "s1", name: "Insalata mista", price: 6.50, vegetarian: true, description: { de: "Verschiedene Rohkost- & Blattsalate, Balsamico-Dressing, geröstete Körner, Croutons", en: "Various raw vegetable & leaf salads, balsamic dressing, roasted grains, croutons" }, allergens: "1a,10,11,13 / A,B,C,D,K" },
      { id: "s2", name: "Insalata Rucola e pomodorini", price: 6.90, vegetarian: true, description: { de: "Rucola, Strauchtomaten, Grana Padana Parmigiano", en: "Rocket, cherry tomatoes, Grana Padano Parmigiano" }, allergens: "6,9,13 / A,B,C,D,K" },
      { id: "s3", name: "Formaggio di Capra alla griglia", price: 14.90, vegetarian: true, description: { de: "Gegrillter Ziegenfrischkäse, Thymian-Honig, kandierte Walnüsse, marinierte Blattsalate, Oliven, Paprika, geröstete Brotwürfel", en: "Grilled fresh goat cheese, thyme honey, candied walnuts, marinated lettuce, olives, peppers, toasted bread cubes" }, allergens: "1a,7,8c / A,B,C,D,(E),K" },
      { id: "s4", name: "Insalata Nizza", price: 16.50, description: { de: "Rohkost- und Blattsalate, Thunfisch, gekochtes Ei, rote Zwiebeln, Oliven, Kapern, Balsamicodressing", en: "Raw vegetable and leaf salads, tuna, boiled egg, red onions, olives, capers, balsamic dressing" }, allergens: "3,4,10,13 / A,B,C,D,F,H,I,K" },
    ],
  },
  {
    id: "zuppe",
    label: { de: "Suppen", en: "Soups" },
    items: [
      { id: "z1", name: "Zuppa di pomodoro classico", price: 7.50, vegetarian: true, description: { de: "Kleine Tomatensuppe, frische Kräuter, Croutons, Basilikum-Sahne", en: "Small tomato soup, fresh herbs, croutons, basil cream" }, allergens: "1a,7,9 / A,C,D,F" },
    ],
  },
  {
    id: "pasta-speciale",
    label: { de: "Pasta Speciale", en: "Pasta Specials" },
    items: [
      { id: "ps1", name: "Fettuccine vitello e funghi", price: 16.90, description: { de: "Bandnudeln mit Kalbfleischstreifen, frische Champignons & Saisongemüse, Kirschtomaten, frischer Zitronenthymian, Merlot-Sauce", en: "Ribbon noodles with veal strips, fresh mushrooms & seasonal vegetables, cherry tomatoes, fresh lemon thyme, Merlot gravy" }, allergens: "1a,3,7,(9),13 / C,E" },
      { id: "ps2", name: "Cannelloni Ricotta e spinaci fatti in casa", price: 12.90, vegetarian: true, description: { de: "Gefüllte Cannelloni mit Spinat und Ricotta, Aurora-Soße, überbacken mit Grana Padano Parmigiano, Mozzarella & Strauchtomaten", en: "Stuffed cannelloni with spinach and ricotta, Aurora sauce, gratinated with Grana Padano Parmigiano, mozzarella and cherry tomatoes" }, allergens: "1a,3,7 / A,C,E" },
      { id: "ps3", name: "Spaghetti Carbonara alla Trattoria Marano", price: 14.90, description: { de: "Pancetta-Speck, Eigelb, Parmesan", en: "Pancetta bacon, egg yolk, parmesan" }, allergens: "1a,3,7,9 / A,B,C,D,E" },
      { id: "ps4", name: "Gnocchi quatro formaggi", price: 14.90, vegetarian: true, description: { de: "Tallegio, Gorgonzola, Parmesan, Mozzarella, Sahnesauce", en: "Tallegio, gorgonzola, parmesan, mozzarella, cream sauce" }, allergens: "1a,3,7,9 / A,B,C,D,E" },
    ],
  },
  {
    id: "pasta-tradizionale",
    label: { de: "Pasta Tradizionale", en: "Classic Pasta" },
    items: [
      { id: "pt1", name: "Spaghetti Bolognese", price: 13.90, description: { de: "Rindfleischragout (100%), frische Kräuter, Tomaten, Gemüse, Merlot", en: "Beef ragout (100%), fresh herbs, tomatoes, vegetables, Merlot" }, allergens: "1a,3,7,9,13 / A,C,D,E" },
      { id: "pt2", name: "Penne alla Trattoria Marano", price: 13.90, description: { de: "Pancetta-Speck, junge Erbsen, Champignons, leichter Tomatenrahm, frischer Basilikum, überbacken mit Mozzarella", en: "Pancetta bacon, young peas, mushrooms, light tomato cream, fresh basil, gratinated with mozzarella" }, allergens: "1a,3,7,8,13 / A,C,D,E" },
      { id: "pt3", name: "Penne all'arrabbiata", price: 10.90, vegetarian: true, spicy: true, description: { de: "Fruchtiges Tomatenragout, Peperoni, frische Chili und Kräuter, gebackene Kirschtomaten — mild, mittelscharf oder sehr scharf", en: "Fruity tomato ragout, hot peppers, fresh chili and herbs, baked cherry tomatoes — mild, medium or very spicy" }, allergens: "1a,3,7,13 / A,C,D,K" },
    ],
  },
  {
    id: "pizza-classica",
    label: { de: "Pizza Classica", en: "Classic Pizza" },
    items: [
      { id: "pc1", name: "Margherita", price: 10.90, vegetarian: true, description: { de: "Tomatensauce, Mozzarella, Basilikum", en: "Tomato sauce, mozzarella, basil" }, allergens: "1a,7 / A,D,I" },
      { id: "pc2", name: "Capricciosa", price: 15.90, description: { de: "Tomatensauce, Mozzarella, Oliven, Cotto, Artischocken, Pilze", en: "Tomato sauce, mozzarella, olives, cooked ham, artichokes, mushrooms" }, allergens: "1a,7,13 / A,D,I" },
      { id: "pc3", name: "Salami", price: 12.50, description: { de: "Tomatensauce, Mozzarella, Salami", en: "Tomato sauce, mozzarella, salami" }, allergens: "1a,7,13 / A,D,I" },
      { id: "pc4", name: "Diavola", price: 15.50, spicy: true, description: { de: "Tomatensauce, Mozzarella, pikante Salami, Jalapeno-Marmelade", en: "Tomato sauce, mozzarella, spicy salami, jalapeño marmalade" }, allergens: "1a,7,13 / A,D,I" },
      { id: "pc5", name: "Parma", price: 17.50, description: { de: "Tomatensauce, Mozzarella, Parmaschinken, Rucola, Parmesan, Kirschtomaten", en: "Tomato sauce, mozzarella, Parma ham, rocket salad, Parmesan, cherry tomatoes" }, allergens: "1a,7,13 / A,D,I" },
      { id: "pc6", name: "Regina", price: 14.60, description: { de: "Tomatensauce, Mozzarella, Schinken, Pilze", en: "Tomato sauce, mozzarella, ham, mushrooms" }, allergens: "1a,7,13 / A,D,I" },
    ],
  },
  {
    id: "pizza-vegetariane",
    label: { de: "Pizza Vegetarisch", en: "Vegetarian Pizza" },
    items: [
      { id: "pv1", name: "Ortolana", price: 15.90, vegetarian: true, description: { de: "Tomatensauce, Mozzarella, Zucchini, Aubergine, Spinat, Pilze", en: "Tomato sauce, mozzarella, courgette, aubergine, spinach, mushrooms" }, allergens: "1a,7,8c / A,C,D,I" },
      { id: "pv2", name: "Spinaci", price: 15.90, vegetarian: true, description: { de: "Tomatensauce, Mozzarella, Gorgonzolla, Spinat, Parmesan", en: "Tomato sauce, mozzarella, gorgonzola, spinach, Parmesan" }, allergens: "1a,7,8g,13 / A,C,D" },
      { id: "pv3", name: "Rucola", price: 16.50, vegetarian: true, description: { de: "Tomatensauce, Mozzarella, Rucola, Kirschtomaten, Parmesan", en: "Tomato sauce, mozzarella, rocket salad, cherry tomatoes, Parmesan" }, allergens: "1a,7 / A,C,D,E,G" },
      { id: "pv4", name: "Bufala", price: 16.50, vegetarian: true, description: { de: "Tomatensauce, Mozzarella, Mozzarella di Bufala, Basilikum, Kirschtomaten", en: "Tomato sauce, mozzarella, buffalo mozzarella, basil, cherry tomatoes" }, allergens: "1a,7,13 / A,C,D,E,G" },
      { id: "pv5", name: "Verde", price: 15.50, vegetarian: true, description: { de: "Ricotta, Mozzarella, Spinaci, Kirschtomaten, Pistazien", en: "Ricotta, mozzarella, spinach, cherry tomatoes, pistachios" }, allergens: "1a,7,13 / A,D,I" },
    ],
  },
  {
    id: "pizza-pesce",
    label: { de: "Pizza mit Fisch", en: "Pizza with Fish" },
    items: [
      { id: "pf1", name: "Tonno", price: 14.60, description: { de: "Tomatensauce, Mozzarella, Thunfisch, Zwiebeln, Oliven", en: "Tomato sauce, mozzarella, tuna, onion, olives" }, allergens: "1a,7,13 / A,D,I" },
      { id: "pf2", name: "Mare", price: 17.50, description: { de: "Tomatensauce, Mozzarella, Meeresfrüchte", en: "Tomato sauce, mozzarella, various seafood" }, allergens: "1a,7,2,14 / A,D" },
      { id: "pf3", name: "Napoli", price: 14.50, description: { de: "Tomatensauce, Mozzarella, Sardellen, Oliven, Kapern", en: "Tomato sauce, mozzarella, anchovies, olives, capers" }, allergens: "1a,7,13 / A,C,D" },
      { id: "pf4", name: "Salmone", price: 16.90, description: { de: "Mozzarella, Kirschtomaten, Lachs, Rucola, rote Zwiebel", en: "Mozzarella, cherry tomatoes, salmon, rocket salad, red onion" }, allergens: "1a,7,13 / A,B,C,D,E,I" },
    ],
  },
  {
    id: "calzoni",
    label: { de: "Calzoni", en: "Folded Pizza" },
    items: [
      { id: "ca1", name: "Luna", price: 14.90, description: { de: "Tomatensauce, Mozzarella, Pilze, Schinken", en: "Tomato sauce, mozzarella, mushrooms, ham" }, allergens: "1a,7,13 / A,D,I" },
      { id: "ca2", name: "Luna Speciale", price: 15.60, description: { de: "Tomatensauce, Mozzarella, Ricotta, Salami, Schinken, Parmesan", en: "Tomato sauce, mozzarella, ricotta, salami, ham, Parmesan" }, allergens: "1a,7,13 / A,D" },
      { id: "ca3", name: "Rachetta", price: 15.60, description: { de: "Kirschtomaten, Salami Piccante, Mozzarella, Ricotta, Rucola, Parmesan", en: "Cherry tomatoes, spicy salami, mozzarella, ricotta, rocket salad, Parmesan" }, allergens: "1a,7,13 / A,C,D" },
      { id: "ca4", name: "Cornicione", price: 16.60, description: { de: "Tomatensauce, Mozzarella, Ricotta, Parmaschinken, Rucola", en: "Tomato sauce, mozzarella, ricotta, Parma ham, rocket salad" }, allergens: "1a,7,13 / A,B,C,D,E,I" },
    ],
  },
  {
    id: "pizza-bianca",
    label: { de: "Pizza Bianca", en: "White Pizza" },
    items: [
      { id: "pb1", name: "Quattro Formaggi", price: 15.90, vegetarian: true, description: { de: "Mozzarella, Gorgonzola, Parmesan, Ricotta, Walnüsse", en: "Mozzarella, gorgonzola, Parmesan, ricotta, walnuts" }, allergens: "1a,7,8c / A,C,D,I" },
      { id: "pb2", name: "Mortadella", price: 16.90, description: { de: "Mozzarella, Mortadella, Pistazien, Burrata", en: "Mozzarella, mortadella, pistachio, burrata" }, allergens: "1a,7,8g,13 / A,C,D" },
      { id: "pb3", name: "Tartufo", price: 17.90, description: { de: "Pilze, Büffelmozarella, Tartufocrema, Rucola, Parmesan", en: "Mushrooms, buffalo mozzarella, truffle cream, rocket salad, Parmesan" }, allergens: "1a,7 / A,C,D,E,G" },
      { id: "pb4", name: "Salsiccia Friarielli", price: 16.50, description: { de: "Mozzarella, Salsiccia, Brokkoli", en: "Mozzarella, sausage, broccoli" }, allergens: "1a,7,13 / A,C,D,E,G" },
    ],
  },
  {
    id: "pizza-pane",
    label: { de: "Pizzabrot", en: "Pizza Bread" },
    items: [
      { id: "pp1", name: "Pizza pane timo e rosmarino", price: 7.90, vegetarian: true, description: { de: "Pizzabrot mit Thymian und Rosmarin", en: "Pizza bread with thyme and rosemary" }, allergens: "1a" },
      { id: "pp2", name: "Pizza pane pomodori e basilico", price: 8.50, vegetarian: true, description: { de: "Pizzabrot mit Tomaten und Basilikum", en: "Pizza bread with tomatoes and basil" }, allergens: "1a" },
    ],
  },
  {
    id: "dolci",
    label: { de: "Desserts", en: "Desserts" },
    items: [
      { id: "d1", name: "Tortino al Cioccolato", price: 8.90, description: { de: "Lauwarmes Schokoladentörtchen, frische Früchte der Saison, Sahne", en: "Lukewarm chocolate tartlet, fresh seasonal fruit, cream" }, allergens: "1a,3,5,7,8 / A,B,C,D,F,J" },
      { id: "d2", name: "Panna cotta classica", price: 7.90, description: { de: "Italienische Vanillecreme, Fruchtmark, Frangelico-Mandel-Crumble", en: "Italian vanilla cream, fruit pulp, Frangelico almond crumble" }, allergens: "3,7,8 / A,B,C,D,F,G,J" },
      { id: "d3", name: "Tiramisu Marano — senza uova", price: 7.90, description: { de: "Sahnemascarponecreme, Kaffee, Löffelbiskuit, ohne Ei", en: "Cream & mascarpone cream, coffee, ladyfingers biscuits, without egg" }, allergens: "1a,5,6,7 / A,B,C,D,F,G" },
    ],
  },
  {
    id: "bevande",
    label: { de: "Getränke", en: "Drinks" },
    items: [
      { id: "bev1", name: "Prosecco Frizzante 0.1 L", price: 4.70, vegetarian: true, description: { de: "Prosecco Frizzante", en: "Prosecco Sparkling" }, allergens: "b" },
      { id: "bev2", name: "Prosecco Spumante 0.75 L", price: 29.90, vegetarian: true, description: { de: "Prosecco Spumante", en: "Prosecco Sparkling bottle" }, allergens: "b" },
      { id: "bev3", name: "Spritz Classico 0.2 L", price: 8.90, vegetarian: true, description: { de: "Aperol, Prosecco, Soda, Orange", en: "Aperol, Prosecco, soda, orange" }, allergens: "b" },
      { id: "bev4", name: "Hugo 0.2 L", price: 8.90, vegetarian: true, description: { de: "Holunderblütensirup, Soda, Limette und Pfefferminze", en: "Elderflower syrup, soda, lime and mint" }, allergens: "3 / b" },
      { id: "bev5", name: "Hauswein 0.2 L", price: 6.50, vegetarian: true, description: { de: "Rot, Rosé oder Weiß nach Wahl", en: "Red, rosé or white of your choice" } },
      { id: "bev6", name: "Paulaner Hefe-Weißbier 0.5 L", price: 5.50, description: { de: "Paulaner Weißbier", en: "Paulaner wheat beer" }, allergens: "a" },
      { id: "bev7", name: "Espresso", price: 2.90, vegetarian: true, description: { de: "Saquella 1856, Gran Miscela Bar Gold Exclusiva", en: "Saquella 1856, Gran Miscela Bar Gold Exclusiva" }, allergens: "9" },
      { id: "bev8", name: "Cappuccino", price: 3.90, vegetarian: true, description: { de: "Espresso mit aufgeschäumter Milch", en: "Espresso with steamed milk" }, allergens: "9 / c" },
      { id: "bev9", name: "Latte Macchiato", price: 5.30, vegetarian: true, description: { de: "Milch mit Espresso", en: "Steamed milk with espresso" }, allergens: "9 / c" },
      { id: "bev10", name: "Adelholzener 0.25 L", price: 4.10, vegetarian: true, description: { de: "Klassisch oder Still", en: "Sparkling or still" } },
      { id: "bev11", name: "Coca Cola / Fanta / Sprite 0.4 L", price: 4.90, vegetarian: true, description: { de: "Softdrinks", en: "Soft drinks" }, allergens: "1,3,9" },
    ],
  },
]
```

- [ ] **Step 2: Commit**
```bash
git add src/data/menu.ts
git commit -m "feat: add full bilingual menu data from Trattoria Marano PDF"
```

---

## Task 3: Root Layout (fonts + language provider)

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next"
import { Playfair_Display, Lato } from "next/font/google"
import { LanguageProvider } from "@/context/LanguageContext"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CookieConsent from "@/components/cookie-consent"
import "./globals.css"

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "700"],
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "Trattoria Marano — Ohlmüllerstr. 22, München",
    template: "%s | Trattoria Marano München",
  },
  description: "Authentische italienische Küche im Herzen von München. Pizza, Pasta, Antipasti. Dienstag–Sonntag geöffnet.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Trattoria Marano",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${lato.variable} ${playfair.variable}`}>
      <body className="font-sans bg-cream text-ink antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-terracotta text-white rounded-lg font-medium text-sm">
          Zum Inhalt springen
        </a>
        <LanguageProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/layout.tsx
git commit -m "feat: set up root layout with Playfair/Lato fonts and LanguageProvider"
```

---

## Task 4: Header Component

**Files:**
- Modify: `src/components/header.tsx`

- [ ] **Step 1: Replace header.tsx**

```tsx
// src/components/header.tsx
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

const navLinks = [
  { href: "/",        key: "home"    },
  { href: "/menu",    key: "menu"    },
  { href: "/gallery", key: "gallery" },
  { href: "/about",   key: "about"   },
  { href: "/events",  key: "events"  },
  { href: "/contact", key: "contact" },
] as const

export default function Header() {
  const { lang, toggle } = useLanguage()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-warmgray-200">
      <div className="container-wide flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-heading text-xl md:text-2xl font-semibold text-ink tracking-wide">Trattoria Marano</span>
          <span className="text-[11px] tracking-[0.22em] uppercase text-terracotta font-sans">München · Dal 1856</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium link-grow transition-colors ${
                pathname === href ? "text-terracotta" : "text-ink-light hover:text-ink"
              }`}
            >
              {t.nav[key][lang]}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggle}
            className="text-xs font-medium px-2.5 py-1 rounded-pill border border-warmgray-300 hover:border-terracotta hover:text-terracotta transition-colors"
            aria-label="Toggle language"
          >
            {lang === "de" ? "EN" : "DE"}
          </button>
          {/* Reserve CTA */}
          <Link
            href="/contact#reservation"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-pill bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark transition-colors"
          >
            {t.nav.reserve[lang]}
          </Link>
          {/* Mobile menu toggle */}
          <button className="md:hidden p-2" onClick={() => setOpen(o => !o)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-warmgray-200 bg-cream px-5 py-4 flex flex-col gap-4">
          {navLinks.map(({ href, key }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={`text-base font-medium ${pathname === href ? "text-terracotta" : "text-ink"}`}>
              {t.nav[key][lang]}
            </Link>
          ))}
          <Link href="/contact#reservation" onClick={() => setOpen(false)}
            className="mt-2 inline-flex justify-center px-4 py-3 rounded-pill bg-terracotta text-white text-sm font-medium">
            {t.nav.reserve[lang]}
          </Link>
        </nav>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/header.tsx
git commit -m "feat: restaurant header with nav links and DE/EN language toggle"
```

---

## Task 5: Footer Component

**Files:**
- Modify: `src/components/footer.tsx`

- [ ] **Step 1: Replace footer.tsx**

```tsx
// src/components/footer.tsx
"use client"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

export default function Footer() {
  const { lang } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-cream">
      {/* Main footer */}
      <div className="container-wide py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <p className="font-heading text-2xl font-semibold mb-1">Trattoria Marano</p>
          <p className="text-xs tracking-[0.2em] uppercase text-terracotta mb-4">Autentica Cucina Italiana</p>
          <p className="text-warmgray-400 text-sm leading-relaxed">
            {t.welcome.body[lang]}
          </p>
        </div>

        {/* Contact */}
        <div>
          <p className="mono-label-light mb-4">{t.contact.title[lang]}</p>
          <ul className="space-y-3 text-sm text-warmgray-300">
            <li className="flex gap-2.5">
              <MapPin size={16} className="text-terracotta mt-0.5 shrink-0" />
              <span>Ohlmüllerstr. 22<br />81541 München</span>
            </li>
            <li className="flex gap-2.5">
              <Phone size={16} className="text-terracotta mt-0.5 shrink-0" />
              <a href="tel:+4989209281230" className="hover:text-terracotta transition-colors">089 / 209 28 123</a>
            </li>
            <li className="flex gap-2.5">
              <Mail size={16} className="text-terracotta mt-0.5 shrink-0" />
              <a href="mailto:kontakt@solopizza.de" className="hover:text-terracotta transition-colors">kontakt@solopizza.de</a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <p className="mono-label-light mb-4">{t.hours.title[lang]}</p>
          <ul className="space-y-2 text-sm text-warmgray-300">
            <li className="text-warmgray-500">{t.hours.monday[lang]}</li>
            <li>
              <span className="text-cream">{t.hours.tue_sun[lang]}</span>
              <br />
              <span>{t.hours.lunch[lang]}</span>
              <br />
              <span>{t.hours.dinner[lang]}</span>
            </li>
            <li className="pt-2 text-warmgray-500 text-xs">{t.contact.payment[lang]}</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-warmgray-800">
        <div className="container-wide py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-warmgray-500">
          <span>© {year} Trattoria Marano München</span>
          <span>
            {lang === "de"
              ? "Schwesterpizzeria: "
              : "Sister restaurant: "}
            <a href="#" className="hover:text-terracotta transition-colors">Solo Pizza · Bereiterangerstr. 18</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/footer.tsx
git commit -m "feat: restaurant footer with contact, hours, and sister restaurant link"
```

---

## Task 6: Cookie Consent Banner

**Files:**
- Modify: `src/components/cookie-consent.tsx`

- [ ] **Step 1: Replace cookie-consent.tsx**

```tsx
// src/components/cookie-consent.tsx
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
```

- [ ] **Step 2: Commit**
```bash
git add src/components/cookie-consent.tsx
git commit -m "feat: bilingual GDPR cookie consent banner"
```

---

## Task 7: Home Page

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/DeliverySection.tsx`

- [ ] **Step 1: Create DeliverySection.tsx**

```tsx
// src/components/DeliverySection.tsx
"use client"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

const platforms = [
  { name: "Bolt Food",   bg: "bg-[#34D186]", text: "text-white", href: "#" },
  { name: "Wolt",        bg: "bg-[#009DE0]", text: "text-white", href: "#" },
  { name: "Lieferando",  bg: "bg-[#FF8000]", text: "text-white", href: "#" },
]

export default function DeliverySection() {
  const { lang } = useLanguage()
  return (
    <section className="section-warm py-16">
      <div className="container-default text-center">
        <p className="mono-label mb-3">{t.delivery.title[lang]}</p>
        <p className="text-warmgray-600 mb-8 max-w-md mx-auto">{t.delivery.sub[lang]}</p>
        <div className="flex flex-wrap justify-center gap-4">
          {platforms.map(({ name, bg, text, href }) => (
            <a
              key={name}
              href={href}
              className={`flex items-center gap-3 px-6 py-3 rounded-pill ${bg} ${text} font-medium text-sm shadow-soft hover:opacity-90 transition-opacity`}
            >
              <span className="text-lg font-bold">{name[0]}</span>
              <span>{name}</span>
              <span className="text-xs opacity-75">— {t.delivery.cta[lang]}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Replace page.tsx (Home)**

```tsx
// src/app/page.tsx
"use client"
import Link from "next/link"
import { ArrowRight, UtensilsCrossed, CalendarDays, ShoppingBag } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"
import DeliverySection from "@/components/DeliverySection"

export default function HomePage() {
  const { lang } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-charcoal grain">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-[#1a0e08] opacity-90" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(201,107,85,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 20%, rgba(123,143,110,0.1) 0%, transparent 50%)" }} />

        <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
          <p className="mono-label-light mb-6">Ohlmüllerstr. 22 · München</p>
          <h1 className="font-heading text-display-xl text-cream mb-4 leading-none">
            Trattoria<br /><span className="text-terracotta">Marano</span>
          </h1>
          <p className="text-warmgray-300 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            {t.hero.tagline[lang]}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/menu" className="flex items-center gap-2 px-6 py-3 bg-terracotta text-white rounded-pill font-medium hover:bg-terracotta-dark transition-colors">
              {t.hero.cta_menu[lang]} <ArrowRight size={16} />
            </Link>
            <Link href="/contact#reservation" className="flex items-center gap-2 px-6 py-3 border border-warmgray-600 text-cream rounded-pill font-medium hover:border-terracotta hover:text-terracotta transition-colors">
              {t.hero.cta_reserve[lang]}
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-warmgray-500 text-xs tracking-widest">
          <div className="w-px h-12 bg-gradient-to-b from-warmgray-600 to-transparent" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* Quick-action cards */}
      <section className="section-light py-16">
        <div className="container-default grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: UtensilsCrossed, label: t.hero.cta_menu,    href: "/menu",                  color: "text-terracotta" },
            { icon: CalendarDays,    label: t.hero.cta_reserve,  href: "/contact#reservation",   color: "text-sage" },
            { icon: ShoppingBag,     label: t.hero.cta_order,    href: "#delivery",              color: "text-terracotta-dark" },
          ].map(({ icon: Icon, label, href, color }) => (
            <a key={href} href={href} className="card-warm rounded-2xl p-8 flex flex-col items-center text-center gap-4 group cursor-pointer">
              <div className={`p-4 rounded-full bg-cream ${color}`}>
                <Icon size={28} />
              </div>
              <span className="font-heading text-xl font-semibold text-ink">{label[lang]}</span>
              <ArrowRight size={16} className={`${color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </a>
          ))}
        </div>
      </section>

      {/* Opening hours strip */}
      <section className="bg-terracotta py-6">
        <div className="container-default flex flex-wrap items-center justify-center gap-6 text-white text-sm">
          <span className="font-heading text-lg font-semibold">{t.hours.title[lang]}</span>
          <span className="opacity-80">{t.hours.monday[lang]}</span>
          <span className="w-px h-4 bg-white/40 hidden sm:block" />
          <span>{t.hours.tue_sun[lang]}: {t.hours.lunch[lang]} · {t.hours.dinner[lang]}</span>
        </div>
      </section>

      {/* Welcome section */}
      <section className="section-warm py-20">
        <div className="container-narrow text-center">
          <div className="w-12 h-px bg-terracotta mx-auto mb-6" />
          <h2 className="font-heading text-display-md text-ink mb-6">{t.welcome.title[lang]}</h2>
          <p className="text-ink-light text-lg leading-relaxed max-w-2xl mx-auto">{t.welcome.body[lang]}</p>
          <div className="w-12 h-px bg-terracotta mx-auto mt-6" />
        </div>
      </section>

      {/* Delivery section */}
      <div id="delivery">
        <DeliverySection />
      </div>
    </>
  )
}
```

- [ ] **Step 3: Commit**
```bash
git add src/app/page.tsx src/components/DeliverySection.tsx
git commit -m "feat: home page with hero, quick actions, hours strip, welcome, and delivery section"
```

---

## Task 8: Menu Page

**Files:**
- Create: `src/app/menu/page.tsx`
- Create: `src/components/MenuTabs.tsx`
- Create: `src/components/MenuItemCard.tsx`

- [ ] **Step 1: Create MenuItemCard.tsx**

```tsx
// src/components/MenuItemCard.tsx
"use client"
import { Leaf, Flame } from "lucide-react"
import type { MenuItem } from "@/data/menu"
import type { Lang } from "../context/LanguageContext"

// Export Lang type from LanguageContext for reuse
// (add `export type Lang = "de" | "en"` to LanguageContext.tsx)

type Props = { item: MenuItem; lang: "de" | "en" }

export default function MenuItemCard({ item, lang }: Props) {
  return (
    <div className="card-warm rounded-xl p-5 flex justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-heading font-semibold text-ink">{item.name}</span>
          {item.vegetarian && (
            <span title="Vegetarisch / Vegetarian">
              <Leaf size={14} className="text-sage shrink-0" />
            </span>
          )}
          {item.spicy && (
            <span title="Scharf / Spicy">
              <Flame size={14} className="text-terracotta shrink-0" />
            </span>
          )}
        </div>
        <p className="text-sm text-ink-muted leading-relaxed">{item.description[lang]}</p>
        {item.allergens && (
          <p className="text-[11px] text-warmgray-400 mt-1.5">{item.allergens}</p>
        )}
      </div>
      <div className="shrink-0 pt-0.5">
        <span className="font-heading text-lg font-semibold text-terracotta whitespace-nowrap">
          {item.price.toFixed(2)} €
        </span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Update LanguageContext to export Lang type**

Add this line after the `type Lang` declaration in `src/context/LanguageContext.tsx`:
```ts
export type { Lang }
```

- [ ] **Step 3: Create MenuTabs.tsx**

```tsx
// src/components/MenuTabs.tsx
"use client"
import { useState } from "react"
import { menuCategories } from "@/data/menu"
import MenuItemCard from "./MenuItemCard"
import { useLanguage } from "@/context/LanguageContext"

export default function MenuTabs() {
  const { lang } = useLanguage()
  const [active, setActive] = useState(menuCategories[0].id)
  const category = menuCategories.find(c => c.id === active)!

  return (
    <div>
      {/* Tab bar — horizontal scroll on mobile */}
      <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
        <div className="flex gap-2 pb-2 min-w-max sm:flex-wrap sm:min-w-0">
          {menuCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 rounded-pill text-sm font-medium whitespace-nowrap transition-colors ${
                active === cat.id
                  ? "bg-terracotta text-white"
                  : "bg-cream text-ink-light border border-warmgray-200 hover:border-terracotta hover:text-terracotta"
              }`}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Items grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.items.map(item => (
          <MenuItemCard key={item.id} item={item} lang={lang} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create menu/page.tsx**

```tsx
// src/app/menu/page.tsx
"use client"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"
import MenuTabs from "@/components/MenuTabs"
import { Leaf, Flame } from "lucide-react"

export default function MenuPage() {
  const { lang } = useLanguage()
  return (
    <div className="section-warm min-h-screen">
      {/* Page header */}
      <div className="bg-charcoal text-cream py-16 text-center grain">
        <p className="mono-label-light mb-3">Trattoria Marano</p>
        <h1 className="font-heading text-display-lg">{t.menu_page.title[lang]}</h1>
      </div>

      {/* Notes + legend */}
      <div className="container-default pt-10 pb-4">
        <div className="flex flex-wrap gap-4 text-sm text-ink-muted mb-4">
          <span className="flex items-center gap-1.5"><Leaf size={14} className="text-sage" /> {t.menu_page.veg_label[lang]}</span>
          <span className="flex items-center gap-1.5"><Flame size={14} className="text-terracotta" /> {t.menu_page.spicy_label[lang]}</span>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-warmgray-500">
          <span className="px-3 py-1 bg-cream-light rounded-pill border border-warmgray-200">{t.menu_page.note_spelt[lang]}</span>
          <span className="px-3 py-1 bg-cream-light rounded-pill border border-warmgray-200">{t.menu_page.note_vegan[lang]}</span>
        </div>
      </div>

      <div className="container-default pb-20">
        <MenuTabs />
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Commit**
```bash
git add src/app/menu/page.tsx src/components/MenuTabs.tsx src/components/MenuItemCard.tsx
git commit -m "feat: menu page with bilingual category tabs and item cards"
```

---

## Task 9: Gallery Page

**Files:**
- Create: `src/app/gallery/page.tsx`

- [ ] **Step 1: Create gallery/page.tsx**

```tsx
// src/app/gallery/page.tsx
"use client"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

// 12 placeholder image slots with varied aspect ratios for masonry effect
const placeholders = [
  { id: 1, aspect: "aspect-square",       label: "Pizza Margherita" },
  { id: 2, aspect: "aspect-[4/5]",        label: "Pasta Carbonara" },
  { id: 3, aspect: "aspect-[3/4]",        label: "Antipasti misti" },
  { id: 4, aspect: "aspect-square",       label: "Trattoria interior" },
  { id: 5, aspect: "aspect-[4/3]",        label: "Pizza Tartufo" },
  { id: 6, aspect: "aspect-[3/4]",        label: "Tiramisu Marano" },
  { id: 7, aspect: "aspect-square",       label: "Gnocchi quattro formaggi" },
  { id: 8, aspect: "aspect-[4/5]",        label: "Wood-fired oven" },
  { id: 9, aspect: "aspect-[3/4]",        label: "Bruschetta al pomodoro" },
  { id: 10, aspect: "aspect-square",      label: "Aperol Spritz" },
  { id: 11, aspect: "aspect-[4/3]",       label: "Restaurant atmosphere" },
  { id: 12, aspect: "aspect-[3/4]",       label: "Panna cotta" },
]

const gradients = [
  "from-terracotta/30 to-terracotta-dark/50",
  "from-sage/30 to-sage/50",
  "from-warmgray-700 to-warmgray-900",
  "from-terracotta-dark/40 to-charcoal",
  "from-sage/20 to-warmgray-700",
  "from-terracotta/20 to-warmgray-800",
]

export default function GalleryPage() {
  const { lang } = useLanguage()
  return (
    <div className="section-warm min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-cream py-16 text-center grain">
        <p className="mono-label-light mb-3">Trattoria Marano</p>
        <h1 className="font-heading text-display-lg">{t.gallery.title[lang]}</h1>
        <p className="text-warmgray-400 mt-2">{t.gallery.sub[lang]}</p>
      </div>

      {/* Masonry-style grid */}
      <div className="container-wide py-14">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {placeholders.map((p, i) => (
            <div key={p.id} className={`break-inside-avoid ${p.aspect} relative overflow-hidden rounded-xl group cursor-pointer`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]}`} />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                <span className="text-white text-sm font-medium">{p.label}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-warmgray-400 text-sm mt-12 italic">
          {lang === "de" ? "Echte Fotos folgen bald." : "Real photos coming soon."}
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/gallery/page.tsx
git commit -m "feat: gallery page with masonry grid and placeholder image slots"
```

---

## Task 10: About Page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create about/page.tsx**

```tsx
// src/app/about/page.tsx
"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

const features = {
  de: ["Authentische neapolitanische Pizza", "Hausgemachte Pasta & Gnocchi", "Kaffee von Saquella 1856, Pescara", "Pizza auf Wunsch mit Dinkelmehl", "Vegane Optionen verfügbar", "Take-away für fast alle Gerichte"],
  en: ["Authentic Neapolitan pizza", "Homemade pasta & gnocchi", "Coffee from Saquella 1856, Pescara", "Pizza available with spelt flour on request", "Vegan options available", "Take-away for almost all dishes"],
}

export default function AboutPage() {
  const { lang } = useLanguage()
  return (
    <div className="section-warm min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-cream py-20 text-center grain">
        <p className="mono-label-light mb-3">Trattoria Marano</p>
        <h1 className="font-heading text-display-lg">{t.about.title[lang]}</h1>
      </div>

      {/* Story */}
      <section className="container-narrow py-20">
        <div className="w-12 h-px bg-terracotta mb-8" />
        <p className="font-heading text-2xl text-ink leading-relaxed mb-6">{t.about.p1[lang]}</p>
        <p className="text-ink-light leading-relaxed mb-8">{t.about.p2[lang]}</p>

        {/* Feature list */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {features[lang].map(f => (
            <li key={f} className="flex items-center gap-3 text-sm text-ink-light">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="w-12 h-px bg-terracotta mb-10" />

        {/* Sister restaurant */}
        <div className="card-warm rounded-2xl p-6">
          <p className="mono-label mb-3">
            {lang === "de" ? "Schwesterpizzeria" : "Sister Restaurant"}
          </p>
          <p className="font-heading text-xl font-semibold text-ink mb-1">Solo Pizza</p>
          <p className="text-ink-muted text-sm mb-4">Bereiterangerstraße 18 · 81451 München</p>
          <p className="text-ink-light text-sm mb-4">{t.about.sister[lang]}</p>
          <div className="text-xs text-warmgray-400">
            {lang === "de"
              ? "Mo–Fr: ab 17:00 Uhr · Sa, So & Feiertag: ab 12:00 Uhr"
              : "Mon–Fri: from 17:00 · Sat, Sun & Holidays: from 12:00"}
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <Link href="/menu" className="flex items-center gap-2 px-5 py-2.5 bg-terracotta text-white rounded-pill text-sm font-medium hover:bg-terracotta-dark transition-colors">
            {t.nav.menu[lang]} <ArrowRight size={14} />
          </Link>
          <Link href="/contact#reservation" className="flex items-center gap-2 px-5 py-2.5 border border-warmgray-300 text-ink rounded-pill text-sm font-medium hover:border-terracotta hover:text-terracotta transition-colors">
            {t.nav.reserve[lang]}
          </Link>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/about/page.tsx
git commit -m "feat: about page with restaurant story and sister restaurant card"
```

---

## Task 11: Events Page

**Files:**
- Create: `src/app/events/page.tsx`

- [ ] **Step 1: Create events/page.tsx**

```tsx
// src/app/events/page.tsx
"use client"
import Link from "next/link"
import { PartyPopper, Cake, Star, Users, ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

const eventTypes = {
  de: [
    { icon: Cake,         title: "Geburtstage",         desc: "Feiern Sie Ihren Geburtstag in gemütlicher Atmosphäre mit unserer authentischen Küche." },
    { icon: PartyPopper,  title: "Feste & Feiern",       desc: "Von kleinen Familienfeiern bis zu größeren Gesellschaften — wir organisieren gerne für Sie." },
    { icon: Users,        title: "Firmenevents",          desc: "Teamessen, Geschäftsdinner oder Jubiläen — die Trattoria Marano ist der perfekte Rahmen." },
    { icon: Star,         title: "Besondere Anlässe",     desc: "Verlobungen, Jahrestage oder andere Meilensteine — wir machen Ihren Abend unvergesslich." },
  ],
  en: [
    { icon: Cake,         title: "Birthdays",             desc: "Celebrate your birthday in a cosy atmosphere with our authentic Italian cuisine." },
    { icon: PartyPopper,  title: "Parties & Celebrations",desc: "From small family gatherings to larger groups — we are happy to organise your event." },
    { icon: Users,        title: "Corporate Events",       desc: "Team dinners, business lunches or anniversaries — Trattoria Marano is the perfect setting." },
    { icon: Star,         title: "Special Occasions",      desc: "Engagements, anniversaries or milestones — we make your evening unforgettable." },
  ],
}

export default function EventsPage() {
  const { lang } = useLanguage()
  const types = eventTypes[lang]
  return (
    <div className="section-warm min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-cream py-20 text-center grain">
        <p className="mono-label-light mb-3">Trattoria Marano</p>
        <h1 className="font-heading text-display-lg">{t.events.title[lang]}</h1>
        <p className="text-warmgray-400 mt-3 max-w-md mx-auto">{t.events.body[lang]}</p>
      </div>

      {/* Event types */}
      <section className="container-default py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {types.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-warm rounded-2xl p-7">
              <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center mb-4">
                <Icon size={22} className="text-terracotta" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-ink mb-2">{title}</h3>
              <p className="text-ink-light text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-terracotta rounded-2xl p-10 text-center text-white">
          <h2 className="font-heading text-display-md mb-4">
            {lang === "de" ? "Ihr Event planen?" : "Plan your event?"}
          </h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            {lang === "de"
              ? "Kontaktieren Sie uns telefonisch oder per E-Mail und wir besprechen gemeinsam alle Details."
              : "Contact us by phone or email and we will discuss all details together."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:+4989209281230" className="flex items-center gap-2 px-6 py-3 bg-white text-terracotta rounded-pill font-medium text-sm hover:bg-cream transition-colors">
              089 / 209 28 123
            </a>
            <Link href="/contact" className="flex items-center gap-2 px-6 py-3 border border-white/50 text-white rounded-pill font-medium text-sm hover:border-white transition-colors">
              {t.events.cta[lang]} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/events/page.tsx
git commit -m "feat: events page with event type cards and contact CTA"
```

---

## Task 12: Reservation Calendar + Contact Page

**Files:**
- Create: `src/components/ReservationCalendar.tsx`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create ReservationCalendar.tsx**

```tsx
// src/components/ReservationCalendar.tsx
"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

const DAYS_DE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
const DAYS_EN = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]
const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number) {
  // 0=Mon, 6=Sun (convert from JS Sunday=0)
  const d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1
}

export default function ReservationCalendar() {
  const { lang } = useLanguage()
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [guests, setGuests] = useState(2)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  const dayLabels = lang === "de" ? DAYS_DE : DAYS_EN
  const months = lang === "de" ? MONTHS_DE : MONTHS_EN

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }
  function selectDay(day: number) {
    const d = new Date(viewYear, viewMonth, day)
    if (d < today || d.getDay() === 1) return // Monday=1 is closed, past dates disabled
    setSelectedDate(d)
    setSelectedTime("")
  }

  function isDisabled(day: number) {
    const d = new Date(viewYear, viewMonth, day)
    return d < new Date(today.getFullYear(), today.getMonth(), today.getDate()) || d.getDay() === 1
  }
  function isSelected(day: number) {
    if (!selectedDate) return false
    return selectedDate.getFullYear() === viewYear && selectedDate.getMonth() === viewMonth && selectedDate.getDate() === day
  }
  function isToday(day: number) {
    return today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day
  }

  const isLunch = selectedTime && t.reservation.lunch_slots.includes(selectedTime)
  const timeSlots = selectedDate
    ? [...t.reservation.lunch_slots, ...t.reservation.dinner_slots]
    : []

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center">
          <Check size={28} className="text-sage" />
        </div>
        <p className="font-heading text-xl text-ink">{t.reservation.success[lang]}</p>
        <p className="text-sm text-ink-muted">089 / 209 28 123</p>
        <button onClick={() => setSubmitted(false)} className="text-sm text-terracotta hover:underline mt-2">
          {lang === "de" ? "Neue Anfrage" : "New request"}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Calendar */}
      <div>
        <p className="mono-label mb-4">{t.reservation.select_date[lang]}</p>
        <div className="bg-white rounded-2xl border border-warmgray-200 overflow-hidden">
          {/* Month nav */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-warmgray-100">
            <button type="button" onClick={prevMonth} className="p-1.5 hover:text-terracotta transition-colors rounded-lg hover:bg-cream">
              <ChevronLeft size={18} />
            </button>
            <span className="font-heading font-semibold text-ink">
              {months[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={nextMonth} className="p-1.5 hover:text-terracotta transition-colors rounded-lg hover:bg-cream">
              <ChevronRight size={18} />
            </button>
          </div>
          {/* Day labels */}
          <div className="grid grid-cols-7 text-center text-xs text-warmgray-400 border-b border-warmgray-100 py-2">
            {dayLabels.map(d => <span key={d}>{d}</span>)}
          </div>
          {/* Days grid */}
          <div className="grid grid-cols-7 text-center text-sm p-2 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <span key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const disabled = isDisabled(day)
              const selected = isSelected(day)
              const todayDay = isToday(day)
              return (
                <button
                  type="button"
                  key={day}
                  disabled={disabled}
                  onClick={() => selectDay(day)}
                  className={`
                    aspect-square rounded-full flex items-center justify-center text-sm transition-colors
                    ${disabled ? "text-warmgray-300 cursor-not-allowed" : "hover:bg-cream cursor-pointer"}
                    ${selected ? "bg-terracotta text-white hover:bg-terracotta-dark" : ""}
                    ${todayDay && !selected ? "font-bold text-terracotta" : ""}
                  `}
                >
                  {day}
                </button>
              )
            })}
          </div>
          {/* Closed notice */}
          <p className="text-center text-xs text-warmgray-400 pb-3 px-3">
            <span className="inline-block w-3 h-3 rounded-full bg-warmgray-200 mr-1" />
            {t.reservation.closed[lang]}
          </p>
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div>
          <p className="mono-label mb-4">{t.reservation.select_time[lang]}</p>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map(slot => (
              <button
                type="button"
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`px-3 py-1.5 rounded-pill text-sm font-medium transition-colors border ${
                  selectedTime === slot
                    ? "bg-terracotta text-white border-terracotta"
                    : "border-warmgray-200 text-ink-light hover:border-terracotta hover:text-terracotta"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Guest count */}
      {selectedTime && (
        <div>
          <p className="mono-label mb-4">{t.reservation.guests[lang]}</p>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setGuests(g => Math.max(1, g - 1))} className="w-9 h-9 rounded-full border border-warmgray-300 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors font-medium">−</button>
            <span className="font-heading text-2xl font-semibold text-ink w-8 text-center">{guests}</span>
            <button type="button" onClick={() => setGuests(g => Math.min(10, g + 1))} className="w-9 h-9 rounded-full border border-warmgray-300 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors font-medium">+</button>
            <span className="text-ink-muted text-sm ml-1">{lang === "de" ? "Personen" : "guests"}</span>
          </div>
        </div>
      )}

      {/* Name + phone */}
      {selectedTime && (
        <>
          <div>
            <label className="mono-label block mb-2">{t.reservation.name[lang]}</label>
            <input
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="input-underline"
              placeholder={lang === "de" ? "Ihr Name" : "Your name"}
            />
          </div>
          <div>
            <label className="mono-label block mb-2">{t.reservation.phone[lang]}</label>
            <input
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="input-underline"
              placeholder="+49 ..."
            />
          </div>
          <button type="submit" className="w-full py-3.5 bg-terracotta text-white rounded-pill font-medium hover:bg-terracotta-dark transition-colors">
            {t.reservation.submit[lang]}
          </button>
        </>
      )}
    </form>
  )
}
```

- [ ] **Step 2: Create contact/page.tsx**

```tsx
// src/app/contact/page.tsx
"use client"
import { MapPin, Phone, Mail, Clock, CreditCard } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"
import ReservationCalendar from "@/components/ReservationCalendar"

export default function ContactPage() {
  const { lang } = useLanguage()
  return (
    <div className="section-warm min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-cream py-16 text-center grain">
        <p className="mono-label-light mb-3">Trattoria Marano</p>
        <h1 className="font-heading text-display-lg">{t.contact.title[lang]}</h1>
      </div>

      <div className="container-default py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: info */}
          <div className="space-y-8">
            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden bg-warmgray-200 aspect-video flex items-center justify-center">
              <div className="text-center text-warmgray-400">
                <MapPin size={40} className="mx-auto mb-2" />
                <p className="font-heading text-xl text-warmgray-600">Ohlmüllerstr. 22</p>
                <p className="text-sm">81541 München</p>
                <a href="https://maps.google.com/?q=Ohlmüllerstr.+22+81541+München" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-terracotta text-sm hover:underline">
                  {lang === "de" ? "In Google Maps öffnen" : "Open in Google Maps"}
                </a>
              </div>
            </div>

            {/* Contact details */}
            <div className="card-warm rounded-2xl p-6 space-y-5">
              <div className="flex gap-4">
                <Clock size={18} className="text-terracotta mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-ink mb-1">{t.hours.title[lang]}</p>
                  <p className="text-ink-muted text-sm">{t.hours.monday[lang]}</p>
                  <p className="text-ink-light text-sm">{t.hours.tue_sun[lang]}</p>
                  <p className="text-ink-light text-sm">{t.hours.lunch[lang]} · {t.hours.dinner[lang]}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone size={18} className="text-terracotta mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-ink mb-1">{t.contact.phone[lang]}</p>
                  <a href="tel:+4989209281230" className="text-ink-light text-sm hover:text-terracotta transition-colors">089 / 209 28 123</a>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail size={18} className="text-terracotta mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-ink mb-1">{t.contact.email[lang]}</p>
                  <a href="mailto:kontakt@solopizza.de" className="text-ink-light text-sm hover:text-terracotta transition-colors">kontakt@solopizza.de</a>
                </div>
              </div>
              <div className="flex gap-4">
                <CreditCard size={18} className="text-terracotta mt-0.5 shrink-0" />
                <p className="text-ink-light text-sm">{t.contact.payment[lang]}</p>
              </div>
            </div>
          </div>

          {/* Right: reservation calendar */}
          <div id="reservation" className="card-warm rounded-2xl p-6 md:p-8">
            <p className="mono-label mb-2">{t.nav.reserve[lang]}</p>
            <h2 className="font-heading text-2xl font-semibold text-ink mb-6">{t.reservation.title[lang]}</h2>
            <ReservationCalendar />
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**
```bash
git add src/components/ReservationCalendar.tsx src/app/contact/page.tsx
git commit -m "feat: contact page with info panel, map placeholder, and visual reservation calendar"
```

---

## Task 13: Start Dev Server & Verify

- [ ] **Step 1: Install dependencies if needed**
```bash
cd "C:/Users/kanci/Claude-web-makeing" && npm install
```
Expected: no errors (all packages already in package.json)

- [ ] **Step 2: Start dev server**
```bash
npm run dev
```
Expected: `ready - started server on 0.0.0.0:3000`

- [ ] **Step 3: Verify pages load**

Check in browser:
- http://localhost:3000 — Home
- http://localhost:3000/menu — Menu with tabs
- http://localhost:3000/gallery — Gallery grid
- http://localhost:3000/about — About
- http://localhost:3000/events — Events
- http://localhost:3000/contact — Contact + calendar

- [ ] **Step 4: Fix any TypeScript errors**
```bash
npx tsc --noEmit
```
Fix any type errors before marking complete.

---

## Self-Review vs Spec

| Spec requirement | Task |
|-----------------|------|
| DE/EN toggle | Task 1 (LanguageContext) + Task 4 (Header toggle button) |
| Classic Italian trattoria style | Existing Tailwind config reused; parchment/terracotta/espresso palette |
| 6 pages | Tasks 7–12 |
| Full menu from PDF, bilingual | Task 2 (menu.ts) + Task 8 (menu page) |
| Delivery section (Bolt/Wolt/Lieferando) | Task 7 (DeliverySection.tsx) |
| Visual reservation calendar | Task 12 (ReservationCalendar.tsx) |
| Mon disabled in calendar | ✅ `d.getDay() === 1` check |
| Lunch/dinner slots per hours | ✅ t.reservation.lunch_slots/dinner_slots |
| No backend calls | ✅ form.onSubmit shows success state only |
| GDPR cookie banner | Task 6 |
| Sticky header + footer | Tasks 4, 5 |
| All allergens shown per dish | ✅ allergens field in MenuItem |
| Vegetarian + spicy badges | ✅ Leaf/Flame icons in MenuItemCard |
