import { EventsOverview } from "@/components/events-overview";
import localFont from "next/font/local";

const frick = localFont({
  src: [
    {
      path: "../../public/Frick0.3-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Frick0.3-Regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function Home() {
  return (
    <main id="main-content" className={frick.className}>
      <EventsOverview />
    </main>
  );
}
