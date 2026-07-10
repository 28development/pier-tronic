"use client";

import { useLocale } from "@/contexts/locale-context";
import { EVENTS_BY_DATE } from "@/lib/data";
import { EventCard } from "./event-card";
import { TextEffect } from "./ui/text-effect";

export function EventsOverview() {
  const { t } = useLocale();
  const events = EVENTS_BY_DATE;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl space-y-5 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {t("events_eyebrow")}
        </span>
        <TextEffect
          preset="fade-in-blur"
          speedSegment={0.3}
          as="h1"
          className="text-balance text-4xl font-semibold lg:text-6xl"
        >
          {t("events_overview_title")}
        </TextEffect>
        <TextEffect
          per="line"
          preset="fade-in-blur"
          speedSegment={0.3}
          delay={0.3}
          as="p"
          className="text-pretty text-muted-foreground md:text-lg"
        >
          {t("events_overview_blurb")}
        </TextEffect>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:gap-8">
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            featured={index === 0}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
