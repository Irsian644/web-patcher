import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { BRAND } from "../data/content";

function InstagramGlyph({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

const PAGES = [
  { label: "Services & Pricing", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const SERVICES = [
  { label: "Web Design Albania", to: "/web-design-albania" },
  { label: "E-Commerce Development", to: "/ecommerce-development" },
  { label: "Business Websites", to: "/business-websites" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="wrap py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link to="/" aria-label="TheWebPatcher home">
              <Logo />
            </Link>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-dim">
              Premium web design &amp; website development for businesses in
              Albania and across Europe. Fast, modern, built to convert.
            </p>
          </div>

          <nav aria-label="Pages" className="flex flex-col gap-4">
            <span className="label">Pages</span>
            {PAGES.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-[0.95rem] text-ink-dim transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Services" className="flex flex-col gap-4">
            <span className="label">Services</span>
            {SERVICES.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-[0.95rem] text-ink-dim transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <span className="label">Connect</span>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[0.95rem] text-ink-dim transition-colors hover:text-ink"
            >
              <InstagramGlyph />
              {BRAND.handle}
            </a>
            <a
              href={BRAND.dmUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[0.95rem] text-blue-soft transition-colors hover:text-ink"
            >
              Send a DM
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-line pt-8 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {BRAND.name} · Web design &amp; development in Albania</p>
          <p className="font-mono uppercase tracking-wider">{BRAND.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
