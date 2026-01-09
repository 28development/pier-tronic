import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/header";
import { EventProvider } from "@/contexts/event-context";
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
  title: "Pier-Tronic",
  description: "Pier-Tronic – the ultimate music festival.",
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
  alternates: {
    canonical: "https://piertronic.events/",
  },
  openGraph: {
    title: "Pier-Tronic",
    description: "Pier-Tronic – the ultimate music festival.",
    type: "website",
    locale: "en",
    url: "https://piertronic.events/",
    siteName: "Pier-Tronic",
    images: [
      {
        url: "/images/PierTronic_Logo.png",
        width: 1200,
        height: 630,
        alt: "Pier-Tronic Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pier-Tronic",
    description: "Pier-Tronic – the ultimate music festival.",
    images: ["/images/PierTronic_Logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Schema for Music Festival Event
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: "Pier-Tronic",
    description: "Pier-Tronic – the ultimate music festival.",
    url: "https://piertronic.events/",
    image: "/images/PierTronic_Logo.png",
    organizer: {
      "@type": "Organization",
      name: "Pier-Tronic",
      url: "https://piertronic.events/",
      logo: {
        "@type": "ImageObject",
        url: "/images/PierTronic_Logo.png",
      },
    },
  };
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LocaleProvider>
          <EventProvider>
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
            <FloatingWhatsApp />
            <CookieConsentBanner />
          </EventProvider>
        </LocaleProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
          suppressHydrationWarning
        />
      </body>
    </html>
  );
}
