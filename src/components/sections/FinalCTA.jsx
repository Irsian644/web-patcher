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
          className="flex flex-col items-center text-center"
        >
          <h2 className="display mx-auto max-w-4xl text-[clamp(2.4rem,8vw,5.75rem)]">
            <Line>Stop losing customers</Line>
            <Line dim>before they even contact you.</Line>
          </h2>

          <motion.p
            variants={riseSoft}
            className="mx-auto mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-ink-dim"
          >
            Tell us about your business and we'll send back a real concept of
            your website — free, with no commitment.
          </motion.p>

          <motion.div
            variants={riseSoft}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <CTA href={BRAND.dmUrl} size="mega">
              Get your free website idea
            </CTA>
          </motion.div>

          <motion.p variants={riseSoft} className="mt-7 text-sm text-ink-faint">
            Free concept · No commitment ·{" "}
            <span className="text-ink-dim">Reply within 24h</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
