import Link from "next/link";
import Image from "next/image";
import Banner from "@/components/ui/Banner";
import blogPosts from "@/data/blogPosts";
import { notFound } from "next/navigation";
import {
  FaCalendarAlt,
  FaClock,
  FaUserAlt,
  FaTag,
  FaChevronRight,
  FaChevronDown,
  FaArrowRight,
  FaPhoneAlt,
  FaWhatsapp,
  FaHome,
  FaBookOpen,
  FaQuestionCircle,
} from "react-icons/fa";

const SITE_URL = "https://alwaqiah.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return { title: "ব্লগ পাওয়া যায়নি | আল-ওয়াকিয়া হজ কাফেলা" };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      siteName: "আল-ওয়াকিয়া হজ কাফেলা",
      images: [
        { url: post.image, width: 1200, height: 630, alt: post.title },
      ],
      locale: "bn_BD",
      type: "article",
      publishedTime: post.dateISO,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

// Static Generation 
export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

//  JSON-LD Structured Data 
function getStructuredData(post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const dateISO = new Date(post.dateISO).toISOString();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle,
    description: post.metaDescription,
    image: `${SITE_URL}${post.image}`,
    datePublished: dateISO,
    dateModified: dateISO,
    inLanguage: "bn-BD",
    author: { "@type": "Organization", name: post.author, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "আল-ওয়াকিয়া হজ কাফেলা",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/alwaqiah-logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.keywords.join(", "),
    articleSection: "হজ ও ওমরাহ গাইড",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "হোম", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "ব্লগ", item: `${SITE_URL}#blogs` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return [blogJsonLd, faqJsonLd, breadcrumbJsonLd];
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) return notFound();

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const jsonLdList = getStructuredData(post);

  return (
    <>
      {/* JSON-LD: BlogPosting + FAQPage + BreadcrumbList */}
      {jsonLdList.map((jsonLd, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}

      {/* হিরো ব্যানার */}
      <Banner
        imageUrl={post.image}
        title={post.title}
        subtitle={post.subtitle}
        heightClass="h-[50vh] lg:h-[70vh]"
      />

      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-600">
              <li>
                <Link href="/" className="flex items-center gap-1 hover:text-[#1F6F8B]">
                  <FaHome className="text-xs" /> হোম
                </Link>
              </li>
              <li><FaChevronRight className="text-[10px] text-gray-400" /></li>
              <li>
                <Link href="/#blogs" className="hover:text-[#1F6F8B]">ব্লগ</Link>
              </li>
              <li><FaChevronRight className="text-[10px] text-gray-400" /></li>
              <li aria-current="page" className="text-[#1F6F8B] font-medium">{post.title}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-[#1F6F8B]" /> প্রকাশ: {post.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock className="text-[#1F6F8B]" /> পড়তে {post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <FaUserAlt className="text-[#1F6F8B]" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <FaTag className="text-[#1F6F8B]" /> {post.tags.join(", ")}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#1F6F8B] leading-snug mb-8">
            {post.title}
          </h1>

          <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden shadow-md">
            <Image
              src={post.image}
              alt={`${post.title} — আল-ওয়াকিয়া হজ কাফেলা`}
              fill
              className="object-cover"
              priority
            />
          </div>
        
          <div
            className="text-lg text-gray-800 leading-relaxed border-l-4 border-[#1F6F8B] pl-4 mb-8 bg-white p-4 rounded-lg shadow-sm [&_a]:text-[#C70909] [&_a]:font-semibold [&_a]:hover:underline"
            dangerouslySetInnerHTML={{ __html: post.description }}
          />

          <article
            className={[
              "bg-white p-6 md:p-10 rounded-xl shadow-sm mb-10 text-gray-700 leading-relaxed text-[15px] md:text-base",
              "[&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-[#1F6F8B] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2:first-child]:mt-0",
              "[&_h3]:text-lg [&_h3]:md:text-xl [&_h3]:font-semibold [&_h3]:text-[#155E75] [&_h3]:mt-6 [&_h3]:mb-2",
              "[&_p]:mb-4 [&_strong]:text-gray-900",
              "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_li]:mb-1",
              "[&_a]:text-[#C70909] [&_a]:font-semibold [&_a]:hover:underline",
              "[&_blockquote]:border-l-4 [&_blockquote]:border-[#C70909] [&_blockquote]:bg-gray-50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-lg [&_blockquote]:italic [&_blockquote]:text-gray-800 [&_blockquote]:my-4",
              "[&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_table]:text-sm [&_table]:md:text-base",
              "[&_th]:bg-[#1F6F8B] [&_th]:text-white [&_th]:p-3 [&_th]:border [&_th]:border-gray-300 [&_th]:text-left [&_th]:align-top",
              "[&_td]:p-3 [&_td]:border [&_td]:border-gray-300 [&_td]:align-top [&_tr:nth-child(even)_td]:bg-gray-50",
            ].join(" ")}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="bg-gradient-to-r from-[#1F6F8B] to-[#155E75] rounded-xl p-6 md:p-10 text-white mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              আজই আপনার হজ-ওমরাহ সফরের পরিকল্পনা শুরু করুন
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl">
              আল-ওয়াকিয়া হজ কাফেলার অভিজ্ঞ আলেম ও টিম আপনার যাত্রার প্রতিটি ধাপে পাশে আছে।
              প্যাকেজ বাছাই, ভিসা প্রসেসিং কিংবা যেকোনো প্রশ্নে — এখনই যোগাযোগ করুন।
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 bg-white text-[#1F6F8B] font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition"
              >
                প্যাকেজসমূহ দেখুন <FaArrowRight className="text-sm" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-white/10 transition"
              >
                <FaPhoneAlt className="text-sm" /> যোগাযোগ করুন
              </Link>
              <a
                href="https://wa.me/8801841999922"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#20bd5a] transition"
              >
                <FaWhatsapp className="text-lg" /> হোয়াটসঅ্যাপ
              </a>
            </div>
          </div>

          {post.faqs && post.faqs.length > 0 && (
            <section aria-labelledby="faq-heading" className="mb-12">
              <h2
                id="faq-heading"
                className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-[#1F6F8B] mb-6"
              >
                <FaQuestionCircle /> সচর্চলিত প্রশ্নোত্তর (FAQ)
              </h2>
              <div className="space-y-3">
                {post.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group border border-gray-200 rounded-lg bg-white open:shadow-md"
                  >
                    <summary className="flex items-center justify-between cursor-pointer list-none p-4 font-semibold text-gray-800 hover:text-[#1F6F8B] transition">
                      {faq.q}
                      <FaChevronDown className="shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <p className="px-4 pb-4 pt-3 text-gray-700 leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {relatedPosts.length > 0 && (
            <section aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-[#1F6F8B] mb-6"
              >
                <FaBookOpen /> সম্পর্কিত লেখাসমূহ
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((rel) => (
                  <div
                    key={rel.slug}
                    className="group relative bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col sm:flex-row"
                  >
                    <div className="relative w-full sm:w-40 h-40 sm:h-auto shrink-0">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <h3 className="font-bold text-gray-800 group-hover:text-[#1F6F8B] transition">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 mb-2 flex items-center gap-1.5">
                        <FaCalendarAlt className="text-[#1F6F8B]" /> {rel.publishedAt}
                        <span>•</span> <FaClock className="text-[#1F6F8B]" /> {rel.readTime}
                      </p>
                      <span className="text-sm font-semibold text-[#C70909] group-hover:underline">
                        আরও পড়ুন →
                      </span>
                    </div>
                    <Link
                      href={`/blog/${rel.slug}`}
                      aria-label={rel.title}
                      className="after:absolute after:inset-0 after:content-['']"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
