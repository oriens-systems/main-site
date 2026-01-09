"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CallToAction() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const ctaOptions = [
    {
      title: "Upload a STEP File",
      description: "See your part manufactured in minutes",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      primary: true,
    },
    {
      title: "Talk to the Team",
      description: "Discuss your manufacturing needs",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      primary: false,
    },
    {
      title: "See the Technology",
      description: "Deep dive into our approach",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon
            points="10 8 16 12 10 16 10 8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      primary: false,
    },
  ];

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-28 lg:py-40"
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

      {/* Central gradient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8b5cf6]/10 rounded-full blur-[120px]"
        aria-hidden
      />

      <motion.div
        className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 lg:px-16"
        style={{ y: contentY }}
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-14 lg:mb-18"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white tracking-tight mb-4">
            Start Manufacturing <span className="text-[#8b5cf6]">Today</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-lg mx-auto">
            From design to production in minutes, not months.
          </p>
        </motion.div>

        {/* CTA Grid - Primary centered, secondary on sides */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 mb-20">
          {ctaOptions.map((option, index) => (
            <motion.button
              key={option.title}
              className={`group relative p-6 md:p-8 rounded-2xl border text-left transition-all duration-300 overflow-hidden ${
                option.primary
                  ? "bg-[#8b5cf6] border-[#8b5cf6] hover:bg-[#7c4fd4] lg:order-2"
                  : "bg-white/3 border-white/10 hover:border-[#8b5cf6]/50 hover:bg-white/5"
              } ${index === 0 ? "lg:order-1" : ""} ${
                index === 2 ? "lg:order-3" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: option.primary ? 0 : 0.1 * (index + 1),
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated background for primary */}
              {option.primary && (
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-[#8b5cf6] via-[#a78bfa] to-[#8b5cf6] opacity-0 group-hover:opacity-100"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                />
              )}

              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div
                  className={`mb-5 w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    option.primary
                      ? "bg-white/20 text-white"
                      : "bg-[#8b5cf6]/10 text-[#8b5cf6] group-hover:bg-[#8b5cf6]/20"
                  }`}
                >
                  {option.icon}
                </div>

                {/* Text */}
                <h3
                  className={`text-xl md:text-2xl font-semibold mb-2 ${
                    option.primary ? "text-white" : "text-white"
                  }`}
                >
                  {option.title}
                </h3>
                <p
                  className={`text-sm md:text-base ${
                    option.primary ? "text-white/80" : "text-white/50"
                  }`}
                >
                  {option.description}
                </p>
              </div>

              {/* Arrow */}
              <motion.div
                className={`absolute bottom-6 right-6 md:bottom-8 md:right-8 transition-all duration-300 ${
                  option.primary
                    ? "text-white/60 group-hover:text-white"
                    : "text-white/20 group-hover:text-[#8b5cf6]"
                }`}
                whileHover={{ x: 5 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Closing line - Impactful */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative inline-block">
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-[#8b5cf6]/10 blur-2xl rounded-full" />

            <div className="relative px-8 py-6 md:px-10 md:py-8 border border-white/10 rounded-2xl bg-white/2 backdrop-blur-sm">
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-white/80 tracking-tight">
                When the stakes are cosmic,
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight mt-1">
                precision is <span className="text-[#8b5cf6]">survival.</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer info */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <motion.span
                className="w-2 h-2 rounded-full bg-yellow-500"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Systems in development
            </span>
            <span className="hidden md:inline text-white/20">|</span>
            <span>Toronto, ON</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="text-[#8b5cf6]/70">hello@suprnova.co</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
