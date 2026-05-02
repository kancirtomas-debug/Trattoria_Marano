# Trattoria Marano — SEO Manual

Things Claude cannot do without your input. Each section is ~5 minutes of work.

---

## 1. Add real Google rating + review count to schema

**Why:** Star rating shows in Google search results. Boosts CTR significantly.

**Step 1 — Get the numbers**

Open: https://www.google.com/search?q=trattoria+marano+m%C3%BCnchen

Look at the right-side panel ("Knowledge Panel"). Note:
- Rating value, e.g. `4.7`
- Total reviews, e.g. `1.234 Google-Bewertungen`

**Step 2 — Tell Claude.** I add `aggregateRating` to `src/app/layout.tsx` Restaurant schema.

OR do it yourself: open `src/app/layout.tsx`, find `restaurantSchemaBase`, add inside the object (above `sameAs`):

```ts
aggregateRating: {
  "@type": "AggregateRating",
  ratingValue: 4.7,         // ← your rating
  reviewCount: 1234,         // ← your count
  bestRating: 5,
  worstRating: 1,
},
```

**Step 3 — Verify** after deploy with https://search.google.com/test/rich-results — paste your homepage URL. Check that `Restaurant` snippet validates with stars.

---

## 2. Set up Google Places API (auto-fetch reviews + rating)

**Why:** Site auto-pulls latest 5 reviews + live rating. No manual updates ever. Already wired in code — just add env vars.

### 2A. Enable Places API

1. Go to https://console.cloud.google.com/
2. Pick existing project `trattoria-marano-493218` (you have it for Calendar already)
3. Top search bar → "Places API" → enable it
4. Same for "Places API (New)" if available

### 2B. Create API key

1. In Cloud Console → **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **API key**
3. Copy the key. Looks like `AIzaSy...`
4. Click the key to edit:
   - **API restrictions** → Restrict key → check ONLY `Places API` and `Places API (New)`
   - **Application restrictions** → HTTP referrers (websites) — add:
     - `https://www.trattoria-marano.de/*`
     - `https://trattoria-marano.de/*`
     - `https://*.vercel.app/*` (preview deploys)
   - Save

### 2C. Get Place ID

1. Go to https://developers.google.com/maps/documentation/places/web-service/place-id
2. Use the "Find the place ID of a specific place" search box
3. Type: `Trattoria Marano Ohlmüllerstraße 22 München`
4. Click result → copy Place ID. Format: `ChIJ...` (starts with ChIJ)

### 2D. Add env vars to Vercel

Vercel dashboard → your project → **Settings** → **Environment Variables**:

| Key | Value | Environments |
|-----|-------|--------------|
| `GOOGLE_PLACES_API_KEY` | `AIzaSy...` (from 2B) | Production, Preview, Development |
| `GOOGLE_PLACE_ID` | `ChIJ...` (from 2C) | Production, Preview, Development |

Save → redeploy.

### 2E. Verify

After redeploy, open `https://www.trattoria-marano.de/api/google-reviews` in browser. Should return JSON like:
```json
{ "rating": 4.7, "userRatingsTotal": 1234, "reviews": [...] }
```

If it returns `null`, recheck:
- API key restrictions (referrers)
- Place ID matches your business
- Both env vars present in Vercel

Home page now shows real review cards. `aggregateRating` auto-injected into Restaurant schema. Caches 6h (revalidate=21600s).

**Cost:** Place Details ~$17 / 1000 requests after free tier. With 6h cache = max 4 requests/day = free forever.

---

## 3. Extend `sameAs` in Restaurant schema

**Why:** Strengthens entity recognition. Google sees "Trattoria Marano on Google Maps + TripAdvisor + Instagram = same business."

**Already added:**
- Google Maps CID URL ✓
- Lieferando ✓
- Wolt ✓

**Add yourself if you have them.** Open `src/app/layout.tsx`, find `sameAs:` array, append:

```ts
sameAs: [
  "https://maps.google.com/?cid=7054837083427866703",
  "https://www.lieferando.de/en/menu/trattoriamarano",
  "https://wolt.com/de/deu/munich/restaurant/trattoria-marano",
  "https://www.instagram.com/trattoria_marano_munich/",   // ← your IG
  "https://www.facebook.com/TrattoriaMaranoMunich",        // ← your FB page
  "https://www.tripadvisor.de/Restaurant_Review-...",      // ← your TripAdvisor
  "https://www.thefork.de/restaurant/...",                 // ← your TheFork
],
```

URLs needed:
- **Instagram:** open your IG profile, copy URL
- **Facebook:** open your FB business page, copy URL
- **TripAdvisor:** search "Trattoria Marano München" on tripadvisor.de, copy URL
- **TheFork:** search on thefork.de, copy URL (skip if not listed)

Skip platforms you don't have. Don't invent URLs.

---

## 4. Lighthouse / Core Web Vitals audit

**Why:** Google ranks sites on speed (LCP < 2.5s, CLS < 0.1, INP < 200ms). All hero text tweaks may have hurt CLS.

### Run after deploy

**Option A — PageSpeed Insights (no install)**

