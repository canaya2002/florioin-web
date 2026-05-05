import { Compass, Eye, Flag, Heart, Sparkles, Target } from "lucide-react";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs ? "Sobre nosotros" : "About",
    description: isEs
      ? "Quiénes somos, qué creemos, y por qué construimos FlorioIn."
      : "Who we are, what we believe, and why we build FlorioIn.",
  };
}

export default async function AboutPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";

  const values = isEs
    ? [
        {
          icon: Target,
          title: "Oficio sobre ego",
          body: "Lo bien hecho importa más que quién lo hizo. Editamos en público.",
        },
        {
          icon: Sparkles,
          title: "AI-native, no AI-bolted",
          body: "Diseñamos cada superficie pensando primero en el Co-Piloto.",
        },
        {
          icon: Heart,
          title: "Cuidamos el dinero del cliente",
          body: "$3 por seat es un compromiso, no un gimmick. Nos defendemos con producto.",
        },
        {
          icon: Compass,
          title: "Decidir > deliberar",
          body: "Una decisión imperfecta hoy supera a una perfecta el viernes.",
        },
        {
          icon: Eye,
          title: "Transparente con clientes y equipo",
          body: "Compartimos métricas, errores y aprendizajes con quien le importan.",
        },
      ]
    : [
        {
          icon: Target,
          title: "Craft over ego",
          body: "Well-made matters more than who made it. We edit in public.",
        },
        {
          icon: Sparkles,
          title: "AI-native, not AI-bolted",
          body: "We design every surface with the Co-Pilot in mind first.",
        },
        {
          icon: Heart,
          title: "We respect customer money",
          body: "$3 a seat is a commitment, not a gimmick. We earn it with product.",
        },
        {
          icon: Compass,
          title: "Decide > deliberate",
          body: "An imperfect decision today beats a perfect one on Friday.",
        },
        {
          icon: Eye,
          title: "Transparent with customers and team",
          body: "We share metrics, mistakes, and learnings with the people who care.",
        },
      ];

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Nosotros" : "About"}
        title={
          isEs
            ? "Construimos el SO de las empresas que valoran su tiempo"
            : "We build the OS for companies that value their time"
        }
        description={
          isEs
            ? "FlorioIn nació en 2024 con una idea simple: si la IA puede leer tu workspace y actuar en él, gran parte del trabajo administrativo desaparece. La pregunta es ejecutar eso bien."
            : "FlorioIn started in 2024 with a simple idea: if AI can read your workspace and act on it, most of the admin work goes away. The hard part is executing that well."
        }
      />

      {/* Mission / Vision */}
      <section className="container-default section">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--bg)] p-10">
            <Flag
              aria-hidden
              className="mb-4 h-8 w-8 text-[var(--primary)]"
            />
            <h2 className="font-display text-[var(--fs-h3)] tracking-tight">
              {isEs ? "Misión" : "Mission"}
            </h2>
            <p className="mt-3 text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
              {isEs
                ? "Devolverle a cada equipo el tiempo que pierde entre herramientas que no se hablan."
                : "Give every team back the time they lose between tools that don't talk."}
            </p>
          </div>
          <div
            className="rounded-[var(--radius-2xl)] border border-[var(--border)] p-10"
            style={{ background: "var(--gradient-card)" }}
          >
            <Eye
              aria-hidden
              className="mb-4 h-8 w-8 text-[var(--primary)]"
            />
            <h2 className="font-display text-[var(--fs-h3)] tracking-tight">
              {isEs ? "Visión" : "Vision"}
            </h2>
            <p className="mt-3 text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
              {isEs
                ? "Que el primer software que cualquier empresa adopte sea FlorioIn — y los demás sean integraciones."
                : "That the first software any company adopts is FlorioIn — and the rest are integrations."}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container-default section">
        <div className="mb-10 flex flex-col gap-3">
          <span className="eyebrow">{isEs ? "Historia" : "Story"}</span>
          <h2 className="max-w-3xl font-display text-[var(--fs-h2)] leading-tight tracking-tight">
            {isEs
              ? "De una hoja de cálculo a una plataforma que reemplaza cinco"
              : "From a spreadsheet to a platform that replaces five"}
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {(isEs
            ? [
                {
                  year: "2024",
                  title: "Idea",
                  body: "Carlos lleva 12 años construyendo software. La pregunta que le seguía dando vueltas: '¿por qué cada empresa paga 4 herramientas que no se conocen?'",
                },
                {
                  year: "2025",
                  title: "Beta privada",
                  body: "200+ equipos, ~3,400 usuarios activos diarios. NPS de 71. Aprendimos qué funcionaba, qué no, y qué teníamos que romper.",
                },
                {
                  year: "2026",
                  title: "Lanzamiento",
                  body: "Q3 2026 abrimos al público en /request-access. Apps en todas las plataformas. Una factura. Tres dólares por seat.",
                },
              ]
            : [
                {
                  year: "2024",
                  title: "Idea",
                  body: "Carlos has been building software for 12 years. The question that kept circling: 'why does every company pay for 4 tools that don't know each other?'",
                },
                {
                  year: "2025",
                  title: "Closed beta",
                  body: "200+ teams, ~3,400 daily-active users, NPS 71. We learned what worked, what didn't, and what we had to break.",
                },
                {
                  year: "2026",
                  title: "Launch",
                  body: "Q3 2026 we open to the public at /request-access. Apps everywhere. One invoice. Three dollars a seat.",
                },
              ]
          ).map((item) => (
            <div
              key={item.year}
              className="flex flex-col gap-3 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-7"
            >
              <span className="font-display text-[var(--fs-h3)] leading-none text-[var(--fg-subtle)]">
                {item.year}
              </span>
              <h3 className="font-display text-[var(--fs-h4)] tracking-tight">
                {item.title}
              </h3>
              <p className="text-[15px] text-[var(--fg-muted)]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-default section">
        <div className="mb-10 flex flex-col gap-3">
          <span className="eyebrow">{isEs ? "Valores" : "Values"}</span>
          <h2 className="font-display text-[var(--fs-h2)] leading-tight tracking-tight">
            {isEs ? "Cinco cosas en las que creemos" : "Five things we believe"}
          </h2>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <li
                key={value.title}
                className="flex flex-col gap-3 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-7"
              >
                <Icon
                  aria-hidden
                  className="h-6 w-6 text-[var(--primary)]"
                />
                <h3 className="font-display text-[var(--fs-h4)] tracking-tight">
                  {value.title}
                </h3>
                <p className="text-[15px] text-[var(--fg-muted)]">{value.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Team placeholder */}
      <section className="container-default section">
        <div className="mb-10 flex flex-col gap-3">
          <span className="eyebrow">{isEs ? "Equipo" : "Team"}</span>
          <h2 className="font-display text-[var(--fs-h2)] leading-tight tracking-tight">
            {isEs ? "Pequeño. Senior. Bilingüe." : "Small. Senior. Bilingual."}
          </h2>
        </div>
        <div className="rounded-[var(--radius-2xl)] border border-dashed border-[var(--border-strong)] p-10 text-center text-[var(--fg-muted)]">
          {isEs
            ? "Foto del equipo y bios reales aterrizan al lanzamiento. Mientras tanto: ~10 personas, distribuidas entre CDMX, MTY y Buenos Aires."
            : "Team photo and real bios land at launch. For now: ~10 people, distributed across CDMX, MTY, and Buenos Aires."}
        </div>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
