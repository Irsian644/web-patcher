import { motion } from "framer-motion";
import { rise, riseSoft, stagger, inView } from "../../lib/motion";
import { TESTIMONIALS } from "../../data/content";

function RealDmTag() {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-ink-faint">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-blue-soft" fill="none" aria-hidden="true">
        <path
          d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Real client message
    </span>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-[clamp(5rem,12vw,9rem)]">
      <div className="wrap">
        <motion.div
          variants={stagger(0, 0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mb-[clamp(3rem,7vw,6rem)] max-w-2xl"
        >
          <motion.p variants={riseSoft} className="label mb-6">
            In their words
          </motion.p>
          <h2 className="display text-[clamp(2rem,5vw,3.75rem)] font-semibold text-ink">
            <motion.span variants={rise} className="block">
              The work speaks.
            </motion.span>
            <motion.span variants={rise} className="block text-ink-dim">
              So do the clients.
            </motion.span>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger(0, 0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="grid gap-x-16 gap-y-16 lg:grid-cols-2"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.business}
              variants={rise}
              className={`relative pl-2 ${i === 1 ? "lg:mt-24" : ""}`}
            >
              {/* oversized hanging quote — editorial, not inline punctuation */}
              <span
                aria-hidden
                className="pointer-events-none absolute -left-3 -top-10 select-none font-display text-[7rem] font-semibold leading-none text-blue/25 sm:-left-6 sm:text-[9rem]"
              >
                “
              </span>
              <blockquote className="relative font-display text-[clamp(1.6rem,3.4vw,2.5rem)] font-medium leading-[1.18] tracking-tight text-ink">
                {t.quote}
              </blockquote>

              <p className="mt-5 text-[0.95rem] italic text-ink-faint">
                {t.original}
              </p>

              <figcaption className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-display text-base font-semibold text-ink">
                  {t.business}
                </span>
                <span className="h-3 w-px bg-line-strong" />
                <span className="text-sm text-ink-dim">{t.sector}</span>
                <span className="h-3 w-px bg-line-strong" />
                <RealDmTag />
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
