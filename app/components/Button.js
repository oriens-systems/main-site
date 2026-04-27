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
    "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all cursor-pointer";

  const variants = {
    primary:
      "bg-white hover:bg-white/90 text-black border border-transparent",
    secondary:
      "bg-transparent hover:bg-white/5 text-white border border-white/30 hover:border-white/50",
    outline:
      "bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40",
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
