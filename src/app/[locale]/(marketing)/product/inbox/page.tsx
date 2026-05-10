import {
  AtSign,
  Bell,
  BotMessageSquare,
  Filter,
  Mail,
  MessageSquare,
  Smartphone,
} from "lucide-react";
import { notFound } from "next/navigation";

import { BentoCard } from "@/components/bento/bento-card";
import { BentoGrid } from "@/components/bento/bento-grid";
import { GradientPlaceholder } from "@/components/media/gradient-placeholder";
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
      ? "Email, Slack, Teams, WhatsApp — clasificados por IA con respuestas sugeridas."
      : "Email, Slack, Teams, WhatsApp — AI-classified with suggested replies.",
  });
}

export default async function InboxPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <PageHero
        eyebrow={dict.nav.productInbox}
        title={isEs ? "Una bandeja para todo" : "One inbox for everything"}
        description={
          isEs
            ? "Email, Slack, Teams, WhatsApp Business. Todo en un lugar, clasificado por la IA, con respuestas sugeridas. Tu equipo deja de perseguir mensajes y empieza a cerrarlos."
            : "Email, Slack, Teams, WhatsApp Business. All in one place, AI-classified, with suggested replies. Your team stops chasing messages and starts closing them."
        }
        primaryCta={{ href: `${lp}/request-access`, label: dict.common.ctaPrimary }}
        visual={
          <div className="mx-auto max-w-5xl">
            <GradientPlaceholder
              className="aspect-[16/9] rounded-[var(--radius-xl)]"
              caption={isEs ? "Bandeja unificada" : "Unified inbox"}
            />
          </div>
        }
      />

      <section className="container-wide section">
        <BentoGrid>
          <BentoCard
            size="full"
            eyebrow={isEs ? "Canales" : "Channels"}
            title={isEs ? "Conecta cada canal en menos de un minuto" : "Connect every channel in under a minute"}
            description={
              isEs
                ? "Gmail · Outlook · Slack · Microsoft Teams · WhatsApp Business · SMS · Webhooks. OAuth nativo, sin configuración manual."
                : "Gmail · Outlook · Slack · Microsoft Teams · WhatsApp Business · SMS · Webhooks. Native OAuth, no manual setup."
            }
            visual={
              <div className="flex min-h-[80px] flex-wrap items-center justify-center gap-6 opacity-90">
                <Mail className="h-10 w-10 text-[var(--primary)]" />
                <MessageSquare className="h-10 w-10 text-[var(--accent)]" />
                <AtSign className="h-10 w-10 text-[var(--success)]" />
                <Smartphone className="h-10 w-10 text-[var(--warning)]" />
                <Bell className="h-10 w-10 text-[var(--danger)]" />
              </div>
            }
            visualPosition="side"
          />
          <BentoCard
            size="wide"
            eyebrow={isEs ? "Clasificación" : "Triage"}
            title={isEs ? "La IA decide qué importa primero" : "AI decides what matters first"}
            description={
              isEs
                ? "Cada mensaje entra clasificado: urgente, esperando respuesta, FYI, spam. Aprende de tus patrones — no de un tutorial."
                : "Every message lands classified: urgent, awaiting reply, FYI, spam. It learns from your patterns — not a tutorial."
            }
            visual={
              <div className="flex min-h-[80px] items-center justify-center">
                <Filter
                  aria-hidden
                  className="h-20 w-20 text-[var(--primary)] opacity-60"
                />
              </div>
            }
            visualPosition="side"
          />
          <BentoCard
            size="small"
            eyebrow={isEs ? "Borradores" : "Drafts"}
            title={
              <span className="flex items-center gap-2">
                <BotMessageSquare className="h-7 w-7 text-[var(--primary)]" />
                {isEs ? "Respuestas sugeridas" : "Suggested replies"}
              </span>
            }
            description={
              isEs
                ? "El Co-Piloto redacta el borrador con tu tono. Tú revisas y mandas."
                : "Co-Pilot drafts in your voice. You review and send."
            }
          />
          <BentoCard
            size="small"
            eyebrow={isEs ? "Snooze inteligente" : "Smart snooze"}
            title={isEs ? "Vuelve cuando importa" : "Comes back when it matters"}
            description={
              isEs
                ? "Snooze hasta que la persona responda, o hasta el lunes a las 9am."
                : "Snooze until the person replies, or until Monday at 9am."
            }
          />
          <BentoCard
            size="wide"
            eyebrow={isEs ? "Asignación" : "Assignment"}
            title={
              isEs
                ? "Convierte mensaje en tarea con un atajo"
                : "Turn message into task with a shortcut"
            }
            description={
              isEs
                ? "Cmd+K → asignar a una persona. Conserva el thread completo, mantiene contexto, agenda follow-up."
                : "Cmd+K → assign to a person. Keeps the full thread, holds context, schedules follow-up."
            }
          />
        </BentoGrid>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
