"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, split, createScope, type Scope } from "animejs";
import { cn } from "@/lib/cn";

export default function SplitReveal({
  children,
  className,
  delay = 0,
  as: Tag = "h1",
}: {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    scope.current = createScope({ root: ref }).add(() => {
      const { words } = split(ref.current!, { words: true, chars: false });

      if (prefersReducedMotion) {
        animate(words, { opacity: 1, translateY: 0, duration: 0 });
        return;
      }

      animate(words, {
        opacity: [0, 1],
        translateY: ["115%", "0%"],
        rotate: [4, 0],
        duration: 1000,
        delay: stagger(60, { start: delay }),
        ease: "outExpo",
      });
    });

    return () => scope.current?.revert();
  }, [delay]);

  return (
    <Tag ref={ref as never} className={cn("overflow-hidden", className)}>
      {children}
    </Tag>
  );
}
