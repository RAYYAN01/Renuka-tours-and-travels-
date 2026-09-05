import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { localities, type LocalityZone } from "@/lib/locations";
import { absoluteUrl, jsonLdScriptProps, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Areas We Serve in Bengaluru",
  description:
    "Renuka Tours & Travels provides chauffeur-driven car, SUV, tempo traveller and bus rental across Bengaluru — Central, North, South, East, West and Southeast.",
  path: "/locations",
});

const zoneOrder: LocalityZone[] = ["Central", "North", "East", "South", "West", "Southeast"];

export default function LocationsPage() {
  const byZone = zoneOrder
    .map((zone) => ({ zone, places: localities.filter((l) => l.zone === zone) }))
    .filter((g) => g.places.length > 0);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: localities.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/locations/${l.slug}`),
      name: `${l.name}, Bengaluru`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(itemListJsonLd)} />
      <PageHeader
        eyebrow="Service Areas"
        title="Areas We Serve Across Bengaluru"
        description="One fleet, one team — serving every part of the city with chauffeur-driven cars, SUVs, tempo travellers, Force Urbania and buses."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Locations" }]}
      />

      <section className="bg-ivory pb-24 pt-10 sm:pb-32">
        <Container>
          <div className="flex flex-col gap-12">
            {byZone.map(({ zone, places }) => (
              <div key={zone} className="flex flex-col gap-4">
                <h2 className="font-serif-luxury text-2xl text-forest-950">{zone} Bengaluru</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {places.map((l, i) => (
                    <Reveal key={l.slug} delay={40 * (i % 3)}>
                      <Link
                        href={`/locations/${l.slug}`}
                        className="group flex items-center gap-3 rounded-xl border border-forest-950/8 bg-ivory-50 px-4 py-3 transition-colors hover:border-terracotta-500"
                      >
                        <MapPin className="h-4 w-4 shrink-0 text-terracotta-600" strokeWidth={1.75} />
                        <span className="font-medium text-forest-900 group-hover:text-terracotta-600">
                          {l.name}
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
