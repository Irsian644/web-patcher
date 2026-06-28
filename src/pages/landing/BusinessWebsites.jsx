import LandingTemplate from "./LandingTemplate";
import { ROUTES } from "../../seo/site";

export default function BusinessWebsites() {
  return (
    <LandingTemplate
      route={ROUTES.businessWebsites}
      kicker="Business websites · Albania"
      h1="Business websites that build trust and win clients."
      intro="A professional website is the difference between looking like a hobby and looking like a serious business. TheWebPatcher builds affordable, responsive, SEO-friendly business websites for companies in Albania and Europe."
      lead="Your website is often the first thing a potential customer sees. In a few seconds they decide whether to trust you. A clean, fast, professional business website earns that trust — and gives people the prices, info, and contact details they need to choose you."
      serviceType="Business Website Design"
      points={[
        { title: "Look serious & credible", body: "A polished website signals that you're an established, trustworthy business — not just a social media account." },
        { title: "Everything customers need", body: "Services, prices, hours, location, and contact — all clear and instant, so visitors never leave to find answers elsewhere." },
        { title: "Responsive on every device", body: "Perfect on phones, tablets, and desktops, so you make a strong impression wherever customers find you." },
        { title: "SEO-friendly", body: "Built to be found on Google for local searches, with the structure and speed search engines reward." },
      ]}
      faqs={[
        { q: "Do small businesses really need a website?", a: "Yes. Customers Google a business before contacting it — they want prices, hours, and proof you're real. A professional website builds trust that social media alone can't, and turns visitors into customers." },
        { q: "How much does a business website cost?", a: "A starter business website costs €150–€200 and a premium multi-page site €400–€500, with optional maintenance from €20/month." },
        { q: "How long does it take to build a business website?", a: "A starter site launches in 3–5 days; a premium Business Pro website takes 1–2 weeks." },
      ]}
      internalLinks={[
        { label: "View services & pricing", to: "/services" },
        { label: "E-commerce development", to: "/ecommerce-development" },
        { label: "See our portfolio", to: "/portfolio" },
      ]}
    />
  );
}
