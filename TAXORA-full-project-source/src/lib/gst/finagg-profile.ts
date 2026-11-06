import "server-only";

const GSTIN_PATTERN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

export function validateGstin(value: string) {
  const gstin = value.trim().toUpperCase();
  return GSTIN_PATTERN.test(gstin) ? gstin : null;
}

export async function searchGstinProfile(gstin: string) {
  const apiKey = process.env.FINAGG_API_KEY;
  const finaggVersion = process.env.FINAGG_API_VERSION;
  const gspVersion = process.env.FINAGG_GSP_VERSION;
  if (!apiKey) throw new Error("FinAGG API key is not configured in Vercel.");
  if (!finaggVersion || !gspVersion) throw new Error("FinAGG API versions are not configured. Confirm the exact versions with FinAGG.");

  const base = process.env.FINAGG_ENV === "production"
    ? "https://gsp.finagg.in/basic/gstn"
    : "https://sandbox-gsp.finagg.in/basic/gstn";
  const url = new URL(`${base}/${encodeURIComponent(finaggVersion)}/commonapi/${encodeURIComponent(gspVersion)}/search`);
  url.searchParams.set("action", "SEARCHGSTIN");
  url.searchParams.set("gstin", gstin);

  const response = await fetch(url, {
    headers: { "x-api-key": apiKey, "Accept": "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(20000),
  });
  const raw = await response.text();
  let data: unknown;
  try { data = raw ? JSON.parse(raw) : null; }
  catch { data = { providerMessage: raw.slice(0, 4000) }; }
  if (!response.ok) {
    const error = new Error(`FinAGG request failed (${response.status}).`);
    Object.assign(error, { status: response.status });
    throw error;
  }
  return data;
}
