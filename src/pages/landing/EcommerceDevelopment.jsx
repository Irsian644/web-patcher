import LandingTemplate from "./LandingTemplate";
import { ROUTES } from "../../seo/site";

export default function EcommerceDevelopment() {
  return (
    <LandingTemplate
      route={ROUTES.ecommerceDevelopment}
      kicker="E-commerce · Albania"
      h1="E-commerce website development that sells."
      intro="TheWebPatcher builds fast, secure online stores for businesses in Albania and Europe — product catalogs, checkout, and conversion-first design so you can sell around the clock."
      lead="Selling through Instagram DMs doesn't scale. A real online store lets customers browse, trust, and buy on their own — day or night — while you focus on running the business. We build e-commerce websites engineered to convert browsers into orders."
      serviceType="E-commerce Development"
      points={[
        { title: "Full online store", body: "Product catalog, categories, search, and a smooth cart-to-checkout flow built to maximize completed orders." },
        { title: "Secure payments", body: "Trusted, secure payment integration so customers feel safe buying — a must for converting first-time visitors." },
        { title: "Conversion-first design", body: "Clear product pages, fast load times, and persuasive layouts designed to turn traffic into revenue." },
        { title: "Built to grow", body: "Add products, run promotions, and scale. Optional ongoing support keeps your store fast and up to date." },
      ]}
      faqs={[
        { q: "How much does an e-commerce website cost in Albania?", a: "A full online store starts at €800–€1000 depending on the number of products and features, with maintenance from €60/month." },
        { q: "Can customers pay online securely?", a: "Yes. We integrate secure, trusted payment methods so your customers can check out with confidence." },
        { q: "How long does it take to build an online store?", a: "A full e-commerce website typically takes 2–4 weeks from concept to launch." },
      ]}
      internalLinks={[
        { label: "View services & pricing", to: "/services" },
        { label: "Web design in Albania", to: "/web-design-albania" },
        { label: "See our portfolio", to: "/portfolio" },
      ]}
    />
  );
}
