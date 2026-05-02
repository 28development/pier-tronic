"use client";

import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [600, 900], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (value) => {
      setIsVisible(value > 600);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          style={{ opacity }}
          className={cn(
            "fixed bottom-24 right-6 z-40 flex size-12 items-center justify-center",
            "rounded-full border border-foreground/10 bg-background/80 backdrop-blur-md",
            "text-foreground shadow-lg shadow-black/10",
            "transition-colors duration-200 hover:bg-background hover:border-foreground/30",
            "lg:bottom-6 lg:right-24"
          )}
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
