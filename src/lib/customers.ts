import type { Industry } from "@/lib/constants";

export type CustomerStory = {
  slug: string;
  company: string;
  industry: Industry;
  size: string;
  region: string;
  publishedAt: string;
  metric: { en: string; es: string };
  metricLabel: { en: string; es: string };
  excerpt: { en: string; es: string };
  quote: {
    text: { en: string; es: string };
    author: string;
    role: { en: string; es: string };
  };
  body: Array<{
    heading: { en: string; es: string };
    paragraphs: Array<{ en: string; es: string }>;
  }>;
};

export const CUSTOMERS: CustomerStory[] = [
  {
    slug: "atlas-legal",
    company: "Atlas Legal",
    industry: "legal",
    size: "24 attorneys",
    region: "Mexico (MTY + GDL)",
    publishedAt: "2026-04-29",
    metric: { en: "−38%", es: "−38%" },
    metricLabel: { en: "admin time per attorney", es: "tiempo admin por abogado" },
    excerpt: {
      en: "Atlas Legal replaced Clio + PracticePanther + Slack with FlorioIn. Q1 numbers: −38% admin time, +14% billable capture, $43k saved.",
      es: "Atlas Legal reemplazó Clio + PracticePanther + Slack con FlorioIn. Números de Q1: −38% tiempo admin, +14% captura facturable, $43k ahorrados.",
    },
    quote: {
      text: {
        en: "We dropped three tools and gained a Co-Pilot that catches conflicts of interest within seconds of intake.",
        es: "Bajamos tres herramientas y ganamos un Co-Piloto que atrapa conflictos de interés en segundos del intake.",
      },
      author: "María Reyes",
      role: { en: "Managing Partner", es: "Socia Administradora" },
    },
    body: [
      {
        heading: { en: "Before FlorioIn", es: "Antes de FlorioIn" },
        paragraphs: [
          {
            en: "Atlas was running on Clio (matters), PracticePanther (billing), Slack (comms), and Drive (docs). Total cost: ~$4,800/month. Conflict checks were manual. Onboarding new associates took two weeks.",
            es: "Atlas corría en Clio (matters), PracticePanther (billing), Slack (comms) y Drive (docs). Costo total: ~$4,800/mes. Los conflict checks eran manuales. Onboardear asociados nuevos tomaba dos semanas.",
          },
        ],
      },
      {
        heading: { en: "The migration", es: "La migración" },
        paragraphs: [
          {
            en: "Two-week phased rollout. Senior partners first, then associates. Matters imported via CSV. Drive remained the source of truth, with FlorioIn's RAG indexing it.",
            es: "Rollout por etapas de dos semanas. Socios senior primero, luego asociados. Matters importados vía CSV. Drive quedó como fuente de verdad y RAG de FlorioIn lo indexa.",
          },
        ],
      },
      {
        heading: { en: "Q1 results", es: "Resultados de Q1" },
        paragraphs: [
          {
            en: "Admin time per attorney down 38%. Billable hour capture up 14% (71% → 81%). Software cost down from $4,800 to $1,200/month. Onboarding 3 days instead of 2 weeks.",
            es: "Tiempo admin por abogado −38%. Captura de horas facturables +14% (71% → 81%). Costo de software bajó de $4,800 a $1,200/mes. Onboarding 3 días en vez de 2 semanas.",
          },
        ],
      },
    ],
  },
  {
    slug: "mercado-norte",
    company: "Mercado Norte",
    industry: "retail",
    size: "12 stores · 240 staff",
    region: "Mexico (Northern region)",
    publishedAt: "2026-04-12",
    metric: { en: "+9 NPS", es: "+9 NPS" },
    metricLabel: { en: "across all stores in 90 days", es: "en todas las tiendas en 90 días" },
    excerpt: {
      en: "A 12-store retailer standardized operations across all locations using FlorioIn. NPS climbed 9 points. Customer issue resolution 3× faster.",
      es: "Un retailer de 12 tiendas estandarizó operaciones en todas las ubicaciones con FlorioIn. NPS subió 9 puntos. Resolución de issues de clientes 3× más rápida.",
    },
    quote: {
      text: {
        en: "We finally treat all 12 stores the same way. The Co-Pilot catches issues in real time instead of at month-end.",
        es: "Por fin tratamos las 12 tiendas igual. El Co-Piloto atrapa issues en tiempo real en vez de a fin de mes.",
      },
      author: "Mariana Cruz",
      role: { en: "VP Retail", es: "VP Retail" },
    },
    body: [
      {
        heading: { en: "The challenge", es: "El reto" },
        paragraphs: [
          {
            en: "Each store ran ops differently. Customer issues bounced between stores and HQ for days. Stock decisions were made on instinct because data was stale.",
            es: "Cada tienda corría ops a su manera. Issues de cliente rebotaban entre tiendas y HQ por días. Decisiones de stock por instinto porque la data estaba stale.",
          },
        ],
      },
      {
        heading: { en: "The solution", es: "La solución" },
        paragraphs: [
          {
            en: "Standard playbooks per role. Customer issue routing with SLA timers. Real-time stock view tied to POS. The Co-Pilot triages every customer message before it hits the team.",
            es: "Playbooks estándar por rol. Routing de issues con SLA timers. Vista de stock en tiempo real ligada a POS. El Co-Piloto hace triage de cada mensaje de cliente antes de llegar al equipo.",
          },
        ],
      },
      {
        heading: { en: "What changed", es: "Lo que cambió" },
        paragraphs: [
          {
            en: "Customer NPS up 9 points. Issue resolution time 3× faster. Store managers report less time tracking and more time managing.",
            es: "NPS de cliente +9 puntos. Tiempo de resolución 3× más rápido. Los gerentes de tienda reportan menos tiempo trackeando y más tiempo gestionando.",
          },
        ],
      },
    ],
  },
  {
    slug: "ola-studios",
    company: "Ola Studios",
    industry: "tech",
    size: "18-person product team",
    region: "Mexico (CDMX) + Argentina",
    publishedAt: "2026-03-30",
    metric: { en: "$48k/yr", es: "$48k/año" },
    metricLabel: {
      en: "in tooling savings",
      es: "en ahorro de herramientas",
    },
    excerpt: {
      en: "Ola Studios dropped Linear, Notion, and ChatGPT Team for FlorioIn. The team was happier in week one. Tooling spend dropped $48k/year.",
      es: "Ola Studios bajó Linear, Notion y ChatGPT Team por FlorioIn. El equipo estaba más feliz en la semana uno. Gasto en herramientas bajó $48k/año.",
    },
    quote: {
      text: {
        en: "Specs, tickets, PRs, and feedback in one place. Co-Pilot lives in the cursor — not in another tab. We can't go back.",
        es: "Specs, tickets, PRs y feedback en un solo lugar. El Co-Piloto vive en el cursor — no en otra pestaña. No podemos volver atrás.",
      },
      author: "Tomás Vargas",
      role: { en: "CTO", es: "CTO" },
    },
    body: [
      {
        heading: { en: "The pain", es: "El dolor" },
        paragraphs: [
          {
            en: "Linear for tickets, Notion for specs, Slack for comms, ChatGPT Team for AI. Total ~$50/seat. Specs lived in one place but got implemented from tickets without context. Customer feedback never made it to the roadmap.",
            es: "Linear para tickets, Notion para specs, Slack para comms, ChatGPT Team para IA. Total ~$50/seat. Las specs vivían en un lado pero se implementaban desde tickets sin contexto. El feedback de clientes nunca llegaba al roadmap.",
          },
        ],
      },
      {
        heading: { en: "The migration", es: "La migración" },
        paragraphs: [
          {
            en: "One-week migration. Linear tickets imported via CSV. Notion docs imported via Markdown export. The Co-Pilot read the migration and surfaced any orphaned references on day one.",
            es: "Migración de una semana. Tickets de Linear importados vía CSV. Docs de Notion vía export Markdown. El Co-Piloto leyó la migración y mostró cualquier referencia huérfana el día uno.",
          },
        ],
      },
      {
        heading: { en: "Outcomes", es: "Resultados" },
        paragraphs: [
          {
            en: "$48k/yr in tooling savings. Team NPS at 84 (from 62). Engineer happiness scores: 'best change in two years.'",
            es: "$48k/año en ahorro de tooling. NPS de equipo en 84 (desde 62). Scores de felicidad de ingenieros: 'mejor cambio en dos años'.",
          },
        ],
      },
    ],
  },
];

export function getCustomerStory(slug: string): CustomerStory | undefined {
  return CUSTOMERS.find((c) => c.slug === slug);
}
