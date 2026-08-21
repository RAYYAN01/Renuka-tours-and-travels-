import type { Metadata } from "next";
import DestinationsHero from "@/components/destinations/DestinationsHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import DestinationCard from "@/components/DestinationCard";
import { destinations, sortDestinationsByName } from "@/lib/destinations";
import { absoluteUrl, jsonLdScriptProps, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Destinations",
  description:
    "Popular weekend trips, hill stations, beach getaways and pilgrimage routes from Bengaluru — with estimated cost and recommended vehicle.",
  path: "/destinations",
  keywords: [
    "Bengaluru to Mysuru cab",
    "Bengaluru to Coorg taxi",
    "Bengaluru to Ooty cab",
    "Bengaluru to Goa taxi",
    "Bengaluru to Tirupati taxi",
    "Bengaluru to Hampi cab",
    "Bengaluru to Wayanad taxi",
    "Bengaluru to Kodaikanal cab",
    "Bengaluru to Munnar taxi",
    "weekend trips from Bengaluru",
    "one way cab Bengaluru to Goa",
    "same day Tirupati darshan cab from Bengaluru",
    "Bengaluru to Coorg tour package by car",
    "hill station trips near Bengaluru by road",
    "multi day outstation trip from Bengaluru",
    "South India road trip cab hire",
  ],
});

const sortedDestinations = sortDestinationsByName(destinations);

const destinationsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: sortedDestinations.map((d, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: absoluteUrl(`/destinations/${d.slug}`),
    item: {
      "@type": "TouristTrip",
      name: `${d.name} trip from Bengaluru`,
      image: absoluteUrl(d.image),
      url: absoluteUrl(`/destinations/${d.slug}`),
    },
  })),
};

export default function DestinationsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(destinationsJsonLd)} />
      <DestinationsHero />
      <section className="bg-ivory pb-24 pt-10 sm:pb-32 sm:pt-14">
        <Container>
          <h2 className="sr-only">Popular Destinations from Bengaluru</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedDestinations.map((d, i) => (
              <Reveal key={d.slug} delay={50 * (i % 3)}>
                <DestinationCard destination={d} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
