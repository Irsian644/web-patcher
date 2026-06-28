import { motion } from "framer-motion";
import { rise, riseSoft, stagger } from "../lib/motion";

/** H1 + intro for inner/landing pages. The page's single <h1>. */
export default function PageHeader({ kicker, title, intro }) {
  return (
    <header className="wrap pb-[clamp(3rem,7vw,5rem)] pt-12">
      <motion.div variants={stagger(0, 0.08)} initial="hidden" animate="visible">
        {kicker && (
          <motion.p variants={riseSoft} className="label mb-6">
            {kicker}
          </motion.p>
        )}
        <motion.h1
          variants={rise}
          className="display max-w-4xl text-[clamp(2.4rem,6vw,4.75rem)] font-semibold text-ink"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            variants={riseSoft}
            className="mt-7 max-w-2xl text-[1.1rem] leading-relaxed text-ink-dim"
          >
            {intro}
          </motion.p>
        )}
      </motion.div>
    </header>
  );
}
