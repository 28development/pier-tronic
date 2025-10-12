import de from "../../public/locales/de/common.json";
import en from "../../public/locales/en/common.json";
import nl from "../../public/locales/nl/common.json";

export const translations = {
  en,
  de,
  nl,
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof en;

export const defaultLocale: Locale = "en";
export const locales = ["en", "de", "nl"] as const;
