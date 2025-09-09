import Link from 'next/link'

import type { Metadata } from 'next'

import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
    title: 'Imprint | Pier-Tronic',
    description: 'Mock imprint of Pier-Tronic GmbH',
}

export default function ImpressumPage() {
    return (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24">
            <h1 className='text-4xl font-normal mb-6 font-victor-serif'>
                Imprint
            </h1>

            <Card className='mb-8'>
                <CardContent className='pt-6'>
                    <div className='space-y-6'>
                        <div>
                            <h2 className='font-normal text-xl mb-2'>Pier-Tronic GmbH</h2>
                            <p>Harborstrasse 7</p>
                            <p>20457 Hamburg</p>
                            <p>Germany</p>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <p>T +49 (0)40 1234 5670</p>
                                <p>E hello@pier-tronic.com</p>
                                <p>W pier-tronic.com</p>
                            </div>
                            <div>
                                <p>Managing Directors: Alex Meyer, Lina Fischer</p>
                                <p>Commercial Register: HRB 123456, District Court Hamburg</p>
                                <p>VAT ID: DE 999999999</p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h2 className='font-normal text-xl mb-2'>Responsible for content</h2>
                            <p>Pier-Tronic GmbH</p>
                            <p>(address as above)</p>
                        </div>

                        <Separator />

                        <div>
                            <h2 className='font-normal text-xl mb-2'>References (links)</h2>
                            <p className='mb-4'>
                                Despite careful checks, third‑party websites linked from this site are the
                                responsibility of their respective providers. At the time of linking, the
                                content was checked and no legal violations were apparent. If we become aware
                                of any infringement, we will remove the link immediately.
                            </p>
                        </div>

                        <Separator />

                        <div>
                            <h2 className='font-normal text-xl mb-2'>Copyright</h2>
                            <p className='mb-4'>
                                © {new Date().getFullYear()} Pier-Tronic GmbH. All rights reserved. Reproduction,
                                distribution or storage in any form requires prior written consent from Pier
                                Tronic GmbH unless otherwise permitted by law.
                            </p>
                        </div>

                        <Separator />

                        <div>
                            <h2 className='font-normal text-xl mb-2'>EU online dispute resolution</h2>
                            <p className='mb-4'>
                                The European Commission provides a platform for online dispute resolution (ODR):{' '}
                                <Link
                                    href='https://ec.europa.eu/consumers/odr/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-primary underline'
                                >
                                    https://ec.europa.eu/consumers/odr/
                                </Link>
                                . Pier-Tronic is neither obligated nor willing to participate in dispute resolution
                                proceedings before a consumer arbitration board.
                            </p>
                        </div>

                        <Separator />

                        <div>
                            <h2 className='font-normal text-xl mb-2'>Design and development</h2>
                            <ul className='list-disc list-inside pl-4 space-y-1'>
                                <li>Pier-Tronic Design Team (mock)</li>
                                <li>nextindex (mock)</li>
                                <li>ingenit GmbH & Co. KG (mock)</li>
                            </ul>
                        </div>

                        <Separator />

                        <div>
                            <h2 className='font-normal text-xl mb-2'>Image credits</h2>
                            <p className='mb-2'>
                                Sample images from Unsplash and internal media (mock).
                            </p>
                            <p className='text-sm text-muted-foreground break-all'>
                                unsplash.com/photos/sample-one (mock)
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
