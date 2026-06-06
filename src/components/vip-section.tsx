"use client";

import { useEvent } from "@/contexts/event-context";
import { useLocale } from "@/contexts/locale-context";
import type { TranslationKey } from "@/lib/translations";
import { Crown, Disc3, Lock, Sofa, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import type { LucideIcon } from "lucide-react";
import { BorderBeam } from "./magic-ui/border-beam";
import { Button } from "./ui/button";
import { AnimatedGroup } from "./ui/animated-group";
import { TextEffect } from "./ui/text-effect";

const Vip3DScene = dynamic(
  () => import("./vip-3d-scene").then((m) => m.Vip3DScene),
  { ssr: false }
);

interface VipBenefit {
  icon: LucideIcon;
  titleKey: TranslationKey;
  descKey: TranslationKey;
}

const BENEFITS: VipBenefit[] = [
  { icon: Zap, titleKey: "vip_b1_title", descKey: "vip_b1_desc" },
  { icon: Disc3, titleKey: "vip_b2_title", descKey: "vip_b2_desc" },
  { icon: Lock, titleKey: "vip_b3_title", descKey: "vip_b3_desc" },
  { icon: Sofa, titleKey: "vip_b4_title", descKey: "vip_b4_desc" },
];

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring" as const, bounce: 0.3, duration: 1.4 },
    },
  },
};

export default function VipSection() {
  const { t } = useLocale();
  const { activeEvent } = useEvent();

  return (
    <section id="vip" className="px-4 py-12 md:px-6 md:py-20 lg:py-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-amber-300/15 bg-neutral-950 shadow-2xl">
        {/* Animated 3D backdrop */}
        <Vip3DScene className="pointer-events-none absolute inset-0 h-full w-full opacity-80" />

        {/* Readability + ambience overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,rgba(245,200,110,0.18),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/20 to-neutral-950/70" />

        <div className="relative z-10 px-6 py-16 sm:px-10 md:px-14 md:py-24">
          {/* Header */}
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <AnimatedGroup
              variants={{
                container: {
                  visible: { transition: { staggerChildren: 0.1 } },
                },
                ...transitionVariants,
              }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-amber-200 backdrop-blur-sm">
                <Crown className="size-3.5" />
                {t("vip_caption")}
              </span>
            </AnimatedGroup>

            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h2"
              className="text-balance bg-gradient-to-b from-white via-amber-50 to-amber-200/70 bg-clip-text text-4xl font-semibold text-transparent lg:text-6xl"
            >
              {t("vip_title")}
            </TextEffect>

            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.3}
              as="p"
              className="text-pretty text-base text-neutral-300 md:text-lg"
            >
              {t("vip_blurb")}
            </TextEffect>
          </div>

          {/* Benefit cards */}
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: { staggerChildren: 0.12, delayChildren: 0.5 },
                },
              },
              ...transitionVariants,
            }}
            className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2"
          >
            {BENEFITS.map(({ icon: Icon, titleKey, descKey }, index) => (
              <motion.div
                key={titleKey}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-colors duration-300 hover:border-amber-300/40 hover:bg-white/[0.07] md:p-7"
              >
                <span className="absolute right-5 top-4 text-5xl font-bold leading-none text-white/5 transition-colors duration-300 group-hover:text-amber-300/10">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative mb-5 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300/20 to-amber-500/5 ring-1 ring-inset ring-amber-300/30">
                  <div className="absolute inset-0 rounded-xl bg-amber-400/10 blur-lg transition-all duration-300 group-hover:blur-xl" />
                  <Icon
                    className="relative size-6 text-amber-200"
                    strokeWidth={1.75}
                  />
                </div>

                <h3 className="relative text-lg font-semibold text-white md:text-xl">
                  {t(titleKey)}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-neutral-400">
                  {t(descKey)}
                </p>

                <BorderBeam
                  duration={8}
                  size={120}
                  delay={index * 2}
                  className="from-transparent via-amber-300/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </motion.div>
            ))}
          </AnimatedGroup>

          {/* CTA */}
          <AnimatedGroup
            variants={{
              container: {
                visible: { transition: { delayChildren: 1 } },
              },
              ...transitionVariants,
            }}
            className="mt-12 flex justify-center"
          >
            <Button
              onClick={() => window.open(activeEvent.ticketsUrl, "_blank")}
              size="lg"
              className="group relative gap-2 overflow-hidden border-0 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 px-8 font-semibold text-neutral-900 shadow-[0_8px_30px_rgba(245,200,110,0.35)] hover:from-amber-200 hover:via-yellow-300 hover:to-amber-200"
            >
              <Sparkles className="size-4" />
              {t("vip_cta")}
            </Button>
          </AnimatedGroup>
        </div>
      </div>
    </section>
  );
}
