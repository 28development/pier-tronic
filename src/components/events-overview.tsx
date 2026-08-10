"use client";

import { useLocale } from "@/contexts/locale-context";
import {
  getEventsForOverview,
  getFeaturedEvent,
  isEventPast,
} from "@/lib/data";
import { EventCard } from "./event-card";
import { TextEffect } from "./ui/text-effect";

export function EventsOverview() {
  const { t } = useLocale();
  const now = new Date();
  const events = getEventsForOverview(now);
  const featuredId = getFeaturedEvent(now).id;
  const upcoming = events.filter((event) => !isEventPast(event, now));
  const past = events.filter((event) => isEventPast(event, now));

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

      {upcoming.length > 0 && (
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {upcoming.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              featured={event.id === featuredId}
              index={index}
            />
          ))}
        </div>
      )}

      {past.length > 0 && (
        <div className={upcoming.length > 0 ? "mt-20" : "mt-16"}>
          <div className="mb-8 flex items-center gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {t("events_past_title")}
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {past.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                past
                index={upcoming.length + index}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
