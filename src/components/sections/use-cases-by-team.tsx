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

import { Container } from "@/components/layout/container";
import type { Locale } from "@/i18n/locales";

type UseCasesByTeamProps = {
  locale: Locale;
};

export function UseCasesByTeam({ locale }: UseCasesByTeamProps) {
  const isEs = locale === "es";
  const lp = `/${locale}`;

  const cases = isEs
    ? [
        {
          icon: Megaphone,
          team: "Marketing",
          headline: "Lanzamientos sin pelear con 6 herramientas",
          body: "Briefs en docs, tareas asignadas, calendario editorial, métricas de campaña — un solo workspace.",
          tags: ["Briefs", "Calendario", "Performance", "Activos"],
        },
        {
          icon: Briefcase,
          team: "Operaciones",
          headline: "Procesos repetibles, automáticos, auditables",
          body: "Procedimientos como docs vivos, automatizaciones que ejecutan, audit log de cada paso.",
          tags: ["SOPs", "Automations", "Forms", "Approvals"],
        },
        {
          icon: Users,
          team: "Ventas",
          headline: "El pipeline donde tu equipo ya trabaja",
          body: "Co-Piloto que actualiza el CRM mientras hablas, follow-ups automáticos, propuestas en docs.",
          tags: ["CRM", "Propuestas", "Follow-ups", "Pipeline"],
        },
        {
          icon: Code2,
          team: "Producto",
          headline: "Roadmap, sprint, docs técnicos, todo conectado",
          body: "Tasks integradas con GitHub, specs en docs, retros y planning sin salir de la plataforma.",
          tags: ["Roadmap", "Sprints", "Specs", "GitHub"],
        },
        {
          icon: HeadphonesIcon,
          team: "Soporte",
          headline: "Tickets, base de conocimiento y AI en un mismo lugar",
          body: "Inbox unificado, plantillas, KB que se autocompleta con AI, escalación automática a producto.",
          tags: ["Inbox", "KB", "AI replies", "Escalación"],
        },
        {
          icon: Building2,
          team: "RH y Finanzas",
          headline: "Onboarding, contratos, gastos, todos auditables",
          body: "Plantillas de contratación, aprobaciones de gastos, calendario de pagos y políticas siempre vigentes.",
          tags: ["Onboarding", "Aprobaciones", "Políticas", "Calendarios"],
        },
      ]
    : [
        {
          icon: Megaphone,
          team: "Marketing",
          headline: "Launches without fighting six tools",
          body: "Briefs in docs, tasks assigned, editorial calendar, campaign metrics — one workspace.",
          tags: ["Briefs", "Calendar", "Performance", "Assets"],
        },
        {
          icon: Briefcase,
          team: "Operations",
          headline: "Processes that are repeatable, automated, audited",
          body: "Procedures as living docs, automations that execute, audit log on every step.",
          tags: ["SOPs", "Automations", "Forms", "Approvals"],
        },
        {
          icon: Users,
          team: "Sales",
          headline: "The pipeline your team actually works in",
          body: "Co-Pilot updates CRM while you talk, automatic follow-ups, proposals as docs.",
          tags: ["CRM", "Proposals", "Follow-ups", "Pipeline"],
        },
        {
          icon: Code2,
          team: "Product",
          headline: "Roadmap, sprint, tech docs — all connected",
          body: "Tasks integrated with GitHub, specs in docs, retros and planning without leaving the platform.",
          tags: ["Roadmap", "Sprints", "Specs", "GitHub"],
        },
        {
          icon: HeadphonesIcon,
          team: "Support",
          headline: "Tickets, knowledge base, and AI in one place",
          body: "Unified inbox, templates, KB that autofills with AI, automatic escalation to product.",
          tags: ["Inbox", "KB", "AI replies", "Escalations"],
        },
        {
          icon: Building2,
          team: "HR & Finance",
          headline: "Onboarding, contracts, expenses — all auditable",
          body: "Hiring templates, expense approvals, payment calendars, policies always current.",
          tags: ["Onboarding", "Approvals", "Policies", "Calendars"],
        },
      ];

  return (
    <section
      id="use-cases"
      className="section relative isolate overflow-hidden scroll-mt-24"
    >
      <Container>
        <div className="mb-[var(--space-12)] flex flex-col items-start gap-[var(--space-3)]">
          <span className="eyebrow-pill inline-flex">
            <span className="dot" aria-hidden />
            <span>{isEs ? "Casos de uso" : "Use cases"}</span>
          </span>
          <h2 className="max-w-3xl font-display text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.04em] text-[var(--fg)]">
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
              ? "FlorioIn no es una herramienta para un equipo. Es el sistema operativo donde marketing, ops, ventas, producto, soporte, RH y finanzas trabajan en el mismo lugar."
              : "FlorioIn isn't a tool for one team. It's the operating system where marketing, ops, sales, product, support, HR, and finance all work in the same place."}
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <li
                key={useCase.team}
                className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--primary)]"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                    {useCase.team}
                  </span>
                </div>
                <h3 className="font-display text-[20px] leading-tight tracking-tight text-[var(--fg)]">
                  {useCase.headline}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[var(--fg-muted)]">
                  {useCase.body}
                </p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {useCase.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-2.5 py-0.5 text-[11.5px] font-medium text-[var(--fg-secondary)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <ArrowUpRight
                  aria-hidden
                  className="absolute right-5 top-5 h-4 w-4 text-[var(--fg-subtle)] opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </li>
            );
          })}
        </ul>

        <div className="mt-[var(--space-8)] flex justify-center">
          <Link
            href={`${lp}/solutions`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)] px-5 py-2.5 text-sm font-medium text-[var(--fg)] transition-all hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-sm)]"
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
