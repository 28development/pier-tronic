import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ContentSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
                <img
                    className="rounded-(--radius) grayscale"
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2747&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="crowd enjoying live music"
                    loading="lazy"
                />

                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-medium">
                        An unforgettable night of music, lights & energy
                    </h2>
                    <div className="space-y-6">
                        <p>
                            Join thousands of music lovers as top international DJs and
                            artists take the stage. From hypnotic techno beats to uplifting
                            house anthems, experience the ultimate celebration of sound and
                            community under one roof.
                        </p>

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
                    </div>
                </div>
            </div>
        </section>
    )
}