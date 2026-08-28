import { Car } from "lucide-react";
import VideoHero from "@/components/ui/VideoHero";
import { fleetCategories } from "@/lib/fleet";
import { getFleet } from "@/lib/fleet-data";

export default async function FleetHero() {
  const fleet = await getFleet();
  return (
    <VideoHero
      videoSrc="/fleet-hero.mp4"
      icon={<Car className="h-3.5 w-3.5" strokeWidth={1.75} />}
      chip={`${fleet.length} Vehicles · ${fleetCategories.length} Categories`}
      title="A vehicle for every journey"
      description="Sedans, SUVs, tempo travellers, luxury vans and coaches — all well-maintained and ready to go. Filter by type below to find the right fit for your trip."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Fleet" }]}
    />
  );
}
