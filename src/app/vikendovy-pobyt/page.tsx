import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, MapPin, Calendar, Users, ArrowRight, Phone } from "lucide-react"
import ContactForm from "@/components/contact-form"
import Reveal from "@/components/ui/reveal"

export const metadata: Metadata = {
  title: "Víkendový pobyt v krásnom prostredí prírody",
  description: "Zaži revolučnú metódu prepájajúcu emócie, komunikáciu a zdravie. Hotel Atrium, Vysoké Tatry. 10.–12.10.2025. 600 €/osoba.",
}

const includes = [
  "Ubytovanie",
  "Stravovanie",
  "Wellness a relax",
  "Interaktívne prednášky",
  "Komunikačná hra",
  "Pracovný zošit – Ako komunikovať",
  "Tombola",
  "Čas pre sebarozvoj",
  "Ranná joga",
  "Fajn ľudia",
  "Ebook ZDARMA – Ako absolvuje komunikačnú hru",
]

const questions = [
  "Komunikuješ tak, aby ti rozumeli?",
  "Chcel/a by si vedieť s láskou v pokoji?",
  "Rozmýšľaš ako mať zdravé sebavedomie?",
  "Nevieš čo robiť, aby sa pred tebou nikto neuzatváral?",
  "Chceš mať raz a navždy jasno?",
  "Aké komunikačné bloky nevedome používaš?",
  "Máš niekedy pocit, že Ti tvoje okolie nerozumie?",
  "Kazia sa Ti vzťahy?",
]

const whyUnique = [
  "Prepája emócie, komunikáciu a zdravie — uznáva, že tieto oblasti sú navzájom späté",
  "Kombinuje racionálny a intuitívny prístup — využíva analytickú myseľ aj emočnú inteligenciu",
  "Pracuje zážitkovo a hravým spôsobom — učenie sa stáva prirodzeným a radostným procesom",
  "Vytvára bezpečný priestor pre experimenty — môžete skúšať nové spôsoby komunikácie bez rizika",
  "Aplikuje holistický prístup — pracuje s vami ako s celkom, nielen s komunikačnými zručnosťami",
]

export default function VikendovyPobytPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <div className="container-wide mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <div>
              <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">Víkendový pobyt</p>
              <h1 className="heading-display text-4xl sm:text-5xl mb-4">
                Cesta k sebe cez slová ktoré liečia
              </h1>
              <p className="text-neutral-500 text-lg leading-relaxed mb-8">
                Zaži revolučnú metódu, ktorá prepája emócie, komunikáciu a zdravie. Nauč sa autenticky, s rešpektom k sebe aj druhým.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Calendar, label: "Termín", value: "10. – 12.10.2025" },
                  { icon: MapPin,   label: "Miesto", value: "Hotel Atrium, Vysoké Tatry" },
                  { icon: Users,    label: "Kapacita", value: "Obmedzený počet miest" },
                  { icon: Phone,    label: "Cena", value: "600 € / osoba" },
                ].map((item) => (
                  <div key={item.label} className="bg-cream-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon size={14} className="text-primary-500" />
                      <span className="text-xs text-neutral-400 uppercase tracking-wider">{item.label}</span>
                    </div>
                    <p className="font-semibold text-neutral-900 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="#prihlasenie"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-sm hover:shadow-warm group"
                >
                  Prihlásiť sa <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:+421907926904"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:border-primary-300 hover:text-primary-600 transition-all"
                >
                  <Phone size={16} /> +421 907 926 904
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              {[
                "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/Green-Illustrative-Happy-World-Family-Day-Instagram-Post-6.png",
                "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/Cesta-k-sebe-cez-slova-ktore-liecia-10.-12.10.2025-2-416x588.png",
                "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/Cesta-k-sebe-cez-slova-ktore-liecia-10.-12.10.2025-1-416x588.png",
                "https://www.olinkakancirova.sk/wp-content/uploads/2024/10/Cesta-k-sebe-cez-slova-ktore-liecia-10.-12.10.2025-416x588.png",
              ].map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-square shadow-soft">
                  <Image
                    src={src}
                    alt={`Víkendový pobyt ${i + 1}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Questions section */}
      <section className="section-padding bg-cream-50">
        <div className="container-default">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="heading-display text-3xl sm:text-4xl">Toto znie povedome?</h2>
              <p className="mt-3 text-neutral-500">Ak sa v týchto otázkach nájdete, tento pobyt je pre vás.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {questions.map((q, i) => (
              <Reveal key={i} delay={(i % 2) * 0.1}>
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-neutral-200 shadow-soft">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-primary-600 font-bold text-xs">{i + 1}</span>
                  </div>
                  <p className="text-neutral-700 text-sm leading-relaxed">{q}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why unique */}
      <section className="section-padding bg-white">
        <div className="container-default">
          <Reveal>
            <div className="max-w-2xl mb-12">
              <h2 className="heading-display text-3xl sm:text-4xl">Čo robí túto metódu unikátnou?</h2>
            </div>
          </Reveal>
          <div className="space-y-4 max-w-2xl">
            {whyUnique.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4">
                  <CheckCircle2 size={20} className="text-primary-500 shrink-0 mt-0.5" />
                  <p className="text-neutral-700 leading-relaxed">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-default">
          <Reveal>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-10">
              V cene je zahrnuté
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {includes.map((item, i) => (
              <Reveal key={i} delay={(i % 3) * 0.07}>
                <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4">
                  <CheckCircle2 size={18} className="text-primary-100 shrink-0" />
                  <span className="text-white text-sm font-medium">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-8 text-primary-100 text-lg font-semibold">
              600,– € na osobu <span className="text-primary-200 font-normal text-base">+ Ebook ZDARMA</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sign up form */}
      <section id="prihlasenie" className="section-padding bg-cream-50">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <h2 className="heading-display text-3xl sm:text-4xl mb-4">Prihláste sa</h2>
                <p className="text-neutral-500 leading-relaxed mb-6">
                  Pre ďalšie informácie ma kontaktujte na čísle{" "}
                  <a href="tel:+421907926904" className="text-primary-600 font-medium hover:underline">+421 907 926 904</a>.
                  Teším sa na vás!
                </p>
                <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5">
                  <div className="text-sm font-semibold text-primary-700 mb-2">📍 Miesto konania</div>
                  <p className="text-neutral-700 text-sm">Hotel Atrium****</p>
                  <p className="text-neutral-500 text-sm">Nový Smokovec 42, 062 01 Vysoké Tatry</p>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <div className="bg-white rounded-2xl shadow-soft border border-neutral-200 p-8">
                <ContactForm sourceForm="weekend-stay-form" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
