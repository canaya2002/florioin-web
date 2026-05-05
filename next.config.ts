import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack is default in Next 16, configured top-level (no longer experimental)
  turbopack: {},

  // Production-ready image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24, // 24h
    qualities: [50, 75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },

  // Marketing-only redirects. Anything related to authentication or the
  // actual product flows out to florioin.app (a separate project).
  async redirects() {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://florioin.app";
    return [
      {
        source: "/login",
        destination: `${appUrl}/login`,
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/request-access",
        permanent: true,
      },
      {
        source: "/demo",
        destination: "/request-access",
        permanent: true,
      },
      {
        source: "/docs",
        destination: "/resources",
        permanent: true,
      },
    ];
  },

  // Marketing site: HSTS + sane defaults; CSP comes later in Phase 9
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
