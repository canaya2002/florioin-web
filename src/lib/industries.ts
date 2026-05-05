import type { Industry } from "@/lib/constants";

export type IndustryContent = {
  /** Slug must match constants.ts INDUSTRIES. */
  slug: Industry;
  iconName: string;
  label: { en: string; es: string };
  /** Short tag shown in the index grid. */
  tag: { en: string; es: string };
  /** Hero h1 on the dedicated page. */
  headline: { en: string; es: string };
  /** Hero sub. */
  description: { en: string; es: string };
  /** Three pain points specific to this industry. */
  painPoints: Array<{ en: string; es: string }>;
  /** How FlorioIn solves them. */
  solutions: Array<{ en: string; es: string }>;
  /** Sample testimonial-style quote. */
  quote: {
    text: { en: string; es: string };
    author: string;
    role: { en: string; es: string };
    company: string;
  };
  /** Pre-configured workspace template name. */
  template: { en: string; es: string };
};

export const INDUSTRY_CONTENT: Record<Industry, IndustryContent> = {
  legal: {
    slug: "legal",
    iconName: "Landmark",
    label: { en: "Legal practices", es: "Despachos legales" },
    tag: {
      en: "Matter management without the bloat",
      es: "Gestión de casos sin el peso de Clio",
    },
    headline: {
      en: "Run your law firm without the matter-management bloat",
      es: "Lleva tu despacho sin la pesadez de matter management",
    },
    description: {
      en: "FlorioIn replaces three tools — Clio plus a doc system plus an inbox — at a fraction of the price. With AI that knows your matters.",
      es: "FlorioIn reemplaza tres herramientas — Clio más un sistema de docs más una bandeja — a una fracción del precio. Con IA que entiende tus casos.",
    },
    painPoints: [
      {
        en: "Tracking billable hours across email, calls, and edits is a manual nightmare",
        es: "Capturar horas facturables entre emails, llamadas y ediciones es manual y agotador",
      },
      {
        en: "Document review is duplicated across associates because nobody sees the full picture",
        es: "La revisión de documentos se duplica entre asociados porque nadie ve el panorama completo",
      },
      {
        en: "Matter status is buried in long email threads instead of a real system",
        es: "El status de cada caso vive en threads largos de email en vez de un sistema real",
      },
    ],
    solutions: [
      {
        en: "Auto-tracked time entries from every billable interaction (with one-click review)",
        es: "Time entries auto-trackeados desde cada interacción facturable (con revisión a un click)",
      },
      {
        en: "AI summary of every matter at the top of every doc — always current",
        es: "Resumen de IA de cada caso al inicio de cada doc — siempre actualizado",
      },
      {
        en: "Conflict-of-interest detection before you accept a new client",
        es: "Detección de conflictos de interés antes de aceptar un cliente nuevo",
      },
    ],
    quote: {
      text: {
        en: "We dropped Clio and PracticePanther. FlorioIn covers matter management, docs, and inbox — and bills time correctly without anyone clicking a stopwatch.",
        es: "Bajamos Clio y PracticePanther. FlorioIn cubre matter management, docs y bandeja — y factura tiempo correcto sin que nadie cliquee un cronómetro.",
      },
      author: "María Reyes",
      role: { en: "Managing partner", es: "Socia administradora" },
      company: "Atlas Legal",
    },
    template: {
      en: "Workspace pre-configured for matters, billing codes, and conflict checks",
      es: "Workspace preconfigurado con casos, códigos de facturación y conflict checks",
    },
  },
  marketing: {
    slug: "marketing",
    iconName: "Megaphone",
    label: { en: "Marketing teams", es: "Equipos de marketing" },
    tag: {
      en: "Plan, ship, measure in one place",
      es: "Planea, lanza y mide en un solo lugar",
    },
    headline: {
      en: "Stop juggling Asana, Notion, Slack, and Mixpanel",
      es: "Deja de hacer malabares con Asana, Notion, Slack y Mixpanel",
    },
    description: {
      en: "FlorioIn unifies the campaign brief, the asset library, the production tasks, and the launch checklist. Co-Pilot drafts, reviews, and ships with you.",
      es: "FlorioIn une el brief de la campaña, la librería de assets, las tareas de producción y el launch checklist. El Co-Piloto redacta, revisa y lanza contigo.",
    },
    painPoints: [
      {
        en: "Briefs in one tool, tasks in another, assets in a third — and feedback in Slack DMs",
        es: "Briefs en una herramienta, tareas en otra, assets en una tercera — y feedback en DMs de Slack",
      },
      {
        en: "Repurposing campaigns by hand for each channel kills throughput",
        es: "Repurposear campañas a mano por cada canal mata la velocidad",
      },
      {
        en: "QA happens minutes before launch instead of being built into the workflow",
        es: "El QA ocurre minutos antes del lanzamiento en vez de estar integrado al workflow",
      },
    ],
    solutions: [
      {
        en: "Brief, asset library, and tasks in one workspace with shared context",
        es: "Brief, biblioteca de assets y tareas en un workspace con contexto compartido",
      },
      {
        en: "Co-Pilot generates copy variants per channel from your master brief",
        es: "El Co-Piloto genera variantes de copy por canal desde tu brief master",
      },
      {
        en: "Launch checklist built into every campaign template — nothing slips",
        es: "Launch checklist integrado en cada plantilla — nada se cuela",
      },
    ],
    quote: {
      text: {
        en: "Six campaigns in Q4 with the same headcount we used for two in Q3. Co-Pilot does the channel-variant work nobody enjoyed.",
        es: "Seis campañas en Q4 con la misma plantilla de Q3 que hizo dos. El Co-Piloto hace el trabajo de variantes que nadie disfrutaba.",
      },
      author: "Laura Hernández",
      role: { en: "Head of Marketing", es: "Líder de Marketing" },
      company: "Pixel Studio",
    },
    template: {
      en: "Campaign tracker · asset library · launch checklist",
      es: "Tracker de campañas · biblioteca de assets · launch checklist",
    },
  },
  consulting: {
    slug: "consulting",
    iconName: "Briefcase",
    label: { en: "Consulting firms", es: "Consultoras" },
    tag: {
      en: "From engagement to deliverable, faster",
      es: "De engagement a deliverable, más rápido",
    },
    headline: {
      en: "Spend more time consulting and less time formatting decks",
      es: "Pasa más tiempo consultando y menos formateando decks",
    },
    description: {
      en: "Engagements, deliverables, billing, and knowledge management in one place. Co-Pilot turns interview notes into structured findings and findings into client-ready docs.",
      es: "Engagements, deliverables, facturación y knowledge management en un solo lugar. El Co-Piloto convierte notas de entrevista en hallazgos estructurados y hallazgos en docs listos para cliente.",
    },
    painPoints: [
      {
        en: "Every engagement reinvents the same internal templates from scratch",
        es: "Cada engagement reinventa las mismas plantillas internas desde cero",
      },
      {
        en: "Knowledge from past projects is locked in PDFs nobody searches",
        es: "El conocimiento de proyectos pasados vive en PDFs que nadie busca",
      },
      {
        en: "Senior consultants spend hours formatting instead of analyzing",
        es: "Los consultores senior pasan horas formateando en vez de analizando",
      },
    ],
    solutions: [
      {
        en: "Reusable engagement templates per practice area",
        es: "Templates reusables de engagement por área de práctica",
      },
      {
        en: "RAG over every past deliverable — citations included",
        es: "RAG sobre cada deliverable pasado — con citas incluidas",
      },
      {
        en: "Co-Pilot generates first-draft slides from your structured findings",
        es: "El Co-Piloto genera primer-draft de slides desde tus findings estructurados",
      },
    ],
    quote: {
      text: {
        en: "Our partners stopped doing format work. Engagements ship 30% faster.",
        es: "Nuestros partners dejaron de hacer trabajo de formato. Los engagements salen 30% más rápido.",
      },
      author: "Diego Ortiz",
      role: { en: "Partner", es: "Socio" },
      company: "Norte Consulting",
    },
    template: {
      en: "Engagement tracker · findings library · deliverable templates",
      es: "Tracker de engagements · biblioteca de findings · plantillas de deliverable",
    },
  },
  "real-estate": {
    slug: "real-estate",
    iconName: "Building2",
    label: { en: "Real estate", es: "Inmobiliarias" },
    tag: {
      en: "Listings, leads, and closings in sync",
      es: "Listings, leads y cierres en sincronía",
    },
    headline: {
      en: "From first call to closing, one workflow",
      es: "Desde la primera llamada al cierre, un solo workflow",
    },
    description: {
      en: "Your CRM, your transaction docs, and your team's tasks finally talking to each other. Co-Pilot drafts proposals, contracts, and listing descriptions.",
      es: "Tu CRM, tus docs de transacción y las tareas del equipo por fin se hablan. El Co-Piloto redacta propuestas, contratos y descripciones de listings.",
    },
    painPoints: [
      {
        en: "Lead pipeline lives in HubSpot, transaction docs in DocuSign, tasks in… email",
        es: "El pipeline de leads vive en HubSpot, los docs en DocuSign, las tareas en… email",
      },
      {
        en: "Listings descriptions take 30 minutes each to write well",
        es: "Las descripciones de listings tardan 30 minutos cada una para que queden bien",
      },
      {
        en: "Cross-team handoffs (sales → escrow → closing) drop balls regularly",
        es: "Los handoffs entre equipos (ventas → escrow → cierre) tiran pelotas seguido",
      },
    ],
    solutions: [
      {
        en: "Unified pipeline view with stage-aware automations",
        es: "Pipeline unificado con automatizaciones por etapa",
      },
      {
        en: "Listing descriptions auto-drafted from MLS data and your tone of voice",
        es: "Descripciones auto-redactadas desde datos de MLS con tu tono",
      },
      {
        en: "Closing checklist that won't let a step go forgotten",
        es: "Closing checklist que no deja pasos olvidados",
      },
    ],
    quote: {
      text: {
        en: "We close 18 deals a month with the same team that did 12 last year. The system catches details we used to miss.",
        es: "Cerramos 18 deals al mes con el mismo equipo que hizo 12 el año pasado. El sistema atrapa detalles que antes se nos iban.",
      },
      author: "Sofía Núñez",
      role: { en: "Broker", es: "Bróker" },
      company: "Nido Inmobiliaria",
    },
    template: {
      en: "Pipeline · listings · transactions · closing checklist",
      es: "Pipeline · listings · transacciones · closing checklist",
    },
  },
  healthcare: {
    slug: "healthcare",
    iconName: "Heart",
    label: { en: "Healthcare", es: "Salud" },
    tag: {
      en: "Clinical ops without the IT overhead",
      es: "Operaciones clínicas sin el overhead de IT",
    },
    headline: {
      en: "Run clinical operations like a software team",
      es: "Lleva operaciones clínicas como un equipo de software",
    },
    description: {
      en: "Patient intake, scheduling, follow-up, billing — coordinated. HIPAA-ready architecture. AI that understands medical context without exposing PHI to public models.",
      es: "Intake de pacientes, agenda, follow-up, facturación — coordinados. Arquitectura HIPAA-ready. IA que entiende contexto médico sin exponer PHI a modelos públicos.",
    },
    painPoints: [
      {
        en: "Patient communication scattered between EMR, SMS, and email",
        es: "La comunicación con pacientes vive entre el EMR, SMS y email",
      },
      {
        en: "Pre-auth and insurance follow-up eats hours of admin time",
        es: "Pre-autorizaciones y seguimiento de seguros se come horas de admin",
      },
      {
        en: "Clinical SOPs are stuck in PDFs nobody updates",
        es: "Los SOPs clínicos viven en PDFs que nadie actualiza",
      },
    ],
    solutions: [
      {
        en: "Patient communication threaded by case, with audit logging",
        es: "Comunicación con paciente enhebrada por caso, con audit logging",
      },
      {
        en: "Pre-auth tracker with payer-specific templates",
        es: "Tracker de pre-auth con plantillas por aseguradora",
      },
      {
        en: "Living SOPs with version history and AI-assisted updates",
        es: "SOPs vivos con historial de versiones y actualizaciones asistidas por IA",
      },
    ],
    quote: {
      text: {
        en: "Our admin team got Fridays back. The pre-auth tracker alone is worth the price.",
        es: "Nuestro equipo admin recuperó los viernes. El tracker de pre-auth solo ya vale el precio.",
      },
      author: "Dra. Camila Vega",
      role: { en: "Medical Director", es: "Directora Médica" },
      company: "Vitale Health",
    },
    template: {
      en: "Patient intake · scheduling · billing · clinical SOPs",
      es: "Intake de pacientes · agenda · facturación · SOPs clínicos",
    },
  },
  finance: {
    slug: "finance",
    iconName: "Banknote",
    label: { en: "Financial services", es: "Servicios financieros" },
    tag: {
      en: "Compliance + ops in lockstep",
      es: "Compliance + ops en sincronía",
    },
    headline: {
      en: "Where compliance lives next to the work, not on a separate island",
      es: "Donde compliance vive junto al trabajo, no en otra isla",
    },
    description: {
      en: "Client onboarding, KYC, recurring reviews, and document retention — coordinated. Audit-ready by design.",
      es: "Onboarding de clientes, KYC, revisiones recurrentes y retención de documentos — coordinados. Audit-ready por diseño.",
    },
    painPoints: [
      {
        en: "KYC checks live in one tool, client work in another, audits in spreadsheets",
        es: "Los KYC viven en una herramienta, el trabajo del cliente en otra, las auditorías en spreadsheets",
      },
      {
        en: "Recurring reviews slip because nobody owns the calendar",
        es: "Las revisiones recurrentes se cuelan porque nadie es dueño del calendario",
      },
      {
        en: "Client comms aren't linked to the underlying advisory file",
        es: "La comunicación con cliente no está ligada al expediente de asesoría",
      },
    ],
    solutions: [
      {
        en: "Client file with KYC status, documents, comms, and tasks all linked",
        es: "Expediente con KYC, documentos, comunicación y tareas todo ligado",
      },
      {
        en: "Recurring reviews on a schedule with auto-reminders",
        es: "Revisiones recurrentes con recordatorios automáticos",
      },
      {
        en: "Audit log of every action, exportable in one click",
        es: "Audit log de cada acción, exportable a un click",
      },
    ],
    quote: {
      text: {
        en: "Our last audit took three days instead of three weeks. Everything was already in one place.",
        es: "Nuestra última auditoría tomó tres días en vez de tres semanas. Todo ya estaba en un solo lugar.",
      },
      author: "Pablo Garza",
      role: { en: "Compliance Lead", es: "Líder de Compliance" },
      company: "Forge Capital",
    },
    template: {
      en: "Client files · KYC · recurring reviews · audit log",
      es: "Expedientes · KYC · revisiones recurrentes · audit log",
    },
  },
  construction: {
    slug: "construction",
    iconName: "HardHat",
    label: { en: "Construction", es: "Construcción" },
    tag: { en: "Project + crew + cost together", es: "Proyecto + cuadrilla + costo juntos" },
    headline: {
      en: "Drawings, RFIs, and crews — synced from the field",
      es: "Planos, RFIs y cuadrillas — sincronizados desde el campo",
    },
    description: {
      en: "FlorioIn lives on phones in the field and laptops in the office. Photo-to-task. Voice-to-RFI. The Co-Pilot reads daily reports and surfaces what needs your attention.",
      es: "FlorioIn vive en celulares en campo y laptops en oficina. Foto a tarea. Voz a RFI. El Co-Piloto lee daily reports y muestra lo que necesita tu atención.",
    },
    painPoints: [
      {
        en: "RFIs and change orders take days because they're emailed back and forth",
        es: "RFIs y change orders tardan días porque viajan en email",
      },
      {
        en: "Daily reports written by foremen never reach the right person fast enough",
        es: "Los daily reports que escriben los foremen no llegan al responsable a tiempo",
      },
      {
        en: "Cost tracking happens at month-end, not in real time",
        es: "El control de costos ocurre a fin de mes, no en tiempo real",
      },
    ],
    solutions: [
      {
        en: "Field-friendly mobile app — capture issues with photo + voice",
        es: "App móvil amigable para campo — captura issues con foto + voz",
      },
      {
        en: "RFIs routed automatically to the right discipline lead",
        es: "RFIs ruteados automático al líder de disciplina correcto",
      },
      {
        en: "Real-time cost view tied to your purchase orders and invoices",
        es: "Vista de costos en tiempo real ligada a órdenes de compra y facturas",
      },
    ],
    quote: {
      text: {
        en: "RFIs that used to take two days now close in two hours. Margin protection.",
        es: "RFIs que antes tomaban dos días ahora cierran en dos horas. Protección de margen.",
      },
      author: "Rafael López",
      role: { en: "Project Manager", es: "Gerente de Proyecto" },
      company: "Construye Norte",
    },
    template: {
      en: "Project tracker · RFIs · daily reports · cost log",
      es: "Tracker de proyecto · RFIs · daily reports · log de costos",
    },
  },
  education: {
    slug: "education",
    iconName: "GraduationCap",
    label: { en: "Education", es: "Educación" },
    tag: {
      en: "Curriculum, ops, and parent comms",
      es: "Currículo, operaciones y comunicación con padres",
    },
    headline: {
      en: "Run your school the way teachers wish it ran",
      es: "Lleva tu institución como los maestros desearían",
    },
    description: {
      en: "Curriculum planning, lesson resources, parent comms, and admin tasks coordinated. Co-Pilot drafts parent emails, summarizes meeting notes, and surfaces students at risk.",
      es: "Planeación curricular, recursos de clase, comunicación con padres y tareas admin coordinadas. El Co-Piloto redacta emails a padres, resume reuniones y detecta estudiantes en riesgo.",
    },
    painPoints: [
      {
        en: "Lesson resources scattered across drives nobody can find",
        es: "Recursos de clase regados en drives que nadie encuentra",
      },
      {
        en: "Parent communication is reactive instead of proactive",
        es: "La comunicación con padres es reactiva, no proactiva",
      },
      {
        en: "Admin tasks pull teachers away from teaching",
        es: "Las tareas admin alejan a los maestros de enseñar",
      },
    ],
    solutions: [
      {
        en: "Searchable curriculum library with tags by grade, subject, and standard",
        es: "Biblioteca curricular buscable con tags por grado, materia y estándar",
      },
      {
        en: "Parent updates auto-drafted from real classroom signals",
        es: "Updates a padres auto-redactados desde señales reales del aula",
      },
      {
        en: "Admin templates that take 5 minutes instead of 50",
        es: "Plantillas admin que toman 5 minutos en vez de 50",
      },
    ],
    quote: {
      text: {
        en: "Our teachers got an hour a day back. They use it to teach.",
        es: "Nuestros maestros recuperaron una hora al día. La usan para enseñar.",
      },
      author: "Lucía Mendoza",
      role: { en: "Principal", es: "Directora" },
      company: "Brio Academy",
    },
    template: {
      en: "Curriculum · lesson library · parent comms · admin",
      es: "Currículo · biblioteca de clases · comunicación con padres · admin",
    },
  },
  nonprofit: {
    slug: "nonprofit",
    iconName: "Users",
    label: { en: "Nonprofits", es: "ONGs" },
    tag: {
      en: "More mission, less ops",
      es: "Más misión, menos ops",
    },
    headline: {
      en: "Spend your operating budget on the mission, not on software",
      es: "Gasta tu presupuesto operativo en la misión, no en software",
    },
    description: {
      en: "$3 a seat means a 20-person nonprofit pays $60 a month — not $600. Programs, donors, volunteers, and grants — coordinated.",
      es: "$3 por seat significa que una ONG de 20 personas paga $60 al mes — no $600. Programas, donantes, voluntarios y grants — coordinados.",
    },
    painPoints: [
      {
        en: "Software costs eat into program funding",
        es: "Los costos de software se comen el funding de programas",
      },
      {
        en: "Donor stewardship is manual and inconsistent",
        es: "El stewardship de donantes es manual e inconsistente",
      },
      {
        en: "Grant reporting takes days because data lives in 4 systems",
        es: "El reporte de grants toma días porque la data vive en 4 sistemas",
      },
    ],
    solutions: [
      {
        en: "Single platform replaces 3-4 paid tools at lower combined cost",
        es: "Una plataforma reemplaza 3-4 herramientas pagas a menor costo combinado",
      },
      {
        en: "Donor records linked to programs, comms, and acknowledgements",
        es: "Registros de donantes ligados a programas, comunicación y agradecimientos",
      },
      {
        en: "Grant reports auto-drafted from program data",
        es: "Reportes de grants auto-redactados desde data de programas",
      },
    ],
    quote: {
      text: {
        en: "We saved $11,000 a year and reclaimed two days of staff time per month.",
        es: "Ahorramos $11,000 al año y recuperamos dos días de staff time al mes.",
      },
      author: "Andrea Ríos",
      role: { en: "Executive Director", es: "Directora Ejecutiva" },
      company: "Fundación Verde",
    },
    template: {
      en: "Programs · donors · volunteers · grant tracker",
      es: "Programas · donantes · voluntarios · tracker de grants",
    },
  },
  manufacturing: {
    slug: "manufacturing",
    iconName: "Wrench",
    label: { en: "Manufacturing", es: "Manufactura" },
    tag: { en: "Floor + ops + quality", es: "Piso + ops + calidad" },
    headline: {
      en: "Connect the shop floor to the office, not via spreadsheet",
      es: "Conecta el piso con la oficina sin spreadsheet",
    },
    description: {
      en: "Production runs, quality checks, maintenance, and supplier comms in one place. Mobile-first for the floor, desktop-first for ops.",
      es: "Corridas de producción, checks de calidad, mantenimiento y comunicación con proveedores en un solo lugar. Móvil-primero para piso, desktop-primero para ops.",
    },
    painPoints: [
      {
        en: "Quality issues caught at month-end instead of at the line",
        es: "Issues de calidad atrapados a fin de mes en vez de en la línea",
      },
      {
        en: "Maintenance is reactive — equipment fails before it's serviced",
        es: "Mantenimiento es reactivo — los equipos fallan antes de servicio",
      },
      {
        en: "Supplier issues take weeks to escalate properly",
        es: "Problemas con proveedores tardan semanas en escalar bien",
      },
    ],
    solutions: [
      {
        en: "Quality checks logged at the line on a phone — escalate instantly",
        es: "Checks de calidad logueados en la línea por celular — escalan instantáneo",
      },
      {
        en: "Predictive maintenance triggered by hours/cycles, not gut feel",
        es: "Mantenimiento predictivo por horas/ciclos, no por intuición",
      },
      {
        en: "Supplier scorecard that surfaces patterns before they hurt",
        es: "Scorecard de proveedores que muestra patrones antes de doler",
      },
    ],
    quote: {
      text: {
        en: "Quality escapes dropped 40% in the first quarter. The Co-Pilot catches what humans miss at 3am.",
        es: "Los escapes de calidad bajaron 40% en el primer trimestre. El Co-Piloto atrapa lo que humanos pierden a las 3am.",
      },
      author: "Hugo Salinas",
      role: { en: "Operations Director", es: "Director de Operaciones" },
      company: "Forja Industrial",
    },
    template: {
      en: "Production runs · QC · maintenance · supplier scorecards",
      es: "Corridas · QC · mantenimiento · scorecards de proveedores",
    },
  },
  retail: {
    slug: "retail",
    iconName: "ShoppingBag",
    label: { en: "Retail", es: "Retail" },
    tag: { en: "Store + inventory + people", es: "Tienda + inventario + personas" },
    headline: {
      en: "Multi-store retail without the chaos",
      es: "Retail multi-tienda sin el caos",
    },
    description: {
      en: "Inventory tasks, staff scheduling, customer issues, and visual merchandising — coordinated across every store.",
      es: "Tareas de inventario, agenda de staff, issues de clientes y merchandising visual — coordinados en cada tienda.",
    },
    painPoints: [
      {
        en: "Each store manager runs ops differently — no visibility from HQ",
        es: "Cada gerente de tienda lleva ops a su manera — sin visibilidad desde HQ",
      },
      {
        en: "Customer issues bounce between stores and corporate for days",
        es: "Issues de cliente rebotan entre tiendas y corporativo por días",
      },
      {
        en: "Stock decisions made on instinct because data is stale",
        es: "Decisiones de stock por instinto porque la data está stale",
      },
    ],
    solutions: [
      {
        en: "Standard playbooks per store role with audit-friendly tracking",
        es: "Playbooks estándar por rol con tracking audit-friendly",
      },
      {
        en: "Customer issue routing with SLA timers per channel",
        es: "Routing de issues con SLA timers por canal",
      },
      {
        en: "Real-time stock view tied to POS and replenishment",
        es: "Vista de stock en tiempo real ligada a POS y reposición",
      },
    ],
    quote: {
      text: {
        en: "We finally treat all 12 stores the same way. NPS up 9 points.",
        es: "Por fin tratamos las 12 tiendas igual. NPS subió 9 puntos.",
      },
      author: "Mariana Cruz",
      role: { en: "VP Retail", es: "VP Retail" },
      company: "Mercado Norte",
    },
    template: {
      en: "Store playbooks · stock · staff schedule · customer issues",
      es: "Playbooks · inventario · agenda · issues de cliente",
    },
  },
  tech: {
    slug: "tech",
    iconName: "Cpu",
    label: { en: "Tech companies", es: "Empresas tech" },
    tag: {
      en: "PMs, engineers, and ops on one page",
      es: "PMs, ingenieros y ops en una sola página",
    },
    headline: {
      en: "Replace Linear + Notion + Slack + your AI bills",
      es: "Reemplaza Linear + Notion + Slack + tus facturas de IA",
    },
    description: {
      en: "FlorioIn ships specs, sprints, retros, and customer feedback in one workspace. The Co-Pilot is built into the cursor — not a tab away.",
      es: "FlorioIn une specs, sprints, retros y feedback de clientes en un solo workspace. El Co-Piloto vive en el cursor — no en otra pestaña.",
    },
    painPoints: [
      {
        en: "Eng tools, PM tools, comms, and AI subs add up to >$50/seat",
        es: "Tools de eng, de PM, de comunicación y subs de IA suman >$50/seat",
      },
      {
        en: "Specs live in Notion but get implemented from a Linear ticket without context",
        es: "Specs viven en Notion pero se implementan desde tickets de Linear sin contexto",
      },
      {
        en: "Customer feedback never makes it to the roadmap",
        es: "El feedback de clientes nunca llega al roadmap",
      },
    ],
    solutions: [
      {
        en: "One $3/seat platform vs. four overlapping subscriptions",
        es: "Una plataforma de $3/seat vs. cuatro suscripciones superpuestas",
      },
      {
        en: "Spec ↔ ticket ↔ PR ↔ feedback all linked automatically",
        es: "Spec ↔ ticket ↔ PR ↔ feedback todo ligado automático",
      },
      {
        en: "Customer feedback clustered weekly with Co-Pilot summaries",
        es: "Feedback de clientes agrupado semanal con resúmenes del Co-Piloto",
      },
    ],
    quote: {
      text: {
        en: "We dropped Linear, Notion, and ChatGPT Team. The team was happier in week one.",
        es: "Bajamos Linear, Notion y ChatGPT Team. El equipo estaba más feliz en la semana uno.",
      },
      author: "Tomás Vargas",
      role: { en: "CTO", es: "CTO" },
      company: "Ola Studios",
    },
    template: {
      en: "Specs · sprints · retros · customer feedback",
      es: "Specs · sprints · retros · feedback de clientes",
    },
  },
  agency: {
    slug: "agency",
    iconName: "PaintBucket",
    label: { en: "Creative agencies", es: "Agencias creativas" },
    tag: {
      en: "Clients × projects × creatives, coordinated",
      es: "Clientes × proyectos × creativos, coordinados",
    },
    headline: {
      en: "Run more clients without burning out your creatives",
      es: "Lleva más clientes sin quemar a tus creativos",
    },
    description: {
      en: "Multi-client management without context loss. Co-Pilot writes briefs, summarizes feedback, and keeps every project in shape.",
      es: "Gestión multi-cliente sin perder contexto. El Co-Piloto redacta briefs, resume feedback y mantiene cada proyecto en forma.",
    },
    painPoints: [
      {
        en: "Each client gets onboarded into a Slack workspace + Trello board + Drive folder",
        es: "Cada cliente se onboardea con un Slack + Trello + carpeta de Drive",
      },
      {
        en: "Creatives spend 30% of their week chasing approvals",
        es: "Los creativos pasan 30% de la semana persiguiendo aprobaciones",
      },
      {
        en: "Project profitability is unclear until the project is over",
        es: "La rentabilidad por proyecto se ve hasta que termina",
      },
    ],
    solutions: [
      {
        en: "Client portals with the right scoping built in",
        es: "Portales de cliente con el scoping correcto integrado",
      },
      {
        en: "Approval flows with auto-reminders and clear deadlines",
        es: "Flujos de aprobación con recordatorios y deadlines claros",
      },
      {
        en: "Real-time project profitability tied to time entries",
        es: "Rentabilidad por proyecto en tiempo real ligada a time entries",
      },
    ],
    quote: {
      text: {
        en: "We took on three new accounts last quarter without hiring. The system absorbed the load.",
        es: "Tomamos tres clientes nuevos el trimestre pasado sin contratar. El sistema absorbió la carga.",
      },
      author: "Renata Soto",
      role: { en: "Creative Director", es: "Directora Creativa" },
      company: "Lúdica Agency",
    },
    template: {
      en: "Client portal · projects · approvals · profitability",
      es: "Portal de cliente · proyectos · aprobaciones · rentabilidad",
    },
  },
  media: {
    slug: "media",
    iconName: "Newspaper",
    label: { en: "Media & publishing", es: "Medios y publishing" },
    tag: {
      en: "Editorial calendar that actually keeps pace",
      es: "Calendario editorial que sí lleva el ritmo",
    },
    headline: {
      en: "Editorial without the heroic weekly scramble",
      es: "Editorial sin la corrida heroica semanal",
    },
    description: {
      en: "Pitch, assign, edit, publish — coordinated. Co-Pilot drafts, fact-checks, and clusters story angles. Your editors edit instead of administrate.",
      es: "Pitch, asignación, edición, publicación — coordinados. El Co-Piloto redacta, verifica datos y agrupa ángulos. Tus editores editan en vez de administrar.",
    },
    painPoints: [
      {
        en: "Pitches live in Slack DMs and never enter the editorial calendar",
        es: "Los pitches viven en DMs de Slack y nunca entran al calendario",
      },
      {
        en: "Fact-checking is the last step instead of a continuous one",
        es: "El fact-check es el último paso en vez de continuo",
      },
      {
        en: "Editors spend more time tracking than editing",
        es: "Los editores pasan más tiempo trackeando que editando",
      },
    ],
    solutions: [
      {
        en: "Pitch board with auto-categorization by beat",
        es: "Tablero de pitches con auto-categorización por beat",
      },
      {
        en: "Inline fact-checking suggestions while drafting",
        es: "Sugerencias de fact-check inline mientras redactas",
      },
      {
        en: "Editorial calendar that updates as stories progress",
        es: "Calendario editorial que se actualiza al progresar las historias",
      },
    ],
    quote: {
      text: {
        en: "We publish 20% more stories with the same team. Our editors are happier — they edit again.",
        es: "Publicamos 20% más historias con el mismo equipo. Los editores están más felices — editan de nuevo.",
      },
      author: "Beatriz Solano",
      role: { en: "Editor-in-Chief", es: "Editora en Jefe" },
      company: "Revista Norte",
    },
    template: {
      en: "Pitch board · editorial calendar · fact-check · style guide",
      es: "Tablero de pitches · calendario · fact-check · style guide",
    },
  },
  logistics: {
    slug: "logistics",
    iconName: "Truck",
    label: { en: "Logistics", es: "Logística" },
    tag: {
      en: "Operations that don't break at scale",
      es: "Operaciones que no se rompen al escalar",
    },
    headline: {
      en: "Move from spreadsheets to a system without the SAP price tag",
      es: "Pasa de spreadsheets a un sistema sin el precio de SAP",
    },
    description: {
      en: "Shipments, drivers, exceptions, and customer comms in one place. Mobile for drivers. Desktop for ops. Co-Pilot resolves common exceptions automatically.",
      es: "Envíos, choferes, excepciones y comunicación con clientes en un solo lugar. Móvil para choferes. Desktop para ops. El Co-Piloto resuelve excepciones comunes automático.",
    },
    painPoints: [
      {
        en: "Shipment status lives in five spreadsheets and a WhatsApp group",
        es: "El status de envíos vive en cinco spreadsheets y un grupo de WhatsApp",
      },
      {
        en: "Exception handling is reactive — customers complain before you know",
        es: "El manejo de excepciones es reactivo — los clientes reclaman antes de que sepas",
      },
      {
        en: "Driver onboarding takes a week of shadowing",
        es: "Onboardear un chofer toma una semana de shadowing",
      },
    ],
    solutions: [
      {
        en: "Real-time shipment dashboard with anomaly alerts",
        es: "Dashboard de envíos en tiempo real con alertas de anomalías",
      },
      {
        en: "Co-Pilot resolves common exceptions and escalates the rest",
        es: "El Co-Piloto resuelve excepciones comunes y escala el resto",
      },
      {
        en: "Driver app with the SOPs they need, when they need them",
        es: "App para choferes con los SOPs que necesitan, cuando los necesitan",
      },
    ],
    quote: {
      text: {
        en: "On-time delivery rate climbed from 88% to 96% in two quarters.",
        es: "El on-time delivery subió de 88% a 96% en dos trimestres.",
      },
      author: "Iván Ramírez",
      role: { en: "Operations Manager", es: "Gerente de Operaciones" },
      company: "Mapa Logística",
    },
    template: {
      en: "Shipments · exceptions · drivers · customer comms",
      es: "Envíos · excepciones · choferes · comunicación con clientes",
    },
  },
};
