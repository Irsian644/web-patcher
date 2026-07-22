import LandingTemplate from "./LandingTemplate";
import { ROUTES } from "../../seo/site";

export default function WebDesignAlbania() {
  return (
    <LandingTemplate
      route={ROUTES.webDesignAlbania}
      kicker="Web design · Albania"
      h1="Web design in Albania, built around your business."
      intro="TheWebPatcher designs fast, mobile-first websites for businesses across Albania — from Tirana to Durrës, Vlorë and Shkodër. The goal is simple: help people understand what you do, trust you, and know how to get in touch."
      lead="In Albania, most people check a business online before they ever message it. A slow, outdated site — or no site at all — makes that first impression harder. A clear, professional website gives visitors the information they need and an obvious next step."
      serviceType="Web Design"
      points={[
        { title: "Built for Albanian businesses", body: "We design for local fashion brands, beauty studios, cafés, gyms, and service businesses — with the information and contact options your customers look for first." },
        { title: "Fast & mobile-first", body: "Most of your visitors are on a phone. Every site is built to load quickly and look right on mobile — which search engines also reward." },
        { title: "Prepared for search", body: "Clean code and a proper structure, with local details in place, so your business is set up to be found for searches like ‘web design Albania’." },
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
