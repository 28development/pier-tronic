"use client";

import { Button } from "@/components/ui/button";
import { useEvent } from "@/contexts/event-context";
import { useLocale } from "@/contexts/locale-context";
import { ChevronRight } from "lucide-react";
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

export default function ContentSection() {
  const { t, locale } = useLocale();
  const { activeEvent } = useEvent();

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
          <TextEffect
            key={activeEvent.id + "-content-title"}
            preset="fade-in-blur"
            speedSegment={0.3}
            delay={0.4}
            as="h2"
            className="text-4xl font-medium"
          >
            {activeEvent.name === "Pulse of the Pier"
              ? t("content_title")
              : activeEvent.name}
          </TextEffect>
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
