"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "@/contexts/locale-context";
import { locales, type Locale } from "@/lib/translations";
import { Globe } from "lucide-react";

const languageNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  nl: "Nederlands",
};

const languageFlags: Record<Locale, string> = {
  en: "🇬🇧",
  de: "🇩🇪",
  nl: "🇳🇱",
};

interface LanguageSwitcherProps {
  variant?: "default" | "header";
}

export function LanguageSwitcher({
  variant = "default",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale();

  if (variant === "header") {
    return (
      <Select
        value={locale}
        onValueChange={(value) => setLocale(value as Locale)}
      >
        <SelectTrigger className="w-[140px] h-9 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-colors">
          <Globe className="h-4 w-4 mr-2 opacity-80" />
          <SelectValue>
            <span className="flex items-center gap-1.5">
              <span>{languageFlags[locale]}</span>
              <span className="text-sm">{languageNames[locale]}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-background/95 backdrop-blur-sm">
          {locales.map((lang) => (
            <SelectItem key={lang} value={lang}>
              <span className="flex items-center gap-2">
                <span>{languageFlags[lang]}</span>
                <span>{languageNames[lang]}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Select
      value={locale}
      onValueChange={(value) => setLocale(value as Locale)}
    >
      <SelectTrigger>
        <Globe className="h-4 w-4 mr-2 opacity-70" />
        <SelectValue>
          <span className="flex items-center gap-1.5">
            <span>{languageFlags[locale]}</span>
            <span className="text-sm">{languageNames[locale]}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {locales.map((lang) => (
          <SelectItem key={lang} value={lang}>
            <span className="flex items-center gap-2">
              <span>{languageFlags[lang]}</span>
              <span>{languageNames[lang]}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