https://pagespeed.web.dev/ → enter `https://www.trattoria-marano.de` → run.

Run for:
- `https://www.trattoria-marano.de`
- `https://www.trattoria-marano.de/reserve`
- `https://www.trattoria-marano.de/contact`
- `https://www.trattoria-marano.de/en`

Note scores under 90. Send Claude the report URLs, I fix top issues.

**Option B — Chrome DevTools (locally)**

1. Open prod site in Chrome
2. F12 → **Lighthouse** tab
3. Categories: Performance, Accessibility, Best Practices, SEO
4. Device: **Mobile**
5. Click **Analyze**

### What to watch

- **LCP** — Largest image (hero) should load < 2.5s. If slow: Claude can add `loading="eager"` + adjust `sizes`, or reduce hero image weight.
- **CLS** — Layout shift. Hero text uses `clamp()` margins → may shift on font load. Possible fix: reserve fixed dimensions or use `font-display: optional`.
- **TBT/INP** — JS blocking. The `useEffect` fetch in `GoogleReviewsLive` may cause a small layout shift after mount — acceptable but reportable.

---

## 5. Submit to search engines

### Google Search Console

1. Go to https://search.google.com/search-console
2. Add property → enter `https://www.trattoria-marano.de`
3. Verify (DNS TXT or HTML tag — already have token in `app/layout.tsx`)
4. **Sitemaps** menu → submit `https://www.trattoria-marano.de/sitemap.xml`
5. Wait 24-48h. Check **Indexing** for crawl errors.
6. **Settings** → **Internationalization** → confirm hreflang detected.

After this is set:
- Watch **Performance** tab for impressions/clicks per country
- Watch **Pages** tab for indexed counts (should grow to ~21 = 7 routes × 3 locales)
- If `/blog` URLs were indexed before: add them to **Removals** for fast cleanup (already 410-friendly via 404)

### Bing Webmaster Tools

Often forgotten, gets you ~5% extra traffic.

1. https://www.bing.com/webmasters
2. Add site → import from Google Search Console (1-click)
3. Submit sitemap there too

### Google Business Profile

1. https://business.google.com — claim your listing if not already
2. Add: hours, photos, menu PDF (or link to /#menu), call button, reservation link (`/reserve`)
3. Post 1-2 weekly updates with photos — feeds local SEO
4. Reply to all reviews (good and bad)

Most local-search traffic comes from this listing, not your website.

---

## 6. Quick wins still doable on your own

### Add favicons + icons (Google likes complete sites)

Generate a full icon set from your logo:
1. Go to https://realfavicongenerator.net/
2. Upload `public/images/trattoria-logo-full.png`
3. Download zip → extract files into `public/`
4. Files needed: `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `manifest.webmanifest`

Then tell Claude — I wire them into `app/layout.tsx` metadata.

### Photo SEO

Open files in `public/images/wolt/` and `public/images/gallery/`. Rename random hashes like `c9be83e3ac844e63a68f8f0de6224a77_MD5.jpg` to descriptive names like `pizza-margherita-trattoria-marano-munich.jpg`. Update references in `src/data/menu.ts`.

Or skip — not high impact.

### Backlinks

Most powerful SEO move. Get listed on:
- TripAdvisor (highest priority)
- TheFork / OpenTable
- Local food blogs (Munich-Italian, Stadtmagazine München, GoOut, Yelp DE)
- "Best pizza in Munich" listicles — email blogger, offer free tasting in exchange for fair review

Each high-quality DE-language backlink moves you up Google's "best Italian Munich" ranking.

---

## 7. Verify things Claude already shipped

Run these checks after deploy:

### Schema validation
- https://search.google.com/test/rich-results
- Test URLs: `/`, `/contact` (FAQ), `/about`, `/en`, `/it`, `/en/about`
- All should validate at least: Restaurant + Menu (home), Restaurant + FAQ (contact), Restaurant + Breadcrumb (rest)

### hreflang validation
- https://www.merkle.com/seo-tools/hreflang-tags-checker
- Test each: `/`, `/en`, `/it`, `/about`, `/en/about`, `/it/about`
- All 3 language alternates should be detected

### Sitemap
- Open `https://www.trattoria-marano.de/sitemap.xml` in browser
- Should list 21 URLs (7 routes × 3 locales)
- Each URL should have `<xhtml:link rel="alternate" hreflang="...">` siblings

### Robots
- Open `https://www.trattoria-marano.de/robots.txt`
- Should disallow `/admin`, `/api/`, `/blog`
- Sitemap line should point to `trattoria-marano.de/sitemap.xml` (NOT olinkakancirova)

### OG card preview
- https://www.opengraph.xyz/ → paste homepage URL
- Should show hero image, title in DE, correct description

---

## When you're ready to revisit, send Claude

- ✅ Lighthouse / PageSpeed report URLs (after deploy)
- ✅ Google rating + review count (skip if you do step 2 instead)
- ✅ Real social URLs (IG/FB/TripAdvisor/TheFork) — skip ones you don't have
- ✅ List of backlinks acquired (so I can update structured data + add citations)
- ✅ Issues from Search Console (after 1 week of indexing)

I'll incorporate all of it.
