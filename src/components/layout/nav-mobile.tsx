"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { APP_LOGIN_URL } from "@/lib/constants";

type NavMobileProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: Locale;
  dict: Dictionary;
  productLinks: { href: string; label: string }[];
  resourceLinks: { href: string; label: string }[];
  companyLinks: { href: string; label: string }[];
};

export function NavMobile({
  open,
  onOpenChange,
  locale,
  dict,
  productLinks,
  resourceLinks,
  companyLinks,
}: NavMobileProps) {
  const lp = `/${locale}`;

  const close = () => onOpenChange(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-[rgba(20,24,40,0.32)] backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-[70] flex h-full w-full max-w-sm flex-col border-l border-[var(--border-glass)] bg-[var(--glass-strong)] p-6 shadow-[var(--shadow-xl)] backdrop-blur-[var(--blur-glass-strong)] backdrop-saturate-[160%] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
          <DialogPrimitive.Title className="sr-only">
            Navigation
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            {dict.common.brand}
          </DialogPrimitive.Description>
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <DialogPrimitive.Close
              className="rounded-full p-2 text-[var(--fg-muted)] transition-colors hover:bg-[var(--glass)] hover:text-[var(--fg)]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </div>

          <nav
            aria-label="Mobile"
            className="mt-8 flex-1 overflow-y-auto"
          >
            <Accordion type="multiple" className="w-full">
              <MobileGroup label={dict.nav.product} items={productLinks} onNavigate={close} />
              <MobileLink href={`${lp}/solutions`} onClick={close}>
                {dict.nav.solutions}
              </MobileLink>
              <MobileLink href={`${lp}/pricing`} onClick={close}>
                {dict.nav.pricing}
              </MobileLink>
              <MobileGroup
                label={dict.nav.resources}
                items={resourceLinks}
                onNavigate={close}
              />
              <MobileGroup label={dict.nav.company} items={companyLinks} onNavigate={close} />
            </Accordion>
          </nav>

          <div className="mt-6 flex flex-col gap-3 border-t border-[var(--border-glass)] pt-6">
            <a
              href={APP_LOGIN_URL}
              className="text-center text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)]"
              onClick={close}
            >
              {dict.common.ctaSignIn}
            </a>
            <Link href={`${lp}/request-access`} onClick={close}>
              <Button size="lg" variant="primary" className="w-full">
                {dict.common.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between border-b border-[var(--border-glass)] py-5 text-left font-medium text-[var(--fg)]"
    >
      {children}
    </Link>
  );
}

function MobileGroup({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: { href: string; label: string }[];
  onNavigate: () => void;
}) {
  return (
    <AccordionItem value={label}>
      <AccordionTrigger className="font-medium text-[var(--fg)]">
        {label}
      </AccordionTrigger>
      <AccordionContent>
        <ul className="flex flex-col gap-3 pt-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="block py-1 text-[15px] text-[var(--fg-muted)] hover:text-[var(--fg)]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
