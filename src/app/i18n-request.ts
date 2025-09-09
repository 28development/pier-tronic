import { cookies, headers } from "next/headers";
import { defaultLocale, languages, type AppLocale } from "./i18n";

const LOCALE_COOKIE = "NEXT_LOCALE";

export async function getRequestLocale(): Promise<AppLocale> {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
    if (cookieLocale && languages.includes(cookieLocale as AppLocale)) {
        return cookieLocale as AppLocale;
    }
    // Fallback to Accept-Language header
    const h = await headers();
    const accept = h.get("accept-language") || "";
    const preferred = accept.split(",")[0]?.split("-")[0]?.toLowerCase();
    if (preferred && languages.includes(preferred as AppLocale)) {
        return preferred as AppLocale;
    }
    return defaultLocale;
}

export async function setRequestLocale(locale: AppLocale) {
    const cookieStore = await cookies();
    cookieStore.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
}

export { LOCALE_COOKIE };


