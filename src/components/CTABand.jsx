import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CTA from "./CTA";
import { riseSoft, inView } from "../lib/motion";
import { BRAND } from "../data/content";

/** Reusable conversion + internal-link band for inner pages. */
export default function CTABand({
  title = "Ready for a website that works as hard as you do?",
  text = "Tell us about your business and get a free concept — no cost, no commitment.",
  links = [],
}) {
  return (
    <section className="relative overflow-hidden py-[clamp(5rem,11vw,8rem)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full opacity-50"
        style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.16), transparent)" }}
      />
      <motion.div
        variants={riseSoft}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="wrap relative"
      >
        <h2 className="display max-w-2xl text-[clamp(1.9rem,4.5vw,3.25rem)] font-light text-ink">
          {title}
        </h2>
        <p className="mt-5 max-w-xl text-[1.05rem] text-ink-dim">{text}</p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <CTA href={BRAND.dmUrl}>Get a free website idea</CTA>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[0.95rem] text-ink-dim underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
