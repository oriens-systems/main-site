"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";

// Add your backer logo paths here (e.g. from /public/backers/)
const BACKER_IMAGES = [
  { src: "/images/oci_logo.png", alt: "OCI" },
  { src: "/images/mmri_logo.png", alt: "MMRI" },
  { src: "/images/western_logo.png", alt: "Western Morissiette Institute" },
];

function BackerLogo({ src, alt }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        className="flex-shrink-0 w-32 h-16 md:w-40 md:h-20 flex items-center justify-center rounded bg-white/5 border border-white/10"
        aria-hidden
      />
    );
  }
  return (
    <div className="flex-shrink-0 w-32 h-16 md:w-40 md:h-20 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
      <img
        src={src}
        alt={alt}
        className="object-contain max-h-full w-auto max-w-full"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

const WireframeStarField = dynamic(
  () => import("../components/WireframeStarField"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function AboutContent() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="relative min-h-screen bg-[#05070f] selection:bg-[#8b5cf6]/30">
      <div className="fixed inset-0 opacity-40 pointer-events-none z-0">
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)`,
            backgroundSize: "300px 300px",
          }}
        />
      </div>

      <Header />

      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden"
      >
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0 pointer-events-none opacity-60"
        >
          <div className="absolute inset-0">
            <WireframeStarField />
          </div>
        </motion.div>

        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8b5cf6]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9f7aea]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.15]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="block"
            >
              We're building the
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50"
            >
              automation layer
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="block text-2xl md:text-3xl lg:text-4xl mt-6 font-normal text-white/60 max-w-3xl mx-auto"
            >
              that unlocks the manufacturing capacity necessary for a{" "}
              <span className="text-[#8b5cf6] font-medium">
                spacefaring future.
              </span>
            </motion.span>
          </h1>
        </div>
      </section>

      {/* Our Backers - moving carousel */}
      <section className="relative py-20 border-t border-white/5 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-white"
          >
            Our <span className="text-[#8b5cf6]">Backers</span>
          </motion.h2>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-24 md:gap-32 items-center py-4 w-max animate-backer-scroll">
            {/* Duplicated set for seamless loop */}
            {[...BACKER_IMAGES, ...BACKER_IMAGES, ...BACKER_IMAGES].map((item, i) => (
              <BackerLogo key={i} src={item.src} alt={item.alt} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              The <span className="text-[#8b5cf6]">Capacity Gap</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              North America has lost its manufacturing capacity. Skilled CAM
              programmers are retiring faster than they're replaced. We're
              building the tools to close that gap.
            </p>

            <p className="mt-12 text-sm font-mono text-[#8b5cf6]">
              &gt; SYSTEM SOLUTION: AUTONOMOUS CAM GENERATION
            </p>
          </motion.div>
        </div>
      </section>

      {/* <section className="relative py-24 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8b5cf6]/10 via-[#05070f] to-[#05070f]" />
        <div className="max-w-xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">
            Help Close the Gap
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              CONTACT
            </Button>
            <Button href="/" variant="secondary" size="lg">
              VIEW MISSION
            </Button>
          </div>
        </div>
      </section> */}

      <Footer />
    </main>
  );
}