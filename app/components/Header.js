"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 py-6 md:px-10 lg:px-12">
      <nav className="flex items-center justify-between max-w-[1800px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 md:w-14 md:h-14 relative">
            <Image
              src="/logo.png"
              alt="Suprnova Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-white text-lg md:text-xl font-medium tracking-wider">
            SUPR<span className="text-[#8B5CF6]">NOVA</span>
          </span>
        </div>

        {/* Download Button */}
        <a
          href="#"
          className="group relative flex items-center justify-center w-[180px] h-[52px] transition-all duration-300"
        >
          {/* Arrow/chevron shaped button with angled right side */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 180 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 3L4 26L22 49H150L166 40V12L150 3H22Z"
              stroke="#1E0C33"
              strokeWidth="3"
              fill="white"
              className="transition-all duration-300 group-hover:fill-gray-50"
            />
          </svg>
          <span className="relative z-10 italic text-[#5B21B6] font-semibold text-base pl-2">Download Now</span>
        </a>
      </nav>
    </header>
  );
}

