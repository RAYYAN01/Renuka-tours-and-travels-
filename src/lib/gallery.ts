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

// Starter set drawn from existing site photography so the page isn't empty.
// Drop new photos into /public/gallery and add an entry below — real photos
// replace these placeholders whenever they're provided.
export const galleryImages: GalleryImage[] = [
  { src: "/fleet/innova-crysta-front-01.jpeg", alt: "Toyota Innova Crysta, front view", category: "fleet", aspect: "landscape" },
  { src: "/fleet/force-urbania-front-01.jpeg", alt: "Force Urbania van, front view", category: "fleet", aspect: "portrait" },
  { src: "/fleet/coach-sgr-front-01.jpeg", alt: "Tourist coach, front view", category: "fleet", aspect: "landscape" },
  { src: "/fleet/dzire-front-01.jpeg", alt: "Maruti Suzuki Dzire, front view", category: "fleet", aspect: "square" },
  { src: "/fleet/force-traveller-yaksha-front-01.jpeg", alt: "Force Traveller Yaksha, front view", category: "fleet", aspect: "portrait" },
  { src: "/fleet/innova-hycross-front-01.jpeg", alt: "Toyota Innova Hycross, front view", category: "fleet", aspect: "landscape" },
  { src: "/fleet/etios-front-01.jpeg", alt: "Toyota Etios, front view", category: "fleet", aspect: "square" },
  { src: "/fleet/coach-sgr-interior-01.jpeg", alt: "Tourist coach interior seating", category: "fleet", aspect: "landscape" },
  { src: "/coorg.jpg", alt: "Misty hills and coffee plantations in Coorg", category: "trips", aspect: "portrait" },
  { src: "/goa.jpg", alt: "Beachfront in Goa", category: "trips", aspect: "landscape" },
  { src: "/hampi.jpg", alt: "Ancient boulder ruins in Hampi", category: "trips", aspect: "square" },
  { src: "/mysuru.jpg", alt: "Mysuru Palace at dusk", category: "trips", aspect: "portrait" },
  { src: "/ooty.jpg", alt: "Tea gardens in Ooty", category: "trips", aspect: "landscape" },
  { src: "/tirupati.jpg", alt: "Hillside temple town of Tirupati", category: "trips", aspect: "square" },
];
