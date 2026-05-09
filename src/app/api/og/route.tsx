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

  // FlorioIn Light Glass palette — pastel pink → violet → cyan.
  const accent =
    type === "blog"
      ? "#A88CFF"
      : type === "product"
        ? "#38E4FF"
        : type === "solution"
          ? "#FF8DDA"
          : type === "customer"
            ? "#34C79A"
            : "#A88CFF";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #fbfdff 0%, #f5f0ff 55%, #eef7ff 100%)",
          color: "#101424",
          padding: 80,
          position: "relative",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Pastel ambient blobs */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #FF8DDA 0%, rgba(255,141,218,0) 70%)",
            opacity: 0.55,
            filter: "blur(60px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -240,
            left: -160,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #38E4FF 0%, rgba(56,228,255,0) 70%)",
            opacity: 0.45,
            filter: "blur(60px)",
            display: "flex",
          }}
        />
        {/* Logo + brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background:
                "linear-gradient(135deg, #FF8DDA 0%, #A88CFF 50%, #38E4FF 100%)",
              boxShadow: "0 12px 28px rgba(168,140,255,0.32)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              color: "white",
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
            gap: 18,
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
                fontWeight: 700,
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
              color: "#101424",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: 24,
                lineHeight: 1.4,
                color: "#5F6472",
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
            color: "#8A91A3",
            fontSize: 18,
          }}
        >
          <span>florioin.com</span>
          <span style={{ color: accent, fontWeight: 600 }}>
            $3 / user / month
          </span>
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
