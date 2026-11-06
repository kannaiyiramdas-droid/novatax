import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET;
if (!secret && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET must be configured in production.");
}
const key = new TextEncoder().encode(secret || "local-development-secret-change-this-32-chars");
const COOKIE = "taxora_session";

export async function createSession(userId: string) {
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7
  });
}

export async function getSessionUserId(): Promise<string | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key);
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch { return null; }
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}
