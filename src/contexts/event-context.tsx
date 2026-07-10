"use client";

import { EVENTS, Event, getFeaturedEvent } from "@/lib/data";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

interface EventContextType {
  activeEvent: Event;
  setActiveEvent: (event: Event) => void;
  activeEventIndex: number;
  setActiveEventIndex: (index: number) => void;
  setActiveEventBySlug: (slug: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({
  children,
  initialSlug,
}: {
  children: ReactNode;
  /** When set, the provider starts with this event active (used by detail routes). */
  initialSlug?: string;
}) {
  const initialIndex = useMemo(() => {
    if (initialSlug) {
      const bySlug = EVENTS.findIndex((e) => e.slug === initialSlug);
      if (bySlug !== -1) return bySlug;
    }
    const featured = getFeaturedEvent();
    const featuredIndex = EVENTS.findIndex((e) => e.id === featured.id);
    return featuredIndex === -1 ? 0 : featuredIndex;
  }, [initialSlug]);

  const [activeEventIndex, setActiveEventIndex] = useState(initialIndex);

  const activeEvent = EVENTS[activeEventIndex];

  const setActiveEvent = (event: Event) => {
    const index = EVENTS.findIndex((e) => e.id === event.id);
    if (index !== -1) {
      setActiveEventIndex(index);
    }
  };

  const setActiveEventBySlug = (slug: string) => {
    const index = EVENTS.findIndex((e) => e.slug === slug);
    if (index !== -1) {
      setActiveEventIndex(index);
    }
  };

  return (
    <EventContext.Provider
      value={{
        activeEvent,
        setActiveEvent,
        activeEventIndex,
        setActiveEventIndex,
        setActiveEventBySlug,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
}
