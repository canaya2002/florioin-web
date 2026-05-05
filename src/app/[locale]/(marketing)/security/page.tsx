import {
  Database,
  FileLock2,
  Key,
  Lock,
  Server,
  ShieldCheck,
} from "lucide-react";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs ? "Seguridad" : "Security",
    description: isEs
      ? "Cómo protegemos tus datos: arquitectura multi-tenant, encriptación, audit logs, SSO."
      : "How we protect your data: multi-tenant architecture, encryption, audit logs, SSO.",
  };
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
          title: "Multi-tenant con RLS",
          body: "Cada empresa tiene aislamiento a nivel de fila en Postgres. Ningún query cruza el perímetro de tenant — verificado por tests.",
        },
        {
          icon: Lock,
          title: "Encriptación in-transit y at-rest",
          body: "TLS 1.3 para tráfico, AES-256-GCM para datos en disco. Llaves rotadas trimestralmente.",
        },
        {
          icon: Key,
          title: "SSO + SCIM",
          body: "Google, Microsoft 365, Okta, Azure AD. Provisioning automático de usuarios para planes empresariales.",
        },
        {
          icon: FileLock2,
          title: "Audit logs",
          body: "Cada acción que toca datos del cliente queda registrada. Exportable en CSV o vía webhook a tu SIEM.",
        },
        {
          icon: Server,
          title: "Residencia de datos",
          body: "US-East por default. EU-West para clientes que lo requieran. Sin transferencias cross-region sin tu permiso.",
        },
        {
          icon: ShieldCheck,
          title: "Compliance roadmap",
          body: "SOC 2 Type II en proceso (auditoría inicial Q3 2026). HIPAA-ready para clientes healthcare. ISO 27001 evaluación en curso.",
        },
      ]
    : [
        {
          icon: Database,
          title: "Multi-tenant with RLS",
          body: "Every company has row-level isolation in Postgres. No query crosses the tenant perimeter — verified by tests.",
        },
        {
          icon: Lock,
          title: "Encryption in transit and at rest",
          body: "TLS 1.3 for traffic, AES-256-GCM for data on disk. Keys rotated quarterly.",
        },
        {
          icon: Key,
          title: "SSO + SCIM",
          body: "Google, Microsoft 365, Okta, Azure AD. Automatic user provisioning on enterprise plans.",
        },
        {
          icon: FileLock2,
          title: "Audit logs",
          body: "Every action that touches customer data is logged. Exportable to CSV or via webhook to your SIEM.",
        },
        {
          icon: Server,
          title: "Data residency",
          body: "US-East by default. EU-West for clients who require it. No cross-region transfers without your consent.",
        },
        {
          icon: ShieldCheck,
          title: "Compliance roadmap",
          body: "SOC 2 Type II in progress (initial audit Q3 2026). HIPAA-ready for healthcare. ISO 27001 evaluation underway.",
        },
      ];

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Seguridad" : "Security"}
        title={
          isEs
            ? "Construido para empresas que se toman los datos en serio"
            : "Built for companies that take data seriously"
        }
        description={
          isEs
            ? "FlorioIn corre en una arquitectura multi-tenant aislada por fila, con encriptación en tránsito y reposo, audit logs por defecto y un roadmap de compliance público."
            : "FlorioIn runs on a multi-tenant architecture isolated row-by-row, with encryption in transit and at rest, audit logs by default, and a public compliance roadmap."
        }
      />

      <section className="container-wide section">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <li
                key={pillar.title}
                className="flex flex-col gap-3 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-7"
              >
                <span
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)]"
                  style={{ background: "var(--gradient-card)" }}
                >
                  <Icon className="h-6 w-6 text-[var(--primary)]" />
                </span>
                <h3 className="font-display text-[var(--fs-h4)] tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-[15px] text-[var(--fg-muted)]">
                  {pillar.body}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* AI privacy */}
      <section className="container-default section">
        <div
          className="rounded-[var(--radius-2xl)] border border-[var(--border)] p-10 md:p-14"
          style={{ background: "var(--gradient-card)" }}
        >
          <span className="eyebrow">{isEs ? "Privacidad de IA" : "AI privacy"}</span>
          <h2 className="mt-3 font-display text-[var(--fs-h2)] leading-tight tracking-tight">
            {isEs
              ? "Tu data no entrena modelos públicos."
              : "Your data doesn't train public models."}
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
            {isEs
              ? "Usamos foundation models a través de contratos enterprise (OpenAI, Anthropic, Google) con garantías contractuales: tu data no se usa para entrenar modelos públicos. Todos los prompts y respuestas viven en tu tenant, audit-logged, y son borrables on-demand."
              : "We use foundation models through enterprise contracts (OpenAI, Anthropic, Google) with contractual guarantees: your data is not used to train public models. All prompts and responses live in your tenant, audit-logged, and deletable on demand."}
          </p>
          <ul className="mt-6 grid gap-3 text-[15px] text-[var(--fg-secondary)] md:grid-cols-2">
            {(isEs
              ? [
                  "Sin entrenamiento con tu data — garantizado contractualmente",
                  "Prompts y respuestas viven en tu tenant",
                  "Borrable on-demand vía API o desde el dashboard",
                  "Opción de auto-redacción de PII antes del LLM",
                ]
              : [
                  "No training on your data — contractually guaranteed",
                  "Prompts and responses live in your tenant",
                  "Deletable on demand via API or from the dashboard",
                  "Optional auto-redaction of PII before LLM call",
                ]
            ).map((line) => (
              <li
                key={line}
                className="flex items-start gap-2 before:mt-2 before:inline-block before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-[var(--primary)]"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Trust center / contact */}
      <section className="container-default pb-24">
        <div className="rounded-[var(--radius-xl)] border border-dashed border-[var(--border-strong)] bg-[var(--bg-subtle)] p-8 text-center">
          <p className="text-[15px] text-[var(--fg-secondary)]">
            {isEs
              ? "¿Necesitas SOC 2 reports, DPA, o un cuestionario de seguridad? Escríbenos a "
              : "Need SOC 2 reports, a DPA, or a security questionnaire? Email "}
            <a
              href="mailto:carlos@florioin.com"
              className="font-medium text-[var(--primary)] underline-offset-4 hover:underline"
            >
              carlos@florioin.com
            </a>
            .
          </p>
        </div>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
