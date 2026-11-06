 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [error,setError]=useState(""); const [busy,setBusy]=useState(false); const router=useRouter();
  async function submit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); setBusy(true);
    const form=new FormData(e.currentTarget);
    const payload=Object.fromEntries(form.entries());
    try {
      const res=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const data=await res.json(); if(!res.ok) throw new Error(data.error||"Registration failed");
      router.push("/dashboard"); router.refresh();
    } catch(err) { setError(err instanceof Error?err.message:"Something went wrong"); }
    finally { setBusy(false); }
  }
  return <form onSubmit={submit} className="mt-7 space-y-4">
    <Field label="Your name" name="name" placeholder="Full name" />
    <Field label="Work email" name="email" type="email" placeholder="you@company.com"/>
    <Field label="Organisation / firm name" name="organizationName" placeholder="Your firm name"/>
    <Field label="Password (minimum 10 characters)" name="password" type="password" placeholder="Create a strong password"/>
    {error&&<p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
    <button disabled={busy} className="btn w-full disabled:opacity-50">{busy?"Creating workspace…":"Create account"}</button>
  </form>;
}
function Field({label,name,type="text",placeholder}:{label:string;name:string;type?:string;placeholder:string}) { return <label className="block"><span className="mb-2 block text-sm font-medium text-slate-300">{label}</span><input className="input" name={name} type={type} placeholder={placeholder} required autoComplete={name==="password"?"new-password":"off"}/></label> }
