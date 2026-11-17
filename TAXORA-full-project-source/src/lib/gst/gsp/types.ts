export type GspCapability = "gstin-search" | "return-status" | "return-download" | "gstr1" | "gstr3b" | "gstr2a" | "gstr2b" | "einvoice" | "ewaybill";
export type GspEnvironment = "sandbox" | "production";
export type GspProviderId = "finagg" | "cdsl-cvl" | "quicko" | "cleartax" | "masters-india";
export interface GspRuntimeConfig { provider: GspProviderId; environment: GspEnvironment; }
export interface GstinProfileProvider { searchGstinProfile(gstin: string): Promise<unknown>; }
export interface GspProviderDescriptor {
 id: GspProviderId; name: string; officialGspListed: boolean;
 onboarding: "contact-required"; capabilities: GspCapability[]; note: string;
}