"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./Button";

// Dynamic import for Three.js components (no SSR)
const WireframeSphere = dynamic(() => import("./WireframeSphere"), {
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
            className="flex items-center gap-4 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex-1 h-px bg-white/10" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8b5cf6] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8b5cf6]" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              In development
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          {/* Headline */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.08] text-white tracking-tight">
              CAM programming in hours, <br />
              
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
            <Button href="/pilot" variant="primary" size="md">
              Join the Pilot Program
            </Button>
            <Button href="#mission" variant="secondary" size="md">
              See the problem
            </Button>
          </motion.div>
        </div>


      </motion.div>
    </section>
  );
}
