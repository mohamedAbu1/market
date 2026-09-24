"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "ar" | "en";
const LanguageContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({ lang: "ar", setLang: () => undefined });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  useEffect(() => { const saved = localStorage.getItem("malek-language") as Lang | null; if (saved) setLangState(saved); }, []);
  useEffect(() => {
    const direction = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = direction;
    document.documentElement.setAttribute("dir", direction);
    document.body.dir = direction;
    document.body.setAttribute("dir", direction);
    localStorage.setItem("malek-language", lang);
  }, [lang]);
  return <LanguageContext.Provider value={{ lang, setLang: setLangState }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
