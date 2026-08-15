import Seo from "../seo/Seo";
import { ROUTES, BUSINESS } from "../seo/site";
import {
  pageGraph,
  organizationSchema,
  personSchema,
  breadcrumbSchema,
} from "../seo/schema";
import Breadcrumbs from "../components/Breadcrumbs";
import PageHeader from "../components/PageHeader";
import Trust from "../components/sections/Trust";
import CTABand from "../components/CTABand";

const r = ROUTES.about;
const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: r.path },
];

// What the studio stands for — framed as principles, not promises.
const PRINCIPLES = [
  {
    title: "Direct",
    body: "You talk to the person actually designing and building your site — no account managers, no hand-offs, no telephone game.",
  },
  {
    title: "Fast",
    body: "Most projects launch in days or weeks, not months. Clear scope, quick feedback, steady progress you can see.",
  },
  {
    title: "Honest",
    body: "Plain pricing, realistic timelines, and no promises about rankings or sales I can't control. What I can control is a fast, clear, professional site.",
  },
];

const EXPECT = [
  "A short conversation about your business and what the site needs to do.",
  "A free concept so you can see the direction before committing.",
  "A fast, mobile-first build with the pages and content agreed up front.",
  "A clean handover — plus optional monthly care if you want ongoing help.",
];

export default function About() {
  const schema = pageGraph({
    route: r,
    hasBreadcrumb: true,
    nodes: [breadcrumbSchema(trail), organizationSchema(), personSchema()],
  });

  return (
    <>
      <Seo title={r.title} description={r.description} path={r.path} image={r.ogImage} schema={schema} />
      <Breadcrumbs trail={trail} />
      <PageHeader
        kicker="About"
        title="Websites for businesses that have outgrown Instagram."
        intro="TheWebPatcher is run by one person, working directly with each client to design and build a website their business deserves — clear, fast, and easy for customers to use."
      />

      {/* Founder */}
      <section className="wrap pb-[clamp(3rem,7vw,5rem)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="text-[1.1rem] leading-relaxed text-ink-dim">
              I'm{" "}
              <span className="text-ink">{BUSINESS.founder.name}</span>, the
              designer and developer behind TheWebPatcher. I started it on a
              simple idea: plenty of good businesses rely on a social feed alone,
              then lose people who look them up and find nothing solid to trust.
            </p>
            <p className="mt-6 text-[1.1rem] leading-relaxed text-ink-dim">
              So I build the missing piece — a proper website that shows what you
              do, why you're credible, and how to reach you. Because it's just me,
              you work with the same person from the first message to launch.
              Based in Albania, working with businesses here and across Europe,
              entirely online.
            </p>

            <div className="mt-10">
              <h2 className="font-display text-lg font-medium text-ink">
                What to expect
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {EXPECT.map((item) => (
                  <li key={item} className="flex gap-3 text-[1rem] text-ink-dim">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-soft" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Founder card — works with or without a real portrait */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-card border border-line bg-surface p-6">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full bg-blue/15 font-display text-xl font-medium text-blue-soft"
                aria-hidden
              >
                {BUSINESS.founder.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <p className="mt-4 font-display text-lg font-medium text-ink">
                {BUSINESS.founder.name}
              </p>
              <p className="text-sm text-ink-dim">{BUSINESS.founder.role}</p>
              <dl className="mt-6 flex flex-col gap-4 border-t border-line pt-6 text-sm">
                <div>
                  <dt className="label mb-1">Based in</dt>
                  <dd className="text-ink-dim">Albania — working online</dd>
                </div>
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
              </dl>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="bg-surface p-7 sm:p-8">
              <h3 className="font-display text-lg font-medium text-ink">{p.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-dim">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Trust />
      <CTABand
        links={[
          { label: "See selected work", to: "/portfolio" },
          { label: "Services & pricing", to: "/services" },
        ]}
      />
    </>
  );
}
