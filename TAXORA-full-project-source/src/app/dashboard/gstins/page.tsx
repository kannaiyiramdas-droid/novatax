import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { requireWorkspace } from "@/lib/current-workspace";
import { prisma } from "@/lib/prisma";
import { GstinForm } from "@/components/gstin-form";

export default async function GstinsPage(){
 const m=await requireWorkspace();
 const rows=await prisma.gstRegistration.findMany({where:{organizationId:m.organizationId},orderBy:{createdAt:"desc"}});
 return <main className="min-h-screen p-5 md:p-9"><div className="mx-auto max-w-5xl">
  <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm muted hover:text-white"><ArrowLeft size={16}/> Dashboard</Link>
  <div className="mt-6 flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm muted">{m.organization.name}</p><h1 className="mt-1 text-3xl font-bold">GSTIN management</h1><p className="mt-2 text-sm muted">Maintain GST registration records for this organisation.</p></div></div>
  <div className="mt-7 grid gap-6 lg:grid-cols-[.9fr_1.1fr]"><div className="panel p-6"><h2 className="font-bold">Add GST registration</h2><GstinForm/></div>
   <div className="panel p-6"><h2 className="font-bold">Registered GSTINs <span className="muted">({rows.length})</span></h2>
    {rows.length===0?<p className="mt-6 rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm muted">No GSTINs added yet.</p>:<div className="mt-4 space-y-3">{rows.map(r=><div key={r.id} className="rounded-xl border border-slate-700 p-4"><div className="flex flex-wrap justify-between gap-2"><p className="font-semibold">{r.legalName}</p><span className="text-xs text-emerald-300">{r.active?"Active":"Inactive"}</span></div><p className="mt-2 font-mono text-sm text-violet-200">{r.gstin}</p><p className="mt-1 text-xs muted">State code: {r.stateCode} · {r.registrationType}</p></div>)}</div>}
   </div>
  </div>
 </div></main>;
}
