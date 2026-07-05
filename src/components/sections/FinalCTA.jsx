import { motion } from "framer-motion";
import CTA from "../CTA";
import { lineWipe, riseSoft, stagger, inView } from "../../lib/motion";
import { BRAND } from "../../data/content";

function Line({ children, dim }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span
        variants={lineWipe}
        className={`block ${dim ? "text-ink-dim" : "text-ink"}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-[clamp(7rem,16vw,13rem)]">
      {/* light along the threshold into the closing act */}
      <div aria-hidden className="absolute inset-x-0 top-0">
        <div className="rule-glow mx-auto max-w-5xl opacity-40" />
      </div>
      {/* one surgical blue glow, bottom-center */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background: "radial-gradient(closest-side, rgba(37,99,235,0.18), transparent)",
        }}
      />
      <div className="wrap relative">
        <motion.div
          variants={stagger(0.05, 0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          <h2 className="display text-[clamp(2.4rem,8vw,5.75rem)] font-semibold">
            <Line>Stop losing customers</Line>
            <Line dim>before they even</Line>
            <Line dim>contact you.</Line>
          </h2>

          <motion.div
            variants={riseSoft}
            className="mt-12 flex flex-col items-start gap-7 sm:mt-14 sm:flex-row sm:items-center sm:gap-8"
          >
            <CTA href={BRAND.dmUrl} size="mega">
              Get your free website idea
            </CTA>
            <span className="text-sm leading-relaxed text-ink-faint">
              Free concept · No commitment
              <br className="hidden sm:block" />
              <span className="text-ink-dim"> Reply within 24h</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
