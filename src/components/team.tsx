"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { BorderBeam } from "./magic-ui/border-beam";
import { AnimatedGroup } from "./ui/animated-group";
import { TextEffect } from "./ui/text-effect";

// Ana Pak - Featured Artist
const featuredArtist = {
  name: "Ana Pak",
  role: "DJ / PRODUCER",
  location: "Tenerife, Spain",
  images: [
    "/images/ana_pak/IMG_0112.JPG",
    "/images/ana_pak/IMG_0114.JPG",
    "/images/ana_pak/IMG_0577.JPG",
    "/images/ana_pak/IMG_0578.JPG",
    "/images/ana_pak/IMG_0841.JPG",
    "/images/ana_pak/IMG_0845.JPG",
    "/images/ana_pak/IMG_0878.JPG",
    "/images/ana_pak/IMG_3253.JPG",
    "/images/ana_pak/IMG_3987.JPG",
    "/images/ana_pak/IMG_4987.JPG",
    "/images/ana_pak/IMG_5014.JPG",
    "/images/ana_pak/IMG_5085.JPG",
    "/images/ana_pak/IMG_5870.PNG",
    "/images/ana_pak/IMG_5871.PNG",
    "/images/ana_pak/IMG_6948.JPG",
  ],
  videos: ["/videos/ana_pak/CLIP 5.mp4", "/videos/ana_pak/CLIP 7.mp4"],
  links: {
    soundcloud: "https://soundcloud.com/anapak_dj",
    youtube: "https://www.youtube.com/@anapakdj/videos",
  },
};

const members = [
  {
    name: "DJ Nova",
    role: "Deep House / Progressive",
    avatar:
      "https://images.unsplash.com/photo-1516873240891-4bf014598ab4?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#",
  },
  {
    name: "Elijah Blaze",
    role: "Techno / Minimal",
    avatar:
      "https://plus.unsplash.com/premium_photo-1683134703974-3603f427e988?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#",
  },
  {
    name: "Isabella Vibes",
    role: "R&B / Soul Singer",
    avatar:
      "https://images.unsplash.com/photo-1599423424751-54e0c1187a02?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#",
  },
  {
    name: "MC Orion",
    role: "Hip Hop / Trap",
    avatar:
      "https://plus.unsplash.com/premium_photo-1663040288115-757ad61a36f5?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#",
  },
  {
    name: "Ava Beats",
    role: "EDM / Future Bass",
    avatar:
      "https://images.unsplash.com/photo-1511222138462-5d03818b409c?q=80&w=2146&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#",
  },
  {
    name: "Olivia Soundwave",
    role: "Live Vocalist / Pop",
    avatar:
      "https://images.unsplash.com/photo-1617424968117-d8fe85fe5119?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#",
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
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Combine videos and selected images for rotation
  const mediaItems = [
    ...featuredArtist.videos.map((v) => ({ type: "video" as const, src: v })),
    ...featuredArtist.images.slice(0, 6).map((i) => ({ type: "image" as const, src: i })),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoaded(false);
      setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [mediaItems.length]);

  useEffect(() => {
    setIsVideo(mediaItems[currentMediaIndex].type === "video");
    setIsLoaded(false);
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
              <video
                ref={videoRef}
                src={mediaItems[currentMediaIndex].src}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover object-center"
                onLoadedData={() => setIsLoaded(true)}
                onError={(e) => {
                  console.error("Video failed to load", e);
                  setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
                }}
              />
            ) : (
              <Image
                src={mediaItems[currentMediaIndex].src}
                alt={`${featuredArtist.name} - ${currentMediaIndex}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority={currentMediaIndex === 0}
                onLoad={() => setIsLoaded(true)}
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
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 6.99c-.5.3-.9.7-1.3 1.2-.4.5-.7 1-.9 1.6-.2.6-.3 1.2-.3 1.8 0 .6.1 1.2.3 1.8.2.6.5 1.1.9 1.6.4.5.8.9 1.3 1.2.5.3 1 .5 1.6.6v-3.6c-.3-.1-.5-.2-.7-.4-.2-.2-.3-.4-.3-.7 0-.3.1-.5.3-.7.2-.2.4-.3.7-.4V6.4c-.6.1-1.1.3-1.6.6zm8 .6v4.6c.3.1.5.2.7.4.2.2.3.4.3.7 0 .3-.1.5-.3.7-.2.2-.4.3-.7.4v3.6c.6-.1 1.1-.3 1.6-.6.5-.3.9-.7 1.3-1.2.4-.5.7-1 .9-1.6.2-.6.3-1.2.3-1.8 0-.6-.1-1.2-.3-1.8-.2-.6-.5-1.1-.9-1.6-.4-.5-.8-.9-1.3-1.2-.5-.3-1-.5-1.6-.6zm5 4.6c0-.9-.1-1.7-.4-2.5-.3-.8-.7-1.5-1.2-2.1-.5-.6-1.2-1.1-1.9-1.5-.7-.4-1.5-.6-2.4-.7V2h-1v3.4c-.9.1-1.7.3-2.4.7-.7.4-1.4.9-1.9 1.5-.5.6-.9 1.3-1.2 2.1-.3.8-.4 1.6-.4 2.5 0 .9.1 1.7.4 2.5.3.8.7 1.5 1.2 2.1.5.6 1.2 1.1 1.9 1.5.7.4 1.5.6 2.4.7V22h1v-3.4c.9-.1 1.7-.3 2.4-.7.7-.4 1.4-.9 1.9-1.5.5-.6.9-1.3 1.2-2.1.3-.8.4-1.6.4-2.5z" />
              </svg>
              <span className="hidden sm:inline">SoundCloud</span>
            </Link>
            <Link
              href={featuredArtist.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
              className={`h-1 rounded-full transition-all duration-300 ${index === currentMediaIndex
                ? "w-8 bg-white"
                : "w-4 bg-white/30 hover:bg-white/50"
                }`}
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
  const palette = beamPalettes[index % beamPalettes.length];

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
      <Image
        className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
        src={member.avatar}
        alt={`${member.name} – ${member.role}`}
        width="826"
        height="1239"
        loading="lazy"
        decoding="async"
      />
      <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
        <div className="flex justify-between">
          <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider">
            {member.name}
          </h3>
          <span className="text-xs">_0{index + 1}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {member.role}
          </span>
          <Link
            href={member.link}
            className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
          >
            {" "}
            Visit artist profile
          </Link>
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
      } catch { }
    })();
    return () => {
      isActive = false;
    };
  }, []);
  const t = (k: string) => dict?.[k] ?? k;
  return (
    <section id="artists" className="py-16 dark:bg-transparent">
      <div className="mx-auto max-w-5xl border-t px-6">
        <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950">
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
            <p className="text-muted-foreground">
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
