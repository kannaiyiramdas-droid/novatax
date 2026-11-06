import Link from "next/link";
import { ArrowLeft, Building2, ShieldCheck } from "lucide-react";
import { requireWorkspace } from "@/lib/current-workspace";
import { GstProfileClient } from "@/components/gst-profile-client";

export default async function GstProfilePage() {
  const membership = await requireWorkspace();
  return <main className="min-h-screen bg-[#080d1d] text-white">
    <header className="border-b border-slate-800 bg-[#0c1124] px-5 py-5 md:px-9">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500"><Building2 size={20}/></span><div><p className="font-black tracking-wide">TAXORA</p><p className="text-xs text-slate-400">{membership.organization.name}</p></div></div>
        <Link href="/dashboard" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white"><ArrowLeft size={16}/> Dashboard</Link>
      </div>
    </header>
    <section className="mx-auto max-w-6xl px-5 py-9 md:px-9">
      <div className="mb-7"><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold text-violet-200"><ShieldCheck size={14}/> GSTN taxpayer search</div><h1 className="text-3xl font-bold tracking-tight md:text-4xl">GSTIN Company Profile</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Enter a 15-character GSTIN to retrieve taxpayer profile fields made available by the connected GST search provider.</p></div>
      <GstProfileClient/>
      <p className="mt-8 text-xs leading-5 text-slate-500">Profile data is supplied by FinAGG/GSTN and may be subject to provider availability. Confidential return contents and tax-payment details are not shown here.</p>
    </section>
  </main>;
}
