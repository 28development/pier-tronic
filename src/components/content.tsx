"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/locale-context";
import { Event } from "@/lib/data";
import { CalendarDays, ChevronRight, Clock, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedGroup } from "./ui/animated-group";
import { TextEffect } from "./ui/text-effect";

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

export default function ContentSection({ event }: { event: Event }) {
  const { t, locale } = useLocale();
  const activeEvent = event;
  const highlights =
    activeEvent.highlights[locale as "en" | "de"] || activeEvent.highlights.en;

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${activeEvent.id}`}
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="size-full overflow-hidden rounded-2xl border shadow-md p-2"
          >
            <Image
              className="rounded-(--radius) grayscale hover:grayscale-0 transition-all duration-300"
              src={activeEvent.heroImage || "/images/party.webp"}
              alt={activeEvent.name}
              loading="lazy"
              width={1600}
              height={1200}
            />
          </motion.div>
        </AnimatePresence>

        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div className="space-y-6">
            <TextEffect
              key={activeEvent.id + "-content-title"}
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.4}
              as="h2"
              className="text-4xl font-medium"
            >
              {activeEvent.name}
            </TextEffect>

            {/* Event meta */}
            <dl className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <CalendarDays
                  className="size-4 shrink-0"
                  style={{ color: "var(--event-accent)" }}
                />
                <dd className="font-medium">{activeEvent.date}</dd>
              </div>
              <div className="flex items-center gap-3">
                <Clock
                  className="size-4 shrink-0"
                  style={{ color: "var(--event-accent)" }}
                />
                <dd className="font-medium">{activeEvent.time}</dd>
              </div>
              <div className="flex items-start gap-3">
                <MapPin
                  className="size-4 shrink-0 mt-0.5"
                  style={{ color: "var(--event-accent)" }}
                />
                <dd className="font-medium">
                  {activeEvent.venueName || activeEvent.locationFull}
                  {activeEvent.venueAddress && (
                    <span className="block text-muted-foreground font-normal">
                      {activeEvent.venueAddress}
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
          <div className="space-y-6">
            <TextEffect
              key={activeEvent.id + "-content-blurb"}
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.6}
              as="p"
            >
              {activeEvent.description[locale as "en" | "de"] ||
                activeEvent.description.en}
            </TextEffect>

            <ul className="space-y-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span
                    className="mt-1.5 size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--event-accent)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.8 },
                  },
                },
                ...transitionVariants,
              }}
            >
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="gap-1 pr-1.5"
              >
                <Link href="#artists">
                  <span>{t("content_lineup")}</span>
                  <ChevronRight className="size-2" />
                </Link>
              </Button>
            </AnimatedGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
