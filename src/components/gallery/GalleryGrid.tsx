"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/cn";
import Reveal from "@/components/ui/Reveal";
import { galleryCategories, galleryImages, type GalleryCategory } from "@/lib/gallery";

const aspectClass: Record<(typeof galleryImages)[number]["aspect"], string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

export default function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    filter === "all" ? galleryImages : galleryImages.filter((img) => img.category === filter);

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.documentElement.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, filtered.length]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterPill>
        {galleryCategories.map((c) => (
          <FilterPill key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
            {c.label}
          </FilterPill>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-center text-forest-900/70">
          No photos in this category yet — check back soon.
        </p>
      ) : (
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((img, i) => (
            <Reveal key={img.src} delay={60 * (i % 3)} className="mb-4 block">
              <button
                type="button"
                title={img.title}
                onClick={() => setLightboxIndex(i)}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-2xl bg-forest-950/5",
                  aspectClass[img.aspect]
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-forest-950/0 px-4 opacity-0 transition-all duration-300 group-hover:bg-forest-950/40 group-hover:opacity-100">
                  <Expand className="h-6 w-6 text-ivory" strokeWidth={1.75} />
                  <span className="text-center text-sm font-medium text-ivory">{img.title}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={(next) => setLightboxIndex(next)}
        />
      )}
    </>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-forest-950 text-ivory"
          : "bg-forest-950/5 text-forest-900/70 hover:bg-forest-950/10"
      )}
    >
      {children}
    </button>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onNav,
}: {
  images: { src: string; alt: string; title: string }[];
  index: number;
  onClose: () => void;
  onNav: (index: number) => void;
}) {
  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950/95 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery viewer"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-ivory/80 transition-colors hover:bg-white/10 hover:text-ivory"
      >
        <X className="h-6 w-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onNav((index - 1 + images.length) % images.length);
            }}
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ivory/80 transition-colors hover:bg-white/10 hover:text-ivory sm:left-4"
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
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ivory/80 transition-colors hover:bg-white/10 hover:text-ivory sm:right-4"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </>
      )}

      <div
        className="flex max-h-[85vh] w-full max-w-4xl flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[75vh] w-full">
          <Image src={img.src} alt={img.alt} fill sizes="90vw" className="object-contain" />
        </div>
        <p className="text-center text-sm font-medium text-ivory/85">{img.title}</p>
      </div>
    </div>
  );
}
