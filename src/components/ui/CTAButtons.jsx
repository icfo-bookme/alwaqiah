import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";


const CTAButtons = ({
  phone = "8801841999922",
  whatsapp = "8801841999922",
  message = "Hello, I'm interested in booking a package umrah.",
  className = "flex flex-row items-center justify-center gap-4 mt-5 mb-10",
  size = "md",
}) => {
  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  return (
    <div className={className}>
      {/* Call Now */}
      <Link
        href={`tel:+${phone}`}
        className={`flex items-center text-white rounded-lg transition-colors shadow-sm hover:shadow-md ${sizes[size]}`}
        style={{
          background: "linear-gradient(90deg, #313881, #0678B4)",
        }}
      >
        <FaPhoneAlt className="mr-2" />
        Call Now
      </Link>

      {/* Book Now (WhatsApp) */}
      <Link
        href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center text-white rounded-lg transition-colors shadow-sm hover:shadow-md bg-green-800 hover:bg-green-600 ${sizes[size]}`}
      >
        <FaWhatsapp size={25} className="mr-2" />
        Book Now
      </Link>
    </div>
  );
};

export default CTAButtons;
