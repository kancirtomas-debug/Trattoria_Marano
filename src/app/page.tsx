"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"
import TestimonialsSection from "@/components/TestimonialsSection"
import PrintedMenuSection from "@/components/PrintedMenuSection"

export default function HomePage() {
  const { lang } = useLanguage()

  return (
    <>
      {/* ── Hero + hours = exactly 100vh ─────────────────────── */}
      <div style={{ height: "calc(100vh - 80px)", display: "flex", flexDirection: "column" }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ flex: 1, background: "#fffefb" }}
      >
        {/* Background image — 100% visible */}
        <div className="absolute inset-0">
          {/* Mobile hero */}
          <Image
            src="/images/hero-mobile.webp"
            alt=""
            fill
            priority
            quality={95}
            unoptimized
            className="object-cover md:hidden"
            style={{ objectPosition: "center" }}
            sizes="100vw"
          />
          {/* Desktop hero */}
          <Image
            src="/images/hero.webp"
            alt=""
            fill
            priority
            quality={95}
            unoptimized
            className="object-cover hidden md:block"
            style={{ objectPosition: "70% center" }}
            sizes="100vw"
          />
        </div>

        {/* Text — directly on image, left side */}
        <div className="container-default relative z-10 w-full pt-20 pb-8 md:pt-40 md:pb-16">
          <div
            className="max-w-xl"
            style={{
              marginLeft: "clamp(-210px, calc((1024px - 100vw) / 4), 0px)",
              marginTop: "clamp(-220px, calc((1024px - 100vw) / 4), -60px)",
            }}
          >
            <p className="section-label mb-4 md:mb-6" style={{ fontSize: "0.7em" }}>Ohlmüllerstr. 22 · 81541 München</p>

            <h1
              className="font-heading font-bold mb-4 md:mb-6"
              style={{
                fontSize: "clamp(1.96rem, 5.25vw, 3.85rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                color: "#201515",
              }}
            >
              Trattoria<br />
              <span style={{ color: "#6b1535" }}>Marano</span>
            </h1>

            <p
              className="mb-7 md:mb-10 max-w-md leading-snug"
              style={{ color: "#36342e", fontWeight: 400, fontSize: "clamp(0.7rem, 2.1vw, 0.875rem)" }}
            >
              {t.hero.tagline[lang]}
            </p>

            <div className="flex flex-wrap gap-2">
              <Link href="/#menu" className="btn-orange" style={{ padding: "7px 14px", fontSize: "0.6125rem", gap: 6 }}>
                {t.hero.cta_menu[lang]} <ArrowRight size={10} />
              </Link>
              <Link href="/reserve" className="btn-dark" style={{ padding: "7px 14px", fontSize: "0.6125rem", gap: 6 }}>
                {t.hero.cta_reserve[lang]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hours strip ──────────────────────────────────────── */}
      <div
        style={{ background: "#6b1535", borderTop: "1px solid rgba(0,0,0,0.08)", padding: "18px 0" }}
      >
        <div className="container-default flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-6"
          style={{ color: "#fffefb", textAlign: "center" }}>
          <span className="flex items-center gap-2" style={{ fontSize: "0.84rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            <Clock size={15} />
            {t.hours.title[lang]}
          </span>
          <span style={{ opacity: 0.55, fontSize: "0.84rem" }}>{t.hours.monday[lang]}</span>
          <span className="hidden sm:block w-px h-4" style={{ background: "rgba(255,254,251,0.35)" }} />
          <span style={{ fontSize: "0.84rem", fontWeight: 500 }}>{t.hours.tue_sun[lang]}: {t.hours.lunch[lang]} · {t.hours.dinner[lang]}</span>
        </div>
      </div>

      </div>{/* end 100vh hero wrapper */}

      {/* ── Printed menu — right after hours strip ── */}
      <PrintedMenuSection />

      <div>

          {/* Testimonials */}
          <TestimonialsSection />

          {/* Feature section — asymmetric layout */}
          <section className="py-16">
            <div className="container-default">
              {/* Top row: wide left + narrow right */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
                {/* Events — 3 cols wide */}
                <Link
                  href="/events"
                  className="md:col-span-3 group grid grid-cols-1 md:grid-cols-[1fr_1fr] overflow-hidden"
                  style={{
                    borderRadius: 12, minHeight: 220,
                    border: "1px solid rgba(107,21,53,0.1)",
                    background: "rgba(255,254,251,0.93)",
                    boxShadow: "rgba(107,21,53,0.04) 0px 4px 18px",
                    transition: "box-shadow 200ms, border-color 200ms",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "rgba(107,21,53,0.1) 0px 10px 32px"
                    ;(e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(107,21,53,0.25)"
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "rgba(107,21,53,0.04) 0px 4px 18px"
                    ;(e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(107,21,53,0.1)"
                  }}
                >
                  <div className="flex flex-col justify-between p-8">
                    <p className="section-label font-heading mb-3" style={{ fontSize: "1.05rem", letterSpacing: "0.08em" }}>{lang === "de" ? "Veranstaltungen" : lang === "it" ? "Eventi" : "Events"}</p>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "#36342e" }}>
                      {lang === "de"
                        ? "Feste, Geburtstage, Firmenevents und besondere Anlässe — wir kümmern uns um alles, damit Ihr Abend unvergesslich wird."
                        : lang === "it"
                        ? "Feste, compleanni, eventi aziendali e occasioni speciali — pensiamo a tutto noi, perché la vostra serata sia indimenticabile."
                        : "Parties, birthdays, corporate events and special occasions — we take care of everything so your evening is unforgettable."}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#6b1535" }}>
                      {lang === "de" ? "Mehr erfahren" : lang === "it" ? "Scopri di più" : "Learn more"} <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <div className="relative hidden md:block">
                    <Image
                      src="/images/events-catering.webp"
                      alt={lang === "de" ? "Catering Veranstaltung" : lang === "it" ? "Evento di catering" : "Catering event"}
                      fill
                      sizes="30vw"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                </Link>

                {/* Take Away — 2 cols */}
                <div
                  className="md:col-span-2 flex flex-col justify-between p-8"
                  style={{ borderRadius: 12, minHeight: 220, background: "#201515" }}
                >
                  <p className="section-label font-heading mb-3" style={{ color: "rgba(255,254,251,0.6)", fontSize: "1.05rem", letterSpacing: "0.08em" }}>
                    {lang === "de" ? "Zum Mitnehmen" : lang === "it" ? "Da asporto" : "Take Away"}
                  </p>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,254,251,0.65)" }}>
                    {lang === "de"
                      ? "Fast alle Speisen auch zum Mitnehmen — frisch zubereitet, verpackt zum Genuss zuhause."
                      : lang === "it"
                      ? "Quasi tutti i piatti anche da asporto — preparati al momento, confezionati per gustarli a casa."
                      : "Almost all dishes available to take away — freshly prepared for you to enjoy at home."}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { name: "Wolt", href: "https://wolt.com/de/deu/munich/restaurant/trattoria-marano", logo: "/images/logo-wolt-new.png", logoW: 77, logoH: 21 },
                      { name: "Lieferando", href: "https://www.lieferando.de/en/menu/trattoriamarano", logo: "/images/logo-lieferando-new.png", logoW: 110, logoH: 30 },
                    ].map(({ name, href, logo, logoW, logoH }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={name}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          height: 52,
                          background: "#ffffff",
                          borderRadius: 8,
                          transition: "transform 160ms ease",
                        }}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)")}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)")}
                      >
                        <Image
                          src={logo}
                          alt={name}
                          width={logoW}
                          height={logoH}
                          className="object-contain"
                          style={{ mixBlendMode: "multiply" }}
                          unoptimized
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom row: Solo Pizza — full width strip */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Bereiterangerstr.+18%2C+81451+M%C3%BCnchen"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-8 py-6"
                style={{
                  borderRadius: 12,
                  border: "1px solid rgba(107,21,53,0.1)",
                  background: "rgba(255,254,251,0.93)",
                  boxShadow: "rgba(107,21,53,0.04) 0px 4px 18px",
                  transition: "box-shadow 200ms, border-color 200ms",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "rgba(107,21,53,0.1) 0px 10px 32px"
                  ;(e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(107,21,53,0.25)"
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "rgba(107,21,53,0.04) 0px 4px 18px"
                  ;(e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(107,21,53,0.1)"
                }}
              >
                <div>
                  <p className="section-label font-heading mb-1" style={{ fontSize: "1.05rem", letterSpacing: "0.08em" }}>{lang === "de" ? "Schwesterpizzeria" : lang === "it" ? "Pizzeria gemella" : "Sister Restaurant"}</p>
                  <p className="font-sans text-lg" style={{ color: "rgba(32,21,21,0.7)", fontWeight: 400, letterSpacing: "-0.01em" }}>
                    Solo Pizza · Bereiterangerstr. 18, München
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold shrink-0" style={{ color: "#6b1535" }}>
                  {lang === "de" ? "Route planen" : lang === "it" ? "Indicazioni" : "Get directions"} <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </div>
          </section>


      </div>
    </>
  )
}
