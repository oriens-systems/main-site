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
  { src: "/images/western_logo.png", alt: "Western Morissiette Institute", large: true },
];

function BackerLogo({ src, alt, large }) {
  const [errored, setErrored] = useState(false);
  const sizeClass = large
    ? "w-48 h-24 md:w-56 md:h-28"
    : "w-32 h-16 md:w-40 md:h-20";
  if (errored) {
    return (
      <div
        className={`flex-shrink-0 ${sizeClass} flex items-center justify-center rounded bg-white/5 border border-white/10`}
        aria-hidden
      />
    );
  }
  return (
    <div className={`flex-shrink-0 ${sizeClass} flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300`}>
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
    <main className="relative min-h-screen bg-[var(--background)] selection:bg-[var(--accent)]/30">
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

        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--accent-light)]/5 rounded-full blur-[100px] pointer-events-none" />

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
              <span className="text-[var(--accent)] font-medium">
                spacefaring future.
              </span>
            </motion.span>
          </h1>
        </div>
      </section>

      {/* The Problem - Capacity Gap */}
      <section className="relative py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              The <span className="text-[var(--accent)]">Capacity Gap</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              North America has lost its manufacturing capacity. Skilled machinists and CAM programmers are retiring faster than they're being replaced. Lead times at job shops are 4-8 weeks. Quoting is done by phone. There is no digital thread, no automation, no scalability. One shop closes every 34 hours.
            </p>

            <p className="mt-12 text-sm font-mono text-[var(--accent)]">
              &gt; SYSTEM SOLUTION: THE WORLD'S MOST EFFICIENT MACHINE SHOP.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Solution */}
      <section className="relative py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">
              How We're <span className="text-[var(--accent)]">Solving It</span>
            </h2>
          </motion.div>

          {/* Four stat blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
            {[
              "80% reduction in bottlenecks and delays",
              "Autonomous process planning from STEP file to finished part",
              "Lights-out production — no human intervention in the production path",
              "Backed by Western University and McMaster's MMRI"
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-6 md:p-8 rounded-xl border border-white/10 bg-white/3 hover:border-[var(--accent)]/50 hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[var(--accent)]" />
                  <p className="text-base md:text-lg text-white/80 leading-relaxed">
                    {stat}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Body text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-lg text-white/60 leading-relaxed">
              We are building a fully autonomous CNC factory purpose-built for precision manufacturing. Upload a design file. We handle the rest — toolpath generation, machine scheduling, inspection, and delivery. No backlogs. No manual handoffs.
            </p>
          </motion.div>
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
            Our <span className="text-[var(--accent)]">Backers</span>
          </motion.h2>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-24 md:gap-32 items-center py-4 w-max animate-backer-scroll">
            {/* Duplicated set for seamless loop */}
            {[...BACKER_IMAGES, ...BACKER_IMAGES, ...BACKER_IMAGES].map((item, i) => (
              <BackerLogo key={i} src={item.src} alt={item.alt} large={item.large} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--accent)]/10 via-[var(--background)] to-[var(--background)]" />
        <div className="max-w-xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl font-medium text-white mb-8">
              We're raising $5M for Phase 1.
            </p>
            <Button href="/interest" variant="primary" size="lg">
              REGISTER INTEREST
            </Button>
          </motion.div>
        </div>
      </section>

      {/* <section className="relative py-24 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--accent)]/10 via-[var(--background)] to-[var(--background)]" />
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