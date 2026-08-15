import { motion } from "framer-motion";
import SectionHead from "../ui/SectionHead";
import { riseSoft, stagger, inView } from "../../lib/motion";

/* Real, verifiable proof points — no invented percentages or ambiguous dates. */
const STATS = [
  { value: "3", label: "Live client websites" },
  { value: "Days", label: "Typical launch, not months" },
  { value: "Est. 1988", label: "A client business, brought online" },
  { value: "1:1", label: "You work directly with the builder" },
];

export default function Trust() {
  return (
    <section className="relative py-[clamp(5rem,12vw,9rem)]">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead
              eyebrow="Why it matters"
              title="People judge your business before they ever message you."
            />
          </div>

          <motion.div
            variants={riseSoft}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="self-end lg:col-span-5"
          >
            <p className="text-[1.0625rem] leading-relaxed text-ink-dim">
              They Google you. They want prices, hours, and proof you're real —
              in seconds. Without a website, that's hard to show. With the right
              one, you look established and easy to trust.
            </p>
          </motion.div>
        </div>

        <motion.dl
          variants={stagger(0, 0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={riseSoft} className="card p-6 sm:p-7">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-none text-ink tabular-nums">
                  {s.value}
                </span>
                <span className="mt-3 block text-[0.875rem] leading-relaxed text-ink-dim">
                  {s.label}
                </span>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
