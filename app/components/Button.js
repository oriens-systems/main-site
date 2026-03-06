"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Reusable Button component for CTAs throughout the site
 * @param {string} href - URL or mailto link. If omitted, renders a <button>
 * @param {string} variant - 'primary' | 'secondary' | 'outline'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} external - Opens in new tab if true
 * @param {React.ReactNode} children - Button content
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  external = false,
  children,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-bold tracking-wide transition-all rounded-xl cursor-pointer";

  const variants = {
    primary:
      "bg-[var(--accent)] hover:bg-[var(--accent-button-hover)] text-white shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] hover:scale-105 border border-transparent",
    secondary:
      "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.05)]",
    outline:
      "bg-transparent hover:bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 hover:border-[var(--accent)]/50",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  // 1. Render as interactive <button> if no href is provided
  if (!href) {
    return (
      <motion.button
        className={combinedStyles}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }

  // 2. Render as External Link
  const isExternal = external || href.startsWith("mailto:") || href.startsWith("http");

  if (isExternal) {
    return (
      <motion.a
        href={href}
        className={combinedStyles}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  // 3. Render as Internal Link
  return (
    <Link href={href} className={combinedStyles} {...props}>
      {children}
    </Link>
  );
}
