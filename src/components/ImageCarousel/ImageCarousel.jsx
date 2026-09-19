"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FaChevronLeft, FaChevronRight, FaExpand, FaXmark } from "react-icons/fa6";
import CTAButtons from "../ui/CTAButtons";

const THUMB_BREAKPOINTS = {
  0: { slidesPerView: 3, spaceBetween: 8 },
  640: { slidesPerView: 4, spaceBetween: 10 },
  1024: { slidesPerView: 6, spaceBetween: 12 },
};

const getImageSrc = (image) =>
  image?.image_url ||
  (image?.image ? `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.image}` : "");

const ARROW_CLASS =
  "z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/85 text-[#313881] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-105";

const ImageCarousel = ({ sliders = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const mainSwiperRef = useRef(null);

  const images = [...sliders].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  const total = images.length;

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "ArrowLeft") mainSwiperRef.current?.slidePrev();
      if (event.key === "ArrowRight") mainSwiperRef.current?.slideNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen]);

  if (total === 0) return null;

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-[#313881] md:text-3xl">ফটো গ্যালারি</h2>
          <p className="mt-2 text-sm text-gray-600 md:text-base">
            আমাদের হজ ও ওমরাহ যাত্রার কিছু স্মরণীয় মুহূর্ত
          </p>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#313881] to-[#0678B4]"></div>
        </div>

        {/* Main Slider */}
        <div className="relative">
          <div className="relative h-[240px] overflow-hidden rounded-2xl bg-gray-900 shadow-xl sm:h-[340px] md:h-[440px] lg:h-[560px]">
            <Swiper
              modules={[Autoplay, Thumbs]}
              loop
              grabCursor
              keyboard={{ enabled: true }}
              thumbs={{ swiper: thumbsSwiper }}
              autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              className="h-full w-full"
              onSwiper={(swiper) => {
                mainSwiperRef.current = swiper;
                setActiveIndex(swiper.realIndex);
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {images.map((image, index) => (
                <SwiperSlide key={image.id ?? index} className="h-full">
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="relative block h-full w-full cursor-zoom-in"
                    aria-label="ছবিটি বড় করে দেখুন"
                  >
                    <Image
                      src={getImageSrc(image)}
                      alt={image.alt_text || `গ্যালারি ছবি ${index + 1}`}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 1200px"
                      className="object-cover"
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={() => mainSwiperRef.current?.slidePrev()}
              className={`absolute left-3 top-1/2 -translate-y-1/2 md:left-5 ${ARROW_CLASS}`}
              aria-label="আগের ছবি"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => mainSwiperRef.current?.slideNext()}
              className={`absolute right-3 top-1/2 -translate-y-1/2 md:right-5 ${ARROW_CLASS}`}
              aria-label="পরের ছবি"
            >
              <FaChevronRight />
            </button>

            {/* Counter & Expand */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              <span className="rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm md:text-sm">
                {activeIndex + 1} / {total}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75"
                aria-label="বড় করে দেখুন"
              >
                <FaExpand className="text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="mt-4">
          <Swiper
            modules={[FreeMode, Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={6}
            freeMode
            watchSlidesProgress
            breakpoints={THUMB_BREAKPOINTS}
            className="gallery-thumbs"
          >
            {images.map((image, index) => (
              <SwiperSlide key={`thumb-${image.id ?? index}`} className="cursor-pointer">
                <div className="gallery-thumb relative h-16 w-full overflow-hidden rounded-lg bg-gray-200 sm:h-20">
                  <Image
                    src={getImageSrc(image)}
                    alt={image.alt_text || `গ্যালারি থাম্বনেইল ${index + 1}`}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Call To Action */}
        <div className="mt-10 flex flex-row items-center justify-center gap-4">
          <CTAButtons className="flex flex-row items-center gap-4" />
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:right-6 md:top-6"
            aria-label="বন্ধ করুন"
          >
            <FaXmark />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              mainSwiperRef.current?.slidePrev();
            }}
            className={`absolute left-3 top-1/2 -translate-y-1/2 md:left-8 ${ARROW_CLASS}`}
            aria-label="আগের ছবি"
          >
            <FaChevronLeft />
          </button>

          <div
            className="relative h-[70vh] w-full max-w-6xl md:h-[82vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={getImageSrc(images[activeIndex])}
              alt={images[activeIndex]?.alt_text || `গ্যালারি ছবি ${activeIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              mainSwiperRef.current?.slideNext();
            }}
            className={`absolute right-3 top-1/2 -translate-y-1/2 md:right-8 ${ARROW_CLASS}`}
            aria-label="পরের ছবি"
          >
            <FaChevronRight />
          </button>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-sm text-white">
            {activeIndex + 1} / {total}
          </span>
        </div>
      )}
    </section>
  );
};

export default ImageCarousel;
