"use client"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

const platforms = [
  { name: "Bolt Food",  bg: "bg-[#34D186]", text: "text-white", href: "#" },
  { name: "Wolt",       bg: "bg-[#009DE0]", text: "text-white", href: "#" },
  { name: "Lieferando", bg: "bg-[#FF8000]", text: "text-white", href: "#" },
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
