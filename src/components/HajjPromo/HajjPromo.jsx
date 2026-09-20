'use client';

import Image from 'next/image';
import kaabaImage from '../../../public/7.jpg';
import Link from 'next/link';

export default function HajjPromo() {
  return (
    <section className=" max-w-6xl mx-auto  text-gray-900 px-6 py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      {/* Text Section */}
      <div className="md:w-1/2 space-y-5">
        <h2 className="text-2xl md:text-4xl font-semibold leading-snug">
          আল-ওয়াকিয়া হজ কাফেলা: <br />
          <span className="text-red-700">বিশ্বস্ত হজ-ওমরাহ সেবা</span>
        </h2>

        {/* Stars */}
        <div className="text-yellow-500 text-xl space-x-1">
          {'★'.repeat(5)}
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed text-justify">
          আল-ওয়াকিয়া হজ কাফেলা বিশ্বস্ততা ও সুনামের সাথে দীর্ঘদিন ধরে পবিত্র হজ ও ওমরাহ পালনে হাজীদের সেবা দিয়ে আসছে। অভিজ্ঞ আলেম ও মুয়াল্লিমের সরাসরি তত্ত্বাবধানে সুন্নাহ অনুযায়ী সঠিক নিয়মে হজ ও ওমরাহের সমস্ত হুকুম-আহকাম পালনে আমরা বদ্ধপরিকর। আমাদের দক্ষ টিম প্রতিটি পদক্ষেপেই হাজীদের সঠিক দিকনির্দেশনা ও সার্বিক সহায়তা প্রদান করে, যেন আপনার আত্মিক এই সফর হয় সহজ, সুন্দর ও সমর্পিত।
          <br /><br />
          হাজীদের সর্বোচ্চ আরাম ও মানসিক শান্তি নিশ্চিত করতে আল-ওয়াকিয়া হজ কাফেলা নিয়ে এসেছে আধুনিক ও মানসম্মত সেবা। মক্কা ও মদিনায় হারাম শরীফের কাছে আবাসন, আরামদায়ক পরিবহন, স্বাস্থ্যসম্মত খাবার এবং দ্রুত ভিসা ও এয়ার টিকিট বুকিং সেবাসহ আমরা অফার করছি আকর্ষণীয় হজ ও ওমরাহ প্যাকেজ। আপনার পছন্দ ও বাজেট অনুযায়ী সেরা প্যাকেজটি বেছে নিতে এবং নিশ্চিন্তে ইবাদতে মনোনিবেশ করতে আজই আল-ওয়াকিয়া হজ কাফেলার সাথে যোগাযোগ করুন।
        </p>
        <Link href="/get-a-call">
          <button style={{
            background: 'linear-gradient(90deg, #313881, #0678B4)',
          }} className="bg-indigo-700 mt-3 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-800 transition duration-300">
            এখনই বুক করুন
          </button>
        </Link>
      </div>

      {/* Circular Image */}
      <div className="md:w-1/2 flex justify-center">
        <div className="w-72 h-72 md:w-96 md:h-96 rounded-full border-[15px] border-gray-400 overflow-hidden shadow-lg relative">
          <Image
            src={kaabaImage}
            alt="আল-ওয়াকিয়া হজ কাফেলা — পবিত্র কাবা শরীফ"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>
    </section>
  );
}