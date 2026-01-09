"use client";

import { HlsVideo } from "@/components/hls-video";
import { LogoCloud } from "@/components/logo-cloud";
import { Button } from "@/components/ui/button";
import { useEvent } from "@/contexts/event-context";
import { useLocale } from "@/contexts/locale-context";
import { ARTISTS, EVENTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Calendar, MapPin, Ticket, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

export default function HeroSection() {
  const { t, locale } = useLocale();
  const { activeEvent, activeEventIndex, setActiveEventIndex } = useEvent();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Array of video URLs to rotate based on active event artists
  const videoUrls = useMemo(() => {
    const urls: string[] = [];
    activeEvent.artists.forEach((artistId) => {
      const artist = ARTISTS[artistId];
      if (artist && artist.videos && artist.videos.length > 0) {
        urls.push(...artist.videos);
      }
    });

    // Fallback if no videos
    if (urls.length === 0) {
      urls.push(
        "https://vz-9b35a891-b60.b-cdn.net/a9f79476-87ca-49cf-83bd-c212d90db0f6/playlist.m3u8"
      );
    }

    return urls;
  }, [activeEvent.artists]);

  // Rotate videos every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videoUrls.length);
    }, 10_000);

    return () => clearInterval(interval);
  }, [videoUrls.length]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Dynamic Background with Video */}
      <div className="absolute inset-0 z-0 h-dvh">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeEvent.id}-${currentVideoIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Blurred background video layer - fills viewport */}
            <HlsVideo
              src={videoUrls[currentVideoIndex]}
              className="absolute inset-0 h-dvh w-full object-cover scale-110 blur-3xl brightness-50"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster="/images/party.webp"
              aria-hidden="true"
            />

            {/* Main video layer - preserves aspect ratio */}
            <HlsVideo
              src={videoUrls[currentVideoIndex]}
              className="absolute inset-0 h-dvh w-full object-contain"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster="/images/party.webp"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layer gradient overlay */}
        <div className="absolute h-dvh inset-0 bg-gradient-to-b from-black/70 via-black/50 to-pink-900/50" />
        <div className="absolute h-dvh inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="mx-auto max-w-6xl px-6 py-32 lg:px-12 lg:py-40 w-full">
          <div className="max-w-4xl">
            {/* Event Switcher in Hero */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex gap-2 mb-12 bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-full w-fit"
            >
              {EVENTS.map((event, idx) => (
                <button
                  key={event.id}
                  onClick={() => setActiveEventIndex(idx)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                    activeEventIndex === idx
                      ? "bg-white text-black shadow-lg scale-105"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                >
                  {event.name}
                </button>
              ))}
            </motion.div>

            {/* Main Content */}
            <motion.div
              key={activeEvent.id}
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
                  className="relative text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight hidden"
                >
                  <span className="relative inline-block text-white">
                    {/* Minimal animated gradient text */}
                    <motion.span
                      className="relative z-10 bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, oklch(0.82 0.12 330), oklch(0.84 0.08 120))",
                        backgroundSize: "200% 100%",
                      }}
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {activeEvent.name}
                    </motion.span>
                  </span>
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
                >
                  {activeEvent.name === "Pier-Tronic"
                    ? t("hero_subtitle")
                    : activeEvent.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed"
                >
                  {activeEvent.description[locale as "en" | "de"] ||
                    activeEvent.description.en}
                </motion.p>
              </div>

              {/* Event Info - Inline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap items-center gap-6 text-white"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-white/70" />
                  <span className="text-sm sm:text-base font-semibold">
                    {activeEvent.date}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-white/70" />
                  <span className="text-sm sm:text-base font-semibold">
                    {activeEvent.location}
                  </span>
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
                  className="bg-white text-black hover:bg-white/90 font-semibold text-base px-8 h-12 rounded-full"
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
                  className="bg-white/10 backdrop-blur-md border-white/40 text-white hover:bg-white hover:text-black font-semibold text-base px-8 h-12 rounded-full transition-all duration-300"
                >
                  <a href="#artists">
                    <Users className="mr-2 size-5" />
                    {t("content_lineup")}
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
