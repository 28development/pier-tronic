'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Music, Sun, Lightbulb, Ticket } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BorderBeam } from './magic-ui/border-beam'
import { TextEffect } from './ui/text-effect'
import { AnimatedGroup } from './ui/animated-group'

export default function Features() {
    type ImageKey = 'item-1' | 'item-2' | 'item-3' | 'item-4'
    const [activeItem, setActiveItem] = useState<ImageKey>('item-1')

    const images = {
        'item-1': {
            image: 'https://images.unsplash.com/photo-1730900101455-80a9eb84615d?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Main DJ stage',
        },
        'item-2': {
            image: 'https://images.unsplash.com/photo-1562095281-5a80bf16be41?q=80&w=1396&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Light show experience',
        },
        'item-3': {
            image: 'https://images.unsplash.com/photo-1680416124243-15d950378500?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Food and drinks area',
        },
        'item-4': {
            image: 'https://images.unsplash.com/photo-1648726442589-63bd0d91d1e5?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'VIP lounge & amenities',
        },
    }

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

    return (
        <section className="py-12 md:py-20 lg:py-32">
            <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]"></div>
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
                <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
                    <TextEffect
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-balance text-4xl font-semibold lg:text-6xl"
                    >
                        Festival Highlights
                    </TextEffect>
                    <TextEffect
                        per="line"
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        delay={0.3}
                        as="p"
                    >
                        Experience the ultimate night of music, lights, and fun. From epic DJ performances to immersive stages and tasty food & drinks, there's something for everyone.
                    </TextEffect>
                </div>

                <AnimatedGroup
                    variants={{
                        container: { visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } } },
                        ...transitionVariants,
                    }}
                    className="grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-20 lg:px-0"
                >
                    <Accordion
                        type="single"
                        value={activeItem}
                        onValueChange={(value) => setActiveItem(value as ImageKey)}
                        className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2 text-base">
                                    <Music className="size-4" />
                                    Main DJ Stage
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>Top international DJs perform non-stop on our main stage with high-energy sets and amazing sound.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2 text-base">
                                    <Lightbulb className="size-4" />
                                    Spectacular Light Show
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>Immerse yourself in a visually stunning light show that transforms the venue and elevates the music experience.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2 text-base">
                                    <Sun className="size-4" />
                                    Food & Drinks
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>Enjoy a variety of gourmet food trucks, refreshing drinks, and cocktails while taking a break from the dance floor.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2 text-base">
                                    <Ticket className="size-4" />
                                    VIP Lounge
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>Relax in the exclusive VIP area with premium amenities, better views, and special access to meet-and-greet events.</AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="bg-background relative flex overflow-hidden rounded-3xl border p-2 h-full">
                        <div className="bg-background relative w-full h-full rounded-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${activeItem}-id`}
                                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md">
                                    <Image
                                        src={images[activeItem].image}
                                        className="size-full object-cover object-left-top dark:mix-blend-lighten rounded-2xl"
                                        alt={images[activeItem].alt}
                                        fill
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <BorderBeam
                            duration={6}
                            size={200}
                            className="from-transparent via-yellow-700 to-transparent dark:via-white/50"
                        />
                    </div>
                </AnimatedGroup>
            </div>
        </section>
    )
}