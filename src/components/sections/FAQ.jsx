import { useState } from "react";
import { motion } from "framer-motion";
import SectionHead from "../ui/SectionHead";
import { rise, stagger, inView } from "../../lib/motion";
import { FAQS } from "../../data/content";

/**
 * Accordion row.
 *
 * The answer is ALWAYS rendered in the DOM and collapsed with a CSS grid
 * row-size transition (1fr → 0fr). The previous implementation unmounted
 * closed answers, so only the first answer survived into the prerendered
 * HTML — the rest were invisible to crawlers. Every Q&A now ships in the
 * static markup while the open/close animation is preserved.
 */
function Row({ item, open, onToggle, i }) {
  return (
    <motion.div variants={rise} className="card overflow-hidden">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-panel-${i}`}
          id={`faq-btn-${i}`}
          className="flex w-full items-center justify-between gap-6 p-6 text-left sm:p-7"
        >
          <span className="font-display text-[1.0625rem] font-medium text-ink sm:text-[1.1875rem]">
            {item.q}
          </span>
          <span aria-hidden className="relative h-5 w-5 shrink-0">
            <span className="absolute left-0 top-1/2 h-px w-5 bg-ink-dim" />
            <span
              className={`absolute left-1/2 top-0 h-5 w-px bg-ink-dim transition-transform duration-300 ease-out-expo ${
                open ? "scale-y-0" : "scale-y-100"
              }`}
            />
          </span>
        </button>
      </h3>

      <div
        id={`faq-panel-${i}`}
        role="region"
        aria-labelledby={`faq-btn-${i}`}
        className="grid transition-[grid-template-rows] duration-[400ms] ease-out-expo"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-[0.9875rem] leading-relaxed text-ink-dim sm:px-7 sm:pb-7">
            {item.a}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FAQ({ items = FAQS }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-[clamp(5rem,12vw,9rem)]">
      <div className="wrap grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              eyebrow="Answers"
              title="Questions, answered."
              sub="The things businesses ask most before starting a website — pricing, timelines, and what happens after launch."
            />
          </div>
        </div>

        <motion.div
          variants={stagger(0, 0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="flex flex-col gap-3.5 lg:col-span-7"
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
