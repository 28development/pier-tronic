"use client";

import { useLocale } from "@/contexts/locale-context";
import type { Artist } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MapPin, Music, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ArtistBioDialogProps {
  artist: Artist | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArtistBioDialog({
  artist,
  isOpen,
  onClose,
}: ArtistBioDialogProps) {
  const { t, locale } = useLocale();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (typeof window === "undefined") return null;
  if (!artist) return null;

  const bio =
    artist.bio?.[locale as "en" | "de"] ||
    artist.bio?.en ||
    artist.bio?.de ||
    null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="artist-bio-title"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative z-10 w-full sm:max-w-3xl max-h-[92vh] overflow-hidden",
              "rounded-t-3xl sm:rounded-3xl border border-white/10",
              "bg-zinc-950 shadow-2xl"
            )}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t("team_close")}
              className={cn(
                "absolute top-4 right-4 z-20 flex items-center justify-center",
                "size-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20",
                "text-white hover:bg-white/20 hover:scale-105 transition-all duration-200"
              )}
            >
              <X className="size-5" />
            </button>

            <div className="grid sm:grid-cols-[280px_1fr] max-h-[92vh] overflow-y-auto">
              <div className="relative h-72 sm:h-auto bg-zinc-900">
                <Image
                  src={artist.images[0]}
                  alt={artist.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 280px"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-zinc-950 via-zinc-950/30 to-transparent sm:via-transparent" />
              </div>

              <div className="p-6 sm:p-8 space-y-5 text-white">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/60">
                    {t("team_about")}
                  </span>
                  <h2
                    id="artist-bio-title"
                    className="text-3xl sm:text-4xl font-bold tracking-tight"
                  >
                    {artist.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-white/70">
                    <span className="inline-flex items-center gap-1.5">
                      <Music className="size-3.5" />
                      {artist.role}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {artist.location}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                {bio ? (
                  <div className="space-y-3 text-sm sm:text-base leading-relaxed text-white/80 whitespace-pre-line">
                    {bio.long}
                  </div>
                ) : (
                  <p className="text-sm text-white/60 italic">
                    {locale === "de"
                      ? "Bio folgt in Kürze."
                      : locale === "nl"
                        ? "Bio volgt binnenkort."
                        : "Bio coming soon."}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
