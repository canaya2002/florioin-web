import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
};

/**
 * Lightweight code block. For syntax highlighting via Shiki, use this
 * component as the renderer once MDX is wired up in Phase 7.
 */
export function CodeBlock({
  code,
  language,
  filename,
  className,
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[#0A0A0B] text-[#FAFAFA]",
        className,
      )}
    >
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs font-mono text-white/60">
          <span>{filename}</span>
          {language && <span className="uppercase">{language}</span>}
        </div>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
