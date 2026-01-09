"use client";

import { useEvent } from "@/contexts/event-context";
import { useLocale } from "@/contexts/locale-context";
import { ARTISTS, Artist, EVENTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HlsVideo } from "./hls-video";
import { BorderBeam } from "./magic-ui/border-beam";
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

const beamPalettes = [
  { from: "#FF6B6B", to: "#FFD93D" },
  { from: "#6BCB77", to: "#4D96FF" },
  { from: "#E36414", to: "#5E60CE" },
  { from: "#F72585", to: "#7209B7" },
  { from: "#00C9A7", to: "#845EC2" },
  { from: "#FFD166", to: "#EF476F" },
];

function ArtistCard({ artist, index }: { artist: Artist; index: number }) {
  const { t } = useLocale();
  const [isHovered, setIsHovered] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isVideo, setIsVideo] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const palette = beamPalettes[index % beamPalettes.length];

  // Create staggered start offset for each card (1.25 seconds apart)
  const startOffset = useMemo(() => index * 1250, [index]);

  // Combine videos and images for rotation
  const mediaItems = useMemo(() => {
    const items: Array<{ type: "video" | "image"; src: string }> = [];

    // Add videos first
    if (artist.videos && artist.videos.length > 0) {
      items.push(
        ...artist.videos.map((v) => ({ type: "video" as const, src: v }))
      );
    }

    // Add images (limit to first 6 for featured, or all for others)
    const imageLimit = artist.isFeatured ? 6 : artist.images.length;
    if (artist.images && artist.images.length > 0) {
      items.push(
        ...artist.images
          .slice(0, imageLimit)
          .map((i) => ({ type: "image" as const, src: i }))
      );
    }

    return items;
  }, [artist.videos, artist.images, artist.isFeatured]);

  // Auto-play rotation with staggered start
  useEffect(() => {
    if (isAutoPlaying && mediaItems.length > 1) {
      let interval: NodeJS.Timeout;

      // Initial delay to stagger the start
      const initialTimeout = setTimeout(() => {
        // Start the interval after the staggered delay
        interval = setInterval(() => {
          setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
        }, 10_000);
      }, startOffset);

      return () => {
        clearTimeout(initialTimeout);
        if (interval) clearInterval(interval);
      };
    }
  }, [isAutoPlaying, mediaItems.length, startOffset]);

  useEffect(() => {
    setIsVideo(mediaItems[currentMediaIndex]?.type === "video");
  }, [currentMediaIndex, mediaItems]);

  // Preload next image
  useEffect(() => {
    if (mediaItems.length > 1) {
      const nextIndex = (currentMediaIndex + 1) % mediaItems.length;
      const nextItem = mediaItems[nextIndex];
      if (nextItem?.type === "image") {
        const img = new window.Image();
        img.src = nextItem.src;
      }
    }
  }, [currentMediaIndex, mediaItems]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentMediaIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length
    );
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleMediaClick = (newIndex: number) => {
    setIsAutoPlaying(false);
    setCurrentMediaIndex(newIndex);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-full rounded-3xl border-2 shadow-2xl overflow-hidden group"
    >
      {/* Permanent Border Beam */}
      <BorderBeam
        duration={12}
        size={200}
        colorFrom={palette.from}
        colorTo={palette.to}
        transition={{ repeat: Infinity }}
      />

      {/* Enhanced Border Beam on Hover */}
      {isHovered && (
        <BorderBeam
          duration={6}
          size={300}
          colorFrom={palette.to}
          colorTo={palette.from}
          transition={{ repeat: Infinity }}
        />
      )}

      {/* Media Background */}
      <div
        className="relative h-[500px] lg:h-[600px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMediaIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {isVideo ? (
              <HlsVideo
                src={mediaItems[currentMediaIndex].src}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="h-full w-full object-cover object-center"
                onError={(e) => {
                  console.error("Video failed to load", e);
                  setCurrentMediaIndex(
                    (prev) => (prev + 1) % mediaItems.length
                  );
                }}
              />
            ) : (
              <Image
                src={mediaItems[currentMediaIndex].src}
                alt={`${artist.name} - ${currentMediaIndex}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                priority={index === 0 && currentMediaIndex === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {mediaItems.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
              aria-label="Previous media"
            >
              <svg
                className="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
              aria-label="Next media"
            >
              <svg
                className="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content Overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            {artist.isFeatured && (
              <motion.span
                className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white mb-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {t("team_featured")}
              </motion.span>
            )}
            <motion.h3
              className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 tracking-tight"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {artist.name}
            </motion.h3>
            <motion.p
              className="text-sm sm:text-base lg:text-lg text-white/80 font-medium mb-1"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {artist.role}
            </motion.p>
            <motion.p
              className="text-xs sm:text-sm text-white/60"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              📍 {artist.location}
            </motion.p>
          </div>

          {/* Social Links */}
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {artist.links.spotify && (
              <Link
                href={artist.links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Spotify"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </Link>
            )}
            {artist.links.soundcloud && (
              <Link
                href={artist.links.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="SoundCloud"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="currentColor"
                  viewBox="0 0 75 33.51"
                >
                  <g>
                    <path d="M75 23.6a10.5 10.5 0 0 1-10.63 9.91H38.82a2.14 2.14 0 0 1-2.12-2.13V3.87a2.34 2.34 0 0 1 1.41-2.24S40.46 0 45.41 0A16.74 16.74 0 0 1 54 2.36a17 17 0 0 1 8 11.08 9.8 9.8 0 0 1 2.71-.37A10.23 10.23 0 0 1 75 23.6ZM33.51 5.61a.83.83 0 1 0-1.65 0c-.7 9.25-1.24 17.92 0 27.14a.83.83 0 0 0 1.65 0c1.33-9.3.77-17.81 0-27.14ZM28.35 8.81a.87.87 0 0 0-1.73 0 103.7 103.7 0 0 0 0 23.95.87.87 0 0 0 1.72 0 93.2 93.2 0 0 0 .01-23.95ZM23.16 8a.84.84 0 0 0-1.67 0c-.79 8.44-1.19 16.32 0 24.74a.83.83 0 0 0 1.66 0c1.23-8.53.85-16.19.01-24.74ZM18 10.41a.86.86 0 0 0-1.72 0 87.61 87.61 0 0 0 0 22.36.85.85 0 0 0 1.69 0A81.68 81.68 0 0 0 18 10.41ZM12.79 16a.85.85 0 0 0-1.7 0c-1.23 5.76-.65 11 .05 16.83a.81.81 0 0 0 1.6 0c.77-5.91 1.36-11.03.05-16.83ZM7.62 15.12a.88.88 0 0 0-1.75 0C4.78 21 5.14 26.18 5.9 32.05c.08.89 1.59.88 1.69 0 .84-5.96 1.23-10.99.03-16.93ZM2.4 18a.88.88 0 0 0-1.75 0c-1 3.95-.69 7.22.07 11.18a.82.82 0 0 0 1.63 0c.88-4.04 1.31-7.24.05-11.18Z" />
                  </g>
                </svg>
              </Link>
            )}
            {artist.links.instagram && (
              <Link
                href={artist.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
                </svg>
              </Link>
            )}
            {artist.links.ra && (
              <Link
                href={artist.links.ra}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Resident Advisor"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3.75 3.75v16.5h3.75V3.75H3.75zm12.75 0v3.75h3.75V3.75H16.5zm-6.375 0v16.5H13.875V3.75h-3.75zm6.375 6.375v3.75h3.75V10.125H16.5zm0 6.375v3.75h3.75V16.5H16.5z" />
                </svg>
              </Link>
            )}
            {artist.links.facebook && (
              <Link
                href={artist.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 3.656 10.99 8.793 12.07v-8.535H5.01V12.07h3.117V9.605c0-3.077 1.833-4.777 4.637-4.777 1.343 0 2.75.24 2.75.24v3.023H14.05c-1.525 0-2 .947-2 1.92v2.399h3.407l-.544 3.398h-2.863V24.14c5.137-1.08 8.793-6.08 8.793-12.07z" />
                </svg>
              </Link>
            )}
            {artist.links.youtube && (
              <Link
                href={artist.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="YouTube"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            )}
            {artist.links.tiktok && (
              <Link
                href={artist.links.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="TikTok"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </Link>
            )}
            {artist.links.website && (
              <Link
                href={artist.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Website"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2s.06-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.92 7.92 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8 8 0 0 1 5.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.7 15.7 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2" />
                </svg>
              </Link>
            )}
          </motion.div>
        </div>

        {/* Media Indicators */}
        {mediaItems.length > 1 && (
          <motion.div
            className="flex gap-2 mt-3 sm:mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {mediaItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleMediaClick(idx)}
                className={cn("h-1 rounded-full transition-all duration-300", {
                  "w-8 bg-white": idx === currentMediaIndex,
                  "w-4 bg-white/30 hover:bg-white/50":
                    idx !== currentMediaIndex,
                })}
                aria-label={`View media ${idx + 1}`}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function TeamSection() {
  const { t, locale } = useLocale();
  const { activeEvent, activeEventIndex, setActiveEventIndex } = useEvent();

  const activeArtists = activeEvent.artists.map((id) => ARTISTS[id]);

  return (
    <section id="artists" className="py-16 dark:bg-transparent">
      <div className="mx-auto max-w-7xl border-t px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 -mt-4 mb-8">
          <span className="text-caption block w-max bg-gray-50 rounded-4xl px-6 dark:bg-gray-950">
            {t("team_caption")}
          </span>
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-full">
            {EVENTS.map((event, idx) => (
              <button
                key={event.id}
                onClick={() => setActiveEventIndex(idx)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
                  activeEventIndex === idx
                    ? "bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                )}
              >
                {event.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
          <div className="sm:w-2/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h2"
                  className="text-3xl font-bold sm:text-4xl"
                >
                  {activeEvent.name}
                </TextEffect>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 sm:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {activeEvent.description[locale as "en" | "de"] ||
                    activeEvent.description.en}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* All Artists Grid */}
        <div className="mt-12 md:mt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEvent.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                    },
                  },
                  ...transitionVariants,
                }}
              >
                <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
                  {activeArtists.map((artist, index) => (
                    <ArtistCard
                      key={`${activeEvent.id}-${artist.id}`}
                      artist={artist}
                      index={index}
                    />
                  ))}
                </div>
              </AnimatedGroup>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
