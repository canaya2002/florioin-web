import {
  Bot,
  ListChecks,
  MessageSquare,
  ScrollText,
  Shield,
  Wand2,
} from "lucide-react";

import { RevealOnScroll } from "@/components/animations/reveal-on-scroll";
import { Container } from "@/components/layout/container";
import type { Locale } from "@/i18n/locales";

type FeatureWallProps = {
  locale: Locale;
};

type Group = {
  title: string;
  icon: typeof Bot;
  tint: string;
  features: string[];
};

const RADII = [
  "64px 96px 60px 84px / 84px 60px 96px 64px",
  "96px 60px 84px 64px / 60px 84px 64px 96px",
  "84px 96px 64px 60px / 60px 96px 64px 84px",
  "60px 84px 96px 60px / 96px 84px 60px 96px",
  "96px 60px 60px 84px / 84px 60px 96px 60px",
  "84px 64px 96px 84px / 60px 96px 64px 84px",
];

export function FeatureWall({ locale }: FeatureWallProps) {
  const isEs = locale === "es";

  const groups: Group[] = isEs
    ? [
        {
          title: "Trabajo",
          icon: ListChecks,
          tint: "#ff8dda",
          features: [
            "Tasks",
            "Subtasks",
            "Dependencias",
            "Custom fields",
            "Tableros",
            "Listas",
            "Timeline",
            "Gantt",
            "Calendario",
            "Workload",
            "Sprints",
            "Goals",
          ],
        },
        {
          title: "Conocimiento",
          icon: ScrollText,
          tint: "#a88cff",
          features: [
            "Docs",
            "Wikis",
            "Editor block-based",
            "Comentarios",
            "Plantillas",
            "Versionado",
            "Búsqueda conectada",
            "PDFs",
            "Snippets",
            "Mind Maps",
            "Whiteboards",
          ],
        },
        {
          title: "Comunicación",
          icon: MessageSquare,
          tint: "#38e4ff",
          features: [
            "Inbox unificada",
            "Chat",
            "Threads",
            "Hilos en tareas",
            "Email integrado",
            "Mentions",
            "Notificaciones inteligentes",
            "Video clips",
            "Voz a tarea",
          ],
        },
        {
          title: "AI Co-Piloto",
          icon: Bot,
          tint: "#f25bd8",
          features: [
            "RAG sobre tu workspace",
            "Tool use real",
            "Multi-modelo",
            "Resúmenes automáticos",
            "Generación de tareas",
            "Replies sugeridas",
            "Búsqueda semántica",
            "Auto-categorización",
            "Citas con fuente",
          ],
        },
        {
          title: "Automatización",
          icon: Wand2,
          tint: "#79b8ff",
          features: [
            "Workflows visuales",
            "Triggers nativos",
            "Approvals",
            "Forms",
            "Encuestas",
            "Webhooks",
            "200+ integraciones",
            "API pública",
            "Reglas condicionales",
          ],
        },
        {
          title: "Enterprise",
          icon: Shield,
          tint: "#34c79a",
          features: [
            "SSO / SAML",
            "SCIM",
            "RLS multi-tenant",
            "Audit logs",
            "Roles y permisos",
            "Retención configurable",
            "Residencia de datos",
            "Compliance roadmap",
            "Encriptación AES-256",
          ],
        },
      ]
    : [
        {
          title: "Work",
          icon: ListChecks,
          tint: "#ff8dda",
          features: [
            "Tasks",
            "Subtasks",
            "Dependencies",
            "Custom fields",
            "Boards",
            "Lists",
            "Timeline",
            "Gantt",
            "Calendar",
            "Workload",
            "Sprints",
            "Goals",
          ],
        },
        {
          title: "Knowledge",
          icon: ScrollText,
          tint: "#a88cff",
          features: [
            "Docs",
            "Wikis",
            "Block-based editor",
            "Comments",
            "Templates",
            "Versioning",
            "Connected search",
            "PDFs",
            "Snippets",
            "Mind Maps",
            "Whiteboards",
          ],
        },
        {
          title: "Communication",
          icon: MessageSquare,
          tint: "#38e4ff",
          features: [
            "Unified inbox",
            "Chat",
            "Threads",
            "Task threads",
            "Email integrated",
            "Mentions",
            "Smart notifications",
            "Video clips",
            "Voice-to-task",
          ],
        },
        {
          title: "AI Co-Pilot",
          icon: Bot,
          tint: "#f25bd8",
          features: [
            "RAG over your workspace",
            "Real tool use",
            "Multi-model",
            "Auto summaries",
            "Task generation",
            "Suggested replies",
            "Semantic search",
            "Auto-categorization",
            "Source citations",
          ],
        },
        {
          title: "Automation",
          icon: Wand2,
          tint: "#79b8ff",
          features: [
            "Visual workflows",
            "Native triggers",
            "Approvals",
            "Forms",
            "Surveys",
            "Webhooks",
            "200+ integrations",
            "Public API",
            "Conditional rules",
          ],
        },
        {
          title: "Enterprise",
          icon: Shield,
          tint: "#34c79a",
          features: [
            "SSO / SAML",
            "SCIM",
            "Multi-tenant RLS",
            "Audit logs",
            "Roles & permissions",
            "Configurable retention",
            "Data residency",
            "Compliance roadmap",
            "AES-256 encryption",
          ],
        },
      ];

  const total = groups.reduce((sum, g) => sum + g.features.length, 0);

  return (
    <section
      id="capabilities"
      className="section relative isolate overflow-hidden bg-white scroll-mt-24"
    >
      <Container>
        <div className="mb-[var(--space-12)] flex flex-col items-start gap-[var(--space-3)]">
          <span className="eyebrow-pill inline-flex">
            <span className="dot" aria-hidden />
            <span>{isEs ? "Capacidades" : "Capabilities"}</span>
          </span>
          <h2 className="max-w-3xl font-display text-[clamp(40px,6vw,84px)] leading-[1.02] tracking-[-0.05em] text-[var(--fg)] [text-wrap:balance]">
            {isEs ? (
              <>
                <span className="text-gradient">{total}+</span> capacidades.
                Cero costo extra.
              </>
            ) : (
              <>
                <span className="text-gradient">{total}+</span> capabilities.
                Zero extra cost.
              </>
            )}
          </h2>
          <p className="max-w-2xl text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
            {isEs
              ? "Todo viene en el mismo plan de $3 USD por usuario. Sin tiers, sin features bloqueadas, sin upgrades para 'desbloquear' lo básico."
              : "Everything ships in the same $3 USD per-seat plan. No tiers, no locked features, no upgrades to 'unlock' the basics."}
          </p>
        </div>

        <div className="grid gap-[var(--space-8)] md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, i) => {
            const Icon = group.icon;
            return (
              <RevealOnScroll
                key={group.title}
                direction="up"
                distance={18}
                delay={i * 0.06}
                duration={0.7}
                className="group relative flex flex-col gap-5 overflow-hidden bg-white p-7 transition-transform duration-[var(--duration-base)] hover:-translate-y-1.5"
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
                    animationDelay: `${i * -2.4}s`,
                    mixBlendMode: "soft-light",
                  }}
                />
                {/* Always-on tinted halo behind */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-1/3 -z-10 opacity-40 blur-3xl transition-opacity duration-[var(--duration-base)] group-hover:opacity-80"
                  style={{
                    background: `radial-gradient(55% 50% at 50% 0%, ${group.tint}55, transparent 65%)`,
                  }}
                />

                {/* Header: category icon + name + count */}
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid h-11 w-11 place-items-center rounded-full text-white"
                    style={{ background: group.tint }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-[clamp(22px,2.4vw,28px)] leading-tight tracking-[-0.025em] text-[var(--fg)]">
                    {group.title}
                  </h3>
                  <span
                    className="ml-auto font-display text-[clamp(36px,4vw,52px)] leading-none tracking-[-0.05em] animate-breathe"
                    style={{
                      background: `linear-gradient(135deg, ${group.tint}, var(--c-violet))`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animationDelay: `${i * -1.2}s`,
                    }}
                  >
                    {group.features.length}
                  </span>
                </div>

                {/* Two-column pill layout for density */}
                <ul className="grid grid-cols-2 gap-1.5">
                  {group.features.map((feature) => (
                    <li
                      key={feature}
                      className="truncate rounded-full bg-[#fafbfc] px-3 py-1.5 text-[12.5px] font-medium text-[var(--fg-secondary)] transition-colors hover:bg-white hover:text-[var(--fg)]"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Bottom callout — total capabilities included */}
        <RevealOnScroll
          direction="up"
          distance={16}
          duration={0.6}
          className="mt-[var(--space-12)] flex justify-center"
        >
          <span className="lozenge inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-[var(--fg-secondary)]">
            <span
              aria-hidden
              className="grid h-5 w-5 place-items-center rounded-full text-white"
              style={{ background: "var(--gradient-hero)" }}
            >
              <Wand2 className="h-3 w-3" strokeWidth={2} />
            </span>
            {isEs
              ? `${total}+ capacidades en el mismo plan de $3`
              : `${total}+ capabilities in the same $3 plan`}
          </span>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
