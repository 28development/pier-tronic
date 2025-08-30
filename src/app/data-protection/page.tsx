import type { Metadata } from 'next'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
    title: 'Privacy Policy | Pier Tronic',
    description:
        'Mock privacy policy for Pier Tronic – how we collect, use and protect your data.',
}

export default function DataProtectionPage() {
    return (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24">
            <h1 className='text-4xl font-normal mb-6 font-victor-serif'>
                Privacy Policy
            </h1>

            <Card className='mb-8'>
                <CardContent className='pt-6'>
                    <p className='mb-4'>
                        This mock privacy notice explains how <strong>Pier Tronic GmbH</strong>
                        (&ldquo;Pier Tronic&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, shares and protects
                        personal data when you visit our websites, interact with our services,
                        or contact us.
                    </p>
                    <p className='mb-4'>
                        Depending on the context in which we process personal data (for example,
                        careers, events, newsletter, support, analytics), we provide dedicated
                        privacy notes. You will find links to these notes below.
                    </p>
                    <p className='mb-6'>
                        We may update this privacy notice from time to time. The latest version is
                        always available on this page.
                    </p>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
                        {dataProtectionLinks.map((link, index) => (
                            <a
                                key={index}
                                href='#'
                                className='flex items-center p-4 border rounded-md hover:bg-muted transition-colors text-sm'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5 mr-2 text-primary flex-shrink-0'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
                                    />
                                </svg>
                                {link}
                            </a>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <h2 className='text-3xl font-normal mb-6 font-victor-serif'>
                Privacy statement for pier-tronic.com
            </h2>

            <p className='mb-6'>
                Below, we explain what personal data we collect, how we process it, and what
                rights you have. This content is mock data for demonstration purposes only.
            </p>

            <div className='mb-8'>
                <h3 className='text-xl font-normal mb-4'>Overview</h3>
                <ul className='space-y-2 list-inside list-disc ml-4'>
                    {tableOfContents.map((item, index) => (
                        <li key={index}>
                            <a
                                href={`#section-${index + 1}`}
                                className='text-primary hover:underline'
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='item-1' id='section-1'>
                    <AccordionTrigger className='text-xl font-normal text-start'>
                        Who is responsible and how can you contact us?
                    </AccordionTrigger>
                    <AccordionContent className='text-base space-y-4'>
                        <p>The controller for this website is:</p>
                        <div className='pl-4 border-l-2 border-primary space-y-1'>
                            <p>Pier Tronic GmbH</p>
                            <p>Harborstrasse 7</p>
                            <p>20457 Hamburg, Germany</p>
                            <p>T: +49 (0)40 1234 5670</p>
                            <p>E: privacy@pier-tronic.com</p>
                        </div>
                        <p>
                            For general inquiries, please see our imprint and the information on this website.
                        </p>
                        <p>
                            If you have privacy questions, contact our Data Protection team:
                        </p>
                        <div className='pl-4 border-l-2 border-primary space-y-1'>
                            <p>Pier Tronic GmbH – Data Protection</p>
                            <p>Harborstrasse 7, 20457 Hamburg, Germany</p>
                            <p>E: dpo@pier-tronic.com</p>
                            <p>T: +49 (0)40 1234 5671</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-2' id='section-2'>
                    <AccordionTrigger className='text-xl font-normal'>
                        Opt‑out options
                    </AccordionTrigger>
                    <AccordionContent className='text-base space-y-4'>
                        <p>
                            This website may use cookies and analytics. You can prevent cookie storage by
                            adjusting your browser settings. See the Cookies section below for details.
                        </p>
                        <p>
                            If Google Analytics is enabled, you can opt out by installing the browser add‑on:
                            <a className='text-primary underline ml-1' href='https://tools.google.com/dlpage/gaoptout' target='_blank' rel='noreferrer noopener'>
                                https://tools.google.com/dlpage/gaoptout
                            </a>
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-3' id='section-3'>
                    <AccordionTrigger className='text-xl font-normal'>
                        Where do we get your data from?
                    </AccordionTrigger>
                    <AccordionContent className='text-base'>
                        <p>
                            We process data that you provide (e.g., when contacting us, subscribing to the
                            newsletter, purchasing tickets/merch) and data collected automatically when you
                            use our website (e.g., device data, usage data, cookies).
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-4' id='section-4'>
                    <AccordionTrigger className='text-xl font-normal'>
                        Cookies
                    </AccordionTrigger>
                    <AccordionContent className='text-base space-y-4'>
                        <p>
                            We use cookies to provide core functionality, measure performance, and improve
                            your experience.
                        </p>
                        <h4 className='font-normal mt-2 mb-2'>Strictly necessary cookies</h4>
                        <p>
                            Required for the website to function (e.g., session and security). These are set
                            automatically and cannot be disabled via our interface.
                        </p>
                        <h4 className='font-normal mt-4 mb-2'>Analytics cookies (optional)</h4>
                        <p>
                            Used to understand website usage and improve our services. Set only with your
                            consent. You can withdraw consent at any time in your browser or cookie settings.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-5' id='section-5'>
                    <AccordionTrigger className='text-xl font-normal text-start'>
                        What data do we process, for what purposes, and how long do we keep it?
                    </AccordionTrigger>
                    <AccordionContent className='text-base space-y-4'>
                        <h4 className='font-normal mt-2 mb-2'>
                            Server and log data
                        </h4>
                        <p>
                            When visiting the website, the following may be processed automatically: IP
                            address, device and browser information, timestamp, referrer URL, visited pages
                            and files. We use this to deliver the site, ensure security, prevent abuse and to
                            compile aggregate statistics.
                        </p>
                        <p>
                            Logs are retained for a short period and then deleted or anonymised unless a
                            longer retention is required by law or for security investigations.
                        </p>

                        <h4 className='font-normal mt-2 mb-2'>
                            Communication and support
                        </h4>
                        <p>
                            If you contact us, we process the information you provide to respond to your
                            request. We retain correspondence for as long as necessary to handle your query
                            and meet our legal obligations.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-6' id='section-6'>
                    <AccordionTrigger className='text-xl font-normal'>
                        Legal bases
                    </AccordionTrigger>
                    <AccordionContent className='text-base space-y-4'>
                        <p>
                            We rely on the following legal bases under Art. 6(1) GDPR: contract performance
                            and pre‑contractual steps (b), legal obligation (c), legitimate interests (f,
                            e.g., site security and analytics), and consent where applicable (a).
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-7' id='section-7'>
                    <AccordionTrigger className='text-xl font-normal'>
                        Who receives your data?
                    </AccordionTrigger>
                    <AccordionContent className='text-base space-y-4'>
                        <p>
                            We may share data with selected service providers who support our operations
                            (hosting, analytics, customer support, email delivery, payments). Providers are
                            contractually bound to process data only on our instructions.
                        </p>
                        <p>
                            We do not sell your data. We only disclose information where required by law or
                            to establish, exercise, or defend legal claims.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-8' id='section-8'>
                    <AccordionTrigger className='text-xl font-normal'>
                        Your rights
                    </AccordionTrigger>
                    <AccordionContent className='text-base space-y-4'>
                        <p>
                            You have the right to access, rectify, erase and port your data; restrict or
                            object to processing; and withdraw consent at any time. You can also lodge a
                            complaint with your local supervisory authority.
                        </p>
                        <p>
                            To exercise your rights, contact us at dpo@pier-tronic.com.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-9' id='section-9'>
                    <AccordionTrigger className='text-xl font-normal'>
                        More information
                    </AccordionTrigger>
                    <AccordionContent className='text-base'>
                        <p>
                            For additional details about how we process data in specific contexts (events,
                            newsletter, shop), please refer to the topic‑specific privacy notes above or
                            contact us.
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

// Data for the links to different privacy policy documents
const dataProtectionLinks = [
    'Careers privacy notice',
    'Events and ticketing privacy notice',
    'Newsletter subscribers privacy notice',
    'Customer support privacy notice',
    'Social media pages privacy notice',
    'Online shop and payments privacy notice',
    'Cookies policy',
    'Product analytics (website/app) privacy notice',
    'Vendor and partner privacy notice',
    'Recruitment and candidate privacy notice',
]

// Table of contents data
const tableOfContents = [
    'Who is responsible and how can you contact us?',
    'Opt‑out options',
    'Where do we get your data from?',
    'Cookies',
    'What data do we process, for what purposes, and how long do we keep it?',
    'Legal bases',
    'Who receives your data?',
    'Your rights',
    'More information',
]
