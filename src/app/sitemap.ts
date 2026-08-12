import type { MetadataRoute } from "next";
import { fleet } from "@/lib/fleet";
import { destinations } from "@/lib/destinations";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: siteUrl, changeFrequency: "weekly", priority: 1 },
      { url: `${siteUrl}/fleet`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${siteUrl}/destinations`, changeFrequency: "monthly", priority: 0.8 },
      { url: `${siteUrl}/gallery`, changeFrequency: "monthly", priority: 0.6 },
      { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
      { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
      { url: `${siteUrl}/booking`, changeFrequency: "monthly", priority: 0.7 },
    ] as const
  ).map((route) => ({ ...route, lastModified: now }));

  const fleetRoutes: MetadataRoute.Sitemap = fleet.map((v) => ({
    url: `${siteUrl}/fleet/${v.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${siteUrl}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...fleetRoutes, ...destinationRoutes];
}
