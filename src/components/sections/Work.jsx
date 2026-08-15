import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ScreenFrame from "../ScreenFrame";
import BeforeAfter from "../BeforeAfter";
import CTA from "../CTA";
import SectionHead from "../ui/SectionHead";
import { rise, riseSoft, stagger, inView } from "../../lib/motion";
import { PROJECTS, BRAND } from "../../data/content";

function ProjectRow({ project, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60]);

  const flip = index % 2 === 1;
  const isFirst = index === 0;

  return (
    <motion.article
      ref={ref}
      variants={stagger(0, 0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
    >
      {/* Visual */}
      <motion.div
        style={{ y }}
        className={`lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : "lg:order-1"}`}
      >
        {isFirst ? (
          <BeforeAfter src={project.image} alt={project.alt} domain={project.domain} />
        ) : (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group relative block rounded-card"
            aria-label={`${project.title} — open live site`}
          >
            {/* hover: ambient light wakes up beneath the frame */}
            <span
              aria-hidden
              className="absolute -inset-x-4 bottom-0 top-1/2 -z-10 rounded-[50%] opacity-0 blur-2xl transition-opacity duration-700 ease-out-expo group-hover:opacity-100"
              style={{ background: "oklch(0.62 0.21 258 / 0.16)" }}
            />
            <div className="overflow-hidden rounded-card">
              <div className="transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.04]">
                <ScreenFrame
                  src={project.image}
                  alt={project.alt}
                  domain={project.domain}
                />
              </div>
            </div>
            {/* corner hint: visit arrow slides in */}
            <span className="pointer-events-none absolute right-4 top-14 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-bg/70 opacity-0 backdrop-blur-sm transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-ink" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        )}
      </motion.div>

      {/* Meta */}
      <div
        className={`lg:col-span-5 ${
          flip ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-8"
        }`}
      >
        <motion.div variants={riseSoft} className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-[10px] border border-line bg-surface px-3 py-1.5 text-[0.875rem] text-ink-dim">
            {project.sector}
          </span>
          <span className="inline-flex items-center rounded-[10px] border border-line bg-surface px-3 py-1.5 text-[0.875rem] text-ink-dim">
            {project.year}
          </span>
          {project.live && (
            <span className="inline-flex items-center gap-2 rounded-[10px] border border-line bg-surface px-3 py-1.5 text-[0.875rem] text-ink-dim">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blue-soft" />
              Live
            </span>
          )}
        </motion.div>

        <motion.h3
          variants={rise}
          className="display text-[clamp(2rem,4.5vw,3.25rem)] text-ink"
        >
          {project.title}
        </motion.h3>

        <motion.p variants={riseSoft} className="mt-5 max-w-md text-[1.0125rem] leading-relaxed text-ink-dim">
          {project.blurb}
        </motion.p>

        <motion.div variants={riseSoft} className="mt-8">
          <CTA href={project.url} variant="bare">
            {isFirst ? "Drag to compare · Visit site" : "Visit live site"}
          </CTA>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function Work({ showIntro = true }) {
  return (
    <section id="work" className="panel relative py-[clamp(5rem,12vw,9rem)]">
      <div className="wrap">
        {/* Section intro (suppressed when a page provides its own H1) */}
        {showIntro && (
          <div className="mb-[clamp(4rem,8vw,7rem)]">
            <SectionHead
              eyebrow="Selected work"
              title="Recent Works"
              sub="Real websites built for real businesses — fashion, beauty, and local service brands across Albania and Europe."
              actions={<CTA href={BRAND.dmUrl}>Get your free concept</CTA>}
            />
          </div>
        )}

        <div className="flex flex-col gap-[clamp(5rem,10vw,8rem)]">
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* closing line */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="card mt-[clamp(4rem,8vw,7rem)] flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10"
        >
          <p className="font-display text-2xl font-light text-ink sm:text-3xl">
            Your business could be next.
          </p>
          <CTA href={BRAND.dmUrl}>Get your free concept</CTA>
        </motion.div>
      </div>
    </section>
  );
}
