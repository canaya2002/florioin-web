import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Inbox,
  ListChecks,
  Mail,
  ScrollText,
  Shield,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { isLocale } from "@/i18n/locales";

type PageParams = { params: Promise<{ locale: string }> };

export const metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const isEs = locale === "es";
  const lp = `/${locale}`;

  const steps = isEs
    ? [
        {
          when: "En 1 hora",
          title: "Email de confirmación",
          body: "Te llega un email con un resumen de tu solicitud y mi número directo por si quieres adelantar la conversación.",
        },
        {
          when: "En < 24 h",
          title: "Email personal de Carlos",
          body: "Te escribo yo personalmente con preguntas concretas sobre tu equipo + propuesta de calendario.",
        },
        {
          when: "Día 2",
          title: "Workspace listo",
          body: "Configuramos tu workspace para tu industria, te enviamos un invite como Owner y agendamos onboarding del equipo.",
        },
      ]
    : [
        {
          when: "Within 1 hour",
          title: "Confirmation email",
          body: "You'll get an email summarizing your request and my direct number in case you want to fast-forward.",
        },
        {
          when: "Within < 24 h",
          title: "Personal email from Carlos",
          body: "I'll write you personally with specific questions about your team and a proposed schedule.",
        },
        {
          when: "Day 2",
          title: "Workspace ready",
          body: "We configure your workspace for your industry, send you an Owner invite, and schedule team onboarding.",
        },
      ];

  // ── While you wait — product modules to explore ─────────────────────
  const modules = [
    {
      icon: Sparkles,
      tint: "#ff8dda",
      label: "Co-Pilot",
      href: `${lp}/product/ai-copilot`,
      teaser: isEs
        ? "Habla. Decide. Y se hace. RAG sobre tu workspace, no sobre internet."
        : "Speak. Decide. Done. RAG over your workspace, not the internet.",
    },
    {
      icon: ListChecks,
      tint: "#a88cff",
      label: isEs ? "Tareas" : "Tasks",
      href: `${lp}/product/tasks`,
      teaser: isEs
        ? "List, Board, Timeline, Gantt y Calendar. Cada vista en menos de 100ms."
        : "List, Board, Timeline, Gantt and Calendar. Every view in under 100ms.",
    },
    {
      icon: ScrollText,
      tint: "#38e4ff",
      label: "Docs",
      href: `${lp}/product/docs`,
      teaser: isEs
        ? "Editor block-based, comentarios, plantillas, búsqueda semántica."
        : "Block-based editor, comments, templates, semantic search.",
    },
    {
      icon: Inbox,
      tint: "#f25bd8",
      label: "Inbox",
      href: `${lp}/product/inbox`,
      teaser: isEs
        ? "Email, Slack, Teams y WhatsApp — clasificado por IA en un feed."
        : "Email, Slack, Teams and WhatsApp — AI-classified in one feed.",
    },
  ];

  // ── Quick links for further exploration ─────────────────────────────
  const links = isEs
    ? [
        {
          href: `${lp}/security`,
          icon: Shield,
          label: "Cómo protegemos tus datos",
          hint: "RLS · SSO · SOC 2 · GDPR",
        },
        {
          href: `${lp}/pricing`,
          icon: Sparkles,
          label: "Lo que vas a pagar (y por qué)",
          hint: "$3 por seat · cero tiers · 30-day refund",
        },
        {
          href: `${lp}/changelog`,
          icon: Clock,
          label: "Qué hemos shipeado este mes",
          hint: "Notas de release semanales",
        },
        {
          href: `${lp}/blog`,
          icon: ScrollText,
          label: "Por qué construimos esto",
          hint: "Posts del founder, ~5 min lectura",
        },
      ]
    : [
        {
          href: `${lp}/security`,
          icon: Shield,
          label: "How we protect your data",
          hint: "RLS · SSO · SOC 2 · GDPR",
        },
        {
          href: `${lp}/pricing`,
          icon: Sparkles,
          label: "What you'll pay (and why)",
          hint: "$3 per seat · zero tiers · 30-day refund",
        },
        {
          href: `${lp}/changelog`,
          icon: Clock,
          label: "What we shipped this month",
          hint: "Weekly release notes",
        },
        {
          href: `${lp}/blog`,
          icon: ScrollText,
          label: "Why we built this",
          hint: "Founder posts, ~5 min reads",
        },
      ];

  // ── Pre-onboarding mini FAQ ─────────────────────────────────────────
  const quickFaqs = isEs
    ? [
        {
          q: "¿Cuándo recibo el email de Carlos?",
          a: "En menos de 24 horas hábiles (LATAM/US). Si llenaste el form un viernes en la tarde, te respondemos lunes en la mañana.",
        },
        {
          q: "¿Qué incluye el email de seguimiento?",
          a: "Tres preguntas concretas sobre tu equipo, opciones de calendario para onboarding, y un link al workspace pre-configurado.",
        },
        {
          q: "¿Y si quiero adelantar?",
          a: "Responde el email automático con tu número o agenda directo conmigo. Sin formularios extra.",
        },
      ]
    : [
        {
          q: "When do I get Carlos's email?",
          a: "Within 24 business hours (LATAM/US). If you filled the form Friday afternoon, we reply Monday morning.",
        },
        {
          q: "What does the follow-up email include?",
          a: "Three specific questions about your team, calendar options for onboarding, and a link to the pre-configured workspace.",
        },
        {
          q: "What if I want to speed things up?",
          a: "Reply to the auto-email with your number or book directly with me. No extra forms.",
        },
      ];

  return (
    <>
      {/* Hero — success blob */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-12)] pt-[140px] lg:pt-[180px]">
        <FloatingOrbs parallax={0.4} />
        <Container className="relative z-10 flex flex-col items-center gap-[var(--space-8)] text-center">
          <div className="relative w-full max-w-[680px]">
            <div
              className="relative isolate flex flex-col items-center gap-[var(--space-6)] overflow-hidden px-8 py-14 text-white animate-morph md:px-12 md:py-16"
              style={{
                background: "linear-gradient(135deg,#34c79a,#38e4ff 50%,#a88cff)",
                borderRadius: "96px 64px 84px 72px / 72px 84px 64px 96px",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-[-30%] -left-1/3 w-2/3 animate-sheen-wave"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
                  animationDuration: "9s",
                  mixBlendMode: "soft-light",
                }}
              />
              <span
                aria-hidden
                className="grid h-16 w-16 place-items-center rounded-full bg-white/25 text-white backdrop-blur animate-breathe"
              >
                <CheckCircle2 className="h-8 w-8" strokeWidth={2.4} />
              </span>
              <h1 className="font-display text-[clamp(40px,6.5vw,84px)] leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
                {isEs ? "Recibido. Gracias." : "Received. Thank you."}
              </h1>
              <p className="max-w-[520px] text-[17px] leading-[1.55] text-white/95">
                {isEs
                  ? "Carlos te va a escribir personalmente en las próximas 24 horas a tu email empresarial."
                  : "Carlos will personally email you within 24 hours at your work email."}
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-[13px] font-medium text-white backdrop-blur">
                <Clock className="h-3.5 w-3.5" />
                {isEs
                  ? "Confirmación enviada a tu email"
                  : "Confirmation sent to your inbox"}
              </div>
            </div>
          </div>

          {/* Trust pills under the success blob */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: isEs ? "Respuesta < 24 h" : "Reply < 24 h" },
              { label: isEs ? "Sin sales call" : "No sales call" },
              { label: isEs ? "Reembolso 30 días" : "30-day refund" },
              { label: isEs ? "Cancela cuando quieras" : "Cancel anytime" },
            ].map((p, i) => (
              <span
                key={p.label}
                className="lozenge inline-flex animate-breathe items-center gap-2 px-3.5 py-1.5 text-[12.5px] font-medium text-[var(--fg-secondary)]"
                style={{
                  animationDelay: `${i * -0.7}s`,
                  animationDuration: `${8 + (i % 2)}s`,
                }}
              >
                <CheckCircle2
                  className="h-3 w-3 text-[#1f8a5b]"
                  strokeWidth={2.5}
                />
                {p.label}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Next steps timeline */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mx-auto mb-[var(--space-10)] max-w-[820px] text-center">
            <span className="eyebrow mb-[var(--space-3)] inline-block">
              {isEs ? "Qué sigue" : "What's next"}
            </span>
            <h2 className="font-display text-[clamp(28px,3.8vw,48px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  De aquí a tu equipo operando:{" "}
                  <span className="text-gradient">3 movimientos.</span>
                </>
              ) : (
                <>
                  From here to your team running:{" "}
                  <span className="text-gradient">3 moves.</span>
                </>
              )}
            </h2>
          </div>

          <ol className="relative grid gap-[var(--space-6)] md:grid-cols-3">
            <div
              aria-hidden
              className="pointer-events-none absolute left-[8%] right-[8%] top-[88px] hidden h-px md:block"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,141,218,0.45), rgba(168,140,255,0.55), rgba(56,228,255,0.45), transparent)",
              }}
            />
            {steps.map((step, i) => {
              const radii = [
                "60px 88px 64px 80px / 80px 64px 88px 60px",
                "88px 60px 80px 64px / 60px 80px 64px 88px",
                "72px 96px 60px 84px / 84px 60px 96px 72px",
              ];
              const halos = [
                "radial-gradient(circle, rgba(255,141,218,0.30), transparent 65%)",
                "radial-gradient(circle, rgba(168,140,255,0.30), transparent 65%)",
                "radial-gradient(circle, rgba(56,228,255,0.30), transparent 65%)",
              ];
              return (
                <li
                  key={step.title}
                  className="relative bg-white p-[var(--space-7)]"
                  style={{ borderRadius: radii[i] }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-1/3 -z-10 opacity-50 blur-3xl"
                    style={{ background: halos[i] }}
                  />
                  <span
                    className="font-display text-[clamp(48px,4.5vw,72px)] leading-[0.85] tracking-[-0.05em] animate-breathe"
                    style={{
                      background: "var(--gradient-hero)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animationDelay: `${i * -1.4}s`,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#fafbfc] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                    <Clock className="h-3 w-3" />
                    {step.when}
                  </div>
                  <h3 className="mt-3 font-display text-[20px] leading-tight tracking-[-0.025em]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[var(--fg-muted)]">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* While you wait — product modules */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mb-[var(--space-10)] flex flex-col items-start gap-[var(--space-3)] lg:items-center lg:text-center">
            <span className="eyebrow-pill inline-flex">
              <span className="dot" aria-hidden />
              <span>{isEs ? "Mientras esperas" : "While you wait"}</span>
            </span>
            <h2 className="max-w-3xl font-display text-[clamp(28px,3.8vw,48px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Explora los{" "}
                  <span className="text-gradient">4 módulos</span> que vas a usar.
                </>
              ) : (
                <>
                  Explore the{" "}
                  <span className="text-gradient">4 modules</span> you&apos;ll be using.
                </>
              )}
            </h2>
          </div>

          <ul className="grid gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m, i) => {
              const Icon = m.icon;
              const radii = [
                "60px 88px 64px 80px / 80px 64px 88px 60px",
                "88px 60px 80px 64px / 60px 80px 64px 88px",
                "72px 96px 60px 84px / 84px 60px 96px 72px",
                "84px 64px 96px 60px / 60px 96px 64px 84px",
              ];
              return (
                <li key={m.label}>
                  <Link
                    href={m.href}
                    className="group relative flex h-full flex-col gap-3 overflow-hidden bg-white p-[var(--space-6)] transition-transform duration-[var(--duration-base)] hover:-translate-y-1.5"
                    style={{ borderRadius: radii[i] }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-1/3 -z-10 opacity-50 blur-3xl transition-opacity duration-[var(--duration-base)] group-hover:opacity-80"
                      style={{
                        background: `radial-gradient(circle, ${m.tint}45, transparent 65%)`,
                      }}
                    />
                    <span
                      aria-hidden
                      className="grid h-11 w-11 place-items-center rounded-full text-white"
                      style={{ background: m.tint }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className="font-display text-[clamp(18px,1.8vw,22px)] leading-tight tracking-tight text-[var(--fg)]">
                      {m.label}
                    </span>
                    <span className="text-[13.5px] leading-[1.55] text-[var(--fg-muted)]">
                      {m.teaser}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1 text-[12.5px] font-semibold text-[var(--primary)]">
                      {isEs ? "Ver módulo" : "See module"}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Quick links — security, pricing, changelog, blog */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mb-[var(--space-10)] flex flex-col items-start gap-[var(--space-3)]">
            <span className="eyebrow">
              {isEs ? "Léelo en paralelo" : "Read in parallel"}
            </span>
            <h2 className="font-display text-[clamp(26px,3vw,38px)] leading-[1.1] tracking-[-0.035em] [text-wrap:balance]">
              {isEs
                ? "Materiales útiles antes del onboarding."
                : "Useful materials before onboarding."}
            </h2>
          </div>

          <ul className="grid gap-[var(--space-4)] sm:grid-cols-2">
            {links.map((l, i) => {
              const Icon = l.icon;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-4 rounded-full bg-[#fafbfc] p-3 pl-4 pr-5 transition-transform duration-[var(--duration-base)] hover:-translate-y-1 hover:bg-white"
                  >
                    <span
                      aria-hidden
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white"
                      style={{ background: "var(--gradient-hero)" }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div className="flex flex-1 flex-col gap-0.5">
                      <span className="text-[14.5px] font-semibold text-[var(--fg)]">
                        {l.label}
                      </span>
                      <span className="text-[12.5px] text-[var(--fg-muted)]">
                        {l.hint}
                      </span>
                    </div>
                    <ArrowRight
                      className="h-4 w-4 -translate-x-1 text-[var(--fg-subtle)] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden
                    />
                    <span className="sr-only">{i}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Quick FAQ */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mb-[var(--space-8)] flex flex-col items-start gap-[var(--space-3)]">
            <span className="eyebrow">
              {isEs ? "Por si acaso" : "Just in case"}
            </span>
            <h2 className="font-display text-[clamp(24px,2.8vw,32px)] leading-[1.1] tracking-[-0.03em]">
              {isEs ? "Tres preguntas frecuentes." : "Three quick FAQs."}
            </h2>
          </div>
          <ul className="mx-auto flex max-w-3xl flex-col gap-[var(--space-4)]">
            {quickFaqs.map((faq, i) => {
              const radii = [
                "32px 44px 36px 40px / 40px 36px 44px 32px",
                "44px 32px 40px 36px / 32px 40px 36px 44px",
                "36px 44px 32px 40px / 40px 32px 44px 36px",
              ];
              return (
                <li
                  key={faq.q}
                  className="bg-[#fafbfc] p-[var(--space-6)]"
                  style={{ borderRadius: radii[i] }}
                >
                  <h3 className="font-display text-[16px] leading-tight tracking-tight text-[var(--fg)]">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[var(--fg-muted)]">
                    {faq.a}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Bottom action row */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-24)]">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={lp}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--fg)] transition-transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-4 w-4" />
              {isEs ? "Volver al inicio" : "Back home"}
            </Link>
            <Link
              href={`${lp}/blog`}
              className="inline-flex items-center gap-2 rounded-full bg-[#fafbfc] px-5 py-3 text-sm font-medium text-[var(--fg-secondary)] transition-transform hover:-translate-y-0.5"
            >
              {isEs ? "Leer el blog" : "Read the blog"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:carlos@florioin.com"
              className="inline-flex items-center gap-2 rounded-full bg-[#fafbfc] px-5 py-3 text-sm font-medium text-[var(--fg-secondary)] transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" />
              carlos@florioin.com
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
