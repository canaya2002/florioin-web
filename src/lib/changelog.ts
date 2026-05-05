export type ChangelogTag = "new" | "improved" | "fixed" | "security";

export type ChangelogEntry = {
  version: string;
  releasedAt: string; // ISO yyyy-mm-dd
  title: { en: string; es: string };
  summary: { en: string; es: string };
  items: Array<{
    tag: ChangelogTag;
    text: { en: string; es: string };
  }>;
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.0",
    releasedAt: "2026-04-01",
    title: { en: "Public launch", es: "Lanzamiento público" },
    summary: {
      en: "FlorioIn 1.0 is here. The product we've been building for two years is ready for the rest of you.",
      es: "FlorioIn 1.0 está aquí. El producto que llevamos construyendo dos años ya está listo para el resto.",
    },
    items: [
      {
        tag: "new",
        text: {
          en: "Public access for everyone via /request-access",
          es: "Acceso público para todos vía /request-access",
        },
      },
      {
        tag: "new",
        text: {
          en: "Apps available for iOS, iPad, Android, macOS, Windows, Linux",
          es: "Apps disponibles para iOS, iPad, Android, macOS, Windows, Linux",
        },
      },
      {
        tag: "new",
        text: {
          en: "Multi-region data residency (US-East and EU-West) for enterprise plans",
          es: "Residencia de datos multi-región (US-East y EU-West) para planes enterprise",
        },
      },
    ],
  },
  {
    version: "0.9",
    releasedAt: "2026-02-15",
    title: { en: "Closed beta wraps up", es: "Cierre del beta cerrado" },
    summary: {
      en: "Final week of closed beta. 200+ teams, ~3,400 daily-active users, and an NPS of 71.",
      es: "Última semana de beta cerrada. 200+ equipos, ~3,400 usuarios activos diarios, y un NPS de 71.",
    },
    items: [
      {
        tag: "improved",
        text: {
          en: "View paint time on 10K-task boards: 480ms → 92ms",
          es: "Tiempo de pintado en boards de 10K tareas: 480ms → 92ms",
        },
      },
      {
        tag: "improved",
        text: {
          en: "Co-Pilot first-token latency: 1.4s → 380ms (P50)",
          es: "Latencia primer-token del Co-Piloto: 1.4s → 380ms (P50)",
        },
      },
      {
        tag: "fixed",
        text: {
          en: "Notification badge count drift on extended-session web clients",
          es: "Drift del contador de notificaciones en clientes web de sesión larga",
        },
      },
    ],
  },
  {
    version: "0.8",
    releasedAt: "2026-01-10",
    title: { en: "AI Co-Pilot 2.0", es: "Co-Piloto IA 2.0" },
    summary: {
      en: "Co-Pilot can now act on your workspace. Read, propose, execute — with your approval gates.",
      es: "El Co-Piloto puede actuar en tu workspace. Leer, proponer, ejecutar — con tus puertas de aprobación.",
    },
    items: [
      {
        tag: "new",
        text: {
          en: "Tool use: Co-Pilot can create tasks, edit docs, send emails (with approval)",
          es: "Tool use: el Co-Piloto puede crear tareas, editar docs, mandar emails (con aprobación)",
        },
      },
      {
        tag: "new",
        text: {
          en: "Multi-model routing — auto-selects the best model for each task type",
          es: "Routing multi-modelo — autoselecciona el mejor modelo por tipo de tarea",
        },
      },
      {
        tag: "new",
        text: {
          en: "RAG over your full workspace, with citation links in every reply",
          es: "RAG sobre tu workspace completo, con citas en cada respuesta",
        },
      },
    ],
  },
  {
    version: "0.7",
    releasedAt: "2025-11-20",
    title: { en: "Mobile apps", es: "Apps móviles" },
    summary: {
      en: "iOS, iPad, and Android apps shipped with full feature parity to web.",
      es: "Apps iOS, iPad y Android lanzadas con paridad de features completa con web.",
    },
    items: [
      {
        tag: "new",
        text: {
          en: "Native iOS and iPad apps via the App Store",
          es: "Apps nativas iOS e iPad vía App Store",
        },
      },
      {
        tag: "new",
        text: {
          en: "Native Android app (phone + tablet) via Play Store",
          es: "App nativa Android (teléfono + tablet) vía Play Store",
        },
      },
      {
        tag: "new",
        text: {
          en: "Voice notes with on-device transcription",
          es: "Notas de voz con transcripción on-device",
        },
      },
    ],
  },
  {
    version: "0.6",
    releasedAt: "2025-09-01",
    title: { en: "Smart Inbox", es: "Bandeja inteligente" },
    summary: {
      en: "The unified inbox lands. Email, Slack, Teams, WhatsApp — all in one place.",
      es: "Llega la bandeja unificada. Email, Slack, Teams, WhatsApp — en un solo lugar.",
    },
    items: [
      {
        tag: "new",
        text: {
          en: "Email integration with Gmail and Outlook (full read/write)",
          es: "Integración de email con Gmail y Outlook (read/write completo)",
        },
      },
      {
        tag: "new",
        text: {
          en: "Slack and Microsoft Teams two-way sync",
          es: "Sync bidireccional con Slack y Microsoft Teams",
        },
      },
      {
        tag: "new",
        text: {
          en: "WhatsApp Business integration (Cloud API)",
          es: "Integración WhatsApp Business (Cloud API)",
        },
      },
      {
        tag: "security",
        text: {
          en: "Per-channel scope-limited OAuth tokens with rotation",
          es: "Tokens OAuth con scope limitado por canal y rotación",
        },
      },
    ],
  },
];

export function getChangelogEntry(version: string): ChangelogEntry | undefined {
  return CHANGELOG.find((entry) => entry.version === version);
}

export const CHANGELOG_TAG_LABELS: Record<
  ChangelogTag,
  { en: string; es: string }
> = {
  new: { en: "New", es: "Nuevo" },
  improved: { en: "Improved", es: "Mejorado" },
  fixed: { en: "Fixed", es: "Arreglado" },
  security: { en: "Security", es: "Seguridad" },
};

export const CHANGELOG_TAG_COLORS: Record<ChangelogTag, string> = {
  new: "var(--success)",
  improved: "var(--primary)",
  fixed: "var(--warning)",
  security: "var(--danger)",
};
