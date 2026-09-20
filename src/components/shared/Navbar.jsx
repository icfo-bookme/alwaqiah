"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Roboto } from "next/font/google";
import {
  FaPhone,
  FaWhatsapp,
  FaBars,
  FaTimes,
  FaBoxOpen,
  FaChevronRight,
  FaChevronDown
} from "react-icons/fa";
import CustomPackageForm from "@/components/CustomPackageForm/CustomPackageForm";

// Public airlines API — no auth / CSRF needed, CORS is open
const AIRLINES_API = `${process.env.NEXT_PUBLIC_BASE_URL_V1}/api/airlines`;

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

const BookMeHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const pathname = usePathname();

  // Custom package request modal + airlines list for its form
  const [isCustomFormOpen, setIsCustomFormOpen] = useState(false);
  const [airlines, setAirlines] = useState([]);
  const [airlinesLoading, setAirlinesLoading] = useState(false);
  const airlinesLoadingRef = useRef(false);

  const loadAirlines = useCallback(async () => {
    if (airlinesLoadingRef.current) return;
    airlinesLoadingRef.current = true;
    setAirlinesLoading(true);
    try {
      const res = await fetch(AIRLINES_API, { headers: { Accept: "application/json" } });
      const data = await res.json();
      if (res.ok && Array.isArray(data?.airlines)) setAirlines(data.airlines);
    } catch {
      // silent — the airline field is optional
    } finally {
      airlinesLoadingRef.current = false;
      setAirlinesLoading(false);
    }
  }, []);

  // Load airlines on page load
  useEffect(() => {
    loadAirlines();
  }, [loadAirlines]);

  const openCustomForm = () => {
    setIsCustomFormOpen(true);
    if (airlines.length === 0 && !airlinesLoadingRef.current) loadAirlines(); // retry if page-load fetch failed
  };

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const closeAllMenus = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Mobile menu component
  const MobileMenu = () => {
    return (
      <div className={`${roboto.className} h-full flex flex-col overflow-hidden border`}>
        {/* Menu Header */}
        <div className="flex justify-between p-4 border-b bg-gray-700 border-gray-200 shadow-xl">
          <Link href="/" prefetch onClick={closeAllMenus} className="flex items-center cursor-pointer">
            <div className="flex items-center">
              <Image
                src="/alwaqiah-logo.png"
                alt="আল-ওয়াকিয়া হজ কাফেলা"
                width={170}
                height={50}
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            <li>
              <Link
                href="/"
                className={`flex items-center justify-between py-3 px-4 text-sm hover:bg-blue-50 rounded-lg transition-colors duration-200 group ${isActiveLink("/")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-[#00026E]"
                  }`}
                onClick={closeAllMenus}
                prefetch
              >
                <span className="font-medium">হোম</span>
                <FaChevronRight className={`group-hover:translate-x-1 transition-transform ${isActiveLink("/") ? "text-blue-600" : "text-blue-400"
                  }`} />
              </Link>
            </li>

            <li>
              <Link
                href="/packages"
                className={`flex items-center justify-between py-3 px-4 text-sm hover:bg-blue-50 rounded-lg transition-colors duration-200 group ${isActiveLink("/packages")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-[#00026E]"
                  }`}
                onClick={closeAllMenus}
                prefetch
              >
                <span className="font-medium">প্যাকেজ</span>
                <FaChevronRight className={`group-hover:translate-x-1 transition-transform ${isActiveLink("/packages") ? "text-blue-600" : "text-blue-400"
                  }`} />
              </Link>
            </li>

            <li>
              <Link
                href="/info"
                className={`flex items-center justify-between py-3 px-4 text-sm hover:bg-blue-50 rounded-lg transition-colors duration-200 group ${isActiveLink("/info")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-[#00026E]"
                  }`}
                onClick={closeAllMenus}
                prefetch
              >
                <span className="font-medium">তথ্য</span>
                <FaChevronRight className={`group-hover:translate-x-1 transition-transform ${isActiveLink("/packages") ? "text-blue-600" : "text-blue-400"
                  }`} />
              </Link>
            </li>

            <li>
              <Link
                href="/faqs"
                className={`flex items-center justify-between py-3 px-4 text-sm hover:bg-blue-50 rounded-lg transition-colors duration-200 group ${isActiveLink("/faqs")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-[#00026E]"
                  }`}
                onClick={closeAllMenus}
                prefetch
              >
                <span className="font-medium">প্রশ্নোত্তর</span>
                <FaChevronRight className={`group-hover:translate-x-1 transition-transform ${isActiveLink("/faqs") ? "text-blue-600" : "text-blue-400"
                  }`} />
              </Link>
            </li>



            <li>
              <Link
                href="/about"
                className={`flex items-center justify-between py-3 px-4 text-sm hover:bg-blue-50 rounded-lg transition-colors duration-200 group ${isActiveLink("/about")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-[#00026E]"
                  }`}
                onClick={closeAllMenus}
                prefetch
              >
                <span className="font-medium">আল-ওয়াকিয়া সম্পর্কে</span>
                <FaChevronRight className={`group-hover:translate-x-1 transition-transform ${isActiveLink("/about") ? "text-blue-600" : "text-blue-400"
                  }`} />
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className={`flex items-center justify-between py-3 px-4 text-sm hover:bg-blue-50 rounded-lg transition-colors duration-200 group ${isActiveLink("/contact")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-[#00026E]"
                  }`}
                onClick={closeAllMenus}
                prefetch
              >
                <span className="font-medium">যোগাযোগ</span>
                <FaChevronRight className={`group-hover:translate-x-1 transition-transform ${isActiveLink("/contact") ? "text-blue-600" : "text-blue-400"
                  }`} />
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-[#00026E] mb-3">Contact Us</h3>
          <div className="flex items-center space-x-4 mb-4">
            <a
              href="tel:01841999922"
              className="flex items-center justify-center w-12 h-12 bg-[#00026E] rounded-full text-white hover:bg-[#00026E]/90 transition-colors"
            >
              <FaPhone className="text-xl" />
            </a>
            <a
              href="https://wa.me/+8801841999922"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full text-white hover:bg-green-600 transition-colors relative"
            >
              <span className="absolute animate-ping opacity-75 inline-flex h-full w-full rounded-full bg-green-400"></span>
              <FaWhatsapp className="text-xl z-10" />
            </a>
          </div>
          <div>
            <p className="text-sm text-gray-600">Call Anytime</p>
            <a
              href="tel:01841999922"
              className="text-lg font-semibold text-[#00026E] hover:underline"
            >
              01841999922
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className={`header-area-three bg-white md:bg-transparent ${roboto.className} `}>
        <div className="main-header absolute w-full z-50 bg-transparent border-b border-gray-600">
          <div className="header-bottom text-[#00026E]">
            <div className="container w-[95%] lg:w-[86%] mx-auto">
              <div className="flex justify-between items-center py-2">
                {/* Updated Logo Section - Entire area clickable */}
                <Link href="/" prefetch className="logo flex items-center cursor-pointer">
                  {/* Al-Waqiah Logo */}
                  <div className="nav-logo">
                    <Image
                      src="/alwaqiah-logo.png"
                      alt="আল-ওয়াকিয়া হজ কাফেলা"
                      width={170}
                      height={50}
                      className="object-contain filter  "
                      priority
                    />
                  </div>

                  {/* Main Logo and Text on Right */}

                </Link>

                {/* Desktop Navigation */}
                <div className="hidden ml-10 lg:flex items-center gap-6">
                  <Link
                    href="/"
                    className={`text-sm font-semibold transition-colors duration-200 ${isActiveLink("/")
                      ? "text-white font-bold border-b-2 border-red-100"
                      : "hover:text-white text-white"
                      }`}
                    prefetch
                  >
                    হোম
                  </Link>

                  <Link
                    href="/packages"
                    className={`text-sm font-semibold transition-colors duration-200 ${isActiveLink("/packages")
                      ? "text-white border-b-2 border-red-100"
                      : "hover:text-white text-white"
                      }`}
                    prefetch
                  >
                    প্যাকেজ
                  </Link>

                  <Link
                    href="/info"
                    className={`text-sm font-semibold transition-colors duration-200 ${isActiveLink("/info")
                      ? "text-white border-b-2 border-red-100"
                      : "hover:text-white text-white"
                      }`}
                    prefetch
                  >
                    তথ্য
                  </Link>



                  <Link
                    href="/faqs"
                    className={`text-sm font-semibold transition-colors duration-200 ${isActiveLink("/faqs")
                      ? "text-white border-b-2 border-red-100"
                      : "hover:text-white text-white"
                      }`}
                    prefetch
                  >
                    প্রশ্নোত্তর
                  </Link>



                  <Link
                    href="/about"
                    className={`text-sm font-semibold transition-colors duration-200 ${isActiveLink("/about")
                      ? "text-white border-b-2  border-red-100"
                      : "hover:text-white text-white"
                      }`}
                    prefetch
                  >
                    আল-ওয়াকিয়া সম্পর্কে
                  </Link>
                  <Link
                    href="/contact"
                    className={`text-sm font-semibold transition-colors duration-200 ${isActiveLink("/contact")
                      ? "text-white border-b-2  border-red-100"
                      : "hover:text-white text-white"
                      }`}
                    prefetch
                  >
                    যোগাযোগ
                  </Link>
                </div>

                {/* Desktop Contact Info */}
                <div className="ml-3 hidden lg:flex items-center gap-4">
                  <button type="button" onClick={openCustomForm} className="flex items-center gap-2 rounded-full px-4 py-2.5 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105" style={{ background: "linear-gradient(90deg, #313881, #0678B4)" }}>
                    <FaBoxOpen className="text-base" />
                    <span>কাস্টমাইজড প্যাকেজ</span>
                  </button>
                  <div>
                    <p className="text-sm text-white">Call Anytime</p>
                    <h4 className="text-lg font-semibold">
                      <a href="tel:01841999922" className="text-white">01841999922</a>
                    </h4>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center gap-3 w-40">
                  <button type="button" onClick={openCustomForm} className="flex items-center gap-1.5 rounded-full px-3 py-2 text-white text-xs font-semibold" style={{ background: "linear-gradient(90deg, #313881, #0678B4)" }}>
                    {/* <FaBoxOpen /> */}
                    <span>কাস্টমাইজড প্যাকেজ</span>
                  </button>
                  <button onClick={toggleMobileMenu} className="text-[#f9f9fc] focus:outline-none" aria-label="Toggle menu">
                    {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-20">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/50"
                onClick={closeAllMenus}
              ></div>

              {/* Menu Content */}
              <div
                ref={mobileMenuRef}
                className="absolute top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
              >
                <MobileMenu />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Custom package request modal */}
      {isCustomFormOpen && <CustomPackageForm onClose={() => setIsCustomFormOpen(false)} airlines={airlines} airlinesLoading={airlinesLoading} />}
    </>
  );
};

export default BookMeHeader;