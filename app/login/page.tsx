"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const googleReady = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_ENABLED === "true";
  const localReady = process.env.NEXT_PUBLIC_LOCAL_LOGIN_ENABLED === "true";
  useEffect(() => { if (session) router.replace("/dashboard"); }, [session, router]);
  if (status === "loading") return <div className="grid min-h-screen place-items-center"><LoaderCircle className="animate-spin text-green" /></div>;
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setError(""); const result = await signIn("credentials", { email, password, redirect: false, callbackUrl: "/dashboard" }); if (result?.ok) router.push("/dashboard"); else setError("بيانات الدخول غير صحيحة"); };
  return <main className="grid min-h-screen place-items-center bg-[#f7faf8] p-5 dark:bg-slate-950"><div className="grid w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl dark:bg-slate-900"><div className="hidden bg-green p-12 text-white md:block"><div className="mb-20 flex items-center gap-3 text-2xl font-black"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">م</span> ملك ماركت</div><h1 className="text-4xl font-black leading-tight">كل احتياجات بيتك،<br />في حساب واحد.</h1><p className="mt-5 leading-8 text-white/75">تابع طلباتك، احفظ عناوينك، واستمتع بتجربة تسوق أسرع.</p></div><div className="p-8 sm:p-12"><div className="mb-10 flex items-center gap-3 text-xl font-black md:hidden"><span className="grid h-10 w-10 place-items-center rounded-xl bg-green text-white">م</span> ملك ماركت</div><p className="mb-3 text-sm font-bold text-green">أهلاً بك من جديد</p><h2 className="text-3xl font-black dark:text-white">سجل دخولك</h2><p className="mt-3 text-gray-500">لإدارة طلباتك وتجربة تسوق شخصية.</p>{localReady && <form onSubmit={submit} className="mt-8 space-y-3"><label className="block text-sm font-bold">البريد الإلكتروني<input required type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="name@example.com" autoComplete="email" className="mt-2 w-full rounded-xl border border-gray-200 p-3 dark:border-slate-700 dark:bg-slate-800" /></label><label className="block text-sm font-bold">كلمة المرور<input required type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="••••••••" autoComplete="current-password" className="mt-2 w-full rounded-xl border border-gray-200 p-3 dark:border-slate-700 dark:bg-slate-800" /></label>{error && <p role="alert" className="text-sm text-red-600">{error}</p>}<button className="w-full rounded-xl bg-green py-3 font-bold text-white">تسجيل الدخول محلياً</button></form>}<button disabled={!googleReady} aria-disabled={!googleReady} onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 font-bold transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"><span className="text-xl font-black text-blue-500">G</span> {googleReady ? "المتابعة باستخدام Google" : "Google غير متاح حالياً"}</button><p className="mt-8 text-center text-xs leading-6 text-gray-400">بتسجيل الدخول، أنت توافق على الشروط والأحكام وسياسة الخصوصية.</p><button onClick={() => router.push("/")} className="mt-8 w-full text-sm font-bold text-green">العودة للتسوق</button></div></div></main>;
}
