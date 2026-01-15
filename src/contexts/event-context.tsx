"use client";

import { getEnabledEvents, Event } from "@/lib/data";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

interface EventContextType {
  activeEvent: Event;
  setActiveEvent: (event: Event) => void;
  activeEventIndex: number;
  setActiveEventIndex: (index: number) => void;
  events: Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const events = useMemo(() => getEnabledEvents(), []);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const activeEvent = events[activeEventIndex];

  const setActiveEvent = (event: Event) => {
    const index = events.findIndex((e) => e.id === event.id);
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
        events,
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
