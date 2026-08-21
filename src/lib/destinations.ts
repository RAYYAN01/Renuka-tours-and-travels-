import type { FleetCategory } from "@/lib/fleet";

const VEHICLE_TEXT_TO_CATEGORY: Record<string, FleetCategory> = {
  Sedan: "sedan",
  SUV: "suv",
  "Tempo Traveller": "traveller",
  "Luxury Van": "luxury-van",
  Coach: "coach",
};

/** Parses a free-text `recommendedVehicle` string (e.g. "SUV or Tempo
 * Traveller") into the fleet categories it mentions, for linking each one to
 * its filtered `/fleet?category=` listing. */
export function recommendedVehicleCategories(
  recommendedVehicle: string
): { label: string; category: FleetCategory }[] {
  return Object.entries(VEHICLE_TEXT_TO_CATEGORY)
    .filter(([label]) => recommendedVehicle.includes(label))
    .map(([label, category]) => ({ label, category }));
}

export interface Destination {
  slug: string;
  name: string;
  kind: string;
  distance: string;
  duration: string;
  estimatedCost: string;
  recommendedVehicle: string;
  image: string;
  description: string;
  /** True for the original, most-requested routes — shown in the homepage
   * "Popular Destinations" teaser. The full A-Z list still shows every
   * destination on /destinations regardless of this flag. */
  featured?: boolean;
}

