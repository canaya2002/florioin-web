import { Check } from "lucide-react";
import { notFound } from "next/navigation";

import { AccessRequestForm } from "@/components/forms/access-request-form";
import { PageHero } from "@/components/sections/page-hero";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs ? "Solicitar acceso" : "Request access",
    description: isEs
      ? "Cuéntanos de tu equipo y te activamos en menos de 24 horas."
      : "Tell us about your team and we'll activate you within 24 hours.",
  };
}

export default async function RequestAccessPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";

  const benefits = isEs
    ? [
        "Carlos te contacta personalmente en menos de 24 horas",
        "Configuramos tu workspace según tu industria",
        "Onboarding del equipo en una sesión de 30 minutos",
        "Reembolso 100% en los primeros 30 días",
      ]
    : [
        "Carlos personally reaches out within 24 hours",
        "We configure your workspace for your industry",
        "Team onboarding in a single 30-min session",
        "100% refund in the first 30 days",
      ];

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Solicitar acceso" : "Request access"}
        title={
          isEs
            ? "Empieza con FlorioIn esta semana"
            : "Start with FlorioIn this week"
        }
        description={
          isEs
            ? "Cuéntanos de tu equipo. Te respondemos en menos de 24 horas con tu workspace ya configurado."
            : "Tell us about your team. We respond within 24 hours with your workspace already configured."
        }
      />

      <section className="container-default pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--bg)] p-8 md:p-10">
            <AccessRequestForm locale={lang} dict={dict} />
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-subtle)] p-6">
              <h3 className="font-display text-[var(--fs-h4)] tracking-tight">
                {isEs ? "Qué pasa después" : "What happens next"}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-[15px] text-[var(--fg-secondary)]"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "var(--gradient-hero)" }}
                    >
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-xl)] border border-dashed border-[var(--border-strong)] p-6 text-[15px] text-[var(--fg-muted)]">
              {isEs ? (
                <>
                  ¿Necesitas atención inmediata? Escríbenos a{" "}
                  <a
                    href="mailto:carlos@florioin.com"
                    className="font-medium text-[var(--primary)] underline-offset-4 hover:underline"
                  >
                    carlos@florioin.com
                  </a>
                  .
                </>
              ) : (
                <>
                  Need to talk now? Email{" "}
                  <a
                    href="mailto:carlos@florioin.com"
                    className="font-medium text-[var(--primary)] underline-offset-4 hover:underline"
                  >
                    carlos@florioin.com
                  </a>
                  .
                </>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
