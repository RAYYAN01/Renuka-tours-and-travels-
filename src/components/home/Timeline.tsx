"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { timeline } from "@/lib/timeline";

export default function Timeline() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-forest-950 py-24 text-ivory sm:py-32">
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-terracotta-600/15 blur-[110px]" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Our Journey"
          tone="light"
          title="A decade-plus on the road"
          description="Click through the milestones — from two sedans to a full-service fleet trusted across South India."
        />

        <Reveal delay={140}>
          <div className="mt-16">
            {/* Year markers with a connecting progress line */}
            <div
              role="tablist"
              aria-label="Company milestones"
              className="relative flex justify-between"
            >
              <div className="absolute left-0 right-0 top-[9px] h-px bg-ivory/15" />
              <div
                className="absolute left-0 top-[9px] h-px bg-terracotta-500 transition-all duration-500 ease-out"
                style={{ width: `${(active / (timeline.length - 1)) * 100}%` }}
              />
              {timeline.map((item, i) => (
                <button
                  key={item.year}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className="group relative z-10 flex flex-col items-center gap-3 rounded-full"
                >
                  <span
                    className={cn(
                      "h-[19px] w-[19px] rounded-full border-2 transition-colors duration-300",
                      i === active
                        ? "border-terracotta-500 bg-terracotta-500"
                        : "border-ivory/30 bg-forest-950 group-hover:border-ivory/60"
                    )}
                  />
                  <span
                    className={cn(
                      "font-serif-luxury text-base transition-colors duration-300 sm:text-lg",
                      i === active ? "text-terracotta-300" : "text-ivory/45 group-hover:text-ivory/70"
                    )}
                  >
                    {item.year}
                  </span>
                </button>
              ))}
            </div>

            {/* Active milestone detail — remounts on change to retrigger the fade */}
            <div className="mt-10 min-h-[7rem] rounded-2xl border border-ivory/10 bg-ivory/5 p-6 sm:p-8">
              <p key={active} className="timeline-fade text-balance text-lg leading-relaxed text-ivory/85 sm:text-xl">
                {timeline[active].text}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
