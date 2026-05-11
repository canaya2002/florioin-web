import {
  ArrowRight,
  Bot,
  Check,
  Cpu,
  Download,
  FileText,
  Globe2,
  Headphones,
  Inbox,
  Layers,
  ListChecks,
  MessageCircleQuestion,
  MoveRight,
  RefreshCw,
  ScrollText,
  Shield,
  Sparkles,
  TriangleAlert,
  Wand2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RevealOnScroll } from "@/components/animations/reveal-on-scroll";
import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd, faqSchema } from "@/components/seo/json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";
import { PRICING } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isEs = locale === "es";
  return pageMetadata({
    locale,
    path: "/pricing",
    title: isEs ? "Precios" : "Pricing",
    description: isEs
      ? "$3 USD por usuario al mes. Sin tiers, sin trucos. Reembolso 100% en 30 días."
      : "$3 USD per user per month. No tiers, no tricks. 100% refund in 30 days.",
  });
}

export default async function PricingPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  // ── Grouped includes (3 categories instead of flat list) ─────────────
  const groupedIncludes = isEs
    ? [
        {
          title: "Producto",
          icon: Sparkles,
          tint: "#ff8dda",
          items: [
            { icon: Bot, label: "Co-Piloto IA (límites razonables)" },
            { icon: ListChecks, label: "Tasks · ilimitados" },
            { icon: ScrollText, label: "Docs · ilimitados" },
            { icon: Inbox, label: "Inbox unificada" },
            { icon: Layers, label: "Forms · Whiteboards · Wikis" },
          ],
        },
        {
          title: "Plataforma",
          icon: Cpu,
          tint: "#a88cff",
          items: [
            { icon: Globe2, label: "Web · iOS · Android · macOS · Win · Linux" },
            { icon: Wand2, label: "200+ integraciones nativas" },
            { icon: Zap, label: "API pública + webhooks" },
            { icon: RefreshCw, label: "Backups diarios · 30 días retención" },
            { icon: FileText, label: "Factura fiscal MX · receipts USD" },
          ],
        },
        {
          title: "Confianza",
          icon: Shield,
          tint: "#38e4ff",
          items: [
            { icon: Shield, label: "SSO / SAML en cada plan" },
            { icon: Shield, label: "RLS multi-tenant" },
            { icon: Shield, label: "Audit logs por defecto" },
            { icon: Headphones, label: "Soporte email · 8h LATAM" },
            { icon: RefreshCw, label: "Reembolso 100% en 30 días" },
          ],
        },
      ]
    : [
        {
          title: "Product",
          icon: Sparkles,
          tint: "#ff8dda",
          items: [
            { icon: Bot, label: "AI Co-Pilot (reasonable limits)" },
            { icon: ListChecks, label: "Tasks · unlimited" },
            { icon: ScrollText, label: "Docs · unlimited" },
            { icon: Inbox, label: "Unified Inbox" },
            { icon: Layers, label: "Forms · Whiteboards · Wikis" },
          ],
        },
        {
          title: "Platform",
          icon: Cpu,
          tint: "#a88cff",
          items: [
            { icon: Globe2, label: "Web · iOS · Android · macOS · Win · Linux" },
            { icon: Wand2, label: "200+ native integrations" },
            { icon: Zap, label: "Public API + webhooks" },
            { icon: RefreshCw, label: "Daily backups · 30-day retention" },
            { icon: FileText, label: "MX fiscal invoice · USD receipts" },
          ],
        },
        {
          title: "Trust",
          icon: Shield,
          tint: "#38e4ff",
          items: [
            { icon: Shield, label: "SSO / SAML on every plan" },
            { icon: Shield, label: "Multi-tenant RLS" },
            { icon: Shield, label: "Audit logs by default" },
            { icon: Headphones, label: "Email support · 8h LATAM" },
            { icon: RefreshCw, label: "100% refund in 30 days" },
          ],
        },
      ];

  // ── Honest "what you don't get" ──────────────────────────────────────
  const notIncluded = isEs
    ? [
        {
          title: "Free trial",
          body: "Cobramos desde día 1. Si no funciona, te reembolsamos 100% en 30 días — esa es nuestra trial.",
        },
        {
          title: "SOC 2 Type II (todavía)",
          body: "Auditoría inicial en Q3 2026. Mientras tanto: arquitectura RLS verificada por tests, encriptación at-rest, NDAs disponibles.",
        },
        {
          title: "Co-Pilot ilimitado",
          body: "Límites razonables por usuario para que un script no te haga gastar miles. Sales-ops calls disponibles para enterprise.",
        },
        {
          title: "Self-hosted / on-prem",
          body: "Por ahora SaaS multi-tenant en US-East y EU-West. Self-hosted enterprise está en roadmap para Q2 2027.",
        },
      ]
    : [
        {
          title: "Free trial",
          body: "We charge from day 1. If it doesn't work, full refund in 30 days — that is our trial.",
        },
        {
          title: "SOC 2 Type II (yet)",
          body: "Initial audit in Q3 2026. In the meantime: tested RLS architecture, encryption at-rest, NDAs available.",
        },
        {
          title: "Unlimited Co-Pilot",
          body: "Reasonable per-user limits so a runaway script doesn't burn thousands. Sales-ops calls available for enterprise.",
        },
        {
          title: "Self-hosted / on-prem",
          body: "For now, multi-tenant SaaS in US-East and EU-West. Self-hosted enterprise is on the Q2 2027 roadmap.",
        },
      ];

  // ── ROI examples by team size ────────────────────────────────────────
  const roiExamples = [
    { seats: 10, oldStack: 1400, color: "#ff8dda" },
    { seats: 50, oldStack: 7000, color: "#a88cff" },
    { seats: 200, oldStack: 28000, color: "#38e4ff" },
  ];

  // ── Comparison strip ─────────────────────────────────────────────────
  const compareRow = isEs
    ? [
        { you: "Stack típico", price: "$140", note: "11 apps separadas" },
        {
          you: "Notion + Asana + Slack solos",
          price: "$52",
          note: "sin Co-Pilot ni Inbox",
        },
        {
          you: "ClickUp Business + GPT Team",
          price: "$44",
          note: "siguen siendo 2 facturas",
        },
      ]
    : [
        { you: "Typical stack", price: "$140", note: "11 separate apps" },
        {
          you: "Notion + Asana + Slack alone",
          price: "$52",
          note: "no Co-Pilot, no Inbox",
        },
        {
          you: "ClickUp Business + GPT Team",
          price: "$44",
          note: "still 2 invoices",
        },
      ];

  const steps = isEs
    ? [
        {
          n: "01",
          title: "Tú agendas. Nosotros activamos.",
          description:
            "En menos de 24 horas Carlos te contacta, configura tu workspace y te invita como Owner.",
        },
        {
          n: "02",
          title: "Pagas solo lo que usas.",
          description:
            "Prorrateo automático cuando agregas o quitas usuarios. Una sola factura mensual.",
        },
        {
          n: "03",
          title: "Crece sin pensarlo.",
          description:
            "Empiezas con 5, terminas con 50, y nada cambia en tu workflow. Solo la factura.",
        },
      ]
    : [
        {
          n: "01",
          title: "You request. We activate.",
          description:
            "Within 24 hours Carlos reaches out, configures your workspace, and invites you as Owner.",
        },
        {
          n: "02",
          title: "Pay only for what you use.",
          description:
            "Auto-proration as you add or remove users. One monthly invoice.",
        },
        {
          n: "03",
          title: "Grow without thinking about it.",
          description:
            "Start with 5, end with 50 — workflow stays the same. Only the invoice changes.",
        },
      ];

  const faqs = isEs
    ? [
        {
          q: "¿Hay free trial?",
          a: "No. Cobramos desde día 1 porque confiamos en lo que entregamos. Si en 30 días no estás satisfecho, te reembolsamos el 100% — sin preguntas.",
        },
        {
          q: "¿Hay descuento por volumen?",
          a: `Para ${PRICING.bulkSeats}+ seats podemos negociar precio. Escríbenos si calificas y armamos una propuesta a medida.`,
        },
        {
          q: "¿Qué pasa si quito un usuario?",
          a: "Recibes crédito prorrateado en tu siguiente factura. La factura del mes siguiente refleja exactamente los usuarios activos.",
        },
        {
          q: "¿Hay contrato anual?",
          a: `El default es mensual sin permanencia. Anual disponible con ${PRICING.annualDiscount * 100}% de descuento si prefieres planificar el gasto.`,
        },
        {
          q: "¿Aceptan factura/PUE?",
          a: "Sí. Generamos factura fiscal en México y receipts USD para US/internacional. Configuramos tus datos fiscales en el alta.",
        },
        {
          q: "¿Cuántos usuarios mínimo?",
          a: "Mínimo 1, máximo ilimitado. Recomendamos al menos 3 para que el Co-Piloto tenga señal de equipo desde el inicio.",
        },
        {
          q: "¿Cómo es el onboarding?",
          a: "Te contactamos en menos de 24 horas, configuramos tu workspace según tu industria, y te enviamos un invite. El Owner invita al equipo desde su dashboard.",
        },
        {
          q: "¿Mis datos están seguros?",
          a: "Sí. RLS multi-tenant (cada empresa solo ve su data), encriptación at-rest e in-transit, SOC 2 Type II en proceso. Más detalle en /security.",
        },
        {
          q: "¿Aceptan pagos en MXN o solo USD?",
          a: "El precio está en USD para que sea estable. Cobramos en USD vía tarjeta o transferencia. Factura fiscal MX se genera al tipo de cambio del día de la factura.",
        },
        {
          q: "¿Puedo migrar mi data desde Notion, Asana o ClickUp?",
          a: "Sí. Tenemos importers nativos para Notion (docs), Asana/ClickUp/Linear (tareas) y Slack (canales como hilos). Te ayudamos en el onboarding.",
        },
      ]
    : [
        {
          q: "Is there a free trial?",
          a: "No. We charge from day one because we stand behind what we deliver. If you're not satisfied within 30 days, we refund 100% — no questions.",
        },
        {
          q: "Is there a volume discount?",
          a: `For ${PRICING.bulkSeats}+ seats we negotiate. Reach out if you qualify and we'll put together a proposal.`,
        },
        {
          q: "What happens if I remove a user?",
          a: "You get prorated credit on your next invoice. The following month reflects active users exactly.",
        },
        {
          q: "Is there an annual contract?",
          a: `Monthly is default — no commitment. Annual available with a ${PRICING.annualDiscount * 100}% discount if you prefer to plan ahead.`,
        },
        {
          q: "Do you do invoices / VAT?",
          a: "Yes. We issue Mexican fiscal invoices and USD receipts for US/international. Tax info is captured at signup.",
        },
        {
          q: "Minimum users?",
          a: "Minimum 1, no maximum. We recommend at least 3 so Co-Pilot has team signal from day one.",
        },
        {
          q: "How does onboarding work?",
          a: "We reach out within 24 hours, configure your workspace for your industry, and send you an invite. The Owner invites the team from their dashboard.",
        },
        {
          q: "Is my data safe?",
          a: "Yes. Multi-tenant RLS (every company sees only its data), encryption at-rest and in-transit, SOC 2 Type II in progress. Details at /security.",
        },
        {
          q: "Do you accept MXN or only USD?",
          a: "Pricing is in USD for stability. We bill in USD via card or wire. Mexican fiscal invoices are issued at the exchange rate of the invoice day.",
        },
        {
          q: "Can I migrate from Notion, Asana, or ClickUp?",
          a: "Yes. We have native importers for Notion (docs), Asana/ClickUp/Linear (tasks), and Slack (channels as threads). We help during onboarding.",
        },
      ];

  return (
    <>
      <JsonLd
        data={faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))}
      />
      <PageHero
        eyebrow={dict.nav.pricing}
        title={
          isEs ? (
            <>
              Hecho para empresas que valoran su{" "}
              <span className="text-gradient animate-gradient">tiempo</span>
            </>
          ) : (
            <>
              Built for companies that value their{" "}
              <span className="text-gradient animate-gradient">time</span>
            </>
          )
        }
        description={
          isEs
            ? "FlorioIn cuesta $3 USD por usuario al mes. Sin tiers. Sin trucos. Sin sales calls innecesarias. Y si no funciona en 30 días, reembolso 100%."
            : "FlorioIn costs $3 USD per user per month. No tiers. No tricks. No unnecessary sales calls. And if it doesn't work in 30 days, full refund."
        }
        align="center"
      />

      {/* Trust strip — quick proof */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-12)]">
        <Container>
          <RevealOnScroll
            direction="up"
            distance={14}
            duration={0.6}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {[
              { label: isEs ? "Sin tarjeta para empezar" : "No card to start" },
              {
                label: isEs ? "Cancela cuando quieras" : "Cancel anytime",
              },
              {
                label: isEs
                  ? "Reembolso 100% en 30 días"
                  : "100% refund in 30 days",
              },
              {
                label: isEs ? "Activación < 24 h" : "Live in < 24 h",
              },
              {
                label: isEs ? "Facturación mensual prorrateada" : "Prorated monthly billing",
              },
            ].map((p, i) => (
              <span
                key={p.label}
                className="lozenge inline-flex animate-breathe items-center gap-2 px-3.5 py-1.5 text-[12.5px] font-medium text-[var(--fg-secondary)]"
                style={{
                  animationDelay: `${i * -0.7}s`,
                  animationDuration: `${8 + (i % 2)}s`,
                }}
              >
                <Check
                  className="h-3 w-3 text-[#1f8a5b]"
                  strokeWidth={2.5}
                />
                {p.label}
              </span>
            ))}
          </RevealOnScroll>
        </Container>
      </section>

      {/* Main pricing blob */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-16)]">
        <Container className="relative">
          <div className="mx-auto flex max-w-[640px] items-center justify-center">
            <PricingBlob isEs={isEs} lp={lp} dict={dict} />
          </div>
        </Container>
      </section>

      {/* Monthly vs annual visual */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-16)]">
        <Container>
          <div className="mx-auto mb-[var(--space-8)] max-w-[820px] text-center">
            <span className="eyebrow mb-[var(--space-3)] inline-block">
              {isEs ? "Mensual o anual" : "Monthly or annual"}
            </span>
            <h2 className="font-display text-[clamp(28px,3.8vw,48px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Anual te ahorra{" "}
                  <span className="text-gradient">
                    {PRICING.annualDiscount * 100}% adicional
                  </span>{" "}
                  — o sigue mensual. Tú decides.
                </>
              ) : (
                <>
                  Annual saves you an extra{" "}
                  <span className="text-gradient">
                    {PRICING.annualDiscount * 100}%
                  </span>{" "}
                  — or stay monthly. Your call.
                </>
              )}
            </h2>
          </div>

          <div className="mx-auto grid max-w-[860px] gap-[var(--space-5)] md:grid-cols-2">
            <RevealOnScroll
              direction="up"
              distance={18}
              duration={0.6}
              className="relative bg-white p-[var(--space-8)]"
              style={{
                borderRadius: "60px 88px 64px 80px / 80px 64px 88px 60px",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-1/3 -z-10 opacity-50 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(168,140,255,0.30), transparent 65%)",
                }}
              />
              <span className="eyebrow">{isEs ? "Mensual" : "Monthly"}</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span
                  className="font-display text-[64px] leading-[0.9] tracking-[-0.05em]"
                  style={{
                    background: "var(--gradient-hero)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ${PRICING.perSeat}
                </span>
                <span className="text-[13px] text-[var(--fg-muted)]">
                  {isEs ? "/ usuario / mes" : "/ user / month"}
                </span>
              </div>
              <p className="mt-3 text-[14px] text-[var(--fg-muted)]">
                {isEs
                  ? "Sin permanencia · Prorrateo automático · Cancela cuando quieras."
                  : "No commitment · Auto-proration · Cancel anytime."}
              </p>
            </RevealOnScroll>

            <RevealOnScroll
              direction="up"
              distance={18}
              delay={0.08}
              duration={0.6}
              className="relative overflow-hidden p-[var(--space-8)] text-white"
              style={{
                background: "var(--gradient-hero)",
                borderRadius: "88px 60px 80px 64px / 60px 80px 64px 88px",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-[-30%] -left-1/3 w-2/3 animate-sheen-wave"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
                  animationDuration: "10s",
                  mixBlendMode: "soft-light",
                }}
              />
              <div className="inline-flex items-center gap-2 rounded-full bg-white/25 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] backdrop-blur">
                {isEs
                  ? `Ahorra ${PRICING.annualDiscount * 100}%`
                  : `Save ${PRICING.annualDiscount * 100}%`}
              </div>
              <span className="mt-3 block text-[12.5px] font-semibold uppercase tracking-[0.14em] opacity-90">
                {isEs ? "Anual" : "Annual"}
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-[64px] leading-[0.9] tracking-[-0.05em] text-white">
                  ${(PRICING.perSeat * (1 - PRICING.annualDiscount)).toFixed(2)}
                </span>
                <span className="text-[13px] text-white/85">
                  {isEs
                    ? "/ usuario / mes (facturado anualmente)"
                    : "/ user / month (billed annually)"}
                </span>
              </div>
              <p className="mt-3 text-[14px] text-white/85">
                {isEs
                  ? `Un solo cargo anual · Cancelas en mes 12 sin penalización · Cambiar a mensual cuando quieras.`
                  : `Single annual charge · Cancel at month 12 with no penalty · Switch to monthly anytime.`}
              </p>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* ROI savings calculator (static examples) */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-16)]">
        <Container>
          <div className="mb-[var(--space-10)] flex flex-col items-start gap-[var(--space-3)] lg:items-center lg:text-center">
            <span className="eyebrow-pill inline-flex">
              <span className="dot" aria-hidden />
              <span>{isEs ? "Cuánto ahorras" : "How much you save"}</span>
            </span>
            <h2 className="max-w-3xl font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Cifras concretas — basadas en{" "}
                  <span className="text-gradient">$140 / seat / mes</span> de
                  stack típico.
                </>
              ) : (
                <>
                  Real numbers — based on{" "}
                  <span className="text-gradient">$140 / seat / mo</span>{" "}
                  typical stack.
                </>
              )}
            </h2>
          </div>

          <ul className="grid gap-[var(--space-6)] md:grid-cols-3">
            {roiExamples.map((row, i) => {
              const florioin = row.seats * PRICING.perSeat;
              const monthlySaving = row.oldStack - florioin;
              const yearlySaving = monthlySaving * 12;
              const radii = [
                "60px 88px 64px 80px / 80px 64px 88px 60px",
                "88px 60px 80px 64px / 60px 80px 64px 88px",
                "72px 96px 60px 84px / 84px 60px 96px 72px",
              ];
              return (
                <RevealOnScroll
                  key={row.seats}
                  direction="up"
                  distance={18}
                  delay={i * 0.08}
                  duration={0.7}
                  className="relative flex flex-col gap-3 overflow-hidden bg-white p-[var(--space-7)]"
                  style={{ borderRadius: radii[i] }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-1/3 -z-10 opacity-55 blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${row.color}55, transparent 65%)`,
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="grid h-9 w-9 place-items-center rounded-full text-white"
                      style={{ background: row.color }}
                    >
                      <Sparkles className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <span className="font-display text-[clamp(20px,2vw,26px)] leading-tight tracking-tight">
                      {isEs ? `Equipo de ${row.seats}` : `${row.seats}-person team`}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-col gap-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[12px] text-[var(--fg-muted)]">
                        {isEs ? "Stack actual" : "Today's stack"}
                      </span>
                      <span className="font-display text-[18px] leading-none tracking-tight text-[var(--fg-secondary)] line-through decoration-[var(--danger)]/55 decoration-2">
                        ${row.oldStack.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[12px] text-[var(--fg-muted)]">FlorioIn</span>
                      <span className="font-display text-[18px] leading-none tracking-tight text-[var(--fg)]">
                        ${florioin.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 rounded-[24px] bg-[#fafbfc] px-4 py-3">
                    <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                      {isEs ? "Ahorro mensual" : "Monthly saving"}
                    </div>
                    <div
                      className="font-display text-[clamp(28px,3vw,40px)] leading-none tracking-tight"
                      style={{
                        background: `linear-gradient(135deg, ${row.color}, var(--c-violet))`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      ${monthlySaving.toLocaleString()}
                    </div>
                    <div className="mt-1.5 text-[11.5px] text-[var(--fg-muted)]">
                      ~${yearlySaving.toLocaleString()}{" "}
                      {isEs ? "/ año" : "/ year"}
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Every plan includes — grouped by category */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mb-[var(--space-12)] flex flex-col items-start gap-[var(--space-3)] lg:items-center lg:text-center">
            <span className="eyebrow">
              {isEs ? "Todo incluido" : "Everything included"}
            </span>
            <h2 className="max-w-3xl font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Tres frentes,{" "}
                  <span className="text-gradient">un solo precio.</span>
                </>
              ) : (
                <>
                  Three fronts,{" "}
                  <span className="text-gradient">one price.</span>
                </>
              )}
            </h2>
          </div>
          <ul className="grid gap-[var(--space-6)] md:grid-cols-3">
            {groupedIncludes.map((group, i) => {
              const GroupIcon = group.icon;
              const radii = [
                "60px 88px 64px 80px / 80px 64px 88px 60px",
                "88px 60px 80px 64px / 60px 80px 64px 88px",
                "72px 96px 60px 84px / 84px 60px 96px 72px",
              ];
              return (
                <RevealOnScroll
                  key={group.title}
                  direction="up"
                  distance={18}
                  delay={i * 0.08}
                  duration={0.7}
                  className="relative flex flex-col gap-4 overflow-hidden bg-white p-[var(--space-7)]"
                  style={{ borderRadius: radii[i] }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-1/3 -z-10 opacity-50 blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${group.tint}40, transparent 65%)`,
                    }}
                  />
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid h-11 w-11 place-items-center rounded-full text-white"
                      style={{ background: group.tint }}
                    >
                      <GroupIcon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <h3 className="font-display text-[clamp(22px,2.2vw,28px)] leading-tight tracking-tight">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <li
                          key={item.label}
                          className="flex items-start gap-2.5 text-[14px] text-[var(--fg-secondary)]"
                        >
                          <span
                            aria-hidden
                            className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#fafbfc]"
                            style={{ color: group.tint }}
                          >
                            <ItemIcon className="h-3 w-3" strokeWidth={2} />
                          </span>
                          {item.label}
                        </li>
                      );
                    })}
                  </ul>
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* What you DON'T get — honest transparency */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mb-[var(--space-10)] max-w-3xl">
            <span className="eyebrow-pill inline-flex">
              <span
                aria-hidden
                className="grid h-4 w-4 place-items-center rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, var(--c-pink), var(--c-violet))",
                }}
              >
                <TriangleAlert className="h-2.5 w-2.5 text-white" strokeWidth={2.4} />
              </span>
              <span>
                {isEs ? "Lo que no incluye (aún)" : "What's not included (yet)"}
              </span>
            </span>
            <h2 className="mt-[var(--space-4)] font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Honestidad antes que{" "}
                  <span className="text-gradient">cierre.</span>
                </>
              ) : (
                <>
                  Honesty over the{" "}
                  <span className="text-gradient">close.</span>
                </>
              )}
            </h2>
            <p className="mt-[var(--space-4)] max-w-2xl text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
              {isEs
                ? "Si te lo digo después de firmar, te traicioné. Esto es lo que NO tenemos hoy — y cuándo lo vamos a tener."
                : "If I tell you after you sign, that's a betrayal. Here's what we DON'T have today — and when we will."}
            </p>
          </div>

          <ul className="grid gap-[var(--space-5)] md:grid-cols-2">
            {notIncluded.map((item, i) => {
              const radii = [
                "40px 56px 36px 48px / 48px 36px 56px 40px",
                "56px 40px 48px 36px / 36px 48px 40px 56px",
                "48px 36px 56px 40px / 40px 56px 36px 48px",
                "36px 56px 40px 48px / 56px 40px 48px 36px",
              ];
              return (
                <RevealOnScroll
                  key={item.title}
                  direction="up"
                  distance={16}
                  delay={i * 0.06}
                  duration={0.6}
                  className="relative flex flex-col gap-2 overflow-hidden bg-[#fafbfc] p-[var(--space-6)]"
                  style={{ borderRadius: radii[i] }}
                >
                  <h3 className="font-display text-[clamp(18px,1.8vw,22px)] leading-tight tracking-tight text-[var(--fg)]">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-[1.55] text-[var(--fg-muted)]">
                    {item.body}
                  </p>
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Comparison strip */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container className="relative">
          <div className="mx-auto mb-[var(--space-10)] max-w-[820px] text-center">
            <span className="eyebrow mb-[var(--space-3)] inline-block">
              {isEs
                ? "Comparado con tu stack actual"
                : "Compared to your stack today"}
            </span>
            <h2 className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs ? (
                <>
                  Misma utilidad.{" "}
                  <span className="text-gradient">95% menos costo.</span>
                </>
              ) : (
                <>
                  Same utility.{" "}
                  <span className="text-gradient">95% lower cost.</span>
                </>
              )}
            </h2>
          </div>
          <ul className="mx-auto flex max-w-[820px] flex-col gap-3">
            {compareRow.map((row, i) => (
              <RevealOnScroll
                key={row.you}
                direction="up"
                distance={16}
                delay={i * 0.06}
                duration={0.6}
                className="lozenge flex flex-wrap items-center justify-between gap-3 px-6 py-4"
              >
                <span className="text-[15px] font-medium text-[var(--fg-secondary)] line-through decoration-[var(--danger)]/55 decoration-2 underline-offset-2">
                  {row.you}
                </span>
                <span className="text-[12.5px] text-[var(--fg-muted)]">
                  {row.note}
                </span>
                <span className="font-display text-[clamp(22px,2vw,28px)] leading-none tracking-tight text-[var(--fg)] line-through decoration-[var(--danger)]/40 decoration-2">
                  {row.price}
                </span>
              </RevealOnScroll>
            ))}
            <RevealOnScroll
              direction="up"
              distance={16}
              delay={0.18}
              duration={0.6}
              className="relative mt-3 flex flex-wrap items-center justify-between gap-3 overflow-hidden rounded-full px-6 py-5 text-white"
              style={{ background: "var(--gradient-hero)" }}
            >
              <span className="inline-flex items-center gap-2 text-[15px] font-semibold">
                <span
                  aria-hidden
                  className="grid h-7 w-7 place-items-center rounded-full bg-white/25 backdrop-blur"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                FlorioIn — todo dentro
              </span>
              <span className="inline-flex items-center gap-2 font-display text-[clamp(24px,2.2vw,30px)] leading-none tracking-tight">
                <MoveRight className="h-4 w-4" />${PRICING.perSeat}
                <span className="text-[12.5px] font-medium text-white/85">
                  USD / seat / mo
                </span>
              </span>
            </RevealOnScroll>
          </ul>
        </Container>
      </section>

      {/* How it works */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mb-[var(--space-12)] flex flex-col items-start gap-[var(--space-3)] lg:items-center lg:text-center">
            <span className="eyebrow">
              {isEs ? "Cómo funciona" : "How it works"}
            </span>
            <h2 className="max-w-2xl font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
              {isEs
                ? "Tres pasos. Sin sorpresas."
                : "Three steps. Zero surprises."}
            </h2>
          </div>
          <ol className="relative grid gap-[var(--space-6)] md:grid-cols-3">
            <div
              aria-hidden
              className="pointer-events-none absolute left-[10%] right-[10%] top-[80px] hidden h-px md:block"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,141,218,0.45), rgba(168,140,255,0.55), rgba(56,228,255,0.45), transparent)",
              }}
            />
            {steps.map((step, i) => {
              const radii = [
                "60px 88px 64px 80px / 80px 64px 88px 60px",
                "88px 60px 80px 64px / 60px 80px 64px 88px",
                "72px 96px 60px 84px / 84px 60px 96px 72px",
              ];
              const halos = [
                "radial-gradient(circle, rgba(255,141,218,0.30), transparent 65%)",
                "radial-gradient(circle, rgba(168,140,255,0.30), transparent 65%)",
                "radial-gradient(circle, rgba(56,228,255,0.30), transparent 65%)",
              ];
              return (
                <RevealOnScroll
                  key={step.n}
                  direction="up"
                  distance={20}
                  delay={i * 0.08}
                  duration={0.7}
                  className="relative flex h-full flex-col gap-[var(--space-4)] overflow-hidden bg-white p-[var(--space-8)] transition-transform duration-[var(--duration-base)] hover:-translate-y-1.5"
                  style={{ borderRadius: radii[i] }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-1/3 -z-10 opacity-60 blur-3xl"
                    style={{ background: halos[i] }}
                  />
                  <span
                    className="font-display text-[clamp(56px,5vw,80px)] leading-[0.85] tracking-[-0.05em] animate-breathe"
                    style={{
                      background: "var(--gradient-hero)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animationDelay: `${i * -1.4}s`,
                    }}
                  >
                    {step.n}
                  </span>
                  <h3 className="font-display text-[clamp(22px,2.4vw,28px)] leading-[1.15] tracking-[-0.025em]">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-[1.55] text-[var(--fg-secondary)]">
                    {step.description}
                  </p>
                </RevealOnScroll>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      <section className="relative isolate overflow-hidden bg-white section">
        <Container>
          <div className="mb-[var(--space-10)] flex flex-col items-start gap-[var(--space-3)] lg:items-center lg:text-center">
            <span className="eyebrow-pill inline-flex">
              <span
                aria-hidden
                className="grid h-4 w-4 place-items-center rounded-full text-white"
                style={{ background: "var(--gradient-hero)" }}
              >
                <MessageCircleQuestion className="h-2.5 w-2.5" strokeWidth={2.4} />
              </span>
              <span>FAQ</span>
            </span>
            <h2 className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.04em]">
              {isEs ? "Preguntas frecuentes" : "Frequently asked"}
            </h2>
          </div>
          <Accordion
            type="single"
            collapsible
            className="mx-auto flex max-w-3xl flex-col gap-3"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                className="overflow-hidden bg-[#fafbfc] px-5 [&]:border-b-0"
                style={{
                  borderRadius:
                    i % 3 === 0
                      ? "32px 44px 36px 40px / 40px 36px 44px 32px"
                      : i % 3 === 1
                        ? "44px 32px 40px 36px / 32px 40px 36px 44px"
                        : "36px 44px 32px 40px / 40px 32px 44px 36px",
                }}
              >
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>

      {/* Migration help + Enterprise note */}
      <section className="relative isolate overflow-hidden bg-white pb-[var(--space-20)]">
        <Container>
          <div className="grid gap-[var(--space-5)] md:grid-cols-2">
            <RevealOnScroll
              direction="up"
              distance={16}
              duration={0.6}
              className="relative flex flex-col gap-3 overflow-hidden bg-[#fafbfc] p-[var(--space-7)]"
              style={{
                borderRadius: "60px 88px 64px 80px / 80px 64px 88px 60px",
              }}
            >
              <span
                aria-hidden
                className="grid h-11 w-11 place-items-center rounded-full text-white"
                style={{ background: "var(--gradient-hero)" }}
              >
                <Download className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="font-display text-[clamp(20px,2vw,26px)] leading-tight tracking-tight">
                {isEs ? "Migración asistida (gratis)" : "Assisted migration (free)"}
              </h3>
              <p className="text-[14.5px] leading-[1.55] text-[var(--fg-muted)]">
                {isEs
                  ? "Importers nativos para Notion, Asana, ClickUp, Linear, Trello y Slack. Te ayudamos a mover docs, tareas e hilos sin que pierdas un día de productividad."
                  : "Native importers for Notion, Asana, ClickUp, Linear, Trello, and Slack. We help move docs, tasks, and threads without losing a day of productivity."}
              </p>
              <Link
                href={`${lp}/request-access`}
                className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--primary)] underline-offset-4 hover:underline"
              >
                {isEs ? "Empezar migración" : "Start migration"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </RevealOnScroll>

            <RevealOnScroll
              direction="up"
              distance={16}
              delay={0.08}
              duration={0.6}
              className="relative flex flex-col gap-3 overflow-hidden bg-[#fafbfc] p-[var(--space-7)]"
              style={{
                borderRadius: "88px 60px 80px 64px / 60px 80px 64px 88px",
              }}
            >
              <span
                aria-hidden
                className="grid h-11 w-11 place-items-center rounded-full text-white"
                style={{ background: "linear-gradient(135deg,#38e4ff,#a88cff)" }}
              >
                <Shield className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="font-display text-[clamp(20px,2vw,26px)] leading-tight tracking-tight">
                {isEs ? "Plan custom para 100+ personas" : "Custom plan for 100+ people"}
              </h3>
              <p className="text-[14.5px] leading-[1.55] text-[var(--fg-muted)]">
                {isEs
                  ? "Descuento por volumen, DPA, security review, dedicated success manager. Una llamada de 30 min para alinear y armamos propuesta a medida."
                  : "Volume discount, DPA, security review, dedicated success manager. 30-min call to align and we build a tailored proposal."}
              </p>
              <a
                href="mailto:carlos@florioin.com"
                className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--primary)] underline-offset-4 hover:underline"
              >
                {isEs ? "Hablar con ventas" : "Talk to sales"}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   Main pricing blob
   ───────────────────────────────────────────────────────── */
function PricingBlob({
  isEs,
  lp,
  dict,
}: {
  isEs: boolean;
  lp: string;
  dict: Awaited<ReturnType<typeof getDictionary>>;
}) {
  return (
    <div className="w-full max-w-[640px]">
      <div
        className="relative isolate overflow-hidden bg-white px-8 py-12 md:px-12 md:py-16"
        style={{
          borderRadius: "96px 64px 84px 72px / 72px 84px 64px 96px",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-x-[15%] -inset-y-[20%] -z-10 opacity-70 blur-3xl"
          style={{ background: "var(--gradient-glow)" }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-[-30%] -left-1/3 w-2/3 animate-sheen-wave"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
            animationDuration: "10s",
            mixBlendMode: "soft-light",
          }}
        />

        <div className="relative flex flex-col items-center gap-6 text-center">
          <span className="eyebrow-pill inline-flex">
            <span className="dot" aria-hidden />
            <span>{isEs ? "Un solo plan" : "One plan"}</span>
          </span>

          <div className="flex items-baseline justify-center gap-2">
            <span
              className="font-display text-[clamp(96px,12vw,160px)] leading-[0.85] tracking-[-0.055em] animate-breathe"
              style={{
                background: "var(--gradient-hero)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ${PRICING.perSeat}
            </span>
            <span className="font-display text-[clamp(20px,2vw,30px)] leading-none tracking-tight text-[var(--fg-muted)]">
              USD
            </span>
          </div>
          <p className="text-[15px] font-medium text-[var(--fg-secondary)]">
            {isEs ? "por usuario / mes" : "per user / month"}
          </p>
          <p className="max-w-md text-[14px] text-[var(--fg-muted)]">
            {isEs
              ? "Facturación mensual prorrateada · Sin permanencia · Cancela cuando quieras"
              : "Monthly invoicing with proration · No commitment · Cancel anytime"}
          </p>

          <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
            <Link href={`${lp}/request-access`} className="flex-1">
              <Button size="lg" variant="primary" className="w-full">
                {dict.common.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button asChild size="lg" variant="outline" className="w-full flex-1">
              <a href="mailto:carlos@florioin.com">
                {dict.common.ctaContactSales}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
