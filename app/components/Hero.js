"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Button from "./Button";

export default function Hero() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen flex items-center bg-[#0a0a0a] border-b border-white/8"
    >
      {/* Content */}
      <motion.div
        className="relative z-10 w-full px-6 md:px-10 lg:px-16 py-32"
      >
        <div className="flex flex-col items-center text-center gap-8 max-w-5xl mx-auto">
          {/* Headline */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] text-white"
              style={{ letterSpacing: '0.04em' }}
            >
              The world's most efficient machine shop.
            </h1>
            <p
              className="text-base md:text-lg text-white/60 max-w-lg mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              We're cutting bottlenecks and delays by 80%.
              <br />
              Backed by Universities and Professors across Canada.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Button href="/interest" variant="primary" size="md">
              REGISTER INTEREST
            </Button>
            <Button href="#problem" variant="secondary" size="md">
              SEE THE PROBLEM
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
