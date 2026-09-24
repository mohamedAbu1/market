"use client";

export default function BrandLogo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return <div className={`flex items-center gap-3 ${light ? "text-white" : "text-ink"}`} aria-label="ملك ماركت | Malek Market">
    <span className={`${compact ? "h-16 w-16" : "h-24 w-24"} grid shrink-0 place-items-center overflow-visible`}>
      <img src="/malek-market-logo-optimized.png" alt="" className="h-full w-full object-contain drop-shadow-[0_12px_10px_rgba(24,41,61,.28)]" />
    </span>
    <span className="leading-none">
      <b className={`${compact ? "text-lg" : "text-xl"} block font-black tracking-tight`}>ملك ماركت</b>
      <small className={`${light ? "text-white/60" : "text-gray-500"} mt-1 block text-[9px] font-black tracking-[.25em]`}>MALEK MARKET</small>
    </span>
  </div>;
}
