"use client";

import { useLocale } from "@/contexts/locale-context";
import {
  getCookieConsent,
  loadTrackingScripts,
  removeTrackingCookies,
  setCookieConsent,
  updateGoogleConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function CookieConsentBanner() {
  const { t } = useLocale();
  const [consent, setConsent] = useState<CookieConsent>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // NOTE: Google Consent Mode V2 is already initialized in layout.tsx <head>
    // with default denied state. We only need to handle consent decisions here.

    // Check if user has already given consent
    const existingConsent = getCookieConsent();
    setConsent(existingConsent);

    // Handle based on existing consent
    if (existingConsent === "accepted") {
      // User previously accepted - load tracking scripts
      loadTrackingScripts();
    } else if (existingConsent === "rejected") {
      // User previously rejected - ensure consent remains denied
      updateGoogleConsent(false);
    }

    // Show banner if no consent has been given
    if (!existingConsent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookieConsent("accepted");
    setConsent("accepted");
    setIsVisible(false);
    loadTrackingScripts();
  };

  const handleReject = () => {
    setCookieConsent("rejected");
    setConsent("rejected");
    setIsVisible(false);
    removeTrackingCookies();
  };

  if (consent !== null || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

              <div className="relative p-6 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <svg
                          className="size-6 text-primary"
                          fill="none"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {t("cookie_title")}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t("cookie_description")}{" "}
                      <Link
                        href="/data-protection"
                        className="text-primary hover:underline font-medium"
                      >
                        {t("cookie_privacy_link")}
                      </Link>
                      .
                    </p>

                    <details className="text-xs text-muted-foreground">
                      <summary className="cursor-pointer hover:text-foreground transition-colors font-medium">
                        {t("cookie_details_toggle")}
                      </summary>
                      <div className="mt-3 space-y-3 pl-4 border-l-2 border-border">
                        {/* Google Tag Manager */}
                        <div>
                          <p>
                            <strong className="text-foreground">
                              {t("cookie_gtm_title")}:
                            </strong>{" "}
                            {t("cookie_gtm_description")}
                          </p>
                          <p className="text-xs opacity-75 mt-1">
                            {t("cookie_gtm_cookies")}
                          </p>
                        </div>

                        {/* Ströer Tracking */}
                        <div>
                          <p>
                            <strong className="text-foreground">
                              {t("cookie_stroeer_title")}:
                            </strong>{" "}
                            {t("cookie_stroeer_description")}
                          </p>
                          <p className="text-xs opacity-75 mt-1">
                            {t("cookie_stroeer_cookies")}
                          </p>
                        </div>
                      </div>
                    </details>
                  </div>

                  <div className="flex flex-col gap-3 md:flex-col md:flex-shrink-0">
                    <Button
                      onClick={handleAccept}
                      className="whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {t("cookie_accept")}
                    </Button>
                    <Button
                      onClick={handleReject}
                      variant="outline"
                      className="whitespace-nowrap border-border hover:bg-muted"
                    >
                      {t("cookie_reject")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
