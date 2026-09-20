import React from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQSection = ({ faqs = [], emptyMessage }) => {
  const sortedFaqs = [...faqs].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
  );

  if (sortedFaqs.length === 0 && !emptyMessage) return null;

  return (
    <section className="text-gray-800 bg-white">
      <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
        <p className="p-2 text-sm font-medium tracking-wider text-center text-red-600 uppercase">
          সাধারণ জিজ্ঞাসা
        </p>
        <h2 className="mb-12 text-xl font-bold leading-none text-center text-blue-950 sm:text-3xl">
          আল-ওয়াকিয়া হজ কাফেলা &ndash; প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
        </h2>
<div className="mt-3 w-24 h-1 rounded-full mx-auto bg-gradient-to-r from-[#313881] to-[#0678B4]"></div>
        <div className="flex flex-col gap-3 sm:px-8 lg:px-12 xl:px-32">
          {sortedFaqs.length === 0 && (
            <p className="py-8 text-center text-gray-500">{emptyMessage}</p>
          )}
          {sortedFaqs.map((faq) => (
            <details
              key={faq.id}
              className="faq-item rounded-xl border border-gray-200 bg-gray-50/60 transition-colors hover:border-blue-200"
            >
              <summary className="flex items-center justify-between gap-4 px-5 py-4 rounded-xl outline-none cursor-pointer hover:bg-blue-50/50 focus-visible:ring-2 focus-visible:ring-blue-300">
                <span className="font-semibold text-blue-950">{faq.question}</span>
                <FaChevronDown
                  className="faq-icon flex-shrink-0 text-sm text-gray-500"
                  aria-hidden="true"
                />
              </summary>
              <div className="px-5 pb-5 leading-relaxed text-gray-700">
                <p className="whitespace-pre-line">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;