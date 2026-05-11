import {
  ArrowRight,
  Brain,
  Check,
  Cpu,
  FileSearch,
  Layers,
  Mic,
  Network,
  ShieldCheck,
  Sparkles,
  Wand2,
  X,
  Zap,
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
    path: "/product/ai-copilot",
    title: isEs ? "Co-Piloto IA" : "AI Co-Pilot",
    description: isEs
      ? "Tu Co-Piloto que entiende tu negocio. Voz, RAG, tool use real, multi-modelo. Ejecuta acciones reales, no solo conversa."
      : "Your Co-Pilot that understands your business. Voice, RAG, real tool use, multi-model. Executes real actions, doesn't just chat.",
  });
}

export default async function AiCopilotPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  const capabilities = isEs
    ? [
        {
          icon: Mic,
          tint: "#ff8dda",
          title: "Voz a tarea",
          body: "Dictas una nota de voz en una junta. FlorioIn transcribe, identifica action items, asigna a la persona correcta y agenda recordatorios — antes de que termines de hablar.",
          detail: "WebRTC · transcripción on-device · OpenAI Whisper fallback",
        },
        {
          icon: Brain,
          tint: "#a88cff",
          title: "RAG sobre tu workspace",
          body: "El Co-Piloto indexa tus tareas, docs, comentarios e historial. Cuando responde, cita la fuente con un link directo. Cero alucinaciones porque no inventa.",
          detail: "pgvector · 1536-dim embeddings · re-rank con tu data",
        },
        {
          icon: Wand2,
          tint: "#38e4ff",
          title: "Tool use real",
          body: "Crea tareas, asigna, manda emails, programa juntas, edita docs. Tú apruebas — el Co-Piloto ejecuta. Todo queda en audit log inmutable.",
          detail: "Function calling · 40+ tools · approval gating",
        },
        {
          icon: Cpu,
          tint: "#f25bd8",
          title: "Multi-modelo",
          body: "GPT-5, Claude Sonnet 4.6, Gemini 2.5 Pro. El Co-Piloto enruta automático por tarea — razonamiento profundo, código, escritura, búsqueda. Tú obtienes la mejor respuesta sin pensarlo.",
          detail: "Anthropic · OpenAI · Google · enterprise contracts",
        },
        {
          icon: Network,
          tint: "#79b8ff",
          title: "Cross-tool reasoning",
          body: "Lee email + tarea + doc en una sola pregunta, sintetiza, propone next step. No es chat aislado: es contexto unificado de todo tu workspace.",
          detail: "Long-context windows · MCP-style tool composition",
        },
        {
          icon: ShieldCheck,
          tint: "#34c79a",
          title: "Privacidad enterprise",
          body: "Tu data nunca entrena modelos públicos — garantizado contractualmente. Prompts y respuestas viven en tu tenant. Opt-out a nivel workspace o usuario.",
          detail: "Zero data retention · audit log · /security",
        },
      ]
    : [
        {
          icon: Mic,
          tint: "#ff8dda",
          title: "Voice to task",
          body: "Dictate a voice note in a meeting. FlorioIn transcribes, identifies action items, assigns to the right person, and schedules reminders — before you finish speaking.",
          detail: "WebRTC · on-device transcription · OpenAI Whisper fallback",
        },
        {
          icon: Brain,
          tint: "#a88cff",
          title: "RAG over your workspace",
          body: "Co-Pilot indexes your tasks, docs, comments, history. When it answers, it cites the source with a direct link. Zero hallucinations because it doesn't invent.",
          detail: "pgvector · 1536-dim embeddings · re-rank on your data",
        },
        {
          icon: Wand2,
          tint: "#38e4ff",
          title: "Real tool use",
          body: "Creates tasks, assigns, sends emails, schedules meetings, edits docs. You approve — Co-Pilot acts. Every action lands in an immutable audit log.",
          detail: "Function calling · 40+ tools · approval gating",
        },
        {
          icon: Cpu,
          tint: "#f25bd8",
          title: "Multi-model",
          body: "GPT-5, Claude Sonnet 4.6, Gemini 2.5 Pro. Co-Pilot routes automatically per task — deep reasoning, code, writing, search. You get the best answer without thinking about it.",
          detail: "Anthropic · OpenAI · Google · enterprise contracts",
        },
        {
          icon: Network,
          tint: "#79b8ff",
          title: "Cross-tool reasoning",
          body: "Reads email + task + doc in a single prompt, synthesizes, proposes a next step. Not isolated chat: it's unified context across your whole workspace.",
          detail: "Long-context windows · MCP-style tool composition",
        },
        {
          icon: ShieldCheck,
          tint: "#34c79a",
          title: "Enterprise privacy",
          body: "Your data never trains public models — contractually guaranteed. Prompts and responses live in your tenant. Opt-out at workspace or user level.",
          detail: "Zero data retention · audit log · /security",
        },
      ];

  const comparison = isEs
    ? {
        bad: {
          title: "ChatGPT / Claude / Gemini sueltos",
          subtitle: "Buenos modelos. Pero solo conversación.",
          rows: [
            "No conoce tu workspace ni tu contexto",
            "No puede crear tareas ni asignar trabajo",
            "Cada equipo paga su propia suscripción",
            "Los datos se diluyen entre 5 herramientas",
            "Sin auditoría ni controles enterprise",
            "Tu data puede entrenar modelos públicos",
          ],
        },
        good: {
          title: "FlorioIn Co-Pilot",
          subtitle: "IA con manos. Y memoria. Y permisos.",
          rows: [
            "Entiende todo tu workspace en tiempo real",
            "Crea, asigna, edita, manda — con tu aprobación",
            "Una sola factura por toda tu empresa",
            "RLS multi-tenant: cada quien ve solo lo suyo",
            "Audit logs, SSO, retención configurable",
            "Cero training con tu data — contractualmente",
          ],
        },
      }
    : {
        bad: {
          title: "Standalone ChatGPT / Claude / Gemini",
          subtitle: "Great models. But just conversation.",
          rows: [
            "Doesn't know your workspace or context",
            "Can't create tasks or assign work",
            "Every team pays a separate subscription",
            "Data scattered across 5 tools",
            "No audit trail or enterprise controls",
            "Your data can train public models",
          ],
        },
        good: {
          title: "FlorioIn Co-Pilot",
          subtitle: "AI with hands. And memory. And permissions.",
          rows: [
            "Understands your whole workspace in real time",
            "Creates, assigns, edits, sends — with your approval",
            "One single invoice for your whole company",
            "Multi-tenant RLS: each person sees only their data",
            "Audit logs, SSO, configurable retention",
            "Zero training on your data — contractually",
          ],
        },
      };

  const useCases = isEs
    ? [
        {
          team: "Ventas",
          tint: "#ff8dda",
          example:
            '"Resume las 12 oportunidades abiertas y dime cuáles necesitan follow-up esta semana." → Co-Pilot lee tu CRM, identifica deals con > 7 días sin actividad, crea tareas, agenda recordatorios.',
        },
        {
          team: "Marketing",
          tint: "#a88cff",
          example:
            '"Genera el brief de la campaña de Black Friday basado en lo que funcionó en Q3." → Lee analytics, docs anteriores, comentarios del equipo. Te entrega borrador con citas a las fuentes.',
        },
        {
          team: "Operaciones",
          tint: "#38e4ff",
          example:
            '"¿Qué proceso de onboarding tarda más?" → Cruza tareas + tiempos reales + SOPs. Identifica cuellos de botella, propone optimizaciones, tú apruebas la implementación.',
        },
      ]
    : [
        {
          team: "Sales",
          tint: "#ff8dda",
          example:
            '"Summarize the 12 open opportunities and tell me which need follow-up this week." → Co-Pilot reads your CRM, identifies deals with > 7 days no activity, creates tasks, schedules reminders.',
        },
        {
          team: "Marketing",
          tint: "#a88cff",
          example:
            '"Generate the Black Friday campaign brief based on what worked in Q3." → Reads analytics, previous docs, team comments. Delivers a draft with citations to sources.',
        },
        {
          team: "Operations",
          tint: "#38e4ff",
          example:
            '"Which onboarding process takes the longest?" → Cross-references tasks + real timings + SOPs. Identifies bottlenecks, proposes optimizations, you approve implementation.',
        },
      ];

  return (
    <>
      <PageHero
        eyebrow={dict.nav.productAi}
        title={
          isEs ? (
            <>
              Tu Co-Piloto que entiende tu{" "}
              <span className="text-gradient animate-gradient">negocio</span>
            </>
          ) : (
            <>
              Your Co-Pilot that understands your{" "}
              <span className="text-gradient animate-gradient">business</span>
            </>
          )
        }
        description={
          isEs
            ? "FlorioIn no es ChatGPT con un wrapper. Es un Co-Piloto que ve tu workspace completo, ejecuta acciones reales con tu aprobación, y se mide por trabajo terminado — no por tokens consumidos."
            : "FlorioIn isn't ChatGPT with a wrapper. It's a Co-Pilot that sees your whole workspace, executes real actions with your approval, and is measured by finished work — not consumed tokens."
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
              name="product/copilot/hero"
              aspect="16/9"
              radius="96px 64px 84px 72px / 72px 84px 64px 96px"
            />
          </div>
        }
      />

      {/* ─────────────────────────────────────────────────────────
          Six capabilities — pebbles grid
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
                  Seis capacidades que cambian{" "}
                  <span className="text-gradient">cómo trabaja tu equipo.</span>
                </>
              ) : (
                <>
                  Six capabilities that change{" "}
                  <span className="text-gradient">how your team works.</span>
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
          Demo — voice to task in action
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="grid items-center gap-[var(--space-10)] lg:grid-cols-[1fr_1.2fr]">
            <RevealOnScroll direction="up" distance={20} duration={0.7}>
              <span className="eyebrow-pill inline-flex">
                <span
                  aria-hidden
                  className="grid h-4 w-4 place-items-center rounded-full text-white"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <Sparkles className="h-2.5 w-2.5" strokeWidth={2.4} />
                </span>
                <span>{isEs ? "Demo en vivo" : "Live demo"}</span>
              </span>
              <h2 className="mt-3 font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
                {isEs ? (
                  <>
                    De voz a tarea creada{" "}
                    <span className="text-gradient">en 3 segundos.</span>
                  </>
                ) : (
                  <>
                    From voice to created task{" "}
                    <span className="text-gradient">in 3 seconds.</span>
                  </>
                )}
              </h2>
              <p className="mt-4 text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
                {isEs
                  ? "Hablas. El Co-Piloto detecta intent, propone acción, espera aprobación, ejecuta. Tú nunca dejas de hablar para escribir."
                  : "You talk. Co-Pilot detects intent, proposes action, waits for approval, executes. You never stop talking to type."}
              </p>
              <ul className="mt-5 flex flex-col gap-2">
                {(isEs
                  ? [
                      "Transcripción on-device (sin enviar audio a la nube)",
                      "Acción propuesta antes de que termines la frase",
                      "Aprobación con un tap — Co-Piloto ejecuta",
                      "Audit log inmutable de cada acción",
                    ]
                  : [
                      "On-device transcription (no audio sent to the cloud)",
                      "Action proposed before you finish your sentence",
                      "Approve with one tap — Co-Pilot executes",
                      "Immutable audit log of every action",
                    ]
                ).map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2.5 text-[14.5px] text-[var(--fg-secondary)]"
                  >
                    <span
                      aria-hidden
                      className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full text-white"
                      style={{ background: "var(--gradient-hero)" }}
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>

            <RevealOnScroll
              direction="up"
              distance={20}
              delay={0.1}
              duration={0.7}
              className="relative isolate"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-65 blur-3xl"
                style={{ background: "var(--gradient-glow)" }}
              />
              <MediaSlot
                name="product/copilot/voice-demo"
                aspect="4/3"
                radius="84px 64px 96px 60px / 60px 96px 64px 84px"
              />
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Use cases by team
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mx-auto mb-[var(--space-12)] max-w-3xl text-center">
            <span className="eyebrow mb-[var(--space-3)] inline-block">
              {isEs ? "Casos de uso" : "Use cases"}
            </span>
            <h2 className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Tres ejemplos{" "}
                  <span className="text-gradient">reales.</span>
                </>
              ) : (
                <>
                  Three{" "}
                  <span className="text-gradient">real examples.</span>
                </>
              )}
            </h2>
          </div>

          <ul className="grid gap-[var(--space-6)] md:grid-cols-3">
            {useCases.map((uc, i) => {
              const radii = [
                "60px 88px 64px 80px / 80px 64px 88px 60px",
                "88px 60px 80px 64px / 60px 80px 64px 88px",
                "72px 96px 60px 84px / 84px 60px 96px 72px",
              ];
              return (
                <RevealOnScroll
                  key={uc.team}
                  direction="up"
                  distance={16}
                  delay={i * 0.07}
                  duration={0.6}
                  className="relative isolate flex flex-col gap-3 overflow-hidden bg-white p-7"
                  style={{ borderRadius: radii[i] }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-50 blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${uc.tint}45, transparent 65%)`,
                    }}
                  />
                  <span
                    aria-hidden
                    className="grid h-2 w-12 rounded-full"
                    style={{ background: uc.tint }}
                  />
                  <h3 className="font-display text-[clamp(20px,2vw,24px)] leading-tight tracking-[-0.025em]">
                    {uc.team}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-[var(--fg-muted)]">
                    {uc.example}
                  </p>
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Comparison vs standalone LLMs
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mx-auto mb-[var(--space-12)] max-w-3xl text-center">
            <span className="eyebrow mb-[var(--space-3)] inline-block">
              {isEs ? "Comparación" : "Comparison"}
            </span>
            <h2 className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Conversación vs.{" "}
                  <span className="text-gradient">acción.</span>
                </>
              ) : (
                <>
                  Conversation vs.{" "}
                  <span className="text-gradient">action.</span>
                </>
              )}
            </h2>
          </div>

          <div className="grid gap-[var(--space-6)] md:grid-cols-2">
            <RevealOnScroll
              direction="up"
              distance={18}
              duration={0.7}
              className="relative flex flex-col gap-4 overflow-hidden bg-[#fafbfc] p-[var(--space-8)]"
              style={{
                borderRadius: "60px 88px 64px 80px / 80px 64px 88px 60px",
              }}
            >
              <h3 className="font-display text-[clamp(20px,2vw,26px)] leading-tight tracking-tight">
                {comparison.bad.title}
              </h3>
              <p className="text-[14.5px] text-[var(--fg-muted)]">
                {comparison.bad.subtitle}
              </p>
              <ul className="mt-2 flex flex-col gap-2.5">
                {comparison.bad.rows.map((row) => (
                  <li
                    key={row}
                    className="flex items-start gap-2.5 text-[14px] text-[var(--fg-muted)] line-through decoration-[var(--danger)]/55 decoration-2"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[var(--danger)]/15 text-[var(--danger)]"
                    >
                      <X className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    <span className="no-underline">{row}</span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>

            <RevealOnScroll
              direction="up"
              distance={18}
              delay={0.08}
              duration={0.7}
              className="relative isolate flex flex-col gap-4 overflow-hidden bg-white p-[var(--space-8)]"
              style={{
                borderRadius: "88px 60px 80px 64px / 60px 80px 64px 88px",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-60 blur-3xl"
                style={{ background: "var(--gradient-glow)" }}
              />
              <h3 className="font-display text-[clamp(20px,2vw,26px)] leading-tight tracking-tight">
                {comparison.good.title}
              </h3>
              <p className="text-[14.5px] text-[var(--fg-secondary)]">
                {comparison.good.subtitle}
              </p>
              <ul className="mt-2 flex flex-col gap-2.5">
                {comparison.good.rows.map((row) => (
                  <li
                    key={row}
                    className="flex items-start gap-2.5 text-[14px] text-[var(--fg-secondary)]"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-white"
                      style={{ background: "var(--gradient-hero)" }}
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    {row}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Integrations callout
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-20)]">
        <Container>
          <div className="lozenge mx-auto flex max-w-[1000px] flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-8 md:py-6">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid h-10 w-10 place-items-center rounded-full text-white"
                style={{ background: "var(--gradient-hero)" }}
              >
                <Layers className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div className="flex flex-col">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                  {isEs ? "Integraciones" : "Integrations"}
                </span>
                <span className="font-display text-[clamp(16px,1.8vw,20px)] leading-tight tracking-tight">
                  {isEs
                    ? "El Co-Piloto lee y actúa en 200+ herramientas"
                    : "Co-Pilot reads and acts across 200+ tools"}
                </span>
              </div>
            </div>
            <Link
              href={`${lp}/product/integrations`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--fg)] transition-transform hover:-translate-y-0.5"
            >
              <Zap className="h-4 w-4 text-[var(--primary)]" />
              {isEs ? "Ver integraciones" : "See integrations"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Reading-time hint for SEO (hidden text) */}
      <span className="sr-only" aria-hidden="false">
        <FileSearch className="h-4 w-4" />
      </span>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
