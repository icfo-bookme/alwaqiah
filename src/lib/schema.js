// Canonical site-wide constants shared by all JSON-LD schemas
export const SITE_URL = "https://alwaqiah.com";
export const SITE_NAME = "আল-ওয়াকিয়া হজ কাফেলা";
export const SITE_LOGO = `${SITE_URL}/alwaqiah-logo.png`;
export const ORG_PHONE = "+8801841999922";
export const ORG_EMAIL = "bookmebdltd@gmail.com";
export const ORG_FACEBOOK = "https://facebook.com/bookmeltd";
export const ORG_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "IFCO Complex (2nd floor), GEC Circle, CDA Avenue",
  addressLocality: "Chattogram",
  addressCountry: "BD",
};

// Shared Organization graph node (referenced via @id from page-specific schemas)
export const organizationNode = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: SITE_LOGO },
  telephone: ORG_PHONE,
  email: ORG_EMAIL,
  sameAs: [ORG_FACEBOOK],
  address: ORG_ADDRESS,
};

// WebSite node with SearchAction-ready structure (referenced via @id)
export const websiteNode = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "bn-BD",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// LocalBusiness / TravelAgency node — Google Business style entity
export const travelAgencyNode = {
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#travelagency`,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/7.jpg`,
  logo: { "@type": "ImageObject", url: SITE_LOGO },
  telephone: ORG_PHONE,
  email: ORG_EMAIL,
  sameAs: [ORG_FACEBOOK],
  address: ORG_ADDRESS,
  priceRange: "৳৳",
  areaServed: { "@type": "Country", name: "Bangladesh" },
};

// Build a JSON-LD graph: page node + shared @id-referenced entities
export function buildGraph(nodes) {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode, websiteNode, travelAgencyNode, ...nodes],
  };
}

// Breadcrumb helper — items: [{ name, path }] (path "" = homepage)
export function breadcrumbNode(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path || ""}`,
    })),
  };
}

// WebPage node bound to the current URL
export function webPageNode({ path, title, description }) {
  return {
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}`,
    url: `${SITE_URL}${path}`,
    title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#travelagency` },
    inLanguage: "bn-BD",
  };
}
