// Generates per-page Open Graph images (1200×630) into public/og/.
// Run manually after changing OG copy:  node scripts/og-images.mjs
import sharp from "sharp";

const pages = [
  ["og-home", "Web design Albania", "from €150 · live in days"],
  ["og-services", "Website development", "services & pricing in Albania"],
  ["og-portfolio", "Real business websites", "built to convert"],
  ["og-about", "Web design & development", "for businesses in Albania"],
  ["og-contact", "Get a free", "website idea"],
  ["og-web-design-albania", "Web design in Albania", "that wins customers"],
  ["og-ecommerce-development", "E-commerce websites", "that sell · from €800"],
  ["og-business-websites", "Business websites", "that build trust · from €150"],
  ["og-default", "Premium web design", "& development · Albania"],
];

const esc = (s) => s.replace(/&/g, "&amp;");

const tpl = (l1, l2) => `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630' viewBox='0 0 1200 630'>
  <defs><radialGradient id='g' cx='28%' cy='-5%' r='95%'>
    <stop offset='0%' stop-color='#0e1d40'/><stop offset='55%' stop-color='#070b16'/><stop offset='100%' stop-color='#05070d'/>
  </radialGradient></defs>
  <rect width='1200' height='630' fill='url(#g)'/>
  <circle cx='230' cy='70' r='340' fill='#2563eb' opacity='0.13'/>
  <g transform='translate(80,76)'>
    <rect x='0' y='0' width='50' height='50' rx='13' fill='#0a0e1a' stroke='rgba(255,255,255,0.16)'/>
    <path d='M10 16 L15 34 L20 21 L25 34 L30 16' fill='none' stroke='#609afa' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/>
    <path d='M32 16 H38 a5 5 0 0 1 0 10 H32 V16 Z' fill='none' stroke='#609afa' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/>
    <text x='64' y='33' font-family='Arial' font-size='25' font-weight='700' fill='#f4f6fb'>TheWebPatcher</text>
  </g>
  <text x='80' y='312' font-family='Arial' font-size='82' font-weight='800' fill='#f4f6fb'>${esc(l1)}</text>
  <text x='80' y='400' font-family='Arial' font-size='52' font-weight='600' fill='#9bb8ff'>${esc(l2)}</text>
  <g transform='translate(80,486)'>
    <rect x='0' y='0' width='240' height='54' rx='27' fill='#2563eb'/>
    <text x='120' y='35' text-anchor='middle' font-family='Arial' font-size='22' font-weight='600' fill='#fff'>Get a free website idea</text>
    <text x='270' y='35' font-family='monospace' font-size='20' fill='#9aa6bd'>@thewebpatcher</text>
  </g>
</svg>`;

for (const [name, l1, l2] of pages) {
  const info = await sharp(Buffer.from(tpl(l1, l2)))
    .png({ quality: 90 })
    .toFile(`public/og/${name}.png`);
  console.log(`✓ ${name}.png (${(info.size / 1024) | 0}KB)`);
}
