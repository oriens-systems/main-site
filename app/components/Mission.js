"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

const WireframeTorus = dynamic(() => import("./WireframeTorus"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
    </div>
  ),
});

const WireframePumpImpeller = dynamic(() => import("./WireframePumpImpeller"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
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
      className="relative min-h-screen w-full overflow-hidden py-20 lg:py-28 bg-[#0a0a0a]"
    >

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
            <div className="relative overflow-hidden border border-white/8 bg-[#111111]">
              {/* Top bar */}
              <div className="relative flex items-center justify-between px-4 md:px-5 py-2.5 border-b border-white/8 z-10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[11px] font-mono text-white/40 hidden sm:inline">
                    CELL_ORCHESTRATOR
                  </span>
                </div>
                <span className="text-[11px] font-mono text-white/40">
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
                className="inline-flex items-center gap-2 px-5 py-3 bg-transparent border border-white/30 text-sm text-white font-medium hover:bg-white/5 hover:border-white/50 transition-all"
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
