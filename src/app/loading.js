import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="mb-8 animate-pulse">
        <Image
          src="/alwaqiah-logo.png"
          alt="Al Waqiah"
          width={220}
          height={50}
          priority
          className="h-auto w-44 md:w-56"
        />
      </div>

      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0678B4] border-r-[#313881] animate-spin" />
        {/* Center dot */}
        <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-[#313881]" />
      </div>

      {/* Loading text with bouncing dots */}
      <div className="mt-6 flex items-center gap-2 text-gray-600 text-sm md:text-base">
        <span>লোড হচ্ছে</span>
        <span className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#313881] animate-bounce" />
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#0678B4] animate-bounce"
            style={{ animationDelay: "0.15s" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#313881] animate-bounce"
            style={{ animationDelay: "0.3s" }}
          />
        </span>
      </div>
    </div>
  );
}