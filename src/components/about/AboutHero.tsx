import { ShieldCheck } from "lucide-react";
import VideoHero from "@/components/ui/VideoHero";
import { site } from "@/lib/site";
import { getFleet } from "@/lib/fleet-data";

export default async function AboutHero() {
  const fleet = await getFleet();
  return (
    <VideoHero
      videoSrc="/about-hero.mp4"
      videoClassName="contrast-[1.15] saturate-[1.25] brightness-[1.05]"
      icon={<ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />}
      chip={`Since ${site.founded} · Trusted Across South India`}
      title="Built on trust, one trip at a time"
      description={`Since ${site.founded}, ${site.name} has grown from two sedans to a fleet of ${fleet.length} vehicles — without losing sight of what got us here: reliability, honesty and care.`}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
    />
  );
}
