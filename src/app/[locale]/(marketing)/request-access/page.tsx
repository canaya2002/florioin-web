import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  Clock,
  Users,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RevealOnScroll } from "@/components/animations/reveal-on-scroll";
import { AccessRequestForm } from "@/components/forms/access-request-form";
import { Container } from "@/components/layout/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd, faqSchema } from "@/components/seo/json-ld";
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
    path: "/request-access",
    title: isEs ? "Solicitar acceso" : "Request access",
    description: isEs
      ? "Cuéntanos de tu equipo y te activamos en menos de 24 horas."
      : "Tell us about your team and we'll activate you within 24 hours.",
  });
}

export default async function RequestAccessPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";

  const personas = isEs
    ? [
        {
          icon: Users,
          tint: "#ff8dda",
          title: "Equipos de 5 a 200",
          body: "Donde Slack + Asana + Notion ya cuesta más que coordinarlos. Si tu equipo gasta más de 1h al día buscando contexto, somos para ti.",
        },
        {
          icon: Briefcase,
          tint: "#a88cff",
          title: "Operaciones que se repiten",
          body: "Marketing, ventas, ops, soporte. Procesos que cambian poco pero requieren coordinación constante entre 6+ herramientas.",
        },
        {
          icon: Building2,
          tint: "#38e4ff",
          title: "Industrias reguladas",
          body: "Legal, salud, finanzas, construcción. Necesitas audit logs, RLS multi-tenant, y la capacidad de exportar todo en cualquier momento.",
        },
      ]
    : [
        {
          icon: Users,
          tint: "#ff8dda",
          title: "Teams of 5 to 200",
          body: "Where Slack + Asana + Notion already costs more than coordinating them. If your team spends > 1h/day chasing context, we're for you.",
        },
        {
          icon: Briefcase,
          tint: "#a88cff",
          title: "Repeating operations",
          body: "Marketing, sales, ops, support. Processes that don't change much but need constant coordination across 6+ tools.",
        },
        {
          icon: Building2,
          tint: "#38e4ff",
          title: "Regulated industries",
          body: "Legal, healthcare, finance, construction. You need audit logs, multi-tenant RLS, and the ability to export everything anytime.",
        },
      ];

  const timeline = isEs
    ? [
        {
          when: "Hora 0",
          title: "Recibes confirmación",
          body: "Email automático con resumen de tu solicitud y mi número directo por si quieres adelantar.",
        },
        {
          when: "< 24 h",
          title: "Te escribo personalmente",
          body: "Email mío (no SDR, no bot) con 3 preguntas concretas sobre tu equipo y opciones de calendario.",
        },
        {
          when: "Día 2",
          title: "Workspace pre-armado",
          body: "Configuramos tu workspace según tu industria, importamos data si lo necesitas, y te enviamos invite como Owner.",
        },
        {
          when: "Día 3-5",
          title: "Onboarding del equipo",
          body: "Sesión única de 30 min para todo el equipo. Configuramos integraciones críticas y dejamos templates listos.",
        },
        {
          when: "Día 7+",
          title: "En autopiloto",
          body: "Check-ins opcionales en semana 2 y mes 1. Soporte por email respondido en < 8h LATAM.",
        },
      ]
    : [
        {
          when: "Hour 0",
          title: "You get confirmation",
          body: "Automated email with summary of your request and my direct number in case you want to fast-forward.",
        },
        {
          when: "< 24 h",
          title: "I email you personally",
          body: "Email from me (no SDR, no bot) with 3 specific questions about your team and calendar options.",
        },
        {
          when: "Day 2",
          title: "Pre-built workspace",
          body: "We configure your workspace for your industry, import data if needed, and send you an Owner invite.",
        },
        {
          when: "Day 3-5",
          title: "Team onboarding",
          body: "Single 30-min session for the whole team. Configure critical integrations and leave templates ready.",
        },
        {
          when: "Day 7+",
          title: "On autopilot",
          body: "Optional check-ins at week 2 and month 1. Email support replied in < 8h LATAM.",
        },
      ];

  const preFormFaqs = isEs
    ? [
        {
          q: "¿Cuánto cuesta?",
          a: "$3 USD por usuario al mes. Sin tiers, sin features bloqueadas. Anual con 20% de descuento opcional.",
        },
        {
          q: "¿Cuánto tarda activarme?",
          a: "Menos de 24 horas hábiles. Si llenas el form hoy en la mañana, mañana ya tienes workspace operando.",
        },
        {
          q: "¿Pueden migrar mi data desde Notion / Asana / Slack?",
          a: "Sí. Tenemos importers nativos. En el onboarding te ayudamos a moverla sin perder un día de trabajo.",
        },
        {
          q: "¿Y si no funciona?",
          a: "Reembolso 100% en los primeros 30 días. Sin preguntas, sin retainers. Si no es lo que esperabas, te devolvemos todo.",
        },
      ]
    : [
        {
          q: "How much does it cost?",
          a: "$3 USD per user per month. No tiers, no locked features. Annual with optional 20% discount.",
        },
        {
          q: "How long does activation take?",
          a: "Less than 24 business hours. If you fill the form this morning, you have a working workspace by tomorrow.",
        },
        {
          q: "Can you migrate my data from Notion / Asana / Slack?",
          a: "Yes. We have native importers. During onboarding we help move it without losing a workday.",
        },
        {
          q: "What if it doesn't work?",
          a: "100% refund in the first 30 days. No questions, no retainers. If it isn't what you expected, full refund.",
        },
      ];

  const benefits = isEs
    ? [
        "Respuesta personal en < 24 h",
        "Workspace pre-configurado para tu industria",
        "Onboarding del equipo en 30 min",
        "Reembolso 100% en 30 días",
      ]
    : [
        "Personal reply in < 24 h",
        "Workspace pre-configured for your industry",
        "Team onboarding in 30 min",
        "100% refund in 30 days",
      ];

  return (
    <>
      <JsonLd
        data={faqSchema(
          preFormFaqs.map((f) => ({ question: f.q, answer: f.a })),
        )}
      />
      <PageHero
        eyebrow={isEs ? "Solicitar acceso" : "Request access"}
        title={
          isEs ? (
            <>
              Empieza con FlorioIn{" "}
              <span className="text-gradient animate-gradient">esta semana</span>
            </>
          ) : (
            <>
              Start with FlorioIn{" "}
              <span className="text-gradient animate-gradient">this week</span>
            </>
          )
        }
        description={
          isEs
            ? "Cuéntanos de tu equipo. Te respondemos en menos de 24 horas con tu workspace ya configurado. Sin demo calls de 60 minutos, sin SDR, sin perder un día."
            : "Tell us about your team. We respond within 24 hours with your workspace already configured. No 60-min demo calls, no SDR, no wasted day."
        }
      />

      {/* ─────────────────────────────────────────────────────────
          Who's it for — text-only, no cards
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-20)]">
        <Container>
          <div className="mb-[var(--space-12)] max-w-3xl">
            <span className="eyebrow mb-[var(--space-3)] inline-block">
              {isEs ? "Para quién es" : "Who it's for"}
            </span>
            <h2 className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Si encajas en{" "}
                  <span className="text-gradient">cualquiera de estos</span>,
                  llenemos el form.
                </>
              ) : (
                <>
                  If you fit{" "}
                  <span className="text-gradient">any of these</span>, let&apos;s
                  fill the form.
                </>
              )}
            </h2>
          </div>

          <ul className="grid gap-x-[var(--space-10)] gap-y-[var(--space-12)] md:grid-cols-3">
            {personas.map((p, i) => {
              const Icon = p.icon;
              return (
                <RevealOnScroll
                  key={p.title}
                  direction="up"
                  distance={18}
                  delay={i * 0.08}
                  duration={0.7}
                  className="flex flex-col items-start gap-[var(--space-4)]"
                >
                  <span
                    aria-hidden
                    className="grid h-14 w-14 place-items-center rounded-full text-white"
                    style={{ background: p.tint }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <h3 className="font-display text-[clamp(22px,2.4vw,28px)] leading-tight tracking-[-0.025em] text-[var(--fg)]">
                    {p.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-[var(--fg-secondary)]">
                    {p.body}
                  </p>
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Form (centerpiece) + tight side rail
          ───────────────────────────────────────────────────────── */}
      <section
        id="form"
        className="relative isolate overflow-hidden bg-white pb-[var(--space-24)]"
      >
        <Container className="relative">
          <div className="grid gap-x-[var(--space-12)] gap-y-[var(--space-10)] lg:grid-cols-[1.5fr_1fr]">
            {/* ── Form pebble — subtle background, clear hierarchy ── */}
            <RevealOnScroll
              direction="up"
              distance={20}
              duration={0.7}
              className="relative isolate overflow-hidden bg-[#fafbfc] p-[var(--space-8)] md:p-[var(--space-10)]"
              style={{
                borderRadius:
                  "60px 88px 64px 80px / 80px 64px 88px 60px",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-40 blur-3xl"
                style={{ background: "var(--gradient-glow)" }}
              />

              {/* Form heading + step indicator */}
              <div className="mb-[var(--space-8)] flex flex-col gap-[var(--space-2)]">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                  <Clock className="h-3 w-3 text-[var(--primary)]" />
                  {isEs ? "Tarda 90 segundos" : "Takes 90 seconds"}
                </span>
                <h2 className="font-display text-[clamp(26px,3vw,38px)] leading-tight tracking-[-0.03em]">
                  {isEs ? "Cuéntanos de tu equipo." : "Tell us about your team."}
                </h2>
                <p className="text-[14.5px] leading-[1.55] text-[var(--fg-muted)]">
                  {isEs
                    ? "Carlos te responde personalmente en menos de un día hábil."
                    : "Carlos replies personally in under one business day."}
                </p>
              </div>

              <AccessRequestForm locale={lang} dict={dict} />
            </RevealOnScroll>

            {/* ── Tight side rail — compact "What happens next" ── */}
            <aside className="flex flex-col gap-[var(--space-5)]">
              <RevealOnScroll
                direction="up"
                distance={18}
                delay={0.1}
                duration={0.7}
                className="flex flex-col gap-[var(--space-4)]"
              >
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                  {isEs ? "Qué pasa después" : "What happens next"}
                </h3>
                <ul className="flex flex-col gap-2">
                  {benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-[14px] text-[var(--fg-secondary)]"
                    >
                      <span
                        aria-hidden
                        className="mt-1 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full text-white"
                        style={{ background: "var(--gradient-hero)" }}
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            </aside>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Timeline — clean milestones, no dots, prominent time pills
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mx-auto mb-[var(--space-12)] max-w-3xl text-center">
            <span className="eyebrow mb-[var(--space-3)] inline-block">
              {isEs
                ? "Tu primera semana, hora por hora"
                : "Your first week, hour by hour"}
            </span>
            <h2 className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  De form a equipo operando{" "}
                  <span className="text-gradient">en 5 días.</span>
                </>
              ) : (
                <>
                  From form to operating team{" "}
                  <span className="text-gradient">in 5 days.</span>
                </>
              )}
            </h2>
          </div>

          <ol className="mx-auto flex max-w-3xl flex-col gap-[var(--space-10)]">
            {timeline.map((step, i) => (
              <RevealOnScroll
                key={step.title}
                direction="up"
                distance={14}
                delay={i * 0.05}
                duration={0.6}
                className="grid gap-[var(--space-4)] sm:grid-cols-[160px_1fr] sm:items-start sm:gap-[var(--space-8)]"
              >
                {/* Prominent gradient time pill */}
                <div className="flex sm:justify-end">
                  <span
                    className="inline-flex items-center justify-center rounded-full px-5 py-2 text-[14px] font-semibold text-white"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    {step.when}
                  </span>
                </div>
                {/* Title + body */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-[clamp(22px,2.4vw,28px)] leading-[1.15] tracking-[-0.025em]">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-[var(--fg-secondary)]">
                    {step.body}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </ol>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          FAQ
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-20)]">
        <Container>
          <div className="mx-auto mb-[var(--space-10)] max-w-3xl text-center">
            <span className="eyebrow mb-[var(--space-3)] inline-block">
              {isEs ? "Antes de llenar el form" : "Before filling the form"}
            </span>
            <h2 className="font-display text-[clamp(28px,3.8vw,44px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? "Lo que casi todos preguntan." : "What almost everyone asks."}
            </h2>
          </div>

          <Accordion
            type="single"
            collapsible
            className="mx-auto flex max-w-2xl flex-col"
          >
            {preFormFaqs.map((faq) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                className="[&]:border-b [&]:border-[rgba(150,170,200,0.22)]"
              >
                <AccordionTrigger className="text-[16px]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-[var(--space-10)] flex justify-center">
            <Link
              href="#form"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--gradient-hero)" }}
            >
              {isEs ? "Llenar el form" : "Fill the form"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
