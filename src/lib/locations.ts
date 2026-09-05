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
// anywhere across Bengaluru (every vehicle is chauffeur-driven, not
// route-bound, so genuine city-wide coverage is a true claim here — unlike
// a business with fixed delivery zones). These pages describe areas
// served, not physical branches.
export const localities: Locality[] = [
  // ---- Central ----
  {
    slug: "rajajinagar",
    name: "Rajajinagar",
    zone: "Central",
    nearby: ["Malleshwaram", "Vijayanagar", "Basaveshwaranagar", "Yeshwanthpur"],
    landmarks: ["Rajajinagar Metro Station", "Navrang Circle"],
  },
  {
    slug: "malleshwaram",
    name: "Malleshwaram",
    zone: "Central",
    nearby: ["Rajajinagar", "Yeshwanthpur", "Mahalakshmi Layout"],
    landmarks: ["Malleshwaram Circle", "Sankey Tank"],
  },
  {
    slug: "vijayanagar",
    name: "Vijayanagar",
    zone: "Central",
    nearby: ["Rajajinagar", "Nagarbhavi", "Basaveshwaranagar"],
    landmarks: ["Vijayanagar Metro Station"],
  },
  {
    slug: "basaveshwaranagar",
    name: "Basaveshwaranagar",
    zone: "Central",
    nearby: ["Rajajinagar", "Vijayanagar", "Nagarbhavi"],
    landmarks: ["Basaveshwaranagar Metro Station"],
  },
  {
    slug: "yeshwanthpur",
    name: "Yeshwanthpur",
    zone: "Central",
    nearby: ["Malleshwaram", "Peenya", "Mahalakshmi Layout", "Nandini Layout"],
    landmarks: ["Yeshwanthpur Railway Station", "Yeshwanthpur Metro Station"],
  },
  {
    slug: "mahalakshmi-layout",
    name: "Mahalakshmi Layout",
    zone: "Central",
    nearby: ["Yeshwanthpur", "Malleshwaram"],
    landmarks: ["Mahalakshmi Layout Metro Station"],
  },
  {
    slug: "nandini-layout",
    name: "Nandini Layout",
    zone: "Central",
    nearby: ["Yeshwanthpur", "Malleshwaram"],
    landmarks: ["Nandini Layout Main Road"],
  },

  // ---- West ----
  {
    slug: "nagarbhavi",
    name: "Nagarbhavi",
    zone: "West",
    nearby: ["Vijayanagar", "Kengeri", "Basaveshwaranagar"],
    landmarks: ["Bangalore University", "Nagarbhavi Circle"],
  },
  {
    slug: "kengeri",
    name: "Kengeri",
    zone: "West",
    nearby: ["Rajarajeshwari Nagar", "Nagarbhavi"],
    landmarks: ["Kengeri Satellite Town", "Kengeri Bus Terminus"],
  },
  {
    slug: "rajarajeshwari-nagar",
    name: "Rajarajeshwari Nagar",
    zone: "West",
    nearby: ["Kengeri", "Nagarbhavi", "Uttarahalli"],
    landmarks: ["RR Nagar Main Road"],
  },
  {
    slug: "peenya",
    name: "Peenya",
    zone: "West",
    nearby: ["Yeshwanthpur", "Nandini Layout"],
    landmarks: ["Peenya Industrial Area", "Peenya Metro Station"],
  },

  // ---- South ----
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
    slug: "basavanagudi",
    name: "Basavanagudi",
    zone: "South",
    nearby: ["Jayanagar", "Banashankari"],
    landmarks: ["Bull Temple", "Lalbagh"],
  },
  {
    slug: "banashankari",
    name: "Banashankari",
    zone: "South",
    nearby: ["Jayanagar", "JP Nagar", "Basavanagudi", "Uttarahalli"],
    landmarks: ["Banashankari Temple", "Banashankari Bus Terminal"],
  },
  {
    slug: "padmanabhanagar",
    name: "Padmanabhanagar",
    zone: "South",
    nearby: ["Banashankari", "JP Nagar"],
    landmarks: ["Padmanabhanagar Main Road"],
  },
  {
    slug: "kumaraswamy-layout",
    name: "Kumaraswamy Layout",
    zone: "South",
    nearby: ["JP Nagar", "Banashankari"],
    landmarks: ["Kumaraswamy Layout Bus Stand"],
  },
  {
    slug: "uttarahalli",
    name: "Uttarahalli",
    zone: "South",
    nearby: ["JP Nagar", "Banashankari", "Kengeri"],
    landmarks: ["Uttarahalli Main Road"],
  },
  {
    slug: "btm-layout",
    name: "BTM Layout",
    zone: "South",
    nearby: ["Koramangala", "JP Nagar", "HSR Layout", "Bommanahalli"],
    landmarks: ["BTM Layout 2nd Stage", "Silk Board Junction"],
  },
  {
    slug: "bommanahalli",
    name: "Bommanahalli",
    zone: "South",
    nearby: ["BTM Layout", "Electronic City", "Hongasandra"],
    landmarks: ["Hosur Road", "Bommanahalli Bus Stop"],
  },
  {
    slug: "bannerghatta-road",
    name: "Bannerghatta Road",
    zone: "South",
    nearby: ["JP Nagar", "Arekere"],
    landmarks: ["Bannerghatta National Park Road", "IIM Bangalore"],
  },
  {
    slug: "arekere",
    name: "Arekere",
    zone: "South",
    nearby: ["Bannerghatta Road", "Hulimavu"],
    landmarks: ["Arekere Gate"],
  },
  {
    slug: "hulimavu",
    name: "Hulimavu",
    zone: "South",
    nearby: ["Arekere", "Bannerghatta Road", "Gottigere"],
    landmarks: ["Hulimavu Lake"],
  },
  {
    slug: "gottigere",
    name: "Gottigere",
    zone: "South",
    nearby: ["Hulimavu", "Bannerghatta Road"],
    landmarks: ["Gottigere Bus Terminus"],
  },
  {
    slug: "hongasandra",
    name: "Hongasandra",
    zone: "South",
    nearby: ["Bommanahalli", "BTM Layout"],
    landmarks: ["Hongasandra Main Road"],
  },

  // ---- East ----
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
    nearby: ["Marathahalli", "Brookefield", "Varthur", "CV Raman Nagar", "Kadugodi"],
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
    slug: "bellandur",
    name: "Bellandur",
    zone: "East",
    nearby: ["Koramangala", "Marathahalli", "HSR Layout", "Sarjapur Road"],
    landmarks: ["Bellandur Lake", "Outer Ring Road"],
  },
  {
    slug: "brookefield",
    name: "Brookefield",
    zone: "East",
    nearby: ["Whitefield", "Marathahalli"],
    landmarks: ["Orion Mall Brookefield", "ITPL Main Road"],
  },
  {
    slug: "hoodi",
    name: "Hoodi",
    zone: "East",
    nearby: ["Whitefield", "Mahadevapura"],
    landmarks: ["Hoodi Circle", "Hoodi Railway Station"],
  },
  {
    slug: "mahadevapura",
    name: "Mahadevapura",
    zone: "East",
    nearby: ["Whitefield", "Hoodi", "KR Puram"],
    landmarks: ["Mahadevapura Junction"],
  },
  {
    slug: "kr-puram",
    name: "KR Puram",
    zone: "East",
    nearby: ["Mahadevapura", "Ramamurthy Nagar", "Whitefield"],
    landmarks: ["KR Puram Railway Station", "KR Puram Bridge"],
  },
  {
    slug: "ramamurthy-nagar",
    name: "Ramamurthy Nagar",
    zone: "East",
    nearby: ["KR Puram"],
    landmarks: ["Ramamurthy Nagar Main Road"],
  },
  {
    slug: "domlur",
    name: "Domlur",
    zone: "East",
    nearby: ["Indiranagar", "HAL", "CV Raman Nagar"],
    landmarks: ["Domlur Flyover", "HAL 2nd Stage"],
  },
  {
    slug: "hal",
    name: "HAL",
    zone: "East",
    nearby: ["Indiranagar", "Domlur", "Marathahalli"],
    landmarks: ["HAL Main Road"],
  },
  {
    slug: "varthur",
    name: "Varthur",
    zone: "East",
    nearby: ["Whitefield", "Sarjapur Road"],
    landmarks: ["Varthur Lake", "Varthur Main Road"],
  },
  {
    slug: "kadugodi",
    name: "Kadugodi",
    zone: "East",
    nearby: ["Whitefield"],
    landmarks: ["Kadugodi Tree Park"],
  },

  // ---- Southeast ----
  {
    slug: "electronic-city",
    name: "Electronic City",
    zone: "Southeast",
    nearby: ["Bommanahalli", "HSR Layout", "Hosa Road", "Chandapura", "Electronic City Phase 2"],
    landmarks: ["Electronic City Flyover", "Infosys Campus"],
  },
  {
    slug: "electronic-city-phase-2",
    name: "Electronic City Phase 2",
    zone: "Southeast",
    nearby: ["Electronic City", "Chandapura"],
    landmarks: ["Neeladri Road"],
  },
  {
    slug: "chandapura",
    name: "Chandapura",
    zone: "Southeast",
    nearby: ["Electronic City", "Bommasandra"],
    landmarks: ["Chandapura Main Road", "Hosur Road"],
  },
  {
    slug: "bommasandra",
    name: "Bommasandra",
    zone: "Southeast",
    nearby: ["Electronic City", "Chandapura"],
    landmarks: ["Bommasandra Industrial Area"],
  },
  {
    slug: "singasandra",
    name: "Singasandra",
    zone: "Southeast",
    nearby: ["Bommanahalli", "Electronic City"],
    landmarks: ["Singasandra Lake"],
  },
  {
    slug: "kudlu",
    name: "Kudlu",
    zone: "Southeast",
    nearby: ["Electronic City", "HSR Layout"],
    landmarks: ["Kudlu Gate"],
  },
  {
    slug: "hosa-road",
    name: "Hosa Road",
    zone: "Southeast",
    nearby: ["Electronic City", "HSR Layout"],
    landmarks: ["Hosa Road Junction"],
  },
  {
    slug: "sarjapur-road",
    name: "Sarjapur Road",
    zone: "Southeast",
    nearby: ["Bellandur", "HSR Layout", "Kasavanahalli", "Carmelaram", "Varthur"],
    landmarks: ["Wipro SEZ", "Sarjapur Bridge"],
  },
  {
    slug: "kasavanahalli",
    name: "Kasavanahalli",
    zone: "Southeast",
    nearby: ["Sarjapur Road", "HSR Layout"],
    landmarks: ["Kasavanahalli Main Road"],
  },
  {
    slug: "carmelaram",
    name: "Carmelaram",
    zone: "Southeast",
    nearby: ["Sarjapur Road", "Kasavanahalli"],
    landmarks: ["Carmelaram Railway Station"],
  },

  // ---- North ----
  {
    slug: "yelahanka",
    name: "Yelahanka",
    zone: "North",
    nearby: ["Hebbal", "Jakkur", "Thanisandra", "Vidyaranyapura"],
    landmarks: ["Yelahanka Lake", "Kempegowda International Airport"],
  },
  {
    slug: "hebbal",
    name: "Hebbal",
    zone: "North",
    nearby: ["Yelahanka", "Nagawara", "RT Nagar", "Sahakar Nagar"],
    landmarks: ["Hebbal Flyover", "Hebbal Lake"],
  },
  {
    slug: "jakkur",
    name: "Jakkur",
    zone: "North",
    nearby: ["Yelahanka", "Hebbal", "Thanisandra"],
    landmarks: ["Jakkur Aerodrome", "Jakkur Lake"],
  },
  {
    slug: "thanisandra",
    name: "Thanisandra",
    zone: "North",
    nearby: ["Hebbal", "Jakkur", "Nagawara"],
    landmarks: ["Thanisandra Main Road"],
  },
  {
    slug: "nagawara",
    name: "Nagawara",
    zone: "North",
    nearby: ["Hebbal", "Kalyan Nagar", "HBR Layout"],
    landmarks: ["Nagawara Junction", "Manyata Tech Park"],
  },
  {
    slug: "hennur",
    name: "Hennur",
    zone: "North",
    nearby: ["Kalyan Nagar", "Nagawara"],
    landmarks: ["Hennur Main Road", "Hennur Lake"],
  },
  {
    slug: "kalyan-nagar",
    name: "Kalyan Nagar",
    zone: "North",
    nearby: ["Hennur", "HRBR Layout", "Nagawara"],
    landmarks: ["Kalyan Nagar Main Road"],
  },
  {
    slug: "hrbr-layout",
    name: "HRBR Layout",
    zone: "North",
    nearby: ["Kalyan Nagar", "HBR Layout"],
    landmarks: ["HRBR Layout 1st Block"],
  },
  {
    slug: "hbr-layout",
    name: "HBR Layout",
    zone: "North",
    nearby: ["Nagawara", "HRBR Layout", "RT Nagar"],
    landmarks: ["HBR Layout Main Road"],
  },
  {
    slug: "rt-nagar",
    name: "RT Nagar",
    zone: "North",
    nearby: ["Hebbal", "HBR Layout", "Sanjay Nagar"],
    landmarks: ["RT Nagar Main Road"],
  },
  {
    slug: "sanjay-nagar",
    name: "Sanjay Nagar",
    zone: "North",
    nearby: ["RT Nagar", "Sahakar Nagar"],
    landmarks: ["Sanjay Nagar Main Road"],
  },
  {
    slug: "sahakar-nagar",
    name: "Sahakar Nagar",
    zone: "North",
    nearby: ["Hebbal", "Sanjay Nagar", "Yelahanka"],
    landmarks: ["Sahakar Nagar Main Road"],
  },
  {
    slug: "vidyaranyapura",
    name: "Vidyaranyapura",
    zone: "North",
    nearby: ["Yelahanka", "Sahakar Nagar"],
    landmarks: ["Vidyaranyapura Main Road"],
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
