import ContactForm from "@/components/ContactForm/ContactForm";
import Banner from "@/components/ui/Banner";
import Link from "next/link";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaKaaba } from "react-icons/fa";
import { buildGraph, webPageNode, breadcrumbNode, travelAgencyNode, ORG_PHONE, ORG_EMAIL } from "@/lib/schema";

export const metadata = {
  title: "যোগাযোগ | আল-ওয়াকিয়া হজ কাফেলা",
  description: "আল-ওয়াকিয়া হজ কাফেলার সাথে যোগাযোগ করুন — হজ ও ওমরাহ প্যাকেজ সংক্রান্ত প্রশ্ন, বুকিং ও যেকোনো সহায়তায় আমাদের অফিস, ফোন ও ইমেইলে যুক্ত হোন।",
};

// JSON-LD: ContactPage — reuses the shared TravelAgency node with contactPoint
const contactJsonLd = buildGraph([
  webPageNode({
    path: "/contact",
    title: "যোগাযোগ | আল-ওয়াকিয়া হজ কাফেলা",
    description: "আল-ওয়াকিয়া হজ কাফেলার সাথে যোগাযোগ করুন — প্রশ্ন, বুকিং ও যেকোনো সহায়তায় আমাদের অফিস, ফোন ও ইমেইলে যুক্ত হোন।",
  }),
  { "@type": "ContactPage" },
  {
    "@type": "TravelAgency",
    "@id": `${travelAgencyNode["@id"]}#contact`,
    name: "আল-ওয়াকিয়া হজ কাফেলা",
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: ORG_PHONE,
      email: ORG_EMAIL,
      contactType: "customer service",
      areaServed: "BD",
      availableLanguage: ["Bengali", "Arabic", "English"],
    },
  },
  breadcrumbNode([
    { name: "হোম", path: "" },
    { name: "যোগাযোগ", path: "/contact" },
  ]),
]);

export default function ContactUs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Banner
        imageUrl="/hero.png"
        title="যোগাযোগ"
        subtitle=""
        heightClass=" h-[50vh] lg:h-[70vh]"
      />
      <section className="bg-white min-h-screen py-10 ">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            যোগাযোগ
          </h1>
          <p className="text-center px-6 text-gray-500 mb-10">
            আল-ওয়াকিয়া হজ কাফেলার সাথে যোগাযোগ করুন — প্রশ্ন, বুকিং ও যেকোনো সহায়তায় আমরা আপনার পাশে আছি।
          </p>

          <div className="grid md:grid-cols-2 gap-10 bg-gray-50 py-8 rounded-lg shadow-md">
            {/* Address */}
            <div className="space-y-6 px-8">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">অফিস ঠিকানা</h3>
                  <p className="text-gray-600">
                    IFCO Complex (2nd floor), GEC Circle, <br />
                    CDA Avenue, Chattogram
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <FaPhoneAlt className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">ফোন</h3>
                  <p className="text-gray-600">
                    01841999922 <br />

                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">ইমেইল</h3>
                  <p className="text-gray-600">bookmebdltd@gmail.com</p>
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-start gap-4">
                <FaFacebookF className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">ফেসবুকে আমাদের ফলো করুন</h3>
                  <Link
                    href="https://facebook.com/bookmeltd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    www.facebook.com/bookmeltd
                  </Link>
                </div>
              </div>
              <div className="md:pt-20">
                <hr className="border-gray-300 mb-4" />
                <h3 className="text-2xl text-blue-950 font-bold mb-4 flex items-center">
                  <FaKaaba className="mr-2 text-yellow-500 -mt-2" />
                  আল-ওয়াকিয়া হজ কাফেলা
                </h3>
                <p className="text-gray-700 mb-4 max-w-md">
                  অভিজ্ঞ আলেম ও মুয়াল্লিমের সরাসরি তত্ত্বাবধানে সুন্নাহ অনুযায়ী বিশ্বস্ত হজ ও ওমরাহ প্যাকেজ, ভিসা, এয়ার টিকিট ও আবাসন সেবা।
                </p>
              </div>
            </div>

            {/* Optional: Contact Form */}
            <div className="px-3">
              <ContactForm title="show" />
            </div>
          </div>
        </div>
      </section></>
  );
}