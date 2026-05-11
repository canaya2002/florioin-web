import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Code2,
  HeadphonesIcon,
  Megaphone,
  Users,
} from "lucide-react";
import Link from "next/link";

import { RevealOnScroll } from "@/components/animations/reveal-on-scroll";
import { Container } from "@/components/layout/container";
import type { Locale } from "@/i18n/locales";

type UseCasesByTeamProps = {
  locale: Locale;
};

const TINTS: Record<string, string> = {
  Marketing: "#ff8dda",
  Operaciones: "#a88cff",
  Operations: "#a88cff",
  Ventas: "#38e4ff",
  Sales: "#38e4ff",
  Producto: "#a88cff",
  Product: "#a88cff",
  Soporte: "#ff8dda",
  Support: "#ff8dda",
  "RH y Finanzas": "#38e4ff",
  "HR & Finance": "#38e4ff",
};

const RADII = [
  "60px 96px 64px 80px / 80px 64px 96px 60px",
  "96px 60px 80px 64px / 60px 80px 64px 96px",
  "72px 84px 96px 60px / 84px 96px 60px 72px",
  "80px 60px 96px 72px / 60px 84px 72px 96px",
  "96px 80px 64px 88px / 64px 96px 80px 60px",
  "84px 96px 72px 64px / 72px 60px 96px 80px",
];

