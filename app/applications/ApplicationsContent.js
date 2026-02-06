"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

function IndustrialBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute top-20 left-[10%] w-32 h-32 text-white/10 animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="20" />
        <circle cx="50" cy="50" r="8" />
        {[...Array(12)].map((_, i) => (
          <line key={i} x1="50" y1="15" x2="50" y2="5" transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </svg>
      
      <svg className="absolute top-40 left-[20%] w-20 h-20 text-[#8b5cf6]/15 animate-spin-reverse" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="20" />
        <circle cx="50" cy="50" r="8" />
        {[...Array(12)].map((_, i) => (
          <line key={i} x1="50" y1="15" x2="50" y2="5" transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </svg>
      
      <svg className="absolute top-10 right-[15%] w-40 h-40 text-white/8 animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="50" r="40" />
        <circle cx="50" cy="50" r="25" />
        <circle cx="50" cy="50" r="10" />
        {[...Array(16)].map((_, i) => (
          <line key={i} x1="50" y1="10" x2="50" y2="0" transform={`rotate(${i * 22.5} 50 50)`} />
        ))}
      </svg>
      
      <svg className="absolute top-32 right-[30%] w-16 h-16 text-[#8b5cf6]/12 animate-spin-reverse" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="20" />
        <circle cx="50" cy="50" r="8" />
        {[...Array(8)].map((_, i) => (
          <line key={i} x1="50" y1="15" x2="50" y2="5" transform={`rotate(${i * 45} 50 50)`} />
        ))}
      </svg>
      
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#8b5cf6]/30 animate-pulse"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function ApplicationsContent() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const applications = [
    {
      id: "aerospace",
      title: "Aerospace & Space Systems",
      tagline: "Where microns matter and failure is not an option",
      description:
        "From commercial satellites to deep-space exploration, aerospace manufacturing demands perfection. Every component must withstand extreme conditions while meeting tolerances that push the limits of what's possible.",
      examples: [
        {
          name: "Rocket Engine Nozzle",
          constraints:
            'Inconel 718, ±0.001" tolerance, complex internal cooling channels',
        },
        {
          name: "Turbopump Housing",
          constraints:
            "Titanium Ti-6Al-4V, thin walls, high-speed rotation rated",
        },
        {
          name: "Satellite Structural Frame",
          constraints:
            "Aluminum 7075-T6, weight-optimized lattice, vibration resistant",
        },
      ],
      stats: [
        { value: '0.001"', label: "Tolerance" },
        { value: "100%", label: "Inspection" },
        { value: "AS9100", label: "Compliant" },
      ],
      icon: (
        <svg
          width="48"
          height="48"
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
      id: "defense",
      title: "Defense Manufacturing",
      tagline: "Supply chain security is national security",
      description:
        "Defense manufacturing requires more than precision—it demands complete supply chain independence. Every component must be traceable, reliable, and manufactured on American soil.",
      examples: [
        {
          name: "Weapon System Components",
          constraints: "Hardened steel, MIL-SPEC compliant, full traceability",
        },
        {
          name: "Vehicle Armor Plates",
          constraints:
            "High-hardness alloys, ballistic rated, rapid production",
        },
        {
          name: "Communications Hardware",
          constraints:
            "Aluminum/titanium hybrid, EMI shielding, sealed assemblies",
        },
      ],
      stats: [
        { value: "ITAR", label: "Registered" },
        { value: "100%", label: "Domestic" },
        { value: "Full", label: "Traceability" },
      ],
      icon: (
        <svg
          width="48"
          height="48"
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
      id: "energy",
      title: "Fusion Energy Components",
      tagline: "Building the infrastructure for unlimited clean power",
      description:
        "Fusion energy will transform civilization—but only if we can manufacture the impossibly complex components it requires. These parts operate at the edge of material science.",
      examples: [
        {
          name: "Plasma-Facing Components",
          constraints:
            "Tungsten/copper hybrid, extreme heat flux, neutron resistant",
        },
        {
          name: "Superconducting Coil Casings",
          constraints:
            "Stainless 316LN, cryogenic rated, magnetic field tolerant",
        },
        {
          name: "Vacuum Chamber Segments",
          constraints:
            "Large-scale titanium, ultra-high vacuum sealed, precision mating",
        },
      ],
      stats: [
        { value: "10⁻⁹", label: "Torr Vacuum" },
        { value: "-269°C", label: "Cryo Rated" },
        { value: "5MW+", label: "Heat Flux" },
      ],
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="5" />
          <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
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

      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24"
      >
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
          <IndustrialBackground />
        </div>

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
                Applications
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight mb-6">
              Where This <span className="text-[#8b5cf6]">Matters</span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
              Critical industries. Mission-critical components. Zero margin for
              error.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {applications.map((app, index) => (
        <section
          key={app.id}
          id={app.id}
          className={`relative py-24 lg:py-32 ${
            index % 2 === 0 ? "" : "bg-white/2"
          }`}
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6]">
                    {app.icon}
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#8b5cf6]/70">
                      Sector 0{index + 1}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {app.title}
                    </h2>
                  </div>
                </div>

                <p className="text-lg text-[#8b5cf6]/80 mb-4 italic">
                  {app.tagline}
                </p>

                <p className="text-base text-white/60 leading-relaxed mb-8">
                  {app.description}
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {app.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white/3 border border-white/6 text-center"
                    >
                      <div className="text-xl md:text-2xl font-bold text-[#8b5cf6]">
                        {stat.value}
                      </div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/2">
                <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
                  Real Part Examples
                </h3>
                <div className="space-y-6">
                  {app.examples.map((example, i) => (
                    <div
                      key={i}
                      className="pb-6 border-b border-white/6 last:border-0 last:pb-0"
                    >
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {example.name}
                      </h4>
                      <p className="text-sm text-white/50">
                        <span className="text-white/30">Constraints:</span>{" "}
                        {example.constraints}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      <section className="relative py-24 border-t border-white/6">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              If it can't fail, it can't wait.
            </h2>
            <p className="text-lg text-white/50 mb-8">
              Let's discuss your manufacturing requirements.
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
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}