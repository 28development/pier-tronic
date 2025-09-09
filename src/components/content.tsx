"use client"

import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { TextEffect } from './ui/text-effect'
import { AnimatedGroup } from './ui/animated-group'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

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
    const [dict, setDict] = useState<Record<string, string> | null>(null)
    useEffect(() => {
        let isActive = true
            ; (async () => {
                try {
                    const lang = new URLSearchParams(window.location.search).get('lang')
                    const res = await fetch(`/api/i18n/get?ns=common${lang ? `&lang=${lang}` : ''}`, { cache: 'no-store' })
                    if (!res.ok) return
                    const json = await res.json()
                    if (isActive) setDict(json)
                } catch { }
            })()
        return () => { isActive = false }
    }, [])
    const t = (k: string) => dict?.[k] ?? k

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
                        {t('content_title')}
                    </TextEffect>
                    <div className="space-y-6">
                        <TextEffect
                            per="line"
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            delay={0.6}
                            as="p"
                        >
                            {t('content_blurb')}
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
                                    <span>{t('content_lineup')}</span>
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