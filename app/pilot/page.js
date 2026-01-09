"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../components/Header";
import WireframeToolpath from "../components/WireframeToolpath";
import Button from "../components/Button";

export default function PilotPage() {
  return (
    <main className="relative min-h-screen bg-[#05070f] overflow-hidden text-[#e2e8f0]">
      <Header />
      {/* Animated grid background - matching homepage */}
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
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "300px 300px",
            backgroundPosition: "0 0",
          }}
        />
      </div>

      {/* Gradient orbs - matching homepage */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8b5cf6]/8 rounded-full blur-[120px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9f7aea]/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden
      />

      {/* 3D Toolpath Background - Subtle & Ambient */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none">
        <WireframeToolpath speed={0.2} isActive={true} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 px-6">
        
        {/* Central Messaging Block */}
        <div className="max-w-3xl w-full text-center space-y-8 mb-12">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                Pilot Program Authorization
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
            >
                Precision is <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#d8b4fe]">
                    Survival.
                </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
            >
                Partnership with Ontario Centre of Innovation.<br/>
                We are currently accepting applications for our pilot program.
            </motion.p>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
            >
                <Button 
                    href="mailto:hello@suprnova.co?subject=Pilot Program Application"
                    variant="primary"
                    size="lg"
                >
                    Apply for Pilot
                </Button>
            </motion.div>
        </div>

        {/* Footer Meta */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center"
        >
            <p className="text-xs text-white/20 font-mono">
                SECURE CONNECTION • ENCRYPTED
            </p>
        </motion.div>

      </div>
    </main>
  );
}


