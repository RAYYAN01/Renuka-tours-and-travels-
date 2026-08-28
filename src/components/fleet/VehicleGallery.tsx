"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ImageLightbox, { type LightboxImage } from "@/components/ui/ImageLightbox";

/** Fleet detail page's hero photo + thumbnail strip — every image opens a
 * full-screen, zoomable lightbox on click (scroll/pinch to zoom, drag to
 * pan once zoomed, arrow keys or on-screen arrows to move between all of
 * this vehicle's photos, not just the visible thumbnails). */
export default function VehicleGallery({
  heroImage,
  thumbnails,
  fullGallery,
}: {
  heroImage: LightboxImage;
  /** Preview strip shown beneath the hero photo (capped at 5 in the caller). */
  thumbnails: LightboxImage[];
  /** Complete photo set for this vehicle — the lightbox navigates through
   * all of it, not just the handful of visible thumbnails. */
  fullGallery: LightboxImage[];
}) {
  const allImages: LightboxImage[] =
    fullGallery.length > 0
      ? fullGallery.some((i) => i.src === heroImage.src)
        ? fullGallery
        : [heroImage, ...fullGallery]
      : [heroImage, ...thumbnails.filter((t) => t.src !== heroImage.src)];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroIndexInAll = Math.max(0, allImages.findIndex((i) => i.src === heroImage.src));

  return (
    <div className="flex flex-col gap-4">
      <Reveal>
        <button
          type="button"
          onClick={() => setLightboxIndex(heroIndexInAll)}
          className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-luxury"
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-forest-950/0 opacity-0 transition-all duration-300 group-hover:bg-forest-950/30 group-hover:opacity-100">
            <Expand className="h-8 w-8 text-ivory" strokeWidth={1.5} />
          </span>
        </button>
      </Reveal>

      {thumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {thumbnails.map((thumb) => {
            const indexInAll = allImages.findIndex((i) => i.src === thumb.src);
            return (
              <button
                key={thumb.src}
                type="button"
                onClick={() => setLightboxIndex(indexInAll === -1 ? 0 : indexInAll)}
                className="group relative aspect-square overflow-hidden rounded-xl border border-forest-950/8"
              >
                <Image src={thumb.src} alt={thumb.alt} fill sizes="120px" className="object-cover" />
                <span className="absolute inset-0 flex items-center justify-center bg-forest-950/0 opacity-0 transition-all duration-300 group-hover:bg-forest-950/30 group-hover:opacity-100">
                  <Expand className="h-4 w-4 text-ivory" strokeWidth={1.75} />
                </span>
              </button>
            );
          })}
        </div>
      )}

      {lightboxIndex !== null && (
        <ImageLightbox
          images={allImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={setLightboxIndex}
        />
      )}
    </div>
  );
}
