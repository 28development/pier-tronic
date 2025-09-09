import { CountingNumber } from "./ui/shadcn-io/counting-number";
import { TextEffect } from './ui/text-effect'
import { AnimatedGroup } from './ui/animated-group'
import { getRequestLocale } from '@/app/i18n-request'
import { getServerT } from '@/app/i18n-server'

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

export default async function StatsSection() {
    const locale = await getRequestLocale()
    const t = await getServerT(locale)
    return (
        <section id="about" className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <TextEffect
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-4xl font-medium lg:text-5xl"
                    >
                        {t('stats_title')}
                    </TextEffect>
                    <TextEffect
                        per="line"
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        delay={0.3}
                        as="p"
                    >
                        {t('stats_blurb')}
                    </TextEffect>
                </div>

                <AnimatedGroup
                    variants={{
                        container: { visible: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } } },
                        ...transitionVariants,
                    }}
                    className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0"
                >
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">
                            <CountingNumber
                                number={15}
                                inView={true}
                                transition={{ stiffness: 100, damping: 30 }}
                            />
                        </div>
                        <p>{t('stats_card1')}</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">
                            <CountingNumber
                                number={20000}
                                inView={true}
                                transition={{ stiffness: 100, damping: 30 }}
                            />
                        </div>
                        <p>{t('stats_card2')}</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">
                            <CountingNumber
                                number={12}
                                inView={true}
                                transition={{ stiffness: 100, damping: 30 }}
                            />
                        </div>
                        <p>{t('stats_card3')}</p>
                    </div>
                </AnimatedGroup>
            </div>
        </section>
    )
}