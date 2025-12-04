"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#1E0C33]">
      {/* Background SVG */}
      <div
        className="absolute inset-0 w-full h-full opacity-100"
        style={{
          backgroundImage: "url('/background.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Hero 3D Shape */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40%] md:w-[45%] lg:w-[50%] h-[80%] pointer-events-none">
        <Image
          src="/hero.svg"
          alt="3D Wireframe Shape"
          fill
          className="object-contain object-right"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-8 md:px-12 lg:px-16 max-w-[1800px] mx-auto">
        <div className="pt-32 md:pt-40 lg:pt-32">
          {/* Subtitle */}
          <p className="text-white/80 text-sm md:text-base lg:text-lg font-bold tracking-[0.3em] uppercase mb-4">
            Manufacturing the Future
          </p>

          {/* Main Headlines */}
          <h1 className="flex flex-col gap-0">
            <span className="text-white text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase leading-[0.95] tracking-tight">
              Reindustrializing
            </span>
            <span className="text-[#5900A7] text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase leading-[0.95] tracking-[0.2em] md:tracking-[0.3em]">
              North America
            </span>
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-12 left-0 right-0 px-8 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto flex flex-col items-center">
            <p className="text-white/70 text-center text-sm md:text-base lg:text-lg max-w-2xl mb-6">
              We&apos;re building the next generation of factories to accelerate the pace of advanced manufacturing
            </p>
            
            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white/60"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

