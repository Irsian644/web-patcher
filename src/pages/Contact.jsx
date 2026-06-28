import Seo from "../seo/Seo";
import { ROUTES, BUSINESS } from "../seo/site";
import { pageGraph, localBusinessSchema, breadcrumbSchema } from "../seo/schema";
import Breadcrumbs from "../components/Breadcrumbs";
import PageHeader from "../components/PageHeader";
import CTA from "../components/CTA";
import { BRAND } from "../data/content";

const r = ROUTES.contact;
const trail = [
  { name: "Home", path: "/" },
  { name: "Contact", path: r.path },
];

export default function Contact() {
  const schema = pageGraph({
    route: r,
    hasBreadcrumb: true,
    nodes: [breadcrumbSchema(trail), localBusinessSchema()],
  });

  return (
    <>
      <Seo title={r.title} description={r.description} path={r.path} image={r.ogImage} schema={schema} />
      <Breadcrumbs trail={trail} />
      <PageHeader
        kicker="Contact"
        title="Get a free website idea for your business."
        intro="The fastest way to reach TheWebPatcher is Instagram. Send us a few words about your business and we'll reply with a free concept — usually within 24 hours."
      />

      <section className="wrap pb-[clamp(5rem,11vw,8rem)]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-2xl border border-line p-8 sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Message us on Instagram
            </h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink-dim">
              DM <span className="text-ink">{BUSINESS.instagramHandle}</span> — it's
              the quickest way to start. Tell us your business name and what you do.
            </p>
            <div className="mt-8">
              <CTA href={BRAND.dmUrl}>DM us on Instagram</CTA>
            </div>
          </div>

          <div className="rounded-2xl border border-line p-8 sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-ink">Details</h2>
            <dl className="mt-6 flex flex-col gap-5 text-[1rem]">
              <div>
                <dt className="label mb-1">Instagram</dt>
                <dd>
                  <a
                    href={BUSINESS.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink-dim transition-colors hover:text-ink"
                  >
                    {BUSINESS.instagramHandle}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label mb-1">Serving</dt>
                <dd className="text-ink-dim">
                  Tirana, Durrës, Vlorë, Shkodër &amp; all of Albania — plus Europe, online.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
