import FAQSection from "@/components/FAQSection/FAQSection";
import Banner from "@/components/ui/Banner";
import CTAButtons from "@/components/ui/CTAButtons";
import getFaqs from "@/lib/getFaqs";

export const metadata = {
  title: "সাধারণ জিজ্ঞাসা | আল-ওয়াকিয়া হজ কাফেলা",
  description:
    "আল-ওয়াকিয়া হজ কাফেলা-র হজ ও ওমরাহ সংক্রান্ত প্রায়শই জিজ্ঞাসিত প্রশ্ন ও উত্তর দেখুন।",
};

export default async function Page() {
  const faqs = await getFaqs();

  return (
    <div className="bg-gray-50 ">
      <Banner
        imageUrl="/7.jpg"
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