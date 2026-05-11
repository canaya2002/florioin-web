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
          {
            // HSTS — 2 years, subdomains included, preload eligible.
            // Once submitted to hstspreload.org the browser refuses HTTP
            // for florioin.com forever (downgrade attack mitigation).
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // X-Frame-Options legacy header — modern browsers use CSP
          // `frame-ancestors`, but plenty of bots still respect this.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            // Hint to crawlers — index-control beyond meta robots, applies to non-HTML too.
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
      {
        // Hashed Next static assets are immutable — cache for a year.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Public marketing assets (logos, fonts, og images) — long cache.
        source: "/(logos|fonts|og)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Sitemap and robots — short cache so crawlers see fresh content.
        source: "/(sitemap.xml|robots.txt|manifest.webmanifest)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // Utility pages must not be indexed even if accidentally linked.
        source: "/:locale/dev",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/:locale/request-access/thank-you",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
