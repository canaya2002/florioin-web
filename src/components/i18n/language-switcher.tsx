"use client";

import { Languages } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const switchPath = (target: Locale) => {
    // Replace `/<currentLocale>` prefix with `/<target>`.
    const stripped = pathname.replace(
      new RegExp(`^/(${locales.join("|")})(?=/|$)`),
      "",
    );
    return `/${target}${stripped || ""}`;
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
          <DropdownMenuItem key={locale} asChild>
            <Link
              href={switchPath(locale)}
              data-active={locale === currentLocale}
              className="data-[active=true]:font-semibold data-[active=true]:text-[var(--primary)]"
            >
              {localeLabels[locale]}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
