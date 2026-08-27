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
  /** Optional scenic/ambient background for this vehicle's own detail-page
   * hero — distinct from `image`, which doubles as the card thumbnail
   * everywhere else (fleet grid, homepage carousel, admin list). Falls
   * back to `image` when not set. */
  heroImage?: string | null;
  gallery: string[];
  featured?: boolean;
}

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
  // numeric: true makes this a "natural sort" — "9 Seater" / "12 Seater" /
  // "17 Seater" compare the embedded numbers as numbers (9 < 12 < 17)
  // instead of character-by-character (which would put "12" and "17"
  // before "9", since "1" < "9").
  return [...items].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base", numeric: true })
  );
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
