import Link from "next/link";

import type { Metadata } from "next";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Copyright,
  ExternalLink,
  Gavel,
  Image as ImageIcon,
  Link2,
  Mail,
  Palette,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Imprint | Pier-Tronic",
  description: "Legal information and imprint of Pier-Tronic",
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      {/* Header Section */}
      <div className="py-16">
        <div className="flex items-center gap-3 mb-3">
          <Building2 className="h-7 w-7 text-primary" />
          <h1 className="text-4xl font-normal font-victor-serif">Imprint</h1>
        </div>
        <p className="text-base text-muted-foreground">
          Legal information and company details
        </p>
      </div>

      {/* Main Company Information */}
      <Card className="mb-8">
        <CardContent className="pt-8 pb-8">
          <h2 className="font-normal text-2xl mb-6 font-victor-serif">
            Pier-Tronic Events
          </h2>

          <div className="space-y-8">
            {/* Address & Contact */}
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Address
                </p>
                <div className="space-y-1">
                  <p>Herengracht 150</p>
                  <p>1016 BN Amsterdam</p>
                  <p>The Netherlands</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Contact
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:+31201234567"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    +31 (0)20 123 4567
                  </a>
                  <a
                    href="mailto:info@piertronic.events"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    info@piertronic.events
                  </a>
                </div>
              </div>
            </div>

            <Separator />

            {/* Legal Details */}
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Chamber of Commerce
                </p>
                <p>KvK number: 12345678</p>
                <p className="text-sm text-muted-foreground">
                  Amsterdam, The Netherlands
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  VAT Number
                </p>
                <p>NL123456789B01</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Responsibility */}
      <Card className="mb-8">
        <CardContent className="pt-8 pb-8">
          <h2 className="font-normal text-xl mb-4 font-victor-serif">
            Responsible for Content
          </h2>
          <p className="text-muted-foreground mb-4">
            The content and information on this website is provided by:
          </p>
          <p className="font-medium">Pier-Tronic Events</p>
          <p className="text-sm text-muted-foreground">
            Address as stated above
          </p>
        </CardContent>
      </Card>

      {/* Legal Information Grid */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* External Links */}
        <Card>
          <CardContent className="pt-8 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Link2 className="h-5 w-5 text-primary" />
              <h2 className="font-normal text-xl font-victor-serif">
                External Links
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We are not responsible for the content of external websites linked
              from our site. The operators of those pages are solely responsible
              for their content.
            </p>
          </CardContent>
        </Card>

        {/* Copyright */}
        <Card>
          <CardContent className="pt-8 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Copyright className="h-5 w-5 text-primary" />
              <h2 className="font-normal text-xl font-victor-serif">
                Copyright
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              © {new Date().getFullYear()} Pier-Tronic. All rights reserved. All
              content on this website is protected by copyright law and may not
              be reproduced without written permission.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* EU Dispute Resolution */}
      <Card className="mb-8 border-amber-500/20 bg-amber-500/5">
        <CardContent className="pt-8 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <Gavel className="h-5 w-5 text-amber-600 dark:text-amber-500" />
            <h2 className="font-normal text-xl font-victor-serif">
              EU Online Dispute Resolution
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            The European Commission provides a platform for online dispute
            resolution (ODR):
          </p>
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium inline-flex items-center gap-1.5 mb-4"
          >
            ec.europa.eu/consumers/odr
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We are not obligated to participate in dispute resolution
            proceedings before a consumer arbitration board.
          </p>
        </CardContent>
      </Card>

      {/* Credits */}
      <Card className="mb-8">
        <CardContent className="pt-8 pb-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Design & Development */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="h-5 w-5 text-primary" />
                <h3 className="font-normal text-lg font-victor-serif">
                  Design & Development
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Designed and developed by{" "}
                <a
                  href="https://www.instagram.com/umut.tufanoglu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Umut Tufanoglu
                </a>
              </p>
            </div>

            {/* Image Credits */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5 text-primary" />
                <h3 className="font-normal text-lg font-victor-serif">Media</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Images and videos from Pier-Tronic Media Archive
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <Card className="border-primary/10">
        <CardContent className="pt-8 pb-8">
          <div className="text-sm text-muted-foreground space-y-3">
            <p>
              For privacy-related information, please visit our{" "}
              <Link
                href="/data-protection"
                className="text-primary hover:underline font-medium"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              If you have any questions, contact us at{" "}
              <a
                href="mailto:info@piertronic.events"
                className="text-primary hover:underline font-medium"
              >
                info@piertronic.events
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
