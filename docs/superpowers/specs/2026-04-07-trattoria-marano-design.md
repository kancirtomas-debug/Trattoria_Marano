# Trattoria Marano — Website Design Spec
**Date:** 2026-04-07  
**Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion  
**Locale:** German (default) + English (toggle)  
**Status:** Approved by client

---

## 1. Restaurant Data

| Field | Value |
|-------|-------|
| Name | Trattoria Marano |
| Address | Ohlmüllerstr. 22, 81541 München |
| Phone | 089 / 209 28 123 |
| Email | kontakt@solopizza.de |
| Hours | Mon: Closed · Tue–Sun: 11:30–14:00 / 17:30–22:30 |
| Card payment | From €30.00 |
| Sister restaurant | Solo Pizza, Bereiterangerstraße 18, 81451 München |

---

## 2. Visual Identity

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `terracotta` | `#C4704A` | Primary accent, CTA buttons, headings |
| `olive` | `#5C6B3A` | Secondary accent, nav links, badges |
| `parchment` | `#F5EDD5` | Page backgrounds, section fills |
| `espresso` | `#2C1A0E` | Body text, dark sections |
| `cream` | `#FDFAF3` | Card backgrounds |
| `white` | `#FFFFFF` | Clean areas |

### Typography
- **Headings:** Playfair Display (serif) — Google Fonts
- **Body / UI:** Lato (sans-serif) — Google Fonts
- Scale: `text-5xl` hero, `text-3xl` section titles, `text-xl` sub-headings, `text-base` body

### Decorative Details
- Subtle parchment texture on section backgrounds (CSS pattern or soft noise)
- Thin terracotta `<hr>` dividers between sections
- Olive branch SVG inline icon used as section separator
- Framer Motion: gentle fade-up animations on scroll (stagger 0.1s per card)

---

## 3. Page Structure

### 3.1 Shared Layout
- **Sticky header:** Logo (Trattoria Marano wordmark) + nav links + DE/EN language toggle button
- **Footer:** Address, phone, email, hours, delivery badges (Bolt Food, Wolt, Lieferando), copyright
- **GDPR cookie banner:** dismisses to localStorage, shown on first visit

### 3.2 Home (`/`)
- **Hero:** Full-viewport image (placeholder gradient with restaurant name + tagline in Italian and German)
- **Quick-action strip:** 3 cards — "Speisekarte / Menu", "Tisch reservieren / Reserve a Table", "Online bestellen / Order Online"
- **Opening hours strip:** Mon closed · Tue–Sun lunch & dinner hours
- **Welcome section:** Welcome text from PDF (DE + EN), atmospheric paragraph
- **Delivery CTA:** Bolt Food / Wolt / Lieferando order buttons with logos

### 3.3 Menu (`/menu`)
- **Language toggle** (inherits global DE/EN state)
- **Category tabs:** Antipasti · Salate · Suppen · Pasta Speciale · Pasta Tradizionale · Pizza Classica · Pizza Vegetariana · Pizza Pesce · Calzoni · Pizza Bianca · Pizza Pane · Dolci · Getränke
- **Menu item card:** Name (bold) + description (DE or EN depending on toggle) + price (€)
- Allergen info shown as small footnote per card
- Vegetarian/spicy badge icons on relevant items

### 3.4 Gallery (`/gallery`)
- Masonry/responsive grid of placeholder images (12 slots)
- Hover overlay with subtle zoom + terracotta tint

### 3.5 About (`/about`)
- Welcome story from the PDF (bilingual)
- "Our Philosophy" section
- Sister restaurant mention (Solo Pizza)
- Atmosphere image placeholder

### 3.6 Events (`/events`)
- Private events / birthday / special occasions section
- Feature list: what the restaurant offers for private events
- Inquiry CTA button (links to Contact page — no backend yet)

### 3.7 Contact (`/contact`)
- Opening hours table
- Phone + email
- Google Maps embed placeholder (static image with address)
- **Reservation Calendar (visual only):**
  - Month-view calendar — click a date to select
  - Available time slots shown: Lunch (11:30 / 12:00 / 12:30 / 13:00 / 13:30) and Dinner (17:30 / 18:00 / 18:30 / 19:00 / 19:30 / 20:00 / 20:30 / 21:00 / 21:30)
  - Monday always disabled (Ruhetag)
  - Party size selector (1–10 guests)
  - Name + phone fields
  - Submit button (visual only — shows success toast, no actual API call yet)

---

## 4. Menu Data

All data hardcoded in `src/data/menu.ts` as typed arrays, bilingual (de/en per item).

### Categories and items (extracted from PDF):

