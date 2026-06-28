# SEO Architecture — TheWebPatcher

This site is a **prerendered multi-page React app** (vite-react-ssg). Every route
ships as real static HTML — Google sees full content, meta, and JSON-LD without
running JavaScript.

## ⚠️ One thing to do before launch

Set your real domain in **one place**: [`src/seo/site.js`](src/seo/site.js) →
`SITE_URL`. It currently reads `https://thewebpatcher.com`. Every canonical,
the sitemap, robots.txt, OG tags, and all JSON-LD derive from it. Change that
line, rebuild, done.

## Pages & target keywords

| Route | Primary keyword |
|---|---|
| `/` | web design albania |
| `/services` | website development services |
| `/portfolio` | web design portfolio albania |
| `/about` | web developer albania |
| `/contact` | website services albania |
| `/web-design-albania` | web design albania |
| `/ecommerce-development` | ecommerce website albania |
| `/business-websites` | website design for business |

All 8 are in the sitemap, linked from the footer (no orphans), and have unique
titles, descriptions, canonicals, and an `<h1>`.

## What's implemented

- **Per-page meta** via [`src/seo/Seo.jsx`](src/seo/Seo.jsx): title, description,
  canonical, robots, full Open Graph + Twitter cards, geo meta (Albania/Tirana).
- **JSON-LD** ([`src/seo/schema.js`](src/seo/schema.js)): Organization, WebSite,
  ProfessionalService (LocalBusiness w/ geo + offers + areaServed), Service,
  FAQPage, BreadcrumbList. All validated (8/8 blocks parse clean).
- **sitemap.xml + robots.txt** generated at build by
  [`scripts/sitemap.mjs`](scripts/sitemap.mjs) from the SEO config.
- **OG image** at `public/og/og-default.png` (1200×630).
- **Local SEO**: NAP-style address, GeoCoordinates (Tirana), `areaServed`
  (Tirana, Durrës, Vlorë, Shkodër, Albania, Europe), geo meta tags.
- **Analytics-ready** ([`src/components/Analytics.jsx`](src/components/Analytics.jsx)):
  GA4 / GTM / Meta Pixel load only when env vars are set, deferred to idle so
  they don't hurt Core Web Vitals. Configure in `.env` (see `.env.example`).
- **Core Web Vitals**: prerendered HTML (instant content), route-level code
  splitting, self-hosted + preloaded fonts, LCP hero image preloaded,
  lazy-loaded below-fold images with reserved aspect ratios (no CLS),
  long-cache headers via `vercel.json`.

## Deploy (Vercel)

1. Set `SITE_URL` in `src/seo/site.js` to your real domain.
2. Push to a Git repo connected to Vercel (build command `npm run build`,
   output `dist`). `vercel.json` handles clean URLs + caching + security headers.
3. After deploy: verify the domain in **Google Search Console**, submit
   `https://yourdomain/sitemap.xml`, and run the **Rich Results Test** on the
   homepage to confirm the schema.
4. Create/claim a **Google Business Profile** for Albania and link your site —
   biggest single lever for local "web design albania" / "near me" searches.

## Advanced layer (beyond standard SEO)

- **CTR-tuned titles & descriptions** — every page leads with its keyword and
  packs a trigger: price (`from €150`), speed (`live in days`), place
  (`Albania`), and a CTA. Edit in `src/seo/site.js`.
- **Per-page OG images** — 9 tailored 1200×630 cards in `public/og/`, generated
  by `node scripts/og-images.mjs`. Each page references its own; better social +
  SERP CTR than one generic image.
- **Entity graph** — every page emits a `WebPage` node wired via `@id` to the
  `WebSite`, the `ProfessionalService` (LocalBusiness), and its `BreadcrumbList`.
  The Organization carries `slogan`, `knowsAbout`, `knowsLanguage`, a `logo`
  ImageObject, and a `ContactPoint` (Instagram + Albanian/English). This tells
  Google all nodes describe one entity — a signal most sites omit.
- **Honest local SEO** — geo meta + `areaServed` (Tirana, Durrës, Vlorë,
  Shkodër, Albania, Europe) + GeoCoordinates, with **no invented street address
  or phone** (Instagram-only for now). Add a phone / Google Business Profile URL
  in `src/seo/site.js` (`sameAs`, `contactPoint`) when you have them — that's the
  single biggest remaining local lever.
- **hreflang** — `en` + `x-default` self-referencing, plus `og:locale` `en_US`
  with `sq_AL` alternate, so Albania + Europe are covered without duplicate-page
  ambiguity.
- **Internal hub→spoke linking** — the homepage and footer link to the three
  keyword landing pages with descriptive, keyword-rich anchor text (not "click
  here"). No orphan pages.
- **Crawl/CWV hints** — `preconnect` to font hosts, `dns-prefetch` to Instagram,
  critical font + LCP image `preload`, decorative images use empty `alt`,
  meaningful images use descriptive `alt`, `site.webmanifest` for mobile.

### To regenerate OG images
`node scripts/og-images.mjs` (edit copy in that file first).

## Manual checks worth doing post-launch

- PageSpeed Insights on `/` and `/web-design-albania` (target 95+).
- Rich Results Test → expect Organization, LocalBusiness, FAQ, Breadcrumb.
- Search Console coverage → all 8 URLs indexed, no errors.
