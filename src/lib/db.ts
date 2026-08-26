import "server-only";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

/** Tagged-template SQL client. Use as: sql`SELECT * FROM fleet_vehicles`. */
export const sql = neon(process.env.DATABASE_URL);
