"use client";

import {
  defaultLocale,
  translations,
  type Locale,
  type TranslationKey,
} from "@/lib/translations";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  children: ReactNode;
}

const LOCALE_STORAGE_KEY = "pier-tronic-locale";

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (stored && (stored === "en" || stored === "de" || stored === "nl")) {
      setLocaleState(stored);
    }
    setIsInitialized(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  };

  const t = (key: TranslationKey): string => {
    // Use keyof typeof translations[locale] to satisfy type checking,
    // fallback to key if translation is missing
    const translation =
      translations[locale][key as keyof (typeof translations)[typeof locale]];
    return typeof translation === "string" ? translation : key;
  };

  // Prevent hydration mismatch by rendering with default locale first
  if (!isInitialized) {
    return (
      <LocaleContext.Provider
        value={{
          locale: defaultLocale,
          setLocale,
          t: (key: TranslationKey) => {
            const translation =
              translations[defaultLocale][
                key as keyof (typeof translations)[typeof defaultLocale]
              ];
            return typeof translation === "string" ? translation : key;
          },
        }}
      >
        {children}
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
