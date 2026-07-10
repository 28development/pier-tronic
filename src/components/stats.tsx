"use client";

import { useLocale } from "@/contexts/locale-context";
import { Event } from "@/lib/data";
import { Music2, Sparkles, Users } from "lucide-react";
import { AnimatedGroup } from "./ui/animated-group";
import { CountingNumber } from "./ui/shadcn-io/counting-number";
import { TextEffect } from "./ui/text-effect";

/** Rough duration in hours parsed from a "21:00 – 03:00" style time range. */
function durationHours(time: string): number {
  const match = time.match(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/);
  if (!match) return 0;
  const [, sh, sm, eh, em] = match.map(Number) as unknown as number[];
  let minutes = eh * 60 + em - (sh * 60 + sm);
  if (minutes <= 0) minutes += 24 * 60;
  return Math.round(minutes / 60);
}

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring" as const, bounce: 0.3, duration: 1.5 },
    },
  },
};

export default function StatsSection({ event }: { event: Event }) {
  const { t } = useLocale();
  const djCount = event.artists.length;
  const hours = durationHours(event.time) || 12;

  return (
    <section id="about" className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h2"
            className="text-4xl font-medium lg:text-5xl"
          >
            {t("stats_title")}
          </TextEffect>
          <TextEffect
            per="line"
            preset="fade-in-blur"
            speedSegment={0.3}
            delay={0.3}
            as="p"
          >
            {t("stats_blurb")}
          </TextEffect>
        </div>

        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: { staggerChildren: 0.15, delayChildren: 0.6 },
              },
            },
            ...transitionVariants,
          }}
          className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0"
        >
          {[
            { Icon: Music2, number: djCount, key: "stats_card1" as const },
            { Icon: Users, number: 3000, key: "stats_card2" as const },
            { Icon: Sparkles, number: hours, key: "stats_card3" as const },
          ].map(({ Icon, number, key }) => (
            <div
              key={key}
              className="space-y-5 md:px-6 group"
            >
              <div className="relative mx-auto size-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-2xl bg-primary/10 group-hover:bg-primary/15 transition-colors" />
                <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl group-hover:blur-2xl transition-all" />
                <Icon className="relative size-7 text-primary" strokeWidth={1.75} />
              </div>
              <div className="text-5xl lg:text-6xl font-bold tracking-tight">
                <CountingNumber
                  number={number}
                  inView={true}
                  transition={{ stiffness: 100, damping: 30 }}
                />
              </div>
              <p className="text-sm uppercase tracking-wider text-muted-foreground">
                {t(key)}
              </p>
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
