"use client";

import { BorderBeam } from "@/components/magic-ui/border-beam";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  Cookie,
  ExternalLink,
  Eye,
  Fingerprint,
  Globe,
  Info,
  Lock,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";

export default function DataProtectionPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-32 pb-32">
        {/* Hero Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-primary/10 border border-primary/20">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-normal font-victor-serif mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            At Pier-Tronic, we prioritize your digital autonomy. This policy
            outlines our commitment to data transparency and the security of
            your personal information.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border border-border text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Last updated: {lastUpdated}
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Sidebar / Quick Navigation */}
          <aside className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-32"
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6 ml-2">
                Quick Navigation
              </h2>
              <nav className="space-y-1">
                {tableOfContents.map((item, index) => (
                  <a
                    key={index}
                    href={`#section-${index + 1}`}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-primary/5 border border-transparent hover:border-primary/10"
                  >
                    <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                      {item}
                    </span>
                    <ChevronRight className="h-4 w-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </a>
                ))}
              </nav>

              {/* Contact Card in Sidebar */}
              <Card className="mt-12 bg-primary/5 border-primary/10 overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Need help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you have any questions regarding your data, our privacy
                    team is here to assist.
                  </p>
                  <a
                    href="mailto:privacy@piertronic.events"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    privacy@piertronic.events
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            {/* Highlights Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <Card className="relative group overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm">
                <BorderBeam size={200} duration={12} delay={9} />
                <CardContent className="p-6">
                  <div className="p-3 w-fit rounded-xl bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
                    <Cookie className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Consent-First</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We only use analytics cookies after your explicit approval.
                    Your choice, your data.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative group overflow-hidden border-accent/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="p-3 w-fit rounded-xl bg-accent/10 mb-4 group-hover:scale-110 transition-transform">
                    <ExternalLink className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Secure Ticketing
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All transactions are handled through encrypted channels by
                    our trusted partner Stagedates.com.
                  </p>
                </CardContent>
              </Card>
            </motion.section>

            {/* Introduction Card */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
                <CardContent className="p-8 space-y-6">
                  <p className="text-lg leading-relaxed text-foreground/90 font-victor-serif italic">
                    &quot;We believe transparency is the foundation of digital
                    trust. This policy isn&apos;t just a legal requirement;
                    it&apos;s our promise to you.&quot;
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This document explains how{" "}
                    <strong>Pier-Tronic Events</strong> (&ldquo;we&rdquo;,
                    &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses, and
                    protects personal data when you visit our website{" "}
                    <strong>piertronic.events</strong>.
                  </p>
                </CardContent>
              </Card>
            </motion.section>

            {/* Detailed Policy Sections */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              <Accordion type="single" collapsible className="w-full space-y-4">
                {/* 01. Responsible Entity */}
                <AccordionSection
                  id="section-1"
                  title="Who is responsible and how can you contact us?"
                  icon={<Fingerprint className="h-5 w-5" />}
                >
                  <div className="space-y-6">
                    <p className="leading-relaxed">
                      The data controller responsible for processing your
                      personal data is:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-muted/50 border border-border/50">
                        <p className="font-semibold mb-2">Headquarters</p>
                        <address className="not-italic text-sm text-muted-foreground space-y-1">
                          Pier-Tronic Events
                          <br />
                          Herengracht 150
                          <br />
                          1016 BN Amsterdam
                          <br />
                          The Netherlands
                        </address>
                      </div>
                      <div className="p-5 rounded-2xl bg-muted/50 border border-border/50">
                        <p className="font-semibold mb-2">Direct Contact</p>
                        <div className="text-sm text-muted-foreground space-y-2">
                          <p>T: +31 (0)20 123 4567</p>
                          <p>
                            E:{" "}
                            <a
                              href="mailto:info@piertronic.events"
                              className="text-primary hover:underline"
                            >
                              info@piertronic.events
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionSection>

                {/* 02. Data We Collect */}
                <AccordionSection
                  id="section-2"
                  title="Data We Collect"
                  icon={<Eye className="h-5 w-5" />}
                >
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-6 rounded-2xl border bg-card/50">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <Globe className="h-4 w-4" />
                          </div>
                          <h4 className="font-semibold">Server Logs</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• IP address (anonymized)</li>
                          <li>• Access timestamp</li>
                          <li>• Browser & Device info</li>
                          <li>• Referrer URL</li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-border/50 text-xs flex justify-between">
                          <span className="text-muted-foreground/70">
                            Retention: 30 days
                          </span>
                          <span className="text-primary font-medium">
                            Automatic
                          </span>
                        </div>
                      </div>
                      <div className="p-6 rounded-2xl border bg-card/50">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-accent/10 text-accent-foreground">
                            <Info className="h-4 w-4" />
                          </div>
                          <h4 className="font-semibold">Contact Forms</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Name & Email</li>
                          <li>• Message content</li>
                          <li>• Request category</li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-border/50 text-xs flex justify-between">
                          <span className="text-muted-foreground/70">
                            Retention: 2 years
                          </span>
                          <span className="text-accent-foreground font-medium">
                            Voluntary
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionSection>

                {/* 03. Third Party */}
                <AccordionSection
                  id="section-3"
                  title="Third-Party Services: Ticket Sales"
                  icon={<ExternalLink className="h-5 w-5" />}
                >
                  <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-3 text-amber-600 dark:text-amber-500">
                      <ExternalLink className="h-5 w-5" />
                      <p className="font-semibold">External Data Processing</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      All ticket transactions are redirected to and processed by{" "}
                      <a
                        href="https://stagedates.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-bold"
                      >
                        Stagedates.com
                      </a>
                      . Their independent privacy infrastructure applies to
                      these purchases.
                    </p>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Your payment information never touches our servers.",
                      "Refer to Stagedates' privacy policy for transaction details.",
                      "We only receive high-level order data for guest list management.",
                    ].map((text, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-muted-foreground"
                      >
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </AccordionSection>

                {/* 04. Cookies */}
                <AccordionSection
                  id="section-4"
                  title="Cookies and Tracking"
                  icon={<Cookie className="h-5 w-5" />}
                >
                  <div className="space-y-8">
                    <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                      <div className="flex items-center gap-3 mb-3 text-blue-600 dark:text-blue-400">
                        <Cookie className="h-5 w-5" />
                        <p className="font-semibold">Consent Management</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        We respect your &quot;Do Not Track&quot; signals.
                        Non-essential cookies are only initialized upon your
                        explicit interaction with our consent tool.
                      </p>
                    </div>

                    <div className="grid gap-6">
                      {/* GTM */}
                      <div className="relative group p-6 rounded-2xl border bg-card/50 transition-colors hover:border-primary/30">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                          <div>
                            <h4 className="text-lg font-semibold">
                              Google Tag Manager
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Provider: Google LLC
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest w-fit">
                            Analytics
                          </span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6 text-sm">
                          <div className="space-y-3">
                            <p className="text-muted-foreground">
                              Manages scripts and event handling to help us
                              understand visitor interaction patterns.
                            </p>
                            <a
                              href="https://policies.google.com/privacy"
                              target="_blank"
                              className="inline-flex items-center gap-1.5 text-primary hover:underline text-xs"
                            >
                              Google Privacy Policy{" "}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                          <div className="space-y-2 bg-muted/30 p-4 rounded-xl">
                            <div className="flex justify-between">
                              <span className="text-xs font-medium">
                                Cookies:
                              </span>
                              <span className="text-xs text-muted-foreground">
                                _ga, _gat, _gid
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs font-medium">
                                Retention:
                              </span>
                              <span className="text-xs text-muted-foreground">
                                2 Years
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stroeer */}
                      <div className="relative group p-6 rounded-2xl border bg-card/50 transition-colors hover:border-accent/30">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                          <div>
                            <h4 className="text-lg font-semibold">
                              Ströer Campaign Tracking
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Provider: RegioHelden GmbH
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-[10px] font-bold uppercase tracking-widest w-fit">
                            Marketing
                          </span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6 text-sm">
                          <div className="space-y-3">
                            <p className="text-muted-foreground">
                              Measures advertising effectiveness and generates
                              statistical usage data.
                            </p>
                            <a
                              href="https://stroeer-online-marketing.de/datenschutzerklaerung/"
                              target="_blank"
                              className="inline-flex items-center gap-1.5 text-accent-foreground hover:underline text-xs"
                            >
                              Ströer Privacy Policy{" "}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                          <div className="space-y-2 bg-muted/30 p-4 rounded-xl">
                            <div className="flex justify-between">
                              <span className="text-xs font-medium">
                                Cookies:
                              </span>
                              <span className="text-xs text-muted-foreground">
                                campaignId
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs font-medium">
                                Retention:
                              </span>
                              <span className="text-xs text-muted-foreground">
                                14 Days
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionSection>

                {/* 05. Legal Basis */}
                <AccordionSection
                  id="section-5"
                  title="Legal Basis for Processing"
                  icon={<Lock className="h-5 w-5" />}
                >
                  <div className="grid gap-4">
                    {[
                      {
                        label: "Consent",
                        basis: "Art. 6(1)(a) GDPR",
                        desc: "For analytics and non-essential cookies.",
                      },
                      {
                        label: "Legitimate Interests",
                        basis: "Art. 6(1)(f) GDPR",
                        desc: "Ensuring website security and technical stability.",
                      },
                      {
                        label: "Contract Performance",
                        basis: "Art. 6(1)(b) GDPR",
                        desc: "Managing ticket sales and customer inquiries.",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl border border-border/50 bg-card/30"
                      >
                        <div className="sm:w-1/3">
                          <p className="font-semibold text-foreground">
                            {item.label}
                          </p>
                          <p className="text-xs font-mono text-primary">
                            {item.basis}
                          </p>
                        </div>
                        <p className="flex-1 text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionSection>

                {/* Remaining sections simplified for flow */}
                <AccordionSection
                  id="section-6"
                  title="Data Sharing and Recipients"
                  icon={<ChevronRight className="h-5 w-5" />}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We only share data with service providers essential for our
                    operations (hosting, ticketing, analytics). We do not sell
                    your personal information to third parties.
                  </p>
                </AccordionSection>

                <AccordionSection
                  id="section-7"
                  title="Your Rights"
                  icon={<ChevronRight className="h-5 w-5" />}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Access to your data",
                      "Right to rectification",
                      "Right to erasure",
                      "Restriction of processing",
                      "Data portability",
                      "Withdraw consent",
                    ].map((right, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-muted/20 text-sm"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {right}
                      </div>
                    ))}
                  </div>
                </AccordionSection>

                <AccordionSection
                  id="section-8"
                  title="Data Security"
                  icon={<ChevronRight className="h-5 w-5" />}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We implement technical and organizational security measures
                    to protect your personal data against accidental or
                    intentional manipulation, loss, destruction, or access by
                    unauthorized persons. Our security measures are continuously
                    improved in line with technological developments.
                  </p>
                </AccordionSection>

                <AccordionSection
                  id="section-9"
                  title="International Transfers"
                  icon={<ChevronRight className="h-5 w-5" />}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Data is primarily processed within the European Union. In
                    cases where third-party providers (like Google) process data
                    in the USA, we ensure appropriate safeguards are in place,
                    such as the EU-US Data Privacy Framework or Standard
                    Contractual Clauses.
                  </p>
                </AccordionSection>

                <AccordionSection
                  id="section-10"
                  title="Children's Privacy"
                  icon={<ChevronRight className="h-5 w-5" />}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our services are not directed to children under the age of
                    16. We do not knowingly collect personal data from children.
                    If we become aware that a child has provided us with
                    personal data, we will take steps to delete such
                    information.
                  </p>
                </AccordionSection>

                <AccordionSection
                  id="section-11"
                  title="Policy Changes"
                  icon={<ChevronRight className="h-5 w-5" />}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We reserve the right to change this privacy policy at any
                    time to ensure that it always complies with current legal
                    requirements or to implement changes to our services in the
                    privacy policy. The current version is always available on
                    our website.
                  </p>
                </AccordionSection>

                <AccordionSection
                  id="section-12"
                  title="Contact Information"
                  icon={<ChevronRight className="h-5 w-5" />}
                >
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                    <p className="text-sm text-muted-foreground mb-4 font-victor-serif italic">
                      For any privacy-related requests, please contact our Data
                      Protection Officer:
                    </p>
                    <a
                      href="mailto:privacy@piertronic.events"
                      className="text-lg font-semibold text-primary hover:underline"
                    >
                      privacy@piertronic.events
                    </a>
                  </div>
                </AccordionSection>
              </Accordion>
            </motion.section>
          </div>
        </div>

        {/* Final Privacy Commitment Card */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24"
        >
          <Card className="relative overflow-hidden border-primary/20 bg-primary/5">
            <BorderBeam
              size={400}
              duration={15}
              colorFrom="var(--primary)"
              colorTo="var(--accent)"
            />
            <CardContent className="p-12 text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-2">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-normal font-victor-serif tracking-tight">
                Our Privacy Commitment
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe in transparency and digital freedom. At Pier-Tronic,
                we treat your data with the same respect we want ours to be
                treated with. Minimal collection, maximum security.
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}

function AccordionSection({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem
      value={id}
      id={id}
      className="border border-border/50 rounded-2xl px-6 bg-card/30 backdrop-blur-sm overflow-hidden scroll-mt-32"
    >
      <AccordionTrigger className="text-lg font-medium text-start hover:no-underline py-6 group">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-xl bg-muted/50 text-muted-foreground group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-all duration-300">
            {icon}
          </div>
          {title}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-2 pb-8">
        <div className="pl-14 pr-4">{children}</div>
      </AccordionContent>
    </AccordionItem>
  );
}

const tableOfContents = [
  "Who is responsible?",
  "Data We Collect",
  "Third-Party: Ticketing",
  "Cookies and Tracking",
  "Legal Basis",
  "Data Sharing",
  "Your Rights",
  "Data Security",
  "International Transfers",
  "Children's Privacy",
  "Policy Changes",
  "Contact Information",
];
