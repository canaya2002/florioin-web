"use client";

import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { locales, localeLabels, type Locale } from "@/i18n/locales";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  className?: string;
  variant?: "ghost" | "outline";
};

export function LanguageSwitcher({
  currentLocale,
  className,
  variant = "ghost",
}: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  const switchPath = (target: Locale) => {
    const stripped = pathname.replace(
      new RegExp(`^/(${locales.join("|")})(?=/|$)`),
      "",
    );
    return `/${target}${stripped || ""}`;
  };

  const handleSelect = (target: Locale) => {
    if (target === currentLocale) return;
    try {
      document.cookie = `NEXT_LOCALE=${target}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    } catch {
      /* cookie write may fail in private mode — ignore */
    }
    router.push(switchPath(target));
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          aria-label="Change language"
          className={className}
        >
          <Languages className="h-5 w-5" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            data-active={locale === currentLocale}
            onSelect={(event) => {
              event.preventDefault();
              handleSelect(locale);
            }}
            className="data-[active=true]:font-semibold data-[active=true]:text-[var(--primary)]"
          >
            {localeLabels[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
