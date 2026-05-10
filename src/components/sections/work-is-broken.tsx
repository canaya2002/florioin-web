import { AlarmClock, MailWarning, Search, Workflow } from "lucide-react";

import { Container } from "@/components/layout/container";
import type { Locale } from "@/i18n/locales";

type WorkIsBrokenProps = {
  locale: Locale;
};

export function WorkIsBroken({ locale }: WorkIsBrokenProps) {
  const isEs = locale === "es";

  const pains = isEs
    ? [
        {
          icon: Workflow,
          stat: "11",
          unit: "apps",
          title: "Tu equipo cambia de app cada 3 minutos",
          body: "Tareas en una. Docs en otra. Chats en tres. Cada salto rompe el contexto y mata el flow.",
        },
        {
          icon: AlarmClock,
          stat: "1.8h",
          unit: "/día",
          title: "Cada persona pierde 1.8 horas al día",
          body: "Buscando archivos, copiando entre herramientas, pegando lo mismo en tres lugares. Eso son 9 horas a la semana — un día completo.",
        },
        {
          icon: Search,
          stat: "62%",
          unit: "del tiempo",
          title: "Más del 60% es 'trabajo sobre el trabajo'",
          body: "Reuniones para coordinar, status updates, follow-ups, recordatorios. Solo el 38% del tiempo se hace el trabajo real.",
        },
        {
          icon: MailWarning,
          stat: "$140",
          unit: "/usuario",
          title: "Pagas $140 USD por persona en SaaS",
          body: "Slack, Asana, Notion, Loom, Zapier, Google Workspace, ChatGPT… cada uno con su propio precio, factura y password.",
        },
      ]
    : [
        {
          icon: Workflow,
          stat: "11",
          unit: "apps",
          title: "Your team switches apps every 3 minutes",
          body: "Tasks in one. Docs in another. Chats in three. Every jump breaks context and kills flow.",
        },
        {
          icon: AlarmClock,
          stat: "1.8h",
          unit: "/day",
          title: "Each person loses 1.8 hours a day",
          body: "Searching files, copying between tools, pasting the same thing in three places. That's 9 hours a week — a full workday.",
        },
        {
          icon: Search,
          stat: "62%",
          unit: "of time",
          title: "Over 60% is 'work about work'",
          body: "Status meetings, follow-ups, reminders, alignment. Only 38% of the time is real work happening.",
        },
        {
          icon: MailWarning,
          stat: "$140",
          unit: "/seat",
          title: "You're paying $140 USD per person in SaaS",
          body: "Slack, Asana, Notion, Loom, Zapier, Google Workspace, ChatGPT… each with its own price, invoice, and password.",
        },
      ];

  return (
    <section
      id="problem"
      className="section relative isolate overflow-hidden scroll-mt-24"
    >
      <Container>
        <div className="mb-[var(--space-12)] max-w-3xl">
          <span className="eyebrow-pill mb-[var(--space-4)] inline-flex">
            <span className="dot" aria-hidden />
            <span>{isEs ? "El problema" : "The problem"}</span>
          </span>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.04em] text-[var(--fg)]">
            {isEs ? (
              <>
                El trabajo está <span className="text-gradient">roto</span>.
              </>
            ) : (
              <>
                Work is <span className="text-gradient">broken</span>.
              </>
            )}
          </h2>
          <p className="mt-[var(--space-4)] max-w-2xl text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
            {isEs
              ? "No porque tu equipo no sea bueno. Sino porque les pides que coordinen entre 11 apps que no se hablan."
              : "Not because your team isn't good. Because you're asking them to coordinate across 11 apps that don't talk to each other."}
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pains.map((pain) => {
            const Icon = pain.icon;
            return (
              <li
                key={pain.title}
                className="relative flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-md)]"
              >
                <span
                  aria-hidden
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--danger)]"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[clamp(32px,3.5vw,44px)] leading-[0.95] tracking-[-0.04em] text-[var(--fg)]">
                    {pain.stat}
                  </span>
                  <span className="text-[14px] text-[var(--fg-muted)]">
                    {pain.unit}
                  </span>
                </div>
                <h3 className="font-display text-[18px] leading-tight tracking-tight text-[var(--fg)]">
                  {pain.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[var(--fg-muted)]">
                  {pain.body}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
