"use client";

export default function BrandLogo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return <div className={`flex items-center gap-3 ${light ? "text-white" : "text-ink"}`} aria-label="ملك ماركت | Malek Market">
    <span className={`${compact ? "h-11 w-11" : "h-16 w-16"} brand-mark grid shrink-0 place-items-center overflow-visible rounded-2xl`} aria-hidden="true"><span className="brand-leaf">⌁</span></span>
    <span className="leading-none">
      <b className={`${compact ? "text-lg" : "text-xl"} block font-black tracking-tight`}>ملك ماركت</b>
      <small className={`${light ? "text-white/60" : "text-gray-500"} mt-1 block text-[9px] font-black tracking-[.25em]`}>MALEK MARKET</small>
    </span>
  </div>;
}
