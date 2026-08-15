import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Magnetic CTA.
 * - "solid": the reference button — dark fill, hairline light border, soft
 *   outer glow. Both primary and secondary share it (the reference has no
 *   white "money button"); emphasis comes from order, not fill.
 * - "bare": text + arrow link.
 * Whole control drifts a few px toward the cursor — restrained, premium.
 */
export default function CTA({
  children,
  href,
  onClick,
  variant = "solid",
  size = "base",
  className = "",
  ...props
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = href ? motion.a : motion.button;
  const linkProps = href
    ? { href, ...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {}) }
    : { onClick, type: "button" };

  if (variant === "bare") {
    return (
      <Comp
        ref={ref}
        {...linkProps}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ x: sx, y: sy }}
        className={`group inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 text-[0.95rem] font-medium text-ink transition-colors duration-300 hover:text-white ${className}`}
        {...props}
      >
        <span className="relative">
          {children}
          {/* underline draws in on hover */}
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-blue-soft transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[1.05em] w-[1.05em] transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Comp>
    );
  }

  const pad =
    size === "mega"
      ? "px-8 py-4 text-[1.05rem] sm:px-10 sm:py-[1.15rem] sm:text-[1.1rem]"
      : "px-7 py-3.5 text-[0.975rem]";

  return (
    <Comp
      ref={ref}
      {...linkProps}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={`group relative inline-flex cursor-pointer items-center gap-2.5 rounded-btn border border-line-strong bg-surface font-medium text-ink transition-colors duration-500 hover:border-blue-soft/60 ${pad} ${className}`}
      {...props}
    >
      {/* soft outer glow — the reference's buttons sit in their own light */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-btn opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "oklch(0.72 0.16 258 / 0.25)", zIndex: -1 }}
      />
      <span className="relative">{children}</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="relative h-[1.05em] w-[1.05em] transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Comp>
  );
}
