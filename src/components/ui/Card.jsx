import { motion } from "framer-motion";
import { rise } from "../../lib/motion";

/**
 * Reference card: raised surface, large radius, optional icon, title, a
 * hairline divider, then muted body. The divider under the title is the
 * detail that makes these read as designed rather than generic boxes.
 *
 * `as` keeps heading semantics under the caller's control.
 */
export default function Card({
  icon,
  title,
  children,
  as: Tag = "h3",
  className = "",
  ...props
}) {
  return (
    <motion.div
      variants={rise}
      className={`card group p-7 transition-colors duration-500 hover:border-line-strong sm:p-9 ${className}`}
      {...props}
    >
      {(icon || title) && (
        <div className="flex items-center gap-3.5">
          {icon && (
            <span aria-hidden className="text-ink-dim transition-colors duration-500 group-hover:text-blue-soft">
              {icon}
            </span>
          )}
          {title && (
            <Tag className="font-display text-[1.375rem] font-medium text-ink sm:text-2xl">
              {title}
            </Tag>
          )}
        </div>
      )}

      {(icon || title) && <div className="my-6 h-px w-full bg-line" />}

      <div className="text-[0.9875rem] leading-relaxed text-ink-dim">{children}</div>
    </motion.div>
  );
}
