"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

const WireframeTorus = dynamic(() => import("./WireframeTorus"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#7af0e3]/30 border-t-[#7af0e3] rounded-full animate-spin" />
    </div>
  ),
});

export default function Mission() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const visualY = useTransform(scrollYProgress, [0, 1], ["12%", "-6%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["8%", "-4%"]);

  const features = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "High Speed",
      
      copy: "CAM decisions generated in seconds, not hours",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      ),
      label: "Full Automation",
      value: "24/7",
      copy: "Cells, metrology, and feedback loops",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "Lower Cost",
      value: "50%",
      copy: "Dense cells mean less overhead",
    },
  ];

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden py-20 lg:py-28"
    >
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{ y: gridY }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,240,227,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,240,227,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,240,227,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,240,227,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "250px 250px",
          }}
        />
      </motion.div>

      {/* Gradient accents */}
      <div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#7af0e3]/6 rounded-full blur-[100px]"
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#9f7aea]/8 rounded-full blur-[80px]"
        aria-hidden
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7af0e3] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7af0e3]" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              Our Mission
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.1] text-white tracking-tight max-w-4xl mx-auto">
            An AI-first grid for
            <span className="text-[#7af0e3]"> advanced manufacturing.</span>
          </h2>
        </motion.div>

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
                    linear-gradient(rgba(122,240,227,0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(122,240,227,0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: "32px 32px",
                }}
                aria-hidden
              />

              {/* Scanline */}
              <motion.div
                className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-[#7af0e3]/50 to-transparent pointer-events-none z-10"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                aria-hidden
              />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-[#7af0e3]/30 rounded-tl-2xl pointer-events-none z-10" />
              <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-[#7af0e3]/30 rounded-tr-2xl pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-[#7af0e3]/30 rounded-bl-2xl pointer-events-none z-10" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-[#7af0e3]/30 rounded-br-2xl pointer-events-none z-10" />

              {/* Top bar */}
              <div className="relative flex items-center justify-between px-4 md:px-5 py-2.5 border-b border-white/6 z-10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#7af0e3]" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[11px] font-mono text-white/40 hidden sm:inline">
                    CELL_ORCHESTRATOR
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#7af0e3]/60">
                  ● ACTIVE
                </span>
              </div>

              {/* 3D Canvas */}
              <div className="relative h-[340px] md:h-[400px] lg:h-[460px]">
                <WireframeTorus />
              </div>

              {/* Bottom bar */}
              <div className="relative flex items-center justify-between px-4 md:px-5 py-2.5 border-t border-white/6 z-10">
                <div className="flex items-center gap-4 text-[11px] text-white/40">
                  <span>
                    <span className="text-white/55">Cells:</span> 48
                  </span>
                  <span>
                    <span className="text-white/55">Sync:</span> 99.7%
                  </span>
                </div>
                <span className="text-[11px] text-white/40">
                  Real-time orchestration
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
            <p className="text-white/65 text-base md:text-lg leading-relaxed">
              We deploy and operate dense, automated machining cells across
              North America. Defense and aerospace teams get precision
              components without the human bottleneck—CAM, machines, and
              metrology run as one continuously learning system.
            </p>

            {/* Feature cards */}
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  className="group relative p-4 md:p-5 rounded-xl border bg-white/2 overflow-hidden transition-colors duration-300 hover:border-[#7af0e3]/30"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 * index }}
                  viewport={{ once: true }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-[#7af0e3]/5 to-transparent" />

                  <div className="relative flex items-start gap-4">
                    {/* Icon */}
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-[#7af0e3]/10 border border-[#7af0e3]/20 flex items-center justify-center text-[#7af0e3]">
                      {feature.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span className="text-sm font-medium text-white">
                          {feature.label}
                        </span>
                        <span className="text-lg font-semibold text-[#7af0e3]">
                          {feature.value}
                        </span>
                      </div>
                      <p className="text-sm text-white/50">{feature.copy}</p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#7af0e3]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-4 pt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 font-medium hover:bg-white/8 hover:border-white/20 transition-all"
              >
                <span>Learn more about our cells</span>
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
