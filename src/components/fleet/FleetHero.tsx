import { Car } from "lucide-react";
import VideoHero from "@/components/ui/VideoHero";
import { fleetCategories } from "@/lib/fleet";

export default function FleetHero() {
  return (
    <VideoHero
      videoSrc="/fleet-hero.mp4"
      icon={<Car className="h-3.5 w-3.5" strokeWidth={1.75} />}
      chip={`40+ Vehicles · ${fleetCategories.length} Categories`}
      title="A vehicle for every journey"
      description="Sedans, SUVs, tempo travellers, luxury vans and coaches — all well-maintained and ready to go. Filter by type below to find the right fit for your trip."
    />
  );
}
