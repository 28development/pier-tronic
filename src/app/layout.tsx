import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";
import { getRequestLocale } from "./i18n-request";
import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";

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
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
