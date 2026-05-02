# Design System: Trattoria Marano

> Production design system as currently shipped on the deployed site.
> Italian neighborhood trattoria, Ohlmüllerstr. 22, 81541 München.
> Two coexisting visual modes: **Warm Editorial** (marketing pages) and **Il Giorno Newspaper** (events, gallery, about, catering).

---

## 1. Visual Theme & Atmosphere

The site speaks two voices that share one wardrobe.

**Warm Editorial mode** runs the home, menu, reserve and contact pages. It feels like a hand-bound trattoria booklet — cream parchment surfaces, a single deep burgundy ink as the only saturated color, PointPanther display type with negative tracking, and ultra-thin sand-colored dividers instead of heavy borders. Imagery dominates the hero (full-bleed, left-aligned headline directly on the photograph, mobile-only gradient fade for legibility). Cards use multi-layer burgundy-tinted shadows that read as embedded, not floating. Restraint is the rule: one accent color, one CTA per zone, generous vertical rhythm.

**Il Giorno Newspaper mode** runs editorial sections — events, gallery, about, catering. Built around the `.np-page` system: Georgia serif throughout, justified bodies with hyphenation, double-rule horizontal dividers, kicker labels in burgundy small-caps, vertical hairline column rules between asymmetric grid columns (3fr · 1px · 1fr), pullquotes flanked by 28px sand bars, dropcap-ready leads. Background is aged parchment `#f0ebe0` with a multiplied paper-grain overlay (1px-spaced repeating lines + soft burgundy/charcoal radial blooms at 0.04–0.05 opacity). Reads like a folded broadsheet from 1962.

Both modes share the same warm palette anchor (`#fffefb`/`#201515`/`#6b1535`/`#c5c0b1`) so transitions between marketing and editorial pages feel like turning a page, not switching brands.

**Atmosphere coordinates:** density 4/10 (marketing) → 7/10 (editorial), variance 6/10, motion 4/10 (restrained, editorial reveals over flashy choreography).

---

## 2. Color Palette & Roles

### Primary
- **Cream** (`#fffefb`) — Canvas. Page background, card fill, hero overlay haze, dark-section text color.
- **Cream Light** (`#fffdf9`) — Off-white alternate surface for subtle section alternation.
- **Ink** (`#201515`) — Primary text, dark sections, masthead rules, double-rules. Near-black with red undertone — never pure `#000`.
- **Burgundy Marano** (`#6b1535`) — The single brand accent. Primary CTA fill, link color, focus ring, kicker text in newspaper mode, selection highlight, headline accent on the hero word "Marano".

### Secondary Burgundy Variants
- **Burgundy Hover** (`#5a1129`) — `btn-orange` hover/active background.
- **Burgundy Light** (`#ff7a40`) — Reserved variant (token only, rarely used).
- **Burgundy Dark** (`#cc3e00`) — Reserved variant (token only, rarely used).

### Warm Neutrals (`warmgray` scale)
- **100** (`#f5f4f1`) — Lightest tint, background washes.
- **200 / Sand Light** (`#eceae3`) — `btn-ghost` background, subtle surfaces.
- **300** (`#dbd9d1`) — Disabled-state surface.
- **400 / Sand** (`#c5c0b1`) — Borders, dividers, tab underline-rest, column rules in newspaper grids.
- **500 / Warm Gray** (`#939084`) — Section labels, captions, muted metadata, newspaper bylines.
- **600** (`#6b6660`)
- **700** (`#4d4843`) — Dark-mode input border.
- **800 / Charcoal** (`#36342e`) — Secondary text, body in newspaper mode, dateline copy.
- **900 / Ink** (`#201515`) — Same as Ink.

### Newspaper-Mode-Only Surfaces
- **Parchment Page** (`#f0ebe0`) — `.np-page` background.
- **Box Cream** (`rgba(255,253,245,0.55)`) — `.np-box` translucent card fill.
- **Caption Rule** (`#c5c0b1`) — Hairline above newspaper captions.

### Banned Color Patterns
- ❌ Pure black `#000000` — use Ink `#201515`
- ❌ Pure white `#ffffff` — use Cream `#fffefb` (or Parchment `#f0ebe0` in newspaper mode)
- ❌ Cool/blue-leaning grays — every neutral must lean warm
- ❌ Saturation above 80% on any hue
- ❌ Neon, gradient-rainbow, AI-purple-blue-glow

### Selection & Focus
- Text selection: `rgba(107,21,53,0.15)` background, Ink text
- Focus-visible: `2px solid #6b1535`, 2px offset, 4px radius
- Newspaper focus: same color, 3px offset

