"use client";

import { useRef, type PointerEvent } from "react";
import { animate } from "animejs";
import { cn } from "@/lib/cn";

export default function Tilt({
  children,
  className,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (!ref.current || e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    animate(ref.current, {
      rotateX: -py * max,
      rotateY: px * max,
      translateY: -4,
      duration: 400,
      ease: "out(3)",
    });
  }

  function handleLeave() {
    if (!ref.current) return;
    animate(ref.current, {
      rotateX: 0,
      rotateY: 0,
      translateY: 0,
      duration: 600,
      ease: "outElastic(1, 0.6)",
    });
  }

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn("[perspective:1000px]", className)}
    >
      <div ref={ref} className="h-full [transform-style:preserve-3d]">
        {children}
      </div>
    </div>
  );
}
