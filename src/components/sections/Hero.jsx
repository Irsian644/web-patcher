import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import CTA from "../CTA";
import Eyebrow from "../ui/Eyebrow";
import ScreenFrame from "../ScreenFrame";
import { lineWipe, riseSoft, stagger } from "../../lib/motion";
import { BRAND, PROJECTS } from "../../data/content";

const lead = PROJECTS[0]; // Duo Nails — the LCP image

const HEADLINE = [
  ["Your business deserves"],
  ["better than just", { word: "Instagram.", accent: true }],
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

/** Divider echoing the reference's "Scroll down ——⊙—— to see projects". */
function ScrollCue() {
  return (
    <div className="mt-16 hidden w-full items-center gap-5 text-ink-faint sm:mt-20 sm:flex">
      <span className="text-sm">Scroll down</span>
      <span className="h-px flex-1 bg-line" />
      <span
        aria-hidden
        className="flex h-7 w-[1.15rem] items-start justify-center rounded-full border border-line-strong pt-1.5"
      >
        <motion.span
          className="h-1.5 w-px bg-ink-faint"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
      <span className="h-px flex-1 bg-line" />
      <span className="text-sm">to see the work</span>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-32 sm:pt-40">
      {/* One restrained wash behind the headline — a light source, not a blob. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[38rem] w-[70rem] max-w-[140vw] -translate-x-1/2 opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(37,99,235,0.13), transparent)",
        }}
      />

      <div className="wrap relative">
        <motion.div
          variants={stagger(0.1, 0.13)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={riseSoft} className="mb-8">
            <Eyebrow>{BRAND.tagline}</Eyebrow>
          </motion.div>

          <h1 className="display mx-auto max-w-[68rem] text-[clamp(2.5rem,7.5vw,5.25rem)] text-ink">
            {HEADLINE.map((parts, i) => (
              <Line key={i} parts={parts} />
            ))}
          </h1>

          <motion.p
            variants={riseSoft}
            className="mx-auto mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-ink-dim sm:text-[1.125rem]"
          >
            We build fast, premium, conversion-focused websites for businesses in
            Albania and across Europe — so the moment someone finds you, they
            trust you. And book you.
          </motion.p>

          <motion.div
            variants={riseSoft}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <CTA href={BRAND.dmUrl}>Get a free website idea</CTA>
            <CTA href="#work">See the work</CTA>
          </motion.div>

          <motion.div variants={riseSoft} className="w-full">
            <ScrollCue />
          </motion.div>
        </motion.div>

        {/* Showcase sits below the fold line, full width — the reference leads
            with type, then hands off to imagery. */}
        <motion.div
          style={{ y }}
          initial={reduce ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mt-14 sm:mt-20"
        >
          <ScreenFrame
            src={lead.image}
            alt={lead.alt}
            domain={lead.domain}
            eager
            glow
          />
        </motion.div>
      </div>
    </section>
  );
}
