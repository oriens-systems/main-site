"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

// Dynamic import for Three.js components (no SSR)
const WireframeSphere = dynamic(() => import("./WireframeSphere"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-[#8b5cf6]/30 border-t-[#8b5cf6] rounded-full animate-spin" />
    </div>
  ),
});

const WireframeRocketNozzle = dynamic(() => import("./WireframeRocketNozzle"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-[#8b5cf6]/30 border-t-[#8b5cf6] rounded-full animate-spin" />
    </div>
  ),
});

export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen"
    >
      {/* Animated grid background - fixed to viewport for continuity */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        aria-hidden
      >
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0",
          }}
        />
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "300px 300px",
            backgroundPosition: "0 0",
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8b5cf6]/8 rounded-full blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9f7aea]/10 rounded-full blur-[100px]"
        aria-hidden
      />

      {/* Background decorative sphere - left side, half visible */}
      <div
        className="absolute -left-[300px] md:-left-[350px] lg:-left-[400px] top-1/2 -translate-y-1/2 w-[600px] md:w-[700px] lg:w-[800px] h-[600px] md:h-[700px] lg:h-[800px] opacity-35 pointer-events-none"
        aria-hidden
      >
        <WireframeSphere />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 lg:px-16 pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="flex flex-col items-center text-center gap-8">
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8b5cf6] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8b5cf6]" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              In development
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.08] text-white tracking-tight">
              CAM programming in hours,
              <br />
              <span className="text-[#8b5cf6]">not days.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              AI-powered automation for aerospace and defense manufacturing.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <a
              href="/pilot"
              className="px-6 py-3.5 rounded-full border border-[#8b5cf6]/40 bg-[#8b5cf6]/10 backdrop-blur-sm text-white font-semibold text-sm hover:bg-[#8b5cf6]/20 hover:border-[#8b5cf6]/60 transition-all"
            >
              Join the Pilot Program
            </a>
            <a
              href="#mission"
              className="px-6 py-3.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/90 font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-all"
            >
              See the problem
            </a>
          </motion.div>
        </div>

        {/* 3D Sphere visual */}
        <motion.div
          className="mt-16 md:mt-20 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/8 bg-white/2">
            {/* Inner grid texture */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
              aria-hidden
            />

            {/* Scanline effect */}
            <motion.div
              className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-[#8b5cf6]/40 to-transparent pointer-events-none z-10"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              aria-hidden
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#8b5cf6]/30 rounded-tl-2xl pointer-events-none z-10" />
            <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#8b5cf6]/30 rounded-tr-2xl pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#8b5cf6]/30 rounded-bl-2xl pointer-events-none z-10" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#8b5cf6]/30 rounded-br-2xl pointer-events-none z-10" />

            {/* Status bar */}
            <div className="relative flex items-center justify-between px-5 md:px-6 py-3 border-b border-white/6 z-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <span className="text-xs font-mono text-white/40 hidden sm:inline">
                  GRID_VIS_001
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/40">
                <span className="hidden sm:inline">48 cells active</span>
                <span className="font-mono text-[#8b5cf6]/70">● LIVE</span>
              </div>
            </div>

            {/* 3D Rocket Nozzle Canvas */}
            <div className="relative h-[300px] md:h-[400px] lg:h-[450px]">
              <WireframeRocketNozzle />
            </div>

            {/* Bottom bar */}
            <div className="relative flex items-center justify-between px-5 md:px-6 py-3 border-t border-white/6 z-10">
              <div className="flex items-center gap-6 text-xs text-white/40">
                <span>
                  <span className="text-white/60">Δt</span> 2.4ms
                </span>
                <span>
                  <span className="text-white/60">σ</span> 0.003mm
                </span>
              </div>
              <div className="text-xs text-white/40">
                Drag to rotate · Real-time render
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
