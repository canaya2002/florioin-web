import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
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

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs ? "Precios" : "Pricing",
    description: isEs
      ? "$3 USD por usuario al mes. Sin tiers, sin trucos. Reembolso 100% en 30 días."
      : "$3 USD per user per month. No tiers, no tricks. 100% refund in 30 days.",
  };
}

export default async function PricingPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  const includes = isEs
    ? [
        "Co-Piloto IA con límites razonables",
        "Tasks · Docs · Inbox · Forms — todo",
        "Apps web · iOS · iPad · Android · Mac · Win · Linux",
        "Modo oscuro · ES + EN",
        "Soporte por email (8h LATAM)",
        "Seguridad enterprise: SSO, RLS, audit logs",
        "Integraciones nativas (200+)",
        "Reembolso 100% en los primeros 30 días",
      ]
    : [
        "AI Co-Pilot with reasonable limits",
        "Tasks · Docs · Inbox · Forms — everything",
        "Web · iOS · iPad · Android · Mac · Win · Linux apps",
        "Dark mode · EN + ES",
        "Email support (8h LATAM)",
        "Enterprise security: SSO, RLS, audit logs",
        "200+ native integrations",
        "100% refund in the first 30 days",
      ];

  const steps = isEs
    ? [
        {
          n: "01",
          title: "Tú agendas. Nosotros activamos.",
          description: "En menos de 24 horas Carlos te contacta, configura tu workspace y te invita como Owner.",
        },
        {
          n: "02",
          title: "Pagas solo lo que usas.",
          description: "Prorrateo automático cuando agregas o quitas usuarios. Una sola factura mensual.",
        },
        {
          n: "03",
          title: "Crece sin pensarlo.",
          description: "Empiezas con 5, terminas con 50, y nada cambia en tu workflow. Solo la factura.",
        },
      ]
    : [
        {
          n: "01",
          title: "You request. We activate.",
          description: "Within 24 hours Carlos reaches out, configures your workspace, and invites you as Owner.",
        },
        {
          n: "02",
          title: "Pay only for what you use.",
          description: "Auto-proration as you add or remove users. One monthly invoice.",
        },
        {
          n: "03",
          title: "Grow without thinking about it.",
          description: "Start with 5, end with 50 — workflow stays the same. Only the invoice changes.",
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
      ];

  return (
    <>
      <PageHero
        eyebrow={dict.nav.pricing}
        title={
          isEs
            ? "Hecho para empresas que valoran su tiempo"
            : "Built for companies that value their time"
        }
        description={
          isEs
            ? "FlorioIn cuesta $3 USD por usuario al mes. Sin tiers. Sin trucos. Sin sales calls innecesarias."
            : "FlorioIn costs $3 USD per user per month. No tiers. No tricks. No unnecessary sales calls."
        }
        align="center"
      />

      {/* Main pricing card */}
      <section className="container-default pb-16">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[var(--radius-2xl)] border-2 border-[var(--primary)]/30 bg-[var(--bg)] p-10 shadow-[var(--shadow-xl)] md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{ background: "var(--gradient-card)" }}
          />
          <div className="relative flex flex-col gap-8">
            <div className="flex flex-col gap-3 text-center">
              <span className="eyebrow">{isEs ? "Un solo plan" : "One plan"}</span>
              <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
                <span className="font-display text-[clamp(56px,12vw,128px)] leading-none">
                  ${PRICING.perSeat}
                </span>
                <span className="text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
                  USD {isEs ? "/ usuario / mes" : "/ user / month"}
                </span>
              </div>
              <p className="text-[15px] text-[var(--fg-muted)]">
                {isEs
                  ? "Facturación mensual prorrateada · Sin permanencia · Cancela cuando quieras"
                  : "Monthly invoicing with proration · No commitment · Cancel anytime"}
              </p>
            </div>

            <div className="border-t border-[var(--border)] pt-6">
              <h3 className="mb-4 font-display text-[var(--fs-h4)] tracking-tight">
                {isEs ? "Incluye todo:" : "Includes everything:"}
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] text-[var(--fg-secondary)]"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "var(--gradient-hero)" }}
                    >
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`${lp}/request-access`} className="flex-1">
                <Button size="lg" variant="primary" className="w-full">
                  {dict.common.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`${lp}/contact`} className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  {dict.common.ctaContactSales}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-default section">
        <div className="mb-10 flex flex-col gap-3 lg:items-center lg:text-center">
          <span className="eyebrow">
            {isEs ? "Cómo funciona" : "How it works"}
          </span>
          <h2 className="max-w-2xl font-display text-[var(--fs-h2)] leading-tight tracking-tight">
            {isEs
              ? "Tres pasos. Sin sorpresas."
              : "Three steps. Zero surprises."}
          </h2>
        </div>
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.n}
              className="flex flex-col gap-3 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-7"
            >
              <span className="font-display text-[var(--fs-h3)] leading-none text-[var(--fg-subtle)]">
                {step.n}
              </span>
              <h3 className="font-display text-[var(--fs-h4)] tracking-tight">
                {step.title}
              </h3>
              <p className="text-[15px] text-[var(--fg-muted)]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="container-default pb-24">
        <div className="mb-8 flex flex-col gap-3">
          <span className="eyebrow">FAQ</span>
          <h2 className="font-display text-[var(--fs-h2)] leading-tight tracking-tight">
            {isEs ? "Preguntas frecuentes" : "Frequently asked"}
          </h2>
        </div>
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Enterprise note */}
      <section className="container-default pb-12">
        <div className="rounded-[var(--radius-xl)] border border-dashed border-[var(--border-strong)] bg-[var(--bg-subtle)] p-8 text-center">
          <p className="text-[15px] text-[var(--fg-secondary)]">
            {isEs
              ? "¿Eres una empresa de 100+ personas? "
              : "Are you a 100+ company? "}
            <Link
              href={`${lp}/contact`}
              className="font-medium text-[var(--primary)] underline-offset-4 hover:underline"
            >
              {isEs
                ? "Contáctanos para plan custom →"
                : "Reach out for a custom plan →"}
            </Link>
          </p>
        </div>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
