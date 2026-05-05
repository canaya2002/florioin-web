import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-default section flex flex-col items-center justify-center gap-6 text-center">
      <div className="eyebrow">404</div>
      <h1 className="font-display text-[var(--fs-h1)]">
        <span className="text-gradient">Page not found</span>
      </h1>
      <p className="max-w-md text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
        This page doesn&apos;t exist. Maybe it never did.
      </p>
      <Link
        href="/"
        className="inline-flex h-12 items-center justify-center rounded-full px-6 font-medium text-[var(--primary-fg)]"
        style={{ background: "var(--gradient-hero)" }}
      >
        Go home
      </Link>
    </main>
  );
}
