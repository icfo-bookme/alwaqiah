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

export default async function Home() {

  const packages = await getPackages();
  const flights = await getFlights();
  const airlines = await getAirlines();
  const sliders = await getSliders();
  const youtubeVideos = await getYoutubeVideos();
  const faqs = await getFaqs();
  return (
    <main className="bg-gray-50">
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
