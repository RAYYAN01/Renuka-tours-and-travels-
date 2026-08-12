import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Security/trust headers, applied site-wide — checked by Lighthouse
        // "Best Practices" and most technical SEO audit tools.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Long-lived caching for static images — they're renamed (not
        // overwritten) whenever content changes, so this is safe.
        source: "/:path*(jpg|jpeg|png|webp|avif|svg|gif|ico)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
