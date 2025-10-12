import { defaultLocale, locales } from "@/lib/translations";
import type { MetadataRoute } from "next";

// Generate a sitemap with localized alternates for key static routes
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pier-tronic.com";

  const staticPaths = ["/", "/imprint", "/data-protection"] as const;

  const lastModified = new Date();

  const makeAlternates = (path: string) => {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${baseUrl}/${locale}${path === "/" ? "" : path}`;
    }
    // canonical (x-default) points to default locale
    const canonical = `${baseUrl}/${defaultLocale}${path === "/" ? "" : path}`;
    return { languages, canonical } as const;
  };

  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    // Default non-locale root entry with alternates
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1.0 : 0.5,
      alternates: {
        languages: makeAlternates(path).languages,
        canonical: makeAlternates(path).canonical,
      },
    });

    // Locale-prefixed entries
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${path === "/" ? "" : path}`,
        lastModified,
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1.0 : 0.5,
        alternates: {
          languages: makeAlternates(path).languages,
          canonical: makeAlternates(path).canonical,
        },
      });
    }
  }

  return entries;
}
