"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/cn";

export interface LightboxImage {
  src: string;
  alt: string;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));

function touchDistance(touches: React.TouchList) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.hypot(dx, dy);
}

/** Full-screen image viewer with click-to-zoom, scroll/pinch zoom, and
 * drag-to-pan once zoomed in — used anywhere a fleet photo needs a closer
 * look than the card/thumbnail size allows. Resets zoom on every image
 * change so it never opens the next photo already zoomed in. */
export default function ImageLightbox({
  images,
  index,
  onClose,
  onNav,
}: {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNav: (index: number) => void;
}) {
  const img = images[index];
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const pinchRef = useRef<{ startDist: number; startScale: number } | null>(null);

  // Reset zoom whenever the displayed image changes — the recommended React
  // pattern for resetting state on a prop change (adjusting state during
  // render) rather than doing it inside an effect.
  const [prevIndex, setPrevIndex] = useState(index);
  if (index !== prevIndex) {
    setPrevIndex(index);
    setScale(1);
    setPos({ x: 0, y: 0 });
  }

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((index + 1) % images.length);
      if (e.key === "ArrowLeft") onNav((index - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, images.length, onClose, onNav]);

  function zoomBy(delta: number) {
    setScale((s) => {
      const next = clampScale(s + delta);
      if (next === 1) setPos({ x: 0, y: 0 });
      return next;
    });
  }

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    zoomBy(e.deltaY > 0 ? -0.4 : 0.4);
  }

  function handleDoubleClick() {
    setScale((s) => (s > 1 ? 1 : 2.5));
    setPos({ x: 0, y: 0 });
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (scale === 1) return;
    setIsInteracting(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y };
  }
  function handlePointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return;
    setPos({
      x: dragRef.current.origX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.origY + (e.clientY - dragRef.current.startY),
    });
  }
  function endDrag() {
    dragRef.current = null;
    setIsInteracting(false);
  }

  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      pinchRef.current = { startDist: touchDistance(e.touches), startScale: scale };
    }
  }
  function handleTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const ratio = touchDistance(e.touches) / pinchRef.current.startDist;
      setScale(clampScale(pinchRef.current.startScale * ratio));
    }
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (e.touches.length < 2) pinchRef.current = null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950/95 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-ivory/80 transition-colors hover:bg-white/10 hover:text-ivory"
      >
        <X className="h-6 w-6" />
      </button>

      <div
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-forest-950/70 p-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => zoomBy(-0.6)}
          disabled={scale <= MIN_SCALE}
          className="flex h-9 w-9 items-center justify-center rounded-full text-ivory/80 transition-colors hover:bg-white/10 hover:text-ivory disabled:opacity-30"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <span className="min-w-[3ch] text-center text-xs font-medium text-ivory/70">
          {Math.round(scale * 100)}%
        </span>
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => zoomBy(0.6)}
          disabled={scale >= MAX_SCALE}
          className="flex h-9 w-9 items-center justify-center rounded-full text-ivory/80 transition-colors hover:bg-white/10 hover:text-ivory disabled:opacity-30"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onNav((index - 1 + images.length) % images.length);
            }}
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ivory/80 transition-colors hover:bg-white/10 hover:text-ivory sm:left-4"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onNav((index + 1) % images.length);
            }}
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ivory/80 transition-colors hover:bg-white/10 hover:text-ivory sm:right-4"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </>
      )}

      <div
        className="relative h-[80vh] w-full max-w-4xl touch-none overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={cn("relative h-full w-full", !isInteracting && "transition-transform duration-150 ease-out")}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            cursor: scale > 1 ? "grab" : "zoom-in",
          }}
        >
          <Image src={img.src} alt={img.alt} fill sizes="90vw" className="object-contain" priority />
        </div>
      </div>
    </div>
  );
}
