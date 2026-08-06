"use client";

import { useEffect, useRef, useState } from "react";
import { animate, onScroll, createScope, type Scope } from "animejs";

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const scope = useRef<Scope | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const counter = { value: 0 };

    scope.current = createScope({ root: ref }).add(() => {
      animate(counter, {
        value,
        duration: 1800,
        ease: "outExpo",
        onUpdate: () => setDisplay(Math.round(counter.value)),
        autoplay: onScroll({
          target: ref.current!,
          enter: "bottom-=10% top",
          repeat: false,
        }),
      });
    });

    return () => scope.current?.revert();
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
