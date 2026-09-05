import type { Metadata } from "next";
import { site } from "@/lib/site";

// Single source of truth for the production origin — update once here if a
// custom domain goes live later, and metadataBase / sitemap / robots /
// JSON-LD all follow automatically.
export const siteUrl = "https://www.renukatoursandtravel.com";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

/** Renders a JSON-LD payload as a <script> props object. */
export function jsonLdScriptProps(data: object) {
  return { __html: JSON.stringify(data) };
}

/**
 * Single source of truth for a page's <title>, description, canonical,
 * Open Graph and Twitter card metadata.
 *
 * Next.js's title *template* (set once in the root layout) correctly
 * resolves the visible <title> tag per page, but it does NOT extend to
 * openGraph/twitter — those are separate fields that, if a page leaves
 * them unset, get inherited **verbatim** from the parent layout. Before
 * this helper existed every page other than "/" was shipping the
 * homepage's og:title/og:description/og:url on social shares, because
 * only `title`/`description`/`alternates.canonical` were being set
 * per-page. This builds all of it together so that can't happen again.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const resolvedTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title: resolvedTitle,
      description,
      url: absoluteUrl(path),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
    },
  };
}

/** Extracts the lower-bound number out of a "₹3,200 – ₹4,500" style string. */
export function parseLowerBoundPrice(estimatedCost: string): number | undefined {
  const match = estimatedCost.replace(/,/g, "").match(/\d+/);
  return match ? Number(match[0]) : undefined;
}

/** Shared LocalBusiness/TravelAgency structured data used site-wide. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    description: site.description,
    url: siteUrl,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/logo.png"),
    telephone: site.phoneRaw,
    email: site.email,
    priceRange: "₹₹",
    foundingDate: `${site.founded}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.pin,
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "State", name: "Karnataka" },
      { "@type": "Place", name: "Whitefield" },
      { "@type": "Place", name: "Electronic City" },
      { "@type": "Place", name: "Koramangala" },
      { "@type": "Place", name: "Indiranagar" },
      { "@type": "Place", name: "HSR Layout" },
      { "@type": "Place", name: "Marathahalli" },
      { "@type": "Place", name: "Sarjapur Road" },
      { "@type": "Place", name: "JP Nagar" },
      { "@type": "Place", name: "Jayanagar" },
      { "@type": "Place", name: "Hebbal" },
      { "@type": "Place", name: "Yelahanka" },
      { "@type": "Place", name: "CV Raman Nagar" },
      { "@type": "City", name: "Hosur" },
      { "@type": "City", name: "Tumkur" },
      { "@type": "City", name: "Ramanagara" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    // sameAs intentionally omitted — no confirmed real social profile URLs
    // exist yet (see src/lib/site.ts). Emitting placeholder homepages here
    // would tell Google this business's official Instagram/Facebook/YouTube
    // IS instagram.com/facebook.com/youtube.com, which is wrong and can
    // actively hurt entity trust. Add this back once real profile URLs are
    // confirmed.
  };
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}
