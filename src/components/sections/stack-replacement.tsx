import { ArrowRight, MoveRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/locales";
import { PRICING } from "@/lib/constants";

type StackReplacementProps = {
  locale: Locale;
};

const STACK = [
  { name: "Asana", category: { en: "Tasks", es: "Tareas" }, cost: 24.99 },
  { name: "Notion", category: { en: "Docs", es: "Docs" }, cost: 15 },
  { name: "Slack", category: { en: "Chat", es: "Chat" }, cost: 12.5 },
  { name: "Loom", category: { en: "Video", es: "Video" }, cost: 12.5 },
  { name: "Zapier", category: { en: "Automations", es: "Automatizaciones" }, cost: 49 },
  { name: "ChatGPT Team", category: { en: "AI", es: "IA" }, cost: 25 },
  { name: "Calendly", category: { en: "Scheduling", es: "Agenda" }, cost: 12 },
  { name: "Google Forms+", category: { en: "Forms", es: "Forms" }, cost: 10 },
];

export function StackReplacement({ locale }: StackReplacementProps) {
  const isEs = locale === "es";
  const lp = `/${locale}`;
  const totalOld = STACK.reduce((sum, app) => sum + app.cost, 0);
  const savings = totalOld - PRICING.perSeat;
  const savingsPct = Math.round((savings / totalOld) * 100);

  return (
    <section
      id="stack"
      className="section relative isolate overflow-hidden scroll-mt-24"
    >
      <Container>
        <div className="mb-[var(--space-12)] flex flex-col items-start gap-[var(--space-4)] lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow-pill mb-[var(--space-4)] inline-flex">
              <span className="dot" aria-hidden />
              <span>{isEs ? "Reemplaza tu stack" : "Replace your stack"}</span>
            </span>
            <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.04em] text-[var(--fg)]">
              {isEs ? (
                <>
                  Una factura.{" "}
                  <span className="text-gradient">Ocho herramientas menos.</span>
                </>
              ) : (
                <>
                  One invoice.{" "}
                  <span className="text-gradient">Eight fewer tools.</span>
                </>
              )}
            </h2>
            <p className="mt-[var(--space-4)] text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
              {isEs
                ? `FlorioIn reemplaza el stack que ya estás pagando. Mismo trabajo, ${savingsPct}% menos costo, cero context-switching.`
                : `FlorioIn replaces the stack you're already paying for. Same work, ${savingsPct}% lower cost, zero context-switching.`}
            </p>
          </div>
          <Link href={`${lp}/pricing`} className="shrink-0">
            <Button size="lg" variant="outline">
              {isEs ? "Ver pricing" : "See pricing"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Replaced apps grid */}
          <div className="rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--bg)] p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-[18px] tracking-tight">
                {isEs ? "Lo que reemplazas" : "What you replace"}
              </h3>
              <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--fg-muted)]">
                {isEs ? "stack típico" : "typical stack"}
              </span>
            </div>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {STACK.map((app) => (
                <li
                  key={app.name}
                  className="group relative flex flex-col gap-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg)] p-3.5"
                >
                  <span className="absolute right-3 top-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--fg-subtle)]">
                    {isEs ? app.category.es : app.category.en}
                  </span>
                  <span className="font-display text-[15px] leading-tight tracking-tight text-[var(--fg)] line-through decoration-[var(--danger)]/60 decoration-2 underline-offset-2">
                    {app.name}
                  </span>
                  <span className="text-[12px] text-[var(--fg-muted)]">
                    ${app.cost}
                    <span className="text-[11px]">
                      {isEs ? "/usuario/mes" : "/seat/mo"}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-baseline justify-between border-t border-[var(--border)] pt-5">
              <span className="text-[13px] font-medium uppercase tracking-wider text-[var(--fg-muted)]">
                {isEs ? "Total stack actual" : "Current stack total"}
              </span>
              <span className="font-display text-[clamp(28px,3.5vw,40px)] leading-none tracking-tight text-[var(--fg-secondary)] line-through decoration-[var(--danger)]/40">
                ${totalOld.toFixed(2)}
              </span>
            </div>
          </div>

          {/* FlorioIn replacement card */}
          <div
            className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--primary)]/30 bg-[var(--bg)] p-8 shadow-[var(--shadow-md)] md:p-10"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <MoveRight className="h-4 w-4 text-white" />
                </span>
                <span className="text-[13px] font-semibold uppercase tracking-wider text-[var(--primary)]">
                  FlorioIn
                </span>
              </div>
              <p className="text-[15px] text-[var(--fg-muted)]">
                {isEs
                  ? "Una sola plataforma. Tasks, Docs, Chat, AI, Forms, Automations, Video — todo dentro."
                  : "One platform. Tasks, Docs, Chat, AI, Forms, Automations, Video — all inside."}
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-display text-[clamp(56px,7vw,80px)] leading-[0.95] tracking-[-0.04em] text-gradient">
                ${PRICING.perSeat}
              </span>
              <span className="font-display text-[clamp(18px,1.6vw,22px)] leading-none tracking-tight text-[var(--fg-muted)]">
                USD
              </span>
            </div>
            <p className="-mt-3 text-[13px] text-[var(--fg-muted)]">
              {isEs ? "por usuario / mes" : "per seat / month"}
            </p>

            <div className="rounded-[var(--radius-md)] border border-[var(--success)]/30 bg-[var(--success)]/8 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[var(--fg-secondary)]">
                  {isEs ? "Ahorras / usuario / mes" : "You save / seat / month"}
                </span>
                <span className="font-display text-[clamp(24px,2.5vw,30px)] leading-none tracking-tight text-[#1f8a5b]">
                  ${savings.toFixed(2)}
                </span>
              </div>
              <p className="mt-1.5 text-[12px] text-[var(--fg-muted)]">
                {isEs
                  ? `~$${(savings * 50 * 12).toLocaleString()} al año en un equipo de 50`
                  : `~$${(savings * 50 * 12).toLocaleString()} a year on a 50-person team`}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
