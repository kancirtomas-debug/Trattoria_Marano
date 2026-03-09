import type { Metadata } from "next"
import Image from "next/image"
import { ShoppingCart, Tag } from "lucide-react"
import Reveal from "@/components/ui/reveal"

export const metadata: Metadata = {
  title: "E-booky",
  description: "Digitálne knihy o komunikácii, homeopatii a plánoch podľa krvných skupín. Od 19 €.",
}

const ebooks = [
  {
    title: "Ako komunikovať?",
    price: "25,00 €",
    originalPrice: null,
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/9-324x324.png",
    href: "https://www.olinkakancirova.sk/produkt/ako-komunikovat/",
  },
  {
    title: "Plán pre krvnú skupinu 0",
    price: "25,00 €",
    originalPrice: "50,00 €",
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/18-324x324.png",
    href: "https://www.olinkakancirova.sk/produkt/plan-pre-krvnu-skupinu-0/",
  },
  {
    title: "Plán pre krvnú skupinu A",
    price: "25,00 €",
    originalPrice: "50,00 €",
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/21-324x324.png",
    href: "https://www.olinkakancirova.sk/produkt/plan-pre-krvnu-skupinu-a/",
  },
  {
    title: "Plán pre krvnú skupinu AB",
    price: "25,00 €",
    originalPrice: "50,00 €",
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/19-324x324.png",
    href: "https://www.olinkakancirova.sk/produkt/plan-pre-krvnu-skupinu-ab/",
  },
  {
    title: "Plán pre krvnú skupinu B",
    price: "25,00 €",
    originalPrice: "50,00 €",
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/18-324x324.png",
    href: "https://www.olinkakancirova.sk/produkt/plan-pre-krvnu-skupinu-b/",
  },
  {
    title: "Začíname s homeopatiou",
    price: "19,00 €",
    originalPrice: null,
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/9-324x324.png",
    href: "https://www.olinkakancirova.sk/produkt/zaciname-s-homeopatiou/",
  },
]

export default function EBookyPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-wide">
        <Reveal>
          <div className="mb-14">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">Digitálne knihy</p>
            <h1 className="heading-display text-5xl sm:text-6xl">E-booky</h1>
            <p className="mt-4 text-neutral-500 text-lg max-w-2xl">
              Praktické digitálne knižky o komunikácii, homeopatii a individuálnych plánoch podľa krvných skupín — ihneď dostupné po zakúpení.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ebooks.map((b, i) => (
            <Reveal key={i} delay={(i % 3) * 0.1}>
              <a
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="product-card group flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-cream-100">
                  <Image
                    src={b.img}
                    alt={b.title}
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {b.originalPrice && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <Tag size={10} /> Zľava 50%
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors flex-1">
                    {b.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      {b.originalPrice && (
                        <p className="text-sm text-neutral-400 line-through">{b.originalPrice}</p>
                      )}
                      <p className="font-bold text-neutral-900 text-xl">{b.price}</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl group-hover:bg-primary-700 transition-colors shadow-sm hover:shadow-warm">
                      <ShoppingCart size={15} /> Kúpiť
                    </button>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
