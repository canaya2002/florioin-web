export type CareerJob = {
  slug: string;
  team: { en: string; es: string };
  title: { en: string; es: string };
  location: string;
  type: { en: string; es: string };
  level: { en: string; es: string };
  postedAt: string;
  summary: { en: string; es: string };
  about: { en: string; es: string };
  responsibilities: Array<{ en: string; es: string }>;
  requirements: Array<{ en: string; es: string }>;
  bonus: Array<{ en: string; es: string }>;
};

export const CAREERS: CareerJob[] = [
  {
    slug: "senior-fullstack-engineer",
    team: { en: "Engineering", es: "Ingeniería" },
    title: {
      en: "Senior Full-Stack Engineer",
      es: "Senior Full-Stack Engineer",
    },
    location: "Remote · LATAM",
    type: { en: "Full-time", es: "Tiempo completo" },
    level: { en: "Senior", es: "Senior" },
    postedAt: "2026-04-10",
    summary: {
      en: "Build the platform that lets teams stop juggling 5 tools. You'll own product surfaces end-to-end across React, Node, and Postgres.",
      es: "Construye la plataforma que permite a los equipos dejar de hacer malabares con 5 herramientas. Vas a ser dueño de superficies de producto end-to-end en React, Node y Postgres.",
    },
    about: {
      en: "FlorioIn is a small team building one of the most ambitious B2B platforms in LATAM. We move fast, ship weekly, and value craft. You'll work directly with the founder.",
      es: "FlorioIn es un equipo pequeño construyendo una de las plataformas B2B más ambiciosas en LATAM. Nos movemos rápido, lanzamos semanal y valoramos el oficio. Trabajarás directo con el fundador.",
    },
    responsibilities: [
      {
        en: "Own customer-facing product surfaces from spec to ship",
        es: "Ser dueño de superficies de producto cara al cliente, desde spec hasta lanzamiento",
      },
      {
        en: "Design and implement API endpoints, schemas, and migrations",
        es: "Diseñar e implementar endpoints, schemas y migraciones",
      },
      {
        en: "Improve performance — view paints, query latency, bundle size",
        es: "Mejorar performance — view paints, latencia de queries, bundle size",
      },
      {
        en: "Mentor junior engineers in code reviews and pairing",
        es: "Mentorear ingenieros juniors en code reviews y pairing",
      },
    ],
    requirements: [
      { en: "5+ years building production web applications", es: "5+ años construyendo apps web en producción" },
      { en: "Strong React + TypeScript", es: "Fuerte en React + TypeScript" },
      { en: "Comfortable with Postgres design and query optimization", es: "Cómodo con diseño Postgres y optimización de queries" },
      { en: "Bilingual (English + Spanish, written and spoken)", es: "Bilingüe (Inglés + Español, escrito y hablado)" },
    ],
    bonus: [
      { en: "Background in productivity tools (Notion, Linear, Asana)", es: "Background en herramientas de productividad (Notion, Linear, Asana)" },
      { en: "Familiarity with realtime sync (CRDTs, OT, etc.)", es: "Familiaridad con sync en tiempo real (CRDTs, OT, etc.)" },
      { en: "Open-source contributions we can read", es: "Contribuciones open-source que podamos leer" },
    ],
  },
  {
    slug: "product-designer",
    team: { en: "Design", es: "Diseño" },
    title: { en: "Product Designer", es: "Product Designer" },
    location: "Remote · LATAM",
    type: { en: "Full-time", es: "Tiempo completo" },
    level: { en: "Mid–Senior", es: "Mid–Senior" },
    postedAt: "2026-04-05",
    summary: {
      en: "Shape how millions of users will interact with their AI co-worker. Heavy ownership across product surfaces, brand expression, and motion.",
      es: "Define cómo millones de usuarios van a interactuar con su co-trabajador IA. Mucho ownership en superficies de producto, expresión de marca y motion.",
    },
    about: {
      en: "Design at FlorioIn is taken seriously. The founder is design-literate, the eng team is design-friendly, and the standards are calibrated to Linear and Apple — not to feature-parity comparisons.",
      es: "El diseño en FlorioIn se toma en serio. El fundador es design-literate, el equipo de eng es design-friendly y los estándares se calibran a Linear y Apple — no a comparaciones feature-parity.",
    },
    responsibilities: [
      { en: "Own end-to-end product surfaces from research to ship", es: "Ser dueña de superficies de producto end-to-end desde research hasta ship" },
      { en: "Maintain and evolve the design system in Figma + code", es: "Mantener y evolucionar el design system en Figma + código" },
      { en: "Lead motion design language across the product", es: "Liderar el lenguaje de motion design en todo el producto" },
      { en: "Ship marketing pages with the engineering team", es: "Lanzar páginas de marketing junto al equipo de eng" },
    ],
    requirements: [
      { en: "4+ years designing for B2B SaaS at high quality", es: "4+ años diseñando B2B SaaS de alta calidad" },
      { en: "Strong portfolio with shipped product, not just concepts", es: "Portfolio fuerte con producto lanzado, no solo conceptos" },
      { en: "Fluent in Figma, comfortable shipping in code (CSS, light React)", es: "Fluida en Figma, cómoda lanzando en código (CSS, React básico)" },
    ],
    bonus: [
      { en: "Motion design background", es: "Background en motion design" },
      { en: "Brand and identity work", es: "Trabajo de marca e identidad" },
    ],
  },
  {
    slug: "customer-success-lead",
    team: { en: "Customer", es: "Cliente" },
    title: { en: "Customer Success Lead", es: "Líder de Customer Success" },
    location: "Mexico City · Hybrid",
    type: { en: "Full-time", es: "Tiempo completo" },
    level: { en: "Senior", es: "Senior" },
    postedAt: "2026-03-28",
    summary: {
      en: "Be the first dedicated CS hire. Own the first 200 customers — onboarding, expansion, retention. Set the playbook the team will scale.",
      es: "Sé el primer hire dedicado de CS. Dueño de los primeros 200 clientes — onboarding, expansión, retención. Define el playbook que el equipo escalará.",
    },
    about: {
      en: "We have product-market fit and need someone who can turn beta-quality customer joy into a system. You'll work alongside the founder and have a direct line into product.",
      es: "Tenemos product-market fit y necesitamos a alguien que vuelva la alegría beta-quality del cliente en un sistema. Trabajarás junto al fundador con línea directa al producto.",
    },
    responsibilities: [
      { en: "Own the onboarding playbook for new customers", es: "Dueño del playbook de onboarding para clientes nuevos" },
      { en: "Run quarterly business reviews with key accounts", es: "Correr business reviews trimestrales con cuentas clave" },
      { en: "Build the renewal and expansion motion", es: "Construir la motion de renewal y expansión" },
      { en: "Surface product feedback to the team weekly", es: "Llevar feedback de producto al equipo semanalmente" },
    ],
    requirements: [
      { en: "5+ years in B2B SaaS Customer Success or Account Management", es: "5+ años en B2B SaaS Customer Success o Account Management" },
      { en: "Track record of expanding $50K–$500K ARR accounts", es: "Track record expandiendo cuentas de $50K–$500K ARR" },
      { en: "Bilingual (Spanish + English)", es: "Bilingüe (Español + Inglés)" },
    ],
    bonus: [
      { en: "Experience launching CS at a small company", es: "Experiencia lanzando CS en empresa pequeña" },
      { en: "Comfortable with light data work (SQL, dashboards)", es: "Cómoda con data ligera (SQL, dashboards)" },
    ],
  },
];

export function getCareer(slug: string): CareerJob | undefined {
  return CAREERS.find((c) => c.slug === slug);
}
