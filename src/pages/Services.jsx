import Seo from "../seo/Seo";
import { ROUTES, abs } from "../seo/site";
import { pageGraph, serviceSchema, breadcrumbSchema, faqSchema } from "../seo/schema";
import Breadcrumbs from "../components/Breadcrumbs";
import PageHeader from "../components/PageHeader";
import Pricing from "../components/sections/Pricing";
import Process from "../components/sections/Process";
import FAQ from "../components/sections/FAQ";
import CTABand from "../components/CTABand";
import { FAQS, CARE_INCLUDES, CARE_EXCLUDES } from "../data/content";

const r = ROUTES.services;
const trail = [
  { name: "Home", path: "/" },
  { name: "Services", path: r.path },
];

const SERVICES = [
  {
    title: "Web Design",
    body: "Clean, modern, mobile-first design that helps your business look professional and easy to trust. Every layout is planned around what your customers need to find.",
  },
  {
    title: "Website Development",
    body: "Fast, responsive websites built with modern code — not bloated page builders — so pages load quickly and the site is set up to be found in search.",
  },
  {
    title: "E-Commerce Development",
    body: "Online stores with a product catalogue and secure checkout, so customers across Albania and Europe can browse and order directly.",
  },
  {
    title: "Redesigns & Care",
    body: "Already have a site that looks dated? I can rebuild it and, if you'd like, keep it fast, secure, and up to date with optional monthly care from €20/month.",
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
        title="Websites, built to fit your business."
        intro="From your first professional website to a full online store — clear web design and development for businesses in Albania and across Europe, with honest pricing and realistic timelines."
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

      {/* Optional care — clear about what is and isn't included */}
      <section className="wrap py-[clamp(3rem,7vw,5rem)]">
        <div className="grid gap-10 rounded-2xl border border-line bg-white/[0.02] p-8 sm:p-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-[1.75rem]">
              Optional monthly care
            </h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink-dim">
              Care plans are optional and you're never locked in. If you'd rather
              handle updates yourself, that's completely fine.
            </p>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-ink-faint">
              {CARE_EXCLUDES}
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="label mb-4">A care plan can include</p>
            <ul className="flex flex-col gap-3">
              {CARE_INCLUDES.map((item) => (
                <li key={item} className="flex gap-3 text-[1rem] text-ink-dim">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-soft" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
