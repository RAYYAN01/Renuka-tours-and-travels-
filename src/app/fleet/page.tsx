import type { Metadata } from "next";
import Link from "next/link";
import FleetHero from "@/components/fleet/FleetHero";
import FleetGrid from "@/components/fleet/FleetGrid";
import Container from "@/components/ui/Container";
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
    "12 seater tempo traveller",
    "hire luxury tempo traveller",
    "family trip tempo traveller hire",
    "tempo traveller per km rate",
    "maharaja seat tempo traveller",
    "force urbania luxury van",
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
      <section className="bg-ivory-50 pb-20 pt-4 sm:pb-24">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-medium text-forest-900/65">Browse by category:</span>
            <Link
              href="/tempo-traveller-rental-bangalore"
              className="rounded-full border border-forest-950/12 px-4 py-2 text-sm font-medium text-forest-900/75 transition-colors hover:border-terracotta-500 hover:text-terracotta-600"
            >
              Tempo Traveller Rental
            </Link>
            <Link
              href="/car-rental-bangalore"
              className="rounded-full border border-forest-950/12 px-4 py-2 text-sm font-medium text-forest-900/75 transition-colors hover:border-terracotta-500 hover:text-terracotta-600"
            >
              Car Rental
            </Link>
            <Link
              href="/bus-rental-bangalore"
              className="rounded-full border border-forest-950/12 px-4 py-2 text-sm font-medium text-forest-900/75 transition-colors hover:border-terracotta-500 hover:text-terracotta-600"
            >
              Bus Rental
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
