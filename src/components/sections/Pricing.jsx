import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CTA from "../CTA";
import SectionHead from "../ui/SectionHead";
import { rise, riseSoft, stagger, inView } from "../../lib/motion";
import { PLANS, dmLink } from "../../data/content";

// Keyword-rich internal links (topical hub → spoke). Shown on the homepage.
const RELATED = [
  { label: "Web design in Albania", to: "/web-design-albania" },
  { label: "E-commerce development", to: "/ecommerce-development" },
  { label: "Business websites", to: "/business-websites" },
];

function PlanCard({ plan }) {
  return (
    <motion.div
      variants={rise}
      className={`card relative flex flex-col p-7 transition-colors duration-500 sm:p-9 ${
        plan.featured ? "border-blue/35" : "hover:border-line-strong"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-[1.5rem] font-medium text-ink">
          {plan.name}
        </h3>
        {plan.featured && (
          <span className="rounded-full border border-blue/40 bg-blue/10 px-3 py-1 text-[0.6875rem] uppercase tracking-wider text-blue-soft">
            Most chosen
          </span>
        )}
      </div>

      <p className="mt-3 text-[0.9375rem] text-ink-dim">{plan.for}</p>

      <div className="my-6 h-px w-full bg-line" />

      <div className="flex items-baseline gap-2">
        <span className="font-display text-[2rem] font-light text-ink tabular-nums">
          {plan.price}
        </span>
        <span className="text-[0.875rem] text-ink-faint">{plan.pages}</span>
      </div>

      <p className="mt-2 font-mono text-[0.8125rem] text-ink-faint">
        {plan.timeline} · optional care {plan.care}
      </p>

      <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-ink-dim">
        {plan.scope}
      </p>

      <div className="mt-8">
        <CTA href={dmLink(plan.intent)} className="w-full justify-center">
          {plan.cta}
        </CTA>
      </div>
    </motion.div>
  );
}

export default function Pricing({ showRelated = false }) {
  return (
    <section id="pricing" className="relative py-[clamp(5rem,12vw,9rem)]">
      <div className="wrap">
        <SectionHead
          eyebrow="Pricing"
          title="Honest pricing. No surprises."
          sub="Every site is fast, mobile-first, and easy for customers to use. Not sure which fits? We'll help you choose — free."
        />

        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 grid gap-5 lg:grid-cols-3"
        >
          {PLANS.map((p) => (
            <PlanCard key={p.name} plan={p} />
          ))}
        </motion.div>

        {showRelated && (
          <motion.p
            variants={riseSoft}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="mt-10 text-[0.9375rem] text-ink-dim"
          >
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
          </motion.p>
        )}
      </div>
    </section>
  );
}