export function UseCasesByTeam({ locale }: UseCasesByTeamProps) {
  const isEs = locale === "es";
  const lp = `/${locale}`;

  const cases = isEs
    ? [
        {
          icon: Megaphone,
          team: "Marketing",
          headline: "Lanzamientos sin pelear con 6 herramientas",
          body: "Briefs en docs vivos, tareas asignadas con dependencias, calendario editorial y métricas de campaña — todo conectado en un solo workspace para que las campañas salgan sin coordinar entre Slack, Asana, Canva y Notion.",
          replaces: ["Asana", "Notion", "Canva docs", "Mailchimp planner"],
          tags: ["Briefs", "Calendario", "Performance", "Activos"],
          impact: "−4 herramientas",
        },
        {
          icon: Briefcase,
          team: "Operaciones",
          headline: "Procesos repetibles, automáticos, auditables",
          body: "SOPs como docs vivos, automatizaciones nativas que ejecutan acciones reales (no solo notifican), forms con aprobaciones y un audit log inmutable de cada paso para compliance.",
          replaces: ["Zapier", "Process Street", "Trello", "Google Forms"],
          tags: ["SOPs", "Automations", "Forms", "Approvals"],
          impact: "0 SaaS extra",
        },
        {
          icon: Users,
          team: "Ventas",
          headline: "El pipeline donde tu equipo ya trabaja",
          body: "Co-Pilot actualiza el CRM mientras dictas el follow-up, propuestas como docs versionados, recordatorios automáticos cuando un deal se enfría y métricas en vivo del pipeline.",
          replaces: ["HubSpot lite", "Pipedrive", "Loom", "DocSend"],
          tags: ["CRM", "Propuestas", "Follow-ups", "Pipeline"],
          impact: "+1 deal/AE/mes",
        },
        {
          icon: Code2,
          team: "Producto",
          headline: "Roadmap, sprint, docs técnicos — todo conectado",
          body: "Tasks integradas con GitHub PRs, specs como docs con comentarios inline, retros y planning sin salir de la plataforma, y un changelog público que se genera de tus releases.",
          replaces: ["Linear", "Notion", "Loom", "Productboard"],
          tags: ["Roadmap", "Sprints", "Specs", "GitHub"],
          impact: "1 fuente de verdad",
        },
        {
          icon: HeadphonesIcon,
          team: "Soporte",
          headline: "Tickets, base de conocimiento y AI en un mismo lugar",
          body: "Inbox unificado de email + Slack + WhatsApp, plantillas inteligentes, KB que se autocompleta con AI usando tus tickets pasados, y escalación automática a producto cuando se detecta un bug recurrente.",
          replaces: ["Zendesk", "Intercom", "Notion KB", "Linear"],
          tags: ["Inbox", "KB", "AI replies", "Escalación"],
          impact: "−43% TTR",
        },
        {
          icon: Building2,
          team: "RH y Finanzas",
          headline: "Onboarding, contratos, gastos — todos auditables",
          body: "Plantillas de contratación con firmas digitales, aprobaciones de gastos con SLAs, calendario de pagos a proveedores con alertas, y políticas siempre vigentes en docs vinculados a las tareas que las invocan.",
          replaces: ["BambooHR lite", "Expensify", "DocuSign", "Notion HR"],
          tags: ["Onboarding", "Aprobaciones", "Políticas", "Calendarios"],
          impact: "Audit-ready 24/7",
        },
      ]
    : [
        {
          icon: Megaphone,
          team: "Marketing",
          headline: "Launches without fighting six tools",
          body: "Briefs as living docs, tasks assigned with dependencies, editorial calendar, and campaign metrics — all connected in one workspace so campaigns ship without bouncing between Slack, Asana, Canva, and Notion.",
          replaces: ["Asana", "Notion", "Canva docs", "Mailchimp planner"],
          tags: ["Briefs", "Calendar", "Performance", "Assets"],
          impact: "−4 tools",
        },
        {
          icon: Briefcase,
          team: "Operations",
          headline: "Processes that are repeatable, automated, audited",
          body: "SOPs as living docs, native automations that execute real actions (not just notify), forms with approvals, and an immutable audit log on every step — built for compliance.",
          replaces: ["Zapier", "Process Street", "Trello", "Google Forms"],
          tags: ["SOPs", "Automations", "Forms", "Approvals"],
          impact: "0 extra SaaS",
        },
        {
          icon: Users,
          team: "Sales",
          headline: "The pipeline your team actually works in",
          body: "Co-Pilot updates the CRM while you dictate the follow-up, proposals as versioned docs, automatic reminders when a deal cools off, and live pipeline metrics.",
          replaces: ["HubSpot lite", "Pipedrive", "Loom", "DocSend"],
          tags: ["CRM", "Proposals", "Follow-ups", "Pipeline"],
          impact: "+1 deal/AE/mo",
        },
        {
          icon: Code2,
          team: "Product",
          headline: "Roadmap, sprint, tech docs — all connected",
          body: "Tasks integrated with GitHub PRs, specs as docs with inline comments, retros and planning without leaving the platform, and a public changelog generated from your releases.",
          replaces: ["Linear", "Notion", "Loom", "Productboard"],
          tags: ["Roadmap", "Sprints", "Specs", "GitHub"],
          impact: "1 source of truth",
        },
        {
          icon: HeadphonesIcon,
          team: "Support",
          headline: "Tickets, knowledge base, and AI in one place",
          body: "Unified email + Slack + WhatsApp inbox, smart templates, an AI-autocompleted KB built from past tickets, and automatic escalation to product when a recurring bug is detected.",
          replaces: ["Zendesk", "Intercom", "Notion KB", "Linear"],
          tags: ["Inbox", "KB", "AI replies", "Escalations"],
          impact: "−43% TTR",
        },
        {
          icon: Building2,
          team: "HR & Finance",
          headline: "Onboarding, contracts, expenses — all auditable",
          body: "Hiring templates with digital signatures, expense approvals with SLAs, vendor payment calendars with alerts, and policies always current in docs linked to the tasks that invoke them.",
          replaces: ["BambooHR lite", "Expensify", "DocuSign", "Notion HR"],
          tags: ["Onboarding", "Approvals", "Policies", "Calendars"],
          impact: "Audit-ready 24/7",
        },
      ];

  return (
    <section
      id="use-cases"
      className="section relative isolate overflow-hidden bg-white scroll-mt-24"
    >
      <Container>
        <div className="mb-[var(--space-12)] flex flex-col items-start gap-[var(--space-3)]">
          <span className="eyebrow-pill inline-flex">
            <span className="dot" aria-hidden />
            <span>{isEs ? "Casos de uso" : "Use cases"}</span>
          </span>
          <h2 className="max-w-3xl font-display text-[clamp(40px,6vw,84px)] leading-[1.02] tracking-[-0.05em] text-[var(--fg)] [text-wrap:balance]">
            {isEs ? (
              <>
                Una plataforma.{" "}
                <span className="text-gradient">Cada equipo.</span>
              </>
            ) : (
              <>
                One platform.{" "}
                <span className="text-gradient">Every team.</span>
              </>
            )}
          </h2>
          <p className="max-w-2xl text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
            {isEs
              ? "FlorioIn no es una herramienta para un equipo. Es el sistema operativo donde marketing, ops, ventas, producto, soporte, RH y finanzas trabajan en el mismo lugar — con la misma data, las mismas automatizaciones y el mismo Co-Pilot."
              : "FlorioIn isn't a tool for one team. It's the operating system where marketing, ops, sales, product, support, HR, and finance all work in the same place — with the same data, the same automations, and the same Co-Pilot."}
          </p>
        </div>

        <ul className="grid gap-[var(--space-8)] md:grid-cols-2 lg:grid-cols-3">
          {cases.map((useCase, i) => {
            const Icon = useCase.icon;
            const tint = TINTS[useCase.team] ?? "#a88cff";
            return (
              <RevealOnScroll
                key={useCase.team}
                direction="up"
                distance={18}
                delay={i * 0.06}
                duration={0.7}
                className="group relative flex h-full flex-col gap-4 overflow-hidden bg-white p-7 transition-transform duration-[var(--duration-base)] hover:-translate-y-2"
                style={{ borderRadius: RADII[i % RADII.length] }}
              >
                {/* Continuous sheen */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-[-30%] -left-1/3 w-2/3 animate-sheen-wave"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
                    animationDuration: "14s",
                    animationDelay: `${i * -2}s`,
                    mixBlendMode: "soft-light",
                  }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-1/3 -z-10 opacity-0 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(55% 55% at 50% 0%, ${tint}33, transparent 65%)`,
                  }}
                />

                <div className="flex items-center justify-between">
                  <span
                    aria-hidden
                    className="grid h-12 w-12 place-items-center rounded-full bg-white"
                    style={{ color: tint }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                    {useCase.team}
                  </span>
                </div>

                <h3 className="font-display text-[clamp(20px,2vw,24px)] leading-[1.15] tracking-tight text-[var(--fg)]">
                  {useCase.headline}
                </h3>
                <p className="text-[14.5px] leading-[1.55] text-[var(--fg-muted)]">
                  {useCase.body}
                </p>

                {/* Replaces — the new "developed" detail per card */}
                <div className="flex flex-col gap-2 rounded-[28px] bg-[#fafbfc] px-4 py-3.5">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                    {isEs ? "Reemplaza" : "Replaces"}
                  </span>
                  <ul className="flex flex-wrap gap-1.5">
                    {useCase.replaces.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full bg-white px-2.5 py-0.5 text-[11.5px] font-medium text-[var(--fg-secondary)] line-through decoration-[var(--danger)]/55 decoration-2 underline-offset-2"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className="flex flex-wrap gap-1.5">
                  {useCase.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-[#fafbfc] px-2.5 py-0.5 text-[11.5px] font-medium text-[var(--fg-secondary)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                {/* Impact metric — the ambient outcome */}
                <div className="mt-auto flex items-center gap-2 pt-2">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: tint }}
                  />
                  <span
                    className="font-display text-[15px] tracking-tight"
                    style={{ color: tint }}
                  >
                    {useCase.impact}
                  </span>
                </div>

                <ArrowUpRight
                  aria-hidden
                  className="absolute right-7 top-7 h-4 w-4 text-[var(--fg-subtle)] opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </RevealOnScroll>
            );
          })}
        </ul>

        <div className="mt-[var(--space-12)] flex justify-center">
          <Link
            href={`${lp}/solutions`}
            className="lozenge inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-[var(--fg)] transition-transform hover:-translate-y-0.5"
          >
            {isEs
              ? "Ver todas las industrias y equipos"
              : "See every industry and team"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
