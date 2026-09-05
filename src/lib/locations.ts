export type LocalityZone = "Central" | "North" | "South" | "East" | "West" | "Southeast";

export interface Locality {
  slug: string;
  name: string;
  zone: LocalityZone;
  /** Real, well-known neighbouring localities — used for interlinking. */
  nearby: string[];
  /** Real, well-known public landmarks in or near the locality (not exact
   * pickup points — those vary per booking and are never fabricated). */
  landmarks: string[];
}

// Service-area coverage only — Renuka Tours & Travels has one physical
// office (CV Raman Nagar; see src/lib/site.ts) and picks up/drops off
// across Bengaluru. These pages describe areas served, not branches.
export const localities: Locality[] = [
  {
    slug: "cv-raman-nagar",
    name: "CV Raman Nagar",
    zone: "East",
    nearby: ["Indiranagar", "HAL", "Domlur", "Whitefield"],
    landmarks: ["CV Raman Nagar Metro Station", "HAL Airport Road"],
  },
  {
    slug: "whitefield",
    name: "Whitefield",
    zone: "East",
    nearby: ["Marathahalli", "Brookefield", "Varthur", "CV Raman Nagar"],
    landmarks: ["ITPL", "Phoenix Marketcity Whitefield", "Whitefield Railway Station"],
  },
  {
    slug: "marathahalli",
    name: "Marathahalli",
    zone: "East",
    nearby: ["Whitefield", "Bellandur", "HAL", "CV Raman Nagar"],
    landmarks: ["Marathahalli Bridge", "Innovative Multiplex"],
  },
  {
    slug: "indiranagar",
    name: "Indiranagar",
    zone: "East",
    nearby: ["Domlur", "CV Raman Nagar", "Koramangala", "HAL"],
    landmarks: ["100 Feet Road", "Indiranagar Metro Station"],
  },
  {
    slug: "koramangala",
    name: "Koramangala",
    zone: "East",
    nearby: ["Indiranagar", "HSR Layout", "BTM Layout", "Bellandur"],
    landmarks: ["Sony World Junction", "Forum Mall"],
  },
  {
    slug: "hsr-layout",
    name: "HSR Layout",
    zone: "East",
    nearby: ["Koramangala", "Bellandur", "Electronic City", "BTM Layout"],
    landmarks: ["HSR BDA Complex", "Agara Lake"],
  },
  {
    slug: "electronic-city",
    name: "Electronic City",
    zone: "Southeast",
    nearby: ["Bommanahalli", "HSR Layout", "Hosa Road", "Chandapura"],
    landmarks: ["Electronic City Flyover", "Infosys Campus"],
  },
  {
    slug: "sarjapur-road",
    name: "Sarjapur Road",
    zone: "Southeast",
    nearby: ["Bellandur", "HSR Layout", "Kasavanahalli", "Carmelaram"],
    landmarks: ["Wipro SEZ", "Sarjapur Bridge"],
  },
  {
    slug: "jayanagar",
    name: "Jayanagar",
    zone: "South",
    nearby: ["JP Nagar", "Basavanagudi", "BTM Layout", "Banashankari"],
    landmarks: ["Jayanagar 4th Block Shopping Complex", "South End Circle"],
  },
  {
    slug: "jp-nagar",
    name: "JP Nagar",
    zone: "South",
    nearby: ["Jayanagar", "Banashankari", "Bannerghatta Road", "Kumaraswamy Layout"],
    landmarks: ["JP Nagar Metro Station", "Sarakki Lake"],
  },
  {
    slug: "yelahanka",
    name: "Yelahanka",
    zone: "North",
    nearby: ["Hebbal", "Jakkur", "Thanisandra", "Doddaballapur Road"],
    landmarks: ["Yelahanka Lake", "Kempegowda International Airport"],
  },
  {
    slug: "hebbal",
    name: "Hebbal",
    zone: "North",
    nearby: ["Yelahanka", "Nagawara", "RT Nagar", "Sahakar Nagar"],
    landmarks: ["Hebbal Flyover", "Hebbal Lake"],
  },
];

export function getLocalityBySlug(slug: string): Locality | undefined {
  return localities.find((l) => l.slug === slug);
}

export function nearbyLocalities(locality: Locality): Locality[] {
  return locality.nearby
    .map((name) => localities.find((l) => l.name === name))
    .filter((l): l is Locality => Boolean(l));
}
