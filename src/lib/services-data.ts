import "server-only";
import { sql } from "@/lib/db";
import type { Service } from "@/lib/services";

function rowToService(row: Record<string, unknown>): Service {
  return {
    id: row.slug as string,
    icon: row.icon as string,
    title: row.title as string,
    description: row.description as string,
    features: row.features as string[],
    pricingNote: row.pricing_note as string,
    image: row.image as string,
    imageAlt: row.image_alt as string,
  };
}

export async function getServices(): Promise<Service[]> {
  const rows = await sql`SELECT * FROM services ORDER BY sort_order`;
  return rows.map(rowToService);
}
