import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import Schedules from "@/components/Schedules/schedules";
import Banner from "@/components/ui/Banner";
import getFlights from "@/lib/getFlights";
import getSliders from "@/lib/getSliders";
import { buildGraph, webPageNode, breadcrumbNode } from "@/lib/schema";

export const metadata = {
  title: "ফ্লাইট সময়সূচী | আল-ওয়াকিয়া হজ কাফেলা",
  description: "আল-ওয়াকিয়া হজ কাফেলা-র হজ ও ওমরাহ ফ্লাইট সময়সূচী দেখুন।",
}

// JSON-LD: ItemList of flight schedules
function getInfoJsonLd(flights) {
  return buildGraph([
    webPageNode({
      path: "/info",
      title: "ফ্লাইট সময়সূচী | আল-ওয়াকিয়া হজ কাফেলা",
      description: "আল-ওয়াকিয়া হজ কাফেলা-র হজ ও ওমরাহ ফ্লাইট সময়সূচী দেখুন।",
    }),
    {
      "@type": "ItemList",
      name: "হজ ও ওমরাহ ফ্লাইট সময়সূচী",
      itemListElement: flights.map((flight, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: flight.airline?.name || flight.flight_number || `ফ্লাইট ${index + 1}`,
      })),
    },
    breadcrumbNode([
      { name: "হোম", path: "" },
      { name: "ফ্লাইট সময়সূচী", path: "/info" },
    ]),
  ]);
}

export default async function Page() {
  const flights = await getFlights();
   const sliders = await getSliders();
  const infoJsonLd = getInfoJsonLd(flights);

  return (
    <div className="bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(infoJsonLd) }}
      />
      <Banner
        imageUrl="/hero.png"
        title="ফ্লাইট সময়সূচী"
        heightClass="h-[50vh] lg:h-[70vh]"
      />
      <Schedules flights={flights} />
      <ImageCarousel sliders={sliders} /> 
    </div>
  )
}