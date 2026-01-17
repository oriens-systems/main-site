"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Dynamic import for 3D component to avoid SSR issues
const WireframeParticleField = dynamic(() => import("../components/WireframeParticleField"), {
  ssr: false,
  loading: () => null,
});

// Glitch/Classified Text Component
function ClassifiedText({ text }) {
    return (
        <div className="relative group cursor-default">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
            <span className="font-mono text-xs tracking-[0.2em] text-[#8b5cf6]">CLASSIFIED</span>
            <div className="h-12 w-48 bg-white/10 mt-2 rounded flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
                <span className="font-mono text-white/20 tracking-widest blur-[2px] select-none">
                    {text}
                </span>
                <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-red-500/50 animate-scan" />
            </div>
        </div>
    );
}

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="relative min-h-screen bg-[#05070f] selection:bg-[#8b5cf6]/30">
        
      {/* Animated grid background */}
      <div className="fixed inset-0 opacity-40 pointer-events-none z-0">
        <div className="fixed inset-0" style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
        }} />
        <div className="fixed inset-0" style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)`,
            backgroundSize: "300px 300px"
        }} />
      </div>

      <Header />

      {/* Section 1: One-Liner Hero */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden">
        
        {/* 3D Background - Particle Field */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 pointer-events-none opacity-60">
             <div className="absolute inset-0">
                <WireframeParticleField />
            </div>
        </motion.div>

        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8b5cf6]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9f7aea]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            {/* Tag */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/5 mb-10 backdrop-blur-md"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8b5cf6]">
                    Status: In Development
                </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.15]">
                <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="block"
                >
                    We're building the 
                </motion.span>
                <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50"
                >
                    automation layer
                </motion.span>
                <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="block text-2xl md:text-3xl lg:text-4xl mt-6 font-normal text-white/60 max-w-3xl mx-auto"
                >
                    that unlocks the manufacturing capacity necessary for a <span className="text-[#8b5cf6] font-medium">spacefaring future.</span>
                </motion.span>
            </h1>
        </div>
      </section>

      {/* Section 2: Team (Classified) */}
      <section className="relative py-32 border-t border-white/5 bg-[#05070f]/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
                <div>
                     <h2 className="text-3xl font-bold text-white mb-2">Our Team</h2>
                     <p className="text-white/40 font-mono text-sm">/// CLEARANCE LEVEL 5 REQUIRED</p>
                </div>
                <div className="px-4 py-2 border border-red-500/20 bg-red-500/5 rounded text-red-400 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    Access Restricted
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-xl border border-white/5 bg-white/2 hover:border-[#8b5cf6]/20 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6]/20 to-transparent" />
                                <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <span className="text-[10px] text-white/20 font-mono">ID_00{i}</span>
                        </div>
                        <ClassifiedText text={`REDACTED_NAME_0${i}`} />
                        <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                            <div className="h-2 w-12 bg-white/10 rounded-full" />
                            <div className="h-2 w-8 bg-white/10 rounded-full" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Section 3: Why (The Gap) */}
      <section className="relative py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              The <span className="text-[#8b5cf6]">Capacity Gap</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              North America has lost its manufacturing capacity. Skilled CAM programmers are retiring faster than they're replaced. We're building the tools to close that gap.
            </p>
            
            <p className="mt-12 text-sm font-mono text-[#8b5cf6]">
                &gt; SYSTEM SOLUTION: AUTONOMOUS CAM GENERATION
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8b5cf6]/10 via-[#05070f] to-[#05070f]" />
        <div className="max-w-xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">
            Help Close the Gap
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#8b5cf6] hover:bg-[#7c4fd4] text-white font-bold tracking-wide transition-all hover:scale-105 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
               >
                INITIATE CONTACT
               </Link>
               <Link
                 href="/"
                 className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-colors backdrop-blur-sm"
               >
                 VIEW MISSION
               </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
