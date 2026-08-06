import { MessageCircle } from "lucide-react";
import VideoHero from "@/components/ui/VideoHero";
import { site } from "@/lib/site";

export default function ContactHero() {
  return (
    <VideoHero
      videoSrc="/contact-hero.mp4"
      icon={<MessageCircle className="h-3.5 w-3.5" strokeWidth={1.75} />}
      chip={site.hours}
      title="Let's plan your next trip"
      description="Reach out for a quote, a custom itinerary, or just to ask a question — we typically respond within the hour."
    />
  );
}
