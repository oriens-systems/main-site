"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interactive Card Component with GSAP animations
function InteractiveCard({ sector, index, hoveredCard, setHoveredCard, cardRef }) {
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
      className="relative group cursor-default card-item opacity-0 translate-y-5"
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
  const missionBadgeRef = useRef(null);
  const missionTextRef = useRef(null);
  const missionButtonRef = useRef(null);
  const headerBadgeRef = useRef(null);
  const headerTitleRef = useRef(null);
  const headerDescRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Scroll-triggered animations
  useEffect(() => {
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

      // Mission section animations
      gsap.fromTo(missionBadgeRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: missionBadgeRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(missionTextRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.1,
          scrollTrigger: {
            trigger: missionTextRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(missionButtonRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: missionButtonRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

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

      gsap.fromTo(headerTitleRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.1,
          scrollTrigger: {
            trigger: headerTitleRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(headerDescRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: headerDescRef.current,
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
  }, []);

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
      className="relative w-full pt-8 pb-24 lg:pt-12 lg:pb-32"
    >
      {/* Static Background Orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--accent)]/8 rounded-full blur-[120px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent)]/6 rounded-full blur-[100px] pointer-events-none"
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
              linear-gradient(rgba(var(--accent-rgb), 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--accent-rgb), 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0",
          }}
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 -mt-6"
      >
        {/* Our Mission Section */}
        <div className="mt-20 mb-16 lg:mt-[-300px] lg:mb-24 text-center">
          <div
            ref={missionBadgeRef}
            className="flex items-center gap-4 mb-12 lg:mb-16 opacity-0"
          >
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              Our Mission
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <p
            ref={missionTextRef}
            className="mx-auto max-w-xs sm:max-w-md text-2xl md:text-3xl lg:text-4xl font-light text-white/80 mb-12 lg:mb-16 whitespace-normal opacity-0"
          >
            Safeguarding humanity through precision.
          </p>
          {/* <div ref={missionButtonRef} className="opacity-0">
            <Button href="/contact" variant="primary" size="lg">
              GET IN TOUCH
            </Button>
          </div> */}
        </div>

        {/* Header */}
        <div
          ref={headerBadgeRef}
          className="flex items-center gap-4 mb-8 opacity-0"
        >
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs uppercase tracking-[0.2em] text-white/60">
            Core Sectors
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-6 border-b border-[var(--foreground)]/10 pb-8">
          <div>
            <h2
              ref={headerTitleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white tracking-tight opacity-0"
            >
              Built for industries that don't
              accept tradeoffs 
              {/* <br className="hidden md:block" /> the{" "}
              <span className="text-[var(--accent)]">Impossible</span> */}
            </h2>
          </div>
          <p
            ref={headerDescRef}
            className="text-[var(--muted)] max-w-sm text-sm md:text-base leading-relaxed opacity-0"
          >
            We specialize in autonomous manufacturing and AI in manufacturing — creating the systems necessary for industries and autonomous factories to manufacture components where precision and efficiency are the only variables that matter.
          </p>
        </div>

        {/* Cards with GSAP animations */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sectors.map((sector, index) => (
            <InteractiveCard
              key={sector.id}
              sector={sector}
              index={index}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              cardRef={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}