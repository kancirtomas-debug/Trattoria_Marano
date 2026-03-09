import type { Metadata } from "next"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import ContactForm from "@/components/contact-form"
import Reveal from "@/components/ui/reveal"

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Objednajte sa na konzultáciu. Telefón: +421 907 926 904. Volgogradská 13, Pala Centrum, Prešov.",
}

const hours = [
  { day: "Pondelok",  time: "8:00 – 17:00" },
  { day: "Utorok",    time: "8:00 – 15:00" },
  { day: "Streda",    time: "Zatvorené" },
  { day: "Štvrtok",  time: "8:00 – 16:00" },
  { day: "Piatok",    time: "8:00 – 13:00" },
  { day: "Sobota",    time: "Zatvorené" },
  { day: "Nedeľa",   time: "Zatvorené" },
]

export default function KontaktPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-default">
        <Reveal>
          <div className="mb-14">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">Kontakt</p>
            <h1 className="heading-display text-5xl sm:text-6xl">Objednať sa</h1>
            <p className="mt-4 text-neutral-500 text-lg max-w-xl">
              Objednať sa môžete telefonicky, emailom alebo mi napíšte správu — rada Vám odpoviem na Vaše otázky.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <Reveal direction="left">
            <div className="space-y-8">
              {/* Info cards */}
              <div className="space-y-4">
                <a
                  href="tel:+421907926904"
                  className="card flex items-center gap-4 group hover:border-primary-200 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
                    <Phone size={22} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider mb-0.5">Telefón</p>
                    <p className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      +421 907 926 904
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:olinka692@gmail.com"
                  className="card flex items-center gap-4 group hover:border-primary-200 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
                    <Mail size={22} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider mb-0.5">E-mail</p>
                    <p className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      olinka692@gmail.com
                    </p>
                  </div>
                </a>

                <div className="card flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0">
                    <MapPin size={22} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider mb-0.5">Adresa</p>
                    <p className="font-semibold text-neutral-900">Volgogradská 13, Pala Centrum</p>
                    <p className="text-neutral-500 text-sm">Prešov 080 01</p>
                  </div>
                </div>
              </div>

              {/* Opening hours */}
              <div className="card">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Clock size={18} className="text-primary-600" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-neutral-900">Otváracie hodiny</h3>
                </div>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                      <span className="text-sm text-neutral-600">{h.day}</span>
                      <span className={`text-sm font-medium ${h.time === "Zatvorené" ? "text-neutral-400" : "text-neutral-900"}`}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="right" delay={0.1}>
            <div className="bg-white rounded-2xl shadow-soft border border-neutral-200 p-8">
              <h2 className="font-heading font-bold text-2xl text-neutral-900 mb-6">Napíšte mi</h2>
              <ContactForm sourceForm="contact-page" />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
