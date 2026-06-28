import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CTA from "../CTA";
import { rise, riseSoft, stagger, inView } from "../../lib/motion";
import { PLANS, BRAND } from "../../data/content";

// Keyword-rich internal links (topical hub → spoke). Shown on the homepage.
const RELATED = [
  { label: "Web design in Albania", to: "/web-design-albania" },
  { label: "E-commerce development", to: "/ecommerce-development" },
  { label: "Business websites", to: "/business-websites" },
];

function PlanRow({ plan }) {
  return (
    <motion.div
      variants={rise}
      className="group relative grid grid-cols-1 gap-4 border-t border-line py-8 transition-colors duration-500 hover:border-line-strong sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-center sm:gap-8"
    >
      {/* name + best-for */}
      <div className="flex items-baseline gap-3">
        <h3 className="font-display text-2xl font-semibold text-ink sm:text-[1.75rem]">
          {plan.name}
        </h3>
        {plan.featured && (
          <span className="rounded-full border border-blue/40 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-blue-soft">
            Most chosen
          </span>
        )}
      </div>

      <p className="text-[0.95rem] text-ink-dim sm:max-w-[14rem]">{plan.for}</p>

      <div className="flex items-center gap-6 sm:flex-col sm:items-start sm:gap-1">
        <span className="font-display text-xl font-semibold text-ink tabular-nums">
          {plan.price}
        </span>
        <span className="font-mono text-xs text-ink-faint">
          {plan.timeline} · care {plan.care}
        </span>
      </div>

      <div className="sm:justify-self-end">
        <CTA href={BRAND.dmUrl} variant="bare" className="text-ink-dim group-hover:text-ink">
          Start
        </CTA>
      </div>
    </motion.div>
  );
}

export default function Pricing({ showRelated = false }) {
  return (
    <section id="pricing" className="relative py-[clamp(5rem,12vw,9rem)]">
      <div className="wrap">
        <motion.div
          variants={stagger(0, 0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mb-[clamp(2.5rem,6vw,4.5rem)] flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
        >
          <h2 className="display max-w-xl text-[clamp(2rem,5vw,3.75rem)] font-semibold text-ink">
            <motion.span variants={rise} className="block">
              Honest pricing.
            </motion.span>
            <motion.span variants={rise} className="block text-ink-dim">
              No surprises.
            </motion.span>
          </h2>
          <motion.p variants={riseSoft} className="max-w-xs text-ink-dim">
            Every site is fast, mobile-first, and built to win customers. Not sure
            which? We'll tell you — free.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="border-b border-line"
        >
          {PLANS.map((p) => (
            <PlanRow key={p.name} plan={p} />
          ))}
        </motion.div>

        {showRelated && (
          <p className="mt-10 text-[0.95rem] text-ink-dim">
            Explore:{" "}
            {RELATED.map((l, i) => (
              <span key={l.to}>
                <Link
                  to={l.to}
                  className="text-ink underline-offset-4 transition-colors hover:text-blue-soft hover:underline"
                >
                  {l.label}
                </Link>
                {i < RELATED.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}
