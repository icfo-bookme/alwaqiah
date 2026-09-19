"use client";

import { FaPhone, FaWhatsapp } from "react-icons/fa";

// Floating contact buttons — same styles as the old navbar icons
const FloatingContact = () => {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-center gap-4">
      <a href="https://wa.me/+8801841999922" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp-এ মেসেজ করুন" className="relative z-20 w-[50px] h-[50px]">
        <span className="btn-whatsapp-pulse btn-whatsapp-pulse-border w-[50px] h-[50px]">
          <FaWhatsapp className="w-[25px] h-[25px] text-white" />
        </span>
      </a>
      <a href="tel:01841999922" aria-label="কল করুন" className="relative z-10 w-[50px] h-[50px]">
        <div className="phone-call w-[50px] h-[50px]">
          <FaPhone className="ml-[17px] mt-[17px]" />
        </div>
      </a>
    </div>
  );
};

export default FloatingContact;