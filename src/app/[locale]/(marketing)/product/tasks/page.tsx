import {
  Clock,
  Filter,
  GitBranch,
  ListChecks,
  Repeat,
  Workflow,
} from "lucide-react";
import { notFound } from "next/navigation";

import { BentoCard } from "@/components/bento/bento-card";
import { BentoGrid } from "@/components/bento/bento-grid";
import { GradientPlaceholder } from "@/components/media/gradient-placeholder";
import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs ? "Tareas" : "Tasks",
    description: isEs
      ? "Tableros, listas, timelines, dependencias. Cada vista renderea en menos de 100ms."
      : "Boards, lists, timelines, dependencies. Every view paints in under 100ms.",
  };
}

export default async function TasksPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <PageHero
        eyebrow={dict.nav.productTasks}
        title={
          isEs
            ? "Gestión de tareas que tu equipo realmente usa"
            : "Task management your team actually uses"
        }
        description={
          isEs
            ? "Sin la fricción de Jira. Sin las limitaciones de Trello. Vistas que cambian instantáneamente, automatizaciones útiles, y el Co-Piloto que entiende qué hace falta hacer."
            : "Without Jira's friction. Without Trello's limits. Views that switch instantly, useful automations, and a Co-Pilot that understands what needs to happen."
        }
        primaryCta={{ href: `${lp}/request-access`, label: dict.common.ctaPrimary }}
        visual={
          <div className="mx-auto max-w-5xl">
            <GradientPlaceholder
              className="aspect-[16/9] rounded-[var(--radius-xl)]"
              caption={isEs ? "Tableros y listas" : "Boards and lists"}
            />
          </div>
        }
      />

      <section className="container-wide section">
        <div className="mb-10 flex flex-col gap-3">
          <span className="eyebrow">
            {isEs ? "Capacidades" : "Capabilities"}
          </span>
          <h2 className="max-w-3xl font-display text-[var(--fs-h2)] leading-tight tracking-tight">
            {isEs
              ? "Todas las vistas que necesitas. Ninguna que no."
              : "Every view you need. None you don't."}
          </h2>
        </div>

        <BentoGrid>
          <BentoCard
            size="wide"
            eyebrow={isEs ? "Vistas múltiples" : "Multiple views"}
            title={isEs ? "Tablero · Lista · Timeline · Calendario" : "Board · List · Timeline · Calendar"}
            description={
              isEs
                ? "Cambia de vista con un atajo. Mismos datos, diferente lente. Sub-100ms en datasets de 10K tareas."
                : "Switch view with a shortcut. Same data, different lens. Sub-100ms on 10K-task datasets."
            }
            visual={
              <div className="grid grid-cols-2 gap-3">
                <GradientPlaceholder
                  className="aspect-[3/2]"
                  caption={isEs ? "Tablero" : "Board"}
                />
                <GradientPlaceholder
                  className="aspect-[3/2]"
                  caption="Timeline"
                />
              </div>
            }
            visualPosition="below"
          />
          <BentoCard
            size="small"
            eyebrow={isEs ? "Automatizaciones" : "Automations"}
            title={
              <span className="flex items-center gap-2">
                <Workflow className="h-7 w-7 text-[var(--primary)]" />
                {isEs ? "Reglas que entiendes" : "Rules you understand"}
              </span>
            }
            description={
              isEs
                ? '"Si la tarea cambia a Done, mueve a archivado y notifica a #ventas."'
                : '"When task moves to Done, archive it and notify #sales."'
            }
          />
          <BentoCard
            size="small"
            eyebrow={isEs ? "Dependencias" : "Dependencies"}
            title={
              <span className="flex items-center gap-2">
                <GitBranch className="h-7 w-7 text-[var(--accent)]" />
                {isEs ? "Bloqueadores claros" : "Clear blockers"}
              </span>
            }
            description={
              isEs
                ? "Cuando algo bloquea, ves la cadena completa y a quién hay que mover."
                : "When something blocks, see the full chain and who to nudge."
            }
          />
          <BentoCard
            size="wide"
            eyebrow={isEs ? "Custom fields" : "Custom fields"}
            title={
              isEs
                ? "Modela tu trabajo, no el de otra empresa"
                : "Model your work, not someone else's"
            }
            description={
              isEs
                ? "Texto, número, fecha, checkbox, dropdown, persona, fórmula, rollup. Igual que una hoja de cálculo, pero con permisos y workflow."
                : "Text, number, date, checkbox, dropdown, person, formula, rollup. Same as a spreadsheet, but with permissions and workflow."
            }
            visual={
              <div className="flex min-h-[80px] items-center justify-center">
                <Filter
                  aria-hidden
                  className="h-20 w-20 text-[var(--primary)] opacity-60"
                />
              </div>
            }
            visualPosition="side"
          />
          <BentoCard
            size="small"
            eyebrow="SLA"
            title={
              <span className="flex items-center gap-2">
                <Clock className="h-7 w-7 text-[var(--warning)]" />
                {isEs ? "Tiempos garantizados" : "Guaranteed timing"}
              </span>
            }
            description={
              isEs
                ? "Tareas con due date y SLA. Si se va a vencer, el Co-Piloto te avisa con horas de anticipación."
                : "Due dates and SLA. If something's about to slip, Co-Pilot nudges hours ahead."
            }
          />
          <BentoCard
            size="small"
            eyebrow={isEs ? "Recurrentes" : "Recurring"}
            title={
              <span className="flex items-center gap-2">
                <Repeat className="h-7 w-7 text-[var(--success)]" />
                {isEs ? "Tareas que se generan solas" : "Tasks that repeat themselves"}
              </span>
            }
            description={
              isEs
                ? "Cada lunes, cada cierre de mes, cada cliente nuevo — la plantilla correcta se crea sola."
                : "Every Monday, every month-end, every new client — the right template spawns automatically."
            }
          />
          <BentoCard
            size="full"
            eyebrow="AI"
            title={
              <span className="flex flex-col gap-2">
                <ListChecks
                  aria-hidden
                  className="h-8 w-8 text-[var(--primary)]"
                />
                <span>
                  {isEs
                    ? "El Co-Piloto sabe quién tiene capacidad"
                    : "Co-Pilot knows who has capacity"}
                </span>
              </span>
            }
            description={
              isEs
                ? "Asignación sugerida basada en carga real, expertise, y deadlines. Tú decides — el Co-Piloto te da contexto."
                : "Suggested assignment based on real workload, expertise, and deadlines. You decide — Co-Pilot gives context."
            }
            gradient
          />
        </BentoGrid>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
