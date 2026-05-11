"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
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

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Nav({ locale, dict }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isEs = locale === "es";
  const lp = `/${locale}`;
  const productLinks = [
    { href: `${lp}/product`, label: dict.nav.productOverview, icon: "overview" },
    { href: `${lp}/product/ai-copilot`, label: dict.nav.productAi, icon: "ai" },
    { href: `${lp}/product/tasks`, label: dict.nav.productTasks, icon: "tasks" },
    { href: `${lp}/product/docs`, label: dict.nav.productDocs, icon: "docs" },
    { href: `${lp}/product/inbox`, label: dict.nav.productInbox, icon: "inbox" },
    { href: `${lp}/product/integrations`, label: dict.nav.productIntegrations, icon: "integrations" },
  ];

  const useCaseLinks = [
    { href: `${lp}#use-cases`, label: isEs ? "Por equipo" : "By team" },
    { href: `${lp}/solutions`, label: isEs ? "Por industria" : "By industry" },
    { href: `${lp}#capabilities`, label: isEs ? "Capacidades" : "Capabilities" },
    { href: `${lp}#stack`, label: isEs ? "Reemplaza tu stack" : "Replace your stack" },
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
        <motion.nav
          ref={navRef}
          aria-label="Primary"
          style={mounted ? { scale: navScale } : undefined}
          className={cn(
            "relative flex h-[62px] items-center gap-[var(--space-3)] rounded-full border px-[var(--space-3)] pl-[var(--space-4)]",
            "backdrop-blur-[var(--blur-glass-strong)] backdrop-saturate-[150%]",
            "transition-all duration-[var(--duration-base)] ease-[var(--ease-in-out)]",
            scrolled
              ? "bg-[var(--glass-strong)] border-[var(--border-glass)] shadow-[var(--shadow-glass)]"
              : "bg-[var(--glass)] border-[var(--border-glass)] shadow-[var(--shadow-md)]",
          )}
          initial={false}
          animate={mounted ? { y: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          {/* Dynamic backdrop blur */}
          <motion.div 
            className="absolute inset-0 -z-10 rounded-full"
            style={{ 
              backdropFilter: `blur(${navBlur}px) saturate(150%)`,
              WebkitBackdropFilter: `blur(${navBlur}px) saturate(150%)`,
            }}
          />

          {/* Top highlight - animated on scroll */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-x-[22px] top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"
            animate={{ opacity: scrolled ? 0.9 : 0.7 }}
          />

          {/* Logo with hover animation */}
          <Link
            href={lp}
            className="group flex items-center gap-[var(--space-2)]"
            aria-label={dict.common.brand}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Logo size="md" />
            </motion.div>
          </Link>

          {/* Navigation links with enhanced dropdowns */}
          <ul className="ml-[var(--space-4)] hidden items-center gap-[2px] lg:flex">
            <NavDropdown label={dict.nav.product} items={productLinks} featured />
            <NavDropdown
              label={isEs ? "Casos de uso" : "Use cases"}
              items={useCaseLinks}
            />
            <NavLink href={`${lp}/pricing`}>{dict.nav.pricing}</NavLink>
            <NavDropdown label={dict.nav.resources} items={resourceLinks} />
            <NavDropdown label={dict.nav.company} items={companyLinks} />
          </ul>

          {/* Right side actions */}
          <div className="ml-auto flex items-center gap-[var(--space-2)]">
            <motion.a
              href={APP_LOGIN_URL}
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] md:inline-flex"
              whileHover={{ x: 2 }}
            >
              {dict.common.ctaSignIn}
            </motion.a>
            <LanguageSwitcher currentLocale={locale} />
            <Link
              href={`${lp}/request-access`}
              className="hidden md:inline-flex"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="sm" variant="primary" className="group">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" />
                  {dict.common.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </motion.div>
            </Link>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.nav>
      </div>

      <NavMobile
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        locale={locale}
        dict={dict}
        productLinks={productLinks}
        useCaseLinks={useCaseLinks}
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
        className="relative rounded-full px-3.5 py-2 text-sm font-medium text-[var(--fg-secondary)] transition-[background-color,color] duration-[var(--duration-fast)] ease-[var(--ease-in-out)] hover:bg-[var(--glass)] hover:text-[var(--fg)]"
      >
        <motion.span
          className="relative z-10"
          whileHover={{ y: -1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      </Link>
    </li>
  );
}

function NavDropdown({
  label,
  items,
  featured = false,
}: {
  label: string;
  items: { href: string; label: string; icon?: string }[];
  featured?: boolean;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <li>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <motion.button
            type="button"
            className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-[var(--fg-secondary)] transition-[background-color,color] duration-[var(--duration-fast)] ease-[var(--ease-in-out)] hover:bg-[var(--glass)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
          >
            {label}
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            </motion.span>
          </motion.button>
        </DropdownMenuTrigger>
        <AnimatePresence>
          {isOpen && (
            <DropdownMenuContent 
              className={cn(
                "min-w-[14rem] overflow-hidden",
                featured && "min-w-[16rem]"
              )}
              asChild
              forceMount
            >
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
              >
                {items.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                  >
                    <DropdownMenuItem
                      onSelect={(event) => {
                        event.preventDefault();
                        router.push(item.href);
                      }}
                      className="group cursor-pointer transition-colors duration-150"
                    >
                      <motion.span
                        className="flex w-full items-center gap-2"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.15 }}
                      >
                        {featured && (
                          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--glass)] text-[var(--fg-muted)] transition-colors group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-fg)]">
                            <span className="h-3 w-3 rounded-sm bg-current opacity-50" />
                          </span>
                        )}
                        {item.label}
                      </motion.span>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </motion.div>
            </DropdownMenuContent>
          )}
        </AnimatePresence>
      </DropdownMenu>
    </li>
  );
}
