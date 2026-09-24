import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const googleConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
const localConfigured = Boolean(process.env.LOCAL_ADMIN_EMAIL && process.env.LOCAL_ADMIN_PASSWORD);

export const authOptions: NextAuthOptions = {
  providers: [
    ...(googleConfigured ? [GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! })] : []),
    ...(localConfigured ? [CredentialsProvider({ name: "Local account", credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } }, async authorize(credentials) { if (credentials?.email === process.env.LOCAL_ADMIN_EMAIL && credentials?.password === process.env.LOCAL_ADMIN_PASSWORD) return { id: "local-admin", name: "Malek Admin", email: process.env.LOCAL_ADMIN_EMAIL }; return null; } })] : []),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET
};