---

## 3. Typography

### Font Stack
- **Display / Heading**: `PointPanther` (custom OTF, weight 400, loaded via `@font-face` from `/fonts/PointPanther.otf`, `font-display: swap`). Fallback to system-ui sans.
- **Body Sans**: CSS variable `--font-sans` (Next.js `next/font` injection), system-ui fallback.
- **Editorial / Newspaper Mode**: `Georgia, "Times New Roman", serif` exclusively. No PointPanther on `.np-page`.
- **Mono**: `JetBrains Mono` — used for code-style labels, dates, metadata.

### Display Scale (clamp-based, fluid)
| Token | Value | Line-Height | Letter-Spacing | Use |
|---|---|---|---|---|
| `display-xl` | `clamp(3.5rem, 8vw, 7rem)` | 0.95 | -0.03em | Hero headline (rare, oversized billboards) |
| `display-lg` | `clamp(2.5rem, 5.5vw, 4.5rem)` | 1.0 | -0.02em | Standard hero, page H1 |
| `display-md` | `clamp(1.75rem, 3.5vw, 2.75rem)` | 1.1 | -0.01em | Section heading |
| `label` | `0.75rem` | 1.5 | 0.2em | All-caps tracked micro-labels |

**Hero pattern as shipped:** `clamp(2.8rem, 7.5vw, 5.5rem)`, line-height 0.9, letter-spacing -0.02em, color `#201515`, with the second word ("Marano") rendered in `#6b1535`.

### Newspaper Type System (`.np-*`)
| Class | Spec |
|---|---|
| `.np-title` | Georgia 900, `clamp(2.6rem, 7vw, 5.5rem)`, lh 0.92, -0.025em, uppercase, centered, sandwiched by 1px `#36342e` rules |
| `.np-title-section` | Georgia 900, `clamp(1.8rem, 4.8vw, 3.6rem)`, lh 1, -0.015em, uppercase |
| `.np-h1` | Georgia 900, `clamp(2rem, 4.4vw, 3.4rem)`, lh 1.02, -0.015em, mixed case |
| `.np-h2` | Georgia 900, 22px, lh 1.05, uppercase |
| `.np-h3` | Georgia 700, 14px, uppercase, +0.02em |
| `.np-kicker` | Georgia 700, 10px, +0.24em, uppercase, color `#6b1535` |
| `.np-lead` | Georgia 500, 18px, lh 1.42, justified, ink |
| `.np-body` | Georgia 400, 14px, lh 1.55, justified, hyphens auto, **color `#6b1535`** |
| `.np-pullquote` | Georgia italic, `clamp(18px, 2.2vw, 24px)`, lh 1.3, top 3px solid + bottom 1px solid Ink, flanked above/below by 28px × 1px burgundy bars |
| `.np-caption` | Georgia italic, 10.5px, color `#939084`, top hairline `#c5c0b1` |
| `.np-subhead` | Georgia italic, 14px, color `#6b1535`, +0.08em, centered |
| `.np-dateline` | Georgia, 10px, +0.12em, uppercase, justify-between flex |

### Type Principles
- Headlines use **balanced wrapping** (`text-wrap: balance`) on `h1/h2/h3`.
- Burgundy is allowed inside headlines as a single colored span (e.g., second word). Never gradient text.
- Body justification + hyphenation is reserved for `.np-body` only — main marketing copy stays left-aligned.
- All-caps text always carries tracking (≥ +0.08em). Never all-caps without tracking.

### Banned
- ❌ `Inter` font in any form
- ❌ Generic system serif outside `.np-*` scope
- ❌ Pure black headlines — always Ink `#201515`
- ❌ Gradient text on display headlines

---

## 4. Component Stylings

### Buttons

**`.btn-orange` (Primary CTA — actually burgundy despite name)**
- Background `#6b1535`, text `#fffefb`, 1px border same color
- Padding `10px 20px`, radius 6px, font 0.875rem weight 600, line-height 1
- Hover: bg `#5a1129`, shadow `0 4px 12px rgba(107,21,53,0.25)`
- Active: `transform: scale(0.97)` (tactile press)
- Transition: 160ms background, 100ms transform, 160ms shadow

**`.btn-dark`**
- Background `#201515`, text `#fffefb`
- Hover: bg flips to sand `#c5c0b1`, text `#201515` — high-contrast inversion
- Same padding/radius/scale-active treatment

