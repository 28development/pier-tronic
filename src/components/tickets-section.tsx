"use client";

import { useEvent } from "@/contexts/event-context";
import { useLocale } from "@/contexts/locale-context";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { TextEffect } from "./ui/text-effect";

export default function TicketsSection() {
  const { t } = useLocale();
  const { activeEvent } = useEvent();

  useEffect(() => {
    // Dynamically load and initialize the StageDates iframe module
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import { init } from 'https://stagedates.com/dist/iframe/sd-iframe-latest.min.js';
      init('${activeEvent.stageDatesId}');
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [activeEvent.stageDatesId]);

  return (
    <section id="tickets" className="py-12 md:py-20 lg:py-32">
      <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]"></div>
      <div className="mx-auto max-w-6xl space-y-10 px-6 md:space-y-16 lg:space-y-20">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
          <TextEffect
            key={activeEvent.id + "-title"}
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h2"
            className="text-balance text-4xl font-semibold lg:text-6xl"
          >
            {`${activeEvent.name} ${t("tickets_title_suffix") || "Tickets"}`}
          </TextEffect>
          <TextEffect
            key={activeEvent.id + "-blurb"}
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
            onClick={() => window.open(activeEvent.ticketsUrl, "_blank")}
            className="py-2 w-fit self-end"
          >
            {t("tickets_button")}
          </Button>
          <div className="iframe-container" id="iframe-container">
            <iframe
              key={activeEvent.id}
              style={{
                border: "none",
                borderRadius: "20px",
                height: "800px",
                width: "100%",
                overflowY: "hidden",
              }}
              src={activeEvent.ticketsUrl}
              id={activeEvent.stageDatesId}
              allow="fullscreen; encrypt-media; payment;"
              scrolling="no"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
