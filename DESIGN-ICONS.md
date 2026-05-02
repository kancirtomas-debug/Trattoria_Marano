# Design System: Trattoria Marano — Icon Brief for Google Stitch

> Single source of truth for generating bespoke icons for the Trattoria Marano website.
> Italian neighborhood trattoria in Munich (Ohlmüllerstr. 22, 81541 München).
> Atmosphere: warm, hand-crafted, family-run, southern Italian — NOT corporate, NOT generic restaurant.

---

## 1. Visual Theme & Atmosphere

A **warm, hand-drawn, slightly skeuomorphic** icon language inspired by hand-painted trattoria signage, vintage Italian enamel labels, and chalk-on-slate menus from coastal Campania. The atmosphere is **rustic-precise**: imperfect enough to feel made by a person, calibrated enough to feel intentional. Every icon should look like it was sketched in a leather notebook, then quietly refined.

- **Density:** Art-Gallery Airy (3/10) — generous negative space inside the icon bounding box, never cluttered
- **Variance:** Offset Asymmetric (6/10) — strokes have slight weight variation, organic terminations, not geometrically perfect
- **Motion intent:** Static Restrained (2/10) — icons read as still objects on parchment, not animated UI glyphs
- **Vibe anchors:** terracotta plates, sun-bleached awnings, hand-lettered chalkboards, cured prosciutto on butcher paper, dusty wine bottles, oval ceramic platters

**What an icon must feel like:** drawn with a fine fountain pen on warm cream paper, ink slightly bleeding at corners, confident single-stroke construction.

---

## 2. Color Palette & Roles

All icons must be drawable in **monochrome** first. Color is layered only when explicitly requested.

### Core Palette
- **Burgundy Marano** (`#6b1535`) — Primary brand color. Wine-deep, slightly purple-leaning red. Used for the dominant icon stroke when on cream background.
- **Ink Espresso** (`#201515`) — Near-black with red undertone. Default monochrome stroke color. Never use pure `#000000`.
- **Cream Parchment** (`#fffefb`) — Primary canvas. Warm off-white with imperceptible yellow undertone. Backgrounds, fills inside icons.
- **Warm Slate** (`#36342e`) — Body-text gray, used for secondary icon details (shadows, secondary linework).

### Supporting Palette
- **Terracotta Roof** (`#c5582d`) — Accent for warm food/oven motifs. Saturation ~70%.
- **Olive Branch** (`#6b7a3a`) — Accent for herbs, vegetables, basil leaves. Earthy green.
- **Aged Brass** (`#a87b3a`) — Accent for utensils, wine glass rims, decorative flourishes.
- **Salt Bone** (`#f4ede0`) — Tinted highlight, soft inner-fill on plates and bowls.

### Banned Color Patterns
- Pure black (`#000000`) — replace with Ink Espresso (`#201515`)
- Pure white (`#ffffff`) — replace with Cream Parchment (`#fffefb`)
- Neon, fluorescent, gradient-rainbow, AI-purple-blue glow
- Cool grays with blue undertone — must always lean warm
- Saturation above 80% on any hue
- More than one accent color per icon

---

## 3. Icon Construction Rules

