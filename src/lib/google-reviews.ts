// Google Places API integration. Env-gated.
// Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in Vercel env to enable.
// Without env vars, fetchPlaceData returns null and UI falls back to the static reviews link card.

const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY
const PLACE_ID = process.env.GOOGLE_PLACE_ID

export type Review = {
  author: string
  rating: number
  text: string
  time: number
  profileUrl: string
  authorPhoto?: string
  language?: string
  relativeTime?: string
}

export type PlaceData = {
  rating: number
  userRatingsTotal: number
  reviews: Review[]
} | null

export async function fetchPlaceData(): Promise<PlaceData> {
  if (!PLACES_KEY || !PLACE_ID) return null
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total,reviews&key=${PLACES_KEY}&reviews_sort=newest&reviews_no_translations=false`
    const res = await fetch(url, { next: { revalidate: 21600 } })
    if (!res.ok) return null
    const json = await res.json()
    const r = json.result
    if (!r || typeof r.rating !== "number") return null
    return {
      rating: r.rating,
      userRatingsTotal: r.user_ratings_total ?? 0,
      reviews: (r.reviews ?? []).slice(0, 5).map((rev: {
        author_name: string; rating: number; text: string; time: number;
        author_url: string; profile_photo_url?: string; language?: string;
        relative_time_description?: string;
      }) => ({
        author: rev.author_name,
        rating: rev.rating,
        text: rev.text,
        time: rev.time,
        profileUrl: rev.author_url,
        authorPhoto: rev.profile_photo_url,
        language: rev.language,
        relativeTime: rev.relative_time_description,
      })),
    }
  } catch {
    return null
  }
}
