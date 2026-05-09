import {
  Inbox,
  ListChecks,
  ScrollText,
  Sparkles,
  Smartphone,
  Zap,
} from "lucide-react";

import { BentoCard } from "@/components/bento/bento-card";
import { BentoGrid } from "@/components/bento/bento-grid";
import { Container } from "@/components/layout/container";
import { GradientPlaceholder } from "@/components/media/gradient-placeholder";
import { FloatingBlobs } from "@/components/ui/floating-blobs";
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
    <section className="relative isolate overflow-hidden section">
      <FloatingBlobs variant="subtle" />
      <Container size="wide" className="relative">
        <div className="mx-auto mb-[var(--space-12)] flex max-w-[760px] flex-col items-center gap-[var(--space-3)] text-center">
          <span className="eyebrow">{dict.home.what.eyebrow}</span>
          <h2 className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.035em]">
            {dict.home.what.title}
          </h2>
        </div>

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
              <GradientPlaceholder
                className="aspect-[16/10]"
                variant="dawn"
                caption="AI Co-Pilot · video demo"
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
                <Sparkles
                  aria-hidden
                  className="mb-3 inline-block h-9 w-9 text-[var(--primary)]"
                />
                <span className="block">
                  {isEs ? "Habla." : "Speak."}{" "}
                  <span className="text-gradient">
                    {isEs ? "Y se hace." : "Done."}
                  </span>
                </span>
              </span>
            }
            gradient
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
              <GradientPlaceholder
                className="aspect-[3/2]"
                variant="violet"
                caption="Tasks board"
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
              <div className="flex flex-1 items-center justify-center">
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -inset-6 rounded-full opacity-60 blur-2xl"
                    style={{ background: "var(--gradient-hero)" }}
                  />
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-[28%] border border-[var(--border-glass)] bg-[var(--glass-strong)] backdrop-blur-[var(--blur-glass)]">
                    <Smartphone
                      aria-hidden
                      className="h-14 w-14 text-[var(--primary)]"
                    />
                  </div>
                </div>
              </div>
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
              <div className="grid grid-cols-2 gap-3">
                <IconTile icon={Inbox} tint="pink" />
                <IconTile icon={ListChecks} tint="violet" />
                <IconTile icon={ScrollText} tint="cyan" />
                <IconTile icon={Zap} tint="magenta" />
              </div>
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
            gradient
            href={`${lp}/pricing`}
            ctaLabel={isEs ? "Ver pricing" : "See pricing"}
          />

          <BentoCard
            size="full"
            eyebrow={isEs ? "Manifiesto" : "Manifesto"}
            title={
              isEs ? (
                <span>
                  Construido para empresas que valoran su{" "}
                  <span className="text-gradient">tiempo</span>
                </span>
              ) : (
                <span>
                  Built for companies that value their{" "}
                  <span className="text-gradient">time</span>
                </span>
              )
            }
            description={
              isEs
                ? "Cero context switching. Una sola plataforma. Tu equipo, más rápido."
                : "Zero context switching. One single platform. Your team, faster."
            }
            gradient
          />
        </BentoGrid>
      </Container>
    </section>
  );
}

function IconTile({
  icon: Icon,
  tint,
}: {
  icon: typeof Inbox;
  tint: "pink" | "violet" | "cyan" | "magenta";
}) {
  const tintBg: Record<typeof tint, string> = {
    pink: "linear-gradient(135deg, rgba(255,141,218,0.45), rgba(255,141,218,0.10))",
    violet:
      "linear-gradient(135deg, rgba(168,140,255,0.45), rgba(168,140,255,0.10))",
    cyan: "linear-gradient(135deg, rgba(56,228,255,0.45), rgba(56,228,255,0.10))",
    magenta:
      "linear-gradient(135deg, rgba(242,91,216,0.45), rgba(242,91,216,0.10))",
  };
  return (
    <div
      className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-glass)] backdrop-blur-[var(--blur-glass-soft)]"
      style={{ background: tintBg[tint] }}
    >
      <Icon
        aria-hidden
        className="h-7 w-7 text-[var(--fg-secondary)]"
        strokeWidth={1.6}
      />
    </div>
  );
}
