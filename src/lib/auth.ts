import "server-only";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";

const SESSION_COOKIE = "admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export interface AdminUser {
  id: number;
  username: string;
}

/** Verifies credentials against admin_users and, on success, creates a
 * session row and sets the session cookie. Returns the user on success,
 * null on bad credentials. */
export async function login(username: string, password: string): Promise<AdminUser | null> {
  const rows = await sql`
    SELECT id, username, password_hash FROM admin_users WHERE username = ${username}
  `;
  const user = rows[0];
  if (!user) return null;

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return null;

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  await sql`
    INSERT INTO admin_sessions (token, user_id, expires_at) VALUES (${token}, ${user.id}, ${expiresAt.toISOString()})
  `;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return { id: user.id, username: user.username };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await sql`DELETE FROM admin_sessions WHERE token = ${token}`;
  }
  cookieStore.delete(SESSION_COOKIE);
}

/** Reads the session cookie and validates it against admin_sessions,
 * pruning expired sessions as it goes. Returns null if there's no valid
 * session — callers use this to redirect to /admin/login. */
export async function getSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const rows = await sql`
    SELECT admin_users.id, admin_users.username
    FROM admin_sessions
    JOIN admin_users ON admin_users.id = admin_sessions.user_id
    WHERE admin_sessions.token = ${token} AND admin_sessions.expires_at > now()
  `;
  const row = rows[0];
  return row ? { id: row.id, username: row.username } : null;
}
