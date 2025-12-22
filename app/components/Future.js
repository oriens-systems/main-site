"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Future() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const visionPoints = [
    {
      title: "Rockets built domestically",
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
    },
    {
      title: "Fusion reactors manufactured at scale",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="5" />
          <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Critical supply chains fully onshore",
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
    },
    {
      title: "Precision manufacturing as strategic advantage",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="future"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-28 lg:py-40"
    >
      {/* Grid background with larger grid */}
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
          }}
        />
      </div>

      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8b5cf6]/8 rounded-full blur-[150px]"
        aria-hidden
      />

      <motion.div
        className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 lg:px-16"
        style={{ y: contentY }}
      >
        {/* Section header - Large and impactful */}
        <motion.div
          className="text-center mb-20 lg:mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/5 mb-8">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs uppercase tracking-[0.2em] text-[#8b5cf6]/80">
              The Future We&apos;re Building
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] text-white tracking-tight">
            Manufacturing at the
            <br />
            <span className="text-[#8b5cf6]">Speed of Human Ambition</span>
          </h2>
        </motion.div>

        {/* Vision points - Horizontal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-20">
          {visionPoints.map((point, index) => (
            <motion.div
              key={point.title}
              className="group relative p-6 rounded-xl border border-white/8 bg-white/2 overflow-hidden transition-all duration-300 hover:border-[#8b5cf6]/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-[#8b5cf6]/5 to-transparent" />

              {/* Number indicator */}
              <div className="absolute top-4 right-4 font-mono text-4xl font-bold text-white/5 group-hover:text-[#8b5cf6]/10 transition-colors">
                0{index + 1}
              </div>

              <div className="relative flex items-start gap-4">
                {/* Icon */}
                <div className="shrink-0 w-10 h-10 rounded-lg bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6]">
                  {point.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-white pt-1.5">
                  {point.title}
                </h3>
              </div>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#8b5cf6]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>

        {/* Statement - Prominent box */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="relative max-w-2xl mx-auto text-center">
            {/* Glow behind */}
            <div className="absolute inset-0 bg-[#8b5cf6]/15 blur-3xl rounded-full" />

            {/* Main content */}
            <div className="relative px-8 py-10 md:px-12 md:py-12 rounded-2xl border border-[#8b5cf6]/30 bg-[#8b5cf6]/5 backdrop-blur-sm">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-[#8b5cf6]" />
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-[#8b5cf6]" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-[#8b5cf6]" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-[#8b5cf6]" />

              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Making reshoring{" "}
                <span className="text-[#8b5cf6]">inevitable.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
