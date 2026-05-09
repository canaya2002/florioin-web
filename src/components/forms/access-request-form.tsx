"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cloneElement, isValidElement, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { INDUSTRIES } from "@/lib/constants";
import { INDUSTRY_CONTENT } from "@/lib/industries";
import { cn } from "@/lib/utils";

// Common consumer email domains we want to reject for "work email" checks.
const FREE_EMAIL_HOSTS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "live.com",
  "msn.com",
]);

const HEADCOUNTS = [
  "1-10",
  "11-50",
  "51-200",
  "201-1000",
  "1000+",
] as const;

const SOURCES = [
  "search",
  "social",
  "referral",
  "blog",
  "podcast",
  "event",
  "other",
] as const;

const formSchema = z.object({
  name: z.string().min(2, "Too short").max(100, "Too long"),
  email: z
    .email("Please enter a valid email")
    .refine((value) => {
      const host = value.split("@")[1]?.toLowerCase();
      return !host || !FREE_EMAIL_HOSTS.has(host);
    }, "Please use your work email"),
  company: z.string().min(1, "Required").max(120),
  role: z.string().min(1, "Required").max(120),
  headcount: z.enum(HEADCOUNTS),
  industry: z.string().min(1, "Required"),
  source: z.enum(SOURCES).optional(),
  message: z.string().max(1000).optional(),
  agree: z.literal(true).refine((v) => v === true, {
    message: "You must agree to continue",
  }),
});

type FormValues = z.input<typeof formSchema>;

type AccessRequestFormProps = {
  locale: Locale;
  dict: Dictionary;
};

