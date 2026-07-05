import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Magnetic CTA.
 * - "solid": the money button — layered light (inner highlight, hover blue
 *   under-glow, sheen sweep). size="mega" for the closing statement.
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
        className={`group inline-flex cursor-pointer items-center gap-2.5 text-[0.95rem] font-medium text-ink transition-colors duration-300 hover:text-white ${className}`}
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
      ? "px-9 py-[1.1rem] text-[1.05rem] sm:px-11 sm:py-5 sm:text-[1.15rem]"
      : "px-7 py-3.5 text-[0.95rem]";

  return (
    <Comp
      ref={ref}
      {...linkProps}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={`group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full font-medium text-bg transition-shadow duration-500 ${pad} ${className}`}
      {...props}
    >
      {/* body: soft top-lit white, not flat #fff */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #e8edfb 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -8px 16px rgba(37,99,235,0.10)",
        }}
      />
      {/* hover: blue under-light */}
      <span
        aria-hidden
        className="absolute -inset-1 rounded-full opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "oklch(0.62 0.21 258 / 0.35)", zIndex: -1 }}
      />
      {/* sheen sweep */}
      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-y-0 left-[-60%] w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-[900ms] ease-out-expo group-hover:translate-x-[320%]" />
      </span>

      <span className="relative">{children}</span>
      <span className="relative flex h-[1.5em] w-[1.5em] items-center justify-center overflow-hidden rounded-full bg-bg/10">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[0.95em] w-[0.95em] transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Comp>
  );
}
