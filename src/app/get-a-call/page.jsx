import ContactForm from "@/components/ContactForm/ContactForm";
import Banner from "@/components/ui/Banner";
 // Adjust path as needed

export const metadata = {
  title: "কল পান | আল-ওয়াকিয়া হজ কাফেলা",
  description: "আল-ওয়াকিয়া হজ কাফেলার টিম থেকে কল চাইুন — হজ ও ওমরাহ প্যাকেজ বুকিং, ফ্লাইট সময়সূচী ও যেকোনো প্রশ্নে বিশেষজ্ঞ পরামর্শ পান।",
}


export default function Page() {
  return (
    <div>
      <Banner
        imageUrl="/13.png"
        title="কল পান"
        subtitle=""
        heightClass=" h-[50vh] lg:h-[70vh]"
      />

      <section className="bg-white min-h-screen py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            কল পান
          </h1>
          <p className="text-center text-gray-500 mb-10">
            নিচের ফর্মটি পূরণ করুন — আমাদের টিম যত দ্রুত সম্ভব আপনার সাথে যোগাযোগ করবে।
          </p>

          {/* Contact Form Here */}
          <ContactForm title="not show" />
        </div>
      </section>
    </div>
  );
}