**`.btn-ghost`**
- Background `#eceae3`, text `#36342e`, 1px border `#c5c0b1`
- Hover: bg `#c5c0b1`
- Same scale-active treatment

### Cards

**`.card-warm` (Notion-derived warmth, burgundy-tinted)**
- Background `#fffefb`, border `1px solid rgba(107,21,53,0.1)`, radius 12px
- Multi-layer burgundy-tinted shadow stack (4 layers, max opacity 0.04):
  - `rgba(107,21,53,0.04) 0px 4px 18px`
  - `rgba(107,21,53,0.027) 0px 2px 7.8px`
  - `rgba(107,21,53,0.02) 0px 0.8px 2.9px`
  - `rgba(107,21,53,0.01) 0px 0.175px 1px`
- Hover: border ramps to `rgba(107,21,53,0.25)`, shadow intensifies to 3-layer (max opacity 0.07, 32px blur)
- Transition: 200ms shadow + border-color

**`.np-box` (Newspaper card)**
- 1px solid Ink border, 14px padding, translucent cream fill `rgba(255,253,245,0.55)`. No radius. No shadow.

### Tab System (Zapier-style inset rule)
- `.tab-item`: 16px/12px padding, text-sm semibold ink, no shadow at rest
- Hover: `box-shadow: rgb(197,192,177) 0px -3px 0px 0px inset` (sand underline appears inset from below)
- Active: same technique with `rgb(107,21,53)` burgundy

### Inputs
- `.input-underline`: transparent bg, no border except 1px bottom in sand `#c5c0b1`, 12px vertical padding, ink text, warm-gray-500 placeholder. Focus shifts bottom border to burgundy `#6b1535`. No focus ring shadow.
- `.input-underline-dark`: same pattern, darker borders (`#4d4843` rest, `#6b1535` focus), cream text.

### Dividers
- `.border-section`: `border-top: 1px solid #c5c0b1` (sand hairline)
- `.np-rule-thin`: 1px solid charcoal, 22px vertical margin
- `.np-rule-single`: 1px solid Ink, 14px margin
- `.np-rule-thick`: **4px double Ink** — signature newspaper section break, 28px top / 14px bottom
- `.np-footer-rule`: same 4px double Ink + centered footer text

### Sections (Background System)
- `.section-light`: bg `#fffefb`, text `#201515`
- `.section-warm`: bg `#fffdf9`, text `#201515` (off-white alternation)
- `.section-dark`: bg `#201515`, text `#fffefb`

### Grain Overlay (`.grain`)
- Applied to dark page headers
- Pseudo-element with embedded SVG turbulence noise (`baseFrequency=0.75`, 4 octaves)
- 180×180 tile, opacity 0.045, pointer-events none
- Wrapped content lifted to z-index 2

### Links
- `.link-grow`: animated underline grows left-to-right on hover (1px, scaleX 0→1, 0.4s ease-out). Disabled on touch devices.
- `.np-link`: background-image gradient underline (1.5px), grows from 0 → 100% width on hover (320ms expo), text shifts to burgundy on hover.

### Section Labels
- `.section-label`: 0.75rem, weight 600, +0.08em, uppercase, color `#939084` (warm gray 500)
- `.np-label-red`: same metric pattern but Georgia + burgundy + +0.2em tracking
- `.mono-label` / `.mono-label-light`: utility variants for tracked uppercase micro-text

---

## 5. Layout Principles

### Containers
- `.container-narrow`: max-w 3xl (768px) + responsive padding
- `.container-default`: max-w 5xl (1024px) — default page width
- `.container-wide`: max-w 7xl (1280px)

### Newspaper Grid System
- `.np-wrap`: max-w 1140px, padding `clamp(28px, 4vw, 56px)` top, `clamp(48px, 6vw, 88px)` bottom
- `.np-grid-2`: `grid-template-columns: 3fr 1px 1fr` — asymmetric editorial split with vertical hairline rule (`.np-col-rule` background `#c5c0b1`)
- `.np-grid-even-2`: `1fr 1px 1fr` — symmetric two-column with hairline
- `.np-grid-3`: `1fr 1px 1fr 1px 1fr` — three columns, two hairlines
- `.np-catering-asym`: `minmax(0, 1.4fr) 1px minmax(0, 1fr)` — catering page split
- All grids collapse to single column at <700px and hide their column rules
- Tablet (701–960px): `.np-grid-3` collapses to 2-col (drops second rule)