### Stroke Architecture
- **Stroke weight:** 1.75px at 24px viewbox, 2.25px at 32px, 3px at 48px. Rendered as if drawn with a fine fountain pen — slight weight variance (~10%) along the path is welcome, perfectly uniform strokes are NOT.
- **Stroke style:** `stroke-linecap: round`, `stroke-linejoin: round`. No mitered corners, no square caps.
- **Construction:** Built from **continuous single strokes** wherever possible — like one confident pen movement. Avoid over-segmented paths.
- **Imperfection budget:** Allow 1–2% deviation from geometric perfection (a circle that's almost-but-not-quite circular reads as hand-drawn, not sloppy).

### Shape Language
- **Ovals over circles** — when a circle is acceptable, prefer a slightly elongated oval (1.05–1.12 aspect ratio). This is signature.
- **Rounded everything** — no sharp 90° corners on container shapes. Border-radius on rectangular icon frames: minimum 4px at 24px viewbox.
- **Asymmetric symmetry** — if an icon has bilateral symmetry, introduce ONE small asymmetric detail (a tilted leaf, an offset olive, a single rivet) so it doesn't read as machine-generated.

### Fill Strategy
- **Outline-first**: the default state of every icon is outlined-only on cream background.
- **Selective duotone**: filled regions use Salt Bone (`#f4ede0`) at 60% opacity for soft inner-fill, never solid color blocks.
- **No drop shadows.** Skeuomorphic depth comes from line-weight variance and inner cross-hatching, not blur effects.

### Skeuomorphic Texture (subtle)
- Optional **cross-hatch shading** in Ink Espresso at 30% opacity, 0.5px stroke, applied sparingly to indicate volume on key elements (the rounded side of an olive, the curve of a wine bottle).
- **Texture grain**: a fine 0.25px stippled noise on cream background regions, suggesting paper or canvas. Use only on hero/feature icons, not on UI glyphs.

---

## 4. Iconography Vocabulary (Trattoria Marano-specific)

These are the **motifs** Stitch should pull from when generating icons for navigation, services, menu categories, and feature blocks.

### Food & Menu Motifs
- **Pasta strand** — single tagliatelle ribbon, gently curved, with subtle width variance along the length
- **Tomato on the vine** — round-oval tomato with a small five-leaf calyx, hand-drawn stem
- **Olive branch** — three olives on a stem with two leaves, asymmetric leaf placement
- **Basil leaf** — single pointed-oval leaf with central vein and three side veins
- **Wine bottle** — tall narrow bottle, oval label area, soft shoulder curve, NOT the generic flat-bottom rectangle silhouette
- **Wine glass** — wide bowl, tapered stem, oval base. Italian style, not French Bordeaux geometry
- **Pizza slice** — wedge with three irregular topping dots (not a perfect triangle)
- **Espresso cup** — small oval cup on saucer, single curved handle, optional steam line of three soft loops
- **Wood-fire oven** — arched dome with a small flame inside, brick texture optional
- **Whole fish** — side profile, single eye, three fin lines (Mediterranean motif for fresh seafood)

### Service & Atmosphere Motifs
- **Bell of the door** — small dome bell with clapper, curved bracket
- **Awning stripe** — three vertical bands suggesting an Italian street-side awning (use Burgundy + Cream alternation when colored)
- **Open book menu** — two-page spread with three faint horizontal lines per page
- **Reservation calendar** — page-corner curl with a single circled date (date marker is an oval, not a square)
- **Map pin** — teardrop with oval cutout center, slightly tilted (~5°)
- **Chair** — bistro chair side profile, curved back, four splayed legs
- **Chalkboard** — rectangular slate with rounded corners, scribble-line lettering hint inside

### Brand & Decorative Motifs
- **Marano monogram seal** — oval frame with stylized "M" inside, twin leaves flanking the oval
- **Sun-rays half-circle** — semicircle with seven outward rays, suggesting Italian summer
- **Knife & fork crossed** — heraldic-style, offset by ~15° from perfect X
- **Hand-lettered scroll** — unfurled paper banner with rolled ends

---

## 5. Layout & Composition Principles (per icon)

- **Bounding box padding:** All icon content lives inside an 80% inset of the viewbox. The outer 10% on each side is reserved breathing room.
- **Visual center:** Optical centering — heavier shapes shift slightly up-and-left to compensate for visual weight perception.
- **Pairing logic:** Icons in a set must share consistent stroke weight, corner radius family, and palette. Never mix hand-drawn ovals with geometric machine-circles in the same set.
- **Sizing rhythm:** Generate icons at 24px (UI), 32px (navigation), 48px (feature blocks), 96px (hero/category headers). Stroke weight scales proportionally per § 3.
- **Set cohesion:** When generating a multi-icon set, all icons must be drawable in under 12 strokes each — enforces visual simplicity and shared DNA.

---

## 6. Anti-Patterns (Never Do)

These are explicit bans. If Stitch generates anything matching this list, the output is rejected.

- ❌ **No emojis.** Anywhere. Ever.
- ❌ **No flat-design Material Icons aesthetic** — perfect geometric circles, uniform 2px strokes, clinical UI feel
- ❌ **No glassmorphism, neumorphism, or AI-glow effects**
- ❌ **No drop shadows.** Depth comes from linework only
- ❌ **No gradients on icon strokes or fills.** Solid color or duotone only
- ❌ **No pure black (`#000000`)** — Ink Espresso (`#201515`) is the darkest allowed value
- ❌ **No pure white (`#ffffff`)** — Cream Parchment (`#fffefb`) is the lightest
- ❌ **No cool/blue-leaning grays** — every neutral must lean warm (yellow-brown undertone)
- ❌ **No mitered or square line caps** — round only
- ❌ **No perfect mathematical symmetry** — every icon needs one asymmetric detail
- ❌ **No generic "chef hat" or "fork-knife-spoon" cliché restaurant icons** — those are slop
- ❌ **No checkered Italian flag patterns, no leaning Pisa towers, no Vespa silhouettes** — tourist-trap clichés are banned
- ❌ **No outer glow, neon, or sci-fi metallic shading**
- ❌ **No inline color-bleed or watercolor effects** — controlled linework only
- ❌ **No more than one accent color per single icon**
- ❌ **No more than 12 strokes per icon** at the simplest size

---

## 7. Stitch Prompting Notes

When prompting Stitch with this DESIGN.md attached, also include:

- **Subject:** the specific motif (e.g., "wine glass with oval base, Italian bistro style")
- **Size context:** "render at 32px viewbox" or "feature icon at 96px"
- **Color directive:** "monochrome Ink Espresso on Cream Parchment" OR "duotone Burgundy Marano + Aged Brass accent"
- **Texture flag:** "with subtle paper grain" / "without grain — clean UI glyph"

### Example Stitch Prompt Snippets
- *"Generate a 48px icon of an oval wine bottle with a hand-drawn label, single confident stroke construction, Ink Espresso on Cream Parchment, round line caps, 2.25px stroke weight, one olive leaf accent in Olive Branch color tucked behind the bottle neck. Slightly off-vertical tilt (~3°). No shadow."*
- *"Generate a 32px navigation icon of a basil leaf, outline-only, Ink Espresso, round joins, 1.75px stroke. Three side veins, asymmetric placement. Salt Bone soft inner-fill at 60% opacity."*
- *"Generate a 96px hero icon: Marano monogram seal — oval brass frame with stylized 'M' centered, two olive branches flanking, Aged Brass primary stroke on Cream Parchment with subtle paper grain. Hand-engraved feel, no gradients."*

---

## 8. Quick Reference Card

| Token | Value |
|---|---|
| Canvas | Cream Parchment `#fffefb` |
| Default stroke | Ink Espresso `#201515` |
| Brand primary | Burgundy Marano `#6b1535` |
| Stroke @ 24px | 1.75px, round caps, round joins |
| Stroke @ 32px | 2.25px |
| Stroke @ 48px | 3px |
| Corner radius | min 4px @ 24px viewbox |
| Max strokes/icon | 12 (simple), 18 (feature) |
| Aspect ratio bias | Ovals 1.05–1.12 over circles |
| Asymmetric detail | Required, exactly one per icon |
| Banned blacks | `#000000` |
| Banned whites | `#ffffff` |
| Banned styles | Material flat, neumorphism, glassmorphism, neon, gradients on strokes |
