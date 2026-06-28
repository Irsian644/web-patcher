import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rise, riseSoft, stagger, inView } from "../../lib/motion";
import { FAQS } from "../../data/content";

function Row({ item, open, onToggle, i }) {
  return (
    <motion.div variants={rise} className="border-t border-line last:border-b">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-${i}`}
        className="flex w-full items-center justify-between gap-6 py-7 text-left"
      >
        <span className="font-display text-lg font-medium text-ink sm:text-xl">
          {item.q}
        </span>
        <span className="relative h-5 w-5 shrink-0">
          <span className="absolute left-0 top-1/2 h-px w-5 bg-ink-dim" />
          <span
            className={`absolute left-1/2 top-0 h-5 w-px bg-ink-dim transition-transform duration-300 ease-out-expo ${
              open ? "scale-y-0" : "scale-y-100"
            }`}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-${i}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 text-[1rem] leading-relaxed text-ink-dim">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ({ items = FAQS }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-[clamp(5rem,12vw,9rem)]">
      <div className="wrap grid gap-y-10 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-4">
          <h2 className="display sticky top-28 text-[clamp(2rem,5vw,3.25rem)] font-semibold text-ink">
            Questions,<br />
            <span className="text-ink-dim">answered.</span>
          </h2>
        </div>
        <motion.div
          variants={stagger(0, 0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="lg:col-span-7 lg:col-start-6"
        >
          {items.map((item, i) => (
            <Row
              key={item.q}
              item={item}
              i={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
