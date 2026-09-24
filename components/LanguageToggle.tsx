"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-white/80 hover:bg-white/10" aria-label={lang === "ar" ? "التبديل إلى الإنجليزية" : "Switch to Arabic"}><Languages size={14}/> {lang === "ar" ? "EN" : "عربي"}</button>;
}
