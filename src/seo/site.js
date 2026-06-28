// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for SEO.
// When the real domain is live, change ONLY `SITE_URL` below.
// Everything (canonicals, sitemap, robots, JSON-LD) derives from it.
// ─────────────────────────────────────────────────────────────

export const SITE_URL = "https://thewebpatcher.com"; // ← change when domain is set

export const BUSINESS = {
  name: "TheWebPatcher",
  legalName: "TheWebPatcher",
  description:
    "TheWebPatcher builds premium, fast, conversion-focused websites for businesses in Albania and across Europe — web design, website development, and e-commerce that turn visitors into customers.",
  // No public email — contact is Instagram-only (avoids spam harvesting of a
  // personal address). Add a dedicated business email here if you want one.
  instagram: "https://instagram.com/thewebpatcher",
  instagramHandle: "@thewebpatcher",
  dmUrl: "https://ig.me/m/thewebpatcher",
  // Geo / local SEO. Albania-wide; based in Tirana region.
  areaServed: ["Albania", "Tiranë", "Durrës", "Vlorë", "Shkodër", "Europe"],
  country: "AL",
  region: "Tiranë",
  locality: "Tirana",
  geo: { lat: 41.3275, lng: 19.8187 }, // Tirana
  priceRange: "€€",
  foundingYear: "2024",
  slogan: "Premium websites that turn visitors into customers.",
  // sameAs = entity-confirmation links. Instagram only for now; add a Google
  // Business Profile / LinkedIn URL here later for a stronger entity graph.
  sameAs: ["https://instagram.com/thewebpatcher"],
  // Languages the business operates in (helps Albania + Europe relevance).
  languages: ["sq", "en"],
  ogImage: "/og/og-default.png", // 1200×630 (see public/og)
};

// Absolute URL helper
export const abs = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

// ── Per-route SEO metadata ───────────────────────────────────
// keyword = the primary term the page targets.
export const ROUTES = {
  home: {
    path: "/",
    title:
      "Web Design Albania — Premium Websites from €150 | TheWebPatcher",
    description:
      "Premium web design & development in Albania. Fast, modern, SEO-friendly websites from €150, live in days. Turn visitors into customers — get a free idea today.",
    keyword: "web design albania",
    breadcrumb: "Home",
    ogImage: "/og/og-home.png",
    priority: "1.0",
  },
  services: {
    path: "/services",
    title: "Website Development Services & Pricing in Albania | TheWebPatcher",
    description:
      "Website development services in Albania from €150. Starter sites to full e-commerce — transparent pricing, live in days, built to convert. See plans & start free.",
    keyword: "website development services",
    breadcrumb: "Services",
    ogImage: "/og/og-services.png",
    priority: "0.9",
  },
  portfolio: {
    path: "/portfolio",
    title: "Web Design Portfolio — Real Albanian Business Sites | TheWebPatcher",
    description:
      "See real websites we built for businesses in Albania — fashion, beauty & local brands. Drag the before/after slider and see the difference a real website makes.",
    keyword: "web design portfolio albania",
    breadcrumb: "Portfolio",
    ogImage: "/og/og-portfolio.png",
    priority: "0.8",
  },
  about: {
    path: "/about",
    title: "About TheWebPatcher — Web Designer & Developer in Albania",
    description:
      "Meet TheWebPatcher: a web design & development studio helping Albanian businesses look trusted and win customers online. Fast delivery, premium quality, fair pricing.",
    keyword: "web developer albania",
    breadcrumb: "About",
    ogImage: "/og/og-about.png",
    priority: "0.6",
  },
  contact: {
    path: "/contact",
    title: "Contact TheWebPatcher — Get a Free Website Idea | Albania",
    description:
      "Get a free website concept for your business in 24 hours. Message TheWebPatcher on Instagram — premium web design & development across Albania and Europe.",
    keyword: "website services albania",
    breadcrumb: "Contact",
    ogImage: "/og/og-contact.png",
    priority: "0.7",
  },
  // ── Keyword landing pages ──
  webDesignAlbania: {
    path: "/web-design-albania",
    title: "Web Design Albania — Modern Websites from €150 | TheWebPatcher",
    description:
      "Professional web design in Albania. Fast, mobile-first websites from €150, live in days, that make your business look trusted and rank on Google. Get a free idea.",
    keyword: "web design albania",
    breadcrumb: "Web Design Albania",
    ogImage: "/og/og-web-design-albania.png",
    priority: "0.9",
  },
  ecommerceDevelopment: {
    path: "/ecommerce-development",
    title: "E-Commerce Website Development in Albania from €800 | TheWebPatcher",
    description:
      "Sell online with a premium e-commerce website in Albania from €800. Fast, secure stores with checkout & payments, built to convert. Start selling — get a free plan.",
    keyword: "ecommerce website albania",
    breadcrumb: "E-Commerce Development",
    ogImage: "/og/og-ecommerce-development.png",
    priority: "0.9",
  },
  businessWebsites: {
    path: "/business-websites",
    title: "Business Websites in Albania from €150 — Win Clients | TheWebPatcher",
    description:
      "Affordable business websites in Albania from €150. Responsive, SEO-friendly sites that build trust and bring customers — live in days. Get your free concept today.",
    keyword: "website design for business",
    breadcrumb: "Business Websites",
    ogImage: "/og/og-business-websites.png",
    priority: "0.9",
  },
};

export const ALL_ROUTES = Object.values(ROUTES);
