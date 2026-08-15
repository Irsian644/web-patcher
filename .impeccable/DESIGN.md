# DESIGN — TheWebPatcher

Visual system: the **Portfolite** editorial template rebuilt for TheWebPatcher.
Reference: https://portfolite.framer.website/

This supersedes the earlier "restrained-dark, no-eyebrows" direction. The bans
listed at the bottom of the old version (no per-section eyebrows, no numbered
scaffolding, no card grids) were deliberately lifted — those are core moves of
the reference template and are now part of the system.

## Strategy
Near-black editorial surface, oversized light-weight display type, generous
radii, and dark raised cards. Electric blue stays a **surgical accent** (≤5% of
surface): the eyebrow dot, one hero word, focus rings, hover states, the active
nav marker. Color at scale comes from the real client screenshots, which are
shown in **full colour** — unlike the reference, which desaturates everything.
The work is the product; misrepresenting its colour would be dishonest.

## Palette (OKLCH)
- `--bg`        oklch(0.16 0.015 264) — near-black page
- `--surface`   oklch(0.19 0.014 264) — cards, pills, raised panels
- `--surface-2` oklch(0.235 0.016 264)
- `--ink`       oklch(0.97 0.005 264)
- `--ink-dim`   oklch(0.78 0.011 264) — body copy; ≥4.5:1 on `--surface`
- `--ink-faint` oklch(0.60 0.013 264)
- `--line`      oklch(1 0 0 / 0.08) · `--line-strong` oklch(1 0 0 / 0.16)
- `--blue`      oklch(0.62 0.21 258) · `--blue-soft` oklch(0.72 0.16 258)

Note: the reference runs body text at 65% white (~4.4:1). We use ~72% to clear
AA. Fidelity does not outrank contrast.

## Typography
- **Display:** Satoshi (Fontshare), **weight 400**, `line-height: 1`,
  `letter-spacing: -0.01em`. Self-hosted variable woff2. The light weight at
  large size is the single most recognisable trait of the reference — do not
  set headings bold.
- **Body/UI:** Geist, 400/500. **Mono:** Geist Mono, numerals and captions only.
- Fluid `clamp()` throughout. Hero tops out at 5.25rem.

## Radii
`--radius-btn: 14px` · `--radius-card: 28px` · `--radius-panel: 44px` · pills `999px` · tags `10px`

## Section formula (use `<SectionHead>`)
pill eyebrow → oversized light heading → muted subcopy → optional tag pills →
optional two buttons. Consistency here is what makes the site read as one
system; do not hand-roll section headers.

## Components
`ui/Eyebrow` · `ui/SectionHead` · `ui/Card` (icon → title → hairline → body) ·
`ui/TagPill` · `CTA` (dark fill, hairline border, soft hover glow — both
primary and secondary share it; emphasis comes from order, not fill).

## Motion
Lenis smooth scroll. Shared variants in `lib/motion.js`: `rise` (blur+translate),
`riseSoft`, `stagger`, `lineWipe` (hero/CTA mask wipe). Ease `[0.16, 1, 0.3, 1]`.
Everything gated behind `prefers-reduced-motion`.

## Still banned
Gradient text, glassmorphism as a default, side-stripe borders, invented
metrics, ambient blue blobs beyond the single hero/CTA wash.

## Homepage order
Hero → Work → Trust → Process → Services → Testimonials → Pricing → FAQ → FinalCTA
