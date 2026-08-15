/**
 * A real website screenshot inside a minimal browser frame.
 * Aspect ratio is reserved (no CLS); image lazy-loads below the fold.
 * `glow` stages the frame with an ambient blue under-light so it reads as a
 * lit physical object instead of a flat rectangle.
 */
export default function ScreenFrame({
  src,
  alt,
  domain,
  eager = false,
  glow = false,
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      {/* ambient under-light */}
      {glow && (
        <div
          aria-hidden
          className="absolute -inset-x-6 bottom-0 top-1/2 -z-10 rounded-[50%] blur-2xl"
          style={{ background: "oklch(0.62 0.21 258 / 0.14)" }}
        />
      )}

      <div
        className="overflow-hidden rounded-card border border-white/12 bg-[#0a0e1a]"
        style={{
          boxShadow: glow
            ? "var(--shadow-frame), var(--glow-frame)"
            : "var(--shadow-frame)",
        }}
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
        <div className="relative aspect-[1600/756] w-full overflow-hidden bg-[#0a0e1a]">
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
          {/* glass reflection along the top edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.05] to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
