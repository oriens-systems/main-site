"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroShapeY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroShapeScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroShapeOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bottomOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#1E0C33]"
    >
      {/* Animated Background SVG with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/background.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          y: backgroundY,
        }}
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Hero 3D Shape with Parallax */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[40%] md:w-[45%] lg:w-[50%] h-[80%] pointer-events-none"
        style={{
          y: heroShapeY,
          scale: heroShapeScale,
          opacity: heroShapeOpacity,
        }}
      >
        <Image
          src="/hero.svg"
          alt="3D Wireframe Shape"
          fill
          className="object-contain object-right"
          priority
        />
      </motion.div>

      {/* Content with Parallax */}
      <motion.div
        className="relative z-10 flex flex-col items-start justify-center min-h-screen px-8 md:px-12 lg:px-16 max-w-[1800px] mx-auto"
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <div className="-mt-16 md:-mt-20">
          {/* Subtitle */}
          <p className="text-white/80 text-sm md:text-base lg:text-lg font-semibold tracking-[0.3em] uppercase mb-4">
            Manufacturing the Future
          </p>

          {/* Main Headlines */}
          <h1 className="flex flex-col gap-0">
            <span className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-[0.95] tracking-tight">
              Reindustrializing
            </span>
            <span className="text-[#5900A7] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-[0.95] tracking-[0.2em] md:tracking-[0.3em]">
              North America
            </span>
          </h1>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 px-8 md:px-12 lg:px-16"
          style={{ opacity: bottomOpacity }}
        >
          <div className="max-w-[1800px] mx-auto flex flex-col items-center">
            <p className="text-white text-center text-sm md:text-base lg:text-lg max-w-2xl mb-6">
              We&apos;re building the next generation of factories to accelerate
              the pace of advanced manufacturing
            </p>

            {/* Scroll Indicator */}
            <motion.div
              className="opacity-60"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/angle-down.svg"
                alt="Scroll down"
                width={32}
                height={32}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
