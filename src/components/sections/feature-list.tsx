import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

type FeatureListProps = {
  title: string;
  description?: string;
  positive?: string[];
  negative?: string[];
  className?: string;
};

export function FeatureList({
  title,
  description,
  positive,
  negative,
  className,
}: FeatureListProps) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col gap-[var(--space-5,20px)] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-glass)] bg-[var(--glass)] p-[var(--space-8)] backdrop-blur-[var(--blur-glass)] shadow-[var(--shadow-md)]",
        "transition-[box-shadow] duration-[var(--duration-base)] ease-[var(--ease-in-out)] hover:shadow-[var(--shadow-lg)]",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-[var(--fs-h4)] tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="text-[15px] text-[var(--fg-muted)]">{description}</p>
        )}
      </div>
      {positive && positive.length > 0 && (
        <ul className="flex flex-col gap-3">
          {positive.map((item) => (
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
              {item}
            </li>
          ))}
        </ul>
      )}
      {negative && negative.length > 0 && (
        <ul className="flex flex-col gap-3 border-t border-[var(--border)] pt-4">
          {negative.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[15px] text-[var(--fg-muted)] line-through decoration-[var(--fg-subtle)]"
            >
              <span
                aria-hidden
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--bg-muted)] text-[var(--fg-subtle)]"
              >
                <X className="h-3 w-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
