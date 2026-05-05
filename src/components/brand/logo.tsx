import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "full" | "mark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeMap = {
  sm: { mark: 24, text: "text-base" },
  md: { mark: 32, text: "text-lg" },
  lg: { mark: 44, text: "text-2xl" },
  xl: { mark: 64, text: "text-4xl" },
} as const;

export function Logo({
  variant = "full",
  size = "md",
  className,
}: LogoProps) {
  const { mark, text } = sizeMap[size];
  const gradientId = `florioin-grad-${size}`;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display tracking-tight",
        text,
        className,
      )}
      aria-label="FlorioIn"
    >
      <svg
        width={mark}
        height={mark}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="64"
            y2="64"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <rect
          width="64"
          height="64"
          rx="14"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M22 18 H46 V26 H30 V32 H42 V40 H30 V50 H22 Z"
          fill="white"
        />
      </svg>
      {variant === "full" && (
        <span className="font-display text-current">FlorioIn</span>
      )}
    </span>
  );
}
