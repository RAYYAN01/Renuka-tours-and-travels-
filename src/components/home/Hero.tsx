import { Sparkles } from "lucide-react";
import VideoHero from "@/components/ui/VideoHero";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <VideoHero
      videoSrc="/hero-loop.mp4"
      icon={<Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />}
      chip={
        <>
          Since {site.founded} · Bengaluru&apos;s Trusted Fleet
        </>
      }
      title="Journeys, chauffeured to perfection."
      description="Self-drive and chauffeur-driven cars, SUVs, tempo travellers and coaches — for airport runs, weddings, corporate travel and pilgrimages across India. Verified drivers, transparent pricing, no surprises."
    />
  );
}
