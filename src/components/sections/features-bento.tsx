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
import { GradientPlaceholder } from "@/components/media/gradient-placeholder";
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
    <section className="container-wide section">
      <div className="mb-12 flex flex-col items-start gap-3 lg:items-center lg:text-center">
        <span className="eyebrow">{dict.home.what.eyebrow}</span>
        <h2 className="max-w-3xl font-display text-[var(--fs-h2)] leading-tight tracking-tight">
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
            <span className="font-display text-[clamp(56px,7vw,96px)]">
              <Sparkles className="mb-2 inline-block h-8 w-8 text-[var(--primary)]" />
              <br />
              {isEs ? "Habla. Y se hace." : "Speak. Done."}
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
              caption="Tasks board screenshot"
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
            <div className="flex justify-center">
              <Smartphone
                aria-hidden
                className="mx-auto h-32 w-32 text-[var(--primary)] opacity-60"
              />
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
            <div className="grid grid-cols-2 gap-2 opacity-90">
              <Inbox className="h-10 w-10 text-[var(--primary)]" />
              <ListChecks className="h-10 w-10 text-[var(--accent)]" />
              <ScrollText className="h-10 w-10 text-[var(--success)]" />
              <Zap className="h-10 w-10 text-[var(--warning)]" />
            </div>
          }
          visualPosition="side"
          href={`${lp}/product/inbox`}
          ctaLabel={dict.common.learnMore}
        />

        <BentoCard
          size="small"
          eyebrow={isEs ? "Precio" : "Pricing"}
          title="$3"
          description={
            isEs ? "USD por usuario al mes. Sin tiers." : "USD per seat per month. No tiers."
          }
          gradient
          href={`${lp}/pricing`}
          ctaLabel={isEs ? "Ver pricing" : "See pricing"}
        />

        <BentoCard
          size="full"
          eyebrow={isEs ? "Manifiesto" : "Manifesto"}
          title={
            <span className="text-gradient">
              {isEs
                ? "Construido para empresas que valoran su tiempo"
                : "Built for companies that value their time"}
            </span>
          }
          description={
            isEs
              ? "Cero context switching. Una sola plataforma. Tu equipo, más rápido."
              : "Zero context switching. One single platform. Your team, faster."
          }
          gradient
        />
      </BentoGrid>
    </section>
  );
}
