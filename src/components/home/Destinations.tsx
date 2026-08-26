import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import DestinationCard from "@/components/DestinationCard";
import { getFeaturedDestinations } from "@/lib/destinations-data";

export default async function Destinations() {
  const featuredDestinations = await getFeaturedDestinations();

  return (
    <section className="bg-ivory py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Popular Destinations"
            title="Where can you travel with Renuka Tours & Travels?"
            description="Hand-picked routes from Bengaluru with the right vehicle and estimated cost pre-calculated for you."
          />
          <Reveal delay={200}>
            <Button href="/destinations" variant="text">
              View All Destinations <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDestinations.map((d, i) => (
            <Reveal key={d.slug} delay={60 * (i % 3)}>
              <DestinationCard destination={d} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
