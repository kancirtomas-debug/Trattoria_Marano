"use client"
import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

const platforms = [
  {
    name: "Wolt",
    href: "https://wolt.com/de/deu/munich/restaurant/trattoria-marano",
    logo: "/images/logo-wolt.png",
    bg: "#6b1535",
  },
  {
    name: "Lieferando",
    href: "https://www.lieferando.de/en/menu/trattoriamarano",
    logo: "/images/logo-lieferando.webp",
    bg: "#201515",
  },
  {
    name: "Uber Eats",
    href: "https://www.ubereats.com",
    logo: "/images/logo-ubereats.png",
    bg: "#142B0A",
  },
]

export default function DeliverySection() {
  const { lang } = useLanguage()
  return (
    <section style={{ background: "transparent", padding: "64px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
        <p className="mono-label" style={{ marginBottom: 12 }}>{t.delivery.title[lang]}</p>
        <p style={{ color: "#939084", marginBottom: 40, maxWidth: 448, margin: "0 auto 40px" }}>{t.delivery.sub[lang]}</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
          {platforms.map(({ name, href, logo, bg }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: "12px 32px",
                background: bg,
                borderRadius: 8,
                border: `1px solid ${bg}`,
                minWidth: 180,
                boxShadow: "rgba(0,0,0,0.08) 0px 4px 18px, rgba(0,0,0,0.04) 0px 2px 7.8px",
                textDecoration: "none",
              }}
            >
              <Image
                src={logo}
                alt={name}
                width={110}
                height={36}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
                unoptimized
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
