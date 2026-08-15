import { motion } from "framer-motion";
import SectionHead from "../ui/SectionHead";
import { rise, stagger, inView } from "../../lib/motion";
import { PROCESS } from "../../data/content";

export default function Process() {
  return (
    <section id="process" className="relative py-[clamp(5rem,12vw,9rem)]">
      <div className="wrap">
        <SectionHead
          eyebrow="How it works"
          title="Process"
          sub="A calm, transparent path from first message to live website. You stay in the loop — we carry the weight."
        />

        <motion.ol
          variants={stagger(0, 0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROCESS.map((p) => (
            <motion.li key={p.n} variants={rise} className="card group flex flex-col p-7 sm:p-8">
              <span className="font-display text-[2.5rem] font-light leading-none text-ink/20 tabular-nums transition-colors duration-500 group-hover:text-blue-soft">
                {p.n}
              </span>

              <div className="my-6 h-px w-full bg-line" />

              <h3 className="font-display text-[1.25rem] font-medium text-ink">
                {p.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-dim">
                {p.desc}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
