export function LogoMark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="10" fill="#0a0e1a" stroke="rgba(255,255,255,0.14)" />
      <path
        d="M8 13 L12 27 L16 17 L20 27 L24 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 13 H30 a4 4 0 0 1 0 8 H25 V13 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31.5" cy="26" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-ink ${className}`}>
      <LogoMark className="h-8 w-8 text-blue-soft" />
      <span className="font-display text-[1.05rem] font-semibold tracking-tight">
        TheWebPatcher
      </span>
    </span>
  );
}
