import { Link } from "react-router-dom";
import Seo from "../seo/Seo";
import CTA from "../components/CTA";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found | TheWebPatcher"
        description="The page you're looking for doesn't exist. Explore TheWebPatcher's web design and development services in Albania."
        path="/404"
        noindex
      />
      <section className="wrap flex min-h-[70vh] flex-col items-start justify-center pt-28">
        <p className="label mb-6">Error 404</p>
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] font-semibold text-ink">
          This page took<br />
          <span className="text-ink-dim">a wrong turn.</span>
        </h1>
        <p className="mt-6 max-w-md text-[1.05rem] text-ink-dim">
          The page you're looking for doesn't exist — but your next great website does.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <CTA href="/">Back to home</CTA>
          <Link to="/services" className="text-[0.95rem] text-ink-dim hover:text-ink">
            View services
          </Link>
          <Link to="/portfolio" className="text-[0.95rem] text-ink-dim hover:text-ink">
            See our work
          </Link>
        </div>
      </section>
    </>
  );
}
