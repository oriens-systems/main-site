# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Suprnova corporate website built with **Next.js 16** (App Router), **React 19**, and **Tailwind CSS 4**. Heavy use of 3D visualizations (Three.js/React Three Fiber) and animation (Framer Motion, GSAP). Dark-themed, glassmorphic design with purple accent (`#8b5cf6`).

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build`
- **Start production:** `pnpm start`
- **Lint:** `pnpm lint` (ESLint with Next.js Core Web Vitals preset)

Package manager is **pnpm** (pnpm-lock.yaml present).

## Architecture

### Routing (App Router)

All routes live under `app/`. Each route folder contains:
- `page.js` — thin server component wrapper that exports metadata
- `*Content.js` — client component with all page logic and UI

Routes: `/` (home), `/about`, `/applications`, `/contact`, `/join`, `/pilot`

### Components (`app/components/`)

~47 shared components. Key categories:
- **Layout:** `Header.js`, `Footer.js`
- **UI:** `Button.js`, `SectionLabel.js`, `SpinnerComponent.js`
- **3D Visualizations:** `Wireframe*.js` prefix — all dynamically imported with `ssr: false` to avoid server-side Three.js errors
- **Sections:** `Hero.js`, `Differentiation.js`, `ProofPoints.js`, `Newsletter.js`, etc.

### Import Alias

`@/*` maps to the project root (configured in `jsconfig.json`). Example: `@/app/components/Header`.

### Styling

- Tailwind CSS 4 via `@tailwindcss/postcss`
- Design tokens defined as CSS custom properties in `app/globals.css` (e.g., `--background`, `--accent`, `--panel`)
- Glassmorphic panels with backdrop blur, grid overlays, glow effects
- Font: Poppins (loaded via `next/font/google`, variable `--font-poppins`)

### 3D Components Pattern

All Three.js components follow this pattern:
1. Dynamically imported in parent with `ssr: false` and a spinner fallback
2. Use `<Canvas>` with transparent background and low-power GL preferences
3. Animate via `useFrame()` hook
4. Load models from `public/` with `useGLTF()`

### Animation Stack

- **Framer Motion:** Scroll-linked transforms (`useScroll`, `useTransform`), viewport detection (`useInView`), staggered variants
- **GSAP + ScrollTrigger:** Used in `Differentiation.js` and other scroll-driven sections

### SEO

`layout.js` contains JSON-LD structured data (Organization + WebSite schemas), OpenGraph/Twitter meta, and canonical URLs. `robots.js` and `sitemap.js` handle SEO metadata exports.

## Key Conventions

- All interactive components use `"use client"` directive
- Page files (`page.js`) stay as server components; content components handle client logic
- 3D components must always be dynamically imported with `ssr: false`
- Responsive breakpoints use Tailwind's `md:` and `lg:` prefixes
- No global state management — local `useState` and props only
