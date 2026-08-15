import { motion } from "framer-motion";
import SectionHead from "../ui/SectionHead";
import { rise, stagger, inView } from "../../lib/motion";
import { TESTIMONIALS } from "../../data/content";

function RealDmTag() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-faint">
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

/* Initials stand in for the reference's avatar — these are real businesses,
   so inventing photographs of people would be dishonest. */
function Monogram({ name }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 font-display text-lg font-medium text-blue-soft"
    >
      {initials}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-[clamp(5rem,12vw,9rem)]">
      <div className="wrap">
        <SectionHead
          eyebrow="Reviews"
          title="Client Reviews"
          sub="Real messages from businesses whose websites we designed and built — translated from Albanian, business names only."
        />

        <motion.div
          variants={stagger(0, 0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 grid gap-5 lg:grid-cols-2"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure key={t.business} variants={rise} className="card p-7 sm:p-9">
              <div className="flex items-center gap-4">
                <Monogram name={t.business} />
                <figcaption>
                  <span className="block font-display text-[1.375rem] font-medium text-ink">
                    {t.business}
                  </span>
                  <span className="mt-0.5 block text-[0.9375rem] text-ink-dim">
                    {t.sector}
                  </span>
                </figcaption>
              </div>

              <div className="my-6 h-px w-full bg-line" />

              <blockquote className="font-display text-[clamp(1.25rem,2.4vw,1.625rem)] font-light leading-snug text-ink">
                {t.quote}
              </blockquote>

              <p className="mt-4 text-[0.9375rem] italic text-ink-faint">
                {t.original}
              </p>

              <div className="mt-6">
                <RealDmTag />
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
