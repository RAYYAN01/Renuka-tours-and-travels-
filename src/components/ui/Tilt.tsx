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
  // Raw pointermove can fire well above 60Hz on modern mice/trackpads;
  // getBoundingClientRect() + animate() on every single event is wasted
  // work between frames. Coalesce to one update per animation frame.
  const frameId = useRef<number | null>(null);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const { clientX, clientY } = e;

    if (frameId.current !== null) return;
    frameId.current = requestAnimationFrame(() => {
      frameId.current = null;
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width - 0.5;
      const py = (clientY - rect.top) / rect.height - 0.5;
      animate(ref.current, {
        rotateX: -py * max,
        rotateY: px * max,
        translateY: -4,
        duration: 400,
        ease: "out(3)",
      });
    });
  }

  function handleLeave(e: PointerEvent<HTMLDivElement>) {
    // Touch/pen "leave" fires on every tap (the pointer lifts, which counts
    // as leaving), even though handleMove above never applied any tilt for
    // those pointer types. Without this guard, a hybrid touchscreen device
    // that had previously tilted the card via a real mouse would replay the
    // elastic reset animation on every subsequent tap — visible as the card
    // "shaking" back to flat on press. Mouse is the only pointer type that
    // ever sets a non-zero tilt, so it's the only one that needs resetting.
    if (e.pointerType !== "mouse") return;
    if (frameId.current !== null) {
      cancelAnimationFrame(frameId.current);
      frameId.current = null;
    }
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
