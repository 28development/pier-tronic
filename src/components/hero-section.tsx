"use client";

import { HlsVideo } from "@/components/hls-video";
import { LogoCloud } from "@/components/logo-cloud";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/locale-context";
import { ARTISTS, Event } from "@/lib/data";
import { Calendar, ChevronDown, Clock, Mail, MapPin, Phone, Ticket, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

export default function HeroSection({ event }: { event: Event }) {
  const { t, locale } = useLocale();
  const activeEvent = event;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Array of video URLs for the hero background.
  // Prefer the event's dedicated promo video, otherwise rotate artist clips.
  const videoUrls = useMemo(() => {
    if (activeEvent.heroVideo) {
      return [activeEvent.heroVideo];
    }

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
  }, [activeEvent.artists, activeEvent.heroVideo]);

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
              poster={activeEvent.heroImage || activeEvent.poster || "/images/party.webp"}
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
              poster={activeEvent.heroImage || activeEvent.poster || "/images/party.webp"}
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layer gradient overlay */}
        <div className="absolute h-dvh inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/85" />
        <div className="absolute h-dvh inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="mx-auto max-w-6xl px-6 py-32 lg:px-12 lg:py-40 w-full">
          <div className="max-w-4xl">
            {/* Main Content */}
            <motion.div
              key={activeEvent.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Main Headline Group */}
              <div className="space-y-4">
                {activeEvent.subtitle && (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
                    style={{
                      color: "var(--event-accent)",
                      borderColor: "color-mix(in oklab, var(--event-accent) 50%, transparent)",
                      backgroundColor: "color-mix(in oklab, var(--event-accent) 12%, transparent)",
                    }}
                  >
                    {activeEvent.subtitle[locale as "en" | "de"] ||
                      activeEvent.subtitle.en}
                  </motion.span>
                )}
                <motion.h1
                  id="hero-heading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05]"
                >
                  {activeEvent.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed"
                >
                  {activeEvent.description[locale as "en" | "de"] ||
                    activeEvent.description.en}
                </motion.p>
              </div>

              {/* Event Info - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap items-center gap-3 text-white"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                  <Calendar className="size-4" style={{ color: "var(--event-accent)" }} />
                  <span className="text-sm font-semibold">
                    {activeEvent.date}
                  </span>
                </div>
                {activeEvent.time && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                    <Clock className="size-4" style={{ color: "var(--event-accent)" }} />
                    <span className="text-sm font-semibold">
                      {activeEvent.time}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                  <MapPin className="size-4" style={{ color: "var(--event-accent)" }} />
                  <span className="text-sm font-semibold">
                    {activeEvent.venueName || activeEvent.location}
                  </span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-3 pt-2"
              >
                <Button
                  asChild
                  size="lg"
                  className="font-semibold text-base px-8 h-12 rounded-full shadow-lg transition-transform hover:scale-[1.03]"
                  style={{
                    backgroundColor: "var(--event-accent)",
                    color: "var(--event-accent-foreground)",
                  }}
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
                  className="bg-white/15 backdrop-blur-md border-white/40 text-white hover:bg-white hover:text-black font-semibold text-base px-8 h-12 rounded-full transition-all duration-300 shadow-lg shadow-black/20"
                >
                  <a href="#artists">
                    <Users className="mr-2 size-5" />
                    {t("content_lineup")}
                  </a>
                </Button>
              </motion.div>

              {/* Contact Info - Secondary utility links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-white/10"
              >
                <span className="text-xs text-white/50 uppercase tracking-wider font-medium">
                  {t("hero_questions")}
                </span>
                <a
                  href="tel:+31634392524"
                  className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="size-3.5" />
                  <span>+31 6 34 39 25 24</span>
                </a>
                <a
                  href="mailto:info@piertronic.events"
                  className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="size-3.5" />
                  <span>info@piertronic.events</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Fade Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-transparent z-10" />

      {/* Scroll Down Indicator */}
      <motion.a
        href="#artists"
        aria-label="Scroll to artists"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ top: "calc(100dvh - 4.5rem)" }}
        className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-5" />
        </motion.div>
      </motion.a>

      <LogoCloud partners={activeEvent.partners} />
    </section>
  );
}
