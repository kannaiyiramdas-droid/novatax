 "use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
export function LogoutButton(){const router=useRouter();async function logout(){await fetch("/api/auth/logout",{method:"POST"});router.push("/login");router.refresh();}return <button onClick={logout} className="flex items-center gap-3 px-3 py-2 text-sm muted hover:text-white"><LogOut size={17}/> Sign out</button>}
