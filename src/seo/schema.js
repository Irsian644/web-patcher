import { SITE_URL, BUSINESS, abs } from "./site";

// Stable @id anchors so nodes can reference each other (best practice).
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOCALBUSINESS_ID = `${SITE_URL}/#localbusiness`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    description: BUSINESS.description,
    slogan: BUSINESS.slogan,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: abs("/favicon.svg"),
      contentUrl: abs("/favicon.svg"),
      caption: BUSINESS.name,
    },
    image: { "@id": `${SITE_URL}/#logo` },
    foundingDate: BUSINESS.foundingYear,
    sameAs: BUSINESS.sameAs,
    areaServed: BUSINESS.areaServed,
    knowsLanguage: BUSINESS.languages,
    knowsAbout: [
      "Web Design",
      "Website Development",
      "E-commerce Development",
      "Responsive Web Design",
      "Search Engine Optimization",
      "Conversion Rate Optimization",
    ],
    // ContactPoint via Instagram (no email/phone exposed) — honest entity signal.
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: BUSINESS.instagram,
      availableLanguage: ["Albanian", "English"],
      areaServed: BUSINESS.country,
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS.name,
    description: BUSINESS.description,
    publisher: { "@id": ORG_ID },
    inLanguage: ["en", "sq"],
  };
}

// A WebPage node ties each page into the entity graph: part of the WebSite,
// about the Organization, with its breadcrumb. Most sites skip this — it's
// how Google understands the page belongs to one coherent entity.
export function webPageSchema({ url, name, description, breadcrumbId, primaryImage }) {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": LOCALBUSINESS_ID },
    inLanguage: "en",
    ...(primaryImage
      ? { primaryImageOfPage: { "@type": "ImageObject", url: primaryImage } }
      : {}),
    ...(breadcrumbId ? { breadcrumb: { "@id": breadcrumbId } } : {}),
  };
}

// LocalBusiness — the key node for "web design albania" / local geo ranking.
export function localBusinessSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": LOCALBUSINESS_ID,
    name: BUSINESS.name,
    image: abs(BUSINESS.ogImage),
    url: SITE_URL,
    description: BUSINESS.description,
    priceRange: BUSINESS.priceRange,
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    areaServed: BUSINESS.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    sameAs: BUSINESS.sameAs,
    knowsAbout: [
      "Web Design",
      "Website Development",
      "E-commerce Development",
      "Responsive Web Design",
      "SEO-friendly Websites",
      "Conversion Rate Optimization",
    ],
    makesOffer: serviceOffers(),
  };
}

function serviceOffers() {
  return [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Starter Business Website",
        description:
          "A fast, professional 1–3 page website for businesses going online.",
      },
      priceCurrency: "EUR",
      price: "150",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Business Pro Website",
        description:
          "A premium multi-page website with custom design and conversion features.",
      },
      priceCurrency: "EUR",
      price: "400",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "E-Commerce Website",
        description:
          "A full online store with catalog, checkout, and secure payments.",
      },
      priceCurrency: "EUR",
      price: "800",
    },
  ];
}

// A single Service node (for /services & landing pages).
export function serviceSchema({ name, description, serviceType, url }) {
  return {
    "@type": "Service",
    name,
    description,
    serviceType,
    url,
    provider: { "@id": LOCALBUSINESS_ID },
    areaServed: BUSINESS.areaServed.map((n) => ({
      "@type": "AdministrativeArea",
      name: n,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail) {
  const last = trail[trail.length - 1];
  return {
    "@type": "BreadcrumbList",
    "@id": `${abs(last.path)}#breadcrumb`,
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}

export const breadcrumbId = (path) => `${abs(path)}#breadcrumb`;

/**
 * Builds the standard page-level entity graph: a WebPage node wired to the
 * WebSite, the LocalBusiness, and (optionally) the page's breadcrumb. Compose
 * this with serviceSchema / faqSchema in each page.
 */
export function pageGraph({ route, nodes = [], hasBreadcrumb = false }) {
  const url = abs(route.path);
  const page = webPageSchema({
    url,
    name: route.title,
    description: route.description,
    breadcrumbId: hasBreadcrumb ? breadcrumbId(route.path) : undefined,
    primaryImage: route.ogImage ? abs(route.ogImage) : undefined,
  });
  return graph([page, ...nodes]);
}

// Wrap any set of nodes into one @graph document.
export function graph(nodes) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
