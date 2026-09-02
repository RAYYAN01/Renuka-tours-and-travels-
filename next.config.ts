import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel's on-the-fly image optimizer (every next/image request) has a
  // monthly transformation quota on the current plan — once it's used up,
  // Vercel returns 402 Payment Required for every further optimized image
  // request, which is what broke images site-wide (confirmed via the
  // x-vercel-error: OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED response
  // header). `unoptimized: true` serves the original files directly,
  // bypassing that quota entirely — images load again immediately, at the
  // cost of losing automatic resizing/WebP conversion (larger downloads
  // than an optimized image would be, though the source files are already
  // compressed — see the "Compress site images" commits). Revert this once
  // the plan is upgraded or the monthly quota resets, to get responsive
  // resizing back.
  images: {
    unoptimized: true,
  },
  // Clean, keyword-matching vanity URLs for Google Ads landing pages —
  // each one 301s to its real canonical /fleet/[slug] page rather than
  // being a separate thin page, so there's no duplicate-content risk and
  // all SEO signal still consolidates on the one real page per vehicle.
  async redirects() {
    return [
      { source: "/9-seater-tempo-traveller", destination: "/fleet/tempo-traveller-9-seater", permanent: true },
      { source: "/12-seater-tempo-traveller", destination: "/fleet/force-traveller-yaksha", permanent: true },
      { source: "/17-seater-tempo-traveller", destination: "/fleet/force-traveller-b", permanent: true },
      { source: "/maharaja-seat-tempo-traveller", destination: "/fleet/force-urbania-12-seater-maharaja", permanent: true },
      { source: "/force-urbania-luxury-van", destination: "/fleet/force-urbania", permanent: true },
    ];
  },
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
