import Image from "next/image";

import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "full" | "mark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeMap = {
  sm: { mark: 24, text: "text-base" },
  md: { mark: 36, text: "text-[19px]" },
  lg: { mark: 48, text: "text-2xl" },
  xl: { mark: 72, text: "text-4xl" },
} as const;

export function Logo({
  variant = "full",
  size = "md",
  className,
}: LogoProps) {
  const { mark, text } = sizeMap[size];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display tracking-[-0.025em]",
        text,
        className,
      )}
      aria-label="FlorioIn"
    >
      <Image
        src="/logos/FlorioinLogo.png"
        alt=""
        width={mark}
        height={mark}
        priority
        className="shrink-0 select-none"
        style={{ width: mark, height: mark }}
      />
      {variant === "full" && (
        <span className="font-display text-current">FlorioIn</span>
      )}
    </span>
  );
}
