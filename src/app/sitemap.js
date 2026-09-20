import blogPosts from "@/data/blogPosts";

// Canonical site domain — same value used by layout metadataBase and blog pages
const SITE_URL = "https://alwaqiah.com";

export default function sitemap() {
  const now = new Date();

  // Static routes ("/payment" is a permanent redirect → must not be listed)
  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/packages", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/info", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faqs", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/get-a-call", priority: 0.6, changeFrequency: "monthly" },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // Blog articles (SSG) — lastModified from each post's publish date
  const blogRoutes = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.dateISO ? new Date(post.dateISO) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
