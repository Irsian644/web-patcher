import { motion } from "framer-motion";
import Eyebrow from "./Eyebrow";
import { rise, riseSoft, stagger, inView } from "../../lib/motion";

/**
 * The reference's repeating section formula, defined once:
 *   pill eyebrow → oversized light heading → muted subcopy → optional actions
 *
 * Every section uses this so the vertical rhythm is identical throughout —
 * that consistency is most of what makes the template read as one system.
 *
 * `as` controls the heading level so visual size never dictates semantics.
 * `align="center"` is used by the hero and the closing CTA.
 */
export default function SectionHead({
  eyebrow,
  title,
  sub,
  actions,
  as: Tag = "h2",
  align = "left",
  size = "base",
  className = "",
}) {
  const centered = align === "center";

  const scale =
    size === "hero"
      ? "text-[clamp(2.75rem,8.5vw,5.75rem)]"
      : "text-[clamp(2.25rem,6vw,4.5rem)]";

  return (
    <motion.div
      variants={stagger(0, 0.09)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      className={`flex flex-col ${centered ? "items-center text-center" : "items-start"} ${className}`}
    >
      {eyebrow && (
        <motion.div variants={riseSoft} className="mb-7">
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
      )}

      <motion.div variants={rise} className="w-full">
        <Tag className={`display ${scale} text-ink ${centered ? "mx-auto max-w-4xl" : "max-w-3xl"}`}>
          {title}
        </Tag>
      </motion.div>

      {sub && (
        <motion.p
          variants={riseSoft}
          className={`mt-6 text-[1.0625rem] leading-relaxed text-ink-dim sm:text-[1.125rem] ${
            centered ? "mx-auto max-w-xl" : "max-w-xl"
          }`}
        >
          {sub}
        </motion.p>
      )}

      {actions && (
        <motion.div
          variants={riseSoft}
          className={`mt-9 flex flex-wrap items-center gap-4 ${centered ? "justify-center" : ""}`}
        >
          {actions}
        </motion.div>
      )}
    </motion.div>
  );
}
