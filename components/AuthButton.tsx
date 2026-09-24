"use client";

import { LogIn, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
  const { data: session } = useSession();
  if (session?.user) return <Link href="/dashboard" className="hidden items-center gap-2 rounded-xl p-2 text-gray-600 hover:bg-gray-50 sm:flex dark:text-gray-300 dark:hover:bg-slate-800"><span className="grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-mint font-bold text-green">{session.user.image ? <img src={session.user.image} alt="حسابي" className="h-full w-full object-cover"/> : <UserRound size={17}/>}</span><span className="max-w-20 truncate text-xs font-bold">{session.user.name ?? "حسابي"}</span></Link>;
  return <Link href="/login" className="hidden items-center gap-2 rounded-xl p-2.5 text-gray-600 hover:bg-gray-50 sm:flex dark:text-gray-300 dark:hover:bg-slate-800"><UserRound size={20}/><span className="text-xs font-bold">دخول</span></Link>;
}
