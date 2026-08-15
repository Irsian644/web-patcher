import Seo from "../seo/Seo";
import { ROUTES, abs } from "../seo/site";
import { pageGraph, serviceSchema, breadcrumbSchema, faqSchema } from "../seo/schema";
import Breadcrumbs from "../components/Breadcrumbs";
import PageHeader from "../components/PageHeader";
import Pricing from "../components/sections/Pricing";
import Process from "../components/sections/Process";
import ServicesSection from "../components/sections/Services";
import FAQ from "../components/sections/FAQ";
import CTABand from "../components/CTABand";
import { FAQS, CARE_INCLUDES, CARE_EXCLUDES } from "../data/content";

const r = ROUTES.services;
const trail = [
  { name: "Home", path: "/" },
  { name: "Services", path: r.path },
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

      {/* The page's own H1 is in PageHeader, so the section renders its
          cards without a duplicate heading block. */}
      <ServicesSection showHead={false} />

      <Pricing />

      {/* Optional care — clear about what is and isn't included */}
      <section className="wrap py-[clamp(3rem,7vw,5rem)]">
        <div className="grid gap-10 rounded-card border border-line bg-surface p-8 sm:p-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display text-2xl font-medium text-ink sm:text-[1.75rem]">
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
