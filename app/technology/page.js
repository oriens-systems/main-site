"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TechnologyPage() {
  const heroRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const steps = [
    {
      id: "01",
      title: "Geometry Understanding",
      subtitle: "Deep comprehension of complex 3D models",
      description:
        "Our AI doesn't just read CAD files—it understands them. Every surface, every feature, every tolerance is analyzed to build a complete manufacturing model.",
      features: [
        "STEP file parsing with full semantic understanding",
        "Automatic feature recognition (holes, pockets, surfaces)",
        "Tolerance stack analysis",
        "Material property integration",
        "Critical dimension identification",
      ],
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="3.27 6.96 12 12.01 20.73 6.96"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="12"
            y1="22.08"
            x2="12"
            y2="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "02",
      title: "Tool Selection Logic",
      subtitle: "Precision-matched tooling decisions",
      description:
        "Every cut demands the right tool. Our system evaluates thousands of tool combinations against your specific geometry, material, and tolerance requirements.",
      features: [
        "Comprehensive tool library with real-world performance data",
        "Material-specific optimization",
        "Tool wear prediction",
        "Cost-efficiency balancing",
        "Multi-tool strategy optimization",
      ],
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "03",
      title: "Strategy Generation",
      subtitle: "Intelligent machining approach",
      description:
        "The AI develops complete machining strategies—from roughing to finishing—optimized for your specific part, machine, and production requirements.",
      features: [
        "Adaptive roughing strategies",
        "High-speed machining paths",
        "Rest machining optimization",
        "Surface finish prediction",
        "Cycle time minimization",
      ],
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polygon
            points="12 2 2 7 12 12 22 7 12 2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="2 17 12 22 22 17"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="2 12 12 17 22 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "04",
      title: "G-code Validation",
      subtitle: "Verified before it runs",
      description:
        "Every toolpath is simulated and validated against the virtual workpiece. Collisions, gouges, and errors are caught before the first chip flies.",
      features: [
        "Full 3D simulation with material removal",
        "Collision detection (tool, holder, fixture)",
        "Gouge prevention verification",
        "Feed rate optimization",
        "Machine limit validation",
      ],
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="22 4 12 14.01 9 11.01"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "05",
      title: "Safety & Reliability",
      subtitle: "Built for zero-failure environments",
      description:
        "When parts go into rockets, reactors, and defense systems, there's no room for error. Our validation pipeline ensures every output meets mission-critical standards.",
      features: [
        "Multi-stage verification pipeline",
        "Traceability at every step",
        "Automated quality documentation",
        "Process repeatability guarantees",
        "Audit-ready output packages",
      ],
      icon: (
        <svg
          width="32"
          height="32"
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
  ];

  return (
    <main className="relative bg-[#05070f]">
      <Header />

      {/* Hero section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24"
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Gradient */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8b5cf6]/10 rounded-full blur-[120px]"
          aria-hidden
        />

        <motion.div
          className="relative z-10 max-w-[900px] mx-auto px-6 text-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#8b5cf6]/80">
                Technology
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight mb-6">
              How the <span className="text-[#8b5cf6]">AI</span> Works
            </h1>

            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10">
              From STEP file to validated G-code in minutes. Here's what happens
              inside the system.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Steps section */}
      <section className="relative py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          {/* Step navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                  activeStep === index
                    ? "bg-[#8b5cf6] text-white"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                }`}
              >
                {step.id}
              </button>
            ))}
          </div>

          {/* Active step content */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
          >
            {/* Left - Info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6]">
                  {steps[activeStep].icon}
                </div>
                <div>
                  <span className="font-mono text-sm text-[#8b5cf6]">
                    Step {steps[activeStep].id}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {steps[activeStep].title}
                  </h2>
                </div>
              </div>

              <p className="text-lg text-white/50 mb-4">
                {steps[activeStep].subtitle}
              </p>

              <p className="text-base text-white/60 leading-relaxed mb-8">
                {steps[activeStep].description}
              </p>

              {/* Navigation */}
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="px-4 py-2 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Previous
                </button>
                <button
                  onClick={() =>
                    setActiveStep(Math.min(steps.length - 1, activeStep + 1))
                  }
                  disabled={activeStep === steps.length - 1}
                  className="px-4 py-2 rounded-lg bg-[#8b5cf6] text-white hover:bg-[#7c4fd4] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Right - Features */}
            <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/2">
              <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
                Key Capabilities
              </h3>
              <ul className="space-y-4">
                {steps[activeStep].features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="shrink-0 w-5 h-5 rounded bg-[#8b5cf6]/20 flex items-center justify-center mt-0.5">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="3"
                      >
                        <polyline
                          points="20 6 9 17 4 12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-white/70">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 border-t border-white/6">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to see it in action?
          </h2>
          <p className="text-lg text-white/50 mb-8">
            Upload a STEP file and watch the AI work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-[#8b5cf6] text-white font-medium hover:bg-[#7c4fd4] transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/applications"
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 font-medium hover:bg-white/10 hover:text-white transition-colors"
            >
              View Applications
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
