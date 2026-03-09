import type { Metadata } from "next"
import Link from "next/link"
import { Star, ArrowRight, ExternalLink } from "lucide-react"
import Reveal from "@/components/ui/reveal"
import { reviews } from "@/data/reviews"

export const metadata: Metadata = {
  title: "Recenzie – Olinka Kancirová",
  description: "Čo hovoria klienti o spolupráci s Olinkou Kancirovou. 25 Google recenzií, hodnotenie 4.8 z 5.",
}

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "text-amber-400 fill-amber-400" : "text-neutral-200 fill-neutral-200"}
        />
      ))}
    </div>
  )
}

export default function RecenziePage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-wide">

        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-6">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">Google recenzie</p>
            <h1 className="heading-display text-4xl sm:text-5xl mb-4">Čo hovoria klienti</h1>
            <p className="text-neutral-500 text-lg leading-relaxed">
              Skutočné skúsenosti ľudí, ktorí prešli cestu zmeny spolu s Olinkou.
            </p>
          </div>
        </Reveal>

        {/* Overall rating card */}
        <Reveal delay={0.05}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 bg-white rounded-2xl border border-neutral-100 shadow-soft px-10 py-8 max-w-lg mx-auto mb-16">
            <div className="text-center">
              <div className="font-heading font-bold text-6xl text-neutral-900 leading-none">4.8</div>
              <StarRating rating={5} size={20} />
              <p className="text-neutral-500 text-sm mt-2">z 5 hviezdičiek</p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-neutral-200" />
            <div className="text-center">
              <div className="font-heading font-bold text-4xl text-neutral-900 leading-none">25</div>
              <p className="text-neutral-500 text-sm mt-1">Google recenzií</p>
              <a
                href="https://g.page/r/CcOIBqB5YoISEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-xs text-primary-600 font-medium hover:underline"
              >
                Napísať recenziu <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* All reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <Reveal key={review.id} delay={(i % 3) * 0.07}>
              <div className="bg-white rounded-2xl p-7 shadow-soft border border-neutral-100 flex flex-col h-full">
                {/* Stars + time */}
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={review.rating} />
                  <span className="text-xs text-neutral-400">{review.timeAgo}</span>
                </div>

                {/* Review text */}
                <p className="text-neutral-600 text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                    <span className="text-primary-700 font-semibold text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">
                      {review.name}
                      {review.isLocal && (
                        <span className="ml-2 text-xs font-normal text-neutral-400">Miestny sprievodca</span>
                      )}
                    </p>
                    <p className="text-xs text-neutral-400">Google recenzia</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.1}>
          <div className="mt-16 text-center">
            <p className="text-neutral-500 mb-6 text-sm">
              Boli ste na kurze, pobyte alebo konzultácii? Podeľte sa o vašu skúsenosť.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://g.page/r/CcOIBqB5YoISEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-sm hover:shadow-warm group"
              >
                Napísať Google recenziu
                <ExternalLink size={15} />
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:border-primary-300 hover:text-primary-700 transition-all group"
              >
                Objednať sa
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  )
}
