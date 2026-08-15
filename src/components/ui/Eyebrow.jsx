/**
 * Pill eyebrow — the reference's section marker: a dark rounded-full chip
 * with a small accent dot. This is where TheWebPatcher's electric blue does
 * its work, one dot at a time, instead of washing over whole sections.
 */
export default function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-[0.875rem] text-ink-dim ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blue-soft" />
      {children}
    </span>
  );
}
