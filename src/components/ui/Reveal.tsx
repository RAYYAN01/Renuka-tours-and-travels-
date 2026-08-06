"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll, createScope, type Scope } from "animejs";
import { cn } from "@/lib/cn";

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    scope.current = createScope({ root: ref }).add(() => {
      if (prefersReducedMotion) {
        animate(ref.current!, { opacity: 1, translateY: 0, duration: 0 });
        return;
      }
      animate(ref.current!, {
        opacity: [0, 1],
        translateY: [y, 0],
        duration: 800,
        delay,
        ease: "outExpo",
        autoplay: onScroll({
          target: ref.current!,
          enter: "bottom-=10% top",
          repeat: false,
        }),
      });
    });

    return () => scope.current?.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={cn("opacity-0", className)}>
      {children}
    </div>
  );
}
