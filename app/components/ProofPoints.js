"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

function AnimatedCounter({ value, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
    const step = numericValue / (duration * 60);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function ProofPoints() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const metrics = [
    {
      value: "5",
      suffix: "min",
      label: "STEP to G-code",
      comparison: "vs. weeks traditionally",
      progress: 95,
    },
    {
      value: "18",
      suffix: "mo",
      label: "Lead time eliminated",
      comparison: "industry average wait",
      progress: 100,
    },
    {
      value: "100",
      suffix: "%",
      label: "AI-driven toolpath",
      comparison: "autonomous decisions",
      progress: 100,
    },
    {
      value: "4",
      suffix: "",
      label: "Critical sectors",
      comparison: "aerospace, defense, energy, industrial",
      progress: 80,
    },
  ];

  return (
    <section
      id="proof-points"
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
          }}
        />
      </div>

      {/* Gradient accents */}
      <div
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-[#8b5cf6]/6 rounded-full blur-[100px]"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/5 mb-6">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs uppercase tracking-[0.2em] text-[#8b5cf6]/80">
              Proof Points
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white tracking-tight mb-4">
            Grounded in <span className="text-[#8b5cf6]">Reality</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Not promises. Performance.
          </p>
        </motion.div>

        {/* Metrics - Dashboard style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="group relative p-6 md:p-8 rounded-2xl border border-white/8 bg-white/2 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              {/* Background pulse on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-[#8b5cf6]/5 to-transparent" />

              {/* Top row - Label and status */}
              <div className="relative flex items-center justify-between mb-4">
                <span className="text-sm text-white/40 uppercase tracking-wider">
                  {metric.label}
                </span>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                  <span className="text-xs text-white/30 font-mono">
                    ACTIVE
                  </span>
                </div>
              </div>

              {/* Main value */}
              <div className="relative flex items-baseline gap-2 mb-3">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  <AnimatedCounter value={metric.value} suffix="" />
                </span>
                <span className="text-2xl md:text-3xl font-semibold text-[#8b5cf6]">
                  {metric.suffix}
                </span>
              </div>

              {/* Comparison text */}
              <p className="relative text-sm text-white/40 mb-6">
                {metric.comparison}
              </p>

              {/* Progress bar */}
              <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#8b5cf6] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${metric.progress}%` }}
                  transition={{
                    duration: 1.5,
                    delay: 0.3 + index * 0.1,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust signal - Centered box */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative max-w-2xl mx-auto p-8 md:p-10 rounded-2xl border border-[#8b5cf6]/20 bg-[#8b5cf6]/5 text-center overflow-hidden">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#8b5cf6]/40" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#8b5cf6]/40" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#8b5cf6]/40" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#8b5cf6]/40" />

            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-white tracking-tight">
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
