import Image from "next/image";
import { FaCheckCircle, FaUsers, FaCalendarAlt, FaHeadset, FaBuilding } from "react-icons/fa";

const checklistItems = [
  "লাইসেন্সপ্রাপ্ত ও নির্ভরযোগ্য প্রতিষ্ঠান",
  "মসজিদুল হারাম ও মসজিদে নববীর নিকটবর্তী হোটেল",
  "প্রশিক্ষিত মুয়াসসা ও বাংলাভাষী গাইড",
  "সম্পূর্ণ জিয়ারত সফর ও ২৪/৭ সহায়তা",
];

const stats = [
  { icon: FaUsers, value: "৫,০০০+", label: "সন্তুষ্ট যাত্রী" },
  { icon: FaCalendarAlt, value: "১০+", label: "বছরের অভিজ্ঞতা" },
  { icon: FaBuilding, value: "৩", label: "শাখা অফিস" },
  { icon: FaHeadset, value: "২৪/৭", label: "সেবা সহায়তা" },
];

const AboutStory = () => {
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container w-[90%] lg:w-[86%] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image Collage */}
        <div className="relative md:pb-12">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/jeddah.jpg"
              alt="জেদ্দা বিমানবন্দরে আল-ওয়াকিয়ার যাত্রীরা"
              width={800}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <div className="hidden md:block absolute -bottom-2 right-6 w-44 lg:w-60 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/7.jpg"
              alt="পবিত্র কাবা শরীফ"
              width={400}
              height={260}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Text Content */}
        <div>
          <p className="text-red-600 font-semibold tracking-wide mb-2">আল-ওয়াকিয়া পরিচিতি</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00026E] mb-5 leading-snug">
            বিশ্বাস ও সেবার প্রতিশ্রুতি —{" "}
            <span className="text-[#0678B4]">আল-ওয়াকিয়া হজ কাফেলা</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            আল-ওয়াকিয়া হজ কাফেলা বাংলাদেশের একটি বিশ্বস্ত হজ ও ওমরাহ সেবা প্রতিষ্ঠান। দীর্ঘদিনের
            অভিজ্ঞতা, প্রশিক্ষিত মুয়াসসা ও আন্তরিক টিমের মাধ্যমে আমরা হাজারো মুসল্লির পবিত্র
            মক্কা-মদিনা যাত্রাকে সহজ, নিরাপদ ও স্মরণীয় করে তুলছি।
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            আমাদের প্রতিটি প্যাকেজে থাকে নিকটবর্তী হোটেল, প্রশিক্ষিত গাইড, বাংলাদেশি রান্না এবং
            ২৪/৭ সহায়তা — যাতে আপনি শুধু ইবাদতে মনোনিবেশ করতে পারেন, বাকি সব দায়িত্ব আমাদের।
          </p>

          <ul className="space-y-3 mb-8">
            {checklistItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-xl p-4 text-center hover:shadow-md transition-shadow duration-200"
              >
                <stat.icon className="text-2xl text-[#0678B4] mx-auto mb-2" />
                <p className="text-xl font-bold text-[#00026E]">{stat.value}</p>
                <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;