"use client";

import { useLocale } from "@/contexts/locale-context";
import type { Event } from "@/lib/data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export function EventNav({
  prev,
  next,
}: {
  prev?: Event;
  next?: Event;
}) {
  const { t } = useLocale();

  return (
    <nav
      aria-label={t("events_details")}
      className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12 sm:flex-row sm:items-center sm:justify-between"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("events_back")}
      </Link>

      <div className="flex items-center gap-3">
        {prev && (
          <Link
            href={`/events/${prev.slug}`}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--event-accent)] hover:text-[var(--event-accent)]"
          >
            <ArrowLeft className="size-4" />
            <span className="max-w-[10rem] truncate">{prev.name}</span>
          </Link>
        )}
        {next && (
          <Link
            href={`/events/${next.slug}`}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--event-accent)] hover:text-[var(--event-accent)]"
          >
            <span className="max-w-[10rem] truncate">{next.name}</span>
            <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </nav>
  );
}
