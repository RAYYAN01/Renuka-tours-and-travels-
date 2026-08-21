export type FleetCategory = "sedan" | "suv" | "traveller" | "luxury-van" | "coach";

export const fleetCategories: { id: FleetCategory; label: string }[] = [
  { id: "sedan", label: "Sedans" },
  { id: "suv", label: "SUVs" },
  { id: "traveller", label: "Tempo Travellers" },
  { id: "luxury-van", label: "Luxury Vans" },
  { id: "coach", label: "Coaches" },
];

export interface FleetVehicle {
  slug: string;
  name: string;
  tagline: string;
  category: FleetCategory;
  categoryLabel: string;
  seats: number;
  luggage: string;
  ac: boolean;
  fuel: string;
  driverIncluded: boolean;
  /** Per-km rate, or null when priceOnRequest is true. */
  priceFrom: number | null;
  priceUnit: string;
  /** Minimum billable running distance per day, or null if not confirmed
   * for this vehicle (see priceOnRequest / legacy-priced vehicles below). */
  minKmPerDay: number | null;
  /** Driver allowance per day, or null if not confirmed for this vehicle. */
  driverBata: number | null;
  dutyStart: string | null;
  dutyEnd: string | null;
  /** True for vehicles with no confirmed per-km rate — show "Price on
   * Request" and a quote CTA instead of a number. */
  priceOnRequest: boolean;
  image: string;
  gallery: string[];
  featured?: boolean;
}

