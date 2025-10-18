import { locales } from "@/lib/translations";
import type { MetadataRoute } from "next";

// Generate a sitemap with localized alternates for key static routes
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://piertronic.events";

  const staticPaths = ["/", "/imprint", "/data-protection"] as const;

  const lastModified = new Date();

  const makeAlternates = (path: string) => {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${baseUrl}/${locale}${path === "/" ? "" : path}`;
    }
    return { languages } as const;
  };

  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    if (path === "/") {
      // Home: list the default entry once with localized alternates
      entries.push({
        url: `${baseUrl}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 1.0,
        alternates: {
          languages: makeAlternates(path).languages,
        },
      });
      continue;
    }

    // Other static pages exist only without locale prefixes
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
