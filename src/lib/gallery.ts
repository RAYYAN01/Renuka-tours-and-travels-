export type GalleryCategory = "fleet" | "trips" | "events";

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "fleet", label: "Our Fleet" },
  { id: "trips", label: "Trips & Destinations" },
  { id: "events", label: "Events & Weddings" },
];

export type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Rotates a small set of aspect ratios to give the masonry grid rhythm. */
  aspect: "portrait" | "square" | "landscape";
};

// Drop new photos into /public/gallery and add an entry below, e.g.:
// { src: "/gallery/my-photo.jpg", alt: "Describe the photo", category: "fleet", aspect: "landscape" },
export const galleryImages: GalleryImage[] = [];
