// Canonical site domain — same value used by layout metadataBase and blog pages
const SITE_URL = "https://alwaqiah.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
