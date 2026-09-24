"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/components/LanguageProvider";
import { CartProvider } from "@/components/CartProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider><ThemeProvider attribute="class" defaultTheme="light" enableSystem><LanguageProvider><CartProvider>{children}</CartProvider></LanguageProvider></ThemeProvider></SessionProvider>;
}