export function AccessRequestForm({ locale, dict }: AccessRequestFormProps) {
  const router = useRouter();
  const isEs = locale === "es";
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headcount: "11-50",
      source: "search",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const response = await fetch("/api/access-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(body.error ?? "Submission failed");
      }
      router.push(`/${locale}/request-access/thank-you`);
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : isEs
            ? "Algo salió mal. Inténtalo de nuevo."
            : "Something went wrong. Please try again.",
      );
    }
  };

  const headcountLabels: Record<(typeof HEADCOUNTS)[number], string> = isEs
    ? {
        "1-10": "1–10 personas",
        "11-50": "11–50 personas",
        "51-200": "51–200 personas",
        "201-1000": "201–1000 personas",
        "1000+": "1000+ personas",
      }
    : {
        "1-10": "1–10 people",
        "11-50": "11–50 people",
        "51-200": "51–200 people",
        "201-1000": "201–1000 people",
        "1000+": "1000+ people",
      };

  const sourceLabels: Record<(typeof SOURCES)[number], string> = isEs
    ? {
        search: "Buscador (Google, Bing)",
        social: "Redes sociales",
        referral: "Recomendación",
        blog: "Blog / artículo",
        podcast: "Podcast",
        event: "Evento",
        other: "Otro",
      }
    : {
        search: "Search engine",
        social: "Social media",
        referral: "Referral",
        blog: "Blog / article",
        podcast: "Podcast",
        event: "Event",
        other: "Other",
      };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={dict.forms.name}
          error={errors.name?.message}
          input={
            <Input
              {...register("name")}
              autoComplete="name"
              aria-invalid={!!errors.name}
            />
          }
        />
        <Field
          label={dict.forms.email}
          error={errors.email?.message}
          input={
            <Input
              type="email"
              {...register("email")}
              autoComplete="email"
              aria-invalid={!!errors.email}
              placeholder="you@company.com"
            />
          }
        />
        <Field
          label={dict.forms.company}
          error={errors.company?.message}
          input={
            <Input
              {...register("company")}
              autoComplete="organization"
              aria-invalid={!!errors.company}
            />
          }
        />
        <Field
          label={dict.forms.role}
          error={errors.role?.message}
          input={
            <Input
              {...register("role")}
              autoComplete="organization-title"
              aria-invalid={!!errors.role}
            />
          }
        />
        <Field
          label={dict.forms.headcount}
          error={errors.headcount?.message}
          input={
            <Select
              {...register("headcount")}
              aria-invalid={!!errors.headcount}
            >
              {HEADCOUNTS.map((opt) => (
                <option key={opt} value={opt}>
                  {headcountLabels[opt]}
                </option>
              ))}
            </Select>
          }
        />
        <Field
          label={dict.forms.industry}
          error={errors.industry?.message}
          input={
            <Select
              {...register("industry")}
              aria-invalid={!!errors.industry}
              defaultValue=""
            >
              <option value="" disabled>
                {isEs ? "Selecciona…" : "Select…"}
              </option>
              {INDUSTRIES.map((slug) => (
                <option key={slug} value={slug}>
                  {isEs
                    ? INDUSTRY_CONTENT[slug].label.es
                    : INDUSTRY_CONTENT[slug].label.en}
                </option>
              ))}
              <option value="other">
                {isEs ? "Otra" : "Other"}
              </option>
            </Select>
          }
        />
      </div>

      <Field
        label={dict.forms.source}
        error={errors.source?.message}
        input={
          <Select {...register("source")}>
            {SOURCES.map((opt) => (
              <option key={opt} value={opt}>
                {sourceLabels[opt]}
              </option>
            ))}
          </Select>
        }
      />

      <Field
        label={dict.forms.messageOptional}
        error={errors.message?.message}
        input={
          <Textarea
            {...register("message")}
            rows={4}
            aria-invalid={!!errors.message}
            placeholder={
              isEs
                ? "Cuéntanos algo de tu equipo y qué quieres resolver."
                : "Tell us about your team and what you're trying to solve."
            }
          />
        }
      />

      <label className="flex items-start gap-3 text-sm text-[var(--fg-secondary)]">
        <input
          type="checkbox"
          {...register("agree")}
          className="mt-1 h-4 w-4 rounded border-[var(--border-strong)] text-[var(--primary)]"
        />
        <span>
          {isEs ? "Acepto los " : "I agree to the "}
          <a
            href={`/${locale}/legal/terms`}
            className="underline-offset-4 hover:underline text-[var(--primary)]"
          >
            {dict.forms.termsLink}
          </a>{" "}
          {isEs ? "y la " : "and "}
          <a
            href={`/${locale}/legal/privacy`}
            className="underline-offset-4 hover:underline text-[var(--primary)]"
          >
            {dict.forms.privacyLink}
          </a>
          .
        </span>
      </label>
      {errors.agree && (
        <p className="-mt-3 text-sm text-[var(--danger)]">
          {errors.agree.message}
        </p>
      )}

      {serverError && (
        <div
          role="alert"
          className="rounded-[var(--radius-md)] border border-[var(--danger)]/30 bg-[var(--danger)]/10 p-4 text-sm text-[var(--danger)]"
        >
          {serverError}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        variant="primary"
        disabled={isSubmitting}
        className="self-start"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {dict.forms.submitting}
          </>
        ) : (
          <>
            {dict.common.ctaPrimary}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  input,
  error,
  className,
}: {
  label: string;
  input: React.ReactElement<{ id?: string; "aria-describedby"?: string }>;
  error?: string;
  className?: string;
}) {
  const id = useId();
  const errorId = `${id}-err`;
  const enhanced = isValidElement(input)
    ? cloneElement(input, {
        id,
        "aria-describedby": error ? errorId : undefined,
      })
    : input;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {enhanced}
      {error && (
        <p id={errorId} className="text-xs text-[var(--danger)]">
          {error}
        </p>
      )}
    </div>
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "flex h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-glass)]",
        "bg-[var(--glass-strong)] backdrop-blur-[var(--blur-glass-soft)] px-4 text-[15px] text-[var(--fg)]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
        "transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-in-out)]",
        "hover:border-[var(--border-strong)]",
        "focus-visible:outline-none focus-visible:border-[var(--primary)]/55 focus-visible:ring-4 focus-visible:ring-[var(--primary)]/15",
        "aria-[invalid=true]:border-[var(--danger)] aria-[invalid=true]:focus-visible:ring-[var(--danger)]/20",
        props.className,
      )}
    />
  );
}
