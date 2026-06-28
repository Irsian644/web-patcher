# DESIGN — TheWebPatcher

## Strategy
Color strategy: **Restrained-dark** — near-black surface carries ~95%, electric blue is a surgical accent (≤5% of surface: one word in the hero, the slider handle, key CTA, hairline focus). No ambient gradient blobs. No glassmorphism as default. No gradient text.

## Palette (OKLCH)
- `--bg`        oklch(0.16 0.015 264)  → #050816 near-black, faint blue undertone
- `--bg-2`      oklch(0.20 0.02 264)   → #0B1120 deep navy surface
- `--ink`       oklch(0.97 0.005 264)  → soft white (not pure #fff)
- `--ink-dim`   oklch(0.70 0.01 264)   → muted text, still ≥4.5:1 on bg
- `--ink-faint` oklch(0.48 0.01 264)   → labels / captions
- `--line`      oklch(1 0 0 / 0.08)    → hairlines
- `--blue`      oklch(0.62 0.21 258)   → #2563EB electric accent (surgical)
- `--blue-soft` oklch(0.72 0.16 258)   → hover/active blue

## Typography
Contrast-axis pairing (display vs grotesque), both non-reflex:
- **Display:** Clash Display (Pangram Pangram) — wide high-contrast geometric, weights 600/700. Headlines only. letter-spacing -0.02 to -0.04em. clamp max ≤ 6rem.
- **Body/UI:** Geist (Vercel) — neutral modern grotesque. weights 400/500/600.
- Mono accents (numbers/labels): Geist Mono, used sparingly — NOT as "developer" costume.

Scale: fluid clamp, ratio ≥1.25. Light-on-dark → +0.06 line-height.

## Motion
- Lenis smooth scroll (premium inertia).
- Hero: orchestrated single page-load reveal (mask/clip wipe on headline lines, staggered).
- Scroll reveals: blur+translate, ease-out-expo, each fit to its content (not one uniform reflex).
- Portfolio: draggable before/after + subtle parallax on previews.
- All gated behind `prefers-reduced-motion`.

## Bans honored
No glass-default, no gradient text, no side-stripe borders, no hero-metric template, no identical card grids, no per-section uppercase eyebrows, no numbered-section scaffolding, no ambient blue blobs.

## Sections (4 heavy, not 8 average)
1. Hero — split, cinematic, oversized type + premium showcase mockup.
2. Trust — bold visual statement: judged before contact / no-site=low-trust vs premium=authority.
3. Portfolio — luxury case studies w/ interactive before/after slider (the centerpiece).
4. Process (minimal) → Final CTA (massive emotional statement). Lean FAQ folded in or dropped.
