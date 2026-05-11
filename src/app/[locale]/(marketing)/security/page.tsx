import {
  Bug,
  Calendar,
  Code2,
  Database,
  Download,
  FileCheck2,
  FileLock2,
  GitPullRequest,
  Key,
  KeyRound,
  Lock,
  Mail,
  Network,
  PackageCheck,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserCheck,
  Workflow,
} from "lucide-react";
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
    path: "/security",
    title: isEs ? "Seguridad" : "Security",
    description: isEs
      ? "Cómo protegemos tus datos: arquitectura multi-tenant, encriptación, audit logs, SSO, bug bounty, pentests."
      : "How we protect your data: multi-tenant architecture, encryption, audit logs, SSO, bug bounty, pentests.",
  });
}

export default async function SecurityPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";

  const pillars = isEs
    ? [
        {
          icon: Database,
          tint: "#ff8dda",
          title: "Multi-tenant con RLS",
          body: "Cada empresa tiene aislamiento a nivel de fila en Postgres. Ningún query cruza el perímetro de tenant — verificado por tests automatizados que corren en cada deploy.",
          detail: "row_security · auth.tenant_id() · audit trail",
        },
        {
          icon: Lock,
          tint: "#a88cff",
          title: "Encriptación in-transit y at-rest",
          body: "TLS 1.3 para todo tráfico HTTP. AES-256-GCM para datos en disco con llaves rotadas trimestralmente. Backups encriptados con llaves separadas.",
          detail: "TLS 1.3 · AES-256-GCM · KMS rotation",
        },
        {
          icon: Key,
          tint: "#38e4ff",
          title: "SSO + SCIM",
          body: "Google Workspace, Microsoft 365, Okta, Azure AD. Provisioning automático de usuarios para planes empresariales, con sync bidireccional.",
          detail: "SAML 2.0 · OIDC · SCIM 2.0",
        },
        {
          icon: FileLock2,
          tint: "#f25bd8",
          title: "Audit logs inmutables",
          body: "Cada acción que toca datos del cliente queda registrada con actor, recurso, IP, timestamp y diff. Exportable a CSV o vía webhook firmado a tu SIEM.",
          detail: "Append-only · 365-day retention · Splunk / Datadog compatible",
        },
        {
          icon: Server,
          tint: "#79b8ff",
          title: "Residencia de datos",
          body: "US-East por default. EU-West para clientes que lo requieran (GDPR). Sin transferencias cross-region sin tu permiso explícito.",
          detail: "us-east-1 · eu-west-1 · pending: sa-east-1 (Q4)",
        },
        {
          icon: ShieldCheck,
          tint: "#34c79a",
          title: "Compliance roadmap",
          body: "SOC 2 Type II en proceso (auditoría inicial Q3 2026). HIPAA-ready para clientes healthcare. ISO 27001 evaluación en curso.",
          detail: "SOC 2 · HIPAA · ISO 27001 · GDPR · CCPA",
        },
      ]
    : [
        {
          icon: Database,
          tint: "#ff8dda",
          title: "Multi-tenant with RLS",
          body: "Every company has row-level isolation in Postgres. No query crosses the tenant perimeter — verified by automated tests that run on every deploy.",
          detail: "row_security · auth.tenant_id() · audit trail",
        },
        {
          icon: Lock,
          tint: "#a88cff",
          title: "Encryption in transit and at rest",
          body: "TLS 1.3 for all HTTP traffic. AES-256-GCM for data on disk with keys rotated quarterly. Backups encrypted with separate keys.",
          detail: "TLS 1.3 · AES-256-GCM · KMS rotation",
        },
        {
          icon: Key,
          tint: "#38e4ff",
          title: "SSO + SCIM",
          body: "Google Workspace, Microsoft 365, Okta, Azure AD. Automatic user provisioning on enterprise plans, with bi-directional sync.",
          detail: "SAML 2.0 · OIDC · SCIM 2.0",
        },
        {
          icon: FileLock2,
          tint: "#f25bd8",
          title: "Immutable audit logs",
          body: "Every action that touches customer data is logged with actor, resource, IP, timestamp, and diff. Exportable to CSV or via signed webhook to your SIEM.",
          detail: "Append-only · 365-day retention · Splunk / Datadog compatible",
        },
        {
          icon: Server,
          tint: "#79b8ff",
          title: "Data residency",
          body: "US-East by default. EU-West for clients who require it (GDPR). No cross-region transfers without your explicit consent.",
          detail: "us-east-1 · eu-west-1 · pending: sa-east-1 (Q4)",
        },
        {
          icon: ShieldCheck,
          tint: "#34c79a",
          title: "Compliance roadmap",
          body: "SOC 2 Type II in progress (initial audit Q3 2026). HIPAA-ready for healthcare. ISO 27001 evaluation underway.",
          detail: "SOC 2 · HIPAA · ISO 27001 · GDPR · CCPA",
        },
      ];

  // ── Engineering practices ───────────────────────────────────────────
  const practices = isEs
    ? [
        {
          icon: GitPullRequest,
          tint: "#ff8dda",
          title: "Code reviews obligatorios",
          body: "Cada PR requiere aprobación de al menos un ingeniero senior + bypass explícito documentado para hotfixes. Cero force-push a main.",
        },
        {
          icon: Code2,
          tint: "#a88cff",
          title: "SAST en cada PR",
          body: "Semgrep + CodeQL corren en GitHub Actions antes de merge. Reglas custom para anti-patterns de RLS, leaks de tenant_id y secrets en código.",
        },
        {
          icon: Bug,
          tint: "#38e4ff",
          title: "DAST nightly",
          body: "OWASP ZAP escanea staging cada noche con auth roles distintos. Findings con severity high+ abren ticket en < 1 hora automático.",
        },
        {
          icon: PackageCheck,
          tint: "#f25bd8",
          title: "Dependencias auditadas",
          body: "Dependabot + Snyk monitorean CVEs. Patches críticos en < 24h, high en < 7 días. Cero deps sin license review.",
        },
        {
          icon: KeyRound,
          tint: "#79b8ff",
          title: "Cero secrets en repo",
          body: "TruffleHog + GitHub secret scanning bloquean push con tokens. Todos los secrets en Vault con rotación automática trimestral.",
        },
        {
          icon: Rocket,
          tint: "#34c79a",
          title: "Releases seguros",
          body: "Canary deploys con feature flags + rollback en < 60s. Cada release lleva changelog firmado con SBOM (Software Bill of Materials).",
        },
      ]
    : [
        {
          icon: GitPullRequest,
          tint: "#ff8dda",
          title: "Mandatory code reviews",
          body: "Every PR requires at least one senior engineer approval + explicit documented bypass for hotfixes. Zero force-push to main.",
        },
        {
          icon: Code2,
          tint: "#a88cff",
          title: "SAST on every PR",
          body: "Semgrep + CodeQL run in GitHub Actions before merge. Custom rules for RLS anti-patterns, tenant_id leaks, and secrets in code.",
        },
        {
          icon: Bug,
          tint: "#38e4ff",
          title: "Nightly DAST",
          body: "OWASP ZAP scans staging nightly with different auth roles. High+ severity findings auto-open a ticket in < 1 hour.",
        },
        {
          icon: PackageCheck,
          tint: "#f25bd8",
          title: "Audited dependencies",
          body: "Dependabot + Snyk monitor CVEs. Critical patches in < 24h, high in < 7 days. Zero deps without license review.",
        },
        {
          icon: KeyRound,
          tint: "#79b8ff",
          title: "Zero secrets in repo",
          body: "TruffleHog + GitHub secret scanning block pushes with tokens. All secrets in Vault with automatic quarterly rotation.",
        },
        {
          icon: Rocket,
          tint: "#34c79a",
          title: "Safe releases",
          body: "Canary deploys with feature flags + rollback in < 60s. Each release ships a signed changelog with SBOM (Software Bill of Materials).",
        },
      ];

  // ── Customer data controls ──────────────────────────────────────────
  const dataControls = isEs
    ? [
        {
          icon: Download,
          title: "Export en cualquier momento",
          body: "Botón en /settings/data → ZIP con JSON + adjuntos de todo lo del workspace. Sin tickets, sin esperar 30 días, sin retention hostage.",
        },
        {
          icon: Trash2,
          title: "Delete on demand",
          body: "Hard delete en < 24h. Soft delete con ventana de recuperación de 7 días por accidente. Backups purgan en < 30 días.",
        },
        {
          icon: Calendar,
          title: "Retención configurable",
          body: "Por workspace: define cuánto duran logs, AI prompts, archivos. Default 365 días para logs, 90 para AI prompts. Tú decides.",
        },
        {
          icon: UserCheck,
          title: "Control de invites",
          body: "Restricción por dominio, MFA obligatorio, expiración de invites. Owner aprueba cada nuevo dominio externo.",
        },
      ]
    : [
        {
          icon: Download,
          title: "Export anytime",
          body: "Button at /settings/data → ZIP with JSON + attachments of everything in the workspace. No tickets, no 30-day waits, no retention hostage.",
        },
        {
          icon: Trash2,
          title: "Delete on demand",
          body: "Hard delete in < 24h. Soft delete with 7-day recovery window for accidents. Backups purge in < 30 days.",
        },
        {
          icon: Calendar,
          title: "Configurable retention",
          body: "Per workspace: define how long logs, AI prompts, and files live. Default 365 days for logs, 90 for AI prompts. Your call.",
        },
        {
          icon: UserCheck,
          title: "Invite controls",
          body: "Domain restriction, MFA required, invite expiration. Owner approves every new external domain.",
        },
      ];

  // ── Pentest + bug bounty calendar ───────────────────────────────────
  const calendar = isEs
    ? [
        {
          when: "Trimestral",
          title: "Pentest interno",
          body: "Equipo de seguridad propio + un consultor externo. Findings con severity > medium se publican en este sitio en < 30 días.",
        },
        {
          when: "Anual",
          title: "Pentest externo independiente",
          body: "Firma certificada (CREST / OSCP). Report ejecutivo público; report técnico bajo NDA para clientes.",
        },
        {
          when: "Continuo",
          title: "Bug bounty",
          body: "Programa privado en HackerOne con scope público. Bounties de $250 USD (low) a $10,000 USD (critical RCE / RLS bypass).",
        },
        {
          when: "Cada release",
          title: "Threat modeling de cambios críticos",
          body: "PRs que tocan auth, RLS, billing o IA pasan por threat-model review antes de merge. Documentado en /docs/security.",
        },
      ]
    : [
        {
          when: "Quarterly",
          title: "Internal pentest",
          body: "In-house security team + external consultant. Findings with severity > medium are published on this site in < 30 days.",
        },
        {
          when: "Annual",
          title: "Independent external pentest",
          body: "Certified firm (CREST / OSCP). Public executive report; technical report under NDA for customers.",
        },
        {
          when: "Continuous",
          title: "Bug bounty",
          body: "Private HackerOne program with public scope. Bounties from $250 USD (low) to $10,000 USD (critical RCE / RLS bypass).",
        },
        {
          when: "Every release",
          title: "Threat modeling for critical changes",
          body: "PRs touching auth, RLS, billing, or AI go through threat-model review before merge. Documented at /docs/security.",
        },
      ];

  const aiPrivacy = isEs
    ? [
        "Sin entrenamiento con tu data — garantizado contractualmente",
        "Prompts y respuestas viven en tu tenant, nunca cross-tenant",
        "Borrable on-demand vía API o desde el dashboard",
        "Opción de auto-redacción de PII antes del LLM",
        "Audit log de cada prompt y respuesta del Co-Pilot",
        "Opt-out a nivel workspace, equipo o usuario individual",
      ]
    : [
        "No training on your data — contractually guaranteed",
        "Prompts and responses live in your tenant, never cross-tenant",
        "Deletable on demand via API or from the dashboard",
        "Optional auto-redaction of PII before LLM call",
        "Audit log of every Co-Pilot prompt and response",
        "Opt-out at workspace, team, or individual user level",
      ];

  const responsibility = isEs
    ? [
        { area: "Infraestructura", florioin: "Hosting, parches OS, network firewalls, DDoS protection", you: "—" },
        { area: "Aplicación", florioin: "Código seguro, dependency scans, pentests anuales", you: "Configurar SSO, roles y permisos" },
        { area: "Datos", florioin: "Encriptación, backups, audit logs", you: "Decidir qué datos cargar y retención por workspace" },
        { area: "Identidad", florioin: "MFA, SCIM, SAML provisioning", you: "Gestionar accesos y revisar quién entra al workspace" },
        { area: "Compliance", florioin: "Certificaciones, DPA, reports", you: "Cumplir con regulaciones específicas de tu industria" },
      ]
    : [
        { area: "Infrastructure", florioin: "Hosting, OS patches, network firewalls, DDoS protection", you: "—" },
        { area: "Application", florioin: "Secure code, dependency scans, annual pentests", you: "Configure SSO, roles and permissions" },
        { area: "Data", florioin: "Encryption, backups, audit logs", you: "Decide what data to load and retention per workspace" },
        { area: "Identity", florioin: "MFA, SCIM, SAML provisioning", you: "Manage access and review who enters the workspace" },
        { area: "Compliance", florioin: "Certifications, DPA, reports", you: "Comply with regulations specific to your industry" },
      ];

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Seguridad" : "Security"}
        title={
          isEs ? (
            <>
              Construido para empresas que se toman los datos en{" "}
              <span className="text-gradient animate-gradient">serio</span>
            </>
          ) : (
            <>
              Built for companies that take data{" "}
              <span className="text-gradient animate-gradient">seriously</span>
            </>
          )
        }
        description={
          isEs
            ? "FlorioIn corre en una arquitectura multi-tenant aislada por fila, con encriptación en tránsito y reposo, audit logs por defecto, y un roadmap de compliance público y actualizado en este sitio."
            : "FlorioIn runs on a multi-tenant architecture isolated row-by-row, with encryption in transit and at rest, audit logs by default, and a public compliance roadmap kept current on this page."
        }
      />

      {/* Compliance status pills */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-10)]">
        <Container>
          <RevealOnScroll direction="up" distance={16} duration={0.6} className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: isEs ? "SOC 2 Type II (en proceso · Q3 2026)" : "SOC 2 Type II (in progress · Q3 2026)", tint: "#a88cff" },
              { label: "GDPR-compliant", tint: "#38e4ff" },
              { label: "HIPAA-ready", tint: "#ff8dda" },
              { label: isEs ? "ISO 27001 (evaluación)" : "ISO 27001 (evaluating)", tint: "#34c79a" },
              { label: "CCPA-compliant", tint: "#79b8ff" },
            ].map((p, i) => (
              <span
                key={p.label}
                className="lozenge inline-flex animate-breathe items-center gap-2 px-4 py-2 text-[12.5px] font-medium text-[var(--fg-secondary)]"
                style={{
                  animationDelay: `${i * -0.7}s`,
                  animationDuration: `${8 + (i % 2)}s`,
                }}
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: p.tint }} />
                {p.label}
              </span>
            ))}
          </RevealOnScroll>
        </Container>
      </section>

      {/* RLS architecture diagram */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="grid items-center gap-[var(--space-10)] lg:grid-cols-[1fr_1.2fr]">
            <RevealOnScroll direction="up" distance={20} duration={0.7}>
              <span className="eyebrow-pill inline-flex">
                <span className="dot" aria-hidden />
                <span>{isEs ? "Arquitectura" : "Architecture"}</span>
              </span>
              <h2 className="mt-3 font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
                {isEs ? (
                  <>
                    Aislamiento{" "}
                    <span className="text-gradient">a nivel de fila.</span>{" "}
                    Sin compartir esquemas, sin compartir queries.
                  </>
                ) : (
                  <>
                    Row-level{" "}
                    <span className="text-gradient">isolation.</span>{" "}
                    No shared schemas, no shared queries.
                  </>
                )}
              </h2>
              <p className="mt-4 text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
                {isEs
                  ? "Cada query lleva un tenant_id que Postgres aplica en una policy RLS automática. Si una API olvida el predicado, la base lo agrega — y un test de regresión falla el build en CI."
                  : "Every query carries a tenant_id that Postgres applies via an automatic RLS policy. If an API forgets the predicate, the database adds it — and a regression test fails the build in CI."}
              </p>
              <ul className="mt-5 flex flex-col gap-2 text-[14px] text-[var(--fg-secondary)]">
                {(isEs
                  ? [
                      "Una sola DB Postgres con RLS por tabla",
                      "tenant_id setteado al hacer auth, no en query",
                      "Tests automáticos verifican que `SET ROLE other_tenant` no devuelve filas",
                      "Audit log inmutable por tenant — append-only en partición separada",
                    ]
                  : [
                      "Single Postgres DB with RLS per table",
                      "tenant_id set on auth, not in queries",
                      "Automated tests verify `SET ROLE other_tenant` returns no rows",
                      "Immutable per-tenant audit log — append-only on separate partition",
                    ]
                ).map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full text-white"
                      style={{ background: "var(--gradient-hero)" }}
                    >
                      <FileCheck2 className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>

            {/* Diagram MediaSlot — placeholder for the real architecture
                image Carlos will provide. Aspect 4/3 to match the
                surrounding column without forcing layout shift. */}
            <RevealOnScroll
              direction="up"
              distance={20}
              delay={0.1}
              duration={0.7}
              className="relative"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-1/3 -z-10 opacity-50 blur-3xl"
                style={{ background: "var(--gradient-glow)" }}
              />
              <MediaSlot
                name="security/architecture"
                aspect="4/3"
                radius="84px 64px 96px 60px / 60px 96px 64px 84px"
              />
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Six pillars */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container size="wide">
          <div className="mb-[var(--space-12)] flex flex-col items-start gap-[var(--space-3)]">
            <span className="eyebrow-pill inline-flex">
              <span className="dot" aria-hidden />
              <span>{isEs ? "Seis pilares" : "Six pillars"}</span>
            </span>
            <h2 className="max-w-3xl font-display text-[clamp(36px,5vw,64px)] leading-[1.04] tracking-[-0.045em] text-[var(--fg)] [text-wrap:balance]">
              {isEs ? (
                <>
                  Defensa en{" "}
                  <span className="text-gradient">profundidad</span> — desde la fila hasta el certificado
                </>
              ) : (
                <>
                  Defense in{" "}
                  <span className="text-gradient">depth</span> — from the row to the cert
                </>
              )}
            </h2>
          </div>

          <ul className="grid gap-[var(--space-6)] md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
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
                  key={pillar.title}
                  direction="up"
                  distance={18}
                  delay={i * 0.06}
                  duration={0.7}
                  className="group relative flex flex-col gap-3 overflow-hidden bg-white p-7 transition-transform duration-[var(--duration-base)] hover:-translate-y-1.5"
                  style={{ borderRadius: radii[i] }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-1/3 -z-10 opacity-50 blur-3xl"
                    style={{ background: `radial-gradient(circle, ${pillar.tint}40, transparent 65%)` }}
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
                    style={{ background: pillar.tint }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-[clamp(20px,2vw,24px)] leading-tight tracking-[-0.025em]">
                    {pillar.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.55] text-[var(--fg-muted)]">
                    {pillar.body}
                  </p>
                  <div className="mt-auto pt-2 font-mono text-[11px] text-[var(--fg-subtle)]">
                    {pillar.detail}
                  </div>
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Engineering practices — NEW */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mb-[var(--space-12)] flex flex-col items-start gap-[var(--space-3)]">
            <span className="eyebrow-pill inline-flex">
              <span
                aria-hidden
                className="grid h-4 w-4 place-items-center rounded-full text-white"
                style={{ background: "var(--gradient-hero)" }}
              >
                <Code2 className="h-2.5 w-2.5" strokeWidth={2.4} />
              </span>
              <span>{isEs ? "Prácticas de ingeniería" : "Engineering practices"}</span>
            </span>
            <h2 className="max-w-3xl font-display text-[clamp(32px,4.5vw,56px)] leading-[1.04] tracking-[-0.045em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Cómo se{" "}
                  <span className="text-gradient">construye</span> cada release.
                </>
              ) : (
                <>
                  How each{" "}
                  <span className="text-gradient">release</span> gets built.
                </>
              )}
            </h2>
          </div>

          <ul className="grid gap-[var(--space-6)] md:grid-cols-2 lg:grid-cols-3">
            {practices.map((p, i) => {
              const Icon = p.icon;
              const radii = [
                "60px 88px 64px 80px / 80px 64px 88px 60px",
                "88px 60px 80px 64px / 60px 80px 64px 88px",
                "72px 96px 60px 84px / 84px 60px 96px 72px",
                "84px 64px 96px 60px / 60px 96px 64px 84px",
                "96px 60px 84px 72px / 72px 84px 60px 96px",
                "60px 84px 96px 64px / 84px 60px 64px 96px",
              ];
              return (
                <RevealOnScroll
                  key={p.title}
                  direction="up"
                  distance={18}
                  delay={i * 0.06}
                  duration={0.7}
                  className="relative flex flex-col gap-3 overflow-hidden bg-[#fafbfc] p-7"
                  style={{ borderRadius: radii[i] }}
                >
                  <span
                    aria-hidden
                    className="grid h-11 w-11 place-items-center rounded-full text-white"
                    style={{ background: p.tint }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-[clamp(18px,1.8vw,22px)] leading-tight tracking-[-0.025em]">
                    {p.title}
                  </h3>
                  <p className="text-[14px] leading-[1.55] text-[var(--fg-muted)]">
                    {p.body}
                  </p>
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* AI privacy */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="relative mx-auto max-w-[1100px]">
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-x-[10%] -inset-y-[20%] -z-10 opacity-60 blur-3xl"
              style={{ background: "var(--gradient-glow)" }}
            />
            <div
              className="relative overflow-hidden bg-white p-[var(--space-8)] md:p-[var(--space-16)]"
              style={{
                borderRadius: "96px 64px 84px 72px / 72px 84px 64px 96px",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-[-30%] -left-1/3 w-2/3 animate-sheen-wave"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
                  animationDuration: "12s",
                  mixBlendMode: "soft-light",
                }}
              />
              <span
                aria-hidden
                className="grid h-12 w-12 place-items-center rounded-full text-white animate-breathe"
                style={{ background: "var(--gradient-hero)" }}
              >
                <Sparkles className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span className="mt-[var(--space-4)] inline-block">
                <span className="eyebrow">
                  {isEs ? "Privacidad de IA" : "AI privacy"}
                </span>
              </span>
              <h2 className="mt-2 max-w-3xl font-display text-[clamp(32px,4.5vw,56px)] leading-[1.04] tracking-[-0.04em] [text-wrap:balance]">
                {isEs ? (
                  <>
                    Tu data{" "}
                    <span className="text-gradient">no entrena</span> modelos públicos.
                  </>
                ) : (
                  <>
                    Your data{" "}
                    <span className="text-gradient">doesn&apos;t train</span> public models.
                  </>
                )}
              </h2>
              <p className="mt-[var(--space-4)] max-w-3xl text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
                {isEs
                  ? "Usamos foundation models a través de contratos enterprise (OpenAI, Anthropic, Google) con garantías contractuales: tu data no se usa para entrenar modelos públicos. Todos los prompts y respuestas viven en tu tenant, audit-logged y borrables on-demand."
                  : "We use foundation models through enterprise contracts (OpenAI, Anthropic, Google) with contractual guarantees: your data is not used to train public models. All prompts and responses live in your tenant, audit-logged and deletable on demand."}
              </p>
              <ul className="mt-[var(--space-6)] grid gap-3 md:grid-cols-2">
                {aiPrivacy.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2.5 text-[14.5px] text-[var(--fg-secondary)]"
                  >
                    <span
                      aria-hidden
                      className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full text-white"
                      style={{ background: "var(--gradient-hero)" }}
                    >
                      <FileCheck2 className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Customer data controls — NEW */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mb-[var(--space-10)] flex flex-col items-start gap-[var(--space-3)]">
            <span className="eyebrow-pill inline-flex">
              <span className="dot" aria-hidden />
              <span>{isEs ? "Tus datos, tus controles" : "Your data, your controls"}</span>
            </span>
            <h2 className="max-w-3xl font-display text-[clamp(32px,4.5vw,56px)] leading-[1.04] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Lo que puedes hacer{" "}
                  <span className="text-gradient">sin pedir permiso</span> a soporte.
                </>
              ) : (
                <>
                  Things you can do{" "}
                  <span className="text-gradient">without asking</span> support.
                </>
              )}
            </h2>
          </div>
          <ul className="grid gap-[var(--space-5)] md:grid-cols-2">
            {dataControls.map((c, i) => {
              const Icon = c.icon;
              const radii = [
                "40px 56px 36px 48px / 48px 36px 56px 40px",
                "56px 40px 48px 36px / 36px 48px 40px 56px",
                "48px 36px 56px 40px / 40px 56px 36px 48px",
                "36px 56px 40px 48px / 56px 40px 48px 36px",
              ];
              return (
                <RevealOnScroll
                  key={c.title}
                  direction="up"
                  distance={16}
                  delay={i * 0.06}
                  duration={0.6}
                  className="relative flex flex-col gap-3 overflow-hidden bg-[#fafbfc] p-[var(--space-7)]"
                  style={{ borderRadius: radii[i] }}
                >
                  <span
                    aria-hidden
                    className="grid h-11 w-11 place-items-center rounded-full text-white"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-[clamp(18px,1.8vw,22px)] leading-tight tracking-[-0.025em]">
                    {c.title}
                  </h3>
                  <p className="text-[14px] leading-[1.55] text-[var(--fg-muted)]">
                    {c.body}
                  </p>
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Pentest + bug bounty calendar — NEW */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mb-[var(--space-10)] flex flex-col items-start gap-[var(--space-3)]">
            <span className="eyebrow-pill inline-flex">
              <span
                aria-hidden
                className="grid h-4 w-4 place-items-center rounded-full text-white"
                style={{ background: "var(--gradient-hero)" }}
              >
                <Bug className="h-2.5 w-2.5" strokeWidth={2.4} />
              </span>
              <span>{isEs ? "Calendario de seguridad" : "Security calendar"}</span>
            </span>
            <h2 className="max-w-3xl font-display text-[clamp(32px,4.5vw,56px)] leading-[1.04] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Cómo nos{" "}
                  <span className="text-gradient">probamos</span> a nosotros mismos — y a quién dejamos probarnos.
                </>
              ) : (
                <>
                  How we{" "}
                  <span className="text-gradient">test ourselves</span> — and who else gets to test us.
                </>
              )}
            </h2>
          </div>
          <ul className="flex flex-col gap-[var(--space-3)]">
            {calendar.map((c, i) => {
              const radii = [
                "32px 44px 36px 40px / 40px 36px 44px 32px",
                "44px 32px 40px 36px / 32px 40px 36px 44px",
                "36px 44px 32px 40px / 40px 32px 44px 36px",
                "40px 36px 44px 32px / 32px 44px 36px 40px",
              ];
              return (
                <RevealOnScroll
                  key={c.title}
                  direction="up"
                  distance={14}
                  delay={i * 0.05}
                  duration={0.6}
                  className="grid gap-3 bg-[#fafbfc] p-[var(--space-5)] md:grid-cols-[140px_1fr] md:items-baseline md:gap-6 md:p-[var(--space-6)]"
                  style={{ borderRadius: radii[i] }}
                >
                  <div className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--gradient-hero)" }}
                    />
                    <span className="font-display text-[15px] tracking-tight text-[var(--fg)]">
                      {c.when}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-[18px] leading-tight tracking-tight">
                      {c.title}
                    </h3>
                    <p className="text-[14px] leading-[1.55] text-[var(--fg-muted)]">
                      {c.body}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </ul>

          <div className="mt-[var(--space-8)] flex flex-wrap items-center gap-3">
            <a
              href="mailto:security@florioin.com?subject=Bug%20bounty%20program"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--gradient-hero)" }}
            >
              <Bug className="h-4 w-4" />
              {isEs ? "Aplicar al bug bounty" : "Apply to bug bounty"}
            </a>
            <a
              href="mailto:security@florioin.com?subject=Latest%20pentest%20report"
              className="inline-flex items-center gap-2 rounded-full bg-[#fafbfc] px-5 py-3 text-sm font-medium text-[var(--fg-secondary)] transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" />
              {isEs ? "Pedir último pentest report" : "Request latest pentest report"}
            </a>
          </div>
        </Container>
      </section>

      {/* Shared responsibility */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mb-[var(--space-10)] flex flex-col items-start gap-[var(--space-3)]">
            <span className="eyebrow-pill inline-flex">
              <span className="dot" aria-hidden />
              <span>
                {isEs
                  ? "Modelo de responsabilidad compartida"
                  : "Shared responsibility model"}
              </span>
            </span>
            <h2 className="max-w-3xl font-display text-[clamp(32px,4.5vw,56px)] leading-[1.04] tracking-[-0.04em] [text-wrap:balance]">
              {isEs
                ? "Qué hacemos nosotros, qué te toca a ti."
                : "What we handle, what's yours."}
            </h2>
          </div>
          <ul className="flex flex-col gap-[var(--space-3)]">
            {responsibility.map((row, i) => {
              const radii = [
                "32px 44px 36px 40px / 40px 36px 44px 32px",
                "44px 32px 40px 36px / 32px 40px 36px 44px",
                "36px 44px 32px 40px / 40px 32px 44px 36px",
                "40px 36px 44px 32px / 32px 44px 36px 40px",
                "44px 36px 40px 32px / 40px 32px 36px 44px",
              ];
              return (
                <RevealOnScroll
                  key={row.area}
                  direction="up"
                  distance={14}
                  delay={i * 0.05}
                  duration={0.6}
                  className="grid gap-3 bg-[#fafbfc] p-5 md:grid-cols-[180px_1fr_1fr] md:gap-6 md:p-6"
                  style={{ borderRadius: radii[i] }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--gradient-hero)" }}
                    />
                    <span className="font-display text-[15px] tracking-tight">
                      {row.area}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                      FlorioIn
                    </span>
                    <span className="text-[14px] text-[var(--fg-secondary)]">
                      {row.florioin}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                      {isEs ? "Tu equipo" : "Your team"}
                    </span>
                    <span className="text-[14px] text-[var(--fg-secondary)]">
                      {row.you}
                    </span>
                  </div>
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Incident response + sub-processors */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="grid gap-[var(--space-6)] md:grid-cols-2">
            {[
              {
                icon: Workflow,
                tint: "#a88cff",
                title: isEs ? "Respuesta a incidentes" : "Incident response",
                body: isEs
                  ? "Runbook documentado, on-call 24/7 con un SLA de notificación de 24 horas, post-mortems públicos para incidentes con impacto, y un email único (incidents@florioin.com) que abre ticket en nuestro tracker."
                  : "Documented runbook, 24/7 on-call with a 24-hour notification SLA, public post-mortems for impactful incidents, and a single email (incidents@florioin.com) that opens a ticket in our tracker.",
              },
              {
                icon: Network,
                tint: "#38e4ff",
                title: isEs ? "Sub-procesadores" : "Sub-processors",
                body: isEs
                  ? "Lista pública y mantenida en este sitio: AWS (hosting), OpenAI/Anthropic/Google (Co-Pilot bajo contrato enterprise), Resend (email), Cloudflare (CDN/WAF). Notificación 30 días antes de añadir uno nuevo."
                  : "Public list maintained on this site: AWS (hosting), OpenAI/Anthropic/Google (Co-Pilot under enterprise contract), Resend (email), Cloudflare (CDN/WAF). 30-day notification before adding a new one.",
              },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <RevealOnScroll
                  key={c.title}
                  direction="up"
                  distance={18}
                  delay={i * 0.08}
                  duration={0.7}
                  className="relative flex flex-col gap-3 overflow-hidden bg-white p-[var(--space-8)]"
                  style={{
                    borderRadius:
                      i === 0
                        ? "60px 88px 64px 80px / 80px 64px 88px 60px"
                        : "88px 60px 80px 64px / 60px 80px 64px 88px",
                  }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-1/3 -z-10 opacity-50 blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${c.tint}40, transparent 65%)`,
                    }}
                  />
                  <span
                    aria-hidden
                    className="grid h-12 w-12 place-items-center rounded-full text-white"
                    style={{ background: c.tint }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-[clamp(22px,2.2vw,28px)] leading-tight tracking-[-0.025em]">
                    {c.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.55] text-[var(--fg-muted)]">
                    {c.body}
                  </p>
                </RevealOnScroll>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Trust center / contact */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-16)]">
        <Container>
          <div
            className="relative mx-auto flex max-w-[860px] flex-col items-center gap-[var(--space-5)] overflow-hidden bg-[#fafbfc] p-[var(--space-10)] text-center"
            style={{
              borderRadius: "96px 64px 84px 72px / 72px 84px 64px 96px",
            }}
          >
            <span
              aria-hidden
              className="grid h-12 w-12 place-items-center rounded-full text-white"
              style={{ background: "var(--gradient-hero)" }}
            >
              <UserCheck className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <h3 className="font-display text-[clamp(24px,3vw,36px)] leading-tight tracking-[-0.03em] [text-wrap:balance]">
              {isEs
                ? "¿Necesitas SOC 2, DPA o cuestionario de seguridad?"
                : "Need SOC 2, a DPA, or a security questionnaire?"}
            </h3>
            <p className="max-w-2xl text-[15px] text-[var(--fg-muted)]">
              {isEs
                ? "Trust center bajo demanda — te enviamos el último report, contestamos cuestionarios y firmamos DPAs por email."
                : "On-demand trust center — we send the latest report, fill questionnaires, and sign DPAs by email."}
            </p>
            <a
              href="mailto:security@florioin.com"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--gradient-hero)" }}
            >
              <Mail className="h-4 w-4" />
              security@florioin.com
            </a>
          </div>
        </Container>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
