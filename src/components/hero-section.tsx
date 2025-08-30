import React from 'react'
import { Mail, SendHorizonal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroHeader } from '@/components/header'
import { LogoCloud } from '@/components/logo-cloud'
import { TextEffect } from './ui/text-effect'
import { AnimatedGroup } from './ui/animated-group'
import Image from 'next/image'
import { CountingNumber } from './ui/shadcn-io/counting-number'
import { GradientText } from './ui/shadcn-io/gradient-text'

const transitionVariants = {
    item: {
        hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: { type: 'spring', bounce: 0.3, duration: 1.5 },
        },
    },
}

export default function HeroSection() {
    return (
        <main className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
            <section>
                <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pt-48">
                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <TextEffect
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            as="h1"
                            className="text-balance text-5xl font-medium md:text-6xl"
                        >
                            The Ultimate Music Festival
                        </TextEffect>

                        <TextEffect
                            per="line"
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            delay={0.5}
                            as="p"
                            className="mx-auto mt-6 max-w-2xl text-pretty text-lg"
                        >
                            Join thousands of music lovers for a night of electrifying DJs,
                            immersive light shows, and unforgettable experiences. Grab your
                            tickets now and be part of the celebration!
                        </TextEffect>

                        <AnimatedGroup
                            variants={{
                                container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
                                ...transitionVariants,
                            }}
                            className="mt-12"
                        >
                            <form className="mx-auto max-w-sm">
                                <div className="bg-background relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.5rem)] border pr-2 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
                                    <Mail className="pointer-events-none absolute inset-y-0 left-4 my-auto size-4" />

                                    <input
                                        placeholder="Your email for tickets"
                                        className="h-12 w-full bg-transparent pl-12 focus:outline-none"
                                        type="email"
                                    />

                                    <div className="md:pr-1.5 lg:pr-0">
                                        <Button aria-label="submit" size="sm" className="rounded-(--radius)">
                                            <span className="hidden md:block">Get Tickets</span>
                                            <SendHorizonal className="relative mx-auto size-5 md:hidden" strokeWidth={2} />
                                        </Button>
                                    </div>
                                </div>
                            </form>

                            <div
                                aria-hidden
                                className="bg-radial from-primary/50 dark:from-primary/25 relative mx-auto mt-32 max-w-2xl to-transparent to-55% text-left"
                            >
                                <div className="bg-background border-border/50 absolute inset-0 mx-auto w-80 -translate-x-3 -translate-y-12 rounded-[2rem] border p-2">
                                    <Image
                                        fill
                                        src="https://images.unsplash.com/photo-1648726442589-63bd0d91d1e5?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Festival Stats"
                                        className="object-cover rounded-[2rem]"
                                    />
                                </div>
                                <div className="bg-muted dark:bg-background/50 border-border/50 mx-auto w-80 translate-x-4 rounded-[2rem] border p-2 backdrop-blur-3xl sm:translate-x-8">
                                    <div className="bg-background space-y-2 overflow-hidden rounded-[1.5rem] border p-2 shadow-xl dark:bg-white/5 dark:shadow-black dark:backdrop-blur-3xl">
                                        <FestivalStats />
                                        <Image height={100} width={500} src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2747&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Festival Stats" className="object-cover rounded-[2rem]" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:opacity-5"></div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </div>
            </section>
            <LogoCloud />
        </main>
    )
}

const FestivalStats = () => (
    <div className="relative space-y-3 rounded-[1rem] bg-white/5 p-4">
        <div className="flex items-center gap-1.5 text-orange-400">
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                <g fill="none">
                    <path
                        fill="#ff6723"
                        d="M26 19.34c0 6.1-5.05 11.005-11.15 10.641c-6.269-.374-10.56-6.403-9.752-12.705c.489-3.833 2.286-7.12 4.242-9.67c.34-.445.689 3.136 1.038 2.742c.35-.405 3.594-6.019 4.722-7.991a.694.694 0 0 1 1.028-.213C18.394 3.854 26 10.277 26 19.34"
                    ></path>
                    <path
                        fill="#ffb02e"
                        d="M23 21.851c0 4.042-3.519 7.291-7.799 7.144c-4.62-.156-7.788-4.384-7.11-8.739C9.07 14.012 15.48 10 15.48 10S23 14.707 23 21.851"
                    ></path>
                </g>
            </svg>
            <div className="text-sm font-medium">Attendees</div>
        </div>
        <div className="space-y-3">
            <div className="space-x-1">
                <span className="text-foreground align-baseline text-xl font-medium">
                    <CountingNumber
                        number={20000}
                        inView={true}
                        transition={{ stiffness: 100, damping: 30 }}
                    />
                </span>
                <span className="text-muted-foreground text-xs">People</span>
            </div>
            <div className="flex h-5 items-center rounded bg-gradient-to-l from-emerald-400 to-indigo-600 px-2 text-xs text-white">2025</div>

            <div className="space-x-1 mt-3">
                <span className="text-foreground align-baseline text-xl font-medium">
                    <CountingNumber
                        number={15}
                        inView={true}
                        transition={{ stiffness: 100, damping: 30 }}
                    />
                </span>
                <span className="text-muted-foreground text-xs">DJs & Artists</span>
            </div>
            <div className="text-foreground bg-muted flex h-5 w-2/3 items-center rounded px-2 dark:bg-white/20">2025 Lineup</div>
        </div>
    </div>
)