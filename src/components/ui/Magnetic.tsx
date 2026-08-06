"use client";

import { useRef, type PointerEvent } from "react";
import { animate } from "animejs";

export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (!ref.current || e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    animate(ref.current, {
      translateX: relX * strength,
      translateY: relY * strength,
      duration: 450,
      ease: "out(3)",
    });
  }

  function handleLeave() {
    if (!ref.current) return;
    animate(ref.current, {
      translateX: 0,
      translateY: 0,
      duration: 600,
      ease: "outElastic(1, 0.5)",
    });
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={className}
    >
      {children}
    </div>
  );
}
