import type { GspProviderDescriptor, GspProviderId, GspRuntimeConfig } from "./types";
export const GSP_CATALOG: GspProviderDescriptor[] = [
 { id:"finagg", name:"FinAGG Technologies Private Limited", officialGspListed:true, onboarding:"contact-required", capabilities:["gstin-search"], note:"Developer portal and API-key authentication documented; full return API coverage and commercial terms require written confirmation." },
 { id:"cdsl-cvl", name:"CDSL Ventures Limited", officialGspListed:true, onboarding:"contact-required", capabilities:[], note:"Publishes GSP API FAQs and sandbox/UAT onboarding information; obtain current API catalogue, pricing and ASP agreement." },
 { id:"quicko", name:"Quicko", officialGspListed:false, onboarding:"contact-required", capabilities:[], note:"Publishes an ASP onboarding guide; verify the contracting GSP entity against GSTN's current empanelled list before signing." },
 { id:"cleartax", name:"ClearTax (Defmacro Software Private Limited)", officialGspListed:true, onboarding:"contact-required", capabilities:[], note:"Listed in GSTN's empanelled GSP directory; API access, partner terms and pricing need confirmation." },
 { id:"masters-india", name:"Masters India IT Solutions Private Limited", officialGspListed:true, onboarding:"contact-required", capabilities:[], note:"Listed in GSTN's empanelled GSP directory; API access, partner terms and pricing need confirmation." }
];
export function getGspRuntimeConfig(): GspRuntimeConfig {
 const provider=(process.env.GST_GSP_PROVIDER || "finagg") as GspProviderId;
 const allowed:GspProviderId[]=["finagg","cdsl-cvl","quicko","cleartax","masters-india"];
 if(!allowed.includes(provider)) throw new Error("Unsupported GST_GSP_PROVIDER. Choose a provider from the TAXORA GSP catalog.");
 return {provider,environment:process.env.GST_GSP_ENV==="production"?"production":"sandbox"};
}
export function getConfiguredGsp() {
 const config=getGspRuntimeConfig(); const descriptor=GSP_CATALOG.find(x=>x.id===config.provider);
 if(!descriptor) throw new Error("Configured GSP is not in the TAXORA provider catalog.");
 return {config,descriptor};
}