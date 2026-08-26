import "server-only";
import { sql } from "@/lib/db";
import { sortDestinationsByName, type Destination } from "@/lib/destinations";

function rowToDestination(row: Record<string, unknown>): Destination {
  return {
    slug: row.slug as string,
    name: row.name as string,
    kind: row.kind as string,
    distance: row.distance as string,
    duration: row.duration as string,
    estimatedCost: row.estimated_cost as string,
    recommendedVehicle: row.recommended_vehicle as string,
    image: row.image as string,
    description: row.description as string,
    featured: row.featured as boolean,
    officialTourismBoard: row.official_tourism_board as Destination["officialTourismBoard"],
  };
}

export async function getDestinations(): Promise<Destination[]> {
  const rows = await sql`SELECT * FROM destinations ORDER BY name`;
  return rows.map(rowToDestination);
}

export async function getFeaturedDestinations(): Promise<Destination[]> {
  const rows = await sql`SELECT * FROM destinations WHERE featured = true`;
  return sortDestinationsByName(rows.map(rowToDestination));
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const rows = await sql`SELECT * FROM destinations WHERE slug = ${slug}`;
  return rows[0] ? rowToDestination(rows[0]) : null;
}

export async function getDestinationSlugs(): Promise<string[]> {
  const rows = await sql`SELECT slug FROM destinations`;
  return rows.map((r) => r.slug as string);
}
