import { FaKaaba, FaUserTie, FaUtensils, FaPlane, FaMoneyBillWave, FaHeadset } from "react-icons/fa";

const whyUsItems = [
  {
    icon: FaKaaba,
    title: "নিকটবর্তী হোটেল",
    text: "মসজিদুল হারাম ও মসজিদে নববীর নিকটে অবস্থিত আরামদায়ক হোটেল — সহজে ইবাদতে ফিরে আসার সুবিধা।",
  },
  {
    icon: FaUserTie,
    title: "অভিজ্ঞ মুয়াসসা ও গাইড",
    text: "প্রশিক্ষিত বাংলাভাষী মুয়াসসা ও গাইডের সম্পূর্ণ তত্ত্বাবধানে আপনার পুরো সফর।",
  },
  {
    icon: FaUtensils,
    title: "বাংলাদেশি রান্না",
    text: "স্বদেশি স্বাদের তাজা ও পরিচ্ছন্ন বাংলাদেশি খাবারের ব্যবস্থা সারাবছর।",
  },
  {
    icon: FaPlane,
    title: "ভিআইপি এয়ারপোর্ট সেবা",
    text: "জেদ্দা ও মদিনা বিমানবন্দরে দ্রুত ইমিগ্রেশন ও ভিআইপি রিসিভিং সেবা।",
  },
  {
    icon: FaMoneyBillWave,
    title: "সাশ্রয়ী ও স্বচ্ছ মূল্য",
    text: "কোনো লুকোচুরি নেই — যা বলা হয়, ঠিক তাই পাবেন। প্রতিটি খরচ আগেই জানিয়ে দেওয়া হয়।",
  },
  {
    icon: FaHeadset,
    title: "২৪/৭ সহায়তা",
    text: "যাত্রা চলাকালে যেকোনো সময় আমাদের সাপোর্ট টিমের সাথে সরাসরি যোগাযোগ করুন।",
  },
];

const AboutWhyUs = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container w-[90%] lg:w-[86%] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-red-600 font-semibold tracking-wide mb-2">আমাদের বৈশিষ্ট্য</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00026E] leading-snug">
            কেন <span className="text-[#0678B4]">আল-ওয়াকিয়া</span> বেছে নেবেন?
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            হাজারো যাত্রীর আস্থার পেছনে আছে আমাদের নিরলস সেবা ও পেশাদারিত্ব।
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUsItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 lg:p-8 hover:bg-white hover:shadow-xl border border-gray-100 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-blue-50 text-[#0678B4] flex items-center justify-center mb-5 group-hover:bg-gradient-to-r group-hover:from-[#313881] group-hover:to-[#0678B4] group-hover:text-white transition-colors duration-300">
                <item.icon className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-[#00026E] mb-3">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutWhyUs;