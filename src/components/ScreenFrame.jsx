/**
 * A real website screenshot inside a minimal browser frame.
 * Aspect ratio is reserved (no CLS); image lazy-loads below the fold.
 */
export default function ScreenFrame({
  src,
  alt,
  domain,
  eager = false,
  className = "",
}) {
  return (
    <div
      className={`overflow-hidden rounded-[14px] border border-white/12 bg-[#0a0e1a] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      {/* chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        {domain && (
          <span className="ml-2 flex-1 truncate rounded-md bg-white/[0.05] px-3 py-1 text-center font-mono text-[0.68rem] text-ink-faint">
            {domain}
          </span>
        )}
      </div>
      {/* screenshot — top-anchored so the hero is always framed */}
      <div className="aspect-[1600/756] w-full overflow-hidden bg-[#0a0e1a]">
        <img
          src={src}
          alt={alt}
          width={1600}
          height={756}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={eager ? "high" : "auto"}
          className="block h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}
