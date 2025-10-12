import type { Metadata } from "next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Info, Lock, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Pier-Tronic",
  description:
    "Learn how Pier-Tronic respects your privacy. We don't track you - find out what data we process and your rights.",
};

export default function DataProtectionPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      {/* Header Section */}
      <div className="py-16">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="h-7 w-7 text-primary" />
          <h1 className="text-4xl font-normal font-victor-serif">
            Privacy Policy
          </h1>
        </div>
        <p className="text-base text-muted-foreground">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Key Points Card */}
      <Card className="mb-12 border-primary/20 bg-primary/5">
        <CardContent className="pt-8 pb-8">
          <div className="flex items-center gap-2 mb-6">
            <Info className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-normal font-victor-serif">
              Privacy at a Glance
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1.5">No Tracking</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We don&#39;t use analytics, tracking cookies, or any
                  monitoring tools.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <ExternalLink className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1.5">Third-Party Ticketing</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tickets are handled securely through Stagedates.com
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <Card className="mb-10">
        <CardContent className="pt-8 pb-8 space-y-4">
          <p className="leading-relaxed">
            This privacy policy explains how <strong>Pier-Tronic Events</strong>{" "}
            (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects,
            uses, and protects personal data when you visit our website{" "}
            <strong>piertronic.events</strong>.
          </p>
          <p className="leading-relaxed">
            <strong>Our commitment to privacy:</strong> We believe in minimal
            data collection. Unlike many websites, we do not use analytics
            tools, tracking cookies, or any form of user behavior monitoring.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We may update this policy from time to time. The latest version is
            always available on this page.
          </p>
        </CardContent>
      </Card>

      {/* Table of Contents */}
      <div className="mb-10">
        <h2 className="text-2xl font-normal mb-5 font-victor-serif">
          Quick Navigation
        </h2>
        <Card>
          <CardContent className="pt-8 pb-8">
            <ul className="grid gap-3 md:grid-cols-2">
              {tableOfContents.map((item, index) => (
                <li key={index}>
                  <a
                    href={`#section-${index + 1}`}
                    className="text-primary hover:underline flex items-center gap-2.5 group text-sm"
                  >
                    <span className="text-muted-foreground group-hover:text-primary transition-colors font-medium">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Accordion */}
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem
          value="item-1"
          id="section-1"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-lg font-normal text-start hover:no-underline py-5">
            Who is responsible and how can you contact us?
          </AccordionTrigger>
          <AccordionContent className="text-sm space-y-5 pt-2 pb-6">
            <p className="leading-relaxed">
              The data controller responsible for processing your personal data
              on this website is:
            </p>
            <div className="bg-muted/50 p-5 rounded-lg border space-y-1">
              <p className="font-medium mb-2">Pier-Tronic Events</p>
              <p className="text-sm text-muted-foreground">Herengracht 150</p>
              <p className="text-sm text-muted-foreground">1016 BN Amsterdam</p>
              <p className="text-sm text-muted-foreground">The Netherlands</p>
              <p className="text-sm text-muted-foreground mt-2">
                T: +31 (0)20 123 4567
              </p>
              <p className="text-sm text-muted-foreground">
                E:{" "}
                <a
                  href="mailto:info@piertronic.events"
                  className="text-primary hover:underline"
                >
                  info@piertronic.events
                </a>
              </p>
            </div>
            <p className="leading-relaxed">
              For privacy-related questions or to exercise your data protection
              rights, contact us at:
            </p>
            <div className="bg-muted/50 p-5 rounded-lg border">
              <p className="text-sm text-muted-foreground">
                E:{" "}
                <a
                  href="mailto:privacy@piertronic.events"
                  className="text-primary hover:underline font-medium"
                >
                  privacy@piertronic.events
                </a>
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          id="section-2"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-lg font-normal hover:no-underline py-5">
            Data We Collect
          </AccordionTrigger>
          <AccordionContent className="text-sm space-y-5 pt-2 pb-6">
            <p className="leading-relaxed">
              We collect minimal data to ensure our website functions properly:
            </p>

            <div className="space-y-6">
              <div className="bg-muted/30 p-5 rounded-lg border">
                <h4 className="font-medium mb-3">
                  Server Log Data (Automatic)
                </h4>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  When you visit our website, our hosting provider automatically
                  collects:
                </p>
                <ul className="space-y-1.5 text-muted-foreground ml-4">
                  <li>• IP address (anonymized after 7 days)</li>
                  <li>• Date and time of access</li>
                  <li>• Browser type and version</li>
                  <li>• Pages visited</li>
                  <li>• Referrer URL</li>
                </ul>
                <div className="mt-4 pt-4 border-t space-y-2">
                  <p>
                    <strong>Purpose:</strong> Security and technical
                    troubleshooting
                  </p>
                  <p>
                    <strong>Retention:</strong> 30 days
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 p-5 rounded-lg border">
                <h4 className="font-medium mb-3">
                  Contact Information (Voluntary)
                </h4>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  If you contact us via email, we collect:
                </p>
                <ul className="space-y-1.5 text-muted-foreground ml-4">
                  <li>• Your name</li>
                  <li>• Email address</li>
                  <li>• Message content</li>
                </ul>
                <div className="mt-4 pt-4 border-t space-y-2">
                  <p>
                    <strong>Purpose:</strong> To respond to your inquiry
                  </p>
                  <p>
                    <strong>Retention:</strong> Up to 2 years
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          id="section-3"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-lg font-normal hover:no-underline py-5">
            Third-Party Services: Ticket Sales
          </AccordionTrigger>
          <AccordionContent className="text-sm space-y-5 pt-2 pb-6">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                <p className="font-medium">Important: External Service</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Tickets are processed through{" "}
                <a
                  href="https://stagedates.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Stagedates.com
                </a>
              </p>
            </div>

            <div className="space-y-4">
              <p className="leading-relaxed">
                When you purchase tickets, Stagedates handles all payment and
                personal data:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Your personal and payment information is processed directly
                    by Stagedates
                  </span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Their{" "}
                    <a
                      href="https://stagedates.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      privacy policy
                    </a>{" "}
                    applies to ticket purchases
                  </span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    We only receive order details (ticket type, quantity, order
                    number) for event management
                  </span>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-4"
          id="section-4"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-lg font-normal hover:no-underline py-5">
            Cookies and Tracking
          </AccordionTrigger>
          <AccordionContent className="text-sm space-y-5 pt-2 pb-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-green-600 dark:text-green-500" />
                <p className="font-medium">Good News for Privacy</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We do not use analytics tools, tracking cookies, or any user
                behavior monitoring.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Essential Cookies Only</h4>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  We only use essential cookies for basic functionality:
                </p>
                <ul className="space-y-2.5 ml-4">
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Session cookies:</strong> Maintain your browsing
                      session
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Language preference:</strong> Remember your
                      language choice
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/50 p-5 rounded-lg">
                <h4 className="font-medium mb-2">Third-Party Cookies</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Stagedates may use cookies for ticket purchases. These are
                  controlled by Stagedates and subject to their cookie policy.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-5"
          id="section-5"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-lg font-normal text-start hover:no-underline py-5">
            Legal Basis for Processing
          </AccordionTrigger>
          <AccordionContent className="text-sm space-y-5 pt-2 pb-6">
            <p className="leading-relaxed">
              We process your personal data based on the following legal grounds
              under the GDPR:
            </p>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-5 py-2">
                <p className="font-medium mb-2">
                  Legitimate Interests (Art. 6(1)(f) GDPR)
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Operating a secure, functional website and preventing abuse
                </p>
              </div>
              <div className="border-l-2 border-primary pl-5 py-2">
                <p className="font-medium mb-2">
                  Contract Performance (Art. 6(1)(b) GDPR)
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Responding to your inquiries and providing information about
                  our services
                </p>
              </div>
              <div className="border-l-2 border-primary pl-5 py-2">
                <p className="font-medium mb-2">
                  Legal Obligation (Art. 6(1)(c) GDPR)
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Complying with legal requirements and lawful requests from
                  authorities
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-6"
          id="section-6"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-lg font-normal hover:no-underline py-5">
            Data Sharing and Recipients
          </AccordionTrigger>
          <AccordionContent className="text-sm space-y-5 pt-2 pb-6">
            <p className="leading-relaxed">
              We share your data only when necessary:
            </p>

            <div className="space-y-5">
              <div>
                <h4 className="font-medium mb-3">Service Providers</h4>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  We work with these service providers:
                </p>
                <ul className="space-y-2.5 ml-4">
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Web Hosting:</strong> Servers in the EU
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Ticketing:</strong> Stagedates.com
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/50 p-5 rounded-lg">
                <p className="font-medium mb-3">We do not:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <span>•</span>
                    <span>Sell your personal data</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span>•</span>
                    <span>Share data with advertisers</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span>•</span>
                    <span>Use data for marketing without consent</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span>•</span>
                    <span>
                      Transfer data outside EU/EEA (except Stagedates)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-7"
          id="section-7"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-lg font-normal hover:no-underline py-5">
            Your Rights
          </AccordionTrigger>
          <AccordionContent className="text-sm space-y-5 pt-2 pb-6">
            <p className="leading-relaxed">
              Under the GDPR, you have the following rights:
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="border rounded-lg p-4">
                <p className="font-medium mb-1.5">Right to Access</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Request a copy of your personal data
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="font-medium mb-1.5">Right to Rectification</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Correct inaccurate data
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="font-medium mb-1.5">Right to Erasure</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Request deletion of your data
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="font-medium mb-1.5">Right to Restriction</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Limit how we process your data
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="font-medium mb-1.5">Right to Data Portability</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Receive your data in machine-readable format
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="font-medium mb-1.5">Right to Object</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Object to data processing
                </p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
              <p className="font-medium mb-3">How to Exercise Your Rights</p>
              <p className="mb-2 leading-relaxed">Contact us at:</p>
              <p>
                <a
                  href="mailto:privacy@piertronic.events"
                  className="text-primary hover:underline font-medium"
                >
                  privacy@piertronic.events
                </a>
              </p>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                We will respond within 30 days.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-5">
              <p className="font-medium mb-2">Right to Lodge a Complaint</p>
              <p className="text-muted-foreground leading-relaxed">
                You can lodge a complaint with your local data protection
                authority or the Dutch Data Protection Authority (Autoriteit
                Persoonsgegevens).
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-8"
          id="section-8"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-lg font-normal hover:no-underline py-5">
            Data Security
          </AccordionTrigger>
          <AccordionContent className="text-sm space-y-5 pt-2 pb-6">
            <p className="leading-relaxed">
              We implement appropriate security measures to protect your data:
            </p>

            <div className="space-y-3">
              <ul className="space-y-3 ml-4">
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>SSL/TLS Encryption:</strong> All data is encrypted
                    using HTTPS
                  </span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Access Controls:</strong> Strict access restrictions
                  </span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Regular Updates:</strong> Systems regularly updated
                    with security patches
                  </span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Data Minimization:</strong> We only collect
                    necessary data
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              No internet transmission is 100% secure, but we continuously work
              to improve our security measures.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-9"
          id="section-9"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-lg font-normal hover:no-underline py-5">
            International Data Transfers
          </AccordionTrigger>
          <AccordionContent className="text-sm space-y-5 pt-2 pb-6">
            <p className="leading-relaxed">
              Your data is primarily processed within the EU/EEA.
            </p>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-5">
              <p className="font-medium mb-2">Stagedates Data Transfer</p>
              <p className="text-muted-foreground mb-3 leading-relaxed">
                Stagedates may transfer data outside the EU/EEA. Refer to their{" "}
                <a
                  href="https://stagedates.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                >
                  privacy policy
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Any data transfers outside the EU/EEA use appropriate safeguards
              such as Standard Contractual Clauses.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-10"
          id="section-10"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-lg font-normal hover:no-underline py-5">
            Children&#39;s Privacy
          </AccordionTrigger>
          <AccordionContent className="text-sm space-y-4 pt-2 pb-6">
            <p className="leading-relaxed">
              We do not knowingly collect data from children under 16.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If your child has provided us with personal data, contact us at{" "}
              <a
                href="mailto:privacy@piertronic.events"
                className="text-primary hover:underline"
              >
                privacy@piertronic.events
              </a>
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-11"
          id="section-11"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-lg font-normal hover:no-underline py-5">
            Changes to This Policy
          </AccordionTrigger>
          <AccordionContent className="text-sm space-y-5 pt-2 pb-6">
            <p className="leading-relaxed">
              We may update this policy from time to time.
            </p>
            <div className="bg-muted/50 rounded-lg p-5">
              <p className="font-medium mb-3">When we update:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span>•</span>
                  <span className="leading-relaxed">
                    The &quot;Last updated&quot; date will change
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span>•</span>
                  <span className="leading-relaxed">
                    Significant changes will be highlighted
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span>•</span>
                  <span className="leading-relaxed">
                    Updates are effective immediately
                  </span>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-12"
          id="section-12"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-lg font-normal hover:no-underline py-5">
            Contact Us
          </AccordionTrigger>
          <AccordionContent className="text-sm space-y-5 pt-2 pb-6">
            <p className="leading-relaxed">
              For questions about this privacy policy:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-muted/30 p-5 rounded-lg border">
                <p className="font-medium mb-3">General Inquiries</p>
                <div className="space-y-2">
                  <p className="text-muted-foreground">Pier-Tronic Events</p>
                  <p className="text-muted-foreground">Herengracht 150</p>
                  <p className="text-muted-foreground">1016 BN Amsterdam</p>
                  <p className="text-muted-foreground">The Netherlands</p>
                  <p className="mt-3">
                    <a
                      href="mailto:info@piertronic.events"
                      className="text-primary hover:underline"
                    >
                      info@piertronic.events
                    </a>
                  </p>
                  <p className="text-muted-foreground">+31 (0)20 123 4567</p>
                </div>
              </div>

              <div className="bg-muted/30 p-5 rounded-lg border border-primary/20">
                <p className="font-medium mb-3">Privacy & Data Protection</p>
                <div className="space-y-2">
                  <p>
                    <a
                      href="mailto:privacy@piertronic.events"
                      className="text-primary hover:underline"
                    >
                      privacy@piertronic.events
                    </a>
                  </p>
                  <p className="text-muted-foreground mt-4 leading-relaxed">
                    We respond to privacy inquiries within 5 business days and
                    formal requests within 30 days.
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Footer Note */}
      <Card className="mt-10 border-primary/10">
        <CardContent className="pt-8 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <p className="font-medium">Our Privacy Commitment</p>
          </div>
          <div className="text-sm text-muted-foreground space-y-3">
            <p className="leading-relaxed">
              We believe in transparency and minimal data collection. We only
              process what&#39;s absolutely necessary.
            </p>
            <p className="leading-relaxed">
              Unlike many websites, we don&#39;t track your behavior, build
              profiles, or monetize your data.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

// Table of contents data
const tableOfContents = [
  "Who is responsible and how can you contact us?",
  "Data We Collect",
  "Third-Party Services: Ticket Sales",
  "Cookies and Tracking",
  "Legal Basis for Processing",
  "Data Sharing and Recipients",
  "Your Rights",
  "Data Security",
  "International Data Transfers",
  "Children's Privacy",
  "Changes to This Policy",
  "Contact Us",
];
