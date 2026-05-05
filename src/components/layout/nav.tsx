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
    const onScroll = () => setScrolled(window.scrollY > 8);
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
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-[var(--ease-out-expo)]",
        scrolled
          ? "border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="container-wide flex h-16 items-center justify-between gap-6"
      >
        <Link
          href={lp}
          className="flex items-center"
          aria-label={dict.common.brand}
        >
          <Logo size="md" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          <NavDropdown label={dict.nav.product} items={productLinks} />
          <NavLink href={`${lp}/solutions`}>{dict.nav.solutions}</NavLink>
          <NavLink href={`${lp}/pricing`}>{dict.nav.pricing}</NavLink>
          <NavDropdown label={dict.nav.resources} items={resourceLinks} />
          <NavDropdown label={dict.nav.company} items={companyLinks} />
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href={APP_LOGIN_URL}
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] md:inline-flex"
          >
            {dict.common.ctaSignIn}
          </a>
          <ThemeToggle />
          <LanguageSwitcher currentLocale={locale} />
          <Link href={`${lp}/request-access`} className="hidden md:inline-flex">
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
        className="rounded-full px-3 py-2 text-sm font-medium text-[var(--fg-secondary)] transition-colors hover:text-[var(--fg)]"
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
            className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-[var(--fg-secondary)] transition-colors hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
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
