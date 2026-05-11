import {
  ArrowRight,
  Check,
  FileText,
  GitMerge,
  Link2,
  Lock,
  PenLine,
  Search,
  Sparkles,
  Users,
  Wand2,
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
    path: "/product/docs",
    title: isEs ? "Documentos" : "Docs",
    description: isEs
      ? "Editor block-based con colaboración real-time hasta 100 personas e IA inline. Doc se convierte en tarea con un atajo."
      : "Block-based editor with real-time collaboration up to 100 people and inline AI. Doc turns into task with a shortcut.",
  });
}

export default async function DocsPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  const capabilities = isEs
    ? [
        {
          icon: PenLine,
          tint: "#ff8dda",
          title: "Editor block-based",
          body: "/comando para insertar cualquier bloque. Drag para reordenar. Convierte texto en lista, lista en tabla, tabla en kanban — sin perder un solo dato.",
          detail: "30+ block types · drag-to-transform · keyboard-first",
        },
        {
          icon: Wand2,
          tint: "#a88cff",
          title: "IA inline en cada cursor",
          body: '"Continúa esto", "Resume", "Convierte a tabla", "Genera ejemplos". El Co-Piloto entiende el contexto del bloque, no solo el prompt.',
          detail: "Streaming · context-aware · undo-safe",
        },
        {
          icon: Users,
          tint: "#38e4ff",
          title: "Hasta 100 colaboradores en vivo",
          body: "Cursores con presencia y avatares. Cero conflictos de merge. Comentarios threaded en cualquier bloque. Resolución de comentarios con audit log.",
          detail: "CRDT · presence channels · sub-50ms sync",
        },
        {
          icon: Search,
          tint: "#f25bd8",
          title: "Búsqueda semántica del workspace",
          body: "Busca por significado, no por palabras exactas. Encuentra el doc correcto aunque uses sinónimos. Resultados con preview y permisos respetados.",
          detail: "pgvector · 1536-dim · RLS-aware",
        },
        {
          icon: GitMerge,
          tint: "#79b8ff",
          title: "Historial y versiones",
          body: "Cada cambio se guarda. Compara dos versiones lado a lado, revierte un párrafo específico, o restaura el doc completo a un punto del tiempo.",
          detail: "Append-only · 365-day retention · diff view",
        },
        {
          icon: Link2,
          tint: "#34c79a",
          title: "Bidirectional links + backlinks",
          body: "Linkea un doc a otro, una tarea a un doc, un doc a un cliente. El sidebar muestra todo lo que apunta a este doc — discovery sin esfuerzo.",
          detail: "Auto-backlinks · graph view · /-mention",
        },
      ]
    : [
        {
          icon: PenLine,
          tint: "#ff8dda",
          title: "Block-based editor",
          body: "/command to insert any block. Drag to reorder. Turn text into list, list into table, table into kanban — without losing a single piece of data.",
          detail: "30+ block types · drag-to-transform · keyboard-first",
        },
        {
          icon: Wand2,
          tint: "#a88cff",
          title: "Inline AI at every cursor",
          body: '"Continue this", "Summarize", "Turn into table", "Generate examples". Co-Pilot understands the block context, not just the prompt.',
          detail: "Streaming · context-aware · undo-safe",
        },
        {
          icon: Users,
          tint: "#38e4ff",
          title: "Up to 100 live collaborators",
          body: "Presence cursors with avatars. Zero merge conflicts. Threaded comments on any block. Comment resolution with audit log.",
          detail: "CRDT · presence channels · sub-50ms sync",
        },
        {
          icon: Search,
          tint: "#f25bd8",
          title: "Semantic workspace search",
          body: "Search by meaning, not exact keywords. Find the right doc even if you use a synonym. Results with preview and permissions respected.",
          detail: "pgvector · 1536-dim · RLS-aware",
        },
        {
          icon: GitMerge,
          tint: "#79b8ff",
          title: "History and versions",
          body: "Every change saved. Compare two versions side-by-side, revert a specific paragraph, or restore the whole doc to a point in time.",
          detail: "Append-only · 365-day retention · diff view",
        },
        {
          icon: Link2,
          tint: "#34c79a",
          title: "Bidirectional links + backlinks",
          body: "Link a doc to another, a task to a doc, a doc to a customer. The sidebar shows everything pointing at this doc — discovery without effort.",
          detail: "Auto-backlinks · graph view · /-mention",
        },
      ];

  const templates = isEs
    ? [
        { name: "Brief de proyecto", industry: "Marketing", tint: "#ff8dda" },
        { name: "Propuesta comercial", industry: "Ventas", tint: "#a88cff" },
        { name: "Retro de sprint", industry: "Producto", tint: "#38e4ff" },
        { name: "SOP de onboarding", industry: "Operaciones", tint: "#f25bd8" },
        { name: "Contrato cliente", industry: "Legal", tint: "#79b8ff" },
        { name: "Historia clínica", industry: "Salud", tint: "#34c79a" },
        { name: "Plan de obra", industry: "Construcción", tint: "#f5b14a" },
        { name: "Política interna", industry: "RH", tint: "#ff8dda" },
      ]
    : [
        { name: "Project brief", industry: "Marketing", tint: "#ff8dda" },
        { name: "Sales proposal", industry: "Sales", tint: "#a88cff" },
        { name: "Sprint retro", industry: "Product", tint: "#38e4ff" },
        { name: "Onboarding SOP", industry: "Ops", tint: "#f25bd8" },
        { name: "Client contract", industry: "Legal", tint: "#79b8ff" },
        { name: "Patient record", industry: "Health", tint: "#34c79a" },
        { name: "Construction plan", industry: "Construction", tint: "#f5b14a" },
        { name: "Internal policy", industry: "HR", tint: "#ff8dda" },
      ];

  return (
    <>
      <PageHero
        eyebrow={dict.nav.productDocs}
        title={
          isEs ? (
            <>
              Documentos que{" "}
              <span className="text-gradient animate-gradient">escriben contigo</span>
            </>
          ) : (
            <>
              Docs that{" "}
              <span className="text-gradient animate-gradient">write with you</span>
            </>
          )
        }
        description={
          isEs
            ? "Notion-grade. Editor block-based, colaboración real-time hasta 100 personas, comentarios threaded, IA inline en cada cursor. Y todo conectado a tus tareas — un doc se convierte en tarea sin perder contexto."
            : "Notion-grade. Block-based editor, real-time collaboration up to 100 people, threaded comments, inline AI at every cursor. All connected to your tasks — a doc turns into a task without losing context."
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
              name="product/docs/hero"
              aspect="16/9"
              radius="96px 64px 84px 72px / 72px 84px 64px 96px"
            />
          </div>
        }
      />

      {/* ─────────────────────────────────────────────────────────
          Editor demo split — copy + MediaSlot
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="grid items-center gap-[var(--space-10)] lg:grid-cols-[1fr_1.3fr]">
            <RevealOnScroll direction="up" distance={20} duration={0.7}>
              <span className="eyebrow-pill inline-flex">
                <span
                  aria-hidden
                  className="grid h-4 w-4 place-items-center rounded-full text-white"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <Sparkles className="h-2.5 w-2.5" strokeWidth={2.4} />
                </span>
                <span>{isEs ? "El editor" : "The editor"}</span>
              </span>
              <h2 className="mt-3 font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
                {isEs ? (
                  <>
                    Bloques que se mueven, se anidan,{" "}
                    <span className="text-gradient">se transforman.</span>
                  </>
                ) : (
                  <>
                    Blocks that move, nest,{" "}
                    <span className="text-gradient">transform.</span>
                  </>
                )}
              </h2>
              <p className="mt-4 text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
                {isEs
                  ? "Empieza con texto. Lo conviertes en lista con un atajo. Luego en tabla. Luego en kanban. Sin perder datos, sin reescribir nada. Lo que pensaste primero como nota termina siendo el sistema operativo de tu equipo."
                  : "Start with text. Turn it into a list with a shortcut. Then a table. Then a kanban board. Without losing data, without rewriting anything. What you first thought of as a note ends up running your team."}
              </p>
              <ul className="mt-5 flex flex-col gap-2">
                {(isEs
                  ? [
                      "30+ tipos de bloques (texto, tablas, código, embeds, kanban)",
                      "/-command para insertar cualquier cosa",
                      "Atajos por plataforma (Cmd / Ctrl)",
                      "Drag-to-transform sin pérdida de datos",
                    ]
                  : [
                      "30+ block types (text, tables, code, embeds, kanban)",
                      "/-command to insert anything",
                      "Platform-native shortcuts (Cmd / Ctrl)",
                      "Drag-to-transform with zero data loss",
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
                name="product/docs/editor-demo"
                aspect="4/3"
                radius="84px 64px 96px 60px / 60px 96px 64px 84px"
              />
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Six capabilities
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
                  Seis capacidades que cambian cómo{" "}
                  <span className="text-gradient">escribes en equipo.</span>
                </>
              ) : (
                <>
                  Six capabilities that change how{" "}
                  <span className="text-gradient">your team writes.</span>
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
          Templates strip
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mx-auto mb-[var(--space-10)] max-w-3xl text-center">
            <span className="eyebrow-pill inline-flex">
              <span
                aria-hidden
                className="grid h-4 w-4 place-items-center rounded-full text-white"
                style={{ background: "var(--gradient-hero)" }}
              >
                <FileText className="h-2.5 w-2.5" strokeWidth={2.4} />
              </span>
              <span>{isEs ? "Plantillas" : "Templates"}</span>
            </span>
            <h2 className="mt-[var(--space-4)] font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Empieza con plantillas{" "}
                  <span className="text-gradient">por industria.</span>
                </>
              ) : (
                <>
                  Start with templates{" "}
                  <span className="text-gradient">by industry.</span>
                </>
              )}
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-[var(--fg-muted)]">
              {isEs
                ? "100+ plantillas pre-configuradas por industria y caso de uso. Modifícalas o crea las tuyas — y comparte con el equipo."
                : "100+ templates pre-built by industry and use case. Modify them or create your own — and share with the team."}
            </p>
          </div>
          <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2">
            {templates.map((t, i) => (
              <RevealOnScroll
                key={t.name}
                direction="up"
                distance={14}
                delay={i * 0.04}
                duration={0.5}
                className="lozenge inline-flex animate-breathe items-center gap-2 px-4 py-2 text-[13px] font-medium text-[var(--fg-secondary)]"
                style={{
                  animationDelay: `${i * -0.6}s`,
                  animationDuration: `${8 + (i % 3)}s`,
                }}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: t.tint }}
                />
                <span className="font-display text-[var(--fg)]">{t.name}</span>
                <span className="text-[11.5px] text-[var(--fg-muted)]">
                  · {t.industry}
                </span>
              </RevealOnScroll>
            ))}
          </ul>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Permissions + privacy callout
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
                <Lock className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div className="flex flex-col">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                  {isEs ? "Permisos" : "Permissions"}
                </span>
                <span className="font-display text-[clamp(16px,1.8vw,20px)] leading-tight tracking-tight">
                  {isEs
                    ? "Privacidad por doc, equipo, o workspace"
                    : "Privacy per doc, team, or workspace"}
                </span>
              </div>
            </div>
            <Link
              href={`${lp}/security`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--fg)] transition-transform hover:-translate-y-0.5"
            >
              {isEs ? "Ver seguridad" : "See security"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
