import { Link } from "react-router-dom";

/** Visible breadcrumb trail. Pair with BreadcrumbList JSON-LD in <Seo>. */
export default function Breadcrumbs({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className="wrap pt-28 sm:pt-32">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-faint">
        {trail.map((t, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={t.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink-dim">
                  {t.name}
                </span>
              ) : (
                <Link to={t.path} className="transition-colors hover:text-ink">
                  {t.name}
                </Link>
              )}
              {!last && <span className="text-ink-faint/50">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
