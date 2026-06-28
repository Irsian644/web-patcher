// Generates dist/sitemap.xml and dist/robots.txt from the SEO config.
// Runs after the SSG build (see package.json "build").
import { writeFileSync } from "node:fs";
import { ALL_ROUTES, SITE_URL } from "../src/seo/site.js";

const today = new Date().toISOString().split("T")[0];

const urls = ALL_ROUTES.map(
  (r) => `  <url>
    <loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = `# robots.txt — TheWebPatcher
User-agent: *
Allow: /

# Block crawl of build/asset internals (not needed in index)
Disallow: /assets/

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync("dist/sitemap.xml", sitemap);
writeFileSync("dist/robots.txt", robots);

console.log(`✓ sitemap.xml (${ALL_ROUTES.length} URLs) + robots.txt written to dist/`);
