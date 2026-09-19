import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import Schedules from "@/components/Schedules/schedules";
import Banner from "@/components/ui/Banner";
import getFlights from "@/lib/getFlights";
import getSliders from "@/lib/getSliders";

export const metadata = {
  title: "ফ্লাইট সময়সূচী | আল-ওয়াকিয়া হজ কাফেলা",
  description: "আল-ওয়াকিয়া হজ কাফেলা-র হজ ও ওমরাহ ফ্লাইট সময়সূচী দেখুন।",
}


export default async function Page() {
  const flights = await getFlights();
   const sliders = await getSliders();

  return (
    <div className="bg-gray-50">
      <Banner
        imageUrl="/7.jpg"
        title="ফ্লাইট সময়সূচী"
        heightClass="h-[50vh] lg:h-[70vh]"
      />
      <Schedules flights={flights} />
      <ImageCarousel sliders={sliders} /> 
    </div>
  )
}