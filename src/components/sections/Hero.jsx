import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import CTA from "../CTA";
import ScreenFrame from "../ScreenFrame";
import { lineWipe, riseSoft, stagger } from "../../lib/motion";
import { BRAND, PROJECTS } from "../../data/content";

const front = PROJECTS[0]; // Duo Nails
const back = PROJECTS[1]; // Luvé

const HEADLINE = [
  ["Your business"],
  ["deserves better"],
  ["than just", { word: "Instagram.", accent: true }],
];

function Line({ parts }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span variants={lineWipe} className="block">
        {parts.map((p, i) =>
          typeof p === "string" ? (
            <span key={i}>{p} </span>
          ) : (
            <span key={i} style={{ color: "var(--blue-soft)" }}>
              {p.word}
            </span>
          )
        )}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yShow = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const yShow2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -130]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-dvh overflow-hidden pt-28 sm:pt-32"
    >
      {/* one surgical blue wash, top-left only — not ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[42rem] w-[42rem] rounded-full opacity-[0.5]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(37,99,235,0.16), transparent)",
        }}
      />

      <div className="wrap grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* LEFT — type */}
        <motion.div
          variants={stagger(0.15, 0.12)}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <motion.div
            variants={riseSoft}
            className="mb-7 flex items-center gap-3 text-ink-faint"
          >
            <span className="h-px w-8 bg-blue-soft" />
            <span className="label">{BRAND.tagline}</span>
          </motion.div>

          <h1 className="display text-[clamp(2.6rem,7vw,5.4rem)] font-semibold text-ink">
            {HEADLINE.map((parts, i) => (
              <Line key={i} parts={parts} />
            ))}
          </h1>

          <motion.p
            variants={riseSoft}
            className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-ink-dim"
          >
            We build fast, premium, conversion-focused websites — so the moment
            someone finds you, they trust you. And book you.
          </motion.p>

          <motion.div
            variants={riseSoft}
            className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
          >
            <CTA href={BRAND.dmUrl}>Get a free website idea</CTA>
            <CTA href="#work" variant="bare" className="text-ink-dim hover:text-ink">
              See the work
            </CTA>
          </motion.div>

          <motion.p
            variants={riseSoft}
            className="mt-12 text-sm text-ink-faint"
          >
            Trusted by local businesses turning visitors into customers.
          </motion.p>
        </motion.div>

        {/* RIGHT — showcase with depth + parallax */}
        <div className="relative">
          <motion.div
            style={{ y: yShow }}
            initial={reduce ? false : { opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="relative z-10"
          >
            <ScreenFrame
              src={front.image}
              alt={front.alt}
              domain={front.domain}
              eager
            />
          </motion.div>

          {/* layered screenshot behind, parallaxed slower */}
          <motion.div
            aria-hidden
            style={{ y: yShow2 }}
            initial={reduce ? false : { opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="absolute -bottom-12 -right-6 z-0 hidden w-[60%] sm:block"
          >
            <ScreenFrame
              src={back.image}
              alt=""
              domain={back.domain}
              className="opacity-95"
            />
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <span className="label">Scroll</span>
      </motion.div>
    </section>
  );
}
