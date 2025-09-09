"use client";
import { useEffect, useState, useTransition } from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
    { value: "en", label: "English" },
    { value: "de", label: "Deutsch" },
    { value: "nl", label: "Dutch" },
];

export function LanguageSelect({ value }: { value: string }) {
    const [isPending, startTransition] = useTransition();
    const [selected, setSelected] = useState<string>(value);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const qp = params.get('lang');
        if (qp && (qp === 'en' || qp === 'de' || qp === 'nl')) {
            setSelected(qp);
        } else {
            setSelected(value);
        }
    }, [value]);

    async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const locale = e.target.value;
        setSelected(locale);
        startTransition(() => {
            const url = new URL(window.location.href);
            url.pathname = '/home';
            url.searchParams.set('lang', locale);
            window.location.assign(url.toString());
        });
    }

    return (
        <div className="relative">
            <ChevronsUpDown className="pointer-events-none absolute inset-y-0 right-2 my-auto opacity-75" size="0.75rem" />
            <select
                className={cn(
                    'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground shadow-xs flex h-9 w-full min-w-32 appearance-none rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                )}
                name="language"
                onChange={handleChange}
                value={selected}
                disabled={isPending}
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}


