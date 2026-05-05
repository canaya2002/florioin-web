export type ResourceType = "ebook" | "template" | "guide" | "webinar";

export type Resource = {
  slug: string;
  type: ResourceType;
  title: { en: string; es: string };
  description: { en: string; es: string };
  longDescription: { en: string; es: string };
  pageCount?: number;
  duration?: string;
  publishedAt: string;
  body: Array<{
    heading: { en: string; es: string };
    paragraphs: Array<{ en: string; es: string }>;
  }>;
};

export const RESOURCES: Resource[] = [
  {
    slug: "ai-productivity-playbook",
    type: "ebook",
    title: {
      en: "The AI Productivity Playbook",
      es: "El Playbook de Productividad con IA",
    },
    description: {
      en: "How modern teams use AI to ship 2-4× more work without burning out",
      es: "Cómo los equipos modernos usan IA para entregar 2-4× más trabajo sin quemarse",
    },
    longDescription: {
      en: "A 60-page guide based on observations from 200+ beta teams. Covers practical workflow patterns, the order in which AI tools change daily habits, and the leadership shifts required to make it stick.",
      es: "Guía de 60 páginas basada en observaciones de 200+ equipos beta. Cubre patrones prácticos de workflow, el orden en que las herramientas de IA cambian hábitos diarios, y los cambios de liderazgo requeridos para que se quede.",
    },
    pageCount: 60,
    publishedAt: "2026-04-20",
    body: [
      {
        heading: { en: "What's inside", es: "Qué hay adentro" },
        paragraphs: [
          {
            en: "Workflow patterns we observe across 200+ teams. Day-by-day onboarding rhythm. Manager talk-tracks for the rollout. The 90-day measurement framework.",
            es: "Patrones de workflow que vemos en 200+ equipos. Ritmo de onboarding día por día. Guiones para managers en el rollout. El framework de medición de 90 días.",
          },
        ],
      },
      {
        heading: { en: "Who it's for", es: "Para quién es" },
        paragraphs: [
          {
            en: "Operations leaders, COOs, and team managers in 20-200 person companies looking to introduce AI workflows beyond 'we have a ChatGPT subscription'.",
            es: "Líderes de operaciones, COOs y managers en empresas de 20-200 personas que quieren introducir workflows de IA más allá de 'tenemos suscripción a ChatGPT'.",
          },
        ],
      },
    ],
  },
  {
    slug: "legal-firm-workspace-template",
    type: "template",
    title: {
      en: "Workspace template: Legal practice",
      es: "Plantilla de workspace: Despacho legal",
    },
    description: {
      en: "Pre-configured matters, billing codes, and conflict-check workflows for law firms.",
      es: "Matters, códigos de facturación y workflows de conflict-check preconfigurados para despachos legales.",
    },
    longDescription: {
      en: "A complete starter template for FlorioIn workspaces in legal practice. Includes matter taxonomy, billing code library, conflict check automation, document templates, and a sample retainer pipeline.",
      es: "Plantilla completa para workspaces de FlorioIn en despachos legales. Incluye taxonomía de matters, librería de códigos de facturación, automatización de conflict checks, plantillas de documentos y un pipeline de retainer ejemplo.",
    },
    publishedAt: "2026-04-05",
    body: [
      {
        heading: { en: "What you get", es: "Qué obtienes" },
        paragraphs: [
          {
            en: "Matter taxonomy aligned with major LATAM legal practice areas. Billing code library with default rates by associate level. Conflict check automation with industry watchlists. 12 ready-to-use document templates.",
            es: "Taxonomía de matters alineada con áreas mayores de práctica legal LATAM. Librería de códigos de facturación con tarifas por nivel de asociado. Automatización de conflict-check con watchlists. 12 plantillas de documento listas.",
          },
        ],
      },
    ],
  },
];

export function getResource(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

export const RESOURCE_TYPE_LABELS: Record<
  ResourceType,
  { en: string; es: string }
> = {
  ebook: { en: "eBook", es: "eBook" },
  template: { en: "Template", es: "Plantilla" },
  guide: { en: "Guide", es: "Guía" },
  webinar: { en: "Webinar", es: "Webinar" },
};
