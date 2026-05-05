import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { isLocale } from "@/i18n/locales";

type PageParams = { params: Promise<{ locale: string }> };

export const metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const isEs = locale === "es";
  const lp = `/${locale}`;

  return (
    <section className="container-default flex min-h-[70vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <span
        aria-hidden
        className="inline-flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "var(--gradient-hero)" }}
      >
        <CheckCircle2 className="h-8 w-8 text-white" />
      </span>
      <h1 className="font-display text-[clamp(40px,5vw,72px)] leading-tight tracking-tight">
        <span className="text-gradient">
          {isEs ? "Recibido. Gracias." : "Received. Thank you."}
        </span>
      </h1>
      <p className="max-w-xl text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
        {isEs
          ? "Carlos te va a escribir personalmente en las próximas 24 horas a tu email empresarial. Mientras tanto, puedes seguir explorando."
          : "Carlos will personally email you within 24 hours at your work email. In the meantime, feel free to keep exploring."}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href={lp}>
          <Button variant="primary" size="lg">
            <ArrowLeft className="h-4 w-4" />
            {isEs ? "Volver al inicio" : "Back home"}
          </Button>
        </Link>
        <Link href={`${lp}/blog`}>
          <Button variant="outline" size="lg">
            {isEs ? "Leer el blog" : "Read the blog"}
          </Button>
        </Link>
      </div>
    </section>
  );
}
