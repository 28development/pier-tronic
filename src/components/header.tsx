"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Users, Ticket, Info } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoWordmark } from "./logo";

const menuItems = [
    { key: "team_caption", href: "#artists", icon: Users },
    { key: "tickets_title", href: "#tickets", icon: Ticket },
    { key: "link_about", href: "#about", icon: Info },
];

export const HeroHeader = () => {
    const [menuState, setMenuState] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [dict, setDict] = useState<Record<string, string> | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        let isActive = true;
        (async () => {
            try {
                const lang = new URLSearchParams(window.location.search).get("lang");
                const res = await fetch(
                    `/api/i18n/get?ns=common${lang ? `&lang=${lang}` : ""}`,
                    { cache: "no-store" }
                );
                if (!res.ok) return;
                const json = await res.json();
                if (isActive) setDict(json);
            } catch { }
        })();
        return () => {
            isActive = false;
        };
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (menuState) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [menuState]);

    const t = (k: string) => dict?.[k] ?? k;

    return (
        <header>
            {/* Mobile Menu Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 z-20 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
                    menuState ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setMenuState(false)}
                aria-hidden="true"
            />

            <nav
                aria-label="Primary"
                data-state={menuState && "active"}
                className="fixed w-full px-2 z-30"
            >
                <div
                    className={cn(
                        "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
                        isScrolled &&
                        "bg-background/60 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
                    )}
                >
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2"
                            >
                                <LogoWordmark
                                    uniColor
                                    className={cn(
                                        "h-6",
                                        isScrolled ? "text-foreground" : "text-white"
                                    )}
                                />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                                className={cn(
                                    "relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden",
                                    "rounded-lg transition-colors duration-200",
                                    "hover:bg-white/10 active:bg-white/20"
                                )}
                            >
                                <Menu className={cn(
                                    "m-auto size-6 transition-all duration-300",
                                    menuState ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
                                    isScrolled ? "text-foreground" : "text-white"
                                )} />
                                <X className={cn(
                                    "absolute inset-0 m-auto size-6 transition-all duration-300",
                                    menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0",
                                    isScrolled ? "text-foreground" : "text-white"
                                )} />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "block duration-150",
                                                isScrolled
                                                    ? "text-muted-foreground hover:text-foreground"
                                                    : "text-white hover:text-white/80"
                                            )}
                                        >
                                            <span>{t(item.key)}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={cn(
                            "bg-background hidden w-full flex-wrap items-center justify-end rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap",
                            "lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent",
                            "transition-all duration-300 ease-out",
                            menuState && "in-data-[state=active]:block lg:in-data-[state=active]:flex animate-in slide-in-from-top-5 fade-in-0"
                        )}>
                            <div className="lg:hidden">
                                <ul className="space-y-2">
                                    {menuItems.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setMenuState(false)}
                                                    className={cn(
                                                        "group flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium",
                                                        "text-foreground transition-all duration-200",
                                                        "hover:bg-accent hover:text-accent-foreground",
                                                        "active:scale-[0.98]"
                                                    )}
                                                >
                                                    <Icon className="size-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                                                    <span>{t(item.key)}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className="pt-6 border-t">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="w-full"
                                    >
                                        <Link href="#tickets" onClick={() => setMenuState(false)}>
                                            <Ticket className="mr-2 size-4" />
                                            <span>Get Tickets</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="hidden lg:flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
                                >
                                    <Link href="#tickets">
                                        <span>Get Tickets</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