export const destinations: Destination[] = [
  {
    slug: "alleppey",
    name: "Alleppey",
    kind: "Backwaters",
    distance: "660 km",
    duration: "~12.5 hrs",
    estimatedCost: "₹13,200 – ₹19,100",
    recommendedVehicle: "SUV or Luxury Van",
    // Placeholder — reuses the Wayanad (Kerala) photo until real Alleppey
    // photography is available.
    image: "/wayand.webp",
    description:
      "Kerala's iconic backwaters — houseboat stays and palm-fringed canals, best paired with an overnight halt for a relaxed multi-day getaway.",
  },
  {
    slug: "chikmagalur",
    name: "Chikmagalur",
    kind: "Hill Station",
    distance: "245 km",
    duration: "~5.5 hrs",
    estimatedCost: "₹4,900 – ₹7,100",
    recommendedVehicle: "SUV or Tempo Traveller",
    // Placeholder — reuses the Coorg photo (same Western Ghats coffee
    // country) until real Chikmagalur photography is available.
    image: "/coorg.jpg",
    description:
      "Coffee estates, misty viewpoints and waterfalls in the Western Ghats — a favourite short hill getaway for small groups.",
  },
  {
    slug: "coonoor",
    name: "Coonoor",
    kind: "Hill Station",
    distance: "265 km",
    duration: "~6 hrs",
    estimatedCost: "₹5,300 – ₹7,700",
    recommendedVehicle: "SUV or Tempo Traveller",
    // Placeholder — reuses the Ooty photo (neighbouring Nilgiris hill
    // station) until real Coonoor photography is available.
    image: "/ooty.jpg",
    description:
      "A quieter neighbour to Ooty with tea estates and colonial charm — often combined into the same Nilgiris hill-station trip.",
  },
  {
    slug: "coorg",
    name: "Coorg",
    kind: "Hill Station",
    distance: "260 km",
    duration: "~6 hrs",
    estimatedCost: "₹5,500 – ₹7,800",
    recommendedVehicle: "SUV or Tempo Traveller",
    image: "/coorg.jpg",
    description:
      "Coffee estates, misty hills and waterfalls — ideal for a 2–3 day family or group getaway with winding hill roads.",
    featured: true,
  },
  {
    slug: "dharmasthala-kukke-subramanya",
    name: "Dharmasthala & Kukke Subramanya",
    kind: "Pilgrimage",
    distance: "285 km",
    duration: "~6.5 hrs",
    estimatedCost: "₹5,700 – ₹8,300",
    recommendedVehicle: "SUV, Tempo Traveller or Coach",
    // Placeholder — reuses the Tirupati photo (same pilgrimage-trip theme)
    // until real photography is available.
    image: "/tirupati.jpg",
    description:
      "Two revered Western Ghats temple towns often visited together — a popular group pilgrimage route with scenic hill roads.",
  },
  {
    slug: "goa",
    name: "Goa",
    kind: "Beach Getaway",
    distance: "560 km",
    duration: "~10 hrs",
    estimatedCost: "₹11,000 – ₹16,000",
    recommendedVehicle: "SUV or Luxury Van",
    image: "/goa.jpg",
    description:
      "Beaches, seafood and sunsets — best travelled overnight in a comfortable SUV or luxury van for groups.",
    featured: true,
  },
  {
    slug: "gokarna",
    name: "Gokarna",
    kind: "Beach Getaway",
    distance: "480 km",
    duration: "~9.5 hrs",
    estimatedCost: "₹9,600 – ₹13,900",
    recommendedVehicle: "SUV or Luxury Van",
    // Placeholder — reuses the Goa photo (same coastal-beach theme) until
    // real Gokarna photography is available.
    image: "/goa.jpg",
    description:
      "A quieter, more laid-back coastal escape than Goa — known for Om Beach and its temple town charm.",
  },
  {
    slug: "hampi",
    name: "Hampi",
    kind: "Heritage Site",
    distance: "340 km",
    duration: "~6.5 hrs",
    estimatedCost: "₹6,800 – ₹9,500",
    recommendedVehicle: "SUV or Tempo Traveller",
    image: "/hampi.jpg",
    description:
      "UNESCO ruins amid boulder-strewn landscapes — a favourite for heritage groups and photography tours.",
    featured: true,
  },
  {
    slug: "kanyakumari",
    name: "Kanyakumari",
    kind: "Beach Getaway",
    distance: "730 km",
    duration: "~13.5 hrs",
    estimatedCost: "₹14,600 – ₹21,200",
    recommendedVehicle: "SUV or Luxury Van",
    // Placeholder — reuses the Goa photo (same coastal-beach theme) until
    // real Kanyakumari photography is available.
    image: "/goa.jpg",
    description:
      "India's southernmost tip, where the Arabian Sea, Bay of Bengal and Indian Ocean meet — a bucket-list multi-day trip for groups.",
  },
  {
    slug: "kodaikanal",
    name: "Kodaikanal",
    kind: "Hill Station",
    distance: "460 km",
    duration: "~9 hrs",
    estimatedCost: "₹9,200 – ₹13,200",
    recommendedVehicle: "SUV or Tempo Traveller",
    image: "/kodaikanal.webp",
    description:
      "The Princess of Hill Stations — a cool-climate lake town in Tamil Nadu, best done as a comfortable multi-day group getaway.",
    featured: true,
  },
  {
    slug: "kumarakom",
    name: "Kumarakom",
    kind: "Backwaters",
    distance: "680 km",
    duration: "~12.5 hrs",
    estimatedCost: "₹13,600 – ₹19,700",
    recommendedVehicle: "SUV or Luxury Van",
    // Placeholder — reuses the Wayanad (Kerala) photo until real Kumarakom
    // photography is available.
    image: "/wayand.webp",
    description:
      "Serene backwater village on Vembanad Lake — often paired with Alleppey for a longer Kerala backwaters circuit.",
  },
  {
    slug: "mantralaya",
    name: "Mantralaya",
    kind: "Pilgrimage",
    distance: "350 km",
    duration: "~7 hrs",
    estimatedCost: "₹7,000 – ₹10,200",
    recommendedVehicle: "SUV, Tempo Traveller or Coach",
    // Placeholder — reuses the Tirupati photo (same pilgrimage-trip theme)
    // until real photography is available.
    image: "/tirupati.jpg",
    description:
      "The riverside seat of Sri Raghavendra Swamy Mutt — a well-booked single or overnight pilgrimage route for groups.",
  },
  {
    slug: "munnar",
    name: "Munnar",
    kind: "Hill Station",
    distance: "480 km",
    duration: "~9.5 hrs",
    estimatedCost: "₹9,600 – ₹13,800",
    recommendedVehicle: "SUV or Tempo Traveller",
    image: "/munnar.webp",
    description:
      "Rolling tea estates and cool Western Ghats air in Kerala — one of our most-requested multi-day hill station routes.",
    featured: true,
  },
  {
    slug: "mysuru",
    name: "Mysuru",
    kind: "Heritage City",
    distance: "145 km",
    duration: "~3.5 hrs",
    estimatedCost: "₹3,200 – ₹4,500",
    recommendedVehicle: "Sedan or SUV",
    image: "/mysuru.jpg",
    description:
      "Palaces, silk sarees and sandalwood — a favourite weekend heritage run from Bengaluru, best done as a comfortable day trip.",
    featured: true,
  },
  {
    slug: "nandi-hills",
    name: "Nandi Hills",
    kind: "Hill Station",
    distance: "60 km",
    duration: "~1.5 hrs",
    estimatedCost: "₹1,200 – ₹1,700",
    recommendedVehicle: "Sedan or SUV",
    // Placeholder — reuses the Hampi photo (same rocky-hill landscape)
    // until real Nandi Hills photography is available.
    image: "/hampi.jpg",
    description:
      "Bengaluru's closest hill escape — a favourite for an early sunrise viewpoint trip and back before noon.",
  },
  {
    slug: "ooty",
    name: "Ooty",
    kind: "Hill Station",
    distance: "270 km",
    duration: "~6.5 hrs",
    estimatedCost: "₹5,800 – ₹8,200",
    recommendedVehicle: "SUV or Tempo Traveller",
    image: "/ooty.jpg",
    description:
      "The Queen of Hill Stations — toy trains, tea gardens and cool weather, a classic multi-day family holiday route.",
    featured: true,
  },
  {
    slug: "pondicherry",
    name: "Pondicherry",
    kind: "Heritage & Beach",
    distance: "320 km",
    duration: "~7 hrs",
    estimatedCost: "₹6,400 – ₹9,300",
    recommendedVehicle: "SUV or Luxury Van",
    // Placeholder — reuses the Goa photo (same coastal-heritage theme)
    // until real Pondicherry photography is available.
    image: "/goa.jpg",
    description:
      "French Quarter streets, Auroville and the Promenade — a relaxed heritage-meets-beach multi-day trip.",
  },
  {
    slug: "rameshwaram",
    name: "Rameshwaram",
    kind: "Pilgrimage",
    distance: "570 km",
    duration: "~11 hrs",
    estimatedCost: "₹11,400 – ₹16,500",
    recommendedVehicle: "SUV, Tempo Traveller or Coach",
    // Placeholder — reuses the Tirupati photo (same pilgrimage-trip theme)
    // until real Rameshwaram photography is available.
    image: "/tirupati.jpg",
    description:
      "The island temple town on the Pamban Bridge — a well-booked multi-day pilgrimage circuit for groups.",
  },
  {
    slug: "sakleshpur",
    name: "Sakleshpur",
    kind: "Hill Station",
    distance: "220 km",
    duration: "~5 hrs",
    estimatedCost: "₹4,400 – ₹6,400",
    recommendedVehicle: "SUV or Tempo Traveller",
    // Placeholder — reuses the Coorg photo (same Western Ghats coffee
    // country) until real Sakleshpur photography is available.
    image: "/coorg.jpg",
    description:
      "Coffee country and Western Ghats forest trails — a quick weekend nature escape for small groups.",
  },
  {
    slug: "tirupati",
    name: "Tirupati",
    kind: "Pilgrimage",
    distance: "255 km",
    duration: "~5.5 hrs",
    estimatedCost: "₹5,200 – ₹7,500",
    recommendedVehicle: "SUV, Tempo Traveller or Coach",
    image: "/tirupati.jpg",
    description:
      "One of our most-booked pilgrimage routes — early morning departures available for a same-day darshan trip.",
    featured: true,
  },
  {
    slug: "trivandrum-kovalam",
    name: "Trivandrum & Kovalam",
    kind: "Beach Getaway",
    distance: "730 km",
    duration: "~13.5 hrs",
    estimatedCost: "₹14,600 – ₹21,200",
    recommendedVehicle: "SUV or Luxury Van",
    // Placeholder — reuses the Goa photo (same coastal-beach theme) until
    // real Trivandrum/Kovalam photography is available.
    image: "/goa.jpg",
    description:
      "Kerala's capital and its famous lighthouse beach — a longer multi-day coastal trip best done overnight.",
  },
  {
    slug: "wayanad",
    name: "Wayanad",
    kind: "Hill Station",
    distance: "285 km",
    duration: "~6.5 hrs",
    estimatedCost: "₹5,800 – ₹8,300",
    recommendedVehicle: "SUV or Tempo Traveller",
    image: "/wayand.webp",
    description:
      "Wildlife sanctuaries, spice plantations and misty hills in Kerala's green north — a favourite for a nature-focused weekend trip.",
    featured: true,
  },
];

/** Reusable alphabetical sort by display name — ascending, case-insensitive,
 * locale-aware, so a newly added destination is placed correctly without
 * touching this function or any hard-coded order. */
export function sortDestinationsByName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
}

export const featuredDestinations = sortDestinationsByName(destinations.filter((d) => d.featured));
