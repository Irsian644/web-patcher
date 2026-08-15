import Seo from "../seo/Seo";
import { ROUTES } from "../seo/site";
import {
  graph,
  webPageSchema,
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  faqSchema,
  reviewSchema,
} from "../seo/schema";
import { abs } from "../seo/site";
import { FAQS, TESTIMONIALS } from "../data/content";

import Hero from "../components/sections/Hero";
import Trust from "../components/sections/Trust";
import Work from "../components/sections/Work";
import Services from "../components/sections/Services";
import Testimonials from "../components/sections/Testimonials";
import Process from "../components/sections/Process";
import Pricing from "../components/sections/Pricing";
import FAQ from "../components/sections/FAQ";
import FinalCTA from "../components/sections/FinalCTA";

const r = ROUTES.home;

export default function Home() {
  const schema = graph([
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema(),
    webPageSchema({
      url: abs(r.path),
      name: r.title,
      description: r.description,
      primaryImage: abs(r.ogImage),
    }),
    faqSchema(FAQS),
    ...reviewSchema(TESTIMONIALS),
  ]);

  return (
    <>
      <Seo
        title={r.title}
        description={r.description}
        path={r.path}
        image={r.ogImage}
        schema={schema}
      />
      {/* Section order mirrors the reference: work leads, then the studio
          story, process, services, proof, pricing, answers, close. */}
      <Hero />
      <Work />
      <Trust />
      <Process />
      <Services />
      <Testimonials />
      <Pricing showRelated />
      <FAQ />
      <FinalCTA />
    </>
  );
}
