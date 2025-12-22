"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    // { name: "Technology", href: "/technology" },
    // { name: "Applications", href: "/applications" },
    // { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-6">
        <nav className="panel rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between border border-white/10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 md:w-12 md:h-12 relative">
              <Image
                src="/logo.png"
                alt="Suprnova Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-white text-base md:text-lg font-semibold tracking-[0.18em]">
              SUPR<span className="text-[#8b5cf6]">NOVA</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm text-white/70 uppercase tracking-[0.16em]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] uppercase tracking-[0.18em] text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
              AI native
            </div>
            <Link
              href="/contact"
              className="hidden sm:block text-xs md:text-sm font-semibold text-[#8b5cf6] border border-[#8b5cf6]/60 rounded-full px-3 md:px-4 py-2 hover:bg-[#8b5cf6]/10 transition-colors"
            >
              Get Started
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileMenuOpen ? (
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="M3 12h18M3 6h18M3 18h18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 panel rounded-xl border border-white/10 overflow-hidden"
            >
              <div className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2 mt-2 border-t border-white/6">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-semibold text-[#8b5cf6] bg-[#8b5cf6]/10 text-center"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
