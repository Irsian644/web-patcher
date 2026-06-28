import LandingTemplate from "./LandingTemplate";
import { ROUTES } from "../../seo/site";

export default function WebDesignAlbania() {
  return (
    <LandingTemplate
      route={ROUTES.webDesignAlbania}
      kicker="Web design · Albania"
      h1="Web design in Albania that wins customers."
      intro="TheWebPatcher designs premium, fast, mobile-first websites for businesses across Albania — from Tirana to Durrës, Vlorë and Shkodër. Look trusted, rank on Google, and turn visitors into paying customers."
      lead="In Albania, customers Google a business before they ever message it. If they find a slow, outdated site — or no website at all — they move on to a competitor. Professional web design fixes that first impression and makes your business the obvious choice."
      serviceType="Web Design"
      points={[
        { title: "Built for Albanian businesses", body: "We design for local fashion brands, beauty studios, cafés, gyms, and service businesses — with the trust signals and contact flows your customers expect." },
        { title: "Fast & mobile-first", body: "Most of your visitors are on a phone. Every site is built to load instantly and look perfect on mobile, which also helps you rank higher on Google." },
        { title: "SEO-friendly from day one", body: "Clean code, proper structure, and local SEO so your business can be found for searches like ‘web design Albania’ and ‘web developer near me’." },
        { title: "Affordable & transparent", body: "Premium design without agency overhead. Starter websites from €150, with clear pricing and no surprises." },
      ]}
      faqs={[
        { q: "How much does web design cost in Albania?", a: "A starter business website starts at €150–€200, a premium site €400–€500, and a full e-commerce store €800–€1000. Optional maintenance starts from €20/month." },
        { q: "Do you work with businesses outside Tirana?", a: "Yes — across all of Albania (Durrës, Vlorë, Shkodër and beyond) and Europe. Everything is handled online." },
        { q: "Will my website be found on Google?", a: "Yes. Every site is built SEO-friendly with clean code, fast performance, and local signals so customers can find you in Albanian searches." },
      ]}
      internalLinks={[
        { label: "View services & pricing", to: "/services" },
        { label: "Business websites", to: "/business-websites" },
        { label: "See our portfolio", to: "/portfolio" },
      ]}
    />
  );
}
