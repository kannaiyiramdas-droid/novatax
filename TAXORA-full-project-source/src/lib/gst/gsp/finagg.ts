import "server-only";
import type { GstinProfileProvider } from "./types";
const finaggProfileProvider:GstinProfileProvider={
 async searchGstinProfile(gstin:string):Promise<unknown>{
  const apiKey=process.env.FINAGG_API_KEY, finaggVersion=process.env.FINAGG_API_VERSION, gspVersion=process.env.FINAGG_GSP_VERSION;
  if(!apiKey) throw new Error("FinAGG API key is not configured.");
  if(!finaggVersion||!gspVersion) throw new Error("FinAGG API versions are not configured. Confirm the exact versions with FinAGG.");
  const base=process.env.GST_GSP_ENV==="production"?"https://gsp.finagg.in/basic/gstn":"https://sandbox-gsp.finagg.in/basic/gstn";
  const url=new URL(`${base}/${encodeURIComponent(finaggVersion)}/commonapi/${encodeURIComponent(gspVersion)}/search`);
  url.searchParams.set("action","SEARCHGSTIN"); url.searchParams.set("gstin",gstin);
  const response=await fetch(url,{headers:{"x-api-key":apiKey,Accept:"application/json"},cache:"no-store",signal:AbortSignal.timeout(20000)});
  const raw=await response.text(); let data:unknown;
  try{data=raw?JSON.parse(raw):null;}catch{data={providerMessage:raw.slice(0,4000)};}
  if(!response.ok){const error=new Error(`FinAGG request failed (${response.status}).`);Object.assign(error,{status:response.status});throw error;}
  return data;
 }
};
export default finaggProfileProvider;