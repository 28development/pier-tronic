import ContentSection from "@/components/content";
import { EventNav } from "@/components/event-nav";
import { EventThemeProvider } from "@/components/event-theme";
import Features from "@/components/feature";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats";
import TeamSection from "@/components/team";
import TicketsSection from "@/components/tickets-section";
import VipSection from "@/components/vip-section";
import type { Event } from "@/lib/data";

export function EventExperience({
  event,
  prev,
  next,
}: {
  event: Event;
  prev?: Event;
  next?: Event;
}) {
  return (
    <EventThemeProvider event={event}>
      <HeroSection event={event} />
      <TeamSection event={event} />
      <ContentSection event={event} />
      <TicketsSection event={event} />
      <StatsSection event={event} />
      <Features />
      <VipSection event={event} />
      <EventNav prev={prev} next={next} />
    </EventThemeProvider>
  );
}
