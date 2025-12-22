"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
  const heroRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    sector: "",
    message: "",
  });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sectors = [
    "Aerospace & Space",
    "Defense",
    "Fusion Energy",
    "Advanced Industrial",
    "Other",
  ];

  return (
    <main className="relative bg-[#05070f]">
      <Header />

      {/* Hero section */}
      <section
        ref={heroRef}
        className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24"
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
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#8b5cf6]/10 rounded-full blur-[100px]"
          aria-hidden
        />

        <motion.div
          className="relative z-10 max-w-[700px] mx-auto px-6 text-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Start <span className="text-[#8b5cf6]">Manufacturing</span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto">
              Ready to manufacture mission-critical components? Let's talk.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact section */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Direct Line
                </h2>
                <p className="text-base text-white/60 leading-relaxed">
                  No sales team. No qualification calls. Tell us what you need
                  to manufacture and we'll tell you how we can help.
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6] shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="22,6 12,13 2,6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:contact@suprnova.ai"
                      className="text-[#8b5cf6] hover:text-[#a78bfa] transition-colors"
                    >
                      contact@suprnova.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6] shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                      Location
                    </p>
                    <p className="text-white/70">San Francisco, CA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-green-500"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                      Status
                    </p>
                    <p className="text-white/70">
                      Systems Online • Accepting Projects
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              {/* <div className="p-6 rounded-xl border border-white/8 bg-white/2">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Before you reach out
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/technology"
                      className="flex items-center gap-2 text-sm text-white/60 hover:text-[#8b5cf6] transition-colors"
                    >
                      <span className="text-[#8b5cf6]">→</span>
                      Learn how the technology works
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/applications"
                      className="flex items-center gap-2 text-sm text-white/60 hover:text-[#8b5cf6] transition-colors"
                    >
                      <span className="text-[#8b5cf6]">→</span>
                      See industry applications
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="flex items-center gap-2 text-sm text-white/60 hover:text-[#8b5cf6] transition-colors"
                    >
                      <span className="text-[#8b5cf6]">→</span>
                      Understand our mission
                    </Link>
                  </li>
                </ul>
              </div> */}
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/2">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Tell us about your project
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs text-white/40 uppercase tracking-wider mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs text-white/40 uppercase tracking-wider mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs text-white/40 uppercase tracking-wider mb-2"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sector"
                        className="block text-xs text-white/40 uppercase tracking-wider mb-2"
                      >
                        Sector
                      </label>
                      <select
                        id="sector"
                        name="sector"
                        value={formData.sector}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8b5cf6]/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0b1020]">
                          Select sector
                        </option>
                        {sectors.map((sector) => (
                          <option
                            key={sector}
                            value={sector}
                            className="bg-[#0b1020]"
                          >
                            {sector}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs text-white/40 uppercase tracking-wider mb-2"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors resize-none"
                      placeholder="Describe your manufacturing requirements—materials, tolerances, volumes, timeline..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#8b5cf6] text-white font-semibold hover:bg-[#7c4fd4] transition-colors flex items-center justify-center gap-2"
                  >
                    Submit Request
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
                  </button>
                </form>

                <p className="mt-4 text-xs text-white/30 text-center">
                  We respond within 24 hours. No automated replies.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom quote */}
      <section className="relative py-16 border-t border-white/6">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-white/80">
              When the stakes are cosmic,
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white mt-2">
              precision is <span className="text-[#8b5cf6]">survival.</span>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
