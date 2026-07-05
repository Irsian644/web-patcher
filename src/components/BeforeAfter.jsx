import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** The dull "before": an Instagram-only phone with nowhere to convert. */
function InstagramBefore() {
  const row = "rgba(255,255,255,0.06)";
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0a0c12] p-5">
      <div className="relative h-full max-h-[92%] w-[44%] min-w-[150px] rounded-[1.6rem] border border-white/10 bg-[#101319] p-2.5 shadow-2xl">
        <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-white/15" />
        <div className="flex items-center gap-2 px-1">
          <div className="h-9 w-9 rounded-full bg-white/10" />
          <div className="flex-1">
            <div className="h-2.5 w-16 rounded bg-white/15" />
            <div className="mt-1.5 h-2 w-10 rounded" style={{ background: row }} />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-[3px]" style={{ background: row }} />
          ))}
        </div>
        <div className="absolute inset-x-3 bottom-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-center">
          <span className="text-[0.6rem] font-medium uppercase tracking-wider text-white/30">
            No prices · No info · No link
          </span>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter({ src, alt, domain }) {
  const [pos, setPos] = useState(52); // %
  const wrapRef = useRef(null);
  const dragging = useRef(false);
  const interacted = useRef(false);
  const reduce = useReducedMotion();
  const inView = useInView(wrapRef, { once: true, margin: "-20% 0px" });

  // Affordance hint: the first time the slider scrolls into view, the handle
  // glides left and settles back — visitors instantly see it's draggable.
  // Cancelled the moment they touch it; skipped under reduced motion.
  useEffect(() => {
    if (!inView || reduce || interacted.current) return;
    const controls = animate(52, [52, 38, 58, 52], {
      duration: 2.2,
      delay: 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (!interacted.current) setPos(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduce]);

  const setFromClientX = useCallback((clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(96, Math.max(4, p)));
  }, []);

  const onPointerDown = (e) => {
    interacted.current = true;
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => (dragging.current = false);

  const onKey = (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    interacted.current = true;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
  };

  return (
    <div className="overflow-hidden rounded-[16px] border border-white/12 bg-[#0a0e1a] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
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

      <div
        ref={wrapRef}
        className="relative aspect-[1600/756] w-full select-none overflow-hidden bg-[#0a0e1a]"
      >
        {/* AFTER (real screenshot, underneath) */}
        <img
          src={src}
          alt={alt}
          width={1600}
          height={756}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />

        {/* BEFORE (clipped from the left) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <InstagramBefore />
        </div>

        {/* Corner labels */}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-white/65 backdrop-blur-sm">
          Instagram only
        </span>
        <span
          className="pointer-events-none absolute right-4 top-4 rounded-full px-3 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-white backdrop-blur-sm"
          style={{ background: "rgba(37,99,235,0.85)" }}
        >
          Real website
        </span>

        {/* Handle */}
        <div
          className="absolute inset-y-0 z-10 flex w-0 items-center justify-center"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute inset-y-0 w-px bg-white/80" />
          <button
            type="button"
            aria-label="Drag to compare Instagram-only versus a real website"
            aria-valuenow={Math.round(pos)}
            aria-valuemin={0}
            aria-valuemax={100}
            role="slider"
            tabIndex={0}
            onKeyDown={onKey}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative flex h-11 w-11 cursor-ew-resize touch-none items-center justify-center rounded-full border border-white/30 bg-bg/80 backdrop-blur-md transition-transform duration-200 ease-out-expo hover:scale-110 focus-visible:scale-110"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" aria-hidden="true">
              <path d="M9 7l-4 5 4 5M15 7l4 5-4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
