import { Head } from "vite-react-ssg";
import { BUSINESS, abs } from "./site";

/**
 * Serialize JSON-LD safely. React escapes most things, but a literal
 * "</script>" inside a string value would still break out of the script
 * tag. Escaping `<`, `>`, and U+2028/U+2029 makes the payload inert even
 * if future content contains hostile characters. Defense in depth.
 */
function safeJsonLd(node) {
  // Escape HTML-significant + JS line-separator chars to their literal
  // backslash-u text form, so a value containing "</script>" cannot
  // break out of the <script> tag. JSON.parse still decodes these back,
  // so the structured data stays valid. Separators built by codepoint so
  // this source file contains no literal U+2028/U+2029.
  const LS = String.fromCharCode(0x2028);
  const PS = String.fromCharCode(0x2029);
  return JSON.stringify(node)
    .split("<").join("\u003c")
    .split(">").join("\u003e")
    .split(LS).join("\u2028")
    .split(PS).join("\u2029");
}

/**
 * Per-page <head>: title, description, canonical, robots, Open Graph,
 * Twitter, and any JSON-LD schema nodes. Prerendered into static HTML
 * by vite-react-ssg, so Google sees it without running JS.
 */
export default function Seo({
  title,
  description,
  path = "/",
  image = BUSINESS.ogImage,
  type = "website",
  schema, // array of JSON-LD objects already wrapped in a @graph, or a single object
  noindex = false,
}) {
  const canonical = abs(path);
  const ogImage = image?.startsWith("http") ? image : abs(image);
  const schemaArray = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Head>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* hreflang — site is in English; x-default + self-reference avoid
          "alternate page" ambiguity and signal the canonical for all regions. */}
      {!noindex && <link rel="alternate" hrefLang="en" href={canonical} />}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={BUSINESS.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="sq_AL" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Geo signals */}
      <meta name="geo.region" content={`AL-${BUSINESS.region}`} />
      <meta name="geo.placename" content={BUSINESS.locality} />
      <meta
        name="geo.position"
        content={`${BUSINESS.geo.lat};${BUSINESS.geo.lng}`}
      />
      <meta name="ICBM" content={`${BUSINESS.geo.lat}, ${BUSINESS.geo.lng}`} />

      {schemaArray.map((node, i) => (
        <script key={i} type="application/ld+json">
          {safeJsonLd(node)}
        </script>
      ))}
    </Head>
  );
}
