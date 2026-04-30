"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";

export default function ContactContent() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="relative min-h-screen bg-[var(--background)]">
      <div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        aria-hidden
      >
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(var(--accent-rgb), 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--accent-rgb), 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0",
          }}
        />
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(var(--accent-rgb), 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--accent-rgb), 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "300px 300px",
            backgroundPosition: "0 0",
          }}
        />
      </div>

      <Header />

      <section
        ref={heroRef}
        className="relative min-h-[50vh] flex items-center justify-center pt-24"
      >
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--accent)]/8 rounded-full blur-[120px]"
          aria-hidden
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--accent-light)]/10 rounded-full blur-[100px]"
          aria-hidden
        />

        <div
          className="absolute -right-[300px] md:-right-[350px] lg:-right-[200px] top-1/2 -translate-y-1/2 w-[600px] md:w-[700px] lg:w-[800px] h-[600px] md:h-[700px] lg:h-[800px] opacity-35 pointer-events-none"
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
            {/* <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                Contact
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div> */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Contact
            </h1>

            {/* <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto">
              Ready to manufacture mission-critical components? Let's talk.
            </p> */}
          </motion.div>
        </motion.div>
      </section>

      <section className="relative py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Direct Line
                </h2>
                <p className="text-base text-white/60 leading-relaxed">
                  No sales team. No qualification calls. Tell us what you need
                  to manufacture and we'll tell you how we can help.
                </p>
              </div> */}

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
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
                      href="mailto:hello@suprnova.co"
                      className="text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
                    >
                      hello@suprnova.co
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
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
                    <p className="text-white/70">Toronto, ON</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-yellow-500"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                      Status
                    </p>
                    <p className="text-white/70">
                       In Development
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/2 backdrop-blur-sm text-center">
                <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mx-auto mb-6">
                  <svg
                    width="28"
                    height="28"
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

                <h3 className="text-xl font-semibold text-white mb-3">
                  Tell us about your project
                </h3>
                <p className="text-sm text-white/50 mb-8 max-w-sm mx-auto">
                  Describe your manufacturing requirements—materials,
                  tolerances, volumes, timeline—and we'll get back to you within
                  24 hours.
                </p>

                <Button
                  href="mailto:hello@suprnova.co"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  EMAIL US
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
                </Button>

                <p className="mt-4 text-xs text-white/30">
                  hello@suprnova.co • We respond within 24 hours
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* <section className="relative py-16 border-t border-white/6">
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
              precision is <span className="text-[var(--accent)]">survival.</span>
            </p>
          </motion.div>
        </div>
      </section> */}

      <Footer />
    </main>
  );
}