"use client";

import { Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest-950">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* Legibility gradient — darkest at the bottom where the floating search bar sits */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/45 to-forest-950/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 via-transparent to-forest-950/40" />

      <Container className="relative z-10 flex flex-col gap-7 pb-40 pt-40 sm:pb-48 sm:pt-48">
        <Reveal>
          <p className="glass-chip inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em]">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
            Since {site.founded} · Bengaluru&apos;s Trusted Fleet
          </p>
        </Reveal>

        <SplitReveal
          as="h1"
          delay={150}
          className="font-serif-luxury text-balance text-[13vw] leading-[0.98] tracking-tight text-ivory sm:text-6xl md:text-[4.6rem] lg:text-[5rem]"
        >
          Journeys, chauffeured to perfection.
        </SplitReveal>

        <Reveal delay={550} y={16}>
          <p className="max-w-lg text-balance text-lg leading-relaxed text-ivory/85">
            Self-drive and chauffeur-driven cars, SUVs, tempo travellers and
            coaches — for airport runs, weddings, corporate travel and
            pilgrimages across India. Verified drivers, transparent pricing,
            no surprises.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
