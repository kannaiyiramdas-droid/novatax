"use client";

import { useMemo, useState } from "react";
import { Download, Search, Loader2, Building2, AlertCircle, CheckCircle2 } from "lucide-react";

type Result = { ok: true; gstin: string; profile: unknown };
type ApiError = { error: string };

function prettyLabel(value: string) {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}
function collectFields(value: unknown, prefix = "", depth = 0): Array<[string, string]> {
  if (depth > 4 || value == null) return [];
  if (Array.isArray(value)) return value.slice(0, 30).flatMap((item, i) => collectFields(item, `${prefix}[${i + 1}]`, depth + 1));
  if (typeof value === "object") return Object.entries(value as Record<string, unknown>).slice(0, 80).flatMap(([key, item]) => {
    const label = prefix ? `${prefix} · ${prettyLabel(key)}` : prettyLabel(key);
    return item && typeof item === "object" ? collectFields(item, label, depth + 1) : [[label, String(item ?? "")] as [string, string]];
  });
  return prefix ? [[prefix, String(value)]] : [];
}

export function GstProfileClient() {
  const [gstin, setGstin] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fields = useMemo(() => result ? collectFields(result.profile) : [], [result]);

  async function search() {
    setError(""); setResult(null); setLoading(true);
    try {
      const response = await fetch("/api/gst/profile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ gstin: gstin.trim().toUpperCase() }) });
      const data = await response.json() as Result | ApiError;
      if (!response.ok || !("profile" in data)) throw new Error("error" in data ? data.error : "GSTIN lookup failed.");
      setResult(data);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to search GSTIN."); }
    finally { setLoading(false); }
  }
  function download() {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result.profile, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = `TAXORA-GSTIN-${result.gstin}.json`; a.click(); URL.revokeObjectURL(url);
  }

  return <div className="space-y-6">
    <div className="rounded-2xl border border-slate-800 bg-[#10182d] p-5 shadow-2xl shadow-black/20 md:p-7">
      <label htmlFor="gstin" className="mb-2 block text-sm font-semibold text-slate-200">Company GSTIN</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input id="gstin" value={gstin} onChange={e => setGstin(e.target.value.toUpperCase().slice(0,15))} onKeyDown={e => { if(e.key === "Enter" && !loading) void search(); }} placeholder="Enter 15-character GSTIN" maxLength={15} className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-[#080d1d] px-4 py-3 font-mono tracking-wider text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"/>
        <button onClick={() => void search()} disabled={loading || gstin.trim().length !== 15} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50">{loading ? <Loader2 size={17} className="animate-spin"/> : <Search size={17}/>} {loading ? "Searching..." : "Search GSTIN"}</button>
      </div>
      <p className="mt-2 text-xs text-slate-500">15 characters · API key remains on the TAXORA server.</p>
      {error && <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200"><AlertCircle size={17} className="mt-0.5 shrink-0"/><span>{error}</span></div>}
    </div>
    {result && <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#10182d]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-300"><CheckCircle2/></span><div><h2 className="font-bold">GSTIN profile retrieved</h2><p className="text-xs text-slate-400">{result.gstin}</p></div></div><button onClick={download} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-violet-400"><Download size={16}/> Download data</button></div>
      <div className="grid gap-3 p-5 sm:grid-cols-2">{fields.map(([label,value],i)=><div key={`${label}-${i}`} className="min-w-0 rounded-xl border border-slate-800 bg-[#0b1224] p-4"><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-1 break-words text-sm font-semibold text-slate-100">{value || "—"}</p></div>)}</div>
      <details className="border-t border-slate-800 p-5"><summary className="cursor-pointer text-sm font-semibold text-violet-200">View original provider response</summary><pre className="mt-3 max-h-[28rem] overflow-auto rounded-xl bg-[#080d1d] p-4 text-xs leading-5 text-slate-300">{JSON.stringify(result.profile,null,2)}</pre></details>
    </section>}
    {!result && !loading && <div className="rounded-2xl border border-dashed border-slate-700 px-5 py-10 text-center"><Building2 className="mx-auto text-slate-500" size={28}/><p className="mt-3 font-semibold text-slate-300">Company profile will appear here</p><p className="mt-1 text-sm text-slate-500">Enter a GSTIN above to begin.</p></div>}
  </div>;
}
