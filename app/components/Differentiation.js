"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const WireframeTransportShuttle = dynamic(
  () => import("./WireframeTransportShuttle"),
  {
  ssr: false,
  loading: () => null,
  }
);

export default function Differentiation() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState("are");
  const [hoveredCard, setHoveredCard] = useState(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const comparisons = [
    {
      not: "CAM software replacement",
      are: "Manufacturing infrastructure",
      notIcon: "layers",
      areIcon: "building",
      description:
        "We don't patch existing workflows—we build the factory of the future.",
    },
    {
      not: "Efficiency add-on",
      are: "Capacity multiplier",
      notIcon: "zap",
      areIcon: "trending",
      description:
        "Not incremental gains, but exponential manufacturing capacity.",
    },
    {
      not: "Workflow tool",
      are: "Reshoring enabler",
      notIcon: "tool",
      areIcon: "globe",
      description: "Technology that brings production back to North America.",
    },
  ];

  const icons = {
    layers: (
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    zap: (
      <path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    tool: (
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    building: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <path
          d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    trending: (
      <path
        d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path
          d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  };

  return (
    <section
      id="differentiation"
      ref={sectionRef}
      className="relative w-full overflow-hidden pt-32 lg:pt-40 pb-24 lg:pb-32"
    >
      {/* Grid background - same as other sections */}
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
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#8b5cf6]/6 rounded-full blur-[100px]"
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#8b5cf6]/8 rounded-full blur-[100px]"
        aria-hidden
      />

      {/* Background 3D model */}
      <div
        className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 w-[140vw] lg:w-[180vw] h-[1000px] lg:h-[1300px] opacity-25 pointer-events-none"
        aria-hidden
      >
        <WireframeTransportShuttle />
      </div>

      <motion.div
        className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16"
        style={{ y: contentY }}
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8b5cf6] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8b5cf6]" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              Redefining Manufacturing
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.1] text-white tracking-tight">
            This Is Not <span className="text-[#8b5cf6]">Traditional CAM</span>
          </h2>
        </motion.div>

        {/* Interactive toggle */}
            <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
          <div className="inline-flex p-1 rounded-full border border-white/10 bg-white/3">
            <button
              onClick={() => setActiveTab("not")}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "not"
                  ? "text-white"
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              {activeTab === "not" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-red-500/20 border border-red-500/30 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  </svg>
                We Are NOT
                    </span>
            </button>
            <button
              onClick={() => setActiveTab("are")}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "are"
                  ? "text-white"
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              {activeTab === "are" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                  <path
                    d="M20 6L9 17l-5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  </svg>
                We ARE
              </span>
            </button>
                </div>
        </motion.div>

        {/* Interactive comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {comparisons.map((item, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`relative h-full rounded-2xl border overflow-hidden transition-all duration-500 ${
                  activeTab === "are"
                    ? "border-[#8b5cf6]/20 bg-[#8b5cf6]/5"
                    : "border-red-500/20 bg-red-500/5"
                }`}
                style={{
                  borderColor:
                    hoveredCard === index
                      ? activeTab === "are"
                        ? "rgba(139,92,246,0.4)"
                        : "rgba(239,68,68,0.4)"
                      : undefined,
                }}
              >
                {/* Corner accents */}
                <div
                  className={`absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 rounded-tl-xl transition-colors duration-300 ${
                    activeTab === "are"
                      ? "border-[#8b5cf6]/30"
                      : "border-red-500/30"
                  }`}
                />
                <div
                  className={`absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 rounded-tr-xl transition-colors duration-300 ${
                    activeTab === "are"
                      ? "border-[#8b5cf6]/30"
                      : "border-red-500/30"
                  }`}
                />
                <div
                  className={`absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 rounded-bl-xl transition-colors duration-300 ${
                    activeTab === "are"
                      ? "border-[#8b5cf6]/30"
                      : "border-red-500/30"
                  }`}
                />
                <div
                  className={`absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 rounded-br-xl transition-colors duration-300 ${
                    activeTab === "are"
                      ? "border-[#8b5cf6]/30"
                      : "border-red-500/30"
                  }`}
                />

                {/* Card number */}
                <div className="absolute top-4 right-4 text-xs font-mono text-white/30">
                  {`0${index + 1}`}
              </div>

                <div className="p-6 lg:p-8">
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 ${
                      activeTab === "are"
                        ? "bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6]"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                    animate={{
                      scale: hoveredCard === index ? 1.05 : 1,
                      rotate: hoveredCard === index ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                      <svg
                      width="24"
                      height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                      {activeTab === "are"
                        ? icons[item.areIcon]
                        : icons[item.notIcon]}
                      </svg>
                  </motion.div>

                  {/* Text content with animation */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3
                        className={`text-lg md:text-xl font-semibold mb-3 transition-colors duration-300 ${
                          activeTab === "are"
                            ? "text-white"
                            : "text-white/60 line-through decoration-red-400/50"
                        }`}
                      >
                        {activeTab === "are" ? item.are : item.not}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Bottom accent line */}
                  <motion.div
                    className={`mt-6 h-0.5 rounded-full transition-all duration-500 ${
                      activeTab === "are" ? "bg-[#8b5cf6]" : "bg-red-500"
                    }`}
                    initial={{ width: "20%" }}
                    animate={{ width: hoveredCard === index ? "100%" : "20%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                    activeTab === "are"
                      ? "bg-linear-to-br from-[#8b5cf6]/10 via-transparent to-transparent"
                      : "bg-linear-to-br from-red-500/10 via-transparent to-transparent"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          className="mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-linear-to-r from-transparent to-[#8b5cf6]/50" />
              <p className="text-xl md:text-2xl text-white/70">
              We don&apos;t{" "}
                <span className="text-white/40 line-through">optimize</span>{" "}
              manufacturing.
            </p>
              <div className="w-12 h-px bg-linear-to-l from-transparent to-[#8b5cf6]/50" />
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
              We <span className="text-[#8b5cf6]">restore</span> it.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
