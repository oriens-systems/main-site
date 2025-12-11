"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Mission() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const shapeY = useTransform(scrollYProgress, [0, 1], ["16%", "-8%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["10%", "-4%"]);

  const features = [
    {
      icon: "/mission/bolt-alt.svg",
      label: "High speed",
      copy: "CAM decisions in seconds",
    },
    {
      icon: "/mission/Group 12.svg",
      label: "Full automation",
      copy: "Cells, metrology, feedback",
    },
    {
      icon: "/mission/dollar-alt.svg",
      label: "Lower cost",
      copy: "Dense cells, less labor",
    },
  ];

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 w-full h-full overflow-hidden origin-center"
        style={{
          y: gridY,
        }}
      >
        <motion.div
          className="absolute w-[160%] h-[160%] -top-[30%] -left-[30%]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--grid) 1px, transparent 1px), linear-gradient(to bottom, var(--grid) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
          animate={{
            x: [0, 32],
            y: [0, 32],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center min-h-screen max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-20 gap-12">
        <motion.div
          className="flex items-center justify-center lg:justify-start order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{
            y: shapeY,
          }}
        >
          <div className="relative w-full max-w-[520px] lg:max-w-[580px] aspect-square panel rounded-[28px] overflow-hidden">
            <div
              className="absolute inset-0 grid-overlay opacity-80"
              aria-hidden
            />
            <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent" />
            <Image
              src="/halow.svg"
              alt="3D Wireframe Shape"
              fill
              className="object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#7af0e3] to-transparent" />
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-start order-1 lg:order-2 gap-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          style={{ y: contentY }}
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-[0.2em] text-white/70">
            <span className="w-2 h-2 rounded-full bg-[#7af0e3]" />
            Our Mission
          </div>

          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Accelerated advanced manufacturing with an AI-first grid.
          </h2>

          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
            We launch and operate dense, automated cells across North America so
            defense and space teams can build precision components without the
            human bottleneck. CAM, machines, and metrology run as one
            continuously learning system.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                className="panel rounded-xl px-4 py-3 border border-white/10 flex flex-col gap-1"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 * index }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={feature.icon}
                    alt={feature.label}
                    width={22}
                    height={22}
                    className="invert opacity-90"
                  />
                  <p className="text-xs uppercase tracking-[0.16em] text-white/70">
                    {feature.label}
                  </p>
                </div>
                <p className="text-sm text-white/70">{feature.copy}</p>
                <div className="mt-2 h-px w-full bg-linear-to-r from-transparent via-[#7af0e3] to-transparent" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
