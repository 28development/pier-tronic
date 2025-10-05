"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BorderBeam } from "./magic-ui/border-beam";
import { AnimatedGroup } from "./ui/animated-group";
import { TextEffect } from "./ui/text-effect";

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
      } catch {}
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
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.6 },
              },
            },
            ...transitionVariants,
          }}
          className="mt-12 md:mt-24"
        >
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <MemberCard key={index} member={member} index={index} />
            ))}
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}
