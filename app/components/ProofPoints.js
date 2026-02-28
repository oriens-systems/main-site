"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Squares from "./Squares";

function AnimatedNumber({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * numericValue));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function ProofPoints() {
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);

  const metrics = [
    { value: "hrs", suffix: "", label: "STEP → G-code", sub: "not days" },
    { value: "18", suffix: "mo", label: "Lead time cut", sub: "industry avg" },
    { value: "100", suffix: "%", label: "AI toolpath", sub: "autonomous" },
    { value: "4", suffix: "", label: "Sectors", sub: "critical" },
  ];

  return (
    <section
      id="proof-points"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden py-16 lg:py-20"
    >
      {/* Squares Background */}
      <div className="absolute inset-0 opacity-10" aria-hidden>
        <Squares
          speed={0}
          squareSize={40}
          direction="diagonal"
          borderColor="#8b5cf6"
          hoverFillColor="#8b5cf6"
          lineWidth={0.5}
        />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b5cf6]/8 rounded-full blur-[120px] pointer-events-none"
        aria-hidden
      />

      <motion.div
        className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16"
        style={{ y: contentY }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#8b5cf6]/40" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#8b5cf6]/70 font-mono">
              Metrics
            </span>
            <div className="w-8 h-px bg-[#8b5cf6]/40" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Grounded in <span className="text-[#8b5cf6]">Reality</span>
          </h2>
        </motion.div>

        {/* Metrics Grid - Compact 4-column */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <div
                className="relative h-full p-5 md:p-6 rounded-2xl border transition-all duration-300 text-center"
                style={{
                  borderColor:
                    hoveredIndex === index
                      ? "rgba(139,92,246,0.4)"
                      : "rgba(255,255,255,0.08)",
                  background:
                    hoveredIndex === index
                      ? "rgba(139,92,246,0.08)"
                      : "rgba(255,255,255,0.02)",
                }}
              >
                {/* Number */}
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight transition-colors duration-300 group-hover:text-[#8b5cf6]">
                    <AnimatedNumber value={metric.value} />
                  </span>
                  <span className="text-lg md:text-xl font-semibold text-[#8b5cf6]/80">
                    {metric.suffix}
                  </span>
                </div>

                {/* Label */}
                <p className="text-sm md:text-base font-medium text-white/70 mb-1">
                  {metric.label}
                </p>
                <p className="text-xs text-white/40">{metric.sub}</p>

                {/* Bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#8b5cf6] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredIndex === index ? "60%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom statement - Compact */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-col items-center p-6 md:p-8 rounded-xl border border-[#8b5cf6]/20 bg-[#8b5cf6]/5">
            <div className="flex items-center gap-2 mb-3">
              <motion.span
                className="w-2 h-2 rounded-full bg-[#8b5cf6]"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs uppercase tracking-widest text-white/40">
                Mission Critical
              </span>
              <motion.span
                className="w-2 h-2 rounded-full bg-[#8b5cf6]"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </div>
            <p className="text-lg md:text-xl lg:text-2xl font-medium text-white/80">
              Built for environments where{" "}
              <span className="text-[#8b5cf6] font-semibold">
                failure is not an option.
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
