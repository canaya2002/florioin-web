import { AlarmClock, MailWarning, Search, Workflow } from "lucide-react";

import { RevealOnScroll } from "@/components/animations/reveal-on-scroll";
import { Container } from "@/components/layout/container";
import type { Locale } from "@/i18n/locales";

type WorkIsBrokenProps = {
  locale: Locale;
};

const TINTS = ["#ff8dda", "#a88cff", "#38e4ff", "#f25bd8"];
const RADII = [
  "60px 88px 64px 80px / 80px 64px 88px 60px",
  "88px 60px 80px 64px / 60px 80px 64px 88px",
  "72px 96px 60px 84px / 84px 60px 96px 72px",
  "96px 64px 80px 60px / 60px 96px 64px 80px",
];

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
          body: "Buscando archivos, copiando entre herramientas, pegando lo mismo en tres lugares. Eso son 9 horas a la semana.",
        },
        {
          icon: Search,
          stat: "62%",
          unit: "del tiempo",
          title: "Más del 60% es 'trabajo sobre el trabajo'",
          body: "Status updates, follow-ups, recordatorios. Solo el 38% del tiempo se hace el trabajo real.",
        },
        {
          icon: MailWarning,
          stat: "$140",
          unit: "/usuario",
          title: "Pagas $140 USD por persona en SaaS",
          body: "Slack, Asana, Notion, Loom, Zapier, ChatGPT… cada uno con su propio precio y password.",
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
          body: "Searching files, copying between tools, pasting the same thing in three places. That's 9 hours a week.",
        },
        {
          icon: Search,
          stat: "62%",
          unit: "of time",
          title: "Over 60% is 'work about work'",
          body: "Status meetings, follow-ups, reminders. Only 38% of the time is real work happening.",
        },
        {
          icon: MailWarning,
          stat: "$140",
          unit: "/seat",
          title: "You're paying $140 USD per person in SaaS",
          body: "Slack, Asana, Notion, Loom, Zapier, ChatGPT… each with its own price and password.",
        },
      ];

  return (
    <section
      id="problem"
      className="section relative isolate overflow-hidden bg-white scroll-mt-24"
    >
      <Container>
        <div className="mb-[var(--space-16)] max-w-3xl">
          <span className="eyebrow-pill mb-[var(--space-4)] inline-flex">
            <span className="dot" aria-hidden />
            <span>{isEs ? "El problema" : "The problem"}</span>
          </span>
          <h2 className="font-display text-[clamp(40px,6vw,84px)] leading-[1.02] tracking-[-0.05em] text-[var(--fg)] [text-wrap:balance]">
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

        <ul className="grid gap-[var(--space-10)] sm:grid-cols-2 lg:grid-cols-4">
          {pains.map((pain, i) => {
            const Icon = pain.icon;
            const tint = TINTS[i % TINTS.length];
            return (
              <RevealOnScroll
                key={pain.title}
                direction="up"
                distance={18}
                delay={i * 0.06}
                duration={0.6}
                className="group relative flex flex-col items-start gap-[var(--space-4)]"
              >
                {/* Floating icon orb with gradient halo */}
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -inset-3 -z-10 rounded-full opacity-60 blur-2xl"
                    style={{
                      background: `radial-gradient(circle, ${tint}80, transparent 60%)`,
                    }}
                  />
                  <span
                    aria-hidden
                    className="block animate-breathe"
                    style={{
                      animationDelay: `${i * -1.4}s`,
                    }}
                  >
                    <span
                      className="grid h-16 w-16 place-items-center bg-white text-[var(--fg)] transition-transform duration-[var(--duration-base)] group-hover:scale-110"
                      style={{ borderRadius: RADII[i] }}
                    >
                      <Icon
                        className="h-6 w-6"
                        strokeWidth={1.7}
                        style={{ color: tint }}
                      />
                    </span>
                  </span>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span
                    className="font-display text-[clamp(48px,5vw,72px)] leading-[0.9] tracking-[-0.05em]"
                    style={{
                      background: `linear-gradient(135deg, ${tint}, var(--c-violet))`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {pain.stat}
                  </span>
                  <span className="text-[13px] font-medium text-[var(--fg-muted)]">
                    {pain.unit}
                  </span>
                </div>
                <h3 className="font-display text-[19px] leading-[1.2] tracking-tight text-[var(--fg)]">
                  {pain.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[var(--fg-muted)]">
                  {pain.body}
                </p>
              </RevealOnScroll>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
