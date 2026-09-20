"use client";

import Image from "next/image";
import Link from "next/link";
import blogPosts from "@/data/blogPosts";

const DESCRIPTION_LIMIT = 150;

function stripHtml(html) {
  return (html || "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text, limit) {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trimEnd()}…`;
}

const BlogSection = () => {
  return (
    <section id="blogs" className="py-12 bg-gray-50">
      <h2 className="text-xl md:text-4xl font-bold text-center text-[#00026E] mb-2">ব্লগ</h2>
      <p className="text-center text-red-700 font-semibold mb-10">হজ-ওমরাহ সংক্রান্ত জরুরি তথ্য ও গাইড</p>
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              className="group relative bg-white rounded-md overflow-hidden shadow hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-full h-64">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl text-gray-950 font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {truncate(stripHtml(post.description), DESCRIPTION_LIMIT)}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-3 text-sm font-semibold text-blue-950 group-hover:underline after:absolute after:inset-0 after:content-['']"
                >
                  আরও পড়ুন →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;