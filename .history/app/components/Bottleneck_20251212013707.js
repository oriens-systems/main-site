"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Bottleneck() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const dotsY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["10%", "-4%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["12%", "-6%"]);

  const cards = [
    {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 4L4 44H44L24 4Z"
            stroke="#7AF0E3"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M24 8L8 40H40L24 8Z"
            stroke="#7AF0E3"
            strokeWidth="0.5"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M24 18V28"
            stroke="#7AF0E3"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <rect x="22" y="32" width="4" height="4" fill="#7AF0E3" />
          <line
            x1="12"
            y1="36"
            x2="36"
            y2="36"
            stroke="#7AF0E3"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <line
            x1="16"
            y1="32"
            x2="32"
            y2="32"
            stroke="#7AF0E3"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </svg>
      ),
      title: "The bottleneck",
      description:
        "Manual CAM and tribal machine knowledge keep critical hardware trapped in queues. Delivery slips, risk stacks up, and production loses cadence.",
    },
    {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#7AF0E3"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="24"
            cy="24"
            r="14"
            stroke="#7AF0E3"
            strokeWidth="0.5"
            fill="none"
            opacity="0.5"
          />
          <circle
            cx="24"
            cy="24"
            r="8"
            stroke="#7AF0E3"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="24" cy="24" r="3" fill="#7AF0E3" />
          <line
            x1="24"
            y1="2"
            x2="24"
            y2="12"
            stroke="#7AF0E3"
            strokeWidth="1.5"
          />
          <line
            x1="24"
            y1="36"
            x2="24"
            y2="46"
            stroke="#7AF0E3"
            strokeWidth="1.5"
          />
          <line
            x1="2"
            y1="24"
            x2="12"
            y2="24"
            stroke="#7AF0E3"
            strokeWidth="1.5"
          />
          <line
            x1="36"
            y1="24"
            x2="46"
            y2="24"
            stroke="#7AF0E3"
            strokeWidth="1.5"
          />
          <path
            d="M8 8L14 8L14 14"
            stroke="#7AF0E3"
            strokeWidth="0.5"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M40 8L34 8L34 14"
            stroke="#7AF0E3"
            strokeWidth="0.5"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M8 40L14 40L14 34"
            stroke="#7AF0E3"
            strokeWidth="0.5"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M40 40L34 40L34 34"
            stroke="#7AF0E3"
            strokeWidth="0.5"
            fill="none"
            opacity="0.6"
          />
        </svg>
      ),
      title: "The grid",
      description:
        "Suprnova collapses CAM, cells, and QC into a single grid. STEP in, verified G-code out, with live telemetry and closed-loop metrology keeping drift down.",
    },
  ];

  return (
    <section
      id="bottleneck"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden py-24 lg:py-32"
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ y: dotsY }}
      >
        <motion.div
          className="absolute w-[130%] h-[130%] -top-[15%] -left-[15%]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1.2px, transparent 1.2px)`,
            backgroundSize: "68px 68px",
          }}
          animate={{
            x: [0, 70],
            y: [0, 70],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="text-center mb-16 lg:mb-20"
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.22em] text-white/60 mb-3">
            <span className="h-px w-10 bg-white/25" />
            Single source of truth
            <span className="h-px w-10 bg-white/25" />
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
            Bridging the gap between CAD and certified metal.
          </h2>
          <p className="text-white/65 text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Every job runs on the same grid—toolpaths, machine state, and
            inspection data stay in sync. Teams ship more often with less noise.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6"
          style={{ y: cardsY }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className="group relative p-7 lg:p-8 panel rounded-3xl overflow-hidden border border-white/10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
            >
              <div
                className="absolute inset-0 grid-overlay opacity-40"
                aria-hidden
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_40px_rgba(122,240,227,0.16)]" />

              <div className="relative z-10">
                <div className="mb-5 relative">
                  <div className="absolute inset-0 blur-2xl bg-[#7AF0E3]/25 scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">{card.icon}</div>
                </div>

                <h3 className="text-white text-xl md:text-2xl font-semibold mb-3 tracking-wide">
                  <span className="text-[#7AF0E3] font-mono text-xs mr-2 opacity-70">
                    {`0${index + 1}`}_
                  </span>
                  {card.title}
                </h3>

                <p className="text-white/65 text-base md:text-lg leading-relaxed font-light">
                  {card.description}
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <div className="w-10 h-[2px] bg-[#7AF0E3]" />
                  <div className="w-4 h-[2px] bg-[#7AF0E3]/50" />
                  <div className="w-2 h-[2px] bg-[#7AF0E3]/25" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          id="contact"
          className="mt-14 panel rounded-3xl border border-white/10 px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">
              Next step
            </p>
            <h3 className="text-white text-2xl font-semibold">
              Want a tour of the grid?
            </h3>
            <p className="text-white/65 text-sm md:text-base max-w-xl">
              Walk through live cells, telemetry, and how we ship your parts
              faster than legacy shops.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:hello@suprnova.ai"
              className="rounded-full bg-[#7AF0E3]/10 border border-[#7AF0E3]/60 text-[#7AF0E3] px-5 py-3 text-sm font-semibold hover:bg-[#7AF0E3]/20 transition-colors"
            >
              hello@suprnova.ai
            </a>
            <a
              href="#mission"
              className="rounded-full border border-white/15 text-white/80 px-5 py-3 text-sm font-semibold hover:border-white/35 transition-colors"
            >
              View capabilities
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
