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
  /** Official state tourism board name, for linking out to an authoritative
   * source on the destination detail page. Verified real government URLs
   * only — see OFFICIAL_TOURISM_LINKS below. */
  officialTourismBoard: keyof typeof OFFICIAL_TOURISM_LINKS;
}

/** Verified official government tourism URLs — checked against each
 * board's real domain before use, since this is an outbound link shown
 * to real visitors. Tirupati gets the TTD booking portal specifically
 * (more useful than the general AP tourism site) rather than the
 * "Andhra Pradesh" entry, which covers Mantralaya instead. */
export const OFFICIAL_TOURISM_LINKS = {
  Karnataka: { label: "Karnataka Tourism", url: "https://karnatakatourism.org/en" },
  Kerala: { label: "Kerala Tourism", url: "https://www.keralatourism.org/" },
  "Tamil Nadu": { label: "Tamil Nadu Tourism", url: "https://www.tamilnadutourism.tn.gov.in" },
  Goa: { label: "Goa Tourism", url: "https://goatourism.gov.in/" },
  Puducherry: { label: "Puducherry Tourism", url: "https://tourism.py.gov.in/" },
  "Andhra Pradesh": { label: "Andhra Pradesh Tourism", url: "https://tourism.ap.gov.in/" },
  TTD: { label: "TTD Official Darshan Booking", url: "https://tirupatibalaji.ap.gov.in/" },
} as const;

/** Reusable alphabetical sort by display name — ascending, case-insensitive,
 * locale-aware, so a newly added destination is placed correctly without
 * touching this function or any hard-coded order. */
export function sortDestinationsByName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
}
