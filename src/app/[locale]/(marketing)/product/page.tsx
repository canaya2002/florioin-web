import {
  ArrowRight,
  Inbox,
  ListChecks,
  Plug,
  ScrollText,
  Smartphone,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RevealOnScroll } from "@/components/animations/reveal-on-scroll";
import { Container } from "@/components/layout/container";
import { MediaSlot } from "@/components/media/media-slot";
import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";
import { pageMetadata } from "@/lib/seo";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isEs = locale === "es";
  return pageMetadata({
    locale,
    path: "/product",
    title: isEs ? "Producto" : "Product",
    description: isEs
      ? "Cuatro productos en uno: Tareas, Documentos, Co-Piloto IA y Bandeja unificada. Apps nativas en todas las plataformas."
      : "Four products in one: Tasks, Docs, AI Co-Pilot, and Unified Inbox. Native apps on every platform.",
  });
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
      tint: "#ff8dda",
      title: dict.nav.productAi,
      tagline: isEs
        ? "El motor que entiende tu negocio"
        : "The engine that understands your business",
      description: isEs
        ? "Voz a tareas. RAG sobre tu workspace. Tool use real. Multi-modelo. Integraciones nativas. Tu Co-Piloto ejecuta acciones reales, no solo conversa."
        : "Voice to tasks. RAG over your workspace. Real tool use. Multi-model. Native integrations. Your Co-Pilot executes real actions, not just chat.",
      bullets: isEs
        ? ["RAG sobre tu workspace", "Tool use real con aprobación", "GPT-5 · Sonnet 4.6 · Gemini 2.5"]
        : ["RAG over your workspace", "Real tool use with approval", "GPT-5 · Sonnet 4.6 · Gemini 2.5"],
      asset: "product/hub/copilot",
    },
    {
      slug: "tasks",
      icon: ListChecks,
      tint: "#a88cff",
      title: dict.nav.productTasks,
      tagline: isEs
        ? "Gestión que tu equipo realmente usa"
        : "Task management your team actually uses",
      description: isEs
        ? "Tableros, listas, timelines, Gantt, calendario. Dependencias reales, workload por persona, custom fields. Cada vista renderea en menos de 100ms incluso en datasets de 10K tareas."
        : "Boards, lists, timelines, Gantt, calendar. Real dependencies, per-person workload, custom fields. Every view paints in under 100ms even on 10K-task datasets.",
      bullets: isEs
        ? ["5 vistas · cambio instantáneo", "Dependencias y workload", "Automatizaciones nativas"]
        : ["5 views · instant switching", "Dependencies and workload", "Native automations"],
      asset: "product/hub/tasks",
    },
    {
      slug: "docs",
      icon: ScrollText,
      tint: "#38e4ff",
      title: dict.nav.productDocs,
      tagline: isEs
        ? "Documentos que escriben contigo"
        : "Docs that write with you",
      description: isEs
        ? "Editor block-based, colaboración real-time hasta 100 personas, comentarios threaded, IA inline en cada cursor. Doc se convierte en tarea con un atajo — sin perder contexto."
        : "Block-based editor, real-time collaboration up to 100 people, threaded comments, inline AI at every cursor. Doc becomes task with a shortcut — without losing context.",
      bullets: isEs
        ? ["Editor block-based", "Hasta 100 colaboradores en vivo", "Búsqueda semántica"]
        : ["Block-based editor", "Up to 100 live collaborators", "Semantic search"],
      asset: "product/hub/docs",
    },
    {
      slug: "inbox",
      icon: Inbox,
      tint: "#f25bd8",
      title: dict.nav.productInbox,
      tagline: isEs
        ? "Una sola bandeja para todo"
        : "One inbox for everything",
      description: isEs
        ? "Gmail, Outlook, Slack, Microsoft Teams, WhatsApp Business, SMS. Clasificados por IA, con borradores de respuesta sugeridos en tu tono. Convierte mensaje en tarea con Cmd+K."
        : "Gmail, Outlook, Slack, Microsoft Teams, WhatsApp Business, SMS. AI-classified with draft replies in your voice. Turn message into task with Cmd+K.",
      bullets: isEs
        ? ["6 canales unificados", "Triage automático por IA", "Reply en tu tono"]
        : ["6 unified channels", "Auto AI triage", "Replies in your voice"],
      asset: "product/hub/inbox",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={isEs ? "El producto" : "The product"}
        title={
          isEs ? (
            <>
              Cuatro productos.{" "}
              <span className="text-gradient animate-gradient">Un workspace.</span>
            </>
          ) : (
            <>
              Four products.{" "}
              <span className="text-gradient animate-gradient">One workspace.</span>
            </>
          )
        }
        description={
          isEs
            ? "FlorioIn une trabajo, documentos, IA y bandeja en una sola plataforma — para que tu equipo deje el context-switching y empiece a entregar trabajo terminado."
            : "FlorioIn unifies work, documents, AI, and inbox in one platform — so your team trades context-switching for finished work."
        }
        primaryCta={{
          href: `${lp}/request-access`,
          label: dict.common.ctaPrimary,
        }}
        secondaryCta={{
          href: `${lp}/pricing`,
          label: isEs ? "Ver precios" : "See pricing",
        }}
        align="center"
      />

      {/* ─────────────────────────────────────────────────────────
          Trust strip — quick pills
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-12)]">
        <Container>
          <RevealOnScroll
            direction="up"
            distance={14}
            duration={0.6}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {[
              isEs ? "Apps nativas en 7 plataformas" : "Native apps on 7 platforms",
              isEs ? "200+ integraciones" : "200+ integrations",
              isEs ? "Sub-100 ms en cada vista" : "Sub-100 ms on every view",
              isEs ? "ES + EN bilingüe" : "ES + EN bilingual",
              isEs ? "$3 USD por usuario" : "$3 USD per user",
            ].map((p, i) => (
              <span
                key={p}
                className="lozenge inline-flex animate-breathe items-center gap-2 px-3.5 py-1.5 text-[12.5px] font-medium text-[var(--fg-secondary)]"
                style={{
                  animationDelay: `${i * -0.7}s`,
                  animationDuration: `${8 + (i % 2)}s`,
                }}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--gradient-hero)" }}
                />
                {p}
              </span>
            ))}
          </RevealOnScroll>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Four pillars — alternating split rows with MediaSlots
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-16)]">
        <Container>
          <div className="flex flex-col gap-[var(--space-24)]">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const reversed = i % 2 === 1;
              const radii = [
                "96px 64px 84px 72px / 72px 84px 64px 96px",
                "64px 96px 72px 84px / 84px 72px 96px 64px",
                "84px 72px 96px 64px / 96px 64px 72px 84px",
                "72px 84px 64px 96px / 64px 96px 84px 72px",
              ];
              return (
                <RevealOnScroll
                  key={pillar.slug}
                  direction="up"
                  distance={20}
                  duration={0.7}
                  className="grid items-center gap-[var(--space-10)] lg:grid-cols-2"
                >
                  {/* Copy */}
                  <div
                    className={`flex flex-col gap-[var(--space-4)] ${
                      reversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="grid h-14 w-14 place-items-center rounded-full text-white"
                      style={{ background: pillar.tint }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.7} />
                    </span>
                    <span className="eyebrow">{pillar.title}</span>
                    <h2 className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.04] tracking-[-0.04em] text-[var(--fg)] [text-wrap:balance]">
                      {pillar.tagline}
                    </h2>
                    <p className="max-w-xl text-[var(--fs-body-lg)] leading-[1.55] text-[var(--fg-secondary)]">
                      {pillar.description}
                    </p>
                    <ul className="mt-1 flex flex-col gap-2">
                      {pillar.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-[14.5px] text-[var(--fg-secondary)]"
                        >
                          <span
                            aria-hidden
                            className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: pillar.tint }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`${lp}/product/${pillar.slug}`}
                      className="mt-2 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--primary)] underline-offset-4 hover:underline"
                    >
                      {isEs ? "Ver módulo" : "See module"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* MediaSlot */}
                  <div
                    className={`relative isolate ${
                      reversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -z-10 opacity-65 blur-3xl"
                      style={{
                        background: `radial-gradient(circle, ${pillar.tint}55, transparent 65%)`,
                      }}
                    />
                    <MediaSlot
                      name={pillar.asset}
                      aspect="16/10"
                      radius={radii[i]}
                    />
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Integrations callout
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="relative mx-auto max-w-[1100px]">
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-x-[10%] -inset-y-[20%] -z-10 opacity-60 blur-3xl"
              style={{ background: "var(--gradient-glow)" }}
            />
            <div
              className="relative isolate overflow-hidden bg-white p-[var(--space-10)] md:p-[var(--space-16)]"
              style={{
                borderRadius: "96px 64px 84px 72px / 72px 84px 64px 96px",
              }}
            >
              <div className="grid items-center gap-[var(--space-8)] lg:grid-cols-[1.2fr_1fr]">
                <div className="flex flex-col gap-[var(--space-4)]">
                  <span
                    aria-hidden
                    className="grid h-12 w-12 place-items-center rounded-full text-white"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    <Plug className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="eyebrow">
                    {isEs ? "Integraciones" : "Integrations"}
                  </span>
                  <h2 className="font-display text-[clamp(28px,3.8vw,44px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
                    {isEs ? (
                      <>
                        <span className="text-gradient">200+ integraciones</span>{" "}
                        nativas — conecta lo que ya usas.
                      </>
                    ) : (
                      <>
                        <span className="text-gradient">200+ native</span>{" "}
                        integrations — connect what you already use.
                      </>
                    )}
                  </h2>
                  <p className="max-w-xl text-[15px] text-[var(--fg-muted)]">
                    {isEs
                      ? "Google Workspace, Microsoft 365, Slack, GitHub, Salesforce, HubSpot, Stripe, Notion, Linear, Calendly, Zoom — y 190 más. OAuth nativo, sync bidireccional, sin Zapier en medio."
                      : "Google Workspace, Microsoft 365, Slack, GitHub, Salesforce, HubSpot, Stripe, Notion, Linear, Calendly, Zoom — and 190 more. Native OAuth, bi-directional sync, no Zapier middleman."}
                  </p>
                  <Link
                    href={`${lp}/product/integrations`}
                    className="mt-1 inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    {isEs ? "Explorar integraciones" : "Explore integrations"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="relative isolate">
                  <MediaSlot
                    name="product/hub/integrations-grid"
                    aspect="4/3"
                    radius="64px 96px 72px 84px / 84px 72px 96px 64px"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Platforms — devices everywhere
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mx-auto mb-[var(--space-10)] max-w-3xl text-center">
            <span className="eyebrow-pill inline-flex">
              <span
                aria-hidden
                className="grid h-4 w-4 place-items-center rounded-full text-white"
                style={{ background: "var(--gradient-hero)" }}
              >
                <Smartphone className="h-2.5 w-2.5" strokeWidth={2.4} />
              </span>
              <span>{isEs ? "Una sola plataforma" : "One platform"}</span>
            </span>
            <h2 className="mt-[var(--space-4)] font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Web, móvil, escritorio.{" "}
                  <span className="text-gradient">Donde estés.</span>
                </>
              ) : (
                <>
                  Web, mobile, desktop.{" "}
                  <span className="text-gradient">Wherever you are.</span>
                </>
              )}
            </h2>
            <p className="mt-[var(--space-3)] max-w-xl text-[15px] text-[var(--fg-muted)]">
              {isEs
                ? "Apps nativas en iOS, iPad, Android, macOS, Windows (Microsoft Store) y Linux. Sync en vivo, offline-first, atajos por plataforma."
                : "Native apps on iOS, iPad, Android, macOS, Windows (Microsoft Store) and Linux. Live sync, offline-first, platform-native shortcuts."}
            </p>
          </div>
          <ul className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2">
            {[
              { label: "iOS", tint: "#ff8dda" },
              { label: "iPad", tint: "#f25bd8" },
              { label: "Android", tint: "#34c79a" },
              { label: "macOS", tint: "#a88cff" },
              { label: "Windows", tint: "#79b8ff" },
              { label: "Linux", tint: "#38e4ff" },
              { label: "Web", tint: "#f5b14a" },
            ].map((p, i) => (
              <span
                key={p.label}
                className="lozenge inline-flex animate-breathe items-center gap-2 px-4 py-2 text-[13px] font-semibold text-[var(--fg)]"
                style={{
                  animationDelay: `${i * -0.6}s`,
                  animationDuration: `${8 + (i % 3)}s`,
                }}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: p.tint }}
                />
                {p.label}
              </span>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
