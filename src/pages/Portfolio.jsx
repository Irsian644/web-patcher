import Seo from "../seo/Seo";
import { ROUTES } from "../seo/site";
import { pageGraph, breadcrumbSchema } from "../seo/schema";
import Breadcrumbs from "../components/Breadcrumbs";
import PageHeader from "../components/PageHeader";
import Work from "../components/sections/Work";
import Testimonials from "../components/sections/Testimonials";
import CTABand from "../components/CTABand";

const r = ROUTES.portfolio;
const trail = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: r.path },
];

export default function Portfolio() {
  const schema = pageGraph({
    route: r,
    hasBreadcrumb: true,
    nodes: [breadcrumbSchema(trail)],
  });

  return (
    <>
      <Seo title={r.title} description={r.description} path={r.path} image={r.ogImage} schema={schema} />
      <Breadcrumbs trail={trail} />
      <PageHeader
        kicker="Selected work"
        title="Real websites, real businesses."
        intro="A look at websites TheWebPatcher has designed and developed for fashion, beauty, and local service businesses — fast, premium, and built to convert. Drag the slider on the first project to see the difference a real website makes."
      />
      <Work showIntro={false} />
      <Testimonials />
      <CTABand
        title="Your business could be the next case study."
        text="Get a free concept of what your website could look like — designed around your brand."
        links={[
          { label: "View services & pricing", to: "/services" },
          { label: "Business websites", to: "/business-websites" },
        ]}
      />
    </>
  );
}
