import Banner from "@/components/ui/Banner";
import AboutStory from "@/components/About/AboutStory";
import AboutMission from "@/components/About/AboutMission";
import AboutWhyUs from "@/components/About/AboutWhyUs";
import AboutCta from "@/components/About/AboutCta";
import { buildGraph, webPageNode, breadcrumbNode } from "@/lib/schema";

export const metadata = {
  title: "আল-ওয়াকিয়া সম্পর্কে | আল-ওয়াকিয়া হজ কাফেলা",
  description:
    "আল-ওয়াকিয়া হজ কাফেলা সম্পর্কে জানুন — আমাদের লক্ষ্য, মূল্যবোধ ও সেবার বিবরণ। হজ ও ওমরাহ যাত্রায় বিশ্বস্ত সঙ্গী।",
};

// JSON-LD: AboutPage
const aboutJsonLd = buildGraph([
  webPageNode({
    path: "/about",
    title: "আল-ওয়াকিয়া সম্পর্কে | আল-ওয়াকিয়া হজ কাফেলা",
    description: "আল-ওয়াকিয়া হজ কাফেলা সম্পর্কে জানুন — আমাদের লক্ষ্য, মূল্যবোধ ও সেবার বিবরণ।",
  }),
  { "@type": "AboutPage" },
  breadcrumbNode([
    { name: "হোম", path: "" },
    { name: "আল-ওয়াকিয়া সম্পর্কে", path: "/about" },
  ]),
]);

export default function Page() {
  return (
    <div className="bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Banner
        imageUrl="/hero.png"
        title="আল-ওয়াকিয়া সম্পর্কে"
        subtitle="বিশ্বাস ও সেবায় পবিত্র মক্কা-মদিনা যাত্রা"
        heightClass="h-[50vh] lg:h-[70vh]"
      />
      <AboutStory />
      <AboutMission />
      <AboutWhyUs />
      <AboutCta />
    </div>
  );
}