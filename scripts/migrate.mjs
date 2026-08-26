import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";

const sql = neon(process.env.DATABASE_URL);
const schema = readFileSync(new URL("./schema.sql", import.meta.url), "utf8");

// Split on statement boundaries — neon's tagged-template client runs one
// statement per call, so a multi-statement file has to be split and sent
// individually rather than as one query.
const statements = schema
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
  console.log("OK:", statement.split("\n")[0].slice(0, 60));
}

console.log(`\nMigration complete — ${statements.length} statements applied.`);
