import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Filter,
  GitBranch,
  Kanban,
  LayoutList,
  ListChecks,
  Repeat,
  TableProperties,
  Workflow,
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
    path: "/product/tasks",
    title: isEs ? "Tareas" : "Tasks",
    description: isEs
      ? "Tableros, listas, timelines, Gantt y calendario. Dependencias reales, workload por persona, custom fields. Sub-100 ms en cada vista."
      : "Boards, lists, timelines, Gantt, and calendar. Real dependencies, per-person workload, custom fields. Sub-100ms on every view.",
  });
}

export default async function TasksPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  const views = isEs
    ? [
        { icon: LayoutList, label: "Lista", tint: "#ff8dda", asset: "product/tasks/view-list" },
        { icon: Kanban, label: "Tablero", tint: "#a88cff", asset: "product/tasks/view-board" },
        { icon: CalendarDays, label: "Calendario", tint: "#38e4ff", asset: "product/tasks/view-calendar" },
        { icon: TableProperties, label: "Timeline", tint: "#f25bd8", asset: "product/tasks/view-timeline" },
        { icon: Workflow, label: "Gantt", tint: "#79b8ff", asset: "product/tasks/view-gantt" },
      ]
    : [
        { icon: LayoutList, label: "List", tint: "#ff8dda", asset: "product/tasks/view-list" },
        { icon: Kanban, label: "Board", tint: "#a88cff", asset: "product/tasks/view-board" },
        { icon: CalendarDays, label: "Calendar", tint: "#38e4ff", asset: "product/tasks/view-calendar" },
        { icon: TableProperties, label: "Timeline", tint: "#f25bd8", asset: "product/tasks/view-timeline" },
        { icon: Workflow, label: "Gantt", tint: "#79b8ff", asset: "product/tasks/view-gantt" },
      ];

  const capabilities = isEs
    ? [
        {
          icon: Workflow,
          tint: "#ff8dda",
          title: "Automatizaciones en lenguaje natural",
          body: '"Si la tarea cambia a Done, mueve a archivado y notifica a #ventas." Escríbelo en español o inglés — FlorioIn lo convierte en workflow ejecutable.',
          detail: "NLU + 40+ triggers · sin nodos arrastrables",
        },
        {
          icon: GitBranch,
          tint: "#a88cff",
          title: "Dependencias y bloqueadores visibles",
          body: "Cuando algo se bloquea, ves la cadena completa: qué espera, quién la debe mover, y cuánto retrasa el resto del plan.",
          detail: "DAG render · ruta crítica · diff de fechas",
        },
        {
          icon: Filter,
          tint: "#38e4ff",
          title: "Custom fields como una hoja de cálculo",
          body: "Texto, número, fecha, checkbox, dropdown, persona, fórmula, rollup, link. Modela tu trabajo — no el de otra empresa.",
          detail: "9 tipos · fórmulas · rollups · referencias cruzadas",
        },
        {
          icon: Clock,
          tint: "#f25bd8",
          title: "SLAs y due dates con alertas predictivas",
          body: "Tareas con SLA. Si una tarea va a vencer, el Co-Pilot te avisa con horas de anticipación basado en velocity histórica del equipo.",
          detail: "Forecasting · prediction · auto-escalation",
        },
        {
          icon: Repeat,
          tint: "#79b8ff",
          title: "Tareas recurrentes inteligentes",
          body: "Cada lunes, cada cierre de mes, cada cliente nuevo — la plantilla correcta se crea sola con los campos pre-poblados y los assignees rotando.",
          detail: "cron-style · rotación de assignees · plantillas",
        },
        {
          icon: ListChecks,
          tint: "#34c79a",
          title: "AI sabe quién tiene capacidad",
          body: "Asignación sugerida basada en workload real, expertise (extraído del historial) y deadlines. Tú decides — el Co-Pilot te da contexto, no toma la decisión.",
          detail: "Workload + skill graph · approval-gated",
        },
      ]
    : [
        {
          icon: Workflow,
          tint: "#ff8dda",
          title: "Automations in plain language",
          body: '"When task moves to Done, archive it and notify #sales." Write it in English or Spanish — FlorioIn turns it into an executable workflow.',
          detail: "NLU + 40+ triggers · no drag-and-drop nodes",
        },
        {
          icon: GitBranch,
          tint: "#a88cff",
          title: "Visible dependencies and blockers",
          body: "When something blocks, see the full chain: what's waiting, who should move it, and how much it delays the rest of the plan.",
          detail: "DAG render · critical path · date diff",
        },
        {
          icon: Filter,
          tint: "#38e4ff",
          title: "Custom fields like a spreadsheet",
          body: "Text, number, date, checkbox, dropdown, person, formula, rollup, link. Model your work — not someone else's.",
          detail: "9 types · formulas · rollups · cross-refs",
        },
        {
          icon: Clock,
          tint: "#f25bd8",
          title: "SLAs and due dates with predictive alerts",
          body: "Tasks with SLA. If something's about to slip, Co-Pilot nudges hours ahead based on your team's historical velocity.",
          detail: "Forecasting · prediction · auto-escalation",
        },
        {
          icon: Repeat,
          tint: "#79b8ff",
          title: "Smart recurring tasks",
          body: "Every Monday, every month-end, every new client — the right template spawns automatically with pre-filled fields and rotating assignees.",
          detail: "cron-style · rotating assignees · templates",
        },
        {
          icon: ListChecks,
          tint: "#34c79a",
          title: "AI knows who has capacity",
          body: "Suggested assignment based on real workload, expertise (mined from history), and deadlines. You decide — Co-Pilot gives context, doesn't make the call.",
          detail: "Workload + skill graph · approval-gated",
        },
      ];

  const perfStats = isEs
    ? [
        { value: "< 100 ms", label: "Cambio de vista en 10K tareas" },
        { value: "< 50 ms", label: "Re-render en filtros" },
        { value: "0 ms", label: "Latencia perceptual con cache" },
        { value: "60 fps", label: "Drag-and-drop en cualquier vista" },
      ]
    : [
        { value: "< 100 ms", label: "View switch on 10K tasks" },
        { value: "< 50 ms", label: "Re-render on filter changes" },
        { value: "0 ms", label: "Perceived latency with cache" },
        { value: "60 fps", label: "Drag-and-drop on any view" },
      ];

  return (
    <>
      <PageHero
        eyebrow={dict.nav.productTasks}
        title={
          isEs ? (
            <>
              Gestión que tu equipo{" "}
              <span className="text-gradient animate-gradient">realmente usa</span>
            </>
          ) : (
            <>
              Task management your team{" "}
              <span className="text-gradient animate-gradient">actually uses</span>
            </>
          )
        }
        description={
          isEs
            ? "Sin la fricción de Jira. Sin las limitaciones de Trello. Cinco vistas que cambian instantáneamente sobre los mismos datos, automatizaciones en lenguaje natural, y el Co-Piloto que entiende qué hace falta hacer."
            : "Without Jira's friction. Without Trello's limits. Five views that switch instantly over the same data, automations in plain language, and a Co-Pilot that understands what needs to happen."
        }
        primaryCta={{
          href: `${lp}/request-access`,
          label: dict.common.ctaPrimary,
        }}
        visual={
          <div className="relative isolate mx-auto max-w-5xl">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-70 blur-3xl"
              style={{ background: "var(--gradient-glow)" }}
            />
            <MediaSlot
              name="product/tasks/hero"
              aspect="16/9"
              radius="96px 64px 84px 72px / 72px 84px 64px 96px"
            />
          </div>
        }
      />

      {/* ─────────────────────────────────────────────────────────
          5 views — view switcher visual
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mx-auto mb-[var(--space-12)] max-w-3xl text-center">
            <span className="eyebrow mb-[var(--space-3)] inline-block">
              {isEs ? "Cinco vistas" : "Five views"}
            </span>
            <h2 className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Mismos datos.{" "}
                  <span className="text-gradient">Lentes distintos.</span>
                </>
              ) : (
                <>
                  Same data.{" "}
                  <span className="text-gradient">Different lenses.</span>
                </>
              )}
            </h2>
            <p className="mx-auto mt-[var(--space-3)] max-w-xl text-[15px] text-[var(--fg-muted)]">
              {isEs
                ? "Cambia de Lista a Tablero a Timeline a Gantt a Calendario con un atajo. Cada cambio renderea en menos de 100 ms incluso en datasets de 10K tareas."
                : "Switch from List to Board to Timeline to Gantt to Calendar with a shortcut. Every switch paints in under 100ms even on 10K-task datasets."}
            </p>
          </div>

          <ul className="grid gap-[var(--space-5)] sm:grid-cols-3 lg:grid-cols-5">
            {views.map((v, i) => {
              const Icon = v.icon;
              return (
                <RevealOnScroll
                  key={v.label}
                  direction="up"
                  distance={16}
                  delay={i * 0.06}
                  duration={0.6}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <span
                    aria-hidden
                    className="grid h-14 w-14 place-items-center rounded-full text-white"
                    style={{ background: v.tint }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <span className="font-display text-[18px] tracking-tight">
                    {v.label}
                  </span>
                </RevealOnScroll>
              );
            })}
          </ul>

          {/* Big view-switcher MediaSlot */}
          <RevealOnScroll
            direction="up"
            distance={20}
            delay={0.15}
            duration={0.7}
            className="relative isolate mt-[var(--space-12)]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-65 blur-3xl"
              style={{ background: "var(--gradient-glow)" }}
            />
            <MediaSlot
              name="product/tasks/view-switcher"
              aspect="16/9"
              radius="96px 64px 84px 72px / 72px 84px 64px 96px"
            />
          </RevealOnScroll>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Performance stats
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mb-[var(--space-10)] text-center">
            <span className="eyebrow-pill inline-flex">
              <span
                aria-hidden
                className="grid h-4 w-4 place-items-center rounded-full text-white"
                style={{ background: "var(--gradient-hero)" }}
              >
                <Clock className="h-2.5 w-2.5" strokeWidth={2.4} />
              </span>
              <span>{isEs ? "Performance real" : "Real performance"}</span>
            </span>
            <h2 className="mt-[var(--space-4)] font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Tan rápido que tu equipo{" "}
                  <span className="text-gradient">no nota la herramienta.</span>
                </>
              ) : (
                <>
                  Fast enough your team{" "}
                  <span className="text-gradient">forgets it&apos;s a tool.</span>
                </>
              )}
            </h2>
          </div>
          <ul className="grid grid-cols-2 gap-[var(--space-8)] sm:grid-cols-4">
            {perfStats.map((s, i) => {
              const tints = ["#ff8dda", "#a88cff", "#38e4ff", "#34c79a"];
              return (
                <RevealOnScroll
                  key={s.label}
                  direction="up"
                  distance={16}
                  delay={i * 0.07}
                  duration={0.6}
                  className="relative flex flex-col items-center gap-2 text-center"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-0 -z-10 h-32 w-32 -translate-x-1/2 -translate-y-6 rounded-full opacity-50 blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${tints[i]}55, transparent 65%)`,
                    }}
                  />
                  <div
                    className="font-display text-[clamp(40px,5vw,72px)] leading-[0.9] tracking-[-0.055em] animate-breathe"
                    style={{
                      background: `linear-gradient(135deg, ${tints[i]}, var(--c-violet))`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animationDelay: `${i * -1.4}s`,
                    }}
                  >
                    {s.value}
                  </div>
                  <p className="text-[13.5px] font-medium leading-snug text-[var(--fg)]">
                    {s.label}
                  </p>
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Six capabilities — pebble grid
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container size="wide">
          <div className="mb-[var(--space-12)] flex flex-col items-start gap-[var(--space-3)]">
            <span className="eyebrow-pill inline-flex">
              <span className="dot" aria-hidden />
              <span>{isEs ? "Capacidades" : "Capabilities"}</span>
            </span>
            <h2 className="max-w-3xl font-display text-[clamp(36px,5vw,64px)] leading-[1.04] tracking-[-0.045em] text-[var(--fg)] [text-wrap:balance]">
              {isEs ? (
                <>
                  Todas las vistas que necesitas.{" "}
                  <span className="text-gradient">Ninguna que no.</span>
                </>
              ) : (
                <>
                  Every view you need.{" "}
                  <span className="text-gradient">None you don&apos;t.</span>
                </>
              )}
            </h2>
          </div>

          <ul className="grid gap-[var(--space-6)] md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              const radii = [
                "64px 96px 60px 84px / 84px 60px 96px 64px",
                "96px 60px 84px 64px / 60px 84px 64px 96px",
                "84px 96px 64px 60px / 60px 96px 64px 84px",
                "60px 84px 96px 60px / 96px 84px 60px 96px",
                "96px 60px 60px 84px / 84px 60px 96px 60px",
                "84px 64px 96px 84px / 60px 96px 64px 84px",
              ];
              return (
                <RevealOnScroll
                  key={c.title}
                  direction="up"
                  distance={18}
                  delay={i * 0.06}
                  duration={0.7}
                  className="group relative isolate flex flex-col gap-3 overflow-hidden bg-white p-7 transition-transform duration-[var(--duration-base)] hover:-translate-y-1.5"
                  style={{ borderRadius: radii[i] }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-50 blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${c.tint}45, transparent 65%)`,
                    }}
                  />
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
                    className="grid h-12 w-12 place-items-center rounded-full text-white"
                    style={{ background: c.tint }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-[clamp(20px,2vw,24px)] leading-tight tracking-[-0.025em]">
                    {c.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.55] text-[var(--fg-muted)]">
                    {c.body}
                  </p>
                  <div className="mt-auto pt-2 font-mono text-[11px] text-[var(--fg-subtle)]">
                    {c.detail}
                  </div>
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Replaces row
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-20)]">
        <Container>
          <div className="mx-auto mb-[var(--space-6)] max-w-3xl text-center">
            <span className="eyebrow mb-[var(--space-3)] inline-block">
              {isEs ? "Reemplaza" : "Replaces"}
            </span>
            <h2 className="font-display text-[clamp(26px,3.4vw,40px)] leading-[1.05] tracking-[-0.035em] [text-wrap:balance]">
              {isEs
                ? "Las herramientas de tareas que ya pagas."
                : "The task tools you already pay for."}
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              "Asana",
              "ClickUp",
              "Trello",
              "Linear",
              "Monday",
              "Notion Tasks",
              "Jira",
              "Wrike",
              "Smartsheet",
            ].map((tool, i) => (
              <span
                key={tool}
                className="lozenge inline-flex animate-breathe items-center gap-2 px-4 py-2 text-[13px] font-medium text-[var(--fg-secondary)] line-through decoration-[var(--danger)]/55 decoration-2 underline-offset-2"
                style={{
                  animationDelay: `${i * -0.6}s`,
                  animationDuration: `${8 + (i % 3)}s`,
                }}
              >
                {tool}
              </span>
            ))}
          </div>
          <div className="mt-[var(--space-8)] flex justify-center">
            <Link
              href={`${lp}/request-access`}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--gradient-hero)" }}
            >
              {isEs ? "Empezar con Tareas" : "Start with Tasks"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <CtaSection locale={lang} dict={dict} />

      {/* hidden semantic anchor for the check icon used in pages */}
      <span aria-hidden className="sr-only">
        <Check className="h-3 w-3" />
      </span>
    </>
  );
}
