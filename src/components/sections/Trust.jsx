import { motion } from "framer-motion";
import { rise, riseSoft, stagger, inView } from "../../lib/motion";

/* Real, verifiable proof points — no invented percentages or ambiguous dates. */
const STATS = [
  { value: "3", label: "Live client websites" },
  { value: "Days", label: "Typical launch, not months" },
  { value: "Est. 1988", label: "A client business, brought online" },
  { value: "1:1", label: "You work directly with the builder" },
];

function Stat({ value, label }) {
  return (
    <motion.div variants={riseSoft} className="flex flex-col gap-1.5">
      <span className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-none text-ink tabular-nums">
        {value}
      </span>
      <span className="text-sm text-ink-dim">{label}</span>
    </motion.div>
  );
}

export default function Trust() {
  return (
    <section className="relative py-[clamp(6rem,14vw,11rem)]">
      <div className="wrap">
        <motion.div
          variants={stagger(0, 0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16"
        >
          {/* big statement */}
          <div className="lg:col-span-7 lg:col-start-1">
            <motion.p variants={riseSoft} className="label mb-7">
              The part nobody tells you
            </motion.p>
            <h2 className="display text-[clamp(2rem,5.5vw,4rem)] font-semibold text-ink">
              <motion.span variants={rise} className="block">
                People judge your business
              </motion.span>
              <motion.span variants={rise} className="block text-ink-dim">
                before they ever message you.
              </motion.span>
            </h2>
          </div>

          {/* supporting line, offset */}
          <motion.div
            variants={riseSoft}
            className="self-end lg:col-span-4 lg:col-start-9"
          >
            <p className="text-[1.05rem] leading-relaxed text-ink-dim">
              They Google you. They want prices, hours, and proof you're real —
              in seconds. Without a website, that's hard to show. With the right
              one, you look established and easy to trust.
            </p>
          </motion.div>

          {/* real proof — a stat row, not cards, not invented percentages */}
          <div className="mt-6 lg:col-span-12">
            <motion.div
              variants={riseSoft}
              className="rule-glow mb-12 opacity-60"
            />
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {STATS.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