### Hero Pattern (as shipped on `/`)
- Full-bleed image, `object-fit: cover`, `object-position: 70% center`
- Container: `height: calc(100vh - 80px)`, flex column
- Text block: max-width xl (`max-w-xl`), left-aligned, **negative margin-left via clamp**: `clamp(-210px, calc((1024px - 100vw) / 4), 0px)` — pulls text left of container on wide screens, snaps to flush at narrow widths
- Mobile-only gradient overlay: `linear-gradient(to right, rgba(255,254,251,0.96) 0%, 0.88 45%, 0.35 80%, 0 100%)` — fades cream-to-transparent left-to-right for headline legibility
- Headline color: Ink `#201515`, second word burgundy `#6b1535`
- One primary CTA (`.btn-orange`) per hero zone

### Spacing Philosophy
- Generous vertical rhythm between marketing sections (64–120px)
- Editorial pages use `.np-rule-thick` (double 4px) as the main section delineator instead of whitespace
- 8px base unit, fractional values allowed for micro-alignment

### Border Radius Scale
- 6px — buttons, inputs
- 12px — `.card-warm` standard
- 16px — featured/hero cards
- `oval` (50%) and `pill` (9999px) — utility tokens
- 0px — newspaper boxes (intentional)

---

## 6. Motion & Interaction

### Easing Tokens
- `--ease-out-expo`: `cubic-bezier(0.16, 1, 0.3, 1)` — primary reveal motion
- `--ease-out`: `cubic-bezier(0.23, 1, 0.32, 1)` — secondary, link underlines
- Newspaper: `cubic-bezier(0.22, 1, 0.36, 1)` — slightly punchier for editorial feel

### Reveal System
- `.reveal`: opacity 0 → 1, translateY 28px → 0, 0.7s expo
- Stagger: `.reveal-delay-{1..5}` with 0.1s, 0.22s, 0.38s, 0.52s, 0.68s delays
- Triggered via IntersectionObserver `.visible` class toggle

### Tailwind Animation Keyframes
- `reveal-up`: opacity 0/+32px → 1/0, 0.7s expo
- `reveal-left`: opacity 0/+32px X → 1/0, 0.7s expo
- `grow-line`: scaleX 0 → 1, 1s expo
- `pulse-soft`: opacity 0.4 ↔ 0.8, 3s ease-in-out infinite

### Newspaper Animations
- `np-fade-in` (page mount, 420ms)
- `np-title-reveal` (masthead + title, 620–720ms with letter-spacing animation from -0.01em → -0.025em)
- `np-fade-up` (subhead, grids, pullquote, 520–640ms with stagger 180–340ms)
- `np-rule-sweep` (all `.np-rule-*` lines, scaleX 0 → 1 from left, 520ms, delay 240ms)
- `np-lightbox-in` / `np-lightbox-image` (gallery modal, 220ms / 320ms)

### Infinite Loops
- `scrollUp`: `translateY(0 → -50%)`, linear infinite
  - Testimonials columns: 42s slow, 34s medium, 38s fast (parallax illusion)
  - Menu columns: 50s/40s/45s, **desktop only** (≥768px) — static on mobile
- `pizza-tumble`: rotate 0 → 360deg, used for decorative pizza icon
- `pulse-soft` (above)

### Interaction Feedback
- Buttons: scale(0.97) on `:active` — subtle tactile press
- Newspaper `a[href]` and `button`: `translateY(1px)` on `:active` — letterpress feel
- Cards: shadow + border-color intensify on hover (200ms)
- Gallery image (`.np-event-photo`): scale(1.06) on parent hover

### Reduced Motion
- All `.reveal`, `.accent-line`, `np-*` animations, `.np-link` transitions disabled under `prefers-reduced-motion: reduce`
- Smooth scroll disabled
- Hover scale on event photos disabled

### Hardware Acceleration
- All animations restricted to `transform` and `opacity` — never `top`, `left`, `width`, `height`

---

## 7. Responsive Behavior

### Breakpoints (Tailwind defaults + custom newspaper)
| Range | Behavior |
|---|---|
| `<520px` | Form rows collapse to single column |
| `<700px` | All `.np-grid-*` collapse to single column, column rules hide, `.np-wrap` padding shrinks to 28px/16px |
| `<768px` (md) | Hero gradient overlay activates; testimonials/menu columns stop animating; mobile menu opens |
| `701–960px` | `.np-grid-3` collapses to 2-col (mid-tier optimization) |
| `≥768px` | Menu scroll columns animate; desktop nav |

