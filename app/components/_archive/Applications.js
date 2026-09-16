"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// CSS-based animated industrial background
function IndustrialBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Rotating gears */}
      <svg className="absolute top-10 left-10 w-32 h-32 text-white/10 animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="20" />
        <circle cx="50" cy="50" r="8" />
        {[...Array(12)].map((_, i) => (
          <line key={i} x1="50" y1="15" x2="50" y2="5" transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </svg>
      
      <svg className="absolute top-32 left-36 w-24 h-24 text-[var(--accent)]/15 animate-spin-reverse" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="20" />
        <circle cx="50" cy="50" r="8" />
        {[...Array(12)].map((_, i) => (
          <line key={i} x1="50" y1="15" x2="50" y2="5" transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </svg>
      
      <svg className="absolute bottom-20 right-20 w-40 h-40 text-white/8 animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="50" r="40" />
        <circle cx="50" cy="50" r="25" />
        <circle cx="50" cy="50" r="10" />
        {[...Array(16)].map((_, i) => (
          <line key={i} x1="50" y1="10" x2="50" y2="0" transform={`rotate(${i * 22.5} 50 50)`} />
        ))}
      </svg>
      
      <svg className="absolute bottom-40 right-52 w-20 h-20 text-[var(--accent)]/12 animate-spin-reverse" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="20" />
        <circle cx="50" cy="50" r="8" />
        {[...Array(8)].map((_, i) => (
          <line key={i} x1="50" y1="15" x2="50" y2="5" transform={`rotate(${i * 45} 50 50)`} />
        ))}
      </svg>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[var(--accent)]/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Grid lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(var(--accent-rgb), 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(var(--accent-rgb), 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />
    </div>
  );
}

export default function Applications() {
  const sectionRef = useRef(null);
  const [activeApp, setActiveApp] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const applications = [
    {
      id: "AEROSPACE",
      title: "Aerospace & Space Systems",
      description:
        "Precision components for rockets, satellites, and spacecraft where tolerances are measured in microns.",
      specs: ["Rocket nozzles", "Turbopump housings", "Structural frames"],
      icon: (
        <svg
          width="40"
          height="40"
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
    },
    {
      id: "DEFENSE",
      title: "Defense Manufacturing",
      description:
        "Mission-critical parts with zero margin for error. Supply chain security built in.",
      specs: ["Weapon systems", "Vehicle components", "Communication hardware"],
      icon: (
        <svg
          width="40"
          height="40"
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
    },
    {
      id: "FUSION",
      title: "Fusion Energy Components",
      description:
        "Complex geometries for the reactors that will power humanity's future.",
      specs: ["Plasma chambers", "Magnetic coils", "Heat exchangers"],
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="5" />
          <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "INDUSTRIAL",
      title: "Advanced Industrial Hardware",
      description:
        "High-performance machinery components for next-generation manufacturing.",
      specs: ["Precision gears", "Hydraulic systems", "Robotics parts"],
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="3" />
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="applications"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 lg:py-32"
    >
      {/* Industrial Background (CSS-based) */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <IndustrialBackground />
      </div>

      {/* Grid background */}
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
          }}
        />
      </div>

      {/* Gradient accents */}
      <div
        className="absolute bottom-1/3 -left-32 w-[500px] h-[500px] bg-[var(--accent)]/6 rounded-full blur-[100px]"
        aria-hidden
      />

      <motion.div
        className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16"
        style={{ y: contentY }}
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              Applications
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white tracking-tight mb-4">
            Where This <span className="text-[var(--accent)]">Matters Most</span>
          </h2>
        </motion.div>

        {/* Split layout - Tabs on left, Detail on right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 lg:gap-10">
          {/* Left - Application tabs */}
          <div className="space-y-3">
            {applications.map((app, index) => (
              <motion.button
                key={app.id}
                onClick={() => setActiveApp(index)}
                className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-300 ${
                  activeApp === index
                    ? "bg-[var(--accent)]/10 border-[var(--accent)]/40"
                    : "bg-white/2 border-white/8 hover:border-white/15"
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      activeApp === index
                        ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                        : "bg-white/5 text-white/40"
                    }`}
                  >
                    {app.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-semibold transition-colors duration-300 ${
                          activeApp === index ? "text-white" : "text-white/60"
                        }`}
                      >
                        {app.title}
                      </h3>
                      <span
                        className={`font-mono text-xs px-2 py-1 rounded transition-colors duration-300 ${
                          activeApp === index
                            ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                            : "bg-white/5 text-white/30"
                        }`}
                      >
                        {app.id}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right - Detail panel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/3 overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <span className="text-xs font-mono text-white/40">
                    SECTOR_DETAILS
                  </span>
                </div>
                <span className="text-xs font-mono text-[var(--accent)]">
                  {applications[activeApp].id}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeApp}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mb-6">
                      {applications[activeApp].icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {applications[activeApp].title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-white/60 leading-relaxed mb-6">
                      {applications[activeApp].description}
                    </p>

                    {/* Specs */}
                    <div className="space-y-2">
                      <span className="text-xs text-white/40 uppercase tracking-wider">
                        Key Components
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {applications[activeApp].specs.map((spec, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(var(--accent-rgb), 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(var(--accent-rgb), 0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Supporting line */}
        <motion.div
          className="mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            If it can't fail, it{" "}
            <span className="text-[var(--accent)]">can't wait.</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
