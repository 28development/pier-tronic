export const languages = ["en", "de", "nl"] as const;
export type AppLocale = typeof languages[number];

export const defaultLocale: AppLocale = "en";

export const namespaces = ["common"] as const;
export type AppNamespace = typeof namespaces[number];

export const fallbackLng: AppLocale = "en";


