import ContentSection from "@/components/content";
import Features from "@/components/feature";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";
import TicketsSection from "@/components/tickets-section";
import StatsSection from "@/components/stats";
import TeamSection from "@/components/team";
import localFont from "next/font/local";

const frick = localFont({
  src: [
    { path: "../../public/Frick0.3-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/Frick0.3-Regular.woff", weight: "400", style: "normal" },
  ],
  display: "swap",
});

export default function Home() {
  return (
    <div className={frick.className}>
      <HeroSection />
      <TeamSection />
      <ContentSection />
      <TicketsSection />
      <StatsSection />
      <Features />
    </div>
  );
}
