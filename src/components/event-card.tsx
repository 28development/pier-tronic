"use client";

import { useLocale } from "@/contexts/locale-context";
import { ARTISTS, Event } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CalendarDays, Clock, MapPin, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { eventAccentStyle } from "./event-theme";

export function EventCard({
  event,
  featured = false,
  index = 0,
}: {
  event: Event;
  featured?: boolean;
  index?: number;
}) {
  const { locale, t } = useLocale();
  const lineup = event.artists
    .map((id) => ARTISTS[id]?.name)
    .filter(Boolean) as string[];
  const subtitle = event.subtitle?.[locale as "en" | "de"] || event.subtitle?.en;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={eventAccentStyle(event)}
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-neutral-950 text-white shadow-xl transition-all duration-300 hover:shadow-2xl",
        featured
          ? "border-[var(--event-accent)]/60 shadow-2xl ring-2 ring-[var(--event-accent)]/70 sm:col-span-2 lg:col-span-2"
          : "border-white/10"
      )}
    >
      <Link
        href={`/events/${event.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--event-accent)]"
        aria-label={event.name}
      >
        {/* Poster */}
        <div
          className={cn(
            "relative w-full overflow-hidden",
            featured ? "aspect-[16/10] sm:aspect-[2/1]" : "aspect-[4/5]"
          )}
        >
          <Image
            src={event.poster || event.heroImage || "/images/party.webp"}
            alt={event.name}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Accent top border */}
          <div
            className="absolute inset-x-0 top-0 h-1"
            style={{ backgroundColor: "var(--event-accent)" }}
          />

          {/* Date pill */}
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-md">
            <CalendarDays className="size-3.5" style={{ color: "var(--event-accent)" }} />
            <span className="text-xs font-semibold">{event.date}</span>
          </div>

          {/* Featured badge */}
          {featured && (
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
          )}
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          {subtitle && (
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--event-accent)" }}
            >
              {subtitle}
            </p>
          )}
          <h3
            className={cn(
              "font-bold leading-tight tracking-tight",
              featured ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl"
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
            className="mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-transform duration-300 group-hover:gap-2.5"
            style={{
              backgroundColor: "var(--event-accent)",
              color: "var(--event-accent-foreground)",
            }}
          >
            {t("events_view_event")}
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
