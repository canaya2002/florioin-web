import { FileText, GitMerge, Sparkles, Users, Wand2 } from "lucide-react";
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
    title: isEs ? "Documentos" : "Docs",
    description: isEs
      ? "Editor block-based con colaboración real-time e IA inline."
      : "Block-based editor with real-time collaboration and inline AI.",
  };
}

export default async function DocsPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <PageHero
        eyebrow={dict.nav.productDocs}
        title={
          isEs
            ? "Documentos que escriben contigo"
            : "Docs that write with you"
        }
        description={
          isEs
            ? "Notion-grade. Editor block-based, colaboración real-time, comentarios threaded, IA inline en cada cursor. Y todo conectado a tus tareas."
            : "Notion-grade. Block-based editor, real-time collaboration, threaded comments, inline AI at every cursor. All connected to your tasks."
        }
        primaryCta={{ href: `${lp}/request-access`, label: dict.common.ctaPrimary }}
        visual={
          <div className="mx-auto max-w-5xl">
            <GradientPlaceholder
              className="aspect-[16/9] rounded-[var(--radius-xl)]"
              caption={isEs ? "Editor en vivo" : "Live editor"}
            />
          </div>
        }
      />

      <section className="container-wide section">
        <BentoGrid>
          <BentoCard
            size="large"
            eyebrow={isEs ? "Editor" : "Editor"}
            title={isEs ? "Bloques que se mueven, se anidan, se transforman" : "Blocks that move, nest, and transform"}
            description={
              isEs
                ? "/comando para insertar cualquier bloque. Drag para reordenar. Convierte texto en lista, lista en tabla, tabla en kanban — sin perder datos."
                : "/command to insert any block. Drag to reorder. Turn text into list, list into table, table into kanban — without losing data."
            }
            visual={
              <GradientPlaceholder
                className="aspect-[16/10]"
                caption={isEs ? "Bloques en acción" : "Blocks in action"}
              />
            }
            visualPosition="below"
          />
          <BentoCard
            size="small"
            eyebrow={isEs ? "IA inline" : "Inline AI"}
            title={
              <span className="flex items-center gap-2">
                <Wand2 className="h-7 w-7 text-[var(--primary)]" />
                {isEs ? "Escribe contigo" : "Writes with you"}
              </span>
            }
            description={
              isEs
                ? '"Continúa esto", "Resume", "Convierte a tabla". El Co-Piloto entiende el contexto.'
                : '"Continue this", "Summarize", "Turn into table". Co-Pilot understands the context.'
            }
          />
          <BentoCard
            size="tall"
            eyebrow={isEs ? "Tiempo real" : "Real-time"}
            title={isEs ? "Colaboración sin latencia" : "Latency-free collaboration"}
            description={
              isEs
                ? "Hasta 100 personas editando el mismo doc. Cursores con presencia. Cero conflictos."
                : "Up to 100 people editing the same doc. Live cursors. Zero merge conflicts."
            }
            visual={
              <div className="flex min-h-[120px] flex-1 items-center justify-center">
                <Users className="h-20 w-20 text-[var(--primary)] opacity-60" />
              </div>
            }
            visualPosition="above"
          />
          <BentoCard
            size="wide"
            eyebrow={isEs ? "Versiones" : "Versions"}
            title={isEs ? "Historial completo, restauración con un click" : "Full history, restore with one click"}
            description={
              isEs
                ? "Cada cambio se guarda. Compara, revierte, o restaura una versión específica. Sin sobrecarga visual."
                : "Every change saved. Compare, revert, or restore a specific version. No visual clutter."
            }
            visual={
              <div className="flex min-h-[80px] items-center justify-center">
                <GitMerge
                  aria-hidden
                  className="h-16 w-16 text-[var(--accent)] opacity-60"
                />
              </div>
            }
            visualPosition="side"
          />
          <BentoCard
            size="small"
            eyebrow={isEs ? "Plantillas" : "Templates"}
            title={
              <span className="flex items-center gap-2">
                <FileText className="h-7 w-7 text-[var(--success)]" />
                {isEs ? "Empieza rápido" : "Start fast"}
              </span>
            }
            description={
              isEs
                ? "Brief de proyecto, retro, propuesta, contrato — pre-configurados por industria."
                : "Project brief, retro, proposal, contract — pre-built by industry."
            }
          />
          <BentoCard
            size="small"
            eyebrow={isEs ? "Tareas inline" : "Inline tasks"}
            title={
              <span className="flex items-center gap-2">
                <Sparkles className="h-7 w-7 text-[var(--warning)]" />
                {isEs ? "Doc → tarea" : "Doc → task"}
              </span>
            }
            description={
              isEs
                ? "Selecciona texto, conviértelo en tarea. Aparece donde corresponde con todo el contexto."
                : "Select text, turn it into a task. Lands in the right place with full context."
            }
          />
        </BentoGrid>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
