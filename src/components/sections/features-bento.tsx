import {
  Cpu,
  Globe2,
  Inbox,
  Layers,
  ListChecks,
  ScrollText,
  Shield,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { RevealOnScroll } from "@/components/animations/reveal-on-scroll";
import { BentoGrid } from "@/components/bento/bento-grid";
import { BentoCard } from "@/components/bento/bento-card";
import { Container } from "@/components/layout/container";
import { MediaSlot } from "@/components/media/media-slot";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";

type FeaturesBentoProps = {
  locale: Locale;
  dict: Dictionary;
};

export function FeaturesBento({ locale, dict }: FeaturesBentoProps) {
  const lp = `/${locale}`;
  const isEs = locale === "es";

  return (
    <section className="section relative isolate overflow-hidden bg-white">
      <Container size="wide" className="relative">
        <div className="mx-auto mb-[var(--space-12)] flex max-w-[820px] flex-col items-center gap-[var(--space-3)] text-center">
          <span className="eyebrow-pill inline-flex">
            <span className="dot" aria-hidden />
            <span>{dict.home.what.eyebrow}</span>
          </span>
          <h2 className="font-display text-[clamp(40px,6vw,84px)] leading-[1.02] tracking-[-0.05em] text-[var(--fg)] [text-wrap:balance]">
            {isEs ? (
              <>
                Cuatro productos.{" "}
                <span className="text-gradient">Un workspace.</span> Cero
                context-switching.
              </>
            ) : (
              <>
                Four products.{" "}
                <span className="text-gradient">One workspace.</span> Zero
                context-switching.
              </>
            )}
          </h2>
          <p className="max-w-[600px] text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
            {isEs
              ? "Tasks, Docs, Inbox y Co-Pilot — diseñados para hablar entre sí, no para vivir en pestañas distintas."
              : "Tasks, Docs, Inbox and Co-Pilot — built to talk to each other, not to live in separate tabs."}
          </p>
        </div>

        <RevealOnScroll direction="up" distance={24} duration={0.7}>
          <BentoGrid>
            <BentoCard
              size="large"
              eyebrow={dict.nav.productAi}
              title={
                <span>
                  {isEs ? "Habla. Decide. " : "Speak. Decide. "}
                  <span className="text-gradient">
                    {isEs ? "Y se hace." : "Done."}
                  </span>
                </span>
              }
              description={
                isEs
                  ? "El Co-Piloto entiende contexto en tareas, docs y bandeja, y propone el siguiente paso. Tú decides."
                  : "Co-Pilot reads context across tasks, docs, and inbox to propose the next move. You stay in control."
              }
              visual={
                <MediaSlot
                  name="bento/copilot"
                  aspect="16/10"
                  radius="40px 64px 48px 56px / 56px 40px 64px 48px"
                />
              }
              visualPosition="below"
              href={`${lp}/product/ai-copilot`}
              ctaLabel={dict.common.learnMore}
            />

            <BentoCard
              size="small"
              eyebrow={isEs ? "Velocidad" : "Speed"}
              title={
                <span className="block font-display leading-[1.1]">
                  <span
                    className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    <Zap className="h-6 w-6" />
                  </span>
                  <span className="block">
                    {isEs ? "Habla." : "Speak."}{" "}
                    <span className="text-gradient">
                      {isEs ? "Y se hace." : "Done."}
                    </span>
                  </span>
                </span>
              }
              description={
                isEs
                  ? "De idea a tarea creada en segundos."
                  : "Idea to created task in seconds."
              }
            />

            <BentoCard
              size="wide"
              eyebrow={dict.nav.productTasks}
              title={isEs ? "Tableros que tu equipo usa" : "Boards teams actually use"}
              description={
                isEs
                  ? "Listas, tableros, timelines y dependencias. Cada vista renderea en menos de 100ms."
                  : "Lists, boards, timelines, dependencies. Every view paints in under 100ms."
              }
              visual={
                <MediaSlot
                  name="bento/tasks"
                  aspect="3/2"
                  radius="60px 40px 56px 48px / 48px 56px 40px 60px"
                />
              }
              visualPosition="side"
              href={`${lp}/product/tasks`}
              ctaLabel={dict.common.learnMore}
            />

            <BentoCard
              size="tall"
              eyebrow={isEs ? "Móvil" : "Mobile"}
              title={isEs ? "Donde sea que trabajes" : "Wherever you work"}
              description={
                isEs
                  ? "Apps nativas iOS, iPad, Android, macOS, Windows, Linux."
                  : "Native iOS, iPad, Android, macOS, Windows, Linux apps."
              }
              visual={
                <MediaSlot
                  name="bento/mobile"
                  aspect="1/1"
                  radius="56px 40px 64px 48px / 48px 64px 40px 56px"
                  caption={isEs ? "Family shot de devices" : "Family shot of devices"}
                />
              }
              visualPosition="above"
            />

            <BentoCard
              size="wide"
              eyebrow={dict.nav.productInbox}
              title={isEs ? "Una bandeja para todo" : "One inbox for everything"}
              description={
                isEs
                  ? "Email, Slack, Teams, WhatsApp — clasificado por IA y con respuestas sugeridas."
                  : "Email, Slack, Teams, WhatsApp — AI-classified with suggested replies."
              }
              visual={
                <MediaSlot
                  name="bento/inbox"
                  aspect="3/2"
                  radius="48px 56px 40px 64px / 64px 40px 56px 48px"
                />
              }
              visualPosition="side"
              href={`${lp}/product/inbox`}
              ctaLabel={dict.common.learnMore}
            />

            <BentoCard
              size="small"
              eyebrow={isEs ? "Precio" : "Pricing"}
              title={
                <span className="block font-display leading-[0.95]">
                  <span className="text-gradient text-[clamp(64px,8vw,108px)]">
                    $3
                  </span>
                  <span className="mt-2 block text-[clamp(16px,1.4vw,20px)] font-medium tracking-normal text-[var(--fg-muted)]">
                    {isEs
                      ? "USD por usuario / mes"
                      : "USD per seat / month"}
                  </span>
                </span>
              }
              description={
                isEs
                  ? "Sin tiers. Sin features bloqueadas. Sin sorpresas."
                  : "No tiers. No locked features. No surprises."
              }
              href={`${lp}/pricing`}
              ctaLabel={isEs ? "Ver pricing" : "See pricing"}
            />

            {/* Manifesto tile — full-width row with halos that intentionally
                bleed BEYOND the tile, so the glow no longer reads as "cut".
                Rendered inline (not as a BentoCard) so we can set
                overflow-visible and place the gradient orbs outside the
                bounded rectangle. */}
            <div className="relative sm:col-span-4 lg:col-span-12 lg:row-span-1">
              {/* Halos extend ~25% beyond the tile in every direction.
                  Sit at -z-10 so the text inside the tile stays on top. */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-[20%] -inset-y-[60%] -z-10"
              >
                <div
                  aria-hidden
                  className="absolute left-[10%] top-[20%] h-[60%] w-[40%] rounded-full opacity-70 blur-3xl animate-breathe"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,141,218,0.45), transparent 65%)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute right-[8%] top-[10%] h-[70%] w-[42%] rounded-full opacity-70 blur-3xl animate-breathe"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(56,228,255,0.40), transparent 65%)",
                    animationDelay: "-2.5s",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute left-[35%] bottom-[5%] h-[60%] w-[38%] rounded-full opacity-75 blur-3xl animate-breathe"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(168,140,255,0.45), transparent 65%)",
                    animationDelay: "-4s",
                  }}
                />
              </div>

              {/* The tile itself — no overflow-hidden, no shadow, just an
                  organic rounded shape sitting on top of the halos. */}
              <div
                className="relative flex min-h-[240px] flex-col justify-center bg-white p-[var(--space-8)] lg:p-[var(--space-12)]"
                style={{
                  borderRadius:
                    "96px 64px 84px 72px / 72px 84px 64px 96px",
                }}
              >
                <span className="eyebrow mb-[var(--space-3)]">
                  {isEs ? "Manifiesto" : "Manifesto"}
                </span>
                <h3 className="font-display text-[clamp(28px,3.5vw,48px)] leading-[1.05] tracking-[-0.04em] text-[var(--fg)] [text-wrap:balance]">
                  {isEs ? (
                    <>
                      Construido para empresas que valoran su{" "}
                      <span className="text-gradient">tiempo</span>
                    </>
                  ) : (
                    <>
                      Built for companies that value their{" "}
                      <span className="text-gradient">time</span>
                    </>
                  )}
                </h3>
                <p className="mt-[var(--space-3)] max-w-[640px] text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
                  {isEs
                    ? "Cero context switching. Una sola plataforma. Tu equipo, más rápido."
                    : "Zero context switching. One single platform. Your team, faster."}
                </p>
              </div>
            </div>
          </BentoGrid>
        </RevealOnScroll>

        {/* "Todo incluido" callout — featured moment with halos that
            bleed beyond the container, large gradient heading, and
            prominent icon pills. */}
        <RevealOnScroll
          direction="up"
          distance={20}
          duration={0.7}
          className="relative mt-[var(--space-20)]"
        >
          {/* Halos extending beyond the callout */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-[10%] -inset-y-[50%] -z-10"
          >
            <div
              aria-hidden
              className="absolute left-[15%] top-[20%] h-[70%] w-[36%] rounded-full opacity-65 blur-3xl animate-breathe"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,141,218,0.40), transparent 65%)",
              }}
            />
            <div
              aria-hidden
              className="absolute right-[12%] top-[15%] h-[80%] w-[40%] rounded-full opacity-65 blur-3xl animate-breathe"
              style={{
                background:
                  "radial-gradient(circle, rgba(56,228,255,0.38), transparent 65%)",
                animationDelay: "-2.5s",
              }}
            />
            <div
              aria-hidden
              className="absolute left-[38%] bottom-[10%] h-[70%] w-[34%] rounded-full opacity-70 blur-3xl animate-breathe"
              style={{
                background:
                  "radial-gradient(circle, rgba(168,140,255,0.42), transparent 65%)",
                animationDelay: "-4.5s",
              }}
            />
          </div>

          <div
            className="relative flex flex-col items-center gap-[var(--space-8)] bg-white px-[var(--space-8)] py-[var(--space-16)] text-center md:px-[var(--space-16)]"
            style={{
              borderRadius:
                "120px 64px 96px 80px / 80px 96px 64px 120px",
            }}
          >
            <span className="eyebrow-pill inline-flex">
              <span className="dot" aria-hidden />
              <span>{isEs ? "Todo incluido" : "All included"}</span>
            </span>

            <h3 className="max-w-[820px] font-display text-[clamp(32px,4.5vw,64px)] leading-[1.04] tracking-[-0.045em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Una sola plataforma.{" "}
                  <span className="text-gradient animate-gradient">
                    Cero upgrades
                  </span>{" "}
                  para desbloquear lo básico.
                </>
              ) : (
                <>
                  One platform.{" "}
                  <span className="text-gradient animate-gradient">
                    Zero upgrades
                  </span>{" "}
                  to unlock the basics.
                </>
              )}
            </h3>

            <div className="flex max-w-[760px] flex-wrap items-center justify-center gap-2.5">
              {[
                { icon: Sparkles, label: "Co-Pilot" },
                { icon: ListChecks, label: isEs ? "Tareas" : "Tasks" },
                { icon: ScrollText, label: "Docs" },
                { icon: Inbox, label: "Inbox" },
                { icon: Wand2, label: isEs ? "Automations" : "Automations" },
                { icon: Cpu, label: "API" },
                { icon: Layers, label: "Forms" },
                { icon: Shield, label: "SSO" },
                { icon: Globe2, label: "i18n" },
              ].map((c, i) => (
                <span
                  key={c.label}
                  className="inline-flex animate-breathe items-center gap-2 rounded-full bg-[#fafbfc] px-4 py-2 text-[13px] font-medium text-[var(--fg)]"
                  style={{
                    animationDelay: `${i * -0.5}s`,
                    animationDuration: `${8 + (i % 3)}s`,
                  }}
                >
                  <span
                    aria-hidden
                    className="grid h-5 w-5 place-items-center rounded-full text-white"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    <c.icon className="h-3 w-3" strokeWidth={2} />
                  </span>
                  {c.label}
                </span>
              ))}
            </div>

            <Link
              href={`${lp}/product`}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--gradient-hero)" }}
            >
              {isEs ? "Ver producto" : "See product"}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