### Mobile Build Mode (`body[data-mobile]`)
Activated when `NEXT_PUBLIC_MOBILE=true`. Full-bleed mobile-only build that overrides:
- All container max-widths → 100% with 1rem horizontal padding
- Hero negative margins zeroed out
- All `md:grid-cols-3` forced to single column
- Touch targets minimum 44px on all `a` and `button`
- Base font 16px

### Touch & A11y
- Skip link present (`SkipLink.tsx`)
- Focus-visible always shown (2px burgundy outline, 2–3px offset)
- WCAG-relevant contrast: ink-on-cream ~17:1, burgundy-on-cream ~9:1, warm-gray-500-on-cream ~4.6:1

---

## 8. Imagery & Iconography

### Photography
- Hero: full-bleed, food/restaurant interior, `.webp` format, `quality={95}`, unoptimized loading for hero priority
- Object-fit cover with custom object-position (`70% center` on hero to keep subject right-of-center while text occupies left)
- Mobile gradient fade overlays for legibility, never permanent overlays on desktop
- Gallery: lightbox modal with `np-lightbox-image` reveal animation

### Icons
- `lucide-react` icon set throughout (ArrowRight, Clock, etc.)
- Inline SVG used for grain noise overlay (turbulence filter, 300×300 tile)
- Custom Trattoria Marano logo wordmark in footer

### Decorative Elements
- Pizza tumble animation (decorative spin)
- Sand-colored hairline column rules in newspaper grids
- Double 4px Ink rules as editorial section breaks
- Burgundy 28px × 1px bars flanking pullquotes (top + bottom)

---

## 9. Iconography Recommendations (for Stitch / future icon work)

When generating supporting icons, follow the established palette and stroke language:
- Stroke: 1.75–3px (scales with size), round caps + round joins
- Default color: Ink `#201515` on Cream `#fffefb`
- Single-accent variant: Burgundy `#6b1535`
- Subtle Sand `#c5c0b1` allowed for secondary linework
- Avoid pure geometric circles — slight ovals (1.05–1.12) match brand tone
- Avoid Material flat-design uniformity — slight stroke-weight variance feels hand-drawn
- One asymmetric detail per icon to avoid AI-symmetric tells

---

## 10. Anti-Patterns (Banned)

- ❌ Pure `#000000` or `#ffffff` anywhere
- ❌ `Inter` font (use PointPanther or Georgia)
- ❌ Cool/blue-leaning grays — must lean warm
- ❌ Gradient text on display headlines
- ❌ Multiple accent colors in one section (Burgundy is the only one)
- ❌ Drop shadows with single hard layer — always multi-layer burgundy-tinted stacks
- ❌ Square line caps on icons — round only
- ❌ Animating layout properties (`top`, `left`, `width`, `height`)
- ❌ Centered hero text (we use left-aligned with negative-margin clamp pattern)
- ❌ Filler "Scroll to explore" / bouncing chevrons
- ❌ Generic 3-equal-card feature rows on editorial pages — use `.np-grid-2` asymmetric
- ❌ Sticky headers (current header is non-sticky by design)
- ❌ Full-page modals without grain or paper texture context on dark backgrounds
- ❌ Tourist clichés in imagery: leaning Pisa towers, checkered flags, Vespa silhouettes
- ❌ Emoji in production copy
- ❌ Pure-black focus rings — always Burgundy `#6b1535`

---

## 11. Quick Reference Card

| Token | Value |
|---|---|
| Page bg (marketing) | Cream `#fffefb` |
| Page bg (editorial) | Parchment `#f0ebe0` |
| Primary text | Ink `#201515` |
| Secondary text | Charcoal `#36342e` (or `#6b1535` in `.np-body`) |
| Muted text | Warm Gray 500 `#939084` |
| Brand accent | Burgundy Marano `#6b1535` |
| Border / divider | Sand `#c5c0b1` |
| Display font | PointPanther |
| Editorial font | Georgia |
| Mono | JetBrains Mono |
| Primary CTA radius | 6px |
| Card radius | 12px (16px featured) |
| Hairline border | 1px solid `#c5c0b1` |
| Whisper border | 1px solid `rgba(107,21,53,0.1)` |
| Section break (editorial) | 4px double `#201515` |
| Card shadow | 4-layer burgundy-tinted, max opacity 0.04 |
| Active scale | 0.97 |
| Easing | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Reveal duration | 0.7s |
| Focus ring | 2px solid `#6b1535`, 2px offset |
| Hero headline | `clamp(2.8rem, 7.5vw, 5.5rem)` / lh 0.9 / -0.02em |
| Locales supported | DE (default), EN, IT |
