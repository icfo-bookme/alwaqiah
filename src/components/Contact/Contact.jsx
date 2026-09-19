"use client";

import Link from "next/link";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaKaaba } from "react-icons/fa";
import ContactForm from "../ContactForm/ContactForm";

export const Contact = () => {
  return (
    <section className="bg-white min-h-screen py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-950 mb-4">
          যোগাযোগ করুন
        </h1>
        <p className="text-center px-6 text-gray-700 mb-10">
          আল-ওয়াকিয়া হজ কাফেলার সাথে যোগাযোগ করুন – আপনার হজ ও ওমরাহ সংক্রান্ত যেকোনো জিজ্ঞাসা, বুকিং ও সহযোগিতার জন্য আমরা সর্বদাই প্রস্তুত।
        </p>

        <div className="grid md:grid-cols-2 gap-10 bg-gray-50 py-8 rounded-lg shadow-md">
          {/* Address & Contact Info */}
          <div className="space-y-6 px-8">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-blue-600 text-xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">অফিসের ঠিকানা</h3>
                <div className="text-gray-600 text-sm leading-relaxed space-y-1 mt-1">
                  <p>
                    <span className="font-semibold text-gray-800">ঢাকা:</span> সাউথ ব্রিজ সেন্টার, রোড নম্বর ১১, বনানী, ঢাকা।
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">চট্টগ্রাম:</span> ১১৪৭/এ (৪র্থ তলা), সিডিএ এভিনিউ, জিইসি মোড়, চট্টগ্রাম।
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">খুলনা:</span> সিটি ট্রেড সেন্টার, কেডিএ এভিনিউ, খুলনা।
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-blue-600 text-xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">ফোন / হটলাইন</h3>
                <p className="text-gray-600">
                  ০১৮৪১-৯৯৯৯২২ <br />
                  ০১৮৪১-৬৬৬৬৪৪
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-blue-600 text-xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">ইমেইল</h3>
                <p className="text-gray-600">bookmebdltd@gmail.com</p>
              </div>
            </div>

            {/* Facebook */}
            <div className="flex items-start gap-4">
              <FaFacebookF className="text-blue-600 text-xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">ফেসবুক পেজ</h3>
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

            {/* Brand Intro */}
            <div className="md:pt-12">
              <hr className="border-gray-300 mb-4" />
              <h3 className="text-2xl text-blue-950 font-bold mb-4 flex items-center">
                <FaKaaba className="mr-2 text-blue-600" />
                আল-ওয়াকিয়া হজ কাফেলা
              </h3>
              <p className="text-gray-700 mb-4 max-w-md leading-relaxed text-sm">
                সুন্নাহ সম্মত সঠিক দিকনির্দেশনা, উন্নত আবাসন, দেশীয় খাবার এবং সর্বোচ্চ নিরাপত্তার সাথে পবিত্র হজ ও ওমরাহ পালনে আপনার বিশ্বস্ত সঙ্গী।
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="px-3">
            <ContactForm title="show" />
          </div>
        </div>
      </div>
    </section>
  );
};