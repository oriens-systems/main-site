"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    // { name: "HOME", href: "/" },
    { name: "PILOT", href: "/interest" },
    { name: "WHO WE ARE", href: "/about" },
    { name: "JOIN THE MISSION", href: "/interest" },
    // { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-6">
        <nav className="panel rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between border border-white/10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-40 h-11 md:w-40 md:h-12 relative">
              <Image
                src="/logos/extended_logo.svg"
                alt="Oriens Systems Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* <span className="text-white text-base md:text-lg font-semibold tracking-[0.18em]">
              SUPR<span className="text-[var(--accent)]">NOVA</span>
            </span> */}
          </Link>

          {/* Desktop nav - now on the right */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-white/70 uppercase tracking-[0.12em]">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
