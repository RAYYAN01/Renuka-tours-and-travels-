import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import PageFontScope from "@/components/PageFontScope";
import FleetHero from "@/components/fleet/FleetHero";
import FleetGrid from "@/components/fleet/FleetGrid";
import { fleet } from "@/lib/fleet";
import { absoluteUrl, jsonLdScriptProps, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Fleet",
  description:
    "Browse our full fleet of sedans, SUVs, tempo travellers, luxury vans and coaches — all with verified drivers and transparent pricing.",
  path: "/fleet",
  keywords: [
    "car fleet Bengaluru",
    "SUV rental Bengaluru",
    "tempo traveller rental",
    "luxury van rental Bengaluru",
    "mini coach rental Bengaluru",
    "sedan rental Bengaluru",
    "Innova Crysta rental with driver Bengaluru",
    "AC tempo traveller hire Bengaluru",
    "17 seater Force Traveller rental",
    "26 seater coach rental Bengaluru",
    "self drive SUV rental Bengaluru",
    "7 seater SUV rental with driver Bengaluru",
    "luxury van hire for family Bengaluru",
    "vehicle rental price list Bengaluru",
  ],
});

// Font pairing 2/6: Playfair Display + Work Sans — classic magazine luxury
const heading = Playfair_Display({ subsets: ["latin"], weight: ["500", "600"] });
const body = Work_Sans({ subsets: ["latin"], weight: ["400", "500"] });

const fleetJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: fleet.map((vehicle, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: absoluteUrl(`/fleet/${vehicle.slug}`),
    item: {
      "@type": "Vehicle",
      name: vehicle.name,
      image: absoluteUrl(vehicle.image),
      url: absoluteUrl(`/fleet/${vehicle.slug}`),
    },
  })),
};

export default function FleetPage() {
  return (
    <PageFontScope heading={heading.style.fontFamily} body={body.style.fontFamily}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(fleetJsonLd)} />
      <FleetHero />
      <FleetGrid />
    </PageFontScope>
  );
}
