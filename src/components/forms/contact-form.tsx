"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cloneElement, isValidElement, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.email(),
  message: z.string().min(10).max(4000),
});

type FormValues = z.input<typeof formSchema>;

type ContactFormProps = {
  locale: Locale;
  dict: Dictionary;
};

export function ContactForm({ locale, dict }: ContactFormProps) {
  const isEs = locale === "es";
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!response.ok) {
        throw new Error("Submission failed");
      }
      setSuccess(true);
      reset();
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

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-subtle)] p-10 text-center">
        <CheckCircle2
          aria-hidden
          className="h-12 w-12 text-[var(--success)]"
        />
        <h3 className="font-display text-[var(--fs-h4)]">
          {isEs ? "Mensaje recibido" : "Message received"}
        </h3>
        <p className="text-[15px] text-[var(--fg-muted)]">
          {isEs
            ? "Te respondemos en menos de un día hábil."
            : "We'll get back to you within one business day."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
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
            />
          }
        />
      </div>

      <Field
        label={dict.forms.message}
        error={errors.message?.message}
        input={
          <Textarea
            rows={6}
            {...register("message")}
            aria-invalid={!!errors.message}
          />
        }
      />

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
            {dict.forms.submit}
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
  // Inject id + aria-describedby into the wrapped input so the label binds
  // properly and screen readers announce the validation message.
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
