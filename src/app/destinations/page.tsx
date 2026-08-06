import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import PageFontScope from "@/components/PageFontScope";
import DestinationsHero from "@/components/destinations/DestinationsHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Popular weekend trips, hill stations, beach getaways and pilgrimage routes from Bengaluru — with estimated cost and recommended vehicle.",
  alternates: {
    canonical: "/destinations",
  },
};

// Font pairing 3/6: Cormorant Garamond + Manrope — refined boutique elegance
const heading = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"] });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500"] });

export default function DestinationsPage() {
  return (
    <PageFontScope heading={heading.style.fontFamily} body={body.style.fontFamily}>
      <DestinationsHero />
      <section className="bg-ivory pb-24 pt-10 sm:pb-32 sm:pt-14">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d, i) => (
              <Reveal key={d.slug} delay={50 * (i % 3)}>
                <DestinationCard destination={d} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </PageFontScope>
  );
}
