import "server-only";
import {getConfiguredGsp} from "./catalog";
import finaggProfileProvider from "./finagg";
import type {GstinProfileProvider} from "./types";
export function getGstinProfileProvider():GstinProfileProvider{
 const {config,descriptor}=getConfiguredGsp();
 if(config.provider==="finagg") return finaggProfileProvider;
 throw new Error(`${descriptor.name} is not connected yet. Complete its ASP onboarding and implement its approved API adapter before enabling it.`);
}
export {GSP_CATALOG} from "./catalog";
export type {GspProviderId,GspCapability,GspProviderDescriptor} from "./types";