import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";
import { searchGstinProfile, validateGstin } from "@/lib/gst/finagg-profile";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Please sign in to use GSTIN search." }, { status: 401 });
  let body: { gstin?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const gstin = typeof body.gstin === "string" ? validateGstin(body.gstin) : null;
  if (!gstin) return NextResponse.json({ error: "Enter a valid 15-character GSTIN." }, { status: 400 });
  const membership = await prisma.membership.findFirst({ where: { userId, user: { active: true } }, orderBy: { createdAt: "asc" } });
  if (!membership) return NextResponse.json({ error: "No organisation workspace found." }, { status: 403 });
  try {
    const profile = await searchGstinProfile(gstin);
    await prisma.auditLog.create({ data: { organizationId: membership.organizationId, userId, action: "GSTIN_PROFILE_LOOKUP", entity: "GSTIN", entityId: gstin, details: { provider: "FinAGG", gstin } } });
    return NextResponse.json({ ok: true, gstin, profile });
  } catch (error) {
    console.error("TAXORA GSTIN profile lookup failed", error);
    const status = typeof error === "object" && error && "status" in error ? Number((error as {status: unknown}).status) : 503;
    return NextResponse.json({ error: error instanceof Error ? error.message : "GSTIN lookup failed." }, { status: status >= 400 && status <= 599 ? status : 503 });
  }
}
