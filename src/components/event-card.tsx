"use client";

import { useLocale } from "@/contexts/locale-context";
import { Event, getEventArtistNames, isEventPast } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CalendarDays, Clock, MapPin, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { eventAccentStyle } from "./event-theme";

export function EventCard({
  event,
  featured = false,
  past: pastProp,
  index = 0,
}: {
  event: Event;
  featured?: boolean;
  /** When omitted, derived from the event start date. */
  past?: boolean;
  index?: number;
}) {
  const { locale, t } = useLocale();
  const lineup = getEventArtistNames(event);
  const subtitle = event.subtitle?.[locale as "en" | "de"] || event.subtitle?.en;
  const past = pastProp ?? isEventPast(event);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={eventAccentStyle(event)}
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-neutral-950 text-white shadow-xl transition-all duration-300 hover:shadow-2xl",
        featured && !past
          ? "border-[var(--event-accent)]/60 shadow-2xl ring-2 ring-[var(--event-accent)]/70 sm:col-span-2 lg:col-span-2"
          : "border-white/10",
        past && "opacity-80 hover:opacity-100"
      )}
    >
      <Link
        href={`/events/${event.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--event-accent)]"
        aria-label={
          past ? `${event.name} (${t("events_past_badge")})` : event.name
        }
      >
        <div
          className={cn(
            "relative w-full overflow-hidden",
            featured && !past
              ? "aspect-[16/10] sm:aspect-[2/1]"
              : "aspect-[4/5]"
          )}
        >
          <Image
            src={event.poster || event.heroImage || "/images/party.webp"}
            alt={event.name}
            fill
            sizes={
              featured && !past
                ? "(max-width: 1024px) 100vw, 66vw"
                : "(max-width: 640px) 100vw, 33vw"
            }
            className={cn(
              "object-cover object-center transition-transform duration-500 group-hover:scale-105",
              past && "grayscale-[0.45] contrast-90"
            )}
            priority={index === 0}
          />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent",
              past && "via-black/60"
            )}
          />

          <div
            className="absolute inset-x-0 top-0 h-1"
            style={{
              backgroundColor: past
                ? "rgba(255,255,255,0.25)"
                : "var(--event-accent)",
            }}
          />

          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-md">
            <CalendarDays
              className="size-3.5"
              style={{
                color: past ? "rgba(255,255,255,0.65)" : "var(--event-accent)",
              }}
            />
            <span className="text-xs font-semibold">{event.date}</span>
          </div>

          {past ? (
            <div className="absolute right-4 top-4 rounded-full border border-white/25 bg-black/55 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">
              {t("events_past_badge")}
            </div>
          ) : (
            featured && (
              <div
                className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] shadow-lg"
                style={{
                  backgroundColor: "var(--event-accent)",
                  color: "var(--event-accent-foreground)",
                }}
              >
                <Sparkles className="size-3.5" />
                {t("events_featured_badge")}
              </div>
            )
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          {subtitle && (
            <p
              className={cn(
                "mb-2 text-xs font-semibold uppercase tracking-[0.18em]",
                past ? "text-white/50" : ""
              )}
              style={past ? undefined : { color: "var(--event-accent)" }}
            >
              {subtitle}
            </p>
          )}
          <h3
            className={cn(
              "font-bold leading-tight tracking-tight",
              featured && !past
                ? "text-3xl sm:text-4xl lg:text-5xl"
                : "text-2xl",
              past && "text-white/90"
            )}
          >
            {event.name}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/70">
            {event.time && (
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {event.time}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {event.venueName || event.location}
            </span>
          </div>

          {lineup.length > 0 && (
            <p className="mt-2 truncate text-sm text-white/80">
              {lineup.join(" · ")}
            </p>
          )}

          <span
            className={cn(
              "mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-transform duration-300 group-hover:gap-2.5",
              past && "bg-white/12 text-white/85 ring-1 ring-white/15"
            )}
            style={
              past
                ? undefined
                : {
                    backgroundColor: "var(--event-accent)",
                    color: "var(--event-accent-foreground)",
                  }
            }
          >
            {past ? t("events_view_past") : t("events_view_event")}
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
