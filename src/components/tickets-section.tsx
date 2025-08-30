'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { BorderBeam } from './magic-ui/border-beam'
import { TextEffect } from './ui/text-effect'
import { Button } from './ui/button'

interface TicketItem {
    id: string
    title: string
    date: string
    city: string
    venue: string
    price: string
    image: string
    alt: string
    span?: {
        cols?: number
        rows?: number
    }
}

const TICKETS: TicketItem[] = [
    {
        id: 't1',
        title: 'Pier Tronic Opening Night',
        date: 'Fri, Jul 18 • 21:00',
        city: 'Hamburg',
        venue: 'Dockside Arena',
        price: '€39',
        image: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0',
        alt: 'Crowd at night concert with lights',
        span: { cols: 3, rows: 2 },
    },
    {
        id: 't2',
        title: 'Sunset Rooftop Session',
        date: 'Sat, Jul 19 • 18:30',
        city: 'Berlin',
        venue: 'Skyline Loft',
        price: '€29',
        image: 'https://images.unsplash.com/photo-1516570161787-2fd917215a3d?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0',
        alt: 'Rooftop party during sunset',
        span: { cols: 3, rows: 1 },
    },
    {
        id: 't3',
        title: 'Warehouse All-Nighter',
        date: 'Sat, Jul 26 • 23:00',
        city: 'Leipzig',
        venue: 'Zone 7',
        price: '€34',
        image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0',
        alt: 'Warehouse rave lights and smoke',
        span: { cols: 3, rows: 1 },
    },
]

interface TicketCardProps {
    item: TicketItem
}

function TicketCard({ item }: TicketCardProps) {
    const colSpan = item.span?.cols ?? 2
    const rowSpan = item.span?.rows ?? 1

    const colSpanClass =
        colSpan === 1 ? 'lg:col-span-1' : colSpan === 2 ? 'lg:col-span-2' : 'lg:col-span-3'
    const rowSpanClass =
        rowSpan === 1 ? 'lg:row-span-1' : rowSpan === 2 ? 'lg:row-span-2' : 'lg:row-span-3'

    return (
        <div
            className={`group relative col-span-1 overflow-hidden rounded-3xl border p-2 ${colSpanClass} ${rowSpanClass}`}
        >
            <div className="bg-background relative size-full overflow-hidden rounded-2xl">
                <div className="absolute inset-0 right-0 ml-auto border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]"></div>

                {/* Details layer (revealed on hover) */}
                <div className="absolute inset-0 z-20 grid content-between rounded-2xl bg-black/30 backdrop-blur-sm p-5 text-zinc-100">
                    <div className="space-y-2">
                        <div className="text-xs uppercase tracking-wide text-zinc-400">{item.city} • {item.venue}</div>
                        <h3 className="text-balance text-2xl font-semibold">{item.title}</h3>
                        <div className="text-sm text-zinc-300">{item.date}</div>
                    </div>
                    <div className="flex items-center justify-between pt-3">
                        <div className="text-sm text-zinc-300">Starting at <span className="font-medium text-white">{item.price}</span></div>
                        <Button size="sm" className="rounded-full">Buy Ticket</Button>
                    </div>
                </div>

                {/* Image overlay that clips away on hover */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${item.id}-id`}
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md">
                        <Image
                            src={item.image}
                            alt={item.alt}
                            className="size-full object-cover object-center grayscale transition-[filter] duration-300 ease-out group-hover:grayscale-0"
                            width={1600}
                            height={1200}
                            priority={false}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                    </motion.div>
                </AnimatePresence>

                <BorderBeam duration={6} size={180} className="from-transparent via-yellow-700 to-transparent dark:via-white/50" />
            </div>
        </div>
    )
}

export default function TicketsSection() {
    return (
        <section className="py-12 md:py-20 lg:py-32">
            <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]"></div>
            <div className="mx-auto max-w-6xl space-y-10 px-6 md:space-y-16 lg:space-y-20">
                <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
                    <TextEffect
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-balance text-4xl font-semibold lg:text-6xl"
                    >
                        Upcoming Tickets
                    </TextEffect>
                    <TextEffect
                        per="line"
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        delay={0.3}
                        as="p"
                        className="text-pretty"
                    >
                        Get your spot for the next Pier Tronic experiences. Hover a card to peek details, pricing and venue.
                    </TextEffect>
                </div>

                <div
                    className="grid auto-rows-[14rem] grid-cols-1 gap-6 sm:grid-cols-2 lg:auto-rows-[16rem] lg:grid-cols-6"
                >
                    {TICKETS.map((item) => (
                        <TicketCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}


