import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star, ArrowRight } from "lucide-react"
import Reveal from "@/components/ui/reveal"

export const metadata: Metadata = {
  title: "Komunikačná hra – Nauč sa byť OK!",
  description: "Komunikačná hra, ktorá ťa naučí, ako byť OK! Zábavnou formou rozvíjaj komunikačné zručnosti, emocionálnu inteligenciu a sebavedomie. Cena: 15 €.",
}

const galleryImages = [
  "https://www.olinkakancirova.sk/wp-content/uploads/2025/04/Kopia-suboru-DSC04009-min-scaled.webp",
  "https://www.olinkakancirova.sk/wp-content/uploads/2025/04/Kopia-suboru-DSC04129-min-scaled.webp",
  "https://www.olinkakancirova.sk/wp-content/uploads/2025/04/Kopia-suboru-DSC04130-min-scaled.webp",
  "https://www.olinkakancirova.sk/wp-content/uploads/2025/04/Kopia-suboru-DSC04144-min-scaled.webp",
  "https://www.olinkakancirova.sk/wp-content/uploads/2025/04/Kopia-suboru-DSC04149-min-scaled.webp",
  "https://www.olinkakancirova.sk/wp-content/uploads/2025/04/Kopia-suboru-DSC04139-min-scaled.webp",
  "https://www.olinkakancirova.sk/wp-content/uploads/2025/04/Kopia-suboru-DSC04143-min-scaled.webp",
  "https://www.olinkakancirova.sk/wp-content/uploads/2025/04/Kopia-suboru-DSC04141-min-scaled.webp",
]

export default function KomunikacnaHraPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero / Product */}
      <div className="container-wide mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Gallery */}
          <Reveal direction="left">
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.slice(0, 4).map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-square shadow-soft">
                  <Image
                    src={src}
                    alt={`Komunikačná hra ${i + 1}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 50vw, 250px"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </Reveal>

          {/* Info */}
          <Reveal direction="right" delay={0.1}>
            <div>
              <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">Komunikačná hra</p>
              <h1 className="heading-display text-4xl sm:text-5xl mb-4">
                Nauč sa byť OK!
              </h1>
              <p className="text-neutral-500 text-lg leading-relaxed mb-6">
                Zábavnou a hravou formou rozvíjaj komunikačné zručnosti, emocionálnu inteligenciu a sebavedomie. Hra, ktorá ťa posunie vpred.
              </p>

              <div className="flex items-center gap-3 mb-8">
                <span className="text-4xl font-bold text-primary-600">15,– €</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.olinkakancirova.sk/komunikacna-hra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-sm hover:shadow-warm group"
                >
                  <ShoppingCart size={16} /> Kúpiť teraz
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:border-primary-300 hover:text-primary-600 transition-all"
                >
                  Mám otázku <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* More gallery images */}
      <section className="section-padding bg-cream-50">
        <div className="container-default">
          <Reveal>
            <h2 className="heading-display text-3xl sm:text-4xl text-center mb-12">Fotogaléria</h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {galleryImages.map((src, i) => (
              <Reveal key={i} delay={(i % 4) * 0.07}>
                <div className="rounded-xl overflow-hidden aspect-square shadow-soft">
                  <Image
                    src={src}
                    alt={`Komunikačná hra detail ${i + 1}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 200px"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-default text-center">
          <Reveal>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
              Pripravená/ý hrať?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
              Objednaj si hru ešte dnes a začni rozvíjať komunikačné zručnosti zábavnou formou.
            </p>
            <a
              href="https://www.olinkakancirova.sk/komunikacna-hra/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-cream-50 transition-all shadow-sm group"
            >
              <ShoppingCart size={18} />
              Kúpiť za 15,– €
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
