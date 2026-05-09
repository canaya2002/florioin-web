"use client";

import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { APP_LOGIN_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { NavMobile } from "./nav-mobile";

type NavProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Nav({ locale, dict }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lp = `/${locale}`;
  const productLinks = [
    { href: `${lp}/product`, label: dict.nav.productOverview },
    { href: `${lp}/product/ai-copilot`, label: dict.nav.productAi },
    { href: `${lp}/product/tasks`, label: dict.nav.productTasks },
    { href: `${lp}/product/docs`, label: dict.nav.productDocs },
    { href: `${lp}/product/inbox`, label: dict.nav.productInbox },
    { href: `${lp}/product/integrations`, label: dict.nav.productIntegrations },
  ];

  const resourceLinks = [
    { href: `${lp}/blog`, label: dict.nav.blog },
    { href: `${lp}/changelog`, label: dict.nav.changelog },
    { href: `${lp}/customers`, label: dict.nav.customers },
    { href: `${lp}/security`, label: dict.nav.security },
  ];

  const companyLinks = [
    { href: `${lp}/about`, label: dict.nav.about },
    { href: `${lp}/careers`, label: dict.nav.careers },
    { href: `${lp}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-4 z-50 w-full px-[var(--space-4)]">
      <div className="mx-auto w-full max-w-[1440px]">
        <nav
          aria-label="Primary"
          className={cn(
            "relative flex h-[62px] items-center gap-[var(--space-3)] rounded-full border px-[var(--space-3)] pl-[var(--space-4)] backdrop-blur-[var(--blur-glass-strong)] backdrop-saturate-[150%]",
            "transition-[background-color,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-in-out)]",
            scrolled
              ? "bg-[var(--glass-strong)] border-[var(--border-glass)] shadow-[var(--shadow-glass)]"
              : "bg-[var(--glass)] border-[var(--border-glass)] shadow-[var(--shadow-md)]",
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-[22px] top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"
          />

          <Link
            href={lp}
            className="flex items-center gap-[var(--space-2)]"
            aria-label={dict.common.brand}
          >
            <Logo size="md" />
          </Link>

          <ul className="ml-[var(--space-4)] hidden items-center gap-[2px] lg:flex">
            <NavDropdown label={dict.nav.product} items={productLinks} />
            <NavLink href={`${lp}/solutions`}>{dict.nav.solutions}</NavLink>
            <NavLink href={`${lp}/pricing`}>{dict.nav.pricing}</NavLink>
            <NavDropdown label={dict.nav.resources} items={resourceLinks} />
            <NavDropdown label={dict.nav.company} items={companyLinks} />
          </ul>

          <div className="ml-auto flex items-center gap-[var(--space-2)]">
            <a
              href={APP_LOGIN_URL}
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] md:inline-flex"
            >
              {dict.common.ctaSignIn}
            </a>
            <ThemeToggle />
            <LanguageSwitcher currentLocale={locale} />
            <Link
              href={`${lp}/request-access`}
              className="hidden md:inline-flex"
            >
              <Button size="sm" variant="primary">
                {dict.common.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </div>

      <NavMobile
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        locale={locale}
        dict={dict}
        productLinks={productLinks}
        resourceLinks={resourceLinks}
        companyLinks={companyLinks}
      />
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="rounded-full px-3.5 py-2 text-sm font-medium text-[var(--fg-secondary)] transition-[background-color,color] duration-[var(--duration-fast)] ease-[var(--ease-in-out)] hover:bg-[var(--glass)] hover:text-[var(--fg)]"
      >
        {children}
      </Link>
    </li>
  );
}

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { href: string; label: string }[];
}) {
  return (
    <li>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-[var(--fg-secondary)] transition-[background-color,color] duration-[var(--duration-fast)] ease-[var(--ease-in-out)] hover:bg-[var(--glass)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            {label}
            <ChevronDown className="h-3.5 w-3.5" aria-hidden />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[14rem]">
          {items.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href}>{item.label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
