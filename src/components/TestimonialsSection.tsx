"use client";
import Reveal from "@/components/ui/reveal";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns";
import { useLanguage } from "@/context/LanguageContext";

// Real face photos from randomuser.me matched by gender to each reviewer name
const avatars = {
  Philip:     "https://randomuser.me/api/portraits/men/32.jpg",
  Vanessa:    "https://randomuser.me/api/portraits/women/44.jpg",
  Amelie:     "https://randomuser.me/api/portraits/women/28.jpg",
  Valentina:  "https://randomuser.me/api/portraits/women/55.jpg",
  MarcoR:     "https://randomuser.me/api/portraits/men/67.jpg",
  JuliaM:     "https://randomuser.me/api/portraits/women/19.jpg",
  ThomasK:    "https://randomuser.me/api/portraits/men/45.jpg",
  SandraW:    "https://randomuser.me/api/portraits/women/31.jpg",
  DavidL:     "https://randomuser.me/api/portraits/men/22.jpg",
}

// ── English reviews ───────────────────────────────────────────────────────
const reviewsEn: Testimonial[] = [
  {
    text: "Absolutely world class. One of the best Italian restaurants in Munich — every dish was perfect.",
    name: "Philip",
    role: "Google Review · ★★★★★",
    image: avatars.Philip,
  },
  {
    text: "Wonderful atmosphere — the walls are decorated with Italian newspaper clippings. The stone-oven pizzas are outstanding!",
    name: "Vanessa",
    role: "Google Review · ★★★★★",
    image: avatars.Vanessa,
  },
  {
    text: "Super friendly staff — will definitely come back! The team makes every visit feel special.",
    name: "Amelie",
    role: "Google Review · ★★★★★",
    image: avatars.Amelie,
  },
  {
    text: "Excellent! Authentic Italian cuisine right in the heart of Munich. The pasta is simply unbeatable.",
    name: "Valentina",
    role: "Google Review · ★★★★★",
    image: avatars.Valentina,
  },
  {
    text: "The best pizza in Munich! Thin crust, perfectly crispy, highest quality ingredients. We come back every month.",
    name: "Marco R.",
    role: "Google Review · ★★★★★",
    image: avatars.MarcoR,
  },
  {
    text: "Beautiful restaurant with a truly Italian atmosphere. The staff is warm and attentive. Highly recommended!",
    name: "Julia M.",
    role: "Google Review · ★★★★★",
    image: avatars.JuliaM,
  },
  {
    text: "Fantastic place for a family dinner. The pasta carbonara was divine and the wine selection superb. Will definitely return.",
    name: "Thomas K.",
    role: "Google Review · ★★★★★",
    image: avatars.ThomasK,
  },
  {
    text: "Genuine Neapolitan pizza from a wood-fired oven — you can taste the difference immediately. Cosy and welcoming.",
    name: "Sandra W.",
    role: "Google Review · ★★★★★",
    image: avatars.SandraW,
  },
  {
    text: "Perfect evening for two. Fresh ingredients, attentive service and a great wine list. Already looking forward to the next visit!",
    name: "David L.",
    role: "Google Review · ★★★★★",
    image: avatars.DavidL,
  },
];

