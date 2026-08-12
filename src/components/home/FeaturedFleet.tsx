import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import VehicleCard from "@/components/fleet/VehicleCard";
import { featuredFleet } from "@/lib/fleet";

export default function FeaturedFleet() {
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Our Fleet"
            title="What vehicles does Renuka Tours & Travels offer?"
            description="From nimble sedans for the city to luxury vans for the whole family — every vehicle is sanitised, serviced and driven by a verified chauffeur."
          />
          <Reveal delay={200}>
            <Button href="/fleet" variant="text">
              View Full Fleet <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredFleet.map((vehicle, i) => (
            <Reveal key={vehicle.slug} delay={80 * (i % 3)}>
              <VehicleCard vehicle={vehicle} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}