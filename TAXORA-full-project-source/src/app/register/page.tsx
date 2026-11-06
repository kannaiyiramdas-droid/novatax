import Link from "next/link";
import { RegisterForm } from "@/components/register-form";
export default function RegisterPage() {
  return <main className="grid min-h-screen place-items-center px-5 py-10" style={{background:"radial-gradient(circle at 50% 0%,rgba(109,74,255,.2),transparent 45%)"}}>
    <div className="w-full max-w-lg"><Link href="/" className="mb-8 block text-center text-xl font-black">OPTO<span className="text-violet-400">TAX</span></Link>
      <div className="panel p-7 sm:p-9"><h1 className="text-2xl font-bold">Create your workspace</h1><p className="muted mt-2 text-sm">Set up your account and organisation.</p><RegisterForm/>
        <p className="mt-6 text-center text-sm muted">Already registered? <Link className="text-violet-300 hover:text-violet-200" href="/login">Sign in</Link></p></div>
    </div>
  </main>;
}
