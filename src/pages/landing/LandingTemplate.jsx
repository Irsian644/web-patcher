import { motion } from "framer-motion";
import Seo from "../../seo/Seo";
import { abs } from "../../seo/site";
import { pageGraph, serviceSchema, faqSchema, breadcrumbSchema } from "../../seo/schema";
import Breadcrumbs from "../../components/Breadcrumbs";
import PageHeader from "../../components/PageHeader";
import CTABand from "../../components/CTABand";
import FAQ from "../../components/sections/FAQ";
import { rise, stagger, inView } from "../../lib/motion";

/**
 * Shared structure for keyword landing pages — but each page passes
 * unique copy, points, and FAQs so they're genuinely helpful, not doorways.
 */
export default function LandingTemplate({
  route,
  kicker,
  h1,
  intro,
  lead,
  points,
  faqs,
  serviceType,
  internalLinks,
}) {
  const trail = [
    { name: "Home", path: "/" },
    { name: route.breadcrumb || h1, path: route.path },
  ];

  const schema = pageGraph({
    route,
    hasBreadcrumb: true,
    nodes: [
      breadcrumbSchema(trail),
      serviceSchema({
        name: h1,
        description: route.description,
        serviceType,
        url: abs(route.path),
      }),
      faqs?.length ? faqSchema(faqs) : null,
    ],
  });

  return (
    <>
      <Seo title={route.title} description={route.description} path={route.path} image={route.ogImage} schema={schema} />
      <Breadcrumbs trail={trail} />
      <PageHeader kicker={kicker} title={h1} intro={intro} />

      <section className="wrap pb-[clamp(3rem,7vw,5rem)]">
        {lead && (
          <p className="max-w-2xl text-[1.1rem] leading-relaxed text-ink-dim">{lead}</p>
        )}

        <motion.div
          variants={stagger(0, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2"
        >
          {points.map((p) => (
            <motion.div key={p.title} variants={rise} className="bg-bg p-8 sm:p-10">
              <h2 className="font-display text-xl font-semibold text-ink">{p.title}</h2>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-dim">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {faqs?.length ? <FAQ items={faqs} /> : null}

      <CTABand links={internalLinks} />
    </>
  );
}
