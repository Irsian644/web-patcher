import Seo from "../seo/Seo";
import { ROUTES, abs } from "../seo/site";
import { pageGraph, serviceSchema, breadcrumbSchema, faqSchema } from "../seo/schema";
import Breadcrumbs from "../components/Breadcrumbs";
import PageHeader from "../components/PageHeader";
import Pricing from "../components/sections/Pricing";
import Process from "../components/sections/Process";
import FAQ from "../components/sections/FAQ";
import CTABand from "../components/CTABand";
import { FAQS } from "../data/content";

const r = ROUTES.services;
const trail = [
  { name: "Home", path: "/" },
  { name: "Services", path: r.path },
];

const SERVICES = [
  {
    title: "Web Design",
    body: "Clean, modern, mobile-first design that makes your business look trusted from the first second. Every layout is built around one goal: turning visitors into customers.",
  },
  {
    title: "Website Development",
    body: "Fast, responsive websites engineered for speed, SEO, and conversions. Built with modern technology — not bloated page builders — so your site loads instantly and ranks well.",
  },
  {
    title: "E-Commerce Development",
    body: "Full online stores with product catalogs, secure checkout, and conversion-first funnels. Start selling to customers across Albania and Europe.",
  },
  {
    title: "Redesigns & Maintenance",
    body: "Already have a site that looks dated or doesn't convert? We rebuild it — and keep it fast, secure, and up to date with optional monthly care from €20/month.",
  },
];

export default function Services() {
  const schema = pageGraph({
    route: r,
    hasBreadcrumb: true,
    nodes: [
      breadcrumbSchema(trail),
      serviceSchema({
        name: "Website Development Services",
        description: r.description,
        serviceType: "Web Design and Website Development",
        url: abs(r.path),
      }),
      faqSchema(FAQS),
    ],
  });

  return (
    <>
      <Seo title={r.title} description={r.description} path={r.path} image={r.ogImage} schema={schema} />
      <Breadcrumbs trail={trail} />
      <PageHeader
        kicker="Services & pricing"
        title="Website development services that grow your business."
        intro="From your first professional website to a full e-commerce store — TheWebPatcher offers affordable, premium web design and development for businesses in Albania and across Europe."
      />

      <section className="wrap pb-[clamp(4rem,9vw,7rem)]">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.title} className="bg-bg p-8 sm:p-10">
              <h2 className="font-display text-2xl font-semibold text-ink">{s.title}</h2>
              <p className="mt-4 text-[1rem] leading-relaxed text-ink-dim">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Pricing />
      <Process />
      <FAQ />
      <CTABand
        title="Not sure which service you need?"
        text="Message us with a few words about your business. We'll recommend the right plan — and send a free concept."
        links={[
          { label: "See our portfolio", to: "/portfolio" },
          { label: "Web design in Albania", to: "/web-design-albania" },
        ]}
      />
    </>
  );
}
