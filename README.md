# TheWebPatcher — Landing Page

A cinematic, handcrafted landing page for **TheWebPatcher**, an Instagram-based web agency. The site is the agency's primary proof of skill — built to make a business owner think *"these people are premium, they understand design, I trust them"* within seconds.

**Stack:** React + Vite + Tailwind CSS + Framer Motion + Lenis (smooth scroll).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production -> dist/
npm run preview  # http://localhost:4173
```

## Design system

- **Lane:** cinematic dark + oversized editorial typography. Near-black surface, dramatic whitespace, huge weight-contrast headlines. Electric blue (`#2563EB`) used *surgically* — never as ambient blobs.
- **Type:** Clash Display (headlines, via Fontshare) + Geist / Geist Mono (body & labels, self-hosted in `public/fonts/`). A deliberate contrast-axis pairing.
- **Color:** OKLCH tokens in [`src/index.css`](src/index.css) (`--bg`, `--ink`, `--blue`, …).
- **Motion:** Lenis inertial scroll, line-by-line mask wipes on headlines, blur+rise scroll reveals, parallax on showcases. All gated behind `prefers-reduced-motion`.

Full rationale: [`.impeccable/DESIGN.md`](.impeccable/DESIGN.md) and [`.impeccable/PRODUCT.md`](.impeccable/PRODUCT.md).

## Sections (4 heavy, not 8 average)

1. **Hero** — split layout, oversized headline, layered premium website showcase, orchestrated load.
2. **Trust** — editorial statement ("People judge your business before they ever message you") + a before/after trust meter. No cards.
3. **Work** — alternating full-width case studies. The first project has an **interactive before/after drag slider** (Instagram-only → real website) as the centerpiece.
4. **Testimonials** — real client messages (translated from Albanian, attributed by business name) as editorial pull-quotes.
5. **Process → Pricing → FAQ → Final CTA** — minimal numbered process, an editorial pricing band (not a 3-card table), a lean FAQ, and a massive emotional closing statement.

The Trust section now shows **real proof points** (3 live sites · launch in days · client since 1988 · built to convert) — the earlier invented 31%/94% figures were removed.

## Editing content

All copy & structured data live in [`src/data/content.js`](src/data/content.js). Live portfolio sites are in `PROJECTS`:

- Dhurata Luve — https://dhurata-luve.netlify.app/ (Fashion)
- Duo Nails — https://duo-nails.netlify.app/ (Beauty / Nails)
- T. Herzberger — https://t-herzberger.com/ (Local service)

Instagram: `BRAND.dmUrl` opens a direct DM, `BRAND.instagramUrl` the profile.

## Notes

- **Real screenshots, optimized.** The hero and portfolio use real screenshots of the live sites ([`ScreenFrame.jsx`](src/components/ScreenFrame.jsx) renders them in a browser frame). Source captures live in `webs/` (gitignored); the web-ready WebP versions in `public/work/` were generated with `sharp` (resized to 1600w, q82 — ~60–85KB each). The LCP hero image is preloaded in `index.html`.
- **Regenerating images:** drop new screenshots in `webs/<site>/`, then run a `sharp` resize→WebP into `public/work/` and update `PROJECTS[].image` in `src/data/content.js`.
- The before/after slider reveals the **real Duo Nails screenshot** under a dull Instagram phone. Pointer- and keyboard-accessible (arrow keys, `role="slider"`).
- Reusable components live in `src/components/` (`CTA`, `ScreenFrame`, `BeforeAfter`, `Logo`, `Navbar`, `Footer`); sections in `src/components/sections/`.
