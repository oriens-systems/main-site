"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const navigation = {
    main: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Pilot Program", href: "/pilot" },
      { name: "Join Us", href: "/join" },
      { name: "Contact", href: "/contact" },
    ],
    applications: [
      { name: "Aerospace", href: "/applications#aerospace" },
      { name: "Defense", href: "/applications#defense" },
      { name: "Energy", href: "/applications#energy" },
    ],
  };

  return (
    <footer className="relative w-full border-t border-white/6 bg-[#05070f]">
      {/* Factory ASCII background image */}
      <div
        className="absolute w-full pointer-events-none"

        style={{ bottom: "calc(100% - 30px)", zIndex: -1, left: "50px" }}
        aria-hidden
      >
        <img
          src="/images/FACTORY_ASCII.png"
          alt=""
          className="w-full block"
          style={{ filter: "invert(1)", opacity: 0.5, transform: "scale(1.5)", transformOrigin: "bottom left" }}
        />
      </div>

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Main footer content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-8">
            {/* Brand section */}
            <div className="lg:pr-8">
              {/* Logo */}
              <Link href="/" className="inline-block mb-6">
                <span className="text-2xl font-bold text-white tracking-tight">
                  [NAME]<span className="text-[#8b5cf6]">[SYSTEMS]</span>
                </span>
              </Link>

              {/* Mission statement */}
              <p className="text-base text-white/60 leading-relaxed mb-6 max-w-md">
                Rebuilding North America's manufacturing base through
                next-generation automation.
              </p>

              {/* Core tagline
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg border border-[#8b5cf6]/20 bg-[#8b5cf6]/5">
                <motion.span
                  className="w-2 h-2 rounded-full bg-[#8b5cf6]"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm text-white/70">
                  Reshoring industry ssstarts here.
                </span>
              </div> */}
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">
                Navigate
              </h4>
              <ul className="space-y-3">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 hover:text-[#8b5cf6] transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            {/* <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">
                Applications
              </h4>
              <ul className="space-y-3">
                {navigation.applications.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 hover:text-[#8b5cf6] transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Contact */}
            <div suppressHydrationWarning>
              <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">
                Contact
              </h4>
              <ul className="space-y-3" suppressHydrationWarning>
                <li key="contact-email">
                  <a
                    href="mailto:hello@suprnova.co"
                    className="text-sm text-[#8b5cf6] hover:text-[#a78bfa] transition-colors duration-200"
                  >
                    hello@suprnova.co
                  </a>
                </li>
                <li key="contact-location">
                  <span className="text-sm text-white/60">Toronto, ON</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">© 2026 [INSERT NAME]</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
