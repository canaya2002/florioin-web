import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

type Section = {
  heading: string;
  /** Body can be a single paragraph string or an array of paragraphs / list items. */
  body: Array<string | { list: string[] }>;
};

type LegalDocProps = {
  title: string;
  effectiveDate: string;
  introduction: ReactNode;
  sections: Section[];
  locale: string;
  /** "PLACEHOLDER LEGAL" notice that prints near the top in dev. */
  needsLegalReview?: boolean;
};

export function LegalDoc({
  title,
  effectiveDate,
  introduction,
  sections,
  locale,
  needsLegalReview = true,
}: LegalDocProps) {
  return (
    <article className="container-default py-20 md:py-28">
      <header className="mb-12 flex flex-col gap-4">
        <Link
          href={`/${locale}`}
          className="inline-flex w-fit text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
        >
          ← FlorioIn
        </Link>
        <h1 className="font-display text-[clamp(40px,5.5vw,80px)] leading-[1.05] tracking-[-0.04em]">
          {title}
        </h1>
        <p className="text-sm text-[var(--fg-muted)]">
          {locale === "es" ? "Vigente desde " : "Effective as of "}
          {effectiveDate}
        </p>
        {needsLegalReview && (
          <Badge variant="warning" className="w-fit">
            {locale === "es"
              ? "[PLACEHOLDER LEGAL] Pendiente revisión por abogado"
              : "[PLACEHOLDER LEGAL] Pending legal review"}
          </Badge>
        )}
      </header>

      <div className="prose-legal flex max-w-3xl flex-col gap-6">
        <div className="text-[17px] leading-relaxed text-[var(--fg-secondary)]">
          {introduction}
        </div>

        {sections.map((section, i) => (
          <section key={i} className="flex flex-col gap-3">
            <h2 className="mt-8 font-display text-[var(--fs-h4)] tracking-tight">
              {i + 1}. {section.heading}
            </h2>
            {section.body.map((block, j) =>
              typeof block === "string" ? (
                <p
                  key={j}
                  className="text-[16px] leading-relaxed text-[var(--fg-secondary)]"
                >
                  {block}
                </p>
              ) : (
                <ul
                  key={j}
                  className="ml-5 flex list-disc flex-col gap-2 text-[16px] leading-relaxed text-[var(--fg-secondary)]"
                >
                  {block.list.map((item, k) => (
                    <li key={k}>{item}</li>
                  ))}
                </ul>
              ),
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
