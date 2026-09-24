export default function ProductBackground() {
  return <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    <svg className="absolute -left-24 top-28 h-80 w-80 text-leaf opacity-[.09]" viewBox="0 0 320 320" fill="none">
      <circle cx="112" cy="166" r="70" stroke="currentColor" strokeWidth="3" />
      <path d="M112 96c-8-40 19-68 62-75 2 39-18 69-62 75Z" fill="currentColor" opacity=".35" />
      <path d="M112 166c-34-34-36-80-10-112M112 166c37-25 61-57 62-113M112 166c-24 36-25 75-8 107" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="238" cy="244" r="34" stroke="#f45b35" strokeWidth="3" />
      <path d="M225 214c20-22 50-17 61 3-19 14-42 14-61-3Z" fill="#72a92c" opacity=".42" />
      <path d="M238 210v-18" stroke="#72a92c" strokeWidth="3" strokeLinecap="round" />
    </svg>
    <svg className="absolute -right-24 bottom-20 h-96 w-96 text-citrus opacity-[.1]" viewBox="0 0 380 380" fill="none">
      <path d="M191 75c-54-37-109-3-104 48 5 51 47 88 104 130 57-42 99-79 104-130 5-51-50-85-104-48Z" stroke="currentColor" strokeWidth="4" />
      <path d="M191 75c-9-28 9-50 42-58 8 29-8 52-42 58Z" fill="#72a92c" opacity=".55" />
      <path d="M191 76v177M130 115c44 30 82 65 119 112M254 114c-42 31-78 64-111 112" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".75" />
      <circle cx="70" cy="300" r="24" stroke="#984f8f" strokeWidth="3" />
      <path d="M70 276v48M46 300h48" stroke="#984f8f" strokeWidth="3" strokeLinecap="round" />
    </svg>
    <svg className="absolute right-[38%] top-24 h-24 w-24 text-coral opacity-[.09]" viewBox="0 0 100 100" fill="none">
      <path d="M50 12 61 38l28 3-21 18 6 28-24-14-24 14 6-28L11 41l28-3L50 12Z" fill="currentColor" />
    </svg>
  </div>;
}
