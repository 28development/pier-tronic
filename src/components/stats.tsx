import { CountingNumber } from "./ui/shadcn-io/counting-number";
import { TextEffect } from './ui/text-effect'
import { AnimatedGroup } from './ui/animated-group'

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

export default function StatsSection() {
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
                        The Event in Numbers
                    </TextEffect>
                    <TextEffect
                        per="line"
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        delay={0.3}
                        as="p"
                    >
                        A night full of music, lights, and unforgettable vibes. Experience the
                        energy of world-class DJs, live performances, and a crowd that never
                        stops moving.
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
                        <p>International DJs & Artists</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">
                            <CountingNumber
                                number={20000}
                                inView={true}
                                transition={{ stiffness: 100, damping: 30 }}
                            />
                        </div>
                        <p>Music Lovers Attending</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">
                            <CountingNumber
                                number={12}
                                inView={true}
                                transition={{ stiffness: 100, damping: 30 }}
                            />
                        </div>
                        <p>Non-stop Music & Performances</p>
                    </div>
                </AnimatedGroup>
            </div>
        </section>
    )
}