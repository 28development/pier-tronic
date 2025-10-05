import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";
import { getRequestLocale } from "./i18n-request";
import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import Script from "next/script";
import { headers as getHeaders } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pier-Tronic",
  description: "Pier-Tronic, the ultimate music festival",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const headersList = await getHeaders();
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host') ?? 'localhost:3000';
  const protocol = headersList.get('x-forwarded-proto') ?? 'https';
  const origin = `${protocol}://${host}`;
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script id="ld-json-org" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Pier-Tronic",
            "url": origin + "/",
            "logo": origin + "/next.svg",
            "sameAs": [

            ]
          })}
        </Script>
        <Script id="ld-json-website" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Pier-Tronic",
            "url": origin + "/",
          })}
        </Script>
        <BubbleBackground
          interactive={true}
          className="fixed inset-0 z-0 pointer-events-none bg-white bg-none"
          colors={{
            first: '255, 220, 220',   // soft red
            second: '255, 235, 205',  // soft orange/peach
            third: '210, 230, 255',   // soft blue
            fourth: '255, 245, 235',  // very light orange
            fifth: '240, 240, 255',   // very light violet (neutral)
            sixth: '255, 230, 240',   // very light pink
          }}
        />
        <div className="relative z-10">
          <HeroHeader />
          {children}
          <FooterSection />
        </div>
      </body>
    </html>
  );
}
