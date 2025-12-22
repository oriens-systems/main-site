"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const timeline = [
    {
      phase: "The Problem",
      title: "The Manufacturing Bottleneck",
      description:
        "America's ability to build critical hardware is eroding. Skilled machinists are retiring faster than new ones can be trained. Lead times stretch to 18 months. Supply chains depend on foreign capabilities. The gap between what we can design and what we can build grows wider every year.",
    },
    {
      phase: "The Insight",
      title: "CAM Is the Chokepoint",
      description:
        "The bottleneck isn't machines—it's programming them. Converting a 3D design into a manufacturable part requires deep expertise that takes years to develop. This human-dependent step limits how fast we can build, and how much we can scale.",
    },
    {
      phase: "The Solution",
      title: "AI-Native Manufacturing",
      description:
        "Suprnova builds AI that understands manufacturing the way an expert machinist does. Not automation of the old way—a fundamentally new approach that can reason about geometry, tooling, and strategy from first principles.",
    },
    {
      phase: "The Mission",
      title: "Manufacturing Sovereignty",
      description:
        "We're not building a SaaS product. We're rebuilding American manufacturing capability. Every rocket, reactor, and defense system that can be built domestically strengthens our strategic independence.",
    },
  ];

  const principles = [
    {
      title: "Mission Over Market",
      description:
        "We're solving the manufacturing crisis, not optimizing for ARR. Our success is measured in components manufactured, not seats sold.",
    },
    {
      title: "Precision Is Non-Negotiable",
      description:
        "When parts go into spacecraft and weapons systems, there's no acceptable error rate. We build for zero-failure environments.",
    },
    {
      title: "Long-Term Thinking",
      description:
        "Manufacturing capability is generational infrastructure. We make decisions for decades, not quarters.",
    },
    {
      title: "Technical Depth",
      description:
        "Real solutions require real understanding. We build systems that know manufacturing, not interfaces that hide complexity.",
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
                About
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight mb-6">
              Why <span className="text-[#8b5cf6]">Suprnova</span> Exists
            </h1>

            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
              The story of a manufacturing crisis and the technology being built
              to solve it.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Timeline section */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 lg:px-16">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#8b5cf6]/30 to-transparent" />

          <div className="space-y-16 lg:space-y-24">
            {timeline.map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Dot on timeline */}
                <div className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[#8b5cf6] border-4 border-[#05070f] z-10" />

                <div
                  className={`md:w-[45%] ${
                    index % 2 === 0
                      ? "md:ml-auto md:pl-12"
                      : "md:mr-auto md:pr-12 md:text-right"
                  } pl-12 md:pl-0`}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6] text-xs uppercase tracking-wider mb-4">
                    {item.phase}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-base text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles section */}
      <section className="relative py-24 lg:py-32 border-t border-white/6">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              How We <span className="text-[#8b5cf6]">Operate</span>
            </h2>
            <p className="text-lg text-white/50">
              Principles that guide every decision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="p-6 md:p-8 rounded-2xl border border-white/8 bg-white/2 hover:border-[#8b5cf6]/30 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 font-mono text-3xl font-bold text-[#8b5cf6]/20">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-base text-white/55 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision section */}
      <section className="relative py-24 lg:py-32 border-t border-white/6">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              The Future We're Building
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mb-8">
              A future where rockets are built domestically. Where fusion
              reactors are manufactured at scale. Where critical supply chains
              are fully onshore. Where American manufacturing capability is a
              strategic advantage, not a vulnerability.
            </p>
            <div className="inline-block px-8 py-6 rounded-2xl border border-[#8b5cf6]/30 bg-[#8b5cf6]/5">
              <p className="text-2xl md:text-3xl font-bold text-white">
                Making reshoring{" "}
                <span className="text-[#8b5cf6]">inevitable.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 border-t border-white/6">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to manufacture?
          </h2>
          <p className="text-lg text-white/50 mb-8">
            Get in touch to discuss your requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8b5cf6] text-white font-medium hover:bg-[#7c4fd4] transition-colors"
          >
            Contact Us
            <svg
              width="16"
              height="16"
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
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