export const fleet: FleetVehicle[] = [
  {
    slug: "toyota-etios",
    name: "Toyota Etios",
    tagline: "Nimble, efficient, effortless city rides",
    category: "sedan",
    categoryLabel: "Sedan",
    seats: 4,
    luggage: "2 bags",
    ac: true,
    fuel: "Diesel",
    driverIncluded: true,
    priceFrom: 13,
    priceUnit: "per km",
    minKmPerDay: 300,
    driverBata: 400,
    dutyStart: "6:00 AM",
    dutyEnd: "10:00 PM",
    priceOnRequest: false,
    image: "/fleet/etios-front-01.jpeg",
    gallery: [
      "/fleet/etios-front-01.jpeg",
      "/fleet/etios-side-01.jpeg",
      "/fleet/etios-interior-01.jpeg",
      "/fleet/etios-interior-02.jpeg",
      "/fleet/etios-rear-01.jpeg",
    ],
    featured: true,
  },
  {
    slug: "maruti-dzire",
    name: "Maruti Suzuki Dzire",
    tagline: "Compact, comfortable and ready for the city",
    category: "sedan",
    categoryLabel: "Sedan",
    seats: 4,
    luggage: "2 bags",
    ac: true,
    fuel: "Petrol",
    driverIncluded: true,
    priceFrom: 13,
    priceUnit: "per km",
    minKmPerDay: 300,
    driverBata: 400,
    dutyStart: "6:00 AM",
    dutyEnd: "10:00 PM",
    priceOnRequest: false,
    image: "/fleet/dzire-front-01.jpeg",
    gallery: [
      "/fleet/dzire-front-01.jpeg",
      "/fleet/dzire-dashboard-01.jpeg",
      "/fleet/dzire-interior-01.jpeg",
      "/fleet/dzire-interior-02.jpeg",
    ],
    featured: true,
  },
  {
    slug: "maruti-ertiga",
    name: "Maruti Ertiga",
    tagline: "A spacious MUV that comfortably seats small families with extra luggage room",
    category: "suv",
    categoryLabel: "SUV · 6 Seater",
    seats: 6,
    luggage: "3 bags",
    ac: true,
    fuel: "Petrol",
    driverIncluded: true,
    priceFrom: null,
    priceUnit: "per km",
    minKmPerDay: null,
    driverBata: null,
    dutyStart: null,
    dutyEnd: null,
    priceOnRequest: true,
    // Placeholder — reuses Innova photography until real Ertiga photos are
    // available.
    image: "/fleet/innova-2011-front-01.jpeg",
    gallery: ["/fleet/innova-2011-front-01.jpeg", "/fleet/innova-2011-interior-01.jpeg"],
  },
  {
    slug: "toyota-fortuner",
    name: "Toyota Fortuner",
    tagline: "A premium SUV for clients who want a stronger, more commanding ride",
    category: "suv",
    categoryLabel: "SUV · Premium",
    seats: 7,
    luggage: "4 bags",
    ac: true,
    fuel: "Diesel",
    driverIncluded: true,
    priceFrom: null,
    priceUnit: "per km",
    minKmPerDay: null,
    driverBata: null,
    dutyStart: null,
    dutyEnd: null,
    priceOnRequest: true,
    // Placeholder — reuses Innova Crysta photography until real Fortuner
    // photos are available.
    image: "/fleet/innova-crysta-front-01.jpeg",
    gallery: ["/fleet/innova-crysta-front-01.jpeg", "/fleet/innova-crysta-dashboard-01.jpeg"],
  },
  {
    slug: "toyota-innova-crysta",
    name: "Toyota Innova Crysta",
    tagline: "The gold standard for family & group travel",
    category: "suv",
    categoryLabel: "SUV",
    seats: 7,
    luggage: "4 bags",
    ac: true,
    fuel: "Diesel",
    driverIncluded: true,
    priceFrom: 19,
    priceUnit: "per km",
    minKmPerDay: 300,
    driverBata: 400,
    dutyStart: "6:00 AM",
    dutyEnd: "10:00 PM",
    priceOnRequest: false,
    image: "/fleet/innova-crysta-front-01.jpeg",
    gallery: [
      "/fleet/innova-crysta-front-01.jpeg",
      "/fleet/innova-crysta-rear-01.jpeg",
      "/fleet/innova-crysta-dashboard-01.jpeg",
    ],
    featured: true,
  },
  {
    slug: "toyota-innova-hycross",
    name: "Toyota Innova HyCross",
    tagline: "Hybrid refinement for the discerning traveller",
    category: "suv",
    categoryLabel: "SUV · Premium",
    seats: 7,
    luggage: "4 bags",
    ac: true,
    fuel: "Hybrid",
    driverIncluded: true,
    // Not covered by the confirmed per-km price sheet — left unchanged
    // rather than guessing a tier. No minimum-km/driver-bata figures are
    // shown for this vehicle for the same reason.
    priceFrom: 21,
    priceUnit: "per km",
    minKmPerDay: null,
    driverBata: null,
    dutyStart: null,
    dutyEnd: null,
    priceOnRequest: false,
    image: "/fleet/innova-hycross-front-01.jpeg",
    gallery: [
      "/fleet/innova-hycross-front-01.jpeg",
      "/fleet/innova-hycross-front-02.jpeg",
      "/fleet/innova-hycross-interior-01.jpeg",
      "/fleet/innova-hycross-interior-02.jpeg",
      "/fleet/innova-hycross-interior-03.jpeg",
    ],
    featured: true,
  },
  {
    slug: "toyota-innova-2011",
    name: "Toyota Innova",
    tagline: "The dependable classic, meticulously maintained",
    category: "suv",
    categoryLabel: "SUV",
    seats: 7,
    luggage: "3 bags",
    ac: true,
    fuel: "Diesel",
    driverIncluded: true,
    priceFrom: 17,
    priceUnit: "per km",
    minKmPerDay: 300,
    driverBata: 400,
    dutyStart: "6:00 AM",
    dutyEnd: "10:00 PM",
    priceOnRequest: false,
    image: "/fleet/innova-2011-front-01.jpeg",
    gallery: [
      "/fleet/innova-2011-front-01.jpeg",
      "/fleet/innova-2011-front-02.jpeg",
      "/fleet/innova-2011-dashboard-01.jpeg",
      "/fleet/innova-2011-interior-01.jpeg",
      "/fleet/innova-2011-interior-02.jpeg",
      "/fleet/innova-2011-interior-03.jpeg",
      "/fleet/innova-2011-interior-08.jpeg",
    ],
  },
  {
    slug: "force-traveller-17",
    name: "Force Traveller",
    tagline: "17-seater comfort for groups on the move",
    category: "traveller",
    categoryLabel: "Tempo Traveller · 17 Seater",
    seats: 17,
    luggage: "Roof carrier",
    ac: true,
    fuel: "Diesel",
    driverIncluded: true,
    priceFrom: 22,
    priceUnit: "per km",
    minKmPerDay: 300,
    driverBata: 500,
    dutyStart: "6:00 AM",
    dutyEnd: "10:00 PM",
    priceOnRequest: false,
    image: "/fleet/force-traveller-c-front-01.jpeg",
    gallery: [
      "/fleet/force-traveller-c-front-01.jpeg",
      "/fleet/force-traveller-c-front-02.jpeg",
      "/fleet/force-traveller-c-side-01.jpeg",
      "/fleet/force-traveller-c-interior-01.jpeg",
      "/fleet/force-traveller-c-interior-02.jpeg",
      "/fleet/force-traveller-c-interior-03.jpeg",
      "/fleet/force-traveller-c-rear-02.jpeg",
    ],
    featured: true,
  },
  {
    slug: "force-traveller-yaksha",
    name: "12 Seater Luxury Tempo Traveller",
    tagline: "Premium 12-seater for executive groups",
    category: "traveller",
    categoryLabel: "Tempo Traveller · 12 Seater",
    seats: 12,
    luggage: "Roof carrier",
    ac: true,
    fuel: "Diesel",
    driverIncluded: true,
    priceFrom: 30,
    priceUnit: "per km",
    minKmPerDay: 300,
    driverBata: 600,
    dutyStart: "6:00 AM",
    dutyEnd: "10:00 PM",
    priceOnRequest: false,
    image: "/fleet/force-traveller-yaksha-front-01.jpeg",
    gallery: [
      "/fleet/force-traveller-yaksha-front-01.jpeg",
      "/fleet/force-traveller-yaksha-front-02.jpeg",
      "/fleet/force-traveller-yaksha-front-03.jpeg",
      "/fleet/force-traveller-yaksha-interior-01.jpeg",
      "/fleet/force-traveller-yaksha-interior-02.jpeg",
      "/fleet/force-traveller-yaksha-interior-03.jpeg",
      "/fleet/force-traveller-yaksha-front-05.jpeg",
      "/fleet/force-traveller-yaksha-rear-01.jpeg",
    ],
  },
  {
    slug: "tempo-traveller-9-seater",
    name: "9 Seater Tempo Traveller",
    tagline: "An economical 9-seater for group outstation trips and pilgrimage tours",
    category: "traveller",
    categoryLabel: "Tempo Traveller · 9 Seater",
    seats: 9,
    luggage: "Roof carrier",
    ac: true,
    fuel: "Diesel",
    driverIncluded: true,
    priceFrom: null,
    priceUnit: "per km",
    minKmPerDay: null,
    driverBata: null,
    dutyStart: null,
    dutyEnd: null,
    priceOnRequest: true,
    // Placeholder — reuses Force Traveller photography until real 9-seater
    // photos are available.
    image: "/fleet/force-traveller-c-front-01.jpeg",
    gallery: ["/fleet/force-traveller-c-front-01.jpeg", "/fleet/force-traveller-c-interior-01.jpeg"],
  },
  {
    slug: "force-urbania",
    name: "Force Urbania",
    tagline: "Our most luxurious tempo traveller — plush, panoramic, quiet",
    category: "luxury-van",
    categoryLabel: "Luxury Van · 12–17 Seater",
    seats: 17,
    luggage: "Rear + roof",
    ac: true,
    fuel: "Diesel",
    driverIncluded: true,
    priceFrom: 38,
    priceUnit: "per km",
    minKmPerDay: 300,
    driverBata: 700,
    dutyStart: "6:00 AM",
    dutyEnd: "10:00 PM",
    priceOnRequest: false,
    image: "/fleet/force-urbania-front-01.jpeg",
    gallery: [
      "/fleet/force-urbania-front-01.jpeg",
      "/fleet/force-urbania-front-02.jpeg",
      "/fleet/force-urbania-interior-01.jpeg",
      "/fleet/force-urbania-interior-02.jpeg",
      "/fleet/force-urbania-interior-03.jpeg",
      "/fleet/force-urbania-interior-04.jpeg",
      "/fleet/force-urbania-interior-05.jpeg",
      "/fleet/force-urbania-interior-06.jpeg",
      "/fleet/force-urbania-rear-01.jpeg",
      "/fleet/force-urbania-rear-02.jpeg",
    ],
    featured: true,
  },
  {
    slug: "coach-sgr",
    name: "SGR Coach",
    tagline: "26–35 seater luxury coach for large groups & pilgrimages",
    category: "coach",
    categoryLabel: "Mini Coach · 26 Seater",
    seats: 26,
    luggage: "Under-deck hold",
    ac: true,
    fuel: "Diesel",
    driverIncluded: true,
    // Not covered by the confirmed price sheet (which only specifies
    // 21-seater and 50-seater buses) — left unchanged rather than guessing.
    priceFrom: 45,
    priceUnit: "per km",
    minKmPerDay: null,
    driverBata: null,
    dutyStart: null,
    dutyEnd: null,
    priceOnRequest: false,
    image: "/fleet/coach-sgr-front-01.jpeg",
    gallery: [
      "/fleet/coach-sgr-front-01.jpeg",
      "/fleet/coach-sgr-front-02.jpeg",
      "/fleet/coach-sgr-front-03.jpeg",
      "/fleet/coach-sgr-interior-01.jpeg",
      "/fleet/coach-sgr-interior-02.jpeg",
      "/fleet/coach-sgr-interior-03.jpeg",
      "/fleet/coach-sgr-rear-01.jpeg",
      "/fleet/coach-sgr-rear-02.jpeg",
    ],
  },
  {
    slug: "mini-bus-25-seater",
    name: "25-Seater Mini Bus",
    tagline: "A popular choice for corporate offsites, wedding functions and group pilgrimage tours",
    category: "coach",
    categoryLabel: "Coach · 25 Seater",
    seats: 25,
    luggage: "Under-deck hold",
    ac: true,
    fuel: "Diesel",
    driverIncluded: true,
    priceFrom: null,
    priceUnit: "per km",
    minKmPerDay: null,
    driverBata: null,
    dutyStart: null,
    dutyEnd: null,
    priceOnRequest: true,
    // Placeholder — reuses SGR Coach photography until real photos of this
    // vehicle are available.
    image: "/fleet/coach-sgr-front-01.jpeg",
    gallery: ["/fleet/coach-sgr-front-01.jpeg", "/fleet/coach-sgr-interior-01.jpeg"],
  },
  {
    slug: "bus-21-seater",
    name: "21-Seater Bus",
    tagline: "Mid-size coach for group outings and pilgrimages",
    category: "coach",
    categoryLabel: "Coach · 21 Seater",
    seats: 21,
    luggage: "Under-deck hold",
    ac: true,
    fuel: "Diesel",
    driverIncluded: true,
    priceFrom: null,
    priceUnit: "per km",
    minKmPerDay: null,
    driverBata: null,
    dutyStart: null,
    dutyEnd: null,
    priceOnRequest: true,
    // Placeholder — reuses SGR Coach photography until real photos of this
    // vehicle are available.
    image: "/fleet/coach-sgr-front-02.jpeg",
    gallery: ["/fleet/coach-sgr-front-02.jpeg", "/fleet/coach-sgr-interior-02.jpeg"],
  },
  {
    slug: "bus-50-seater",
    name: "50-Seater Bus",
    tagline: "Full-size coach for large groups and long-distance tours",
    category: "coach",
    categoryLabel: "Coach · 50 Seater",
    seats: 50,
    luggage: "Under-deck hold",
    ac: true,
    fuel: "Diesel",
    driverIncluded: true,
    priceFrom: null,
    priceUnit: "per km",
    minKmPerDay: null,
    driverBata: null,
    dutyStart: null,
    dutyEnd: null,
    priceOnRequest: true,
    // Placeholder — reuses SGR Coach photography until real photos of this
    // vehicle are available.
    image: "/fleet/coach-sgr-front-03.jpeg",
    gallery: ["/fleet/coach-sgr-front-03.jpeg", "/fleet/coach-sgr-interior-03.jpeg"],
  },
];

