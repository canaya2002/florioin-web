"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Footer({ locale, dict }: FooterProps) {
  const lp = `/${locale}`;
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

  const isEs = locale === "es";
  const cols = [
    {
      title: dict.footer.product,
      links: [
        { href: `${lp}/product`, label: dict.nav.productOverview },
        { href: `${lp}/product/ai-copilot`, label: dict.nav.productAi },
        { href: `${lp}/product/tasks`, label: dict.nav.productTasks },
        { href: `${lp}/product/docs`, label: dict.nav.productDocs },
        { href: `${lp}/product/inbox`, label: dict.nav.productInbox },
        { href: `${lp}/product/integrations`, label: dict.nav.productIntegrations },
        { href: `${lp}/pricing`, label: dict.nav.pricing },
      ],
    },
    {
      title: isEs ? "Capacidades" : "Capabilities",
      links: [
        { href: `${lp}#capabilities`, label: isEs ? "Trabajo" : "Work" },
        { href: `${lp}#capabilities`, label: isEs ? "Conocimiento" : "Knowledge" },
        { href: `${lp}#capabilities`, label: isEs ? "Comunicacion" : "Communication" },
        { href: `${lp}#capabilities`, label: isEs ? "AI Co-Piloto" : "AI Co-Pilot" },
        { href: `${lp}#capabilities`, label: isEs ? "Automatizacion" : "Automation" },
        { href: `${lp}#capabilities`, label: "Enterprise" },
      ],
    },
    {
      title: isEs ? "Casos de uso" : "Use cases",
      links: [
        { href: `${lp}#use-cases`, label: isEs ? "Marketing" : "Marketing" },
        { href: `${lp}#use-cases`, label: isEs ? "Operaciones" : "Operations" },
        { href: `${lp}#use-cases`, label: isEs ? "Ventas" : "Sales" },
        { href: `${lp}#use-cases`, label: isEs ? "Producto" : "Product" },
        { href: `${lp}#use-cases`, label: isEs ? "Soporte" : "Support" },
        { href: `${lp}#use-cases`, label: isEs ? "RH y Finanzas" : "HR & Finance" },
      ],
    },
    {
      title: isEs ? "Industrias" : "Industries",
      links: [
        { href: `${lp}/solutions/logistics`, label: isEs ? "Logistica" : "Logistics" },
        { href: `${lp}/solutions/manufacturing`, label: isEs ? "Manufactura" : "Manufacturing" },
        { href: `${lp}/solutions/consulting`, label: isEs ? "Servicios pro" : "Pro services" },
        { href: `${lp}/solutions/healthcare`, label: isEs ? "Salud" : "Health" },
        { href: `${lp}/solutions/construction`, label: isEs ? "Construccion" : "Construction" },
        { href: `${lp}/solutions`, label: isEs ? "Ver todas" : "See all" },
      ],
    },
    {
      title: dict.footer.company,
      links: [
        { href: `${lp}/about`, label: dict.nav.about },
        { href: `${lp}/careers`, label: dict.nav.careers },
        { href: `${lp}/customers`, label: dict.nav.customers },
        { href: `${lp}/blog`, label: dict.nav.blog },
        { href: `${lp}/changelog`, label: dict.nav.changelog },
        { href: `${lp}/contact`, label: dict.nav.contact },
      ],
    },
    {
      title: isEs ? "Recursos" : "Resources",
      links: [
        { href: `${lp}/security`, label: dict.nav.security },
        { href: `${lp}/legal/privacy`, label: isEs ? "Privacidad" : "Privacy" },
        { href: `${lp}/legal/terms`, label: isEs ? "Terminos" : "Terms" },
        { href: `${lp}/legal/dpa`, label: "DPA" },
        { href: `${lp}/legal/cookies`, label: "Cookies" },
        { href: SITE.statusUrl, label: dict.footer.status, external: true },
      ],
    },
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative isolate mt-[var(--space-16)] overflow-hidden border-t border-[var(--border-glass)] py-[var(--space-16)]"
    >
      {/* Animated gradient background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[200px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.6), transparent)",
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />
      
      {/* Subtle animated orb */}
      <motion.div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, rgba(168, 140, 255, 0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="container-wide relative flex flex-col gap-[var(--space-12)]">
        <div className="grid gap-[var(--space-10)] md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] xl:grid-cols-[1.4fr_repeat(6,1fr)]">
          {/* Brand column */}
          <motion.div 
            className="flex flex-col gap-[var(--space-4)] xl:col-span-1 lg:col-span-4 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Logo size="md" />
            </motion.div>
            <p className="max-w-xs text-[15px] text-[var(--fg-muted)]">
              {dict.footer.tagline}
            </p>
            <div className="mt-2 flex items-center gap-2">
              {[
                { href: SOCIAL_LINKS.twitter, label: "Twitter", Icon: TwitterIcon },
                { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
                { href: SOCIAL_LINKS.github, label: "GitHub", Icon: GitHubIcon },
              ].map(({ href, label, Icon }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  rel="noreferrer"
                  target="_blank"
                  aria-label={label}
                  className="rounded-full p-2 text-[var(--fg-muted)] transition-all hover:bg-[var(--glass)] hover:text-[var(--fg)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.1 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {cols.map((col, colIndex) => (
            <motion.div 
              key={col.title} 
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 + colIndex * 0.05, ease: EASE_OUT_EXPO }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link, linkIndex) => (
                  <motion.li 
                    key={`${col.title}-${link.label}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: 0.2 + colIndex * 0.05 + linkIndex * 0.02 }}
                  >
                    {"external" in link && link.external ? (
                      <motion.a
                        href={link.href}
                        rel="noreferrer"
                        target="_blank"
                        className="text-[15px] text-[var(--fg-secondary)] transition-colors hover:text-[var(--fg)]"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.15 }}
                      >
                        {link.label}
                      </motion.a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[15px] text-[var(--fg-secondary)] transition-colors hover:text-[var(--fg)]"
                      >
                        <motion.span
                          className="inline-block"
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.15 }}
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div 
          className="flex flex-col items-start justify-between gap-4 border-t border-[var(--border-glass)] pt-8 text-sm text-[var(--fg-muted)] md:flex-row md:items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>{dict.footer.copyright.replace("{year}", String(year))}</p>
          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function TwitterIcon() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.244 2H21l-6.51 7.44L22 22h-6.93l-4.83-6.32L4.6 22H2l6.96-7.96L1.5 2h7.07l4.36 5.79L18.244 2Zm-2.43 18h1.93L7.27 4H5.2l10.616 16Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.3-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.75.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
