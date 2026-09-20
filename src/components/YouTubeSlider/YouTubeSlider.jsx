"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { FaPlay } from "react-icons/fa";

const defaultVideos = [
  { youtube_video_id: "OhsVEqFxC4E", title: "The Hajj Documentary" },
  {
    youtube_video_id: "kxu7c7ccdmc",
    title: "The Final Hours Before Thousands of Hajj Pilgrims Leave Medina",
  },
];

const YouTubeSlider = ({ videos = [] }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  const videoList =
    Array.isArray(videos) && videos.length ? videos : defaultVideos;

  const getVideoId = (video) => video?.youtube_video_id || video?.id;

  const getEmbedSrc = (video) => {
    const base =
      video?.embed_url || `https://www.youtube.com/embed/${getVideoId(video)}`;
    return base.includes("?") ? `${base}&autoplay=1` : `${base}?autoplay=1`;
  };

  const openVideo = (video) => setActiveVideo(video);
  const closeVideo = () => setActiveVideo(null);

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-3xl font-bold text-[#313881]">
            ভিডিও গ্যালারি
          </h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            আমাদের উমরাহ ও হজ প্যাকেজের ভিডিও দেখে নিন
          </p>
          <div className="mt-3 w-24 h-1 rounded-full mx-auto bg-gradient-to-r from-[#313881] to-[#0678B4]"></div>
        </div>

        {activeVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center w-full bg-black bg-opacity-70 p-4"
            onClick={closeVideo}
          >
            <div
              className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideo}
                className="absolute top-3 right-3 z-10 text-white bg-black/60 hover:bg-red-600 rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={getEmbedSrc(activeVideo)}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={videoList.length > 3}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="youtubeSwiper"
        >
          {videoList.map((video, index) => (
            <SwiperSlide key={video.slug || getVideoId(video) || index}>
              <div
                className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer bg-black"
                onClick={() => openVideo(video)}
              >
                <div className="relative w-full pt-[56.25%]">
                  <Image
                    src={`https://img.youtube.com/vi/${getVideoId(video)}/maxresdefault.jpg`}
                    alt={video.title || `Video ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (video.thumbnail && !img.dataset.fallback) {
                        img.dataset.fallback = "true";
                        img.src = video.thumbnail;
                        img.srcset = video.thumbnail;
                      }
                    }}
                  />
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover:bg-red-500 transition-colors">
                    <FaPlay className="text-white text-xl ml-1" />
                  </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm font-medium line-clamp-2">
                    {video.title || `Video ${index + 1}`}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default YouTubeSlider;
