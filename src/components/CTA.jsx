import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Magnetic CTA. Solid (primary) or bare (text-arrow link).
 * The whole control drifts a few px toward the cursor — restrained, premium.
 */
export default function CTA({
  children,
  href,
  onClick,
  variant = "solid",
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

  const solid =
    "bg-ink text-bg hover:bg-white";
  const bare =
    "text-ink hover:text-white";

  const base =
    variant === "solid"
      ? `group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[0.95rem] font-medium transition-colors duration-300 ${solid}`
      : `group inline-flex items-center gap-2.5 text-[0.95rem] font-medium transition-colors duration-300 ${bare}`;

  const Comp = href ? motion.a : motion.button;
  const linkProps = href
    ? { href, ...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {}) }
    : { onClick, type: "button" };

  return (
    <Comp
      ref={ref}
      {...linkProps}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} cursor-pointer ${className}`}
      {...props}
    >
      <span>{children}</span>
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
