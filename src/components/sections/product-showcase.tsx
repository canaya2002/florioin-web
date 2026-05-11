"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  CheckCircle2,
  Inbox,
  ListChecks,
  ScrollText,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/container";
import { MediaSlot } from "@/components/media/media-slot";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Locale } from "@/i18n/locales";
import { track } from "@/lib/analytics";

type ProductShowcaseProps = {
  locale: Locale;
};

type TabKey = "ai" | "tasks" | "docs" | "inbox";

export function ProductShowcase({ locale }: ProductShowcaseProps) {
  const isEs = locale === "es";
  const reduced = useReducedMotion();
  const [tab, setTab] = useState<TabKey>("ai");
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Subtle scroll-bound parallax — the media stage rises ~30px as it
  // moves through the viewport, giving the whole section a sense of
  // depth without distracting from the content.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const stageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    if (reduced || paused) return;
    const order: TabKey[] = ["ai", "tasks", "docs", "inbox"];
    const id = window.setInterval(() => {
      setTab((current) => {
        const i = order.indexOf(current);
        const next = order[(i + 1) % order.length];
        track("product.showcase_tab_change", { tab: next, auto: true });
        return next;
      });
    }, 6500);
    return () => window.clearInterval(id);
  }, [reduced, paused]);

  const tabs: {
    key: TabKey;
    label: string;
    icon: typeof Sparkles;
    copy: string;
    asset: string;
  }[] = [
    {
      key: "ai",
      label: "Co-Pilot",
      icon: Sparkles,
      copy: isEs
        ? "Habla. El Co-Pilot lee tu workspace y propone el siguiente paso. Con fuentes citadas."
        : "Speak. Co-Pilot reads your workspace and proposes the next move. With cited sources.",
      asset: "showcase/copilot",
    },
    {
      key: "tasks",
      label: isEs ? "Tareas" : "Tasks",
      icon: ListChecks,
      copy: isEs
        ? "Listas, tableros y timelines que renderean en menos de 100 ms. Dependencias reales."
        : "Lists, boards, and timelines that paint in under 100 ms. Real dependencies.",
      asset: "showcase/tasks",
    },
    {
      key: "docs",
      label: "Docs",
      icon: ScrollText,
      copy: isEs
        ? "Editor block-based, comentarios, plantillas y búsqueda conectada a todo tu workspace."
        : "Block-based editor, comments, templates and search connected to your whole workspace.",
      asset: "showcase/docs",
    },
    {
      key: "inbox",
      label: "Inbox",
      icon: Inbox,
      copy: isEs
        ? "Email, Slack, Teams y WhatsApp — clasificados por IA, con respuestas en un click."
        : "Email, Slack, Teams, and WhatsApp — AI-classified with one-click replies.",
      asset: "showcase/inbox",
    },
  ];

  const current = tabs.find((t) => t.key === tab)!;

  return (
    <section
      id="showcase"
      className="section relative isolate overflow-hidden bg-white scroll-mt-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container size="wide">
        <div className="mx-auto mb-[var(--space-12)] flex max-w-[860px] flex-col items-center gap-[var(--space-3)] text-center">
          <span className="eyebrow-pill inline-flex">
            <span className="dot" aria-hidden />
            <span>{isEs ? "Producto en vivo" : "The product, live"}</span>
          </span>
          <h2 className="font-display text-[clamp(40px,6vw,84px)] leading-[1.02] tracking-[-0.05em] text-[var(--fg)] [text-wrap:balance]">
            {isEs ? (
              <>
                Una superficie.{" "}
                <span className="text-gradient">Cuatro superpoderes.</span>
              </>
            ) : (
              <>
                One surface.{" "}
                <span className="text-gradient">Four superpowers.</span>
              </>
            )}
          </h2>
          <p className="max-w-[640px] text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
            {isEs
              ? "Pasa por cada módulo. Mismo workspace, misma data, cero context-switching."
              : "Move through every module. Same workspace, same data, zero context-switching."}
          </p>
        </div>

        {/* Tab strip — fits its content, single row, centered */}
        <div className="mb-[var(--space-10)] flex justify-center">
          <div
            className="inline-flex items-center gap-1.5 rounded-full bg-[#fafbfc] p-1.5"
            role="tablist"
          >
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setTab(t.key);
                    setPaused(true);
                    track("product.showcase_tab_change", {
                      tab: t.key,
                      auto: false,
                    });
                  }}
                  className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-[var(--duration-fast)] sm:px-5 sm:py-2.5 sm:text-[13.5px] ${
                    active
                      ? "text-white"
                      : "text-[var(--fg-secondary)] hover:text-[var(--fg)]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="product-tab-pill"
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ background: "var(--gradient-hero)" }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage — ONE AnimatePresence wraps media + side text so they
            swap atomically. Scroll-bound parallax on the whole stage. */}
        <motion.div
          ref={stageRef}
          className="relative mx-auto max-w-[1180px]"
          style={reduced ? undefined : { y: stageY }}
        >
          {/* Colored halo (light, not shadow) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -bottom-10 -top-6 -z-10 opacity-60 blur-3xl"
            style={{ background: "var(--gradient-glow)" }}
          />

          {/* Reserve height so swap doesn't reflow the page */}
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                className="grid items-center gap-[var(--space-10)] lg:grid-cols-[1.5fr_1fr]"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <MediaSlot
                  name={current.asset}
                  aspect="16/10"
                  radius="var(--radius-2xl)"
                />

                {/* Side commentary — same motion.div, swaps in sync */}
                <div className="flex flex-col gap-[var(--space-3)]">
                  <span className="eyebrow">{current.label}</span>
                  <h3 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.08] tracking-[-0.035em] text-[var(--fg)]">
                    {current.copy}
                  </h3>
                  <ul className="mt-2 flex flex-col gap-2 text-[14.5px] text-[var(--fg-secondary)]">
                    {bullets(tab, isEs).map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span
                          aria-hidden
                          className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full"
                          style={{ background: "var(--gradient-hero)" }}
                        >
                          <CheckCircle2 className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function bullets(tab: TabKey, isEs: boolean): string[] {
  if (tab === "ai") {
    return isEs
      ? [
          "RAG sobre tu workspace, no sobre internet",
          "Tool use real: crea tareas, edita docs, manda respuestas",
          "Modelos múltiples — usa el adecuado por tarea",
        ]
      : [
          "RAG over your workspace, not over the internet",
          "Real tool use: creates tasks, edits docs, sends replies",
          "Multi-model — use the right one per task",
        ];
  }
  if (tab === "tasks") {
    return isEs
      ? [
          "List, Board, Timeline, Gantt y Calendar",
          "Dependencias y workload por persona",
          "Cada vista renderea en menos de 100 ms",
        ]
      : [
          "List, Board, Timeline, Gantt and Calendar",
          "Dependencies and per-person workload",
          "Every view paints in under 100 ms",
        ];
  }
  if (tab === "docs") {
    return isEs
      ? [
          "Editor block-based con comentarios en línea",
          "Plantillas, versionado y links bidireccionales",
          "Búsqueda semántica sobre todo el workspace",
        ]
      : [
          "Block-based editor with inline comments",
          "Templates, versioning and bidirectional links",
          "Semantic search across the entire workspace",
        ];
  }
  return isEs
    ? [
        "Email, Slack, Teams, WhatsApp en un solo feed",
        "Clasificación por IA con prioridad sugerida",
        "Respuestas en un click — o convierte en tarea",
      ]
    : [
        "Email, Slack, Teams, WhatsApp in a single feed",
        "AI classification with suggested priority",
        "One-click replies — or convert into a task",
      ];
}
