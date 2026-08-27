import "server-only";
import { sql } from "@/lib/db";
import { sortFleetForDisplay, type FleetVehicle } from "@/lib/fleet";

function rowToVehicle(row: Record<string, unknown>): FleetVehicle {
  return {
    slug: row.slug as string,
    name: row.name as string,
    tagline: row.tagline as string,
    category: row.category as FleetVehicle["category"],
    categoryLabel: row.category_label as string,
    seats: row.seats as number,
    luggage: row.luggage as string,
    ac: row.ac as boolean,
    fuel: row.fuel as string,
    driverIncluded: row.driver_included as boolean,
    priceFrom: row.price_from as number | null,
    priceUnit: row.price_unit as string,
    minKmPerDay: row.min_km_per_day as number | null,
    driverBata: row.driver_bata as number | null,
    dutyStart: row.duty_start as string | null,
    dutyEnd: row.duty_end as string | null,
    priceOnRequest: row.price_on_request as boolean,
    image: row.image as string,
    heroImage: row.hero_image as string | null,
    gallery: row.gallery as string[],
    featured: row.featured as boolean,
  };
}

export async function getFleet(): Promise<FleetVehicle[]> {
  const rows = await sql`SELECT * FROM fleet_vehicles ORDER BY sort_order, name`;
  return rows.map(rowToVehicle);
}

export async function getFeaturedFleet(): Promise<FleetVehicle[]> {
  const rows = await sql`SELECT * FROM fleet_vehicles WHERE featured = true`;
  return sortFleetForDisplay(rows.map(rowToVehicle));
}

export async function getVehicleBySlug(slug: string): Promise<FleetVehicle | null> {
  const rows = await sql`SELECT * FROM fleet_vehicles WHERE slug = ${slug}`;
  return rows[0] ? rowToVehicle(rows[0]) : null;
}

export async function getFleetSlugs(): Promise<string[]> {
  const rows = await sql`SELECT slug FROM fleet_vehicles`;
  return rows.map((r) => r.slug as string);
}
