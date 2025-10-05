import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getRequestLocale } from "./i18n-request";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pier-tronic.com"),
  title: {
    default: "Pier-Tronic",
    template: "%s | Pier-Tronic",
  },
  description:
    "Pier-Tronic – the ultimate electronic music festival in Germany.",
  applicationName: "Pier-Tronic",
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Pier-Tronic",
    title: "Pier-Tronic",
    description:
      "Pier-Tronic – the ultimate electronic music festival in Germany.",
    images: [
      {
        url: "/window.svg",
        width: 1200,
        height: 630,
        alt: "Pier-Tronic Festival",
      },
    ],
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pier-Tronic",
    description:
      "Pier-Tronic – the ultimate electronic music festival in Germany.",
    images: ["/window.svg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:shadow-md"
        >
          Skip to main content
        </a>
        <BubbleBackground
          interactive={true}
          className="fixed inset-0 z-0 pointer-events-none bg-white bg-none"
          colors={{
            first: "255, 220, 220", // soft red
            second: "255, 235, 205", // soft orange/peach
            third: "210, 230, 255", // soft blue
            fourth: "255, 245, 235", // very light orange
            fifth: "240, 240, 255", // very light violet (neutral)
            sixth: "255, 230, 240", // very light pink
          }}
        />
        <div className="relative z-10">
          <HeroHeader />
          {children}
          <FooterSection />
        </div>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Pier-Tronic",
              url: "https://pier-tronic.com/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://pier-tronic.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
