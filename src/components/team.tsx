"use client";

import { useLocale } from "@/contexts/locale-context";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { BorderBeam } from "./magic-ui/border-beam";
import { AnimatedGroup } from "./ui/animated-group";
import { TextEffect } from "./ui/text-effect";

// Ana Pak - Featured Artist
const featuredArtist = {
  name: "Ana Pak",
  role: "DJ / PRODUCER",
  location: "Tenerife, Spain",
  images: [
    "/images/ana_pak/IMG_0112.webp",
    "/images/ana_pak/IMG_0114.webp",
    // Show this image first then a video then continue with the rest
    "/images/ana_pak/IMG_0577.webp",
    "/images/ana_pak/IMG_0578.webp",
    "/images/ana_pak/IMG_0841.webp",
    "/images/ana_pak/IMG_0845.webp",
    "/images/ana_pak/IMG_0878.webp",
    "/images/ana_pak/IMG_3253.webp",
    "/images/ana_pak/IMG_3987.webp",
    "/images/ana_pak/IMG_4987.webp",
    "/images/ana_pak/IMG_5014.webp",
    "/images/ana_pak/IMG_5085.webp",
    "/images/ana_pak/IMG_5870.webp",
    "/images/ana_pak/IMG_5871.webp",
    "/images/ana_pak/IMG_6948.webp",
  ],
  videos: [
    //"/videos/ana_pak/ana_pak_1-h264.mp4",
    //"/videos/ana_pak/ana_pak_2-h264.mp4",
    "https://vz-9b35a891-b60.b-cdn.net/a9f79476-87ca-49cf-83bd-c212d90db0f6/playlist.m3u8",
    "https://vz-9b35a891-b60.b-cdn.net/3e92fe92-44e9-4df7-be95-8f4751988b9d/playlist.m3u8",
  ],
  links: {
    soundcloud: "https://soundcloud.com/anapak_dj",
    youtube: "https://www.youtube.com/@anapakdj/videos",
  },
};

const members = [
  {
    name: "Inan Batman",
    role: "Afro House",
    location: "Düsseldorf, Germany",
    avatar: "/images/inan_batman/inan_batman.webp",
    clip: "https://vz-9b35a891-b60.b-cdn.net/1d54506b-e198-4265-8b7c-36bd633a5b67/playlist.m3u8",
    links: {
      instagram: "https://www.instagram.com/inanbatman/?hl=de",
      soundcloud: "https://soundcloud.com/inanbatman",
    },
  },
  {
    name: "Quincy Kluivert",
    role: "Techhouse",
    location: "Amsterdam, Netherlands",
    avatar: "/images/quincy_kluivert/quincy_kluivert_1.webp",
    clip: "https://vz-9b35a891-b60.b-cdn.net/9d3e97d0-910c-46a5-b862-1e2e8b37c116/playlist.m3u8",
    links: {
      website: "https://quincy-kluivert.webnode.nl/",
      instagram: "https://www.instagram.com/quincy_kluivert/",
    },
  },
  {
    name: "DJ DUO Nadia x Natalie",
    role: "Techhouse",
    location: "Düsseldorf, Germany",
    avatar: "/images/nxn/nxn.webp",
    links: {
      website: "http://nxn-official.com/",
      instagram: "https://www.instagram.com/nxn_ofc",
      soundcloud: "https://soundcloud.com/nxn_ofc",
    },
  },
];

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

function FeaturedArtistCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isVideo, setIsVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Combine videos and selected images for rotation
  const mediaItems = useMemo(
    () => [
      ...featuredArtist.videos.map((v) => ({ type: "video" as const, src: v })),
      ...featuredArtist.images
        .slice(0, 6)
        .map((i) => ({ type: "image" as const, src: i })),
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [mediaItems.length]);

  useEffect(() => {
    setIsVideo(mediaItems[currentMediaIndex].type === "video");
  }, [currentMediaIndex, mediaItems]);

  // Preload next image
  useEffect(() => {
    const nextIndex = (currentMediaIndex + 1) % mediaItems.length;
    const nextItem = mediaItems[nextIndex];
    if (nextItem.type === "image") {
      const img = new window.Image();
      img.src = nextItem.src;
    }
  }, [currentMediaIndex, mediaItems]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-full rounded-3xl border-2 shadow-2xl overflow-hidden group col-span-full lg:col-span-2"
    >
      {/* Permanent Border Beam */}
      <BorderBeam
        duration={12}
        size={250}
        colorFrom="#FF6B6B"
        colorTo="#FFD93D"
        transition={{ repeat: Infinity }}
      />

      {/* Enhanced Border Beam on Hover */}
      {isHovered && (
        <BorderBeam
          duration={6}
          size={350}
          colorFrom="#FFD93D"
          colorTo="#F72585"
          transition={{ repeat: Infinity }}
        />
      )}

      {/* Media Background */}
      <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
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
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover object-center"
                  onError={(e) => {
                    console.error("Video failed to load", e);
                    setCurrentMediaIndex(
                      (prev) => (prev + 1) % mediaItems.length
                    );
                  }}
                />
                <source
                  src={mediaItems[currentMediaIndex].src}
                  type="video/mp4"
                />
              </>
            ) : (
              <Image
                src={mediaItems[currentMediaIndex].src}
                alt={`${featuredArtist.name} - ${currentMediaIndex}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority={currentMediaIndex === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content Overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-8 lg:p-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="flex-1 min-w-[250px]">
            <motion.span
              className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white mb-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Featured Artist
            </motion.span>
            <motion.h3
              className="text-4xl lg:text-6xl font-bold text-white mb-2 tracking-tight"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {featuredArtist.name}
            </motion.h3>
            <motion.p
              className="text-lg lg:text-xl text-white/80 font-medium mb-1"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {featuredArtist.role}
            </motion.p>
            <motion.p
              className="text-sm lg:text-base text-white/60"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              📍 {featuredArtist.location}
            </motion.p>
          </div>

          {/* Social Links */}
          <motion.div
            className="flex gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Link
              href={featuredArtist.links.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 75 33.51"
              >
                <g>
                  <path d="M75 23.6a10.5 10.5 0 0 1-10.63 9.91H38.82a2.14 2.14 0 0 1-2.12-2.13V3.87a2.34 2.34 0 0 1 1.41-2.24S40.46 0 45.41 0A16.74 16.74 0 0 1 54 2.36a17 17 0 0 1 8 11.08 9.8 9.8 0 0 1 2.71-.37A10.23 10.23 0 0 1 75 23.6ZM33.51 5.61a.83.83 0 1 0-1.65 0c-.7 9.25-1.24 17.92 0 27.14a.83.83 0 0 0 1.65 0c1.33-9.3.77-17.81 0-27.14ZM28.35 8.81a.87.87 0 0 0-1.73 0 103.7 103.7 0 0 0 0 23.95.87.87 0 0 0 1.72 0 93.2 93.2 0 0 0 .01-23.95ZM23.16 8a.84.84 0 0 0-1.67 0c-.79 8.44-1.19 16.32 0 24.74a.83.83 0 0 0 1.66 0c1.23-8.53.85-16.19.01-24.74ZM18 10.41a.86.86 0 0 0-1.72 0 87.61 87.61 0 0 0 0 22.36.85.85 0 0 0 1.69 0A81.68 81.68 0 0 0 18 10.41ZM12.79 16a.85.85 0 0 0-1.7 0c-1.23 5.76-.65 11 .05 16.83a.81.81 0 0 0 1.6 0c.77-5.91 1.36-11.03.05-16.83ZM7.62 15.12a.88.88 0 0 0-1.75 0C4.78 21 5.14 26.18 5.9 32.05c.08.89 1.59.88 1.69 0 .84-5.96 1.23-10.99.03-16.93ZM2.4 18a.88.88 0 0 0-1.75 0c-1 3.95-.69 7.22.07 11.18a.82.82 0 0 0 1.63 0c.88-4.04 1.31-7.24.05-11.18Z" />
                </g>
              </svg>
              <span className="hidden sm:inline">SoundCloud</span>
            </Link>
            <Link
              href={featuredArtist.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span className="hidden sm:inline">YouTube</span>
            </Link>
          </motion.div>
        </div>

        {/* Media Indicators */}
        <motion.div
          className="flex gap-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {mediaItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMediaIndex(index)}
              className={cn("h-1 rounded-full transition-all duration-300", {
                "w-8 bg-white": index === currentMediaIndex,
                "w-4 bg-white/30 hover:bg-white/50":
                  index !== currentMediaIndex,
              })}
              aria-label={`View media ${index + 1}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function MemberCard({
  member,
  index,
}: {
  member: (typeof members)[number];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const palette = beamPalettes[index % beamPalettes.length];
  const hasClip = Boolean(member.clip);

  // Handle video playback and 5-second timer
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isHovered && hasClip) {
      // Show video and play it
      setShowVideo(true);

      // Wait for video to be ready and play
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(console.error);
        }
      }, 50);

      // Set timer to hide video after 5 seconds
      timeoutRef.current = setTimeout(() => {
        setShowVideo(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else {
      setShowVideo(false);
    }
  }, [isHovered, hasClip]);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative size-full rounded-2xl border shadow-md p-2 group overflow-hidden"
    >
      <div className="relative h-96 w-full rounded-md overflow-hidden group-hover:h-[22.5rem] group-hover:rounded-xl transition-all duration-500">
        <AnimatePresence initial={false}>
          {showVideo && hasClip ? (
            <motion.div
              key="video"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 h-full w-full"
            >
              <video
                ref={videoRef}
                src={member.clip}
                loop
                muted
                playsInline
                className="h-full w-full object-cover object-top"
              />
            </motion.div>
          ) : (
            <motion.div
              key="image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <Image
                className="h-full w-full object-cover object-top grayscale transition-all duration-500 hover:grayscale-0"
                src={member.avatar}
                alt={`${member.name} – ${member.role}`}
                width="826"
                height="1239"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="px-2 pt-2 sm:pb-0 sm:pt-4 overflow-hidden">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold transition-all duration-500 group-hover:tracking-wider mb-2">
            {member.name}
          </h3>

          {/* Expandable content on hover */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
            <div className="overflow-hidden">
              <div className="flex flex-col gap-3 pb-2">
                <div className="flex flex-col gap-1 opacity-0 translate-y-2 transition-all duration-500 delay-75 group-hover:opacity-100 group-hover:translate-y-0">
                  <p className="text-sm font-medium text-foreground/90">
                    {member.role}
                  </p>
                  {member.location && (
                    <p className="text-xs text-muted-foreground">
                      📍 {member.location}
                    </p>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex gap-2 opacity-0 translate-y-2 transition-all duration-500 delay-150 group-hover:opacity-100 group-hover:translate-y-0">
                  {member.links.soundcloud && (
                    <Link
                      href={member.links.soundcloud}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 bg-foreground/10 hover:bg-foreground/20 rounded-full text-foreground text-xs transition-all duration-300 hover:scale-110"
                      aria-label="SoundCloud"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 75 33.51"
                      >
                        <g>
                          <path d="M75 23.6a10.5 10.5 0 0 1-10.63 9.91H38.82a2.14 2.14 0 0 1-2.12-2.13V3.87a2.34 2.34 0 0 1 1.41-2.24S40.46 0 45.41 0A16.74 16.74 0 0 1 54 2.36a17 17 0 0 1 8 11.08 9.8 9.8 0 0 1 2.71-.37A10.23 10.23 0 0 1 75 23.6ZM33.51 5.61a.83.83 0 1 0-1.65 0c-.7 9.25-1.24 17.92 0 27.14a.83.83 0 0 0 1.65 0c1.33-9.3.77-17.81 0-27.14ZM28.35 8.81a.87.87 0 0 0-1.73 0 103.7 103.7 0 0 0 0 23.95.87.87 0 0 0 1.72 0 93.2 93.2 0 0 0 .01-23.95ZM23.16 8a.84.84 0 0 0-1.67 0c-.79 8.44-1.19 16.32 0 24.74a.83.83 0 0 0 1.66 0c1.23-8.53.85-16.19.01-24.74ZM18 10.41a.86.86 0 0 0-1.72 0 87.61 87.61 0 0 0 0 22.36.85.85 0 0 0 1.69 0A81.68 81.68 0 0 0 18 10.41ZM12.79 16a.85.85 0 0 0-1.7 0c-1.23 5.76-.65 11 .05 16.83a.81.81 0 0 0 1.6 0c.77-5.91 1.36-11.03.05-16.83ZM7.62 15.12a.88.88 0 0 0-1.75 0C4.78 21 5.14 26.18 5.9 32.05c.08.89 1.59.88 1.69 0 .84-5.96 1.23-10.99.03-16.93ZM2.4 18a.88.88 0 0 0-1.75 0c-1 3.95-.69 7.22.07 11.18a.82.82 0 0 0 1.63 0c.88-4.04 1.31-7.24.05-11.18Z" />
                        </g>
                      </svg>
                    </Link>
                  )}
                  {member.links.instagram && (
                    <Link
                      href={member.links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 bg-foreground/10 hover:bg-foreground/20 rounded-full text-foreground text-xs transition-all duration-300 hover:scale-110"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
                      </svg>
                    </Link>
                  )}
                  {member.links.website && (
                    <Link
                      href={member.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 bg-foreground/10 hover:bg-foreground/20 rounded-full text-foreground text-xs transition-all duration-300 hover:scale-110"
                      aria-label="Website"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2s.06-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.92 7.92 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8 8 0 0 1 5.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.7 15.7 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isHovered && (
        <BorderBeam
          duration={6}
          size={200}
          colorFrom={palette.from}
          colorTo={palette.to}
          transition={{ repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

export default function TeamSection() {
  const { t } = useLocale();

  return (
    <section id="artists" className="py-16 dark:bg-transparent">
      <div className="mx-auto max-w-5xl border-t px-6">
        <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 rounded-4xl px-6 dark:bg-gray-950">
          {t("team_caption")}
        </span>
        <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
          <div className="sm:w-2/5">
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h2"
              className="text-3xl font-bold sm:text-4xl"
            >
              {t("team_title")}
            </TextEffect>
          </div>
          <div className="mt-6 sm:mt-0">
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.3}
              as="p"
            >
              {t("team_blurb")}
            </TextEffect>
          </div>
        </div>
        {/* Featured Artist Section */}
        <div className="mt-12 md:mt-24">
          <FeaturedArtistCard />
        </div>

        {/* Other Team Members */}
        <div className="mt-16 md:mt-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2">More Artists</h3>
            <p className="text-black/80">
              Meet the talented lineup bringing the energy
            </p>
          </div>
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
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member, index) => (
                <MemberCard key={index} member={member} index={index} />
              ))}
            </div>
          </AnimatedGroup>
        </div>
      </div>
    </section>
  );
}
