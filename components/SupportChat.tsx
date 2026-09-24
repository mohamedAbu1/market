"use client";

import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function SupportChat() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{ from: "agent", text: en ? "Welcome to Malek Market 👋 How can we help?" : "أهلاً بك في ملك ماركت 👋 كيف يمكننا مساعدتك؟" }]);
  useEffect(() => { setMessages(current => current.length === 1 && current[0].from === "agent" ? [{ from: "agent", text: en ? "Welcome to Malek Market 👋 How can we help?" : "أهلاً بك في ملك ماركت 👋 كيف يمكننا مساعدتك؟" }] : current); }, [en]);
  const send = () => { const clean = message.trim(); if (!clean) return; setMessages(current => [...current, { from: "user", text: clean }, { from: "agent", text: en ? "Your message is received. Our support team will get back to you shortly." : "وصلت رسالتك، سيتواصل معك أحد أفراد فريق الدعم قريباً." }]); setMessage(""); };
  return <><button onClick={() => setOpen(true)} aria-label={en ? "Open automated support" : "فتح المساعد الآلي"} className="fixed bottom-5 left-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-green text-white shadow-xl transition hover:scale-105"><MessageCircle/></button>{open && <div role="dialog" aria-modal="true" className="fixed bottom-5 left-5 z-40 flex h-[520px] w-[calc(100vw-40px)] max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-slate-900"><div className="flex items-center justify-between bg-green p-5 text-white"><div><b className="block">{en ? "Malek Market Assistant" : "مساعد ملك ماركت"}</b><small className="text-white/75">{en ? "Automated help — send a message" : "مساعدة آلية — أرسل رسالتك"}</small></div><button aria-label={en ? "Close chat" : "إغلاق الدردشة"} onClick={() => setOpen(false)} className="rounded-xl bg-white/10 p-2"><X size={18}/></button></div><div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4 dark:bg-slate-950">{messages.map((m, i) => <div key={`${m.from}-${i}`} className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}><span className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${m.from === "user" ? "bg-green text-white" : "bg-white text-gray-700 shadow-sm dark:bg-slate-800 dark:text-gray-200"}`}>{m.text}</span></div>)}</div><div className="flex gap-2 border-t p-3 dark:border-slate-800"><input value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder={en ? "Type your message..." : "اكتب رسالتك..."} className="min-w-0 flex-1 rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none dark:bg-slate-800 dark:text-white"/><button onClick={send} aria-label={en ? "Send" : "إرسال"} className="grid h-10 w-10 place-items-center rounded-xl bg-green text-white"><Send size={17}/></button></div></div>}</>;
}
