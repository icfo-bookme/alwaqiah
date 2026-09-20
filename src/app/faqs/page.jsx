import FAQSection from "@/components/FAQSection/FAQSection";
import Banner from "@/components/ui/Banner";
import CTAButtons from "@/components/ui/CTAButtons";
import getFaqs from "@/lib/getFaqs";
import { buildGraph, webPageNode, breadcrumbNode } from "@/lib/schema";

export const metadata = {
  title: "সাধারণ জিজ্ঞাসা | আল-ওয়াকিয়া হজ কাফেলা",
  description:
    "আল-ওয়াকিয়া হজ কাফেলা-র হজ ও ওমরাহ সংক্রান্ত প্রায়শই জিজ্ঞাসিত প্রশ্ন ও উত্তর দেখুন।",
};

// JSON-LD: FAQPage (rich results eligible)
function getFaqsJsonLd(faqs) {
  return buildGraph([
    webPageNode({
      path: "/faqs",
      title: "সাধারণ জিজ্ঞাসা | আল-ওয়াকিয়া হজ কাফেলা",
      description: "আল-ওয়াকিয়া হজ কাফেলা-র হজ ও ওমরাহ সংক্রান্ত প্রায়শই জিজ্ঞাসিত প্রশ্ন ও উত্তর দেখুন।",
    }),
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    breadcrumbNode([
      { name: "হোম", path: "" },
      { name: "সাধারণ জিজ্ঞাসা", path: "/faqs" },
    ]),
  ]);
}

export default async function Page() {
  const faqs = await getFaqs();
  const faqsJsonLd = getFaqsJsonLd(faqs);

  return (
    <div className="bg-gray-50 ">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqsJsonLd) }}
      />
      <Banner
        imageUrl="/hero.png"
        title="প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী"
        heightClass="h-[50vh] lg:h-[70vh]"
      />
      <FAQSection
        faqs={faqs}
        emptyMessage="এখনো কোনো প্রশ্ন ও উত্তর যোগ করা হয়নি।"
      />
      <div className="pb-10">
        <CTAButtons />
      </div>
    </div>
  );
}