"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const WireframeWalker = dynamic(() => import("./WireframeWalker"), {
  ssr: false,
  loading: () => null,
});

const AUTOPLAY_DURATION = 5000; // 5 seconds per card
const TOTAL_STAKES = 4;

export default function Stakes() {
  const sectionRef = useRef(null);
  const [activeStake, setActiveStake] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  // Autoplay logic with useCallback and refs
  useEffect(() => {
    const intervalTime = AUTOPLAY_DURATION / 50; // Update every 100ms

    const interval = setInterval(() => {
      progressRef.current += 2;

      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setActiveStake((current) => (current + 1) % TOTAL_STAKES);
      }

      setProgress(progressRef.current);
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Reset progress when stake changes manually
  const handleStakeClick = useCallback((index) => {
    setActiveStake(index);
    progressRef.current = 0;
    setProgress(0);
  }, []);

  const stakes = [
    {
      id: "01",
      title: "Aerospace Delays",
      shortTitle: "AEROSPACE",
      description:
        "Critical missions stall when precision components can't be manufactured domestically at scale.",
      stat: "18mo+",
      statLabel: "avg. delay",
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
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#ef4444",
    },
    {
      id: "02",
      title: "Energy Timelines",
      shortTitle: "ENERGY",
      description:
        "The path to fusion and clean energy depends on advanced manufacturing capabilities we're losing.",
      stat: "5-10yr",
      statLabel: "pushed back",
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
      color: "#f59e0b",
    },
    {
      id: "03",
      title: "Defense Readiness",
      shortTitle: "DEFENSE",
      description:
        "National security requires supply chain independence. Offshore dependencies create vulnerabilities.",
      stat: "73%",
      statLabel: "import reliance",
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
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#8b5cf6",
    },
    {
      id: "04",
      title: "Tech Sovereignty",
      shortTitle: "SOVEREIGNTY",
      description:
        "Without domestic capacity, we cede control of critical technologies to foreign entities.",
      stat: "40%",
      statLabel: "capability lost",
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
          <path
            d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#06b6d4",
    },
  ];

  return (
    <section
      id="stakes"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 lg:py-32"
    >
      {/* Grid background */}
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

      {/* Gradient accents */}
      <div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px]"
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#8b5cf6]/8 rounded-full blur-[100px]"
        aria-hidden
      />

      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16"
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
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs uppercase tracking-[0.2em] text-red-400/80">
              Critical Alert
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.1] text-white tracking-tight">
            What We Lose Without
            <span className="text-[#8b5cf6]"> Domestic Capacity</span>
          </h2>
        </motion.div>

        {/* Main interactive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center">
          {/* Left: Improved stake cards */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              {stakes.map((stake, index) => {
                const isActive = activeStake === index;
                return (
                  <motion.div
                    key={stake.id}
                    onClick={() => handleStakeClick(index)}
                    className={`relative cursor-pointer rounded-xl border overflow-hidden transition-all duration-500 ${
                      isActive
                        ? "bg-white/5 border-white/15"
                        : "bg-white/2 border-white/6 hover:border-white/12"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ scale: isActive ? 1 : 1.01 }}
                  >
                    {/* Active glow effect */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        style={{
                          background: `radial-gradient(circle at 20% 50%, ${stake.color}40, transparent 60%)`,
                        }}
                      />
                    )}

                    {/* Card content */}
                    <div className="relative p-5 md:p-6">
                      <div className="flex items-start gap-4">
                        {/* Icon container */}
                        <div
                          className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            isActive ? "bg-white/10" : "bg-white/5"
                          }`}
                          style={{
                            color: isActive
                              ? stake.color
                              : "rgba(255,255,255,0.4)",
                            borderLeft: isActive
                              ? `2px solid ${stake.color}`
                              : "2px solid transparent",
                          }}
                        >
                          {stake.icon}
                        </div>

                        {/* Text content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3 mb-1">
                            <h3
                              className={`font-semibold text-base md:text-lg transition-colors duration-300 ${
                                isActive ? "text-white" : "text-white/60"
                              }`}
                            >
                              {stake.title}
                            </h3>
                            <span
                              className="font-mono text-xs px-2 py-1 rounded-md transition-all duration-300"
                              style={{
                                backgroundColor: isActive
                                  ? `${stake.color}20`
                                  : "rgba(255,255,255,0.05)",
                                color: isActive
                                  ? stake.color
                                  : "rgba(255,255,255,0.4)",
                              }}
                            >
                              {stake.id}
                            </span>
                          </div>

                          {/* Expanded content */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <p className="text-sm text-white/55 leading-relaxed">
                                  {stake.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* Autoplay progress bar */}
                    {isActive && (
                      <div className="h-1 bg-white/5">
                        <div
                          className="h-full transition-all duration-100 ease-linear"
                          style={{
                            backgroundColor: stake.color,
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Autoplay indicator */}
            <div className="mt-4 flex items-center justify-center text-xs text-white/40">
              <span className="flex items-center gap-2">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                Auto-cycling • Click to select
              </span>
            </div>
          </motion.div>

          {/* Right: 3D Walker display */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Main container with scanner effect */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/8 bg-white/2">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-[#8b5cf6]/40 rounded-tl-2xl z-10" />
                <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-[#8b5cf6]/40 rounded-tr-2xl z-10" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-[#8b5cf6]/40 rounded-bl-2xl z-10" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-[#8b5cf6]/40 rounded-br-2xl z-10" />

                {/* Scanner line effect */}
                <motion.div
                  className="absolute inset-x-0 h-0.5 pointer-events-none z-20"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stakes[activeStake].color}80, transparent)`,
                  }}
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />

                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Top status bar */}
                <div className="relative flex items-center justify-between px-4 md:px-5 py-3 border-b border-white/6 z-10">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: stakes[activeStake].color }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                    <span className="text-[11px] font-mono text-white/40 hidden sm:inline">
                      THREAT_ANALYSIS
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[11px] font-mono"
                      style={{ color: stakes[activeStake].color }}
                    >
                      ● ALERT
                    </span>
                    <span className="text-[11px] font-mono text-white/40">
                      SECTOR: {stakes[activeStake].shortTitle}
                    </span>
                  </div>
                </div>

                {/* 3D Walker Canvas */}
                <div className="relative h-[350px] md:h-[420px] lg:h-[480px]">
                  <WireframeWalker />

                  {/* Floating data points */}
                  <motion.div
                    className="absolute top-6 left-6 px-3 py-2 rounded-lg bg-black/50 border border-white/10 backdrop-blur-sm"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="text-[10px] font-mono text-white/50 uppercase">
                      Impact Level
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: stakes[activeStake].color }}
                    >
                      {stakes[activeStake].stat}
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-6 right-6 px-3 py-2 rounded-lg bg-black/50 border border-white/10 backdrop-blur-sm"
                    animate={{ y: [0, 5, 0] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <div className="text-[10px] font-mono text-white/50 uppercase">
                      Status
                    </div>
                    <div className="text-sm font-semibold text-[#8b5cf6]">
                      Critical
                    </div>
                  </motion.div>

                  {/* Current stake title overlay */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStake}
                      className="absolute bottom-6 left-6 px-4 py-2 rounded-lg bg-black/50 border backdrop-blur-sm"
                      style={{ borderColor: `${stakes[activeStake].color}30` }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2">
                        <span style={{ color: stakes[activeStake].color }}>
                          {stakes[activeStake].icon}
                        </span>
                        <span className="text-sm font-medium text-white">
                          {stakes[activeStake].title}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom bar */}
                <div className="relative flex items-center justify-between px-4 md:px-5 py-3 border-t border-white/6 z-10">
                  <div className="flex items-center gap-4 text-[11px] text-white/40">
                    <span>
                      <span className="text-white/55">Risk:</span> High
                    </span>
                    <span>
                      <span className="text-white/55">Priority:</span> Immediate
                    </span>
                  </div>
                  <span className="text-[11px] text-white/40">
                    Real-time assessment
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom statement */}
        <motion.div
          className="mt-16 lg:mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
            The factory floor is the{" "}
            <span className="text-[#8b5cf6]">frontline.</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
