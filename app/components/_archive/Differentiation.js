"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interactive Card Component with GSAP animations
function InteractiveCard({ sector, index, hoveredCard, setHoveredCard, cardRef, isMobile }) {
  const lineRef = useRef(null);

  // Hover line animation
  useEffect(() => {
    if (lineRef.current) {
      if (hoveredCard === index) {
        gsap.to(lineRef.current, {
          width: "100%",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(lineRef.current, {
          width: "0%",
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  }, [hoveredCard, index]);

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={handleMouseLeave}
      className={`relative group cursor-default card-item ${isMobile ? "" : "opacity-0 translate-y-5"}`}
    >
      {/* Card Body */}
      <div className="relative h-full bg-[var(--background-2)] border border-[var(--foreground)]/5 rounded-xl overflow-hidden transition-colors duration-300 hover:border-[var(--accent)]/30">
        {/* 3D Container - Only render when component exists */}
        {sector.WireframeComponent && (
          <div className="h-[240px] w-full bg-[var(--background-4)] relative flex items-center justify-center">
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] pointer-events-none z-10" />
            <sector.WireframeComponent />
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div
              className={`p-2 rounded-lg transition-colors duration-300 ${
                hoveredCard === index
                  ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "bg-[var(--foreground)]/5 text-[var(--muted)]"
              }`}
            >
              {sector.icon}
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[var(--foreground)]/20 font-mono">
              0{index + 1}
            </span>
          </div>

          <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
            {sector.title}
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            {sector.description}
          </p>
        </div>

        {/* Hover Line */}
        <div
          ref={lineRef}
          className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent)] w-0 opacity-0"
        />
      </div>
    </div>
  );
}

export default function Differentiation() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const headerBadgeRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    if (isMobile) {
      return;
    }

    const ctx = gsap.context(() => {
      // Content parallax on scroll
      gsap.to(contentRef.current, {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Header animations
      gsap.fromTo(headerBadgeRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: headerBadgeRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo(cardRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

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
      WireframeComponent: null,
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
      WireframeComponent: null,
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
      WireframeComponent: null,
    },
  ];

  return (
    <section
      id="differentiation"
      ref={sectionRef}
      className="relative w-full pt-8 pb-24 lg:pt-12 lg:pb-32 bg-[#0a0a0a]"
    >

      <div
        ref={contentRef}
        className="relative z-10 mx-auto mt-24 max-w-[1240px] px-6 md:mt-32 md:px-10 lg:mt-40"
      >
        {/* Header */}
        <div
          ref={headerBadgeRef}
          className={`flex items-center gap-4 mb-8 ${isMobile ? "" : "opacity-0"}`}
        >
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs uppercase tracking-[0.2em] text-white/60">
            Core Sectors
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        {/* Sectors as horizontal rows */}
        <div ref={cardsContainerRef} className="space-y-0">
          {sectors.map((sector, index) => (
            <div
              key={sector.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`flex flex-col md:flex-row gap-6 md:gap-8 py-8 border-b border-white/8 ${isMobile ? "" : "opacity-0 translate-y-5"}`}
            >
              <div className="flex items-start gap-4 md:gap-6 flex-1">
                <span
                  className="text-[12px] text-white/25 font-mono mt-1"
                  style={{ minWidth: '24px' }}
                >
                  0{index + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl text-white/90 font-normal mb-2">
                    {sector.title}
                  </h3>
                  <p className="text-[14px] text-white/50 leading-relaxed">
                    {sector.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}