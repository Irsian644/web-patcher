/** Small capability tag — the reference's chip row under section subcopy. */
export default function TagPill({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-[10px] border border-line bg-surface px-3.5 py-2 text-[0.9375rem] text-ink-dim ${className}`}
    >
      {children}
    </span>
  );
}
