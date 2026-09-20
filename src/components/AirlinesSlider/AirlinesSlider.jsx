"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

const BREAKPOINTS = { 0: { slidesPerView: 3, spaceBetween: 12 }, 640: { slidesPerView: 4, spaceBetween: 16 }, 1024: { slidesPerView: 6, spaceBetween: 20 } };

const AirlinesSlider = ({ airlines = [] }) => {
  if (airlines.length === 0) return null;
  const slides = airlines.length >= 12 ? airlines : Array.from({ length: 12 }, (_, i) => airlines[i % airlines.length]);

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-[#313881] md:text-3xl">আমাদের ফ্লাইট পার্টনার</h2>
          <p className="mt-2 text-sm text-gray-600 md:text-base">নিরাপদ ও আরামদায়ক যাত্রার জন্য আমরা নিয়ে এসেছি বিশ্বস্ত এয়ারলাইনসমূহ</p>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#313881] to-[#0678B4]"></div>
        </div>
        <Swiper modules={[Autoplay]} loop grabCursor speed={700} autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }} breakpoints={BREAKPOINTS}>
          {slides.map((airline, index) => (
            <SwiperSlide key={`${airline.id}-${index}`}>
              <div className="group flex h-28 flex-col items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-lg">
                {airline.logo_url && (
                  <div className="relative h-10 w-full">
                    <Image src={airline.logo_url} alt={airline.name} fill sizes="180px" className="object-contain  transition-all duration-300 group-hover:grayscale-0" />
                  </div>
                )}
                <p className="text-center text-xs font-semibold text-gray-700">{airline.name}{airline.code ? ` (${airline.code})` : ""}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AirlinesSlider;