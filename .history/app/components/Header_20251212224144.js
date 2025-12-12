"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-6">
        <nav className="panel rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 md:w-12 md:h-12 relative">
              <Image
                src="/logo.png"
                alt="Suprnova Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-white text-base md:text-lg font-semibold tracking-[0.18em]">
              SUPR<span className="text-[#8b5cf6]">NOVA</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/70 uppercase tracking-[0.16em]">
            <a href="#mission" className="hover:text-white transition-colors">
              Mission
            </a>
            <a
              href="#bottleneck"
              className="hover:text-white transition-colors"
            >
              Bottleneck
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] uppercase tracking-[0.18em] text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
              AI native
            </div>
            <button className="text-xs md:text-sm font-semibold text-[#8b5cf6] border border-[#8b5cf6]/60 rounded-full px-3 md:px-4 py-2 hover:bg-[#8b5cf6]/10 transition-colors">
              Book time
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
