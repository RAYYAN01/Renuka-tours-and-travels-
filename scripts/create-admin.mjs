import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const sql = neon(process.env.DATABASE_URL);

const username = process.argv[2] ?? `admin_${randomBytes(3).toString("hex")}`;
const password = process.argv[3] ?? randomBytes(12).toString("base64url");

const passwordHash = await bcrypt.hash(password, 12);

await sql`
  INSERT INTO admin_users (username, password_hash)
  VALUES (${username}, ${passwordHash})
  ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash
`;

console.log("Admin account ready:");
console.log("  Username:", username);
console.log("  Password:", password);
console.log("\nSave this password now — it is not stored anywhere in plain text.");
