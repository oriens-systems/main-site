"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import Button from "./Button";

// Dynamic imports for 3D components
const WireframeSatellite = dynamic(() => import("./WireframeSatellite"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border border-[var(--foreground)]/20 border-t-[var(--accent)] rounded-full animate-spin" />
    </div>
  ),
});

const WireframeShield = dynamic(() => import("./WireframeShield"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border border-[var(--foreground)]/20 border-t-[var(--accent)] rounded-full animate-spin" />
    </div>
  ),
});

const WireframeFusionReactor = dynamic(
  () => import("./WireframeFusionReactor"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border border-[var(--foreground)]/20 border-t-[var(--accent)] rounded-full animate-spin" />
      </div>
    ),
  },
);

// Interactive Card Component with 3D tilt physics
function InteractiveCard({ sector, index, hoveredCard, setHoveredCard }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config for smooth physics
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate rotation based on mouse position (max 8 degrees)
    const rotX = ((e.clientY - centerY) / (rect.height / 2)) * -8;
    const rotY = ((e.clientX - centerX) / (rect.width / 2)) * 8;

    rotateX.set(rotX);
    rotateY.set(rotY);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHoveredCard(null);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-default perspective-1000"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Card Body with 3D transform */}
      <motion.div
        className="relative h-full bg-[var(--background-2)] border border-[var(--foreground)]/5 rounded-xl overflow-hidden transition-colors duration-500 hover:border-[var(--accent)]/30"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Spotlight effect following mouse */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
          style={{
            background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(139,92,246,0.1), transparent 40%)`,
          }}
        />

        {/* 3D Container - Clean */}
        <div className="h-[240px] w-full bg-[#0a0f1c] relative flex items-center justify-center">
          {/* Subtle inner shadow for depth */}
          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] pointer-events-none z-10" />
          <sector.WireframeComponent />
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <motion.div
              className={`p-2 rounded-lg transition-colors duration-300 ${
                hoveredCard === index
                  ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "bg-[var(--foreground)]/5 text-[var(--muted)]"
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {sector.icon}
            </motion.div>
            <span className="text-[10px] uppercase tracking-widest text-[var(--foreground)]/20 font-mono">
              0{index + 1}
            </span>
          </div>

          <h3 className="text-xl font-medium text-[var(--foreground)] mb-3">
            {sector.title}
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            {sector.description}
          </p>
        </div>

        {/* Hover Line with spring physics */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent)]"
          initial={{ width: "0%", opacity: 0 }}
          animate={{
            width: hoveredCard === index ? "100%" : "0%",
            opacity: hoveredCard === index ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Differentiation() {
  const sectionRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Spring physics for background orbs
  const springConfig = { damping: 50, stiffness: 100 };
  const orbX = useSpring(0, springConfig);
  const orbY = useSpring(0, springConfig);
  const orb2X = useSpring(0, { damping: 60, stiffness: 80 });
  const orb2Y = useSpring(0, { damping: 60, stiffness: 80 });

  // Track mouse position for background interactivity
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();

      // Only track if mouse is within section
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const x = (e.clientX / window.innerWidth - 0.5) * 100;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;

        orbX.set(x * 0.5);
        orbY.set(y * 0.3);
        orb2X.set(-x * 0.3);
        orb2Y.set(-y * 0.4);
        setMousePosition({ x: e.clientX, y: e.clientY - rect.top });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [orbX, orbY, orb2X, orb2Y]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);

  const sectors = [
    {
      id: "aerospace",
      title: "Aerospace",
      description:
        "Precision components for rockets and satellites where microns matter.",
      icon: (
        <svg
          width="24"
          height="24"
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
      WireframeComponent: WireframeSatellite,
    },
    {
      id: "defense",
      title: "Defense",
      description:
        "Mission-critical parts with zero margin for error and built-in security.",
      icon: (
        <svg
          width="24"
          height="24"
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
      WireframeComponent: WireframeShield,
    },
    {
      id: "energy",
      title: "Energy",
      description:
        "Complex geometries for fusion systems powering the next generation.",
      icon: (
        <svg
          width="24"
          height="24"
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
      WireframeComponent: WireframeFusionReactor,
    },
  ];

  return (
    <section
      id="differentiation"
      ref={sectionRef}
      className="relative w-full overflow-hidden pt-8 pb-24 lg:pt-12 lg:pb-32"
    >
      {/* Interactive Background Orbs - Follow mouse with physics */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--accent)]/8 rounded-full blur-[120px] pointer-events-none"
        style={{
          x: orbX,
          y: orbY,
        }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent)]/6 rounded-full blur-[100px] pointer-events-none"
        style={{
          x: orb2X,
          y: orb2Y,
        }}
        aria-hidden
      />

      {/* Background Grids - Matching other sections */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        aria-hidden
      >
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10"
        style={{ y: contentY }}
      >
        {/* Our Mission Section */}
        <div className="mb-40 lg:mb-56 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3 mb-8"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              Our Mission
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-light text-white/80 italic mb-10 whitespace-nowrap"
          >
            "Safeguarding humanity through precision."
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button href="/contact" variant="primary" size="lg">
              Get in Touch
            </Button>
          </motion.div>
        </div>

        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-6 border-b border-[var(--foreground)]/10 pb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                Core Sectors
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white tracking-tight"
            >
              Engineering <br className="hidden md:block" /> the{" "}
              <span className="text-[var(--accent)]">Impossible</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[var(--muted)] max-w-sm text-sm md:text-base leading-relaxed"
          >
            We specialize in creating the systems necessary for industries to
            manufacture components where precision and efficiency are the only
            variables that matter.
          </motion.p>
        </div>

        {/* Cards with Interactive Physics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sectors.map((sector, index) => (
            <InteractiveCard
              key={sector.id}
              sector={sector}
              index={index}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
