"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
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
                setLines(prev => [...prev, logs[index]].slice(-6)); // Keep last 6 lines
                index++;
            } else {
                 // Random background chatter
                 if(Math.random() > 0.7) {
                     setLines(prev => [...prev, `KeepAlive: ${Math.random().toFixed(4)}`].slice(-6));
                 }
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute bottom-6 left-6 font-mono text-[10px] text-[#8b5cf6]/30 leading-relaxed pointer-events-none select-none z-0">
            {lines.map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {`> ${line}`}
                </motion.div>
            ))}
        </div>
    );
}

export default function JoinPage() {
  // Mouse tilt logic
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ["5deg", "-5deg"]); // Reduced tilt for subtlety
  const rotateY = useTransform(x, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <main className="relative min-h-screen bg-[#030305] selection:bg-[#8b5cf6]/50 overflow-hidden font-sans" 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
    >
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
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20" ref={ref}>
        <motion.div 
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d" 
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-4xl w-full perspective-1000 group"
        >
            {/* Mission Status Badge */}
            <div className="flex justify-center mb-12" style={{ transform: "translateZ(40px)" }}>
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
            <div style={{ transform: "translateZ(60px)" }} className="text-center mb-16 relative">
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
                className="relative mx-auto max-w-2xl p-[1px] bg-gradient-to-b from-white/10 via-transparent to-transparent rounded-3xl"
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

        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
