import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const TYPES = ["default", "blog", "product", "solution", "customer"] as const;
type OgType = (typeof TYPES)[number];

function isType(value: string | null): value is OgType {
  return !!value && (TYPES as readonly string[]).includes(value);
}

const SIZE = { width: 1200, height: 630 } as const;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title")?.slice(0, 140) ??
    "FlorioIn — The OS of your business, with AI";
  const subtitle = searchParams.get("description")?.slice(0, 200) ?? "";
  const eyebrow = searchParams.get("eyebrow")?.slice(0, 60) ?? "";
  const typeParam = searchParams.get("type");
  const type: OgType = isType(typeParam) ? typeParam : "default";

  const accent =
    type === "blog"
      ? "#8B5CF6"
      : type === "product"
        ? "#6366F1"
        : type === "solution"
          ? "#EC4899"
          : type === "customer"
            ? "#10B981"
            : "#6366F1";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0a0a0b 0%, #18181b 60%, #27272a 100%)",
          color: "white",
          padding: 80,
          position: "relative",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Glow accent */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: accent,
            opacity: 0.25,
            filter: "blur(80px)",
            display: "flex",
          }}
        />
        {/* Logo + brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            F
          </div>
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            FlorioIn
          </span>
        </div>

        {/* Body */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 980,
          }}
        >
          {eyebrow && (
            <span
              style={{
                fontSize: 18,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: accent,
                fontWeight: 600,
              }}
            >
              {eyebrow}
            </span>
          )}
          <h1
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              fontWeight: 700,
              margin: 0,
              display: "flex",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: 24,
                lineHeight: 1.4,
                color: "#A1A1AA",
                margin: 0,
                display: "flex",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 32,
            color: "#71717A",
            fontSize: 18,
          }}
        >
          <span>florioin.com</span>
          <span style={{ color: accent }}>$3 / user / month</span>
        </div>
      </div>
    ),
    {
      ...SIZE,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}
