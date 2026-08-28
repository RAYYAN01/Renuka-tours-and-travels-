import type { MetadataRoute } from "next";
import { getFleet } from "@/lib/fleet-data";
import { getDestinations } from "@/lib/destinations-data";
import { getBlogPosts } from "@/lib/blog-data";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
      { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
      { url: `${siteUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
      { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
    ] as const
  ).map((route) => ({ ...route, lastModified: now }));

  const [fleet, destinations, blogPosts] = await Promise.all([
    getFleet(),
    getDestinations(),
    getBlogPosts(),
  ]);

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

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(p.publishedDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...fleetRoutes, ...destinationRoutes, ...blogRoutes];
}
