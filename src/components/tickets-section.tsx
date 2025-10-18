"use client";

import { useLocale } from "@/contexts/locale-context";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { TextEffect } from "./ui/text-effect";

export default function TicketsSection() {
  const { t } = useLocale();

  useEffect(() => {
    // Dynamically load and initialize the StageDates iframe module
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import { init } from 'https://stagedates.com/dist/iframe/sd-iframe-latest.min.js';
      init('stagedates-iframe-event-1');
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="tickets" className="py-12 md:py-20 lg:py-32">
      <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]"></div>
      <div className="mx-auto max-w-6xl space-y-10 px-6 md:space-y-16 lg:space-y-20">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h2"
            className="text-balance text-4xl font-semibold lg:text-6xl"
          >
            {t("tickets_title")}
          </TextEffect>
          <TextEffect
            per="line"
            preset="fade-in-blur"
            speedSegment={0.3}
            delay={0.3}
            as="p"
            className="text-pretty"
          >
            {t("tickets_blurb")}
          </TextEffect>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={() =>
              window.open(
                "https://stagedates.com/events/pulse-of-the-pier-the-pier-20260718-FPjdR?embedded=true",
                "_blank"
              )
            }
            className="py-2 w-fit self-end"
          >
            {t("tickets_button")}
          </Button>
          <div className="iframe-container" id="iframe-container">
            <iframe
              style={{
                border: "none",
                borderRadius: "20px",
                height: "500px",
                width: "100%",
                overflowY: "hidden",
              }}
              src="https://stagedates.com/events/pulse-of-the-pier-the-pier-20260718-FPjdR?embedded=true"
              id="stagedates-iframe-event-1"
              allow="fullscreen; encrypt-media; payment;"
              scrolling="no"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
