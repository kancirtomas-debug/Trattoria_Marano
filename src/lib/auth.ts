import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ profile }) {
      const allowed = (process.env.ADMIN_ALLOWED_EMAILS ?? "")
        .split(",")
        .map(e => e.trim().toLowerCase())
        .filter(Boolean)
      const email = profile?.email?.toLowerCase()
      return !!email && allowed.includes(email)
    },
    async session({ session }) {
      return session
    },
  },
  pages: {
    signIn: "/admin",
  },
}
