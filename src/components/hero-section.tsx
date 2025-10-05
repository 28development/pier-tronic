"use client";

import { LogoCloud } from "@/components/logo-cloud";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [dict, setDict] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const lang = new URLSearchParams(window.location.search).get("lang");
        const res = await fetch(
          `/api/i18n/get?ns=common${lang ? `&lang=${lang}` : ""}`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const json = await res.json();
        if (isActive) setDict(json);
      } catch {}
    })();
    return () => {
      isActive = false;
    };
  }, []);

  const t = (k: string) => dict?.[k] ?? k;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Dynamic Background with Video */}
      <div className="absolute inset-0 z-0 h-dvh">
        <video
          className="absolute inset-0 h-dvh w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2747&auto=format&fit=crop&ixlib=rb-4.0.3"
        >
          <source src="/piertronic-hero.webm" type="video/webm" />
          <source src="/piertronic-hero.mp4" type="video/mp4" />
          <source
            src="https://www.pexels.com/download/video/2022395/"
            type="video/mp4"
          />
        </video>

        {/* Multi-layer gradient overlay */}
        <div className="absolute h-dvh inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        <div className="absolute h-dvh inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="mx-auto max-w-6xl px-6 py-32 lg:px-12 lg:py-40 w-full">
          <div className="max-w-4xl">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Main Headline */}
              <div className="space-y-6">
                <motion.h1
                  id="hero-heading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-tight"
                >
                  {t("hero_title")}
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white/90 leading-tight"
                >
                  {t("hero_subtitle")}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg lg:text-xl text-white/70 max-w-2xl leading-relaxed"
                >
                  {t("hero_blurb")}
                </motion.p>
              </div>

              {/* Event Info - Inline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap items-center gap-6 text-white/80"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-white/60" />
                  <span className="text-sm font-medium">Dec 31, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-white/60" />
                  <span className="text-sm font-medium">Tenerife, Spain</span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 font-semibold text-base px-8 h-12"
                >
                  <a href="#tickets">
                    <Ticket className="mr-2 size-5" />
                    {t("hero_cta")}
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white/60 font-semibold text-base px-8 h-12"
                >
                  <a href="#artists">
                    <Users className="mr-2 size-5" />
                    View Lineup
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Fade Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-transparent z-10" />

      <LogoCloud />
    </section>
  );
}
