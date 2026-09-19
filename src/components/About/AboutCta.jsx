import CTAButtons from "../ui/CTAButtons";

const AboutCta = () => {
  return (
    <section
      className="py-16 lg:py-20"
      style={{ background: "linear-gradient(90deg, #313881, #0678B4)" }}
    >
      <div className="container w-[90%] lg:w-[86%] mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug mb-4">
          আপনার পবিত্র যাত্রা শুরু হোক <span className="text-[#71C3C7]">আল-ওয়াকিয়ার</span> সাথে
        </h2>
        <p className="text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
          হজ, ওমরাহ কিংবা জিয়ারত — যেকোনো প্যাকেজের বিস্তারিত জানতে আজই যোগাযোগ করুন। আমাদের টিম
          আপনাকে সবচেয়ে উপযুক্ত পরামর্শ দেবে।
        </p>
        <CTAButtons className="flex flex-row flex-wrap items-center justify-center gap-4" />
      </div>
    </section>
  );
};

export default AboutCta;