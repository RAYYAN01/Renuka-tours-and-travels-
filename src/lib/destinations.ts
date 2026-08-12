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
}

export const destinations: Destination[] = [
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
  },
];
