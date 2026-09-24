"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span aria-hidden="true" className="h-10 w-10 rounded-xl" />;
  const dark = resolvedTheme === "dark";
  return <button aria-label={dark ? "التبديل إلى المظهر الفاتح" : "التبديل إلى المظهر الداكن"} onClick={() => setTheme(dark ? "light" : "dark")} className="rounded-xl p-2.5 text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-800">{dark ? <Sun size={20}/> : <Moon size={20}/>}</button>;
}
