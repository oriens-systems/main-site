"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Bottleneck() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["30%", "-10%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["20%", "-5%"]);

  const cards = [
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="16" fill="#5900A7" />
          <path
            d="M20 12V22"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="20" cy="27" r="2" fill="white" />
        </svg>
      ),
      title: "The Problem",
      description:
        "Manufacturing progress is slowed by tedious, manual CAM programming, leading to production bottlenecks and delays.",
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 8L22.5 15.5H30L24 20L26.5 28L20 23L13.5 28L16 20L10 15.5H17.5L20 8Z"
            fill="#5900A7"
          />
          <path
            d="M30 10L31 13H34L31.5 15L32.5 18L30 16L27.5 18L28.5 15L26 13H29L30 10Z"
            fill="#5900A7"
          />
          <path
            d="M12 6L13 9H16L13.5 11L14.5 14L12 12L9.5 14L10.5 11L8 9H11L12 6Z"
            fill="#5900A7"
          />
        </svg>
      ),
      title: "The Solution",
      description:
        "Supernova's AI-driven automation eliminates manual programming, generating production-ready G-code directly from your STEP file.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#1E0C33] py-24 lg:py-32"
    >
      {/* Ribbon SVG Background with Text */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: gridY }}
      >
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Path Definitions for Text */}
          <defs>
            <path
              id="ribbon-path-1"
              d="M-100,100 C200,50 300,200 500,150 S700,250 900,180 S1100,300 1400,200"
            />
            <path
              id="ribbon-path-2"
              d="M-50,400 C150,350 250,500 450,400 S650,550 850,450 S1050,600 1350,500"
            />
            <path
              id="ribbon-path-3"
              d="M-100,650 C100,600 200,750 400,680 S600,800 800,700 S1000,850 1400,750"
            />
            <path
              id="ribbon-path-4"
              d="M1300,100 C1000,200 800,100 600,250 S300,150 100,300 S-100,200 -300,350"
            />
          </defs>

          {/* Ribbon 1 with Text - Animated */}
          <motion.g
            animate={{
              y: [0, -20, 0, 20, 0],
              x: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <use href="#ribbon-path-1" fill="none" stroke="url(#ribbon-gradient-1)" strokeWidth="50" strokeLinecap="round" />
            <text fill="rgba(255,255,255,0.15)" fontSize="14" fontWeight="bold" letterSpacing="8">
              <textPath href="#ribbon-path-1" startOffset="0%">
                SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA •
              </textPath>
            </text>
          </motion.g>
          
          {/* Ribbon 2 with Text - Animated */}
          <motion.g
            animate={{
              y: [0, 25, 0, -25, 0],
              x: [0, -15, 0, 15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <use href="#ribbon-path-2" fill="none" stroke="url(#ribbon-gradient-2)" strokeWidth="45" strokeLinecap="round" />
            <text fill="rgba(255,255,255,0.12)" fontSize="12" fontWeight="bold" letterSpacing="6">
              <textPath href="#ribbon-path-2" startOffset="10%">
                SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA •
              </textPath>
            </text>
          </motion.g>
          
          {/* Ribbon 3 with Text - Animated */}
          <motion.g
            animate={{
              y: [0, -15, 0, 15, 0],
              x: [0, 20, 0, -20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <use href="#ribbon-path-3" fill="none" stroke="url(#ribbon-gradient-3)" strokeWidth="40" strokeLinecap="round" />
            <text fill="rgba(255,255,255,0.1)" fontSize="11" fontWeight="bold" letterSpacing="5">
              <textPath href="#ribbon-path-3" startOffset="5%">
                SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA •
              </textPath>
            </text>
          </motion.g>

          {/* Ribbon 4 with Text - Animated */}
          <motion.g
            animate={{
              y: [0, 18, 0, -18, 0],
              x: [0, -12, 0, 12, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <use href="#ribbon-path-4" fill="none" stroke="url(#ribbon-gradient-4)" strokeWidth="35" strokeLinecap="round" />
            <text fill="rgba(255,255,255,0.08)" fontSize="10" fontWeight="bold" letterSpacing="4">
              <textPath href="#ribbon-path-4" startOffset="0%">
                SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA • SUPRNOVA •
              </textPath>
            </text>
          </motion.g>

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="ribbon-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5900A7" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#5900A7" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="ribbon-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#5900A7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#9333EA" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="ribbon-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333EA" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#5900A7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="ribbon-gradient-4" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#5900A7" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#9333EA" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">
        {/* Title Section */}
        <motion.div
          className="text-center mb-16 lg:mb-24"
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6">
            The Bottleneck in Modern Manufacturing
          </h2>
          <p className="text-white/60 text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Traditional manufacturing is hampered by slow manual programming, a
            growing skilled labor shortage, and fragile supply chains. These
            hurdles stifle innovation and slow progress.
          </p>
        </motion.div>

        {/* Cards Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          style={{ y: cardsY }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className="relative p-8 lg:p-10 rounded-2xl bg-[#2A1245] backdrop-blur-sm border border-[#5900A7]/30 hover:border-[#5900A7]/50 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Icon */}
              <div className="mb-6">{card.icon}</div>

              {/* Title */}
              <h3 className="text-white text-xl md:text-2xl font-semibold mb-4">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-base md:text-lg leading-relaxed font-light">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

