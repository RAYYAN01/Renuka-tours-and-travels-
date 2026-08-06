"use client";

import { Compass } from "lucide-react";
import Container from "@/components/ui/Container";
import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";
import { destinations } from "@/lib/destinations";

export default function DestinationsHero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest-950">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/destinations-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* Legibility gradient — darkest at the bottom where the heading sits */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/50 to-forest-950/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/60 via-transparent to-forest-950/50" />

      <Container className="relative z-10 flex flex-col gap-7 pb-40 pt-40 sm:pb-48 sm:pt-48">
        <Reveal>
          <p className="glass-chip inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em]">
            <Compass className="h-3.5 w-3.5" strokeWidth={1.75} />
            {destinations.length} Hand-Picked Routes
          </p>
        </Reveal>

        <SplitReveal
          as="h1"
          delay={150}
          className="font-serif-luxury text-balance text-[13vw] leading-[0.98] tracking-tight text-ivory sm:text-6xl md:text-[4.6rem] lg:text-[5rem]"
        >
          Where our travellers go
        </SplitReveal>

        <Reveal delay={550} y={16}>
          <p className="max-w-lg text-balance text-lg leading-relaxed text-ivory/85">
            Hand-picked routes from Bengaluru, each with an estimated cost and
            the right vehicle already worked out for you.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
