import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/header";
import { LocaleProvider } from "@/contexts/locale-context";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://piertronic.events/"),
  title: {
    default: "Pier-Tronic",
    template: "%s | Pier-Tronic",
  },
  description:
    "Pier-Tronic – the ultimate music festival.",
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
      "Pier-Tronic – the ultimate music festival.",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "Pier-Tronic Logo",
      },
      {
        url: "/apple-icon.png",
        width: 180,
        height: 180,
        alt: "Pier-Tronic Logo",
      },
    ],
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pier-Tronic",
    description:
      "Pier-Tronic – the ultimate music festival.",
    images: ["/web-app-manifest-512x512.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LocaleProvider>
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
        </LocaleProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Pier-Tronic",
              url: "https://piertronic.events/",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://piertronic.events/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
