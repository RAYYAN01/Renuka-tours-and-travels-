import { Compass } from "lucide-react";
import VideoHero from "@/components/ui/VideoHero";
import { destinations } from "@/lib/destinations";

export default function DestinationsHero() {
  return (
    <VideoHero
      videoSrc="/destinations-hero.mp4"
      icon={<Compass className="h-3.5 w-3.5" strokeWidth={1.75} />}
      chip={`${destinations.length} Hand-Picked Routes`}
      title="Where our travellers go"
      description="Hand-picked routes from Bengaluru, each with an estimated cost and the right vehicle already worked out for you."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
    />
  );
}
