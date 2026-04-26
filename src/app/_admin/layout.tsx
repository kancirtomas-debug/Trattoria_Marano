import type { Metadata } from "next"
import SessionProvider from "@/components/admin/SessionProvider"
import { LanguageProvider } from "@/context/LanguageContext"

export const metadata: Metadata = {
  title: "Admin - Trattoria Marano",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <div className="min-h-screen" style={{ background: "#fffdf9" }}>
          {children}
        </div>
      </LanguageProvider>
    </SessionProvider>
  )
}
