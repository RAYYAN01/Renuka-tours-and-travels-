import { Compass } from "lucide-react";
import VideoHero from "@/components/ui/VideoHero";

export default function DestinationsHero({ count }: { count: number }) {
  return (
    <VideoHero
      videoSrc="/destinations-hero.mp4"
      icon={<Compass className="h-3.5 w-3.5" strokeWidth={1.75} />}
      chip={`${count} Hand-Picked Routes`}
      title="Where our travellers go"
      description="Hand-picked routes from Bengaluru, each with an estimated cost and the right vehicle already worked out for you."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
    />
  );
}
