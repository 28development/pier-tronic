"use client";

import { BorderBeam } from "@/components/magic-ui/border-beam";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  ChevronRight,
  Contact,
  Copyright,
  ExternalLink,
  Image as ImageIcon,
  Link2,
  Mail,
  MapPin,
  Palette,
  Phone,
  Scale,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function ImpressumPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
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
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-normal font-victor-serif mb-6 tracking-tight">
            Imprint
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Legal information, company details, and ownership disclosures for
            Pier-Tronic Events.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {/* Main Company Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm">
              <BorderBeam size={300} duration={12} delay={5} />
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-normal font-victor-serif mb-2 tracking-tight">
                      Pier-Tronic Events
                    </h2>
                    <p className="text-muted-foreground">
                      Official business entity information
                    </p>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary">
                    Registered Company
                  </div>
                </div>

                <div className="grid gap-12 md:grid-cols-2">
                  {/* Address */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                      <MapPin className="h-5 w-5" />
                      <h3 className="font-semibold uppercase tracking-wider text-sm">
                        Headquarters
                      </h3>
                    </div>
                    <address className="not-italic text-lg text-foreground/80 space-y-1 font-victor-serif">
                      Herengracht 150
                      <br />
                      1016 BN Amsterdam
                      <br />
                      The Netherlands
                    </address>
                  </div>

                  {/* Contact */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                      <Contact className="h-5 w-5" />
                      <h3 className="font-semibold uppercase tracking-wider text-sm">
                        Direct Contact
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <a
                        href="tel:+31634392524"
                        className="flex items-center gap-3 text-lg hover:text-primary transition-colors group font-victor-serif"
                      >
                        <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                          <Phone className="h-4 w-4" />
                        </div>
                        +31 6 34392524
                      </a>
                      <a
                        href="mailto:info@piertronic.events"
                        className="flex items-center gap-3 text-lg hover:text-primary transition-colors group font-victor-serif"
                      >
                        <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                          <Mail className="h-4 w-4" />
                        </div>
                        info@piertronic.events
                      </a>
                    </div>
                  </div>
                </div>

                <Separator className="my-10 bg-border/50" />

                <div className="grid gap-12 md:grid-cols-2">
                  {/* Registration */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Commercial Registry
                    </h3>
                    <div className="space-y-1">
                      <p className="text-xl font-medium">KvK 98406884</p>
                      <p className="text-sm text-muted-foreground">
                        Chamber of Commerce, Amsterdam
                      </p>
                    </div>
                  </div>

                  {/* Tax */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Tax Identification
                    </h3>
                    <div className="space-y-1">
                      <p className="text-xl font-medium">NL123456789B01</p>
                      <p className="text-sm text-muted-foreground">
                        VAT identification number
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Secondary Info Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full border-border/50 bg-card/30 backdrop-blur-sm group hover:border-primary/20 transition-all">
                <CardContent className="p-8">
                  <div className="p-3 w-fit rounded-xl bg-primary/10 mb-6 group-hover:scale-110 transition-transform">
                    <Link2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-normal font-victor-serif mb-4">
                    External Links
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We are not responsible for the content of external websites
                    linked from our site. The operators of those pages are
                    solely responsible for their content.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full border-border/50 bg-card/30 backdrop-blur-sm group hover:border-primary/20 transition-all">
                <CardContent className="p-8">
                  <div className="p-3 w-fit rounded-xl bg-primary/10 mb-6 group-hover:scale-110 transition-transform">
                    <Copyright className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-normal font-victor-serif mb-4">
                    Copyright
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    © {new Date().getFullYear()} Pier-Tronic. All rights
                    reserved. All content on this website is protected by
                    copyright law and may not be reproduced without written
                    permission.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Dispute Resolution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-amber-500/20 bg-amber-500/5 backdrop-blur-sm">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-500">
                    <Scale className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-normal font-victor-serif">
                    EU Online Dispute Resolution
                  </h2>
                </div>
                <div className="max-w-3xl space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    The European Commission provides a platform for online
                    dispute resolution (ODR). This platform serves as a contact
                    point for out-of-court settlement of disputes concerning
                    contractual obligations of online sales and service
                    contracts.
                  </p>
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline group"
                  >
                    Visit ODR Platform
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                  <p className="text-xs text-muted-foreground pt-4 border-t border-amber-500/10">
                    Note: We are not obligated to participate in dispute
                    resolution proceedings before a consumer arbitration board.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Credits Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Palette className="h-5 w-5 text-primary" />
                    <h3 className="font-normal text-xl font-victor-serif">
                      Design & Dev
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Designed and developed with passion by{" "}
                    <a
                      href="https://www.instagram.com/umut.tufanoglu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      Umut Tufanoglu
                    </a>
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    <h3 className="font-normal text-xl font-victor-serif">
                      Media Credits
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Exclusive visual content and audiovisual material provided
                    by the
                    <span className="text-foreground font-medium">
                      {" "}
                      Pier-Tronic Media Archive
                    </span>
                    .
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Footer Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="text-sm text-muted-foreground text-center sm:text-left">
                    Looking for our data processing details?
                  </div>
                  <Link
                    href="/data-protection"
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all group"
                  >
                    View Privacy Policy
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
