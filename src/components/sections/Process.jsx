import { motion } from "framer-motion";
import { rise, riseSoft, stagger, inView } from "../../lib/motion";
import { PROCESS } from "../../data/content";

export default function Process() {
  return (
    <section id="process" className="panel relative py-[clamp(5rem,12vw,9rem)]">
      <div className="wrap">
        <motion.div
          variants={stagger(0, 0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mb-[clamp(3rem,7vw,6rem)] flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
        >
          <h2 className="display max-w-xl text-[clamp(2rem,5vw,3.75rem)] font-semibold text-ink">
            <motion.span variants={rise} className="block">
              From idea to live.
            </motion.span>
            <motion.span variants={rise} className="block text-ink-dim">
              Done for you.
            </motion.span>
          </h2>
          <motion.p variants={riseSoft} className="max-w-xs text-ink-dim">
            A calm, transparent process. You stay in the loop — we carry the weight.
          </motion.p>
        </motion.div>

        <motion.ol
          variants={stagger(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROCESS.map((p, i) => (
            <motion.li key={p.n} variants={rise} className="group relative">
              <div className="mb-6 flex items-center gap-4">
                <span className="font-display text-[2.75rem] font-semibold leading-none text-ink/15 transition-colors duration-500 group-hover:text-blue-soft tabular-nums">
                  {p.n}
                </span>
                {/* hairline draws itself in, staggered per step */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.9,
                    delay: 0.25 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-px flex-1 origin-left bg-line transition-colors duration-500 group-hover:bg-blue/40"
                />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink">{p.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-dim">{p.desc}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
