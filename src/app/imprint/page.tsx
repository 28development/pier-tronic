import Link from "next/link";

import type { Metadata } from "next";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Copyright,
  FileText,
  Gavel,
  Image as ImageIcon,
  Link2,
  Mail,
  Palette,
  Phone,
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Imprint | Pier-Tronic",
  description: "Legal information and imprint of Pier-Tronic",
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-36 pb-16">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-normal font-victor-serif">Imprint</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Legal information according to § 5 TMG
        </p>
      </div>

      {/* Main Company Information */}
      <Card className="mb-6 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-6">
            <Building2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="font-normal text-2xl mb-4 font-victor-serif">
                Pier-Tronic Events
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Address */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Address
                  </p>
                  <div className="text-base">
                    <p>Herengracht 150</p>
                    <p>1016 BN Amsterdam</p>
                    <p>The Netherlands</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    Contact
                  </p>
                  <div className="space-y-2">
                    <a
                      href="tel:+49401234567"
                      className="flex items-center gap-2 text-base hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      +49 (0)40 1234 5670
                    </a>
                    <a
                      href="mailto:info@piertronic.events"
                      className="flex items-center gap-2 text-base hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      info@piertronic.events
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Legal Details */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Commercial Register
              </p>
              <p className="text-base">HRB 123456</p>
              <p className="text-sm text-muted-foreground">
                District Court Hamburg
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                VAT Identification Number
              </p>
              <p className="text-base">DE 999999999</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Responsibility */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="font-normal text-xl mb-3 font-victor-serif">
                Responsible for Content
              </h2>
              <p className="text-base text-muted-foreground mb-1">
                According to § 55 Abs. 2 RStV (German Interstate Broadcasting
                Treaty)
              </p>
              <p className="text-base mt-3">Pier-Tronic</p>
              <p className="text-sm text-muted-foreground">
                Address as stated above
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Information Grid */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* External Links */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-3">
              <Link2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <h2 className="font-normal text-xl font-victor-serif">
                External Links
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Despite careful content control, we assume no liability for the
              content of external links. The operators of the linked pages are
              solely responsible for their content. At the time of linking, no
              illegal content was recognizable. If we become aware of any legal
              violations, we will remove such links immediately.
            </p>
          </CardContent>
        </Card>

        {/* Copyright */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-3">
              <Copyright className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <h2 className="font-normal text-xl font-victor-serif">
                Copyright
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              © {new Date().getFullYear()} Pier-Tronic. All rights reserved. The
              content and works on these pages are subject to German copyright
              law. Reproduction, editing, distribution, and any kind of use
              beyond the limits of copyright law require the written consent of
              Pier-Tronic.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* EU Dispute Resolution */}
      <Card className="mb-6 border-amber-500/20 bg-amber-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Gavel className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="font-normal text-xl mb-3 font-victor-serif">
                EU Online Dispute Resolution
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The European Commission provides a platform for online dispute
                resolution (ODR):
              </p>
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium inline-flex items-center gap-1 mb-3"
              >
                https://ec.europa.eu/consumers/odr/
                <Scale className="h-3 w-3" />
              </a>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pier-Tronic is neither obligated nor willing to participate in
                dispute resolution proceedings before a consumer arbitration
                board.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credits Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Design & Development */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <Palette className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <h2 className="font-normal text-xl font-victor-serif">
                Design & Development
              </h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <p className="text-sm">
                  Designed and developed with love by{" "}
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
            </div>
          </CardContent>
        </Card>

        {/* Image Credits */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <ImageIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <h2 className="font-normal text-xl font-victor-serif">
                Image Credits
              </h2>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Images and visual content from:
              </p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <p className="text-sm">Pier-Tronic Media Archive</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Note */}
      <Card className="mt-8 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Scale className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                <strong className="text-foreground">Legal Notice:</strong> This
                imprint complies with German legal requirements (§ 5 TMG, § 55
                RStV). For privacy-related information, please visit our{" "}
                <Link
                  href="/data-protection"
                  className="text-primary hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <p>
                If you have any questions regarding this imprint or our legal
                information, please contact us at{" "}
                <a
                  href="mailto:info@piertronic.events"
                  className="text-primary hover:underline font-medium"
                >
                  info@piertronic.events
                </a>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
