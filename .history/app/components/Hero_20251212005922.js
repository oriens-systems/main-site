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
  const shapeY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.6]);

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

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28 lg:py-32">
        <div className="flex flex-col gap-14 lg:gap-16">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center"
            style={{ y: contentY, opacity: contentOpacity }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/70">
                <span className="h-px w-10 bg-white/30" />
                Systems-first manufacturing
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
                  Minimal, autonomous factories for mission-critical hardware.
                </h1>
                <p className="text-base md:text-lg text-white/70 max-w-2xl">
                  We orchestrate CAM, cells, and metrology through one AI layer
                  so teams can build rockets, satellites, and defense systems
                  without waiting on manual programming or brittle supply
                  chains.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="panel rounded-2xl p-4 md:p-5"
                  >
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
              <div
                className="absolute inset-0 grid-overlay opacity-70"
                aria-hidden
              />
              <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent" />
              <div className="absolute inset-px border border-white/5 rounded-[26px]" />
              <div className="relative aspect-4/3">
                <Image
                  src="/hero.svg"
                  alt="Procedural hero visualization"
                  fill
                  className="object-contain object-center"
                  priority
                />
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
