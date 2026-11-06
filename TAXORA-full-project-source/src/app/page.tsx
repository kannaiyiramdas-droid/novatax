import Link from "next/link";
import { ArrowRight, ShieldCheck, Building2, FileCheck2, Sparkles } from "lucide-react";

export default function Home() {
  return <main className="min-h-screen overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(circle at 75% 15%,rgba(91,67,220,.25),transparent 35%),radial-gradient(circle at 10% 70%,rgba(31,111,210,.16),transparent 35%)"}} />
    <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 font-black">O</div><span className="text-xl font-black tracking-wide">OPTO<span className="text-violet-400">TAX</span></span></div>
      <div className="flex gap-3"><Link className="rounded-lg px-4 py-2 text-sm muted hover:text-white" href="/login">Sign in</Link><Link className="btn text-sm" href="/register">Get started <ArrowRight size={16}/></Link></div>
    </nav>
    <section className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-16 lg:grid-cols-2 lg:pt-28">
      <div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm text-violet-200"><Sparkles size={15}/> Tax operations, organised</div>
        <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl">Your tax practice.<br/><span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">One smarter workspace.</span></h1>
        <p className="muted mt-7 max-w-xl text-lg leading-8">Manage GST registrations, client records and compliance workflows from one secure workspace built for growing tax practices.</p>
        <div className="mt-9 flex flex-wrap gap-4"><Link className="btn" href="/register">Create your workspace <ArrowRight size={17}/></Link><Link className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 hover:bg-white/5" href="/login">Sign in</Link></div>
        <div className="mt-10 flex flex-wrap gap-6 text-sm muted"><span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-400"/> Workspace isolation</span><span className="flex items-center gap-2"><Building2 size={16} className="text-blue-400"/> Multi-organisation</span></div>
      </div>
      <div className="panel relative p-5 shadow-2xl shadow-violet-950/40">
        <div className="mb-5 flex items-center justify-between"><div><p className="text-sm muted">Workspace overview</p><h2 className="mt-1 text-xl font-bold">Compliance dashboard</h2></div><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">Workspace preview</span></div>
        <div className="grid grid-cols-2 gap-3"><Stat label="GST registrations" value="—" note="Connect your clients"/><Stat label="Active clients" value="—" note="Add your first client"/><Stat label="Returns to review" value="—" note="Configure filing workflow"/><Stat label="Tasks completed" value="—" note="Activity will appear here"/></div>
        <div className="mt-4 rounded-xl border border-slate-700/70 bg-slate-950/50 p-5"><div className="flex items-center gap-3"><div className="rounded-lg bg-violet-500/15 p-3 text-violet-300"><FileCheck2/></div><div><p className="font-semibold">A clearer compliance workflow</p><p className="mt-1 text-sm muted">Start by setting up your organisation and GSTINs.</p></div></div></div>
      </div>
    </section>
    <section className="relative mx-auto grid max-w-7xl gap-4 px-6 pb-20 md:grid-cols-3">
      <Feature title="Client & GSTIN management" body="Keep client and GST registration records organised by workspace."/>
      <Feature title="Role-based access" body="Give owners, admins, staff and viewers appropriate access."/>
      <Feature title="Audit-ready activity" body="Record important workspace actions for traceability."/>
    </section>
    <footer className="relative border-t border-slate-800 px-6 py-7 text-center text-sm muted">TAXORA · Tax compliance workspace</footer>
  </main>;
}
function Stat({label,value,note}:{label:string;value:string;note:string}) { return <div className="rounded-xl border border-slate-700/70 bg-slate-950/40 p-4"><p className="text-sm muted">{label}</p><p className="mt-3 text-3xl font-bold">{value}</p><p className="mt-1 text-xs muted">{note}</p></div> }
function Feature({title,body}:{title:string;body:string}) { return <div className="panel p-6"><div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-violet-500 to-blue-500"/><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 muted">{body}</p></div> }