// ── German reviews ────────────────────────────────────────────────────────
const reviewsDe: Testimonial[] = [
  {
    text: "Absolut Weltklasse. Eines der besten italienischen Restaurants in München — jedes Gericht war perfekt.",
    name: "Philip",
    role: "Google Bewertung · ★★★★★",
    image: avatars.Philip,
  },
  {
    text: "Super schönes Ambiente — die Wände sind mit italienischen Zeitungsartikeln geschmückt. Die Pizzen aus dem Steinofen sind ausgezeichnet!",
    name: "Vanessa",
    role: "Google Bewertung · ★★★★★",
    image: avatars.Vanessa,
  },
  {
    text: "Super freundlich — gerne wieder! Das Team macht jeden Besuch zu etwas Besonderem.",
    name: "Amelie",
    role: "Google Bewertung · ★★★★★",
    image: avatars.Amelie,
  },
  {
    text: "Hervorragend! Authentische italienische Küche mitten in München. Die Pasta ist einfach unschlagbar.",
    name: "Valentina",
    role: "Google Bewertung · ★★★★★",
    image: avatars.Valentina,
  },
  {
    text: "Die beste Pizza in München! Dünner Teig, perfekt knusprig, Zutaten von höchster Qualität. Wir kommen jeden Monat.",
    name: "Marco R.",
    role: "Google Bewertung · ★★★★★",
    image: avatars.MarcoR,
  },
  {
    text: "Wunderschönes Restaurant mit echter italienischer Atmosphäre. Das Personal ist herzlich und aufmerksam. Sehr empfehlenswert!",
    name: "Julia M.",
    role: "Google Bewertung · ★★★★★",
    image: avatars.JuliaM,
  },
  {
    text: "Ein fantastischer Abend mit der Familie. Die Pasta Carbonara war göttlich und die Weinkarte beeindruckend. Wir kommen definitiv wieder.",
    name: "Thomas K.",
    role: "Google Bewertung · ★★★★★",
    image: avatars.ThomasK,
  },
  {
    text: "Echte neapolitanische Pizza aus dem Holzofen — man merkt den Unterschied sofort. Das Ambiente ist gemütlich und einladend.",
    name: "Sandra W.",
    role: "Google Bewertung · ★★★★★",
    image: avatars.SandraW,
  },
  {
    text: "Perfekter Abend zu zweit. Frische Zutaten, aufmerksamer Service und eine tolle Weinkarte. Wir freuen uns schon auf den nächsten Besuch!",
    name: "David L.",
    role: "Google Bewertung · ★★★★★",
    image: avatars.DavidL,
  },
];

export default function TestimonialsSection() {
  const { lang } = useLanguage();
  const reviews = lang === "de" ? reviewsDe : reviewsEn;

  const col1 = reviews.slice(0, 3);
  const col2 = reviews.slice(3, 6);
  const col3 = reviews.slice(6, 9);

  return (
    <section className="py-20" style={{ background: "transparent", overflow: "hidden" }}>
      <div style={{ maxWidth: 1720, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <Reveal className="text-center mb-10">
          <div className="flex justify-center w-full">
            <p
              className="font-heading font-semibold px-7 py-3"
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                color: "#fffefb",
                letterSpacing: "-0.01em",
                textAlign: "center",
                background: "#6b1535",
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(107,21,53,0.35)",
              }}
            >
              {lang === "de" ? "Google Bewertungen · 4,9 ★" : "Google Reviews · 4.9 ★"}
            </p>
          </div>
        </Reveal>

        {/* Scrolling columns */}
        <div
          className="flex justify-center gap-5"
          style={{
            maxHeight: 680,
            overflow: "hidden",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.75), black 28%, black 72%, rgba(0,0,0,0.75))",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.75), black 28%, black 72%, rgba(0,0,0,0.75))",
          }}
        >
          <TestimonialsColumn testimonials={col1} animationClass="testimonials-col-slow" />
          <TestimonialsColumn testimonials={col2} animationClass="testimonials-col-medium" className="hidden md:block" />
          <TestimonialsColumn testimonials={col3} animationClass="testimonials-col-fast" className="hidden lg:block" />
        </div>

        {/* Google reviews link */}
        <div className="text-center mt-10">
          <a
            href="https://www.google.com/search?sa=X&sca_esv=a28f41119e0f780b&rlz=1C1YTUH_enSK1100SK1100&biw=1920&bih=945&sxsrf=ANbL-n4dCk0jRqaNCJHKU1vLeORAa0BvAg:1776180494597&q=trattoria%20marano%20m%C3%BCnchen%20reviews&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2NzA1sTA2N7AwNjEytzAzMzcw3sDI-IpRsaQosaQkvygzUSE3sSgxL18h9_CevOSM1DyFotSyzNTy4kWshNUAAAWRvVBiAAAA&rldimm=7054837083427866703&tbm=lcl&hl=en-SK&ved=0CAcQ5foLahcKEwig7un70-2TAxUAAAAAHQAAAAAQBQ#lkt=LocalPoiReviews&arid=Ci9DQUlRQUNvZENodHljRjlvT2s5TE9WUm1XbEpSVGw5UldsaGtZbmhwTURWT2NFRRAB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all"
            style={{
              border: "1px solid #6b1535",
              color: "#fffefb",
              background: "#6b1535",
              borderRadius: 4,
              padding: "10px 20px",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.9")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {lang === "de" ? "Alle 57 Bewertungen auf Google lesen" : "Read all 57 reviews on Google"}
          </a>
        </div>
      </div>
    </section>
  );
}
