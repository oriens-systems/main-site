"use client";

import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";

export default function PilotContent() {
  return (
    <main className="relative min-h-screen bg-[#05070f] overflow-hidden text-[#e2e8f0]">
      <Header />
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

      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8b5cf6]/8 rounded-full blur-[120px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9f7aea]/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden
      />


      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 px-6">
        <div className="max-w-3xl w-full text-left space-y-8 mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] text-center"
          >
            Pilot{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#d8b4fe]">
              Program
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed"
          >
            We're partnering with the Ontario Centre of Innovation to validate
            our CAM automation. Details coming soon.

            <br />
            <br />

            We're currently in the process of developing a toolpath generation model before we open up our beta testing program
          </motion.p>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <Button
              href="mailto:hello@suprnova.co?subject=Pilot Program - Notify Me"
              variant="primary"
              size="lg"
            >
              NOTIFY ME
            </Button>
          </motion.div> */}
        </div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <p className="text-xs text-white/20 font-mono">
            SECURE CONNECTION • ENCRYPTED
          </p>
        </motion.div> */}
      </div>
      <Footer />
    </main>
  );
}