**ANTIPASTI**
- Antipasti misti alla Marano — €14.90
- Acciughe Grigliate (grilled anchovies, rocket, avocado) — €11.90
- Bruschetta al pomodoro — €7.90
- Montanara (fried Neapolitan pizza slice) — €7.90
- Parmigiana di Melanzane — €8.90

**INSALATE**
- Insalata mista — €6.50
- Insalata Rucola e pomodorini — €6.90
- Formaggio di Capra alla griglia — €14.90
- Insalata Nizza — €16.50

**ZUPPE**
- Zuppa di pomodoro classico — €7.50

**PASTA SPECIALE**
- Fettuccine vitello e funghi — €16.90
- Cannelloni Ricotta e spinaci — €12.90
- Spaghetti Carbonara alla Trattoria Marano — €14.90
- Gnocchi quatro formaggi — €14.90

**PASTA TRADIZIONALE**
- Spaghetti Bolognese — €13.90
- Penne alla Trattoria Marano — €13.90
- Penne all'arrabbiata — €10.90

**PIZZA CLASSICA**
- Margherita — €10.90
- Capricciosa — €15.90
- Salami — €12.50
- Diavola — €15.50
- Parma — €17.50
- Regina — €14.60

**PIZZA VEGETARIANE**
- Ortolana — €15.90
- Spinaci — €15.90
- Rucola — €16.50
- Bufala — €16.50
- Verde — €15.50

**PIZZA PESCE**
- Tonno — €14.60
- Mare — €17.50
- Napoli — €14.50
- Salmone — €16.90

**PIZZA RIPIENE (CALZONI)**
- Luna — €14.90
- Luna Speciale — €15.60
- Rachetta — €15.60
- Cornicione — €16.60

**PIZZA BIANCA**
- Quattro Formaggi — €15.90
- Mortadella — €16.90
- Tartufo — €17.90
- Salsiccia Friarielli — €16.50

**PIZZA PANE**
- Timo e rosmarino — €7.90
- Pomodori e basilico — €8.50

**DOLCI**
- Tortino al Cioccolato — €8.90
- Panna cotta classica — €7.90
- Tiramisu Marano — €7.90

**BEVANDE (DRINKS)**
- Aperitivi (Prosecco, Campari, Spritz, Hugo, etc.)
- Alcoholfree cocktails (Crodino, Baby-Hugo, Virgin Inge)
- Non-alcoholic (water, juice spritzers, sodas)
- Beer (Paulaner, Hacker-Pschorr, Fürstenberger)
- House wine (red/rosé/white) 0.2L/0.5L/1L
- Hot drinks (espresso, cappuccino, tea)
- Digestivi (grappa, amaro, liqueurs)

---

## 5. Delivery Section

Display order buttons for:
- **Bolt Food** — bolt.eu/food
- **Wolt** — wolt.com
- **Lieferando** — lieferando.de

Each as a styled pill/card with logo placeholder and "Jetzt bestellen / Order now" CTA.

---

## 6. Technical Architecture

```
src/
├── app/
│   ├── layout.tsx         # Root layout: fonts, theme, cookie banner
│   ├── page.tsx           # Home
│   ├── menu/page.tsx      # Menu with tabs
│   ├── gallery/page.tsx   # Photo gallery
│   ├── about/page.tsx     # About
│   ├── events/page.tsx    # Events
│   ├── contact/page.tsx   # Contact + reservation calendar
│   └── globals.css        # Tailwind + custom CSS vars
├── components/
│   ├── Header.tsx         # Sticky nav + DE/EN toggle
│   ├── Footer.tsx         # Footer
│   ├── CookieBanner.tsx   # GDPR banner
│   ├── MenuTabs.tsx       # Category tab switcher
│   ├── MenuItemCard.tsx   # Single dish card
│   ├── ReservationCalendar.tsx  # Visual calendar
│   ├── DeliverySection.tsx      # Bolt/Wolt/Lieferando
│   └── LanguageToggle.tsx       # DE/EN state
├── data/
│   └── menu.ts            # All menu data, bilingual
├── hooks/
│   └── useLanguage.ts     # Language state (useState, no i18n lib)
└── lib/
    └── translations.ts    # UI string translations DE/EN
```

**Language:** Simple React context + useState — no external i18n library needed.  
**No backend calls** in this phase — all forms show a success toast only.  
**Framer Motion:** fade-up on section entry, tab switching animation on menu page.

---

## 7. Out of Scope (this phase)

- CRM API integration for reservation form
- Real availability/slot management
- Actual delivery platform deep links (use placeholder hrefs)
- Image uploads / real photography
- Blog system (not relevant for restaurant)
