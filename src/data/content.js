// Single source of truth for copy & structured data.

export const BRAND = {
  name: "TheWebPatcher",
  handle: "@thewebpatcher",
  instagramUrl: "https://instagram.com/thewebpatcher",
  dmUrl: "https://ig.me/m/thewebpatcher",
  tagline: "Fast · Premium · Conversion-focused",
};

// Portfolio — real live sites first. `image` is a real screenshot (WebP).
export const PROJECTS = [
  {
    title: "Duo Magic Nails",
    sector: "Beauty / Studio",
    year: "2025",
    blurb:
      "An elegant, booking-ready presence for a premium nail studio. Calm, confident, conversion-first.",
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
      "A storefront that sells. Bold, fast, and built to turn browsers into buyers.",
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
      "A trustworthy, established presence for a business that's been around since 1988 — and looks it.",
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
    desc: "Fast, clean, responsive, and engineered for speed and conversions. Built in days, not months.",
  },
  {
    n: "04",
    title: "Launch & beyond",
    desc: "We launch and keep it sharp — optional monthly care so your site never falls behind.",
  },
];

// Pricing — kept as a tight, non-cookie-cutter band, not a 3-up card table.
export const PLANS = [
  {
    name: "Starter",
    price: "€150–200",
    care: "€20/mo",
    timeline: "3–5 days",
    for: "Getting online, properly, for the first time.",
  },
  {
    name: "Business Pro",
    price: "€400–500",
    care: "€40/mo",
    timeline: "1–2 weeks",
    for: "Converting visitors into booked, paying customers.",
    featured: true,
  },
  {
    name: "E-Commerce",
    price: "€800–1000",
    care: "€60/mo",
    timeline: "2–4 weeks",
    for: "Selling products online, end to end.",
  },
];

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
