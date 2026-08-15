// Single source of truth for copy & structured data.

export const BRAND = {
  name: "TheWebPatcher",
  handle: "@thewebpatcher",
  instagramUrl: "https://instagram.com/thewebpatcher",
  dmUrl: "https://ig.me/m/thewebpatcher",
  tagline: "Fast · Professional · Business-focused",
};

// Instagram DM link. Instagram doesn't reliably prefill text, so the intent is
// appended as a query hint the visitor can copy; the base link still opens the
// chat. Keeps context without depending on unsupported prefill behaviour.
export function dmLink(intent) {
  return intent
    ? `${BRAND.dmUrl}?ref=${encodeURIComponent(intent)}`
    : BRAND.dmUrl;
}

// Portfolio — real live sites first. `image` is a real screenshot (WebP).
export const PROJECTS = [
  {
    title: "Duo Magic Nails",
    sector: "Beauty / Studio",
    year: "2025",
    blurb:
      "A calm, booking-ready site for a nail studio — services, gallery, and a clear way to get in touch, all in one place.",
    url: "https://duo-nails.netlify.app/",
    domain: "duo-nails.netlify.app",
    image: "/work/duo-nails.webp",
    alt: "Duo Magic Nails website — a luxury nail studio homepage with an editorial serif hero and a soft champagne palette.",
    live: true,
    type: "beauty",
    accent: "#c9a36b",
  },
  {
    title: "Luvé",
    sector: "Fashion / E-commerce",
    year: "2025",
    blurb:
      "A bold, fast online store for a fashion brand — product browsing and a clear ordering path, moved off the Instagram feed.",
    url: "https://dhurata-luve.netlify.app/",
    domain: "dhurata-luve.netlify.app",
    image: "/work/dhurata-luve.webp",
    alt: "Luvé website — a playful pink fashion-accessories store with a product-led hero and DM-to-order flow.",
    live: true,
    type: "fashion",
    accent: "#ec4899",
  },
  {
    title: "Herzberger Brieftauben",
    sector: "Local Business",
    year: "2024",
    blurb:
      "A professional online home for a business established in 1988 — its history, its work, and how to reach it, presented clearly.",
    url: "https://t-herzberger.com/",
    domain: "t-herzberger.com",
    image: "/work/herzberger.webp",
    alt: "Herzberger Brieftauben website — a dark, premium homepage with a bold gold-on-black hero and a stats band.",
    live: true,
    type: "service",
    accent: "#f5a623",
  },
];

// Real client messages (translated from Albanian). Business name only.
export const TESTIMONIALS = [
  {
    quote: "I saw it and I loved it so much. So much talent.",
    original: "E pashë dhe më pëlqeu shumë. Shumë talent.",
    business: "Luvé",
    sector: "Fashion / E-commerce",
  },
  {
    quote: "Thank you so much — blessed hands, amazing work.",
    original: "Shumë faleminderit. Dhe të lumshin duart.",
    business: "Duo Magic Nails",
    sector: "Beauty Studio",
  },
];

// Services actually offered. Lifted out of pages/Services.jsx so the home
// page and the services page render the same source.
export const SERVICES = [
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

// Capability chips shown under the services intro.
export const SERVICE_TAGS = [
  "Business websites",
  "Web design",
  "Web development",
  "E-commerce",
  "Website redesign",
  "Responsive design",
  "Ongoing support",
];

export const PROCESS = [
  {
    n: "01",
    title: "The free idea",
    desc: "Tell us about your business. We send back a real concept of your website — no cost, no commitment.",
  },
  {
    n: "02",
    title: "The design",
    desc: "We design a premium, on-brand preview. You see and feel the result before a line of code is written.",
  },
  {
    n: "03",
    title: "The build",
    desc: "Fast, clean, responsive, and built for speed and clarity — usually ready in days, not months.",
  },
  {
    n: "04",
    title: "Launch & beyond",
    desc: "We launch and keep it sharp — optional monthly care so your site never falls behind.",
  },
];

// Pricing — kept as a tight, non-cookie-cutter band, not a 3-up card table.
// `cta` is a package-specific label; `intent` prefills the Instagram message.
// `scope`/`pages` describe what's included in plain language.
export const PLANS = [
  {
    name: "Starter",
    price: "€150–200",
    care: "€20/mo",
    timeline: "3–5 days",
    for: "A first professional website for your business.",
    pages: "1–3 pages",
    scope:
      "A clean one-page or small site with your services, photos, hours, and a clear way to contact you.",
    cta: "Choose Starter",
    intent:
      "Hi, I'm interested in the Starter website package for my business.",
  },
  {
    name: "Business Pro",
    price: "€400–500",
    care: "€40/mo",
    timeline: "1–2 weeks",
    for: "A fuller site for an established, growing business.",
    pages: "Multi-page",
    scope:
      "Several pages — services, gallery, about, contact — with a considered layout and room to grow.",
    cta: "Choose Business Pro",
    intent:
      "Hi, I'm interested in the Business Pro website package for my business.",
    featured: true,
  },
  {
    name: "E-Commerce",
    price: "€800–1000",
    care: "€60/mo",
    timeline: "2–4 weeks",
    for: "An online store to sell products directly.",
    pages: "Store + pages",
    scope:
      "A product catalogue and a checkout so customers can order online, plus the core pages around it.",
    cta: "Discuss E-Commerce",
    intent:
      "Hi, I'd like to discuss an E-Commerce website for my business.",
  },
];

// Optional monthly care — what it may cover. Only confirmed items are listed;
// add/remove here as the offering is finalised.
export const CARE_INCLUDES = [
  "Technical updates & security patches",
  "Small content or image changes",
  "Uptime monitoring",
  "Priority support over Instagram",
];
// Stated clearly so nothing is implied to be included when it isn't.
export const CARE_EXCLUDES =
  "Domain, hosting, and any third-party subscriptions are billed separately. Large redesigns or new features are quoted on request. Care plans are optional — you're never locked in.";

export const FAQS = [
  {
    q: "How much does a website cost in Albania?",
    a: "At TheWebPatcher, a starter business website costs €150–€200, a premium Business Pro site €400–€500, and a full e-commerce store €800–€1000. Pricing is transparent and depends on the number of pages and features. Optional monthly maintenance starts from €20/month.",
  },
  {
    q: "Do small businesses really need a website?",
    a: "Yes. Customers Google a business before contacting it — they want prices, hours, and proof you're real in seconds. A professional website builds trust that Instagram alone can't, and turns visitors into paying customers.",
  },
  {
    q: "How long does website development take?",
    a: "A starter website goes live in 3–5 days. A Business Pro site takes 1–2 weeks, and a full e-commerce store 2–4 weeks. We move fast without cutting corners.",
  },
  {
    q: "I already have Instagram. Why a website?",
    a: "Instagram rents you attention. A website is the thing you own — where customers check prices, learn about you, and decide to buy. Followers become customers on a website, not a feed.",
  },
  {
    q: "Can you redesign my current website?",
    a: "Yes. If your current site looks dated or doesn't convert, we rebuild it into something fast, modern, mobile-first, and worth trusting.",
  },
  {
    q: "Do you work with businesses across Albania?",
    a: "Yes — across Tirana, Durrës, Vlorë, Shkodër and all of Albania, plus Europe. Everything runs online, so location is never the obstacle.",
  },
];

// Primary nav now points at real routes (multi-page architecture).
export const NAV = [
  { label: "Services", to: "/services" },
  { label: "Work", to: "/portfolio" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
