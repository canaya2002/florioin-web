import { notFound } from "next/navigation";

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
    path: "/product/integrations",
    title: isEs ? "Integraciones" : "Integrations",
    description: isEs
      ? "200+ integraciones nativas con Google Workspace, Microsoft 365, Slack, GitHub, Salesforce, Stripe."
      : "200+ native integrations with Google Workspace, Microsoft 365, Slack, GitHub, Salesforce, Stripe.",
  });
}

const CATEGORIES: Array<{
  name: { en: string; es: string };
  apps: string[];
}> = [
  {
    name: { en: "Productivity", es: "Productividad" },
    apps: ["Google Workspace", "Microsoft 365", "Notion", "Airtable", "Linear", "Asana", "Trello", "Monday"],
  },
  {
    name: { en: "Communication", es: "Comunicación" },
    apps: ["Slack", "Microsoft Teams", "Discord", "Zoom", "Google Meet", "Loom", "WhatsApp Business"],
  },
  {
    name: { en: "Sales & CRM", es: "Ventas y CRM" },
    apps: ["Salesforce", "HubSpot", "Pipedrive", "Close", "Copper", "Zoho CRM"],
  },
  {
    name: { en: "Engineering", es: "Ingeniería" },
    apps: ["GitHub", "GitLab", "Bitbucket", "Sentry", "Datadog", "Vercel", "Netlify"],
  },
  {
    name: { en: "Finance & Billing", es: "Finanzas y facturación" },
    apps: ["Stripe", "QuickBooks", "Xero", "Brex", "Mercury", "Wise"],
  },
  {
    name: { en: "Storage & Files", es: "Archivos y almacenamiento" },
    apps: ["Google Drive", "Dropbox", "OneDrive", "Box", "Figma", "Adobe Creative Cloud"],
  },
  {
    name: { en: "Marketing", es: "Marketing" },
    apps: ["Mailchimp", "ConvertKit", "Resend", "Customer.io", "Intercom", "Zendesk"],
  },
  {
    name: { en: "HR & People", es: "RRHH y personas" },
    apps: ["BambooHR", "Rippling", "Gusto", "Lever", "Greenhouse"],
  },
];

export default async function IntegrationsPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Integraciones" : "Integrations"}
        title={isEs ? "Conecta lo que ya usas" : "Connect what you already use"}
        description={
          isEs
            ? "200+ integraciones nativas. OAuth en un click. Webhooks bidireccionales. Y el Co-Piloto lee y actúa en cada una."
            : "200+ native integrations. One-click OAuth. Bidirectional webhooks. And Co-Pilot reads and acts across all of them."
        }
        primaryCta={{ href: `${lp}/request-access`, label: dict.common.ctaPrimary }}
        align="center"
      />

      <section className="container-wide section">
        <div className="flex flex-col gap-12">
          {CATEGORIES.map((category) => (
            <div key={category.name.en} className="flex flex-col gap-4">
              <h2 className="font-display text-[var(--fs-h4)] tracking-tight">
                {isEs ? category.name.es : category.name.en}
              </h2>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {category.apps.map((app) => (
                  <li
                    key={app}
                    className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm transition-colors hover:border-[var(--primary)]/40"
                  >
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-display font-bold"
                      style={{
                        background: "var(--gradient-card)",
                        color: "var(--primary)",
                      }}
                    >
                      {app.charAt(0)}
                    </span>
                    <span className="font-medium">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container-default section">
        <div
          className="rounded-[var(--radius-2xl)] border border-[var(--border)] p-10 text-center md:p-16"
          style={{ background: "var(--gradient-card)" }}
        >
          <h3 className="font-display text-[var(--fs-h3)] leading-tight tracking-tight">
            {isEs
              ? "¿No ves la herramienta que usas?"
              : "Don't see the tool you use?"}
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-[var(--fg-muted)]">
            {isEs
              ? "Tenemos un SDK de webhooks y una API pública. Si tu app expone una API REST, podemos conectarla en horas, no semanas."
              : "We have a webhooks SDK and a public API. If your app exposes a REST API, we can connect it in hours, not weeks."}
          </p>
        </div>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
