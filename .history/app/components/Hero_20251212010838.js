"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);

  const metrics = [
    { value: "5×", label: "Faster CAM" },
    { value: "42%", label: "Less drift" },
    { value: "24/7", label: "Uptime" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden"
    >
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{ y: gridY }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,240,227,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,240,227,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,240,227,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,240,227,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "300px 300px",
          }}
        />
      </motion.div>

      {/* Gradient orbs */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7af0e3]/8 rounded-full blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9f7aea]/10 rounded-full blur-[100px]"
        aria-hidden
      />

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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7af0e3] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7af0e3]" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              Grid online · North America
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
              Autonomous factories
              <br />
              <span className="text-[#7af0e3]">for precision metal.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              One AI layer coordinates CAM, machining, and inspection—so defense
              and aerospace teams ship certified parts on cadence.
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
              href="#contact"
              className="group relative px-6 py-3.5 rounded-full bg-[#7af0e3] text-[#050a12] font-semibold text-sm overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10">Request access</span>
            </a>
            <a
              href="#mission"
              className="px-6 py-3.5 rounded-full border border-white/15 text-white/80 font-medium text-sm hover:border-white/30 hover:text-white transition-all"
            >
              How it works
            </a>
          </motion.div>

          {/* Metrics row */}
          <motion.div
            className="flex items-center gap-8 md:gap-12 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {metrics.map((m, i) => (
              <div key={m.label} className="flex items-center gap-3">
                {i > 0 && <div className="w-px h-8 bg-white/10" />}
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.15em] text-white/50 mt-1">
                    {m.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero visual card */}
        <motion.div
          className="mt-16 md:mt-20 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/8 bg-white/2">
            {/* Inner grid texture */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(122,240,227,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(122,240,227,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
              aria-hidden
            />

            {/* Scanline effect */}
            <motion.div
              className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-[#7af0e3]/40 to-transparent"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              aria-hidden
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#7af0e3]/30 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#7af0e3]/30 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#7af0e3]/30 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#7af0e3]/30 rounded-br-2xl" />

            {/* Status bar */}
            <div className="relative flex items-center justify-between px-5 md:px-6 py-3 border-b border-white/6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7af0e3]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <span className="text-xs font-mono text-white/40 hidden sm:inline">
                  GRID_VIS_001
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/40">
                <span className="hidden sm:inline">48 cells active</span>
                <span className="font-mono text-[#7af0e3]/70">● LIVE</span>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-video md:aspect-[2.2/1]">
              <Image
                src="/hero.svg"
                alt="Grid visualization"
                fill
                className="object-contain p-6 md:p-10"
                priority
              />
            </div>

            {/* Bottom bar */}
            <div className="relative flex items-center justify-between px-5 md:px-6 py-3 border-t border-white/6">
              <div className="flex items-center gap-6 text-xs text-white/40">
                <span>
                  <span className="text-white/60">Δt</span> 2.4ms
                </span>
                <span>
                  <span className="text-white/60">σ</span> 0.003mm
                </span>
              </div>
              <div className="text-xs text-white/40">
                Synchronized · Real-time feedback
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="flex flex-col items-center gap-3 mt-12 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            className="w-px h-8 bg-linear-to-b from-white/30 to-transparent"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
