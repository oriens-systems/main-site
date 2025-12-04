"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Mission() {
  const features = [
    { icon: "/mission/bolt-alt.svg", label: "HIGH SPEED" },
    { icon: "/mission/Group 12.svg", label: "FULL AUTOMATION" },
    { icon: "/mission/dollar-alt.svg", label: "LOWER COST" },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#1E0C33]">
      {/* Grid Background - Rotated & Animated */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          transform: "rotate(8deg) scale(1.3)",
          transformOrigin: "center center",
        }}
      >
        <motion.div
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{
            x: [0, 50],
            y: [0, 50],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen max-w-[1800px] mx-auto px-8 md:px-12 lg:px-16 py-20 gap-8">
        {/* Left Side - 3D Shape */}
        <motion.div
          className="flex items-center justify-center lg:justify-start order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative w-full max-w-[500px] lg:max-w-[600px] aspect-square">
            <Image
              src="/halow.svg"
              alt="3D Wireframe Shape"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          className="flex flex-col items-start order-1 lg:order-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 mb-8">
            <div className="w-3 h-3 rounded-full bg-[#5900A7]" />
            <span className="text-white text-sm font-ligh tracking-wider uppercase">
              Our Mission
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6">
            Accelerated Advanced
            <br />
            Manufacturing
          </h2>

          {/* Description */}
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-light">
            A limited network of owner-operated machine shops is slowing down
            North America&apos;s Space & Defense industry by restricting the
            supply of precision metal components. Suprnova is launching a
            network of advanced, automated factories across Canada and the US to
            help Space & Defense manufacturers get precision components faster
            and at half the cost for rockets, satellites, jets, and drones.
          </p>

          {/* Feature Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                className="flex items-center gap-3 px-6 py-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={feature.icon}
                  alt={feature.label}
                  width={24}
                  height={24}
                />
                <span className="text-[#5900A7] font-semibold text-sm tracking-wide">
                  {feature.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
