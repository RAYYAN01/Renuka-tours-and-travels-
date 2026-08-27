import type { Metadata } from "next";
import FleetHero from "@/components/fleet/FleetHero";
import FleetGrid from "@/components/fleet/FleetGrid";
import { sortFleetForDisplay } from "@/lib/fleet";
import { getFleet } from "@/lib/fleet-data";
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
    "17 seater tempo traveller rental Bengaluru",
    "7 seater SUV rental with driver Bengaluru",
    "luxury van hire for family Bengaluru",
    "vehicle rental price list Bengaluru",
    "car rental Whitefield Bengaluru",
    "tempo traveller hire Electronic City",
    "SUV rental Koramangala",
    "9 seater tempo traveller Bengaluru",
    "mini bus rental Bengaluru outer areas",
  ],
});

export default async function FleetPage() {
  const fleet = await getFleet();

  const fleetJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sortFleetForDisplay(fleet).map((vehicle, i) => ({
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(fleetJsonLd)} />
      <FleetHero />
      <FleetGrid fleet={fleet} />
    </>
  );
}
