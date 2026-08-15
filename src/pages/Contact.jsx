import Seo from "../seo/Seo";
import { ROUTES, BUSINESS } from "../seo/site";
import { pageGraph, localBusinessSchema, breadcrumbSchema } from "../seo/schema";
import Breadcrumbs from "../components/Breadcrumbs";
import PageHeader from "../components/PageHeader";
import CTA from "../components/CTA";
import { dmLink, PLANS } from "../data/content";

const r = ROUTES.contact;
const trail = [
  { name: "Home", path: "/" },
  { name: "Contact", path: r.path },
];

// A short prompt list so the first message actually contains useful detail —
// this does the qualification a form would, without needing a backend.
const TELL_US = [
  "Your business name and what you do",
  "Whether you have a website or Instagram now",
  "The kind of site you're after (starter, business, or store)",
  "Roughly when you'd like to launch",
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
        title="Get a free website concept for your business."
        intro="Tell me a little about your business and I'll reply with a free concept — usually within 24 hours. Instagram is the quickest way to reach me for now."
      />

      <section className="wrap pb-[clamp(5rem,11vw,8rem)]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Start the conversation */}
          <div className="rounded-card border border-line p-8 sm:p-10">
            <h2 className="font-display text-2xl font-medium text-ink">
              Message me on Instagram
            </h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink-dim">
              DM <span className="text-ink">{BUSINESS.instagramHandle}</span> — the
              quickest way to start. To get a useful reply fast, include:
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {TELL_US.map((item) => (
                <li key={item} className="flex gap-3 text-[0.95rem] text-ink-dim">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-soft" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CTA href={dmLink("Hi, I'd like a free website concept for my business.")}>
                Message on Instagram
              </CTA>
            </div>
          </div>

          {/* Quick-start by package + details */}
          <div className="flex flex-col gap-8">
            <div className="rounded-card border border-line p-8 sm:p-10">
              <h2 className="font-display text-2xl font-medium text-ink">
                Know what you need?
              </h2>
              <p className="mt-3 text-[0.95rem] text-ink-dim">
                Start a message about a specific package:
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {PLANS.map((plan) => (
                  <li key={plan.name}>
                    <a
                      href={dmLink(plan.intent)}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-xl border border-line px-4 py-3 text-[0.95rem] text-ink-dim transition-colors hover:border-line-strong hover:text-ink"
                    >
                      <span>
                        <span className="text-ink">{plan.name}</span>
                        <span className="ml-2 font-mono text-xs text-ink-faint">
                          {plan.price}
                        </span>
                      </span>
                      <span aria-hidden className="text-ink-faint transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-line p-8 sm:p-10">
              <h2 className="font-display text-2xl font-medium text-ink">Details</h2>
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
                  <dt className="label mb-1">Based in</dt>
                  <dd className="text-ink-dim">
                    Albania — working with businesses across Albania and Europe, online.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
