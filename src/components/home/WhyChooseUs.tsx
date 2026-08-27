import Image from "next/image";
import { ShieldCheck, Wallet, Radar, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const points = [
  {
    icon: ShieldCheck,
    title: "Verified, Trained Drivers",
    description:
      "Every chauffeur is background-checked, licensed and trained in defensive driving & hospitality.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "The fare you're quoted is the fare you pay. Tolls, taxes & driver charges shown upfront — no surprises.",
  },
  {
    icon: Radar,
    title: "Live GPS Tracking",
    description:
      "Share your trip with family and track every ride in real time from pickup to drop.",
  },
  {
    icon: Sparkles,
    title: "Sanitised, Serviced Fleet",
    description:
      "Vehicles are inspected and deep-cleaned before every trip — no exceptions.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="leather-dark stitch relative overflow-hidden py-24 text-ivory sm:py-32">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-terracotta-600/15 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-terracotta-500/10 blur-[110px]" />

      <Container className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Why Renuka"
            tone="light"
            title="Why choose Renuka Tours & Travels?"
            description="Award-worthy service isn't a slogan here — it's verified drivers, honest pricing and a fleet we'd trust with our own families."
          />

          <div className="grid gap-8 sm:grid-cols-2">
            {points.map((point, i) => (
              <Reveal key={point.title} delay={70 * i}>
                <div className="flex flex-col gap-3">
                  <span className="plate-skeuo flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.45)] [background:linear-gradient(180deg,#3c6d4d,#1f3d2b)]">
                    <point.icon className="h-5 w-5 text-terracotta-300" strokeWidth={1.5} />
                  </span>
                  <h3 className="engrave-dark font-serif-luxury text-lg text-ivory">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ivory/60">
                    {point.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={150}>
          <div className="relative lg:aspect-[3/4]">
            <div className="frame-skeuo rounded-[2rem]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] lg:aspect-[3/4]">
                <Image
                  src="/kudremukh.jpg"
                  alt="Rolling green peaks of Kudremukh, Karnataka's Western Ghats"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
              </div>
            </div>
            <div className="surface-raised absolute bottom-6 left-8 right-8 rounded-2xl">
              <div className="flex items-center gap-3 p-5">
                <p className="font-serif-luxury text-2xl text-forest-950">4.9 / 5</p>
                <p className="text-xs uppercase tracking-[0.2em] text-forest-900/70">
                  Average rating across 2,400+ trips
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
