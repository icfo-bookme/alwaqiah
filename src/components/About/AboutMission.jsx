import { FaBullseye, FaEye, FaHeart, FaHandshake } from "react-icons/fa";

const missionCards = [
  {
    icon: FaBullseye,
    title: "আমাদের মিশন",
    text: "প্রতিটি হাজি ও ওমরাহ যাত্রীর জন্য সুন্দর, শান্তিপূর্ণ ও নির্বিঘ্ন ইবাদতের সুযোগ নিশ্চিত করা।",
  },
  {
    icon: FaEye,
    title: "আমাদের ভিশন",
    text: "বিশ্বাস ও সেবার মাধ্যমে দেশের সবচেয়ে নির্ভরযোগ্য হজ ও ওমরাহ কাফেলা হয়ে উঠা।",
  },
  {
    icon: FaHeart,
    title: "আমাদের মূল্যবোধ",
    text: "সততা, স্বচ্ছতা ও আন্তরিকতা — প্রতিটি যাত্রীর প্রতি পরিবারের মতো আচরণ করা।",
  },
  {
    icon: FaHandshake,
    title: "আমাদের অঙ্গীকার",
    text: "যাত্রার প্রথম দিন থেকে শেষ দিন পর্যন্ত প্রতিটি যাত্রীর পাশে থাকার প্রতিশ্রুতি।",
  },
];

const AboutMission = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container w-[90%] lg:w-[86%] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-red-600 font-semibold tracking-wide mb-2">লক্ষ্য ও আদর্শ</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00026E] leading-snug">
            যে লক্ষ্যে আমরা কাজ করি
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            প্রতিটি যাত্রীর পবিত্র সফর হোক শান্তি ও সাফল্যে পূর্ণ — এটাই আমাদের কাজের একমাত্র
            প্রেরণা।
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {missionCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#313881] to-[#0678B4] text-white flex items-center justify-center mb-5">
                <card.icon className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-[#00026E] mb-3">{card.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMission;