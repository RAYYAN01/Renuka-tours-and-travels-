import { Sparkles } from "lucide-react";
import VideoHero from "@/components/ui/VideoHero";

export default function ServicesHero({ count }: { count: number }) {
  return (
    <VideoHero
      videoSrc="/services-hero.mp4"
      icon={<Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />}
      chip={`${count} Services · Transparent Pricing`}
      title="Every kind of journey, handled with care"
      description="From a two-hour airport run to a multi-day pilgrimage circuit — here's everything we offer, with transparent pricing."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
    />
  );
}
