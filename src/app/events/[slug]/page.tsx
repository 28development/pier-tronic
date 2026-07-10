import { EventExperience } from "@/components/event-experience";
import { EVENTS, EVENTS_BY_DATE, getEventBySlug } from "@/lib/data";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

const frick = localFont({
  src: [
    {
      path: "../../../../public/Frick0.3-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/Frick0.3-Regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
});

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  const title = `${event.name} — Pier-Tronic`;
  const description = event.description.en;
  const image = event.poster || event.heroImage || "/images/PierTronic_Logo.png";
  const url = `https://piertronic.events/events/${event.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "Pier-Tronic",
      images: [{ url: image, width: 1200, height: 630, alt: event.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const orderIndex = EVENTS_BY_DATE.findIndex((e) => e.slug === event.slug);
  const prev = orderIndex > 0 ? EVENTS_BY_DATE[orderIndex - 1] : undefined;
  const next =
    orderIndex < EVENTS_BY_DATE.length - 1
      ? EVENTS_BY_DATE[orderIndex + 1]
      : undefined;

  return (
    <main id="main-content" className={frick.className}>
      <EventExperience event={event} prev={prev} next={next} />
    </main>
  );
}
