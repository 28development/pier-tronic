"use client";

import { useLocale } from "@/contexts/locale-context";
import type { TranslationKey } from "@/lib/translations";
import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";
import { Logo, LogoIcon } from "./logo";
import { AnimatedGroup } from "./ui/animated-group";

const links: Array<{
  groupKey: TranslationKey;
  items: Array<{ key: TranslationKey; href: string }>;
}> = [
  {
    groupKey: "groups_company",
    items: [
      { key: "link_about", href: "/#about" },
      { key: "link_contact", href: "mailto:info@piertronic.events" },
    ],
  },
  {
    groupKey: "groups_legal",
    items: [
      { key: "link_privacy", href: "/data-protection" },
      { key: "link_imprint", href: "/imprint" },
    ],
  },
];

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring" as const, bounce: 0.3, duration: 1.5 },
    },
  },
};

export default function FooterSection() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-b pt-20 dark:bg-transparent border-black/30">
      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: { staggerChildren: 0.05, delayChildren: 0.2 },
            },
          },
          ...transitionVariants,
        }}
        className="mb-8 border-b md:mb-12"
      >
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-6 px-6 pb-6">
          <Link
            href="/"
            aria-label="go home"
            className="size-fit flex items-center space-x-2"
          >
            <Logo uniColor className="h-10 text-foreground" />
            <LogoIcon uniColor className="h-12 text-foreground" />
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-primary block"
            >
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                ></path>
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/pier_tronic_events/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary block"
            >
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                ></path>
              </svg>
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-muted-foreground hover:text-primary block"
            >
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </AnimatedGroup>
      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.4 },
            },
          },
          ...transitionVariants,
        }}
        className="mx-auto max-w-5xl px-6"
      >
        <div className="grid gap-12 md:grid-cols-2 md:gap-0">
          <div className="grid grid-cols-2 gap-6 md:col-span-2 lg:col-span-2">
            {links.map((link, index) => (
              <div key={index} className="space-y-4 text-sm">
                <span className="block font-medium">{t(link.groupKey)}</span>
                {link.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary block duration-150"
                  >
                    <span>{t(item.key)}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 grid grid-cols-6 items-center justify-between gap-6 border-t py-6">
          <small className="text-muted-foreground col-span-4 block text-center text-sm">
            {t("footer_rights").replace("{{year}}", year.toString())}
          </small>
          <div className="col-span-2">
            <LanguageSwitcher />
          </div>
        </div>
      </AnimatedGroup>
    </footer>
  );
}
