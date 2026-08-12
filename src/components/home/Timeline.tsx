"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { timeline } from "@/lib/timeline";

// Vertical alternating ("zig-zag") timeline: a spine down the middle (left
// edge on mobile), milestones alternating left/right as you scroll down.
// The spine fills and each dot lights up as its milestone crosses the
// viewport centre — an IntersectionObserver drives that, no scroll-jank
// listeners.
export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number(entry.target.getAttribute("data-index"));
          setActiveIndex((current) => Math.max(current, index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    for (const el of itemRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const progress = (activeIndex / (timeline.length - 1)) * 100;

  return (
    <section className="relative overflow-hidden bg-forest-950 py-24 text-ivory sm:py-32">
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-terracotta-600/15 blur-[110px]" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Our Journey"
          tone="light"
          align="center"
          title="How long has Renuka Tours & Travels been in business?"
          description="Scroll through the milestones — from two sedans to a full-service fleet trusted across South India."
        />

        <div className="relative mx-auto mt-20 max-w-3xl">
          {/* Spine — left edge on mobile, centered from sm up */}
          <div className="absolute left-[7px] top-0 h-full w-px bg-ivory/15 sm:left-1/2 sm:-translate-x-1/2" />
          <div
            className="absolute left-[7px] top-0 w-px bg-terracotta-500 transition-[height] duration-700 ease-out sm:left-1/2 sm:-translate-x-1/2"
            style={{ height: `${progress}%` }}
          />

          <div className="flex flex-col gap-16 sm:gap-4">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              const passed = i <= activeIndex;

              const content = (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ivory/55">
                    Milestone {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-serif-luxury text-3xl text-ivory sm:text-4xl">
                    {item.year}
                  </h3>
                  <p className="mt-3 text-ivory/70">{item.text}</p>
                </>
              );

              return (
                <div
                  key={item.year}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  data-index={i}
                  className="relative sm:grid sm:grid-cols-2 sm:gap-x-12 sm:py-6"
                >
                  {/* Dot */}
                  <span
                    className={cn(
                      "absolute left-[7px] top-1.5 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 transition-colors duration-300 sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2",
                      passed
                        ? "border-terracotta-500 bg-terracotta-500"
                        : "border-ivory/30 bg-forest-950"
                    )}
                  />

                  {isLeft ? (
                    <>
                      <div className="pl-8 sm:pl-0 sm:pr-12 sm:text-right">{content}</div>
                      <div className="hidden sm:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden sm:block" />
                      <div className="pl-8 sm:pl-12 sm:text-left">{content}</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
