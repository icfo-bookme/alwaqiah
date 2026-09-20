import BlogSection from "@/components/BlogSection/BlogSection";
import { Contact } from "@/components/Contact/Contact";
import HajjPromo from "@/components/HajjPromo/HajjPromo";
import FAQSection from "@/components/FAQSection/FAQSection";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import Packages from "@/components/Packages/package";
import AirlinesSlider from "@/components/AirlinesSlider/AirlinesSlider";
import Schedules from "@/components/Schedules/schedules";
import YouTubeSlider from "@/components/YouTubeSlider/YouTubeSlider";
import Banner from "@/components/ui/Banner";
import getPackages from "@/lib/getPackages";
import getSliders from "@/lib/getSliders";
import getFlights from "@/lib/getFlights";
import getAirlines from "@/lib/getAirlines";
import getFaqs from "@/lib/getFaqs";
import getYoutubeVideos from "@/lib/getYoutubeVideos";
import { buildGraph, webPageNode, breadcrumbNode, SITE_URL } from "@/lib/schema";

// JSON-LD: WebSite + WebPage + Breadcrumb + FAQPage (homepage)
function getHomeJsonLd(faqs) {
  return buildGraph([
    webPageNode({
      path: "/",
      title: "আল-ওয়াকিয়া হজ কাফেলা — বিশ্বস্ত হজ ও ওমরাহ এজেন্সি",
      description: "আল-ওয়াকিয়া হজ কাফেলার সাথে নিশ্চিন্তে হজ ও ওমরাহ পালন করুন। অভিজ্ঞ আলেম ও মুয়াল্লিমের তত্ত্বাবধানে মানসম্মত হজ-ওমরাহ প্যাকেজ, ভিসা, এয়ার টিকিট ও আবাসন সেবা।",
    }),
    breadcrumbNode([{ name: "হোম", path: "" }]),
    {
      "@type": "FAQPage",
      mainEntity: faqs.slice(0, 15).map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "OfferCatalog",
      name: "হজ ও ওমরাহ প্যাকেজসমূহ",
      url: `${SITE_URL}/packages`,
      provider: { "@id": `${SITE_URL}/#travelagency` },
    },
  ]);
}

export default async function Home() {

  const packages = await getPackages();
  const flights = await getFlights();
  const airlines = await getAirlines();
  const sliders = await getSliders();
  const youtubeVideos = await getYoutubeVideos();
  const faqs = await getFaqs();
  const homeJsonLd = getHomeJsonLd(faqs);
  return (
    <main className="bg-gray-50">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <div>
        <Banner
          imageUrl="/jeddah.jpg"        
          title="দারুণ সব সুযোগ-সুবিধা নিয়ে সেরা উমরাহ ও হজ প্যাকেজ" 
          subtitle="আপনার স্বপ্নের উমরাহ ও হজ যাত্রা শুরু করুন আমাদের সাথে"        
          heightClass=" h-[65vh] lg:h-[100vh]"
        />
        <YouTubeSlider videos={youtubeVideos} />
        <Packages packages={packages} />
        <AirlinesSlider airlines={airlines} />
        <Schedules flights={flights} />
        <HajjPromo />
        <ImageCarousel sliders={sliders} />      
        <FAQSection faqs={faqs} />
         <Contact/>  
        <BlogSection />
      </div>
    </main>
  );
}
