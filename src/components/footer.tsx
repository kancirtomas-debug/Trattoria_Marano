import Link from "next/link"

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-heading font-bold text-xl text-white block">Olinka Kancirova</span>
              <span className="text-primary-400 italic text-sm">Ľúbiť ma je ľahké</span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
              Homeopatia, psychosomatika a komunikácia. Sprevádzam ľudí ich liečivým procesom od roku 2014.
            </p>
          </div>

          {/* Služby */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Služby</h4>
            <ul className="space-y-3">
              {[
                { href: "/kurzy",            label: "Kurzy" },
                { href: "/vikendovy-pobyt",  label: "Víkendový pobyt" },
                { href: "/komunikacna-hra",  label: "Komunikačná hra" },
                { href: "/e-booky",          label: "E-booky" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Info</h4>
            <ul className="space-y-3">
              {[
                { href: "/#o-mne",   label: "O mne" },
                { href: "/kalendar", label: "Kalendár udalostí" },
                { href: "/recenzie", label: "Recenzie" },
                { href: "/blog",     label: "Blog" },
                { href: "/kontakt",  label: "Kontakt" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+421907926904" className="hover:text-white transition-colors">+421 907 926 904</a>
              </li>
              <li>
                <a href="mailto:olinka692@gmail.com" className="hover:text-white transition-colors">olinka692@gmail.com</a>
              </li>
              <li className="text-neutral-500 leading-relaxed">
                Volgogradská 13, Pala Centrum<br />Prešov 080 01
              </li>
              <li className="text-neutral-500 text-xs leading-relaxed pt-1">
                Po 8–17 · Ut 8–15 · Št 8–16 · Pi 8–13
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
          <p>&copy; {year} Olinka Kancirova. Všetky práva vyhradené.</p>
          <div className="flex gap-5">
            <Link href="/ochrana-sukromia" className="hover:text-neutral-400 transition-colors">Ochrana súkromia</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
