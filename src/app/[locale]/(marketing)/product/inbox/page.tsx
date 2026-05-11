import {
  ArrowRight,
  AtSign,
  Bell,
  BotMessageSquare,
  Check,
  Clock,
  Filter,
  Inbox,
  Keyboard,
  Mail,
  MessageSquare,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RevealOnScroll } from "@/components/animations/reveal-on-scroll";
import { Container } from "@/components/layout/container";
import { MediaSlot } from "@/components/media/media-slot";
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
    path: "/product/inbox",
    title: isEs ? "Bandeja inteligente" : "Smart Inbox",
    description: isEs
      ? "Gmail, Outlook, Slack, Teams, WhatsApp y SMS — clasificados por IA con borradores en tu tono. Convierte mensaje en tarea con Cmd+K."
      : "Gmail, Outlook, Slack, Teams, WhatsApp and SMS — AI-classified with draft replies in your voice. Turn message into task with Cmd+K.",
  });
}

export default async function InboxPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  const channels = [
    { name: "Gmail", icon: Mail, tint: "#ff8dda" },
    { name: "Outlook", icon: Mail, tint: "#79b8ff" },
    { name: "Slack", icon: MessageSquare, tint: "#a88cff" },
    { name: "Microsoft Teams", icon: MessageSquare, tint: "#38e4ff" },
    { name: "WhatsApp Business", icon: Smartphone, tint: "#34c79a" },
    { name: "SMS / RCS", icon: Bell, tint: "#f25bd8" },
    { name: "Webhooks", icon: AtSign, tint: "#f5b14a" },
  ];

  const capabilities = isEs
    ? [
        {
          icon: Filter,
          tint: "#ff8dda",
          title: "Triage automático",
          body: "Cada mensaje entra clasificado: urgente, esperando respuesta, FYI, spam. La IA aprende de tus patrones reales — no de un tutorial — y mejora cada semana.",
          detail: "Per-user model · adaptive · sub-200ms",
        },
        {
          icon: BotMessageSquare,
          tint: "#a88cff",
          title: "Borradores en tu tono",
          body: "El Co-Pilot redacta cada respuesta con tu voz aprendida de tu historial. Tú revisas, ajustas, mandas. La fricción de redactar desaparece.",
          detail: "Per-user voice · context-aware · one-tap send",
        },
        {
          icon: Keyboard,
          tint: "#38e4ff",
          title: "Cmd+K → asignar a una persona",
          body: "Convierte un mensaje en tarea sin salir de la bandeja. Conserva el thread completo, agenda follow-up automático, mantiene contexto.",
          detail: "Keyboard-first · full thread carry-over",
        },
        {
          icon: Clock,
          tint: "#f25bd8",
          title: "Snooze inteligente",
          body: 'Snooze hasta que la otra persona responda. O hasta el lunes a las 9am. O hasta que cumpla un evento del calendario ("cuando termine la junta").',
          detail: "Event-trigger snoozes · auto-resurface",
        },
        {
          icon: Bell,
          tint: "#79b8ff",
          title: "Notificaciones que respetan tu día",
          body: "Solo lo importante interrumpe en vivo. Lo demás se agrupa en un digest. Configura por canal, por persona, por horario.",
          detail: "Quiet hours · per-channel rules · digest mode",
        },
        {
          icon: Inbox,
          tint: "#34c79a",
          title: "Bandeja unificada multi-cuenta",
          body: "Combina dos emails personales + el de trabajo + Slack + WhatsApp en una sola bandeja. Sin saltar de pestaña, sin password manager.",
          detail: "Multi-account · OAuth · session-aware",
        },
      ]
    : [
        {
          icon: Filter,
          tint: "#ff8dda",
          title: "Automatic triage",
          body: "Every message lands classified: urgent, awaiting reply, FYI, spam. AI learns from your real patterns — not a tutorial — and improves every week.",
          detail: "Per-user model · adaptive · sub-200ms",
        },
        {
          icon: BotMessageSquare,
          tint: "#a88cff",
          title: "Drafts in your voice",
          body: "Co-Pilot drafts every reply in your voice learned from your history. You review, adjust, send. The friction of writing disappears.",
          detail: "Per-user voice · context-aware · one-tap send",
        },
        {
          icon: Keyboard,
          tint: "#38e4ff",
          title: "Cmd+K → assign to a person",
          body: "Turn a message into a task without leaving the inbox. Keeps the full thread, auto-schedules follow-up, holds context.",
          detail: "Keyboard-first · full thread carry-over",
        },
        {
          icon: Clock,
          tint: "#f25bd8",
          title: "Smart snooze",
          body: 'Snooze until the other person replies. Or until Monday at 9am. Or until a calendar event finishes ("when the meeting ends").',
          detail: "Event-trigger snoozes · auto-resurface",
        },
        {
          icon: Bell,
          tint: "#79b8ff",
          title: "Notifications that respect your day",
          body: "Only what matters interrupts live. Everything else groups into a digest. Configure per channel, per person, per time slot.",
          detail: "Quiet hours · per-channel rules · digest mode",
        },
        {
          icon: Inbox,
          tint: "#34c79a",
          title: "Multi-account unified inbox",
          body: "Combine two personal emails + work + Slack + WhatsApp in one inbox. No tab-hopping, no password manager.",
          detail: "Multi-account · OAuth · session-aware",
        },
      ];

  const triageStats = isEs
    ? [
        { value: "−68%", label: "Tiempo en inbox por día" },
        { value: "3.2×", label: "Velocidad de respuesta" },
        { value: "97%", label: "Precisión del triage tras semana 2" },
        { value: "< 200 ms", label: "Clasificación por mensaje" },
      ]
    : [
        { value: "−68%", label: "Time in inbox per day" },
        { value: "3.2×", label: "Reply speed" },
        { value: "97%", label: "Triage accuracy by week 2" },
        { value: "< 200 ms", label: "Classification per message" },
      ];

  return (
    <>
      <PageHero
        eyebrow={dict.nav.productInbox}
        title={
          isEs ? (
            <>
              Una bandeja{" "}
              <span className="text-gradient animate-gradient">para todo</span>
            </>
          ) : (
            <>
              One inbox{" "}
              <span className="text-gradient animate-gradient">for everything</span>
            </>
          )
        }
        description={
          isEs
            ? "Gmail, Outlook, Slack, Microsoft Teams, WhatsApp Business, SMS. Todo en un lugar, clasificado por la IA, con borradores de respuesta sugeridos en tu tono. Tu equipo deja de perseguir mensajes y empieza a cerrarlos."
            : "Gmail, Outlook, Slack, Microsoft Teams, WhatsApp Business, SMS. All in one place, AI-classified, with draft replies in your voice. Your team stops chasing messages and starts closing them."
        }
        primaryCta={{
          href: `${lp}/request-access`,
          label: dict.common.ctaPrimary,
        }}
        visual={
          <div className="relative isolate mx-auto max-w-5xl">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-70 blur-3xl"
              style={{ background: "var(--gradient-glow)" }}
            />
            <MediaSlot
              name="product/inbox/hero"
              aspect="16/9"
              radius="96px 64px 84px 72px / 72px 84px 64px 96px"
            />
          </div>
        }
      />

      {/* ─────────────────────────────────────────────────────────
          Channels strip
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mx-auto mb-[var(--space-10)] max-w-3xl text-center">
            <span className="eyebrow mb-[var(--space-3)] inline-block">
              {isEs ? "Siete canales" : "Seven channels"}
            </span>
            <h2 className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Conecta cada canal en{" "}
                  <span className="text-gradient">menos de un minuto.</span>
                </>
              ) : (
                <>
                  Connect every channel in{" "}
                  <span className="text-gradient">under a minute.</span>
                </>
              )}
            </h2>
            <p className="mx-auto mt-[var(--space-3)] max-w-xl text-[15px] text-[var(--fg-muted)]">
              {isEs
                ? "OAuth nativo. Sync bidireccional. Sin app passwords, sin Zapier en medio. Si cierras la cuenta, los mensajes siguen en tu workspace."
                : "Native OAuth. Bi-directional sync. No app passwords, no Zapier middleman. If you close the account, messages stay in your workspace."}
            </p>
          </div>

          <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3">
            {channels.map((c, i) => {
              const Icon = c.icon;
              return (
                <RevealOnScroll
                  key={c.name}
                  direction="up"
                  distance={14}
                  delay={i * 0.05}
                  duration={0.5}
                  className="lozenge inline-flex animate-breathe items-center gap-2.5 px-4 py-2.5 text-[13.5px] font-semibold text-[var(--fg)]"
                  style={{
                    animationDelay: `${i * -0.7}s`,
                    animationDuration: `${8 + (i % 3)}s`,
                  }}
                >
                  <span
                    aria-hidden
                    className="grid h-7 w-7 place-items-center rounded-full text-white"
                    style={{ background: c.tint }}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </span>
                  {c.name}
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Triage demo split — copy + MediaSlot
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="grid items-center gap-[var(--space-10)] lg:grid-cols-[1.2fr_1fr]">
            <RevealOnScroll
              direction="up"
              distance={20}
              duration={0.7}
              className="relative isolate"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-65 blur-3xl"
                style={{ background: "var(--gradient-glow)" }}
              />
              <MediaSlot
                name="product/inbox/triage"
                aspect="16/10"
                radius="84px 64px 96px 60px / 60px 96px 64px 84px"
              />
            </RevealOnScroll>

            <RevealOnScroll
              direction="up"
              distance={20}
              delay={0.1}
              duration={0.7}
            >
              <span className="eyebrow-pill inline-flex">
                <span
                  aria-hidden
                  className="grid h-4 w-4 place-items-center rounded-full text-white"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <Filter className="h-2.5 w-2.5" strokeWidth={2.4} />
                </span>
                <span>{isEs ? "Triage por IA" : "AI triage"}</span>
              </span>
              <h2 className="mt-3 font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
                {isEs ? (
                  <>
                    La IA decide{" "}
                    <span className="text-gradient">qué importa primero.</span>
                  </>
                ) : (
                  <>
                    AI decides{" "}
                    <span className="text-gradient">what matters first.</span>
                  </>
                )}
              </h2>
              <p className="mt-4 text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
                {isEs
                  ? "Cada mensaje se clasifica antes de que abras la bandeja. Urgente arriba. FYI agrupado. Spam fuera. La precisión sube a 97% en la segunda semana porque aprende de tus patrones reales — no de defaults genéricos."
                  : "Every message gets classified before you open the inbox. Urgent on top. FYI grouped. Spam out. Accuracy reaches 97% by week 2 because it learns from your real patterns — not generic defaults."}
              </p>
              <ul className="mt-5 flex flex-col gap-2">
                {(isEs
                  ? [
                      "Urgente · Esperando · FYI · Spam — 4 categorías",
                      "Aprende de tus archivos, no de tutoriales",
                      "Sub-200 ms por mensaje incluso en cola",
                      "Override manual — el modelo aprende del ajuste",
                    ]
                  : [
                      "Urgent · Awaiting · FYI · Spam — 4 categories",
                      "Learns from your archive, not from tutorials",
                      "Sub-200ms per message even in queue",
                      "Manual override — the model learns from the fix",
                    ]
                ).map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2.5 text-[14.5px] text-[var(--fg-secondary)]"
                  >
                    <span
                      aria-hidden
                      className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full text-white"
                      style={{ background: "var(--gradient-hero)" }}
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Triage performance stats
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mb-[var(--space-10)] text-center">
            <span className="eyebrow-pill inline-flex">
              <span
                aria-hidden
                className="grid h-4 w-4 place-items-center rounded-full text-white"
                style={{ background: "var(--gradient-hero)" }}
              >
                <Clock className="h-2.5 w-2.5" strokeWidth={2.4} />
              </span>
              <span>{isEs ? "Lo que recuperas" : "What you get back"}</span>
            </span>
            <h2 className="mt-[var(--space-4)] font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Menos tiempo en inbox,{" "}
                  <span className="text-gradient">más tiempo en trabajo real.</span>
                </>
              ) : (
                <>
                  Less time in inbox,{" "}
                  <span className="text-gradient">more time on real work.</span>
                </>
              )}
            </h2>
          </div>
          <ul className="grid grid-cols-2 gap-[var(--space-8)] sm:grid-cols-4">
            {triageStats.map((s, i) => {
              const tints = ["#ff8dda", "#a88cff", "#38e4ff", "#34c79a"];
              return (
                <RevealOnScroll
                  key={s.label}
                  direction="up"
                  distance={16}
                  delay={i * 0.07}
                  duration={0.6}
                  className="relative flex flex-col items-center gap-2 text-center"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-0 -z-10 h-32 w-32 -translate-x-1/2 -translate-y-6 rounded-full opacity-50 blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${tints[i]}55, transparent 65%)`,
                    }}
                  />
                  <div
                    className="font-display text-[clamp(40px,5vw,72px)] leading-[0.9] tracking-[-0.055em] animate-breathe"
                    style={{
                      background: `linear-gradient(135deg, ${tints[i]}, var(--c-violet))`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animationDelay: `${i * -1.4}s`,
                    }}
                  >
                    {s.value}
                  </div>
                  <p className="text-[13.5px] font-medium leading-snug text-[var(--fg)]">
                    {s.label}
                  </p>
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Capabilities pebble grid
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container size="wide">
          <div className="mb-[var(--space-12)] flex flex-col items-start gap-[var(--space-3)]">
            <span className="eyebrow-pill inline-flex">
              <span className="dot" aria-hidden />
              <span>{isEs ? "Capacidades" : "Capabilities"}</span>
            </span>
            <h2 className="max-w-3xl font-display text-[clamp(36px,5vw,64px)] leading-[1.04] tracking-[-0.045em] text-[var(--fg)] [text-wrap:balance]">
              {isEs ? (
                <>
                  Una bandeja que{" "}
                  <span className="text-gradient">cierra</span> mensajes, no solo
                  los muestra.
                </>
              ) : (
                <>
                  An inbox that{" "}
                  <span className="text-gradient">closes</span> messages — not
                  just shows them.
                </>
              )}
            </h2>
          </div>

          <ul className="grid gap-[var(--space-6)] md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              const radii = [
                "64px 96px 60px 84px / 84px 60px 96px 64px",
                "96px 60px 84px 64px / 60px 84px 64px 96px",
                "84px 96px 64px 60px / 60px 96px 64px 84px",
                "60px 84px 96px 60px / 96px 84px 60px 96px",
                "96px 60px 60px 84px / 84px 60px 96px 60px",
                "84px 64px 96px 84px / 60px 96px 64px 84px",
              ];
              return (
                <RevealOnScroll
                  key={c.title}
                  direction="up"
                  distance={18}
                  delay={i * 0.06}
                  duration={0.7}
                  className="group relative isolate flex flex-col gap-3 overflow-hidden bg-white p-7 transition-transform duration-[var(--duration-base)] hover:-translate-y-1.5"
                  style={{ borderRadius: radii[i] }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-50 blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${c.tint}45, transparent 65%)`,
                    }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-[-30%] -left-1/3 w-2/3 animate-sheen-wave"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
                      animationDuration: "14s",
                      animationDelay: `${i * -2}s`,
                      mixBlendMode: "soft-light",
                    }}
                  />
                  <span
                    aria-hidden
                    className="grid h-12 w-12 place-items-center rounded-full text-white"
                    style={{ background: c.tint }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-[clamp(20px,2vw,24px)] leading-tight tracking-[-0.025em]">
                    {c.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.55] text-[var(--fg-muted)]">
                    {c.body}
                  </p>
                  <div className="mt-auto pt-2 font-mono text-[11px] text-[var(--fg-subtle)]">
                    {c.detail}
                  </div>
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          Closing pill
          ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-20)]">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-[var(--space-4)] text-center">
            <h3 className="font-display text-[clamp(24px,3vw,36px)] leading-tight tracking-[-0.03em] [text-wrap:balance]">
              {isEs
                ? "Conecta tu Gmail en 30 segundos."
                : "Connect your Gmail in 30 seconds."}
            </h3>
            <Link
              href={`${lp}/request-access`}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--gradient-hero)" }}
            >
              {isEs ? "Empezar con Inbox" : "Start with Inbox"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
