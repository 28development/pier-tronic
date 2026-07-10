import type { CSSProperties, ReactNode } from "react";
import type { Event } from "@/lib/data";

const DEFAULT_ACCENT = "#111111";
const DEFAULT_ACCENT_FOREGROUND = "#ffffff";

type AccentStyle = CSSProperties & {
  "--event-accent": string;
  "--event-accent-foreground": string;
};

/**
 * Builds an inline style object exposing the event accent as CSS variables.
 * Use on any wrapper so children can read `var(--event-accent)`.
 */
export function eventAccentStyle(event: Pick<Event, "accent" | "accentForeground">): AccentStyle {
  return {
    "--event-accent": event.accent ?? DEFAULT_ACCENT,
    "--event-accent-foreground": event.accentForeground ?? DEFAULT_ACCENT_FOREGROUND,
  };
}

/**
 * Wraps children in a container that themes them with the event's accent color
 * via the `--event-accent` / `--event-accent-foreground` CSS variables.
 */
export function EventThemeProvider({
  event,
  children,
  className,
}: {
  event: Pick<Event, "accent" | "accentForeground">;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className} style={eventAccentStyle(event)}>
      {children}
    </div>
  );
}
