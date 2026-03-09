import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, ArrowRight, Phone } from "lucide-react"
import ContactForm from "@/components/contact-form"
import Reveal from "@/components/ui/reveal"

export const metadata: Metadata = {
  title: "Kalendár udalostí",
  description: "Termíny kurzov, víkendových pobytov a prednášok na rok 2025 a 2026.",
}

const events = [
  { date: "23.5 – 25.5.2025", title: "Cesta k sebe cez slová ktoré liečia",                     type: "pobyt",     href: "/vikendovy-pobyt" },
  { date: "7.6.2025",          title: "Psychosomatika ľudského tela",                             type: "prednáška", href: "/kurzy" },
  { date: "20.9.2025",         title: "Kurz domácej homeopatie",                                  type: "kurz",      href: "/kurzy" },
  { date: "10.10.2025",        title: "Pobyt o komunikácii – cesta k sebe cez slová ktoré liečia", type: "pobyt",     href: "/vikendovy-pobyt" },
  { date: "25.10.2025",        title: "Kurz domácej homeopatie",                                  type: "kurz",      href: "/kurzy" },
  { date: "22.11.2025",        title: "Kurz domácej homeopatie",                                  type: "kurz",      href: "/kurzy" },
  { date: "13.12.2025",        title: "Kurz domácej homeopatie",                                  type: "kurz",      href: "/kurzy" },
  { date: "10.1.2026",         title: "Kurz domácej homeopatie",                                  type: "kurz",      href: "/kurzy" },
  { date: "30.1. – 1.2.2026",  title: "Telo ako zrkadlo duše",                                    type: "pobyt",     href: "/vikendovy-pobyt" },
  { date: "28.2.2026",         title: "Kurz domácej homeopatie",                                  type: "kurz",      href: "/kurzy" },
]

const typeColors: Record<string, string> = {
  pobyt:     "bg-accent-100 text-accent-700",
  kurz:      "bg-primary-100 text-primary-700",
  prednáška: "bg-green-100 text-green-700",
}

export default function KalendarPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-default">
        <Reveal>
          <div className="mb-14">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">Termíny</p>
            <h1 className="heading-display text-5xl sm:text-6xl">Kalendár udalostí<br />2025 a 2026</h1>
            <p className="mt-4 text-neutral-500 text-lg max-w-xl">
              Chcete sa prihlásiť? Vyplňte formulár nižšie alebo zavolajte na{" "}
              <a href="tel:+421907926904" className="text-primary-600 hover:underline font-medium">+421 907 926 904</a>.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Events list */}
          <div className="lg:col-span-3 space-y-4">
            {events.map((ev, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <Link
                  href={ev.href}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-neutral-200 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 transition-all group"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <Calendar size={20} className="text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-primary-600 text-sm font-semibold">{ev.date}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[ev.type]}`}>
                        {ev.type}
                      </span>
                    </div>
                    <p className="text-neutral-900 font-medium group-hover:text-primary-600 transition-colors">
                      {ev.title}
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-neutral-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Sign up form */}
          <Reveal direction="right" className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-soft border border-neutral-200 p-6 sticky top-28">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Phone size={18} className="text-primary-600" />
                </div>
                <h2 className="font-heading font-bold text-xl text-neutral-900">Prihlásiť sa</h2>
              </div>
              <ContactForm sourceForm="calendar-form" />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
