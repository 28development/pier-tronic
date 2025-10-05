import { createInstance, i18n as I18nType } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import { promises as fs } from "fs";
import path from "path";
import { AppLocale, defaultLocale, languages } from "./i18n";

type Resources = Record<string, { common: Record<string, string> }>;

async function loadResources(): Promise<Resources> {
    const resources: Resources = {} as Resources;
    await Promise.all(
        languages.map(async (lng) => {
            const filePath = path.join(process.cwd(), "public", "locales", lng, "common.json");
            const raw = await fs.readFile(filePath, "utf-8");
            resources[lng] = { common: JSON.parse(raw) };
        })
    );
    return resources;
}

export async function getServerT(lng?: string) {
    const resources = await loadResources();
    const locale = (lng && languages.includes(lng as AppLocale) ? lng : defaultLocale) as AppLocale;

    const i18n = createInstance();
    await i18n
        .use(initReactI18next)
        .init({
            resources,
            lng: locale,
            fallbackLng: defaultLocale,
            supportedLngs: languages as unknown as string[],
            ns: ["common"],
            defaultNS: "common",
            interpolation: { escapeValue: false },
        });

    return i18n.getFixedT(locale, "common");
}


