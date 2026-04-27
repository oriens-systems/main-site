"use client";

import { useRef } from "react";
import Link from "next/link";
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
      title: "REGISTER INTEREST",
      description: "",
      href: "/interest",
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
      primary: true,
    },
  ];

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-28 lg:py-40 bg-[#0a0a0a] border-t border-white/8"
    >

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
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] text-white mb-4"
            style={{ letterSpacing: '0.04em' }}
          >
            The world's most efficient machine shop.
          </h2>
          <p
            className="text-base md:text-lg text-white/55 max-w-lg mx-auto"
            style={{ lineHeight: '1.7' }}
          >
            We're cutting bottlenecks and delays by 80%. Backed by Western University and McMaster's MMRI. Raising $5M for Phase 1.
          </p>
        </motion.div>

        {/* CTA Grid */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-5 mb-20 max-w-3xl mx-auto">
          {ctaOptions.map((option, index) => (
            <Link key={option.title} href={option.href || "#"}>
              <motion.div
                className={`group relative p-6 md:p-8 border text-left transition-all duration-300 overflow-hidden cursor-pointer ${
                  option.primary
                    ? "bg-white hover:bg-white/90 border-transparent text-black"
                    : "bg-transparent border-white/30 hover:border-white/50 text-white hover:bg-white/5"
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
              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div
                  className={`mb-5 w-14 h-14 flex items-center justify-center transition-colors duration-300 ${
                    option.primary
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  {option.icon}
                </div>

                {/* Text */}
                <h3
                  className={`text-xl md:text-2xl font-medium ${option.description ? "mb-2" : ""}`}
                >
                  {option.title}
                </h3>
                {option.description && (
                  <p
                    className={`text-sm md:text-base ${
                      option.primary ? "text-black/70" : "text-white/50"
                    }`}
                  >
                    {option.description}
                  </p>
                )}
              </div>

              {/* Arrow */}
              <motion.div
                className={`absolute bottom-6 right-6 md:bottom-8 md:right-8 transition-all duration-300 ${
                  option.primary
                    ? "text-black/60"
                    : "text-white/20 group-hover:text-white/60"
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
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Closing line - Impactful */}
        {/* <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative inline-block">
            
            <div className="absolute inset-0 bg-[var(--accent)]/10 blur-2xl rounded-full" />

            <div className="relative px-8 py-6 md:px-10 md:py-8 border border-white/10 rounded-xl bg-white/2 backdrop-blur-sm">
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-white/80 tracking-tight">
                When the stakes are cosmic,
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight mt-1">
                precision is <span className="text-[var(--accent)]">survival.</span>
              </p>
            </div>
          </div>
        </motion.div> */}

        {/* Footer info */}
        {/* <motion.div
          className="mt-16 pt-8 border-t border-white/6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-white/40">
            <span>Toronto, ON</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="text-[var(--accent)]/70">hello@suprnova.co</span>
          </div>
        </motion.div> */}
      </motion.div>
    </section>
  );
}
