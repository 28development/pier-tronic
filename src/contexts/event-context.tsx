"use client";

import { EVENTS, Event } from "@/lib/data";
import { ReactNode, createContext, useContext, useState } from "react";

interface EventContextType {
  activeEvent: Event;
  setActiveEvent: (event: Event) => void;
  activeEventIndex: number;
  setActiveEventIndex: (index: number) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const activeEvent = EVENTS[activeEventIndex];

  const setActiveEvent = (event: Event) => {
    const index = EVENTS.findIndex((e) => e.id === event.id);
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
