"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Info, Menu, Ticket, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoWordmark } from "./logo";

const menuItems = [
  { key: "team_caption", href: "#artists", icon: Users },
  { key: "tickets_title", href: "#tickets", icon: Ticket },
  { key: "link_about", href: "#about", icon: Info },
];

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const HeroHeader = () => {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [dict, setDict] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuState]);

  const t = (k: string) => dict?.[k] ?? k;

  return (
    <header>
      {/* Mobile Menu Backdrop with Blur */}
      <AnimatePresence>
        {menuState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-20 bg-black/60 backdrop-blur-md lg:hidden"
            onClick={() => setMenuState(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        aria-label="Primary"
        className="fixed w-full px-2 z-30"
      >
        <motion.div
          animate={{
            backgroundColor: isScrolled
              ? "rgba(var(--background), 0.9)"
              : "rgba(0, 0, 0, 0.3)",
            backdropFilter: isScrolled ? "blur(24px)" : "blur(12px)",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={cn(
            "mx-auto mt-4 max-w-7xl px-8 transition-all duration-400 lg:px-16",
            "rounded-3xl border shadow-2xl",
            isScrolled
              ? "border-border/60 shadow-black/10 dark:shadow-black/40 max-w-5xl"
              : "border-white/20 shadow-black/20"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-8 py-5 lg:gap-0 lg:py-6">
            {/* Logo */}
            <motion.div
              variants={itemVariants}
              className="flex w-full justify-between lg:w-auto"
            >
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <LogoWordmark
                  uniColor
                  className={cn(
                    "h-7 transition-all duration-300 drop-shadow-lg",
                    isScrolled ? "text-white" : "text-white"
                  )}
                />
              </Link>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className={cn(
                  "relative z-20 -m-2.5 -mr-4 block p-3 lg:hidden",
                  "rounded-xl transition-all duration-300 overflow-hidden group",
                  "hover:bg-gradient-to-r hover:from-purple-500/20 hover:via-pink-500/20 hover:to-orange-500/20"
                )}
              >
                <motion.div
                  animate={{ rotate: menuState ? 180 : 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                >
                  {menuState ? (
                    <X
                      className={cn(
                        "size-7",
                        isScrolled
                          ? "text-foreground"
                          : "text-white drop-shadow-md"
                      )}
                    />
                  ) : (
                    <Menu
                      className={cn(
                        "size-7",
                        isScrolled
                          ? "text-foreground"
                          : "text-white drop-shadow-md"
                      )}
                    />
                  )}
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              variants={itemVariants}
              className="absolute inset-0 m-auto hidden size-fit lg:block"
            >
              <ul className="flex gap-2">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={index}
                    onHoverStart={() => setHoveredItem(index)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className="relative block px-6 py-3 font-semibold text-base group"
                    >
                      <span
                        className={cn(
                          "relative z-10 transition-colors duration-300",
                          isScrolled
                            ? "text-white/90"
                            : "text-white/90 group-hover:text-white drop-shadow-lg"
                        )}
                      >
                        {t(item.key)}
                      </span>

                      {/* Subtle background fade */}
                      {hoveredItem === index && (
                        <motion.div
                          layoutId="navBackground"
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: isScrolled
                              ? "rgba(0, 0, 0, 0.03)"
                              : "rgba(255, 255, 255, 0.06)",
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}

                      {/* Minimal bottom border */}
                      {hoveredItem === index && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                          style={{
                            background: isScrolled
                              ? "rgba(0, 0, 0, 0.2)"
                              : "rgba(255, 255, 255, 0.4)",
                            width: "40%",
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="hidden lg:block">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                >
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button
                      asChild
                      size="default"
                      className="relative overflow-hidden group font-semibold text-base px-6 h-11"
                    >
                      <Link href="#tickets">
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-red-600/70 via-pink-600/70 to-orange-600/70 opacity-0 group-hover:opacity-100 transition-colors" />
                        <span className="relative z-10 flex items-center">
                          <Ticket className="mr-2 size-5" />
                          Get Tickets
                        </span>
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuState && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-24 left-0 right-0 z-20 px-4 lg:hidden"
          >
            <div className="bg-background rounded-2xl border shadow-2xl p-6 max-w-md mx-auto">
              <ul className="space-y-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuState(false)}
                        className={cn(
                          "group flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium",
                          "text-foreground transition-all duration-200",
                          "hover:bg-accent hover:text-accent-foreground",
                          "active:scale-[0.98]"
                        )}
                      >
                        <Icon className="size-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                        <span>{t(item.key)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="pt-6 border-t mt-4">
                <Button asChild size="lg" className="w-full">
                  <Link href="#tickets" onClick={() => setMenuState(false)}>
                    <Ticket className="mr-2 size-4" />
                    <span>Get Tickets</span>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
