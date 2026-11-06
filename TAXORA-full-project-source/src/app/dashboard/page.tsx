import Link from "next/link";
import { Building2, Users, ShieldCheck, FileText, Plus, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { requireWorkspace } from "@/lib/current-workspace";
import { LogoutButton } from "@/components/logout-button";

export default async function DashboardPage(){
 const m=await requireWorkspace(); const org=m.organization;
 return <main className="min-h-screen md:flex">
  <aside className="border-b border-slate-800 bg-[#0c1124] p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
   <Link href="/" className="flex items-center gap-3 text-lg font-black"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">O</span> OPTO<span className="text-violet-400">TAX</span></Link>
   <p className="mt-10 text-xs font-bold uppercase tracking-widest muted">Workspace</p>
   <div className="mt-3 rounded-xl bg-violet-500/10 p-3"><p className="truncate font-semibold">{org.name}</p><p className="mt-1 text-xs muted">{m.role}</p></div>
   <nav className="mt-6 space-y-2 text-sm"><div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-3 text-violet-200"><LayoutDashboard size={17}/> Dashboard</div><Link className="flex items-center gap-3 rounded-lg px-3 py-3 muted hover:bg-white/5 hover:text-white" href="/dashboard/gstins"><Building2 size={17}/> GSTIN management</Link></nav>
   <div className="mt-10 border-t border-slate-800 pt-5"><LogoutButton/></div>
  </aside>
  <section className="min-w-0 flex-1 p-5 md:p-9">
   <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm muted">Overview</p><h1 className="mt-1 text-3xl font-bold">Dashboard</h1><p className="mt-2 muted">Welcome, {m.user.name}. Here is your workspace.</p></div><Link href="/dashboard/gstins" className="btn"><Plus size={17}/> Add GSTIN</Link></div>
   <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <Metric title="GST registrations" value={org._count.gstins.toString()} icon={<Building2/>}/>
    <Metric title="Clients" value={org._count.clients.toString()} icon={<Users/>}/>
    <Metric title="Your role" value={m.role} icon={<ShieldCheck/>}/>
    <Metric title="Compliance reports" value="Not connected" icon={<FileText/>}/>
   </div>
   <div className="panel mt-7 p-6"><h2 className="text-lg font-bold">Get started</h2><p className="mt-2 text-sm muted">Set up your organisation before configuring compliance workflows.</p><div className="mt-5 grid gap-3 md:grid-cols-2">
    <Link href="/dashboard/gstins" className="rounded-xl border border-slate-700 p-4 hover:border-violet-500/60"><Building2 className="mb-3 text-violet-300"/><p className="font-semibold">Manage GST registrations</p><p className="mt-1 text-sm muted">Add and maintain GSTIN records for this workspace.</p></Link>
    <div className="rounded-xl border border-slate-700 p-4 opacity-70"><Settings className="mb-3 text-blue-300"/><p className="font-semibold">Configure integrations</p><p className="mt-1 text-sm muted">GSP and GST portal integrations will be configured in a later phase.</p></div>
   </div></div>
   <p className="mt-7 text-xs muted">TAXORA · Data is scoped to your organisation.</p>
  </section>
 </main>;
}
function Metric({title,value,icon}:{title:string;value:string;icon:React.ReactNode}){return <div className="panel p-5"><div className="flex items-center justify-between muted"><span className="text-sm">{title}</span>{icon}</div><p className="mt-4 text-2xl font-bold">{value}</p></div>}
