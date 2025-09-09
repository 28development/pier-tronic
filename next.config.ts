import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "de", "nl"],
    defaultLocale: "en",
    localeDetection: false,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
    ],
  },
};

export default nextConfig;
