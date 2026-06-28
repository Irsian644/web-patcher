import Seo from "../seo/Seo";
import { ROUTES } from "../seo/site";
import { pageGraph, organizationSchema, breadcrumbSchema } from "../seo/schema";
import Breadcrumbs from "../components/Breadcrumbs";
import PageHeader from "../components/PageHeader";
import Trust from "../components/sections/Trust";
import CTABand from "../components/CTABand";

const r = ROUTES.about;
const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: r.path },
];

const VALUES = [
  {
    title: "Speed",
    body: "Most websites launch in days, not months — without cutting corners on quality.",
  },
  {
    title: "Trust",
    body: "Every site is built to make your business look serious, credible, and worth buying from.",
  },
  {
    title: "Conversion",
    body: "Beautiful isn't enough. We design around one goal: turning visitors into paying customers.",
  },
];

export default function About() {
  const schema = pageGraph({
    route: r,
    hasBreadcrumb: true,
    nodes: [breadcrumbSchema(trail), organizationSchema()],
  });

  return (
    <>
      <Seo title={r.title} description={r.description} path={r.path} image={r.ogImage} schema={schema} />
      <Breadcrumbs trail={trail} />
      <PageHeader
        kicker="About"
        title="A web studio for businesses that have outgrown Instagram."
        intro="TheWebPatcher is a premium web design and development studio helping businesses in Albania and across Europe build a professional online presence — fast, modern websites that earn trust and win customers."
      />

      <section className="wrap pb-[clamp(3rem,7vw,5rem)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="text-[1.1rem] leading-relaxed text-ink-dim">
              We started TheWebPatcher with a simple belief: every good business
              deserves a website that does it justice. Too many talented owners
              rely on a social feed alone — and lose customers who Google them,
              find nothing solid, and move on.
            </p>
            <p className="mt-6 text-[1.1rem] leading-relaxed text-ink-dim">
              So we build websites that change first impressions. Fast,
              mobile-first, SEO-friendly, and designed to convert — for fashion
              brands, beauty studios, local services, and online stores alike.
              From a first business website to a full e-commerce store, we handle
              design, development, and ongoing care.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="flex flex-col gap-8">
              {VALUES.map((v) => (
                <div key={v.title}>
                  <dt className="font-display text-xl font-semibold text-ink">{v.title}</dt>
                  <dd className="mt-2 text-[0.98rem] leading-relaxed text-ink-dim">{v.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Trust />
      <CTABand
        links={[
          { label: "See our work", to: "/portfolio" },
          { label: "Services & pricing", to: "/services" },
        ]}
      />
    </>
  );
}
