import { createCookie, redirect } from "react-router";
import crypto from "crypto";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";

const SESSION_SECRET = process.env.SESSION_SECRET || "dispensary_default_secret_99812";

export const authCookie = createCookie("admin_session", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  secrets: [SESSION_SECRET],
  maxAge: 60 * 60 * 24, // 1 day
});

export function hashPassword(password: string): string {
  const salt = "dispensary_salt_1234";
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export async function getAdminSession(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const username = await authCookie.parse(cookieHeader);
  if (!username) return null;

  // Verify user still exists in DB
  const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
  if (!user) return null;

  return user;
}

export async function requireAdminSession(request: Request) {
  const user = await getAdminSession(request);
  if (!user) {
    throw redirect("/admin/login");
  }
  return user;
}

export async function createAdminSession(username: string, redirectTo: string) {
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await authCookie.serialize(username),
    },
  });
}

export async function logout() {
  return redirect("/admin/login", {
    headers: {
      "Set-Cookie": await authCookie.serialize("", { maxAge: -1 }),
    },
  });
}
