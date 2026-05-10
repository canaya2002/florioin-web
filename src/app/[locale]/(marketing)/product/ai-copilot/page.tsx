import { Brain, Network, Plug, Sparkles, Zap } from "lucide-react";
import { notFound } from "next/navigation";

import { BentoCard } from "@/components/bento/bento-card";
import { BentoGrid } from "@/components/bento/bento-grid";
import { GradientPlaceholder } from "@/components/media/gradient-placeholder";
import { CtaSection } from "@/components/sections/cta-section";
import { FeatureList } from "@/components/sections/feature-list";
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
    path: "/product/ai-copilot",
    title: isEs ? "Co-Piloto IA" : "AI Co-Pilot",
    description: isEs
      ? "Tu Co-Piloto que entiende tu negocio. Voz, RAG, tool use real, multi-modelo."
      : "Your Co-Pilot that understands your business. Voice, RAG, real tool use, multi-model.",
  });
}

export default async function AiCopilotPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <PageHero
        eyebrow={dict.nav.productAi}
        title={
          isEs
            ? "Tu Co-Piloto que entiende tu negocio"
            : "Your Co-Pilot that understands your business"
        }
        description={
          isEs
            ? "FlorioIn no es ChatGPT con un wrapper. Es un Co-Piloto que ve tu workspace completo, ejecuta acciones reales y se mide por trabajo terminado, no por tokens."
            : "FlorioIn isn't ChatGPT with a wrapper. It's a Co-Pilot that sees your whole workspace, executes real actions, and is measured by finished work — not tokens."
        }
        primaryCta={{ href: `${lp}/request-access`, label: dict.common.ctaPrimary }}
        visual={
          <div className="mx-auto max-w-5xl">
            <GradientPlaceholder
              className="aspect-[16/9]"
              caption={
                isEs
                  ? "Co-Piloto en acción · video de 60s"
                  : "Co-Pilot in action · 60s video"
              }
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
              ? "Cinco capacidades que cambian cómo trabaja tu equipo"
              : "Five capabilities that change how your team works"}
          </h2>
        </div>
        <BentoGrid>
          <BentoCard
            size="large"
            eyebrow={isEs ? "Voz a tarea" : "Voice to task"}
            title={
              isEs
                ? "Habla. Y se convierte en trabajo."
                : "Speak. And it becomes work."
            }
            description={
              isEs
                ? "Dictas una nota de voz en una junta. FlorioIn transcribe, identifica acciones, asigna a la persona correcta, y agenda recordatorios."
                : "Dictate a voice note in a meeting. FlorioIn transcribes, identifies action items, assigns to the right person, and schedules reminders."
            }
            visual={
              <GradientPlaceholder
                className="aspect-[16/10]"
                caption={isEs ? "Captura de voz" : "Voice capture"}
              />
            }
            visualPosition="below"
          />
          <BentoCard
            size="small"
            eyebrow="RAG"
            title={
              <span className="flex items-center gap-2">
                <Brain className="h-7 w-7 text-[var(--primary)]" />
                {isEs ? "Sabe lo que sabes" : "Knows what you know"}
              </span>
            }
            description={
              isEs
                ? "Indexa tus tareas, docs, comentarios e historial. Las respuestas citan la fuente."
                : "Indexes tasks, docs, comments, history. Replies cite the source."
            }
          />
          <BentoCard
            size="tall"
            eyebrow={isEs ? "Tool use real" : "Real tool use"}
            title={
              isEs
                ? "Hace, no solo dice"
                : "It does. It doesn't just say."
            }
            description={
              isEs
                ? "Crea tareas, asigna, manda emails, programa juntas, edita docs. Tú apruebas — el Co-Piloto ejecuta."
                : "Creates tasks, assigns, sends emails, schedules meetings, edits docs. You approve — Co-Pilot acts."
            }
            visual={
              <div className="flex min-h-[120px] flex-1 items-center justify-center">
                <Zap className="h-20 w-20 text-[var(--primary)] opacity-60" />
              </div>
            }
            visualPosition="above"
          />
          <BentoCard
            size="wide"
            eyebrow={isEs ? "Multi-modelo" : "Multi-model"}
            title={
              isEs
                ? "El mejor modelo para cada tarea"
                : "The right model for every task"
            }
            description={
              isEs
                ? "GPT-5, Claude 4.7, Gemini 2.5 — el Co-Piloto enruta automáticamente. Tú obtienes la mejor respuesta sin pensarlo."
                : "GPT-5, Claude 4.7, Gemini 2.5 — Co-Pilot routes automatically. You get the best answer without thinking about it."
            }
            visual={
              <div className="flex min-h-[80px] items-center justify-center gap-3">
                <Network className="h-12 w-12 text-[var(--primary)]" />
                <Sparkles className="h-12 w-12 text-[var(--accent)]" />
                <Plug className="h-12 w-12 text-[var(--success)]" />
              </div>
            }
            visualPosition="side"
          />
          <BentoCard
            size="full"
            eyebrow={isEs ? "Integraciones" : "Integrations"}
            title={
              isEs
                ? "Lee y actúa en las herramientas que ya usas"
                : "Reads and acts across the tools you already use"
            }
            description={
              isEs
                ? "Google Workspace, Microsoft 365, Slack, GitHub, Salesforce, HubSpot, Stripe, Notion, Linear — y 190 más."
                : "Google Workspace, Microsoft 365, Slack, GitHub, Salesforce, HubSpot, Stripe, Notion, Linear — and 190 more."
            }
            href={`${lp}/product/integrations`}
            ctaLabel={isEs ? "Ver integraciones" : "See integrations"}
            gradient
          />
        </BentoGrid>
      </section>

      <section className="container-default section">
        <div className="mb-10 flex flex-col gap-3">
          <span className="eyebrow">
            {isEs ? "Comparación" : "Comparison"}
          </span>
          <h2 className="font-display text-[var(--fs-h2)] leading-tight tracking-tight">
            {isEs
              ? "FlorioIn vs. ChatGPT solo"
              : "FlorioIn vs. ChatGPT alone"}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FeatureList
            title={
              isEs ? "ChatGPT / Claude / Gemini sueltos" : "Standalone ChatGPT / Claude / Gemini"
            }
            description={
              isEs
                ? "Buenos modelos. Pero solo conversación."
                : "Great models. But just conversation."
            }
            negative={
              isEs
                ? [
                    "No conoce tu workspace ni tu contexto",
                    "No puede crear tareas ni asignar trabajo",
                    "Cada equipo paga su propia suscripción",
                    "Los datos se diluyen entre herramientas",
                    "Sin auditoría ni controles enterprise",
                  ]
                : [
                    "Doesn't know your workspace or context",
                    "Can't create tasks or assign work",
                    "Every team pays a separate subscription",
                    "Data scattered across tools",
                    "No audit trail or enterprise controls",
                  ]
            }
          />
          <FeatureList
            title="FlorioIn Co-Pilot"
            description={
              isEs
                ? "IA con manos. Y memoria. Y permisos."
                : "AI with hands. And memory. And permissions."
            }
            positive={
              isEs
                ? [
                    "Entiende todo tu workspace en tiempo real",
                    "Crea, asigna, edita, manda — con tu aprobación",
                    "Una sola factura por toda tu empresa",
                    "RLS multi-tenant: cada quien ve solo lo suyo",
                    "Audit logs, SSO, retención configurable",
                  ]
                : [
                    "Understands your whole workspace in real time",
                    "Creates, assigns, edits, sends — with your approval",
                    "One single invoice for your whole company",
                    "Multi-tenant RLS: each person sees only their data",
                    "Audit logs, SSO, configurable retention",
                  ]
            }
          />
        </div>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
