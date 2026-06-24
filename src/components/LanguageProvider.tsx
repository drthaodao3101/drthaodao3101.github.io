"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };
const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {}, toggle: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && window.localStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "vi") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", l);
      document.documentElement.lang = l;
    }
  };
  const toggle = () => setLang(lang === "en" ? "vi" : "en");

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