export const featuredFleet = sortFleetByName(fleet.filter((v) => v.featured));

const VIEW_LABELS: Record<string, string> = {
  front: "front exterior",
  side: "side profile",
  rear: "rear exterior",
  interior: "interior seating",
  dashboard: "dashboard and controls",
};

/** Descriptive per-image alt text derived from the file's view-angle segment
 * (e.g. "etios-interior-01.jpeg" → "Toyota Etios — interior seating"),
 * so adjacent gallery thumbnails don't all share identical alt text. */
export function vehicleImageAlt(vehicle: Pick<FleetVehicle, "name">, imagePath: string): string {
  const filename = imagePath.split("/").pop() ?? "";
  const match = filename.match(/-(front|side|rear|interior|dashboard)-\d+/);
  const view = match ? VIEW_LABELS[match[1]] : undefined;
  return view ? `${vehicle.name} — ${view}` : vehicle.name;
}

/** Formats a number as an Indian-grouped rupee amount, e.g. 4300 -> "4,300". */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

/** Minimum estimated daily total (per-km rate × minimum km + driver bata),
 * or null when any figure needed for the calculation isn't confirmed for
 * this vehicle (price-on-request, or a legacy price with no bata/minimum
 * on record). Never invents a number from a partial figure. */
export function getMinimumDailyTotal(vehicle: FleetVehicle): number | null {
  if (
    vehicle.priceOnRequest ||
    vehicle.priceFrom === null ||
    vehicle.minKmPerDay === null ||
    vehicle.driverBata === null
  ) {
    return null;
  }
  return vehicle.priceFrom * vehicle.minKmPerDay + vehicle.driverBata;
}

/** Reusable alphabetical sort by display name — ascending, case-insensitive,
 * locale-aware, so a newly added vehicle is placed correctly without
 * touching this function or any hard-coded order. */
export function sortFleetByName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
}

/** Category display order for the "All Vehicles" grid: cars (sedans, then
 * SUVs) first, then tempo travellers, then luxury vans, then coaches/buses
 * last — matching how customers actually shop (small → large). */
const CATEGORY_DISPLAY_ORDER: FleetCategory[] = ["sedan", "suv", "traveller", "luxury-van", "coach"];

/** Groups the "All Vehicles" grid by category in a fixed, size-ascending
 * order (cars, then tempo travellers, then luxury vans, then coaches/buses),
 * alphabetically by name within each group — rather than mixing every
 * category together in one flat A-Z list. */
export function sortFleetForDisplay(items: FleetVehicle[]): FleetVehicle[] {
  return sortFleetByName(items).sort(
    (a, b) => CATEGORY_DISPLAY_ORDER.indexOf(a.category) - CATEGORY_DISPLAY_ORDER.indexOf(b.category)
  );
}
