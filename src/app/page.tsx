import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone, Mail, CheckCircle2, Calendar, BookOpen, Users, Heart, Star } from "lucide-react"
import ContactForm from "@/components/contact-form"
import Reveal from "@/components/ui/reveal"
import { featuredReviews } from "@/data/reviews"

const events = [
  { date: "23.5 – 25.5.2025", title: "Cesta k sebe cez slová ktoré liečia" },
  { date: "7.6.2025",         title: "Psychosomatika ľudského tela" },
  { date: "20.9.2025",        title: "Kurz domácej homeopatie" },
  { date: "10.10.2025",       title: "Pobyt o komunikácii – cesta k sebe cez slová ktoré liečia" },
  { date: "25.10.2025",       title: "Kurz domácej homeopatie" },
  { date: "22.11.2025",       title: "Kurz domácej homeopatie" },
  { date: "13.12.2025",       title: "Kurz domácej homeopatie" },
  { date: "10.1.2026",        title: "Kurz domácej homeopatie" },
  { date: "30.1. – 1.2.2026", title: "Telo ako zrkadlo duše" },
  { date: "28.2.2026",        title: "Kurz domácej homeopatie" },
]

const services = [
  {
    icon: Users,
    title: "Víkendový pobyt",
    description: "Revolučná metóda prepájajúca emócie, komunikáciu a zdravie. Hotel Atrium, Vysoké Tatry.",
    href: "/vikendovy-pobyt",
    price: "od 600 €",
  },
  {
    icon: Heart,
    title: "Kurzy homeopatie",
    description: "Kurz domácej homeopatie, psychosomatika a kurzy komunikácie. Prezenčne aj online.",
    href: "/kurzy",
    price: "od 35 €",
  },
  {
    icon: BookOpen,
    title: "E-booky",
    description: "Digitálne knižky o komunikácii, homeopatii a plánoch podľa krvných skupín.",
    href: "/e-booky",
    price: "od 19 €",
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://www.olinkakancirova.sk/wp-content/uploads/2024/04/Doma-82-scaled.webp"
            alt="Olinka Kancirova"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/50 to-transparent" />
        </div>

        <div className="container-wide relative z-10 py-24">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-8">
              <Heart size={14} className="text-primary-400 fill-primary-400" />
              Homeopatia · Psychosomatika · Komunikácia
            </div>

            <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] mb-6">
              Ľúbiť ma<br />
              <span className="text-primary-300">je ľahké</span>
            </h1>

            <p className="text-white/75 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
              Je veľmi dôležité prevziať zodpovednosť za svoj zdravotný stav a pochopiť, čo sa nám telo snaží povedať.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-2xl hover:bg-primary-700 transition-all active:scale-[0.98] shadow-warm group text-base"
              >
                Objednať sa
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#o-mne"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all text-base"
              >
                Viac o mne
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-sm">
              {[
                { value: "4000+", label: "klientov" },
                { value: "10+",   label: "rokov praxe" },
                { value: "2014",  label: "od roku" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-heading font-bold text-3xl text-white">{s.value}</div>
                  <div className="text-white/50 text-xs uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO QUOTE ──────────────────────────────── */}
      <section className="section-padding bg-cream-50">
        <div className="container-narrow text-center">
          <Reveal>
            <blockquote className="font-heading italic text-2xl sm:text-3xl text-neutral-700 leading-relaxed">
              &ldquo;Veľmi často k nám prichádzajú ľudia, ktorí sú obeťou svojho stavu, ale po správnom homeopatickom lieku prichádza energia, sila a s nimi dobré zdravie a bohatší život plný nových možností.&rdquo;
            </blockquote>
            <p className="mt-6 text-primary-600 font-semibold text-sm uppercase tracking-widest">— Olinka Kancirova</p>
          </Reveal>
        </div>
      </section>

      {/* ── O MNE ────────────────────────────────────── */}
      <section id="o-mne" className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Images collage */}
            <Reveal direction="left">
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-soft-lg aspect-[3/4]">
                    <Image
                      src="https://www.olinkakancirova.sk/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-14-at-16.06.38.webp"
                      alt="Olinka Kancirova"
                      width={400}
                      height={533}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 768px) 50vw, 250px"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-soft aspect-square">
                    <Image
                      src="https://www.olinkakancirova.sk/wp-content/uploads/2024/04/Doma-88-scaled.webp"
                      alt="Olinka Kancirova doma"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 768px) 50vw, 200px"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-soft aspect-square">
                    <Image
                      src="https://www.olinkakancirova.sk/wp-content/uploads/2024/04/V-ordinacii-16-scaled.webp"
                      alt="Olinka v ordinácii"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 768px) 50vw, 200px"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-soft-lg aspect-[3/4]">
                    <Image
                      src="https://www.olinkakancirova.sk/wp-content/uploads/2024/05/Doma-139-scaled.jpg"
                      alt="Olinka Kancirova"
                      width={400}
                      height={533}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 768px) 50vw, 250px"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Text */}
            <Reveal direction="right">
              <div>
                <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">O mne</p>
                <h2 className="heading-display text-4xl sm:text-5xl mb-6 text-balance">
                  Môj zaujímavý životný príbeh
                </h2>
                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                    Po rozvode rodičov som ostala žiť sama s mamou, o ktorú som sa usilovne zo všetkých síl starala od svojich šiestich rokov až skoro do 35. Celé obdobie som hľadala u mami lásku a uznanie, ktoré sa nie a nie dostaviť.
                  </p>
                  <p>
                    Stihla som pracovať v zahraničí, vydať sa a priviesť na svet dvoch úžasných synov. Mala som svoju značku detského oblečenia, dielňu, kamenný obchod. Potom som prevádzkovala 14 rokov malý penzión.
                  </p>
                  <p>
                    Stopkou v tomto maratóne sa stalo ochorenie. Po viac ako 3,5 roku chodenia po lekároch mi zistili rakovinu v takom štádiu, že ma poslali domov. Nechcela som zomrieť — tak som začala hľadať cestu.
                  </p>
                  <p>
                    Našla som ju v homeopatii, psychosomatike, psychológii, komunikácii, kabale a práci na sebe. Keďže som perfekcionista a túžim veciam rozumieť do hĺbky, začala som homeopatiu študovať a otvorila si vlastnú prax.
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  {[
                    "Od roku 2014 robím pravidelne Kurz domácej homeopatie",
                    "Viac ako 4000 ľudí sme spoločne rozobrali a nanovo zložili",
                    "Žijem to čo rozprávam — neustálou prácou na sebe sa stále zlepšujem",
                    "Každý nový poznatek ihneď používam pri svojich klientoch",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-primary-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-700 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all active:scale-[0.98] shadow-sm hover:shadow-warm group"
                >
                  Objednať sa
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Second about section — more story */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">Prečo práve ja?</p>
                <h2 className="heading-display text-3xl sm:text-4xl mb-6">
                  Prečo by som mohla byť prínosom pre Vás?
                </h2>
                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                    K homeopatii sa pridala psychosomatika, komunikácia a jej vplyv na zdravie. Štúdium úrovní vedomia podľa Davida R. Hawkinsa, M.D, Ph.D. dalo veľa mojich vedomostí a skúseností do úžasného systému mojej práce.
                  </p>
                  <p>
                    Moje myslenie v pozícii pozorovateľa a sprievodcu za zdravím ma naučilo vytvárať nekonečné množstvo užitočných otázok, pri ktorých si mnohí ľudia sami dokážu vyriešiť svoje problémy.
                  </p>
                  <p>
                    V súčasnosti sprevádzam ľudí ich liečivým procesom so všetkými možnými problémami a zo všetkých sociálnych skupín. Hlavne takých, ktorí už všade boli, všetko skúsili, no stále sa necítia dobre.
                  </p>
                  <p>
                    Toto je naozaj iba taká malá ochutnávka z môjho zaujímavého života, ktorý sa neustále mení. To všetko, čo sa vo mne počas života nahromadilo, zo mňa robí naozaj ľudskú empatickú bytosť plnú prijatia a lásky.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div className="rounded-2xl overflow-hidden shadow-soft-xl aspect-[4/3]">
                <Image
                  src="https://www.olinkakancirova.sk/wp-content/uploads/2024/04/V-ordinacii-16-scaled.webp"
                  alt="Olinka v ordinácii"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────── */}
      <section className="section-padding bg-cream-50">
        <div className="container-wide">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">Čo ponúkam</p>
              <h2 className="heading-display text-4xl sm:text-5xl">
                Služby a produkty
              </h2>
              <p className="mt-4 text-neutral-500 text-lg">
                Využívam nazbierané vedomosti a skúsenosti z môjho života vo veľkej láske a pokore, aby každý mohol isť svojím tempom, no smerom iba k lepšiemu.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <Link href={s.href} className="card group flex flex-col h-full">
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors">
                    <s.icon size={22} className="text-primary-600" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-neutral-900 mb-2">{s.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed flex-1">{s.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-primary-600 font-semibold text-sm">{s.price}</span>
                    <span className="text-neutral-400 group-hover:text-primary-600 transition-colors flex items-center gap-1 text-sm font-medium">
                      Zistiť viac <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALENDAR ─────────────────────────────────── */}
      <section id="kalendar" className="section-padding bg-neutral-950 text-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <p className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">Termíny</p>
                <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-6">
                  Kalendár udalostí<br />2025 a 2026
                </h2>
                <p className="text-neutral-400 leading-relaxed mb-8">
                  Chcete sa prihlásiť? Vyplňte formulár alebo zavolajte na{" "}
                  <a href="tel:+421907926904" className="text-primary-400 hover:underline">+421 907 926 904</a>.
                </p>
                <Link
                  href="/kalendar"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-primary-500 text-primary-400 font-semibold rounded-xl hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all group"
                >
                  Zobraziť všetky termíny
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div className="space-y-3">
                {events.map((ev, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary-500/30 transition-all group"
                  >
                    <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-primary-600/20">
                      <Calendar size={18} className="text-primary-400" />
                    </div>
                    <div>
                      <div className="text-primary-300 text-xs font-semibold mb-0.5">{ev.date}</div>
                      <div className="text-white text-sm font-medium group-hover:text-primary-200 transition-colors">
                        {ev.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── RECENZIE ─────────────────────────────────── */}
      <section className="section-padding bg-cream-50">
        <div className="container-wide">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">Recenzie</p>
              <h2 className="heading-display text-4xl sm:text-5xl">
                Čo hovoria klienti
              </h2>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-neutral-800 text-lg">4.8</span>
                <span className="text-neutral-500 text-sm">· 25 Google recenzií</span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((review, i) => (
              <Reveal key={review.id} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-7 shadow-soft border border-neutral-100 flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(review.rating)].map((_, s) => (
                      <Star key={s} size={15} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  {/* Text */}
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
                      <p className="font-semibold text-neutral-900 text-sm">{review.name}</p>
                      <p className="text-xs text-neutral-400">{review.timeAgo} · Google</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="text-center mt-10">
              <Link
                href="/recenzie"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-primary-200 text-primary-700 font-semibold rounded-xl hover:bg-primary-50 hover:border-primary-400 transition-all group"
              >
                Zobraziť všetky recenzie
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────── */}
      <section className="section-padding">
        <div className="container-wide">
          <Reveal>
            <div className="relative rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 px-8 py-16 sm:px-14 sm:py-20 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "24px 24px"}} />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white tracking-tight mb-5">
                  Ste pripravení na zmenu?
                </h2>
                <p className="text-primary-100 text-lg leading-relaxed mb-10">
                  Každý deň je fascinujúca improvizácia. Som za to neskutočne vďačná, že môžem pomáhať. Ozvite sa — prvý rozhovor je zadarmo.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-2xl hover:bg-primary-50 transition-all shadow-soft-xl group text-base"
                  >
                    Objednať sa
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="tel:+421907926904"
                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all text-base"
                  >
                    <Phone size={18} /> +421 907 926 904
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────── */}
      <section id="kontakt-form" className="section-padding bg-cream-50">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">Kontakt</p>
                <h2 className="heading-display text-4xl sm:text-5xl mb-6">
                  Objednajte sa
                </h2>
                <p className="text-neutral-500 leading-relaxed mb-8">
                  Objednať sa môžete telefonicky, emailom alebo mi napíšte správu — rada Vám odpoviem na Vaše otázky.
                </p>
                <div className="space-y-4">
                  <a href="tel:+421907926904" className="flex items-center gap-3 text-neutral-700 hover:text-primary-600 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                      <Phone size={18} className="text-primary-600" />
                    </div>
                    <span className="font-medium">+421 907 926 904</span>
                  </a>
                  <a href="mailto:olinka692@gmail.com" className="flex items-center gap-3 text-neutral-700 hover:text-primary-600 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                      <Mail size={18} className="text-primary-600" />
                    </div>
                    <span className="font-medium">olinka692@gmail.com</span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div className="bg-white rounded-2xl shadow-soft p-8">
                <ContactForm sourceForm="homepage-form" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
