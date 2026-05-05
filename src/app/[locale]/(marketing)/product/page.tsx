import { ArrowRight, Inbox, ListChecks, ScrollText, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { BentoCard } from "@/components/bento/bento-card";
import { BentoGrid } from "@/components/bento/bento-grid";
import { GradientPlaceholder } from "@/components/media/gradient-placeholder";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs ? "Producto" : "Product",
    description: isEs
      ? "Cuatro productos en uno: Tareas, Documentos, Co-Piloto IA y Bandeja unificada."
      : "Four products in one: Tasks, Docs, AI Co-Pilot, and Unified Inbox.",
  };
}

export default async function ProductOverviewPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  const pillars = [
    {
      slug: "ai-copilot",
      icon: Sparkles,
      title: dict.nav.productAi,
      tagline: isEs
        ? "El motor que entiende tu negocio"
        : "The engine that understands your business",
      description: isEs
        ? "Voz a tareas. RAG sobre tu workspace. Tool use real. Multi-modelo. Integraciones nativas."
        : "Voice to tasks. RAG over your workspace. Real tool use. Multi-model. Native integrations.",
    },
    {
      slug: "tasks",
      icon: ListChecks,
      title: dict.nav.productTasks,
      tagline: isEs
        ? "Gestión que tu equipo realmente usa"
        : "Task management your team actually uses",
      description: isEs
        ? "Tableros, listas, timelines, dependencias, custom fields. Cada vista renderea en menos de 100ms."
        : "Boards, lists, timelines, dependencies, custom fields. Every view paints in under 100ms.",
    },
    {
      slug: "docs",
      icon: ScrollText,
      title: dict.nav.productDocs,
      tagline: isEs
        ? "Documentos que escriben contigo"
        : "Docs that write with you",
      description: isEs
        ? "Editor block-based. Colaboración real-time. IA inline en cada cursor."
        : "Block-based editor. Real-time collaboration. AI inline at every cursor.",
    },
    {
      slug: "inbox",
      icon: Inbox,
      title: dict.nav.productInbox,
      tagline: isEs
        ? "Una sola bandeja para todo"
        : "One inbox for everything",
      description: isEs
        ? "Email, Slack, Teams, WhatsApp — clasificados por IA con respuestas sugeridas."
        : "Email, Slack, Teams, WhatsApp — AI-classified with suggested replies.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={isEs ? "El producto" : "The product"}
        title={
          isEs
            ? "Cuatro productos. Un workspace."
            : "Four products. One workspace."
        }
        description={
          isEs
            ? "FlorioIn une el trabajo, los documentos, la IA y la bandeja en una sola plataforma — para que tu equipo pase del cambio de contexto al trabajo terminado."
            : "FlorioIn unifies work, documents, AI, and inbox in one platform — so your team trades context-switching for finished work."
        }
        primaryCta={{ href: `${lp}/request-access`, label: dict.common.ctaPrimary }}
        secondaryCta={{ href: `${lp}/pricing`, label: isEs ? "Ver precios" : "See pricing" }}
        align="center"
      />

      <section className="container-wide section">
        <BentoGrid>
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const isLarge = i === 0; // AI Co-Pilot is hero
            return (
              <BentoCard
                key={pillar.slug}
                size={isLarge ? "large" : "wide"}
                eyebrow={pillar.title}
                title={pillar.tagline}
                description={pillar.description}
                visual={
                  isLarge ? (
                    <GradientPlaceholder
                      className="aspect-[16/10]"
                      caption={`${pillar.title} demo · drop into public/videos/demos/`}
                    />
                  ) : (
                    <div className="flex items-center justify-center">
                      <Icon
                        aria-hidden
                        className="h-20 w-20 text-[var(--primary)] opacity-60"
                      />
                    </div>
                  )
                }
                visualPosition={isLarge ? "below" : "side"}
                href={`${lp}/product/${pillar.slug}`}
                ctaLabel={isEs ? "Ver más" : "Learn more"}
              />
            );
          })}
          <BentoCard
            size="full"
            eyebrow={isEs ? "Integraciones" : "Integrations"}
            title={
              isEs
                ? "Conecta lo que ya usas"
                : "Connect everything you already use"
            }
            description={
              isEs
                ? "200+ integraciones nativas: Google Workspace, Microsoft 365, Slack, GitHub, Salesforce, HubSpot, Stripe, y más."
                : "200+ native integrations: Google Workspace, Microsoft 365, Slack, GitHub, Salesforce, HubSpot, Stripe, and more."
            }
            href={`${lp}/product/integrations`}
            ctaLabel={isEs ? "Explorar integraciones" : "Explore integrations"}
            gradient
          />
        </BentoGrid>
      </section>

      <section className="container-default section">
        <div className="rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--bg-subtle)] p-10 md:p-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="flex flex-col gap-4">
              <span className="eyebrow">
                {isEs ? "Una sola plataforma" : "One platform"}
              </span>
              <h2 className="font-display text-[var(--fs-h2)] leading-tight tracking-tight">
                {isEs
                  ? "Web, móvil, escritorio. Donde estés."
                  : "Web, mobile, desktop. Wherever you are."}
              </h2>
              <p className="text-[15px] text-[var(--fg-muted)]">
                {isEs
                  ? "FlorioIn corre como app nativa en iOS, iPad, Android, macOS, Windows (Microsoft Store) y Linux. La web responsive cubre todo lo demás."
                  : "FlorioIn runs as a native app on iOS, iPad, Android, macOS, Windows (Microsoft Store), and Linux. Responsive web covers everything else."}
              </p>
              <Link
                href={`${lp}/request-access`}
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)]"
              >
                {dict.common.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                "iOS",
                "iPad",
                "Android",
                "macOS",
                "Windows",
                "Linux",
                "Web",
              ].map((platform) => (
                <span
                  key={platform}
                  className="rounded-full border border-[var(--border-strong)] bg-[var(--bg)] px-4 py-2 text-sm font-medium"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
