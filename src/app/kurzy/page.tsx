import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Tag } from "lucide-react"
import Reveal from "@/components/ui/reveal"

export const metadata: Metadata = {
  title: "Kurzy",
  description: "Kurzy homeopatie, psychosomatiky a komunikácie. Prezenčne aj online. Od 35 €.",
}

const kurzy = [
  {
    title: "3 kroky efektívnej komunikácie – prednáška",
    price: "35,00 €",
    originalPrice: null,
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2025/01/Green-Illustrative-Happy-World-Family-Day-Instagram-Post-2-324x324.png",
    href: "https://www.olinkakancirova.sk/produkt/3-kroky-efektivnej-komunikacie-prednaska/",
    tag: "Online",
  },
  {
    title: "KOMUNIKÁCIA – víkendový pobyt v ČR",
    price: "500,00 €",
    originalPrice: "600,00 €",
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/05/51-324x324.webp",
    href: "https://www.olinkakancirova.sk/produkt/komunikacia-vikendovy-pobyt-v-cr/",
    tag: "Pobyt",
  },
  {
    title: "Kurz domácej homeopatie",
    price: "650,00 €",
    originalPrice: null,
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/3-324x324.png",
    href: "https://www.olinkakancirova.sk/produkt/kurz-domacej-homeopatie/",
    tag: "Prezenčne",
  },
  {
    title: "Kurz domácej homeopatie ONLINE",
    price: "350,00 €",
    originalPrice: null,
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/3-324x324.png",
    href: "https://www.olinkakancirova.sk/produkt/kurz-domacej-homeopatie-online/",
    tag: "Online",
  },
  {
    title: "Kurz Ženské zdravie online",
    price: "35,00 €",
    originalPrice: null,
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/3-324x324.png",
    href: "https://www.olinkakancirova.sk/produkt/kurz-zenske-zdravie-online/",
    tag: "Online",
  },
  {
    title: 'Online kurz \u201EKomunikácia, ktorá lieči\u201C',
    price: "400,00 €",
    originalPrice: null,
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2025/01/Green-Illustrative-Happy-World-Family-Day-Instagram-Post-2-324x324.png",
    href: "https://www.olinkakancirova.sk/produkt/online-kurz-komunikacia-ktora-lieci/",
    tag: "Online",
  },
  {
    title: "Psychosomatika ľudského tela – cesta k uzdraveniu",
    price: "120,00 €",
    originalPrice: null,
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/3-324x324.png",
    href: "https://www.olinkakancirova.sk/produkt/psychosomatika-ludskeho-tela-cesta-k-uzdraveniu/",
    tag: "Prednáška",
  },
  {
    title: "Víkendový pobyt + Online kurz 🌿 Cesta k sebe cez slová, ktoré liečia",
    price: "900,00 €",
    originalPrice: "2 000,00 €",
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/Green-Illustrative-Happy-World-Family-Day-Instagram-Post-6.png",
    href: "https://www.olinkakancirova.sk/produkt/vikendovy-pobyt-online-kurz-cesta-k-sebe-cez-slova-ktore-liecia/",
    tag: "Balíček",
  },
  {
    title: "Víkendový pobyt v krásnom prostredí prírody",
    price: "600,00 €",
    originalPrice: null,
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/Green-Illustrative-Happy-World-Family-Day-Instagram-Post-6.png",
    href: "/vikendovy-pobyt",
    tag: "Pobyt",
  },
  {
    title: "Víkendový pobyt v krásnom prostredí prírody – TELO AKO ZRKADLO DUŠE",
    price: "600,00 €",
    originalPrice: null,
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/Green-Illustrative-Happy-World-Family-Day-Instagram-Post-6.png",
    href: "https://www.olinkakancirova.sk/produkt/vikendovy-pobyt-v-krasnom-prostredi-prirody-telo-ako-zrkadlo-duse/",
    tag: "Pobyt",
  },
  {
    title: "Víkendový pobyt v krásnom prostredí prírody 2",
    price: "750,00 €",
    originalPrice: "1 000,00 €",
    img: "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/Green-Illustrative-Happy-World-Family-Day-Instagram-Post-6.png",
    href: "https://www.olinkakancirova.sk/produkt/vikendovy-pobyt-v-krasnom-prostredi-prirody-2/",
    tag: "Pobyt",
  },
]

export default function KurzyPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-wide">
        <Reveal>
          <div className="mb-14">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">Ponuka</p>
            <h1 className="heading-display text-5xl sm:text-6xl">Kurzy a pobyty</h1>
            <p className="mt-4 text-neutral-500 text-lg max-w-2xl">
              Od roku 2014 robím pravidelne Kurz domácej homeopatie. Moji študenti sa to tak naučia, že ma už nepotrebujú navštevovať — a presne o to ide.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {kurzy.map((k, i) => (
            <Reveal key={i} delay={(i % 4) * 0.08}>
              <a
                href={k.href}
                target={k.href.startsWith("http") ? "_blank" : undefined}
                rel={k.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="product-card group flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={k.img}
                    alt={k.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-neutral-700 rounded-full">
                      {k.tag}
                    </span>
                  </div>
                  {k.originalPrice && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <Tag size={10} /> Zľava
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-heading font-semibold text-base text-neutral-900 leading-snug mb-3 group-hover:text-primary-600 transition-colors flex-1">
                    {k.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      {k.originalPrice && (
                        <p className="text-xs text-neutral-400 line-through">{k.originalPrice}</p>
                      )}
                      <p className="font-bold text-neutral-900 text-lg">{k.price}</p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                      <ShoppingCart size={16} className="text-primary-600 group-hover:text-white transition-colors" />
                    </div>
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
