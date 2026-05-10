import { Container } from "@/components/layout/container";
import type { Locale } from "@/i18n/locales";

type FeatureWallProps = {
  locale: Locale;
};

export function FeatureWall({ locale }: FeatureWallProps) {
  const isEs = locale === "es";

  const groups = isEs
    ? [
        {
          title: "Trabajo",
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
      className="section relative isolate overflow-hidden scroll-mt-24"
    >
      <Container>
        <div className="mb-[var(--space-12)] flex flex-col items-start gap-[var(--space-3)]">
          <span className="eyebrow-pill inline-flex">
            <span className="dot" aria-hidden />
            <span>{isEs ? "Capacidades" : "Capabilities"}</span>
          </span>
          <h2 className="max-w-3xl font-display text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.04em] text-[var(--fg)]">
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.title}
              className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-6"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-[18px] leading-tight tracking-tight text-[var(--fg)]">
                  {group.title}
                </h3>
                <span className="text-[12px] font-medium text-[var(--fg-muted)]">
                  {group.features.length}
                </span>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {group.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-[12.5px] font-medium text-[var(--fg-secondary)] transition-colors hover:border-[var(--primary)]/40 hover:text-[var(--fg)]"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
