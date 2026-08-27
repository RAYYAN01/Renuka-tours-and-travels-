import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import VehicleCard from "@/components/fleet/VehicleCard";
import { getFleet } from "@/lib/fleet-data";
import { sortFleetForDisplay } from "@/lib/fleet";

export default async function FeaturedFleet() {
  const fleet = sortFleetForDisplay(await getFleet());
  // Doubled so the track can translate exactly -50% and loop seamlessly —
  // the moment the first copy has scrolled fully offscreen, the second
  // copy is in the exact position the first started in.
  const track = [...fleet, ...fleet];

  return (
    <section className="overflow-hidden bg-ivory py-24 sm:py-32">
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
      </Container>

      <Reveal delay={100}>
        <div className="mt-14 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
          {/* Reuses the .marquee-track keyframe/pause-on-hover/
              reduced-motion handling already defined for TrustBar — only
              the duration is overridden here since this track is much
              longer (full fleet, doubled) than TrustBar's short icon strip. */}
          <div className="marquee-track gap-6 px-6" style={{ animationDuration: "70s" }}>
            {track.map((vehicle, i) => (
              <div key={`${vehicle.slug}-${i}`} className="w-[300px] shrink-0 sm:w-[340px]">
                <VehicleCard vehicle={vehicle} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
