import "server-only";
import { getGstinProfileProvider } from "./gsp";
export const GSTIN_PATTERN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
export function validateGstin(value:string){const gstin=value.trim().toUpperCase();return GSTIN_PATTERN.test(gstin)?gstin:null;}
export async function searchGstinProfile(gstin:string){return getGstinProfileProvider().searchGstinProfile(gstin);}
