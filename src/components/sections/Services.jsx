import { motion } from "framer-motion";
import SectionHead from "../ui/SectionHead";
import Card from "../ui/Card";
import TagPill from "../ui/TagPill";
import CTA from "../CTA";
import { stagger, riseSoft, inView } from "../../lib/motion";
import { SERVICES, SERVICE_TAGS, BRAND } from "../../data/content";

/**
 * Line glyph per service. Kept as a component (not a module-level object of
 * JSX elements) because vite.config.js imports routes.jsx to resolve the SSG
 * path list, and JSX evaluated at import time breaks that config bundle.
 */
function ServiceIcon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    className: "h-6 w-6",
    "aria-hidden": "true",
  };

  switch (name) {
    case "Web Design":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 9h18M8 9v11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "Website Development":
      return (
        <svg {...common}>
          <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "E-Commerce Development":
      return (
        <svg {...common}>
          <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 2-1.5L20.5 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="20" r="1.2" fill="currentColor" />
          <circle cx="17" cy="20" r="1.2" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M20 11a8 8 0 1 0-2.3 5.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 5v6h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

export default function Services({ showHead = true }) {
  return (
    <section id="services" className="relative py-[clamp(5rem,12vw,9rem)]">
      <div className="wrap">
        {showHead && (
          <>
            <SectionHead
              eyebrow="What we do"
              title="Services"
              sub="Everything a business needs to look established online — designed, built, and looked after by the person you talk to."
              actions={
                <>
                  <CTA href={BRAND.dmUrl}>Get a free website idea</CTA>
                  <CTA href="#pricing">See pricing</CTA>
                </>
              }
            />

            <motion.ul
              variants={stagger(0, 0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              className="mt-10 flex flex-wrap gap-3"
            >
              {SERVICE_TAGS.map((t) => (
                <motion.li key={t} variants={riseSoft}>
                  <TagPill>{t}</TagPill>
                </motion.li>
              ))}
            </motion.ul>
          </>
        )}

        <motion.div
          variants={stagger(0, 0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className={`grid gap-5 sm:grid-cols-2 ${showHead ? "mt-14" : ""}`}
        >
          {SERVICES.map((s) => (
            <Card
              key={s.title}
              title={s.title}
              icon={<ServiceIcon name={s.title} />}
              as={showHead ? "h3" : "h2"}
            >
              {s.body}
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
