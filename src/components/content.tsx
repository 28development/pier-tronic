"use client"

import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { TextEffect } from './ui/text-effect'
import { AnimatedGroup } from './ui/animated-group'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'

const transitionVariants = {
    item: {
        hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: { type: 'spring' as const, bounce: 0.3, duration: 1.5 },
        },
    },
}

export default function ContentSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`content-id`}
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="size-full overflow-hidden rounded-2xl border shadow-md p-2">
                        <Image
                            className="rounded-(--radius) grayscale hover:grayscale-0 transition-all duration-300"
                            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2747&auto=format&fit=crop&ixlib=rb-4.0.3"
                            alt="crowd enjoying live music"
                            loading="lazy"
                            width={1600}
                            height={1200}
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                    <TextEffect
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        delay={0.4}
                        as="h2"
                        className="text-4xl font-medium"
                    >
                        An unforgettable night of music, lights & energy
                    </TextEffect>
                    <div className="space-y-6">
                        <TextEffect
                            per="line"
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            delay={0.6}
                            as="p"
                        >
                            Join thousands of music lovers as top international DJs and
                            artists take the stage. From hypnotic techno beats to uplifting
                            house anthems, experience the ultimate celebration of sound and
                            community under one roof.
                        </TextEffect>

                        <AnimatedGroup
                            variants={{
                                container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.8 } } },
                                ...transitionVariants,
                            }}
                        >
                            <Button
                                asChild
                                variant="secondary"
                                size="sm"
                                className="gap-1 pr-1.5"
                            >
                                <Link href="#">
                                    <span>See the Lineup</span>
                                    <ChevronRight className="size-2" />
                                </Link>
                            </Button>
                        </AnimatedGroup>
                    </div>
                </div>
            </div>
        </section>
    )
}