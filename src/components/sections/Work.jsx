import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ScreenFrame from "../ScreenFrame";
import BeforeAfter from "../BeforeAfter";
import CTA from "../CTA";
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
            className="group block overflow-hidden rounded-[16px]"
            aria-label={`${project.title} — open live site`}
          >
            <div className="overflow-hidden rounded-[14px]">
              <div className="transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.04]">
                <ScreenFrame
                  src={project.image}
                  alt={project.alt}
                  domain={project.domain}
                />
              </div>
            </div>
          </a>
        )}
      </motion.div>

      {/* Meta */}
      <div
        className={`lg:col-span-5 ${
          flip ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-8"
        }`}
      >
        <motion.div variants={riseSoft} className="mb-5 flex items-center gap-4">
          <span className="font-mono text-sm text-blue-soft tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-10 bg-line" />
          <span className="label">{project.sector}</span>
          {project.live && (
            <span className="flex items-center gap-1.5 text-[0.68rem] uppercase tracking-wider text-ink-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-soft" />
              Live
            </span>
          )}
        </motion.div>

        <motion.h3
          variants={rise}
          className="display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold text-ink"
        >
          {project.title}
        </motion.h3>

        <motion.p variants={riseSoft} className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-ink-dim">
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
    <section id="work" className="relative py-[clamp(5rem,12vw,9rem)]">
      <div className="wrap">
        {/* Section intro (suppressed when a page provides its own H1) */}
        {showIntro && (
          <motion.div
            variants={stagger(0, 0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="mb-[clamp(4rem,8vw,7rem)] max-w-3xl"
          >
            <motion.p variants={riseSoft} className="label mb-6">
              Selected work
            </motion.p>
            <h2 className="display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold text-ink">
              <motion.span variants={rise} className="block">
                Real businesses.
              </motion.span>
              <motion.span variants={rise} className="block text-ink-dim">
                Websites that earn trust.
              </motion.span>
            </h2>
          </motion.div>
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
          className="mt-[clamp(4rem,8vw,7rem)] flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center"
        >
          <p className="font-display text-2xl font-medium text-ink sm:text-3xl">
            Your business could be next.
          </p>
          <CTA href={BRAND.dmUrl}>Get your free concept</CTA>
        </motion.div>
      </div>
    </section>
  );
}
