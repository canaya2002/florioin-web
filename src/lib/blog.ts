export type BlogCategory = "announcement" | "guide" | "case-study" | "engineering";

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  publishedAt: string; // ISO yyyy-mm-dd
  authorName: string;
  authorRole: { en: string; es: string };
  readMinutes: number;
  title: { en: string; es: string };
  excerpt: { en: string; es: string };
  /** Sections of the post body. Render plain paragraphs by default; richer
   *  formatting will land when the blog migrates to MDX. */
  body: Array<{
    heading?: { en: string; es: string };
    paragraphs: Array<{ en: string; es: string }>;
  }>;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-we-built-florioin",
    category: "announcement",
    publishedAt: "2026-04-15",
    authorName: "Carlos Anaya Ruiz",
    authorRole: { en: "Founder", es: "Fundador" },
    readMinutes: 5,
    title: {
      en: "Why we built FlorioIn",
      es: "Por qué construimos FlorioIn",
    },
    excerpt: {
      en: "There are dozens of work tools. None of them treat AI as a first-class citizen — they treat it as a tab. So we built one that doesn't.",
      es: "Hay decenas de herramientas de trabajo. Ninguna trata a la IA como ciudadano de primera clase — la tratan como una pestaña. Así que construimos una que sí.",
    },
    body: [
      {
        paragraphs: [
          {
            en: "I've been building software for 12 years and the same pattern keeps showing up: teams pay for 4 to 7 different work tools, none of them know each other, and the AI subscription is a 5th tab people forget to check.",
            es: "Llevo 12 años haciendo software y el mismo patrón se repite: los equipos pagan 4 a 7 herramientas de trabajo, ninguna se conoce, y la subscripción de IA es la 5a pestaña que la gente se olvida de chequear.",
          },
          {
            en: "I wanted a system that started from the AI capability and built work UX around it — not the other way around.",
            es: "Quería un sistema que empezara desde la capacidad de IA y construyera la UX de trabajo a su alrededor — no al revés.",
          },
        ],
      },
      {
        heading: {
          en: "The wedge",
          es: "La cuña",
        },
        paragraphs: [
          {
            en: "FlorioIn replaces 3 to 5 tools (project management, docs, inbox, AI assistant, and sometimes CRM) with one workspace where the AI Co-Pilot has read access to everything you've ever written and write access to anything you approve.",
            es: "FlorioIn reemplaza 3 a 5 herramientas (gestión de proyectos, docs, bandeja, asistente de IA, y a veces CRM) con un solo workspace donde el Co-Piloto tiene acceso de lectura a todo lo que has escrito y acceso de escritura a lo que apruebes.",
          },
          {
            en: "The bet: when AI knows your full context and can act, the difference between 'I asked ChatGPT for help' and 'the work got done' collapses.",
            es: "La apuesta: cuando la IA conoce tu contexto completo y puede actuar, la diferencia entre 'le pedí a ChatGPT que me ayudara' y 'el trabajo se hizo' colapsa.",
          },
        ],
      },
      {
        heading: { en: "Why $3", es: "Por qué $3" },
        paragraphs: [
          {
            en: "Most B2B SaaS prices grow with features. We priced FlorioIn at $3 a seat because that's what it costs us to deliver — plus a margin we can defend without lying to customers about what something costs.",
            es: "La mayoría del SaaS B2B sube precio con features. Pusimos FlorioIn a $3 por seat porque eso es lo que cuesta entregarlo — más un margen que podemos defender sin mentirle a los clientes sobre lo que cuestan las cosas.",
          },
          {
            en: "If you have 50 people, you spend $150/mo on FlorioIn instead of ~$2,000/mo across 4 vendors. The math is the marketing.",
            es: "Si tienes 50 personas, gastas $150/mes en FlorioIn en vez de ~$2,000/mes en 4 vendors. La matemática es el marketing.",
          },
        ],
      },
      {
        heading: { en: "What's next", es: "Qué sigue" },
        paragraphs: [
          {
            en: "Public beta in Q3. Apps for iOS, iPad, Android, macOS, Windows (Microsoft Store), and Linux are already in private beta. The Co-Pilot ships with the foundation models we evaluate the highest each quarter — currently a mix.",
            es: "Beta pública en Q3. Apps para iOS, iPad, Android, macOS, Windows (Microsoft Store) y Linux ya están en beta privada. El Co-Piloto viene con los foundation models que mejor evaluamos cada trimestre — ahora una mezcla.",
          },
        ],
      },
    ],
  },
  {
    slug: "five-ways-ai-changes-daily-workflow",
    category: "guide",
    publishedAt: "2026-04-22",
    authorName: "María Reyes",
    authorRole: { en: "Operations Lead", es: "Líder de Operaciones" },
    readMinutes: 7,
    title: {
      en: "Five ways AI changes a knowledge worker's daily workflow",
      es: "Cinco formas en que la IA cambia el día de un trabajador de conocimiento",
    },
    excerpt: {
      en: "Practical patterns we observe across our beta customers. Not theory — the actual habit changes that show up after week three.",
      es: "Patrones prácticos que observamos en nuestros clientes beta. No teoría — los cambios de hábito reales que aparecen después de la semana tres.",
    },
    body: [
      {
        heading: { en: "1. Voice notes are now the input layer", es: "1. Las notas de voz son la capa de entrada" },
        paragraphs: [
          {
            en: "Instead of opening a doc and typing a summary, beta users dictate a 30-second voice note after every meeting. The Co-Pilot extracts decisions, action items, and follow-ups — into the right tasks, in the right project.",
            es: "En vez de abrir un doc y teclear un resumen, los usuarios beta dictan una nota de voz de 30 segundos después de cada junta. El Co-Piloto extrae decisiones, acciones y follow-ups — a las tareas correctas, en el proyecto correcto.",
          },
        ],
      },
      {
        heading: { en: "2. The first draft is no longer yours", es: "2. El primer borrador ya no es tuyo" },
        paragraphs: [
          {
            en: "Whether it's a proposal, a status update, or an internal RFC — the workflow flips: Co-Pilot drafts from context, you edit. Drafting time drops by 60-80%; editing time increases slightly. Net: 50% time saved.",
            es: "Sea propuesta, status update o RFC interno — el flujo se invierte: el Co-Piloto redacta desde contexto, tú editas. El tiempo de redacción cae 60-80%; el de edición sube un poco. Neto: 50% de tiempo ahorrado.",
          },
        ],
      },
      {
        heading: { en: "3. Inbox triage becomes a 5-minute habit", es: "3. El triage de bandeja se vuelve un hábito de 5 minutos" },
        paragraphs: [
          {
            en: "Categories are pre-applied. Replies are pre-drafted. The human role is approval and edit, not composition. Beta users report the inbox stops being a stressor by week two.",
            es: "Las categorías ya vienen aplicadas. Las respuestas ya vienen redactadas. El rol humano es aprobar y editar, no componer. Los beta reportan que la bandeja deja de ser estresor en la semana dos.",
          },
        ],
      },
      {
        heading: { en: "4. Context lookup replaces 'where is that doc?'", es: "4. La búsqueda contextual reemplaza '¿dónde está ese doc?'" },
        paragraphs: [
          {
            en: "Instead of clicking through folders, you ask: 'remind me what we agreed with ACME about deliverables.' The Co-Pilot answers with citations — you click through if you need details.",
            es: "En vez de navegar carpetas, preguntas: 'recuérdame qué quedamos con ACME sobre deliverables'. El Co-Piloto responde con citas — clickeas si quieres detalles.",
          },
        ],
      },
      {
        heading: { en: "5. The end of the day is shorter", es: "5. El día termina más temprano" },
        paragraphs: [
          {
            en: "Across 28 beta teams, average end-of-day login is 47 minutes earlier after week 4 vs. baseline. Same volume of work, less time at the keyboard.",
            es: "En 28 equipos beta, el cierre promedio de día es 47 minutos más temprano después de la semana 4 vs. línea base. Mismo volumen de trabajo, menos tiempo al teclado.",
          },
        ],
      },
    ],
  },
  {
    slug: "case-study-atlas-legal",
    category: "case-study",
    publishedAt: "2026-05-01",
    authorName: "Carlos Anaya Ruiz",
    authorRole: { en: "Founder", es: "Fundador" },
    readMinutes: 6,
    title: {
      en: "How Atlas Legal cut admin time 38% in their first quarter on FlorioIn",
      es: "Cómo Atlas Legal redujo el tiempo admin 38% en su primer trimestre con FlorioIn",
    },
    excerpt: {
      en: "A 24-attorney firm replaced Clio + PracticePanther + Slack with FlorioIn. The unexpected win: billable capture jumped 14%.",
      es: "Un despacho de 24 abogados reemplazó Clio + PracticePanther + Slack con FlorioIn. La victoria inesperada: la captura facturable subió 14%.",
    },
    body: [
      {
        heading: { en: "The setup", es: "El contexto" },
        paragraphs: [
          {
            en: "Atlas Legal is a 24-attorney firm with offices in Monterrey and Guadalajara. They run litigation, corporate, and tax practice areas. Before FlorioIn, the technology stack was Clio (matters), PracticePanther (billing), Slack (comms), and Google Workspace (docs + email).",
            es: "Atlas Legal es un despacho de 24 abogados con oficinas en Monterrey y Guadalajara. Manejan litigio, corporativo y fiscal. Antes de FlorioIn la stack era Clio (matters), PracticePanther (billing), Slack (comms), y Google Workspace (docs + email).",
          },
        ],
      },
      {
        heading: { en: "The migration", es: "La migración" },
        paragraphs: [
          {
            en: "Two-week phased rollout. Week 1: senior partners. Week 2: associates. The matter import was scripted from Clio's CSV export. Documents linked rather than copied — they kept Drive as source of truth and let FlorioIn's RAG index it.",
            es: "Rollout en dos semanas por etapas. Semana 1: socios senior. Semana 2: asociados. La importación de matters se scripteó desde el CSV de Clio. Los documentos se ligaron en vez de copiarse — quedaron Drive como fuente de verdad y FlorioIn los indexa con RAG.",
          },
        ],
      },
      {
        heading: { en: "The numbers (Q1 results)", es: "Los números (resultados de Q1)" },
        paragraphs: [
          {
            en: "Admin time per attorney: -38%. Billable hour capture: +14% (from 71% to 81% of work-day hours). Software cost: down from $4,800/mo to $1,200/mo. Onboarding for new associates: 3 days instead of 2 weeks.",
            es: "Tiempo admin por abogado: -38%. Captura de horas facturables: +14% (de 71% a 81% de las horas de día laboral). Costo de software: bajó de $4,800/mes a $1,200/mes. Onboarding para asociados nuevos: 3 días en vez de 2 semanas.",
          },
        ],
      },
      {
        heading: { en: "What surprised them", es: "Lo que los sorprendió" },
        paragraphs: [
          {
            en: "Conflict-of-interest detection. Before FlorioIn, the firm did manual conflict checks on new clients. Now Co-Pilot surfaces potential conflicts within seconds of intake — saving roughly two senior-partner hours per new matter.",
            es: "La detección de conflictos de interés. Antes de FlorioIn el despacho hacía checks manuales en clientes nuevos. Ahora el Co-Piloto muestra conflictos potenciales en segundos del intake — ahorrando aproximadamente dos horas de socio senior por matter nuevo.",
          },
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.category === category);
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  "announcement",
  "guide",
  "case-study",
  "engineering",
];

export const BLOG_CATEGORY_LABELS: Record<
  BlogCategory,
  { en: string; es: string }
> = {
  announcement: { en: "Announcements", es: "Anuncios" },
  guide: { en: "Guides", es: "Guías" },
  "case-study": { en: "Case studies", es: "Casos de éxito" },
  engineering: { en: "Engineering", es: "Ingeniería" },
};
