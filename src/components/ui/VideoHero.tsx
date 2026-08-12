"use client";

import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { cn } from "@/lib/cn";
import type { BreadcrumbItem } from "@/lib/seo";

/** Shared full-screen video hero used by every top-level page (Home, Fleet,
 * Destinations, Services, About, Contact) — same layout/gradient/reveal
 * choreography throughout, parameterized by video, icon and copy.
 *
 * `icon` takes an already-rendered element (`<ShieldCheck .../>`), not a
 * component reference — the callers are Server Components, and a bare
 * component reference isn't serializable across the Server→Client boundary
 * into this "use client" component, only JSX elements are. */
export default function VideoHero({
  videoSrc,
  icon,
  chip,
  title,
  description,
  videoClassName,
  breadcrumbs,
}: {
  videoSrc: string;
  icon: ReactNode;
  chip: ReactNode;
  title: string;
  description: ReactNode;
  videoClassName?: string;
  breadcrumbs?: BreadcrumbItem[];
}) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest-950">
      <video
        className={cn("absolute inset-0 h-full w-full object-cover", videoClassName)}
        src={videoSrc}
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
        {breadcrumbs && (
          <Reveal>
            <Breadcrumbs items={breadcrumbs} />
          </Reveal>
        )}
        <Reveal>
          <p className="glass-chip inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em]">
            {icon}
            {chip}
          </p>
        </Reveal>

        <SplitReveal
          as="h1"
          delay={150}
          className="font-serif-luxury text-balance text-[13vw] leading-[0.98] tracking-tight text-ivory sm:text-6xl md:text-[4.6rem] lg:text-[5rem]"
        >
          {title}
        </SplitReveal>

        <Reveal delay={550} y={16}>
          <p className="max-w-lg text-balance text-lg leading-relaxed text-ivory/85">
            {description}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
