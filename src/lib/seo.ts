import { site } from "@/lib/site";

// Single source of truth for the production origin — update once here when the
// real domain is live, and metadataBase / sitemap / robots / JSON-LD all follow.
export const siteUrl = "https://www.renukatoursandtravels.example";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

/** Renders a JSON-LD payload as a <script> props object. */
export function jsonLdScriptProps(data: object) {
  return { __html: JSON.stringify(data) };
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
    areaServed: {
      "@type": "State",
      name: "Karnataka",
    },
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
    sameAs: [site.social.instagram, site.social.facebook, site.social.youtube],
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
