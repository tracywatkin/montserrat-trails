import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Language } from "./translations";

const STORAGE_KEY = "montserrat-trails-language";
const SUPPORTED: Language[] = ["en", "es", "ca"];

function detectInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored as Language)) {
    return stored as Language;
  }

  const browserLangs = window.navigator.languages ?? [window.navigator.language];
  for (const lang of browserLangs) {
    const code = lang.toLowerCase().split("-")[0];
    if (code === "ca") return "ca";
    if (code === "es") return "es";
    if (code === "en") return "en";
  }
  return "en";
}

type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };
type TranslationDict = Widen<(typeof translations)["en"]>;

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => detectInitialLanguage());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
