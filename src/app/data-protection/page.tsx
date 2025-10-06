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
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-36 pb-16">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-normal font-victor-serif">
            Privacy Policy
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
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
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-4">
            <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-normal mb-3 font-victor-serif">
                Privacy at a Glance
              </h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">No Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  We don't use analytics, tracking cookies, or any monitoring
                  tools on our website.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                <ExternalLink className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Third-Party Ticketing</h3>
                <p className="text-sm text-muted-foreground">
                  Ticket purchases are handled securely through Stagedates.com
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <Card className="mb-8">
        <CardContent className="pt-6 space-y-4">
          <p>
            This privacy policy explains how <strong>Pier-Tronic GmbH</strong>{" "}
            (&ldquo;Pier-Tronic&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;) collects, uses, and protects personal data when
            you visit our website
            <strong> pier-tronic.com</strong>.
          </p>
          <p>
            <strong>Our commitment to privacy:</strong> We believe in minimal
            data collection. Unlike many websites, we do not use analytics
            tools, tracking cookies, or any form of user behavior monitoring.
            Your visit to our website is private.
          </p>
          <p className="text-sm text-muted-foreground">
            We may update this privacy policy from time to time. The latest
            version is always available on this page. Any changes will be
            effective immediately upon posting.
          </p>
        </CardContent>
      </Card>

      {/* Table of Contents */}
      <div className="mb-8">
        <h2 className="text-2xl font-normal mb-4 font-victor-serif">
          Quick Navigation
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="grid gap-2 md:grid-cols-2">
              {tableOfContents.map((item, index) => (
                <li key={index}>
                  <a
                    href={`#section-${index + 1}`}
                    className="text-primary hover:underline flex items-center gap-2 group"
                  >
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
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
          <AccordionTrigger className="text-xl font-normal text-start hover:no-underline">
            <span className="flex items-center gap-2">
              Who is responsible and how can you contact us?
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-base space-y-4 pt-4">
            <p>
              The data controller responsible for processing your personal data
              on this website is:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg border">
              <p className="font-medium mb-2">Pier-Tronic GmbH</p>
              <p className="text-sm text-muted-foreground">Harborstrasse 7</p>
              <p className="text-sm text-muted-foreground">
                20457 Hamburg, Germany
              </p>
              <p className="text-sm text-muted-foreground">
                T: +49 (0)40 1234 5670
              </p>
              <p className="text-sm text-muted-foreground">
                E:{" "}
                <a
                  href="mailto:info@pier-tronic.com"
                  className="text-primary hover:underline"
                >
                  info@pier-tronic.com
                </a>
              </p>
            </div>
            <p>
              For specific privacy-related questions or to exercise your data
              protection rights, please contact our Data Protection Officer:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg border">
              <p className="font-medium mb-2">Data Protection Officer</p>
              <p className="text-sm text-muted-foreground">Pier-Tronic GmbH</p>
              <p className="text-sm text-muted-foreground">Harborstrasse 7</p>
              <p className="text-sm text-muted-foreground">
                20457 Hamburg, Germany
              </p>
              <p className="text-sm text-muted-foreground">
                E:{" "}
                <a
                  href="mailto:privacy@pier-tronic.com"
                  className="text-primary hover:underline"
                >
                  privacy@pier-tronic.com
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
          <AccordionTrigger className="text-xl font-normal hover:no-underline">
            Data We Collect
          </AccordionTrigger>
          <AccordionContent className="text-base space-y-4 pt-4">
            <p className="font-medium">
              We collect minimal data to ensure our website functions properly:
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  Server Log Data (Automatic)
                </h4>
                <p className="text-muted-foreground mb-2">
                  When you visit our website, our hosting provider automatically
                  collects:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>IP address (anonymized after 7 days)</li>
                  <li>Date and time of access</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited on our website</li>
                  <li>Referrer URL (the page you came from)</li>
                </ul>
                <p className="text-sm mt-2">
                  <strong>Purpose:</strong> This data is necessary for
                  delivering the website, ensuring security, and troubleshooting
                  technical issues.
                </p>
                <p className="text-sm">
                  <strong>Retention:</strong> Log files are automatically
                  deleted after 30 days.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">
                  Contact Information (Voluntary)
                </h4>
                <p className="text-muted-foreground mb-2">
                  If you contact us via email or contact form, we collect:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Your name</li>
                  <li>Email address</li>
                  <li>Any information you provide in your message</li>
                </ul>
                <p className="text-sm mt-2">
                  <strong>Purpose:</strong> To respond to your inquiry and
                  communicate with you.
                </p>
                <p className="text-sm">
                  <strong>Retention:</strong> We keep correspondence for up to 2
                  years or as required by law, then securely delete it.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          id="section-3"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-xl font-normal hover:no-underline">
            Third-Party Services: Ticket Sales
          </AccordionTrigger>
          <AccordionContent className="text-base space-y-4 pt-4">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ExternalLink className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-2">
                    Important: External Service
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ticket purchases are processed through an embedded service
                    from{" "}
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
              </div>
            </div>

            <div className="space-y-3">
              <p>
                When you purchase tickets through our website, the ticketing
                interface is provided by Stagedates (an external third-party
                service). This means:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Data is processed by Stagedates:</strong> Any
                    personal information you enter during the ticket purchase
                    (name, email, payment details) is collected and processed
                    directly by Stagedates, not by us.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Stagedates Privacy Policy applies:</strong> Your
                    data processing during ticket purchase is governed by
                    Stagedates' privacy policy, which you can review at{" "}
                    <a
                      href="https://stagedates.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      stagedates.com/privacy
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>We receive limited information:</strong> We only
                    receive necessary order information (ticket type, quantity,
                    order number) to manage event logistics. We do not receive
                    your payment details.
                  </span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground pt-2">
                We have carefully selected Stagedates as our ticketing partner
                and believe they maintain high standards of data protection.
                However, we are not responsible for their data processing
                practices.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-4"
          id="section-4"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-xl font-normal hover:no-underline">
            Cookies and Tracking
          </AccordionTrigger>
          <AccordionContent className="text-base space-y-4 pt-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Good News for Privacy</p>
                  <p className="text-sm text-muted-foreground">
                    We do not use analytics tools, tracking cookies, or any form
                    of user behavior monitoring on our website.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Essential Cookies Only</h4>
              <p>
                Our website uses only essential cookies required for basic
                functionality:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Session cookies:</strong> To maintain your session
                    while browsing (these are deleted when you close your
                    browser)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Language preference:</strong> To remember your
                    language selection
                  </span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                These essential cookies are necessary for the website to
                function and cannot be disabled. They do not track you across
                other websites.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">
                Third-Party Cookies (Stagedates)
              </h4>
              <p className="text-sm text-muted-foreground">
                The embedded Stagedates ticketing service may use its own
                cookies. These are controlled by Stagedates and subject to their
                cookie policy. We have no control over these cookies.
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Managing Cookies</h4>
              <p className="text-sm text-muted-foreground">
                You can control and delete cookies through your browser
                settings. Please note that disabling essential cookies may
                affect website functionality. For instructions on managing
                cookies, visit your browser's help section.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-5"
          id="section-5"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-xl font-normal text-start hover:no-underline">
            Legal Basis for Processing
          </AccordionTrigger>
          <AccordionContent className="text-base space-y-4 pt-4">
            <p>
              We process your personal data based on the following legal grounds
              under the General Data Protection Regulation (GDPR):
            </p>
            <div className="space-y-3">
              <div className="border-l-2 border-primary pl-4">
                <p className="font-medium mb-1">
                  Legitimate Interests (Art. 6(1)(f) GDPR)
                </p>
                <p className="text-sm text-muted-foreground">
                  Server logs and essential cookies: Our legitimate interest in
                  operating a secure, functional website and preventing abuse.
                </p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <p className="font-medium mb-1">
                  Contract Performance (Art. 6(1)(b) GDPR)
                </p>
                <p className="text-sm text-muted-foreground">
                  Processing your inquiries: Necessary to respond to your
                  requests and provide information about our services.
                </p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <p className="font-medium mb-1">
                  Legal Obligation (Art. 6(1)(c) GDPR)
                </p>
                <p className="text-sm text-muted-foreground">
                  Where we are required by law to retain certain data or respond
                  to lawful requests from authorities.
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
          <AccordionTrigger className="text-xl font-normal hover:no-underline">
            Data Sharing and Recipients
          </AccordionTrigger>
          <AccordionContent className="text-base space-y-4 pt-4">
            <p className="font-medium">
              We share your data only when necessary:
            </p>

            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Service Providers</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  We work with the following categories of service providers who
                  process data on our behalf:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">
                      <strong>Web Hosting:</strong> Our website is hosted on
                      servers in the EU
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">
                      <strong>Ticketing:</strong> Stagedates.com processes
                      ticket sales (as described above)
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  All service providers are contractually bound to process data
                  only according to our instructions and to maintain appropriate
                  security measures.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Legal Requirements</h4>
                <p className="text-sm text-muted-foreground">
                  We may disclose your data if required by law, court order, or
                  governmental regulation, or when necessary to protect our
                  legal rights.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium mb-2">We do not:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Sell your personal data</li>
                  <li>• Share data with advertisers</li>
                  <li>• Use data for marketing purposes without consent</li>
                  <li>
                    • Transfer data outside the EU/EEA (except as disclosed with
                    Stagedates)
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
          <AccordionTrigger className="text-xl font-normal hover:no-underline">
            Your Rights
          </AccordionTrigger>
          <AccordionContent className="text-base space-y-4 pt-4">
            <p>
              Under the GDPR, you have the following rights regarding your
              personal data:
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="border rounded-lg p-3">
                <p className="font-medium mb-1">Right to Access</p>
                <p className="text-sm text-muted-foreground">
                  Request a copy of the personal data we hold about you
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="font-medium mb-1">Right to Rectification</p>
                <p className="text-sm text-muted-foreground">
                  Correct inaccurate or incomplete data
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="font-medium mb-1">Right to Erasure</p>
                <p className="text-sm text-muted-foreground">
                  Request deletion of your data (&ldquo;right to be
                  forgotten&rdquo;)
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="font-medium mb-1">Right to Restriction</p>
                <p className="text-sm text-muted-foreground">
                  Limit how we process your data
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="font-medium mb-1">Right to Data Portability</p>
                <p className="text-sm text-muted-foreground">
                  Receive your data in a structured, machine-readable format
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="font-medium mb-1">Right to Object</p>
                <p className="text-sm text-muted-foreground">
                  Object to processing based on legitimate interests
                </p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
              <p className="font-medium mb-2">How to Exercise Your Rights</p>
              <p className="text-sm mb-2">
                To exercise any of these rights, please contact us at:
              </p>
              <p className="text-sm">
                <a
                  href="mailto:privacy@pier-tronic.com"
                  className="text-primary hover:underline font-medium"
                >
                  privacy@pier-tronic.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                We will respond to your request within 30 days. You will need to
                verify your identity for security purposes.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-medium mb-2">Right to Lodge a Complaint</p>
              <p className="text-sm text-muted-foreground">
                If you believe we have not handled your data properly, you have
                the right to lodge a complaint with your local data protection
                supervisory authority. In Germany, this is your state's data
                protection authority or the Federal Commissioner for Data
                Protection and Freedom of Information (BfDI).
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-8"
          id="section-8"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-xl font-normal hover:no-underline">
            Data Security
          </AccordionTrigger>
          <AccordionContent className="text-base space-y-4 pt-4">
            <p>
              We take the security of your personal data seriously and implement
              appropriate technical and organizational measures to protect it
              against unauthorized access, alteration, disclosure, or
              destruction.
            </p>

            <div className="space-y-3">
              <h4 className="font-medium">Security Measures Include:</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">
                    <strong>SSL/TLS Encryption:</strong> All data transmitted to
                    and from our website is encrypted using industry-standard
                    HTTPS
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">
                    <strong>Access Controls:</strong> Strict access restrictions
                    to systems containing personal data
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">
                    <strong>Regular Updates:</strong> Our systems and software
                    are regularly updated with security patches
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">
                    <strong>Data Minimization:</strong> We only collect and
                    retain data that is absolutely necessary
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground">
              While we strive to protect your personal data, no method of
              transmission over the internet or electronic storage is 100%
              secure. We cannot guarantee absolute security but continuously
              work to improve our security measures.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-9"
          id="section-9"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-xl font-normal hover:no-underline">
            International Data Transfers
          </AccordionTrigger>
          <AccordionContent className="text-base space-y-4 pt-4">
            <p>
              Your personal data is primarily processed within the European
              Union (EU) and European Economic Area (EEA).
            </p>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <p className="font-medium mb-2">Stagedates Data Transfer</p>
              <p className="text-sm text-muted-foreground">
                The Stagedates ticketing service may transfer data outside the
                EU/EEA. Please refer to Stagedates' privacy policy for
                information about their data transfer practices and safeguards:
              </p>
              <a
                href="https://stagedates.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1 mt-2"
              >
                stagedates.com/privacy
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <p className="text-sm text-muted-foreground">
              When we do transfer data outside the EU/EEA, we ensure appropriate
              safeguards are in place, such as Standard Contractual Clauses
              approved by the European Commission or adequacy decisions.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-10"
          id="section-10"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-xl font-normal hover:no-underline">
            Children's Privacy
          </AccordionTrigger>
          <AccordionContent className="text-base space-y-4 pt-4">
            <p>
              Our website is not directed at children under the age of 16. We do
              not knowingly collect personal data from children under 16.
            </p>
            <p className="text-sm text-muted-foreground">
              If you are a parent or guardian and believe your child has
              provided us with personal data, please contact us at{" "}
              <a
                href="mailto:privacy@pier-tronic.com"
                className="text-primary hover:underline"
              >
                privacy@pier-tronic.com
              </a>{" "}
              and we will delete such information from our systems.
            </p>
            <p className="text-sm text-muted-foreground">
              For ticket purchases through Stagedates, please refer to their age
              requirements and parental consent policies.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-11"
          id="section-11"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-xl font-normal hover:no-underline">
            Changes to This Policy
          </AccordionTrigger>
          <AccordionContent className="text-base space-y-4 pt-4">
            <p>
              We may update this privacy policy from time to time to reflect
              changes in our practices, technology, legal requirements, or other
              factors.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-medium mb-2">When we update this policy:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  • We will update the "Last updated" date at the top of this
                  page
                </li>
                <li>
                  • Significant changes will be clearly indicated on our website
                </li>
                <li>
                  • The updated policy will be effective immediately upon
                  posting
                </li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              We encourage you to review this privacy policy periodically to
              stay informed about how we protect your data.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-12"
          id="section-12"
          className="border rounded-lg px-6"
        >
          <AccordionTrigger className="text-xl font-normal hover:no-underline">
            Contact Us
          </AccordionTrigger>
          <AccordionContent className="text-base space-y-4 pt-4">
            <p>
              If you have any questions about this privacy policy or our data
              practices, please don't hesitate to contact us:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <p className="font-medium mb-3">General Inquiries</p>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">Pier-Tronic GmbH</p>
                    <p className="text-muted-foreground">Harborstrasse 7</p>
                    <p className="text-muted-foreground">
                      20457 Hamburg, Germany
                    </p>
                    <p>
                      <a
                        href="mailto:info@pier-tronic.com"
                        className="text-primary hover:underline"
                      >
                        info@pier-tronic.com
                      </a>
                    </p>
                    <p className="text-muted-foreground">+49 (0)40 1234 5670</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <p className="font-medium mb-3">Privacy & Data Protection</p>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      Data Protection Officer
                    </p>
                    <p className="text-muted-foreground">Pier-Tronic GmbH</p>
                    <p className="text-muted-foreground">Harborstrasse 7</p>
                    <p className="text-muted-foreground">
                      20457 Hamburg, Germany
                    </p>
                    <p>
                      <a
                        href="mailto:privacy@pier-tronic.com"
                        className="text-primary hover:underline"
                      >
                        privacy@pier-tronic.com
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
              <p className="text-sm">
                <strong>Response Time:</strong> We aim to respond to all
                privacy-related inquiries within 5 business days, and to formal
                data subject requests within 30 days as required by GDPR.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Footer Note */}
      <Card className="mt-12 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                <strong className="text-foreground">
                  Our Privacy Commitment:
                </strong>{" "}
                At Pier-Tronic, we believe in transparency and minimal data
                collection. We only process the data absolutely necessary to
                provide our services and protect our website.
              </p>
              <p>
                Unlike many websites, we don't track your behavior, build
                profiles, or monetize your data. Your privacy matters to us.
              </p>
            </div>
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
