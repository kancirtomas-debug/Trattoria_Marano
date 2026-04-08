"use client"
import { useLanguage } from "@/context/LanguageContext"
import { t } from "@/lib/translations"

const placeholders = [
  { id: 1,  aspect: "aspect-square",  label: "Pizza Margherita" },
  { id: 2,  aspect: "aspect-[4/5]",   label: "Pasta Carbonara" },
  { id: 3,  aspect: "aspect-[3/4]",   label: "Antipasti misti" },
  { id: 4,  aspect: "aspect-square",  label: "Trattoria interior" },
  { id: 5,  aspect: "aspect-[4/3]",   label: "Pizza Tartufo" },
  { id: 6,  aspect: "aspect-[3/4]",   label: "Tiramisu Marano" },
  { id: 7,  aspect: "aspect-square",  label: "Gnocchi quattro formaggi" },
  { id: 8,  aspect: "aspect-[4/5]",   label: "Wood-fired oven" },
  { id: 9,  aspect: "aspect-[3/4]",   label: "Bruschetta al pomodoro" },
  { id: 10, aspect: "aspect-square",  label: "Aperol Spritz" },
  { id: 11, aspect: "aspect-[4/3]",   label: "Restaurant atmosphere" },
  { id: 12, aspect: "aspect-[3/4]",   label: "Panna cotta" },
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
      <div className="bg-charcoal text-cream py-16 text-center grain">
        <p className="mono-label-light mb-3">Trattoria Marano</p>
        <h1 className="font-heading text-display-lg">{t.gallery.title[lang]}</h1>
        <p className="text-warmgray-400 mt-2">{t.gallery.sub[lang]}</p>
      </div>

      <div className="container-wide py-14">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {placeholders.map((p, i) => (
            <div
              key={p.id}
              className={`break-inside-avoid ${p.aspect} relative overflow-hidden rounded-xl group cursor-pointer`}
            >
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
