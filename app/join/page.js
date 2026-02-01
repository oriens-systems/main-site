"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";

// Simple minimal 3D background
const WireframeMinimal = dynamic(() => import("../components/WireframeMinimal"), {
  ssr: false,
  loading: () => null,
});

// Text Scramble Effect Component
function ScrambleText({ text, className }) {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(text.split("").map((letter, index) => {
                if (index < iterations) return text[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(""));
            
            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [text]);

    return <span className={className}>{display}</span>;
}

// System Log Component for background atmosphere
function SystemLog() {
    const [lines, setLines] = useState([]);
    const containerRef = useRef(null);
    
    useEffect(() => {
        const logs = [
            "INITIALIZING NETWORK CONNECTION...",
            "AUTHENTICATING USER credentials...",
            "ESTABLISHING SECURE UPLINK...",
            "LOADING MODULE: MISSION_BRIEF",
            "SCANNING FOR SKILLSETS...",
            "OPTIMIZING NEURAL PATHWAYS...",
            "DECRYPTING MISSION DATA...",
            "READY."
        ];
        
        let index = 0;
        const interval = setInterval(() => {
            if (index < logs.length) {
                setLines(prev => [...prev, logs[index]].slice(-6));
                index++;
            } else {
                if(Math.random() > 0.7) {
                    setLines(prev => [...prev, `KeepAlive: ${Math.random().toFixed(4)}`].slice(-6));
                }
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className="absolute bottom-6 left-6 font-mono text-[10px] text-[#8b5cf6]/30 leading-relaxed pointer-events-none select-none z-0">
            {lines.map((line, i) => (
                <div key={i} className="log-line opacity-0">
                    {`> ${line}`}
                </div>
            ))}
        </div>
    );
}

export default function JoinPage() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const cardRef = useRef(null);
  const footerRef = useRef(null);

  // Mouse tilt effect with GSAP
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleMouseMove = (e) => {
      const rect = content.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = (mouseX / width - 0.5) * 2;
      const yPct = (mouseY / height - 0.5) * 2;

      gsap.to(content, {
        rotateX: -yPct * 5,
        rotateY: xPct * 5,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000
      });
    };

    const handleMouseLeave = () => {
      gsap.to(content, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const section = containerRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for staggered entry
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      );

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.5"
      );

      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );

      tl.fromTo(cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );

      tl.fromTo(footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );

      // Animate log lines as they appear
      gsap.to(".log-line", {
        opacity: 1,
        duration: 0.3,
        stagger: 0.1
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#030305] selection:bg-[#8b5cf6]/50 overflow-hidden font-sans">
      <Header />

      {/* Cinematic Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         {/* Noise / Grain Overlay */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
         
         {/* Deep Atmospheric Glows */}
         <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-purple-900/10 rounded-full blur-[150px] animate-pulse-slow" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-indigo-900/10 rounded-full blur-[150px] animate-pulse-slow delay-700" />

         {/* Grid */}
         <div className="absolute inset-0 opacity-10">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
         </div>
         
        {/* 3D Wireframe */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen perspective-1000">
            <WireframeMinimal />
        </div>
        
         <SystemLog />
      </div>

      {/* Main Content Area */}
      <section ref={containerRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div 
            ref={contentRef}
            className="max-w-4xl w-full group opacity-0"
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Mission Status Badge */}
            <div ref={badgeRef} className="flex justify-center mb-12 opacity-0" style={{ transform: "translateZ(40px)" }}>
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500" />
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.3em] text-white/70">
                        STATUS: IN DEVELOPMENT
                    </span>
                </div>
            </div>

            {/* Headline with Scramble Effect */}
            <div ref={headlineRef} style={{ transform: "translateZ(60px)" }} className="text-center mb-16 relative opacity-0">
                 {/* Glow behind text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-purple-500/20 blur-[80px] -z-10" />
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-2">
                    <ScrambleText text="JOIN THE" className="inline text-white mr-3" />
                    <span className="inline text-[#8b5cf6]">
                        MISSION
                    </span>
                </h1>
            </div>

            {/* Glass Card */}
            <div 
                ref={cardRef}
                className="relative mx-auto max-w-2xl p-[1px] bg-gradient-to-b from-white/10 via-transparent to-transparent rounded-3xl opacity-0"
                style={{ transform: "translateZ(20px)" }}
            >
                <div className="relative bg-[#0a0a0c]/80 backdrop-blur-2xl rounded-3xl p-10 md:p-14 border border-white/5 shadow-2xl">
                    <p className="text-lg md:text-xl text-center text-white/60 font-light leading-relaxed mb-10">
                        "We're not hiring yet, but we're always interested in connecting with people who care about <span className="text-white font-medium">manufacturing</span>, <span className="text-white font-medium">AI</span>, and <span className="text-white font-medium">building critical infrastructure</span>."
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button 
                            href="mailto:hello@suprnova.co?subject=Joining the Mission" 
                            variant="primary" 
                            size="lg"
                            className="w-full sm:w-auto min-w-[220px] shadow-[0_0_50px_rgba(139,92,246,0.3)]"
                        >
                            INITIATE CONTACT
                        </Button>
                    </div>
                </div>
            </div>

        </div>

        {/* Footer Meta */}
        <div ref={footerRef} className="flex flex-col items-center mt-8 opacity-0">
            <p className="text-xs text-white/20 font-mono">
                SECURE CONNECTION • ENCRYPTED
            </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}