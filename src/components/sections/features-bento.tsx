"use client";

import { motion } from "framer-motion";
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
import { ParallaxLayer } from "@/components/animations/parallax-section";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/scroll-reveal";
import { Container } from "@/components/layout/container";
import { GradientPlaceholder } from "@/components/media/gradient-placeholder";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";

type FeaturesBentoProps = {
  locale: Locale;
  dict: Dictionary;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function FeaturesBento({ locale, dict }: FeaturesBentoProps) {
  const lp = `/${locale}`;
  const isEs = locale === "es";

  return (
    <section className="relative isolate overflow-hidden section">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxLayer speed={0.3} className="absolute inset-0">
          <motion.div
            className="absolute left-[5%] top-[10%] h-[500px] w-[500px] rounded-full opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(168, 140, 255, 0.2) 0%, transparent 70%)",
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.5} className="absolute inset-0">
          <motion.div
            className="absolute right-[10%] bottom-[20%] h-[400px] w-[400px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(56, 228, 255, 0.2) 0%, transparent 70%)",
            }}
            animate={{
              x: [0, -25, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </ParallaxLayer>
      </div>

      <Container size="wide" className="relative">
        {/* Section header */}
        <ScrollReveal variant="fade-up" className="mx-auto mb-[var(--space-16)] flex max-w-[760px] flex-col items-center gap-[var(--space-4)] text-center">
          <motion.span 
            className="eyebrow-pill"
            whileHover={{ scale: 1.02 }}
          >
            <span className="dot" aria-hidden />
            {dict.home.what.eyebrow}
          </motion.span>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.035em]">
            {dict.home.what.title}
          </h2>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.08}>
          <BentoGrid>
            {/* AI Co-Pilot - Large card */}
            <StaggerItem>
              <BentoCard
                size="large"
                eyebrow={dict.nav.productAi}
                title={
                  <span>
                    {isEs ? "Habla. Decide. " : "Speak. Decide. "}
                    <span className="text-gradient-animated">
                      {isEs ? "Y se hace." : "Done."}
                    </span>
                  </span>
                }
                description={
                  isEs
                    ? "El Co-Piloto entiende contexto en tareas, docs y bandeja, y propone el siguiente paso. Tu decides."
                    : "Co-Pilot reads context across tasks, docs, and inbox to propose the next move. You stay in control."
                }
                visual={
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  >
                    <GradientPlaceholder
                      className="aspect-[16/10] rounded-[var(--radius-lg)]"
                      variant="dawn"
                      caption="AI Co-Pilot · video demo"
                    />
                  </motion.div>
                }
                visualPosition="below"
                href={`${lp}/product/ai-copilot`}
                ctaLabel={dict.common.learnMore}
                tilt
                spotlight
              />
            </StaggerItem>

            {/* Speed card - Small */}
            <StaggerItem>
              <BentoCard
                size="small"
                eyebrow={isEs ? "Velocidad" : "Speed"}
                title={
                  <span className="block font-display leading-[1.1]">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Sparkles
                        aria-hidden
                        className="mb-3 inline-block h-9 w-9 text-[var(--primary)]"
                      />
                    </motion.div>
                    <span className="block">
                      {isEs ? "Habla." : "Speak."}{" "}
                      <span className="text-gradient-animated">
                        {isEs ? "Y se hace." : "Done."}
                      </span>
                    </span>
                  </span>
                }
                gradient
                tilt
              />
            </StaggerItem>

            {/* Tasks - Wide card */}
            <StaggerItem>
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
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  >
                    <GradientPlaceholder
                      className="aspect-[3/2] rounded-[var(--radius-lg)]"
                      variant="violet"
                      caption="Tasks board"
                    />
                  </motion.div>
                }
                visualPosition="side"
                href={`${lp}/product/tasks`}
                ctaLabel={dict.common.learnMore}
                tilt
                spotlight
              />
            </StaggerItem>

            {/* Mobile - Tall card */}
            <StaggerItem>
              <BentoCard
                size="tall"
                eyebrow={isEs ? "Movil" : "Mobile"}
                title={isEs ? "Donde sea que trabajes" : "Wherever you work"}
                description={
                  isEs
                    ? "Apps nativas iOS, iPad, Android, macOS, Windows, Linux."
                    : "Native iOS, iPad, Android, macOS, Windows, Linux apps."
                }
                visual={
                  <div className="flex flex-1 items-center justify-center">
                    <motion.div 
                      className="relative"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <motion.div
                        aria-hidden
                        className="absolute -inset-6 rounded-full opacity-60 blur-2xl"
                        style={{ background: "var(--gradient-hero)" }}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div 
                        className="relative flex h-32 w-32 items-center justify-center rounded-[28%] border border-[var(--border-glass)] bg-[var(--glass-strong)] backdrop-blur-[var(--blur-glass)]"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Smartphone
                          aria-hidden
                          className="h-14 w-14 text-[var(--primary)]"
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                }
                visualPosition="above"
                tilt
              />
            </StaggerItem>

            {/* Inbox - Wide card */}
            <StaggerItem>
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
                    <IconTile icon={Inbox} tint="pink" delay={0} />
                    <IconTile icon={ListChecks} tint="violet" delay={0.1} />
                    <IconTile icon={ScrollText} tint="cyan" delay={0.2} />
                    <IconTile icon={Zap} tint="magenta" delay={0.3} />
                  </div>
                }
                visualPosition="side"
                href={`${lp}/product/inbox`}
                ctaLabel={dict.common.learnMore}
                tilt
                spotlight
              />
            </StaggerItem>

            {/* Pricing - Small card */}
            <StaggerItem>
              <BentoCard
                size="small"
                eyebrow={isEs ? "Precio" : "Pricing"}
                title={
                  <span className="block font-display leading-[0.95]">
                    <motion.span 
                      className="text-gradient-animated text-[clamp(64px,8vw,108px)] inline-block"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      $3
                    </motion.span>
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
                tilt
              />
            </StaggerItem>

            {/* Manifesto - Full width card */}
            <StaggerItem>
              <BentoCard
                size="full"
                eyebrow={isEs ? "Manifiesto" : "Manifesto"}
                title={
                  isEs ? (
                    <span>
                      Construido para empresas que valoran su{" "}
                      <span className="text-gradient-animated">tiempo</span>
                    </span>
                  ) : (
                    <span>
                      Built for companies that value their{" "}
                      <span className="text-gradient-animated">time</span>
                    </span>
                  )
                }
                description={
                  isEs
                    ? "Cero context switching. Una sola plataforma. Tu equipo, mas rapido."
                    : "Zero context switching. One single platform. Your team, faster."
                }
                gradient
                tilt={false}
              />
            </StaggerItem>
          </BentoGrid>
        </StaggerContainer>
      </Container>
    </section>
  );
}

function IconTile({
  icon: Icon,
  tint,
  delay = 0,
}: {
  icon: typeof Inbox;
  tint: "pink" | "violet" | "cyan" | "magenta";
  delay?: number;
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
    <motion.div
      className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-glass)] backdrop-blur-[var(--blur-glass-soft)] transition-all duration-300 hover:scale-110 hover:shadow-[var(--shadow-lg)]"
      style={{ background: tintBg[tint] }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: EASE_OUT_EXPO }}
      whileHover={{ rotate: [0, -5, 5, 0] }}
    >
      <Icon
        aria-hidden
        className="h-7 w-7 text-[var(--fg-secondary)]"
        strokeWidth={1.6}
      />
    </motion.div>
  );
}
