import Packages from "@/components/Packages/package";
import Banner from "@/components/ui/Banner";
import getPackages from "@/lib/getPackages";

export const metadata = {
  title: "প্যাকেজসমূহ | আল-ওয়াকিয়া হজ কাফেলা — হজ ও ওমরাহ প্যাকেজ",
  description: "আল-ওয়াকিয়া হজ কাফেলা-র হজ ও ওমরাহ প্যাকেজসমূহ দেখুন এবং আপনার পছন্দের প্যাকেজ বুক করুন।",
}


export default async function Page() {
  const packages = await getPackages();
  return (
    <div className="pt-0 bg-gray-50 ">
      <Banner
        imageUrl="/7.jpg"
        title="হজ ও ওমরাহ প্যাকেজসমূহ"
        subtitle=""
        heightClass=" h-[50vh] lg:h-[70vh]"
      />

      <Packages packages={packages} />
    
    </div>
  )
}