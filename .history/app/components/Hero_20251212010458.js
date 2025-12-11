"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Subtle parallax to keep things feeling alive without clutter
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const shapeY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.72]);

  const stats = useMemo(
    () => [
      {
        label: "CAM throughput",
        value: "5x faster",
        note: "AI-native toolpaths",
      },
      { label: "Quality drift", value: "-42%", note: "Closed-loop metrology" },
      { label: "Launch cadence", value: "Weekly", note: "Continuous cells" },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden"
    >
      {/* Base grid + soft lab lighting */}
      <div className="grid-overlay" aria-hidden />
      <motion.div
        className="glow-dot -left-10 top-6"
        style={{ y: gridY }}
        aria-hidden
      />
      <motion.div
        className="glow-dot right-0 bottom-16 bg-linear-to-br from-[#9f7aea]/40 to-[#7af0e3]/30"
        style={{ y: gridY }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-28 pb-20 md:pt-32 md:pb-28 lg:pt-36 lg:pb-32">
        <div className="flex flex-col gap-14 lg:gap-16">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center"
            style={{ y: contentY, opacity: contentOpacity }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/70">
                  <span className="h-px w-10 bg-white/30" />
                  Systems-first manufacturing
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] uppercase tracking-[0.2em] text-white/65">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7af0e3] animate-pulse" />
                  Live telemetry
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
                  A{" "}
                  <span className="bg-linear-to-r from-[#7af0e3] via-white to-[#9f7aea] bg-clip-text text-transparent">
                    minimal manufacturing grid
                  </span>{" "}
                  for mission‑critical hardware.
                </h1>
                <p className="text-base md:text-lg text-white/70 max-w-2xl">
                  Suprnova coordinates CAM, machine cells, and inspection into
                  one continuously learning system—so teams ship precision metal
                  on cadence, not on hope.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  "AI CAM",
                  "Closed-loop QC",
                  "Cell orchestration",
                  "Supply-chain resilience",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/70"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#contact"
                  className="rounded-full bg-[#7af0e3]/12 border border-[#7af0e3]/60 text-[#7af0e3] px-5 py-3 text-sm font-semibold hover:bg-[#7af0e3]/18 transition-colors"
                >
                  Book a walkthrough
                </a>
                <a
                  href="#mission"
                  className="rounded-full border border-white/15 text-white/80 px-5 py-3 text-sm font-semibold hover:border-white/35 transition-colors"
                >
                  See the mission
                </a>
                <span className="text-xs text-white/50 tracking-wide">
                  Typical eval: 20 minutes • NDA-friendly
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="panel rounded-2xl p-4 md:p-5 overflow-hidden relative"
                  >
                    <div className="absolute inset-0 opacity-40 pointer-events-none bg-linear-to-br from-white/5 via-transparent to-transparent" />
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                      {item.label}
                    </p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-xl md:text-2xl font-semibold text-white">
                        {item.value}
                      </span>
                      <span className="text-sm text-white/60">{item.note}</span>
                    </div>
                    <div className="mt-4 h-px w-full bg-linear-to-r from-transparent via-[#7af0e3]/70 to-transparent" />
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="relative rounded-[28px] panel overflow-hidden border border-white/10"
              style={{ y: shapeY }}
            >
              {/* Blueprint / instrument panel */}
              <div
                className="absolute inset-0 grid-overlay opacity-80"
                aria-hidden
              />
              <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent" />
              <div
                className="absolute inset-0 opacity-35 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 6px)",
                }}
                aria-hidden
              />
              <div className="absolute inset-px border border-white/5 rounded-[26px]" />
              <div className="absolute left-5 top-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
                <span className="w-2 h-2 rounded-full bg-[#7af0e3]" />
                Telemetry: online
              </div>
              <div className="absolute right-5 top-5 text-[11px] font-mono text-white/55">
                v0.9 • GRID/OPS
              </div>

              <motion.div
                className="absolute -left-10 right-0 h-24 bg-linear-to-b from-transparent via-[#7af0e3]/10 to-transparent"
                animate={{ y: ["-30%", "130%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                aria-hidden
              />

              <div className="relative aspect-4/3">
                <Image
                  src="/hero.svg"
                  alt="Procedural hero visualization"
                  fill
                  className="object-contain object-center"
                  priority
                />
                <div className="absolute left-6 bottom-6 right-6 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/70">
                    <span className="font-mono text-white/60">Δt</span>
                    <span className="text-white/80">Cycle stable</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/70">
                    <span className="font-mono text-white/60">σ</span>
                    <span className="text-white/80">Drift bounded</span>
                  </div>
                </div>
              </div>
              <div className="divider" />
              <div className="flex items-center justify-between px-6 py-4 text-xs text-white/60 uppercase tracking-[0.25em]">
                <span>Grid-synced cells</span>
                <span className="text-[#7af0e3]">Live telemetry</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 text-sm text-white/70"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="h-10 w-px bg-linear-to-b from-transparent via-white/40 to-transparent"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <p className="leading-relaxed">
              Scroll to see how we remove the bottleneck between digital designs
              and certified metal.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
