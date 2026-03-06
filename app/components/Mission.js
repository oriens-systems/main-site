"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

const WireframeTorus = dynamic(() => import("./WireframeTorus"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[var(--accent)]/30 border-t-[var(--accent)] rounded-full animate-spin" />
    </div>
  ),
});

const WireframePumpImpeller = dynamic(() => import("./WireframePumpImpeller"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[var(--accent)]/30 border-t-[var(--accent)] rounded-full animate-spin" />
    </div>
  ),
});

export default function Mission() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], ["12%", "-6%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["8%", "-4%"]);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden py-20 lg:py-28"
    >
      {/* Grid background - fixed to viewport for continuity with Hero */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        aria-hidden
      >
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(var(--accent-rgb), 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--accent-rgb), 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0",
          }}
        />
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(var(--accent-rgb), 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--accent-rgb), 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "300px 300px",
            backgroundPosition: "0 0",
          }}
        />
      </div>

      {/* Gradient accents */}
      <div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[var(--accent)]/6 rounded-full blur-[100px]"
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[var(--accent-light)]/8 rounded-full blur-[80px]"
        aria-hidden
      />

      {/* Background decorative torus - right side, half visible */}
      <div
        className="absolute -right-[300px] md:-right-[350px] lg:-right-[400px] top-1/2 -translate-y-1/2 w-[600px] md:w-[700px] lg:w-[800px] h-[600px] md:h-[700px] lg:h-[800px] opacity-30 pointer-events-none"
        aria-hidden
      >
        <WireframeTorus />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-10 lg:gap-12 items-center">
          {/* 3D Visual */}
          <motion.div
            className="order-2 lg:order-1"
            style={{ y: visualY }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/8 bg-white/2">
              {/* Grid texture */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(var(--accent-rgb), 0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(var(--accent-rgb), 0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: "32px 32px",
                }}
                aria-hidden
              />

              {/* Scanline */}
              <motion.div
                className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-[var(--accent)]/50 to-transparent pointer-events-none z-10"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                aria-hidden
              />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-[var(--accent)]/30 rounded-tl-2xl pointer-events-none z-10" />
              <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-[var(--accent)]/30 rounded-tr-2xl pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-[var(--accent)]/30 rounded-bl-2xl pointer-events-none z-10" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-[var(--accent)]/30 rounded-br-2xl pointer-events-none z-10" />

              {/* Top bar */}
              <div className="relative flex items-center justify-between px-4 md:px-5 py-2.5 border-b border-white/6 z-10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[11px] font-mono text-white/40 hidden sm:inline">
                    CELL_ORCHESTRATOR
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[var(--accent)]/60">
                  ● ACTIVE
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2 flex flex-col gap-6"
            style={{ y: contentY }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {/* Slogan */}
            <p className="text-sm text-white/40 italic tracking-wide">
              Safeguarding humanity through precision.
            </p>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-4 pt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/40 text-sm text-white font-semibold hover:bg-[var(--accent)]/20 hover:border-[var(--accent)]/60 transition-all"
              >
                <span>Get in Touch</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
