# Modern techy grid website redesign
_Exported on 12/14/2025 at 22:07:35 GMT+5:30 from Cursor (2.2.20)_

---

**User**

make the whole site visually appealing and techy grid like but minimal and scientific and modern

---

**Cursor**

Refreshed the whole site with a minimal, scientific grid aesthetic: new gradients, glass panels, and pared-back layouts across hero, mission, and bottleneck sections, plus a lightweight header/CTA.

- Global theme now uses deep navy gradients, neon accent, reusable grid/glass utilities, and tuned selection/typography to keep the “tech lab” feel consistent across pages.  
```3:72:app/globals.css
:root {
  --background: #05070f;
  --background-2: #0b1020;
  --foreground: #e7edf9;
  --muted: #9fb3c9;
  --accent: #7af0e3;
  --accent-2: #9f7aea;
  --grid: rgba(255, 255, 255, 0.06);
  --panel: rgba(255, 255, 255, 0.02);
}
...
.panel {
  background: var(--panel);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(14px);
}
```
- Hero rebuilt with grid overlays, floating glow dots, and a two-column layout that pairs concise messaging with the wireframe visualization and stat tiles.  
```15:101:app/components/Hero.js
const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
...
<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
  Minimal, autonomous factories for mission-critical hardware.
</h1>
...
<div className="relative rounded-[28px] panel overflow-hidden border border-white/10">
  <div className="absolute inset-0 grid-overlay opacity-70" aria-hidden />
  <div className="relative aspect-4/3">
    <Image src="/hero.svg" alt="Procedural hero visualization" fill />
  </div>
</div>
```
- Mission and bottleneck sections now share the grid/glass language, clearer copy, and CTA strip; added anchors for nav/booking flow.  
```56:133:app/components/Mission.js
<div className="relative w-full max-w-[520px] ... panel rounded-[28px] overflow-hidden">
  <div className="absolute inset-0 grid-overlay opacity-80" aria-hidden />
  <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent" />
  <Image src="/halow.svg" alt="3D Wireframe Shape" fill />
</div>
...
<h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
  Accelerated advanced manufacturing with an AI-first grid.
</h2>
```

Testing: Not run (visual changes only). Recommend reviewing in the existing `npm run dev` session to validate spacing and parallax on target breakpoints.

Navigation anchors: `#mission`, `#bottleneck`, and CTA at `#contact` are wired; header button uses “Book time”.

```css
:root {
  --background: #05070f;
  --background-2: #0b1020;
  --foreground: #e7edf9;
  --muted: #9fb3c9;
  --accent: #7af0e3;
  --accent-2: #9f7aea;
  --grid: rgba(255, 255, 255, 0.06);
  --panel: rgba(255, 255, 255, 0.02);
}
...
.panel {
  background: var(--panel);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(14px);
}
```

```javascript
const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
...
<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
  Minimal, autonomous factories for mission-critical hardware.
</h1>
...
<div className="relative rounded-[28px] panel overflow-hidden border border-white/10">
  <div className="absolute inset-0 grid-overlay opacity-70" aria-hidden />
  <div className="relative aspect-4/3">
    <Image src="/hero.svg" alt="Procedural hero visualization" fill />
  </div>
</div>
```

```javascript
<div className="relative w-full max-w-[520px] ... panel rounded-[28px] overflow-hidden">
  <div className="absolute inset-0 grid-overlay opacity-80" aria-hidden />
  <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent" />
  <Image src="/halow.svg" alt="3D Wireframe Shape" fill />
</div>
...
<h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
  Accelerated advanced manufacturing with an AI-first grid.
</h2>
```

---

**User**

improve the UI of the @app/components/Hero.js properly and make it look visually apealing and techy grid-overlay look

---

**Cursor**

### Plan
I’ll redesign the `Hero` section to feel more “techy + scientific”: stronger grid-overlay treatment, cleaner typographic hierarchy, polished CTAs, and a more “instrument panel / blueprint” right-side card with subtle scanline + telemetry micro-interactions—while keeping it minimal. I’ll then run a quick lint check on the updated file.

I’ll re-open `Hero.js` (your formatter changed some whitespace), then re-apply the patch using the exact current file context so the upgrade lands cleanly.

Updated `app/components/Hero.js` to look **more visually appealing, modern, and “techy grid-overlay”**:

- **Stronger hero hierarchy**: gradient-highlighted headline + tighter copy.
- **Tech chips + CTAs**: added capability chips and clean primary/secondary buttons.
- **Better “instrument panel” visual**: upgraded right card with denser grid, scanline animation, telemetry labels, and small status pills over the hero graphic.
- **Spacing fixes for fixed header**: switched to `pt-28/32/36` so the hero doesn’t feel cramped under the navbar.

No linter issues after the change.

---

**User**

still not looking good specially the boxes 

---

**Cursor**

Let me completely redesign the Hero with a cleaner, more minimal but techy aesthetic—removing clutter and making the boxes look properly polished:

```javascriptreact
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);

  const metrics = [
    { value: "5×", label: "Faster CAM" },
    { value: "42%", label: "Less drift" },
    { value: "24/7", label: "Uptime" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden"
    >
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{ y: gridY }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,240,227,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,240,227,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,240,227,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,240,227,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "300px 300px",
          }}
        />
      </motion.div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7af0e3]/8 rounded-full blur-[120px]" aria-hidden />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9f7aea]/10 rounded-full blur-[100px]" aria-hidden />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 lg:px-16 pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="flex flex-col items-center text-center gap-8">
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7af0e3] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7af0e3]" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              Grid online · North America
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.08] text-white tracking-tight">
              Autonomous factories
              <br />
              <span className="text-[#7af0e3]">for precision metal.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              One AI layer coordinates CAM, machining, and inspection—so defense
              and aerospace teams ship certified parts on cadence.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <a
              href="#contact"
              className="group relative px-6 py-3.5 rounded-full bg-[#7af0e3] text-[#050a12] font-semibold text-sm overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10">Request access</span>
            </a>
            <a
              href="#mission"
              className="px-6 py-3.5 rounded-full border border-white/15 text-white/80 font-medium text-sm hover:border-white/30 hover:text-white transition-all"
            >
              How it works
            </a>
          </motion.div>

          {/* Metrics row */}
          <motion.div
            className="flex items-center gap-8 md:gap-12 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {metrics.map((m, i) => (
              <div key={m.label} className="flex items-center gap-3">
                {i > 0 && <div className="w-px h-8 bg-white/10" />}
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.15em] text-white/50 mt-1">
                    {m.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero visual card */}
        <motion.div
          className="mt-16 md:mt-20 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
            {/* Inner grid texture */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(122,240,227,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(122,240,227,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
              aria-hidden
            />

            {/* Scanline effect */}
            <motion.div
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#7af0e3]/40 to-transparent"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              aria-hidden
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#7af0e3]/30 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#7af0e3]/30 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#7af0e3]/30 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#7af0e3]/30 rounded-br-2xl" />

            {/* Status bar */}
            <div className="relative flex items-center justify-between px-5 md:px-6 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7af0e3]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <span className="text-xs font-mono text-white/40 hidden sm:inline">
                  GRID_VIS_001
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/40">
                <span className="hidden sm:inline">48 cells active</span>
                <span className="font-mono text-[#7af0e3]/70">● LIVE</span>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[16/9] md:aspect-[2.2/1]">
              <Image
                src="/hero.svg"
                alt="Grid visualization"
                fill
                className="object-contain p-6 md:p-10"
                priority
              />
            </div>

            {/* Bottom bar */}
            <div className="relative flex items-center justify-between px-5 md:px-6 py-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-6 text-xs text-white/40">
                <span>
                  <span className="text-white/60">Δt</span> 2.4ms
                </span>
                <span>
                  <span className="text-white/60">σ</span> 0.003mm
                </span>
              </div>
              <div className="text-xs text-white/40">
                Synchronized · Real-time feedback
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="flex flex-col items-center gap-3 mt-12 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

```

```javascriptreact
className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3"
```

```javascriptreact
className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/8 bg-white/2"
```

```javascriptreact
className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-[#7af0e3]/40 to-transparent"
```

```javascriptreact
border-white/6
```

```javascriptreact
className="relative aspect-video md:aspect-[2.2/1]"
```

```javascriptreact
className="w-px h-8 bg-linear-to-b from-white/30 to-transparent"
```

Done! I've completely redesigned the Hero section with a **cleaner, more minimal but techy aesthetic**:

**Key improvements:**

1. **Centered layout** — Single-column hero with clear visual hierarchy instead of cluttered two-column
2. **Clean metrics row** — Simple inline stats with dividers instead of heavy boxed cards  
3. **Polished visual card** — The hero image now sits in a proper "instrument panel" frame with:
   - Subtle corner accent brackets (techy look)
   - Minimal top/bottom status bars
   - Smooth scanline animation
   - Inner grid texture
4. **Better grid background** — Two-layer grid (fine + coarse) with soft gradient orbs
5. **Cleaner typography** — Accent color on key phrase, better spacing
6. **Solid CTA** — Primary button with accent background, secondary outline button

The boxes are now **clean inline metrics** rather than heavy panels, and the main visual card has proper structure without being cluttered. Check it out in your dev server!

---

**User**

use a 3d sphere wireframe model intead of @public/hero.svg  using three.js. I have installed pnpm add three @react-three/fiber @react-three/drei

---

**Cursor**

I'll create a 3D wireframe sphere component and integrate it into the Hero. Let me update the Hero.js:

```javascriptreact
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function Sphere() {
  const meshRef = useRef();
  const wireframeRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = t * 0.15;
      wireframeRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* Main wireframe sphere */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2, 2]} />
          <meshBasicMaterial
            color="#7af0e3"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Inner sphere with lower detail */}
        <mesh ref={wireframeRef} scale={0.7}>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial
            color="#9f7aea"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Core glow */}
        <mesh scale={0.15}>
          <sphereGeometry args={[2, 16, 16]} />
          <meshBasicMaterial color="#7af0e3" transparent opacity={0.8} />
        </mesh>

        {/* Outer ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.8, 0.01, 16, 100]} />
          <meshBasicMaterial color="#7af0e3" transparent opacity={0.4} />
        </mesh>

        {/* Secondary ring */}
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.5, 0.008, 16, 80]} />
          <meshBasicMaterial color="#9f7aea" transparent opacity={0.25} />
        </mesh>

        {/* Latitude lines */}
        {[0.5, 1, 1.5].map((y, i) => (
          <group key={i}>
            <mesh position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[Math.sqrt(4 - y * y) - 0.01, Math.sqrt(4 - y * y), 64]} />
              <meshBasicMaterial
                color="#7af0e3"
                transparent
                opacity={0.15}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh position={[0, -y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[Math.sqrt(4 - y * y) - 0.01, Math.sqrt(4 - y * y), 64]} />
              <meshBasicMaterial
                color="#7af0e3"
                transparent
                opacity={0.15}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef();
  const count = 100;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 3.5 + Math.random() * 1.5;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7af0e3"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function WireframeSphere() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Sphere />
        <Particles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

```

```javascriptreact
"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

// Dynamic import for Three.js component (no SSR)
const WireframeSphere = dynamic(() => import("./WireframeSphere"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-[#7af0e3]/30 border-t-[#7af0e3] rounded-full animate-spin" />
    </div>
  ),
});

export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);

  const metrics = [
    { value: "5×", label: "Faster CAM" },
    { value: "42%", label: "Less drift" },
    { value: "24/7", label: "Uptime" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden"
    >
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{ y: gridY }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,240,227,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,240,227,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,240,227,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,240,227,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "300px 300px",
          }}
        />
      </motion.div>

      {/* Gradient orbs */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7af0e3]/8 rounded-full blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9f7aea]/10 rounded-full blur-[100px]"
        aria-hidden
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 lg:px-16 pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="flex flex-col items-center text-center gap-8">
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7af0e3] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7af0e3]" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              Grid online · North America
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.08] text-white tracking-tight">
              Autonomous factories
              <br />
              <span className="text-[#7af0e3]">for precision metal.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              One AI layer coordinates CAM, machining, and inspection—so defense
              and aerospace teams ship certified parts on cadence.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <a
              href="#contact"
              className="group relative px-6 py-3.5 rounded-full bg-[#7af0e3] text-[#050a12] font-semibold text-sm overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10">Request access</span>
            </a>
            <a
              href="#mission"
              className="px-6 py-3.5 rounded-full border border-white/15 text-white/80 font-medium text-sm hover:border-white/30 hover:text-white transition-all"
            >
              How it works
            </a>
          </motion.div>

          {/* Metrics row */}
          <motion.div
            className="flex items-center gap-8 md:gap-12 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {metrics.map((m, i) => (
              <div key={m.label} className="flex items-center gap-3">
                {i > 0 && <div className="w-px h-8 bg-white/10" />}
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.15em] text-white/50 mt-1">
                    {m.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D Sphere visual */}
        <motion.div
          className="mt-16 md:mt-20 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/8 bg-white/2">
            {/* Inner grid texture */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(122,240,227,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(122,240,227,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
              aria-hidden
            />

            {/* Scanline effect */}
            <motion.div
              className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-[#7af0e3]/40 to-transparent pointer-events-none z-10"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              aria-hidden
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#7af0e3]/30 rounded-tl-2xl pointer-events-none z-10" />
            <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#7af0e3]/30 rounded-tr-2xl pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#7af0e3]/30 rounded-bl-2xl pointer-events-none z-10" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#7af0e3]/30 rounded-br-2xl pointer-events-none z-10" />

            {/* Status bar */}
            <div className="relative flex items-center justify-between px-5 md:px-6 py-3 border-b border-white/6 z-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7af0e3]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <span className="text-xs font-mono text-white/40 hidden sm:inline">
                  GRID_VIS_001
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/40">
                <span className="hidden sm:inline">48 cells active</span>
                <span className="font-mono text-[#7af0e3]/70">● LIVE</span>
              </div>
            </div>

            {/* 3D Sphere Canvas */}
            <div className="relative h-[300px] md:h-[400px] lg:h-[450px]">
              <WireframeSphere />
            </div>

            {/* Bottom bar */}
            <div className="relative flex items-center justify-between px-5 md:px-6 py-3 border-t border-white/6 z-10">
              <div className="flex items-center gap-6 text-xs text-white/40">
                <span>
                  <span className="text-white/60">Δt</span> 2.4ms
                </span>
                <span>
                  <span className="text-white/60">σ</span> 0.003mm
                </span>
              </div>
              <div className="text-xs text-white/40">
                Drag to rotate · Real-time render
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="flex flex-col items-center gap-3 mt-12 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            className="w-px h-8 bg-linear-to-b from-white/30 to-transparent"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

```

Done! I've created a **3D wireframe sphere** using Three.js and integrated it into the Hero section:

**New component: `WireframeSphere.js`**
- **Icosahedron wireframe** — Main sphere with techy low-poly wireframe in accent color (#7af0e3)
- **Inner sphere** — Secondary wireframe in purple (#9f7aea) for depth
- **Orbital rings** — Two torus rings at different angles
- **Latitude lines** — Subtle horizontal rings for that scientific/globe feel
- **Floating particles** — Ambient particles orbiting the sphere
- **Auto-rotation** — Slow continuous rotation + user can drag to interact
- **Float animation** — Gentle floating motion via drei's `<Float>`

**Hero.js updates:**
- Replaced static `hero.svg` with the interactive 3D sphere
- Dynamic import with SSR disabled (Three.js needs client-side)
- Loading spinner while the 3D scene initializes
- Updated bottom bar text: "Drag to rotate · Real-time render"

The sphere is **interactive** — users can drag to rotate it, giving that modern techy feel. Check it out in your dev server!

---

**User**

similarly improve the UI of @app/components/Mission.js 

---

**Cursor**

I'll create a 3D wireframe torus for the Mission section and redesign the component with a cleaner, techy look:

```javascriptreact
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Torus() {
  const groupRef = useRef();
  const torusRef = useRef();
  const innerTorusRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
      groupRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={groupRef}>
        {/* Main torus wireframe */}
        <mesh ref={torusRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.7, 24, 48]} />
          <meshBasicMaterial
            color="#7af0e3"
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Inner torus */}
        <mesh ref={innerTorusRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.5, 16, 32]} />
          <meshBasicMaterial
            color="#9f7aea"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Center ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.28, 1.32, 64]} />
          <meshBasicMaterial
            color="#7af0e3"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Outer accent ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.68, 2.72, 64]} />
          <meshBasicMaterial
            color="#7af0e3"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Vertical ring */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[2.4, 0.008, 8, 64]} />
          <meshBasicMaterial color="#7af0e3" transparent opacity={0.4} />
        </mesh>

        {/* Angled ring */}
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.2, 0.006, 8, 64]} />
          <meshBasicMaterial color="#9f7aea" transparent opacity={0.25} />
        </mesh>

        {/* Data points on torus surface */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = Math.cos(angle) * 2;
          const z = Math.sin(angle) * 2;
          return (
            <mesh key={i} position={[x, 0, z]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial
                color="#7af0e3"
                transparent
                opacity={0.8}
              />
            </mesh>
          );
        })}

        {/* Connecting lines */}
        {[0, 1, 2, 3].map((i) => {
          const angle1 = (i / 4) * Math.PI * 2;
          const angle2 = ((i + 2) / 4) * Math.PI * 2;
          const points = [
            new THREE.Vector3(Math.cos(angle1) * 2, 0, Math.sin(angle1) * 2),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(Math.cos(angle2) * 2, 0, Math.sin(angle2) * 2),
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          return (
            <line key={i} geometry={geometry}>
              <lineBasicMaterial color="#7af0e3" transparent opacity={0.15} />
            </line>
          );
        })}
      </group>
    </Float>
  );
}

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[12, 12, 12, 12]} />
      <meshBasicMaterial
        color="#7af0e3"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

export default function WireframeTorus() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Torus />
        <GridFloor />
      </Canvas>
    </div>
  );
}

```

```javascriptreact
"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

const WireframeTorus = dynamic(() => import("./WireframeTorus"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#7af0e3]/30 border-t-[#7af0e3] rounded-full animate-spin" />
    </div>
  ),
});

export default function Mission() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const visualY = useTransform(scrollYProgress, [0, 1], ["12%", "-6%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["8%", "-4%"]);

  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "High Speed",
      value: "5×",
      copy: "CAM decisions generated in seconds, not hours",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
        </svg>
      ),
      label: "Full Automation",
      value: "24/7",
      copy: "Cells, metrology, and feedback loops",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Lower Cost",
      value: "50%",
      copy: "Dense cells mean less overhead",
    },
  ];

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden py-20 lg:py-28"
    >
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{ y: gridY }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,240,227,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,240,227,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,240,227,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,240,227,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "250px 250px",
          }}
        />
      </motion.div>

      {/* Gradient accents */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#7af0e3]/6 rounded-full blur-[100px]" aria-hidden />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#9f7aea]/8 rounded-full blur-[80px]" aria-hidden />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7af0e3] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7af0e3]" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              Our Mission
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.1] text-white tracking-tight max-w-4xl mx-auto">
            An AI-first grid for
            <span className="text-[#7af0e3]"> advanced manufacturing.</span>
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* 3D Visual */}
          <motion.div
            className="order-2 lg:order-1"
            style={{ y: visualY }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/8 bg-white/2">
              {/* Grid texture */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(122,240,227,0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(122,240,227,0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: "32px 32px",
                }}
                aria-hidden
              />

              {/* Scanline */}
              <motion.div
                className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-[#7af0e3]/50 to-transparent pointer-events-none z-10"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                aria-hidden
              />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-[#7af0e3]/30 rounded-tl-2xl pointer-events-none z-10" />
              <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-[#7af0e3]/30 rounded-tr-2xl pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-[#7af0e3]/30 rounded-bl-2xl pointer-events-none z-10" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-[#7af0e3]/30 rounded-br-2xl pointer-events-none z-10" />

              {/* Top bar */}
              <div className="relative flex items-center justify-between px-4 md:px-5 py-2.5 border-b border-white/6 z-10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#7af0e3]" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[11px] font-mono text-white/40 hidden sm:inline">
                    CELL_ORCHESTRATOR
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#7af0e3]/60">● ACTIVE</span>
              </div>

              {/* 3D Canvas */}
              <div className="relative h-[320px] md:h-[380px] lg:h-[420px]">
                <WireframeTorus />
              </div>

              {/* Bottom bar */}
              <div className="relative flex items-center justify-between px-4 md:px-5 py-2.5 border-t border-white/6 z-10">
                <div className="flex items-center gap-4 text-[11px] text-white/40">
                  <span><span className="text-white/55">Cells:</span> 48</span>
                  <span><span className="text-white/55">Sync:</span> 99.7%</span>
                </div>
                <span className="text-[11px] text-white/40">Real-time orchestration</span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2 flex flex-col gap-6"
            style={{ y: contentY }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-white/65 text-base md:text-lg leading-relaxed">
              We deploy and operate dense, automated machining cells across North America.
              Defense and aerospace teams get precision components without the human bottleneck—CAM,
              machines, and metrology run as one continuously learning system.
            </p>

            {/* Feature cards */}
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  className="group relative p-4 md:p-5 rounded-xl border border-white/8 bg-white/2 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 * index }}
                  viewport={{ once: true }}
                  whileHover={{ borderColor: "rgba(122,240,227,0.3)" }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#7af0e3]/5 to-transparent" />

                  <div className="relative flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#7af0e3]/10 border border-[#7af0e3]/20 flex items-center justify-center text-[#7af0e3]">
                      {feature.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span className="text-sm font-medium text-white">
                          {feature.label}
                        </span>
                        <span className="text-lg font-semibold text-[#7af0e3]">
                          {feature.value}
                        </span>
                      </div>
                      <p className="text-sm text-white/50">
                        {feature.copy}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#7af0e3]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-4 pt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 font-medium hover:bg-white/8 hover:border-white/20 transition-all"
              >
                <span>Learn more about our cells</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

```

```javascriptreact
<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-[#7af0e3]/5 to-transparent" />
```

```javascriptreact
className="shrink-0 w-10 h-10 rounded-lg bg-[#7af0e3]/10 border border-[#7af0e3]/20 flex items-center justify-center text-[#7af0e3]"
```

Done! I've redesigned the **Mission section** with a matching techy, minimal aesthetic:

**New `WireframeTorus.js` component:**
- **Torus wireframe** — Main ring shape with accent color wireframe
- **Inner torus** — Secondary purple wireframe for depth
- **Accent rings** — Center and outer rings, plus angled orbital ring
- **Data points** — Small spheres positioned around the torus
- **Connecting lines** — Grid-like connections through the center
- **Grid floor** — Subtle wireframe floor plane for context
- **Float animation** — Gentle floating + auto-rotation

**Updated `Mission.js`:**
- **Centered section header** — Clean badge + gradient-accented headline
- **Two-column layout** — 3D visual on left, content on right
- **Polished 3D container** — Same "instrument panel" style as Hero (corner accents, status bars, scanline)
- **Better feature cards** — Horizontal layout with icon boxes, values, and hover effects
- **Inline SVG icons** — No external dependencies, clean stroke icons
- **Subtle hover interactions** — Glow effect and accent line on card hover
- **CTA link** — Clean arrow button at the bottom

Both Hero and Mission now share the same visual language: grid backgrounds, corner brackets, status bars, and interactive 3D elements. Check it out in your dev server!

---

**User**

increase the width of the viewer of CELL_ORCHESTRATOR

---

**Cursor**

```javascriptreact
{/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-10 lg:gap-12 items-center">
```

```javascriptreact
<div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
```

```javascriptreact
{/* 3D Canvas */}
              <div className="relative h-[340px] md:h-[400px] lg:h-[460px]">
```

Done! I've increased the width of the CELL_ORCHESTRATOR viewer by:

1. **Changed grid ratio** — From 50/50 to ~65/35 split (`lg:grid-cols-[1.3fr_0.7fr]`)
2. **Increased container width** — From `max-w-[1200px]` to `max-w-[1400px]`
3. **Increased canvas height** — Slightly taller for better proportions (`lg:h-[460px]`)

The 3D viewer now takes up more horizontal space on the screen. Check it out in your dev server!

---

**User**

forward-logs-shared.ts:95 'oklab(0.999994 0.0000455678 0.0000200868 / 0.08)' is not an animatable color. Use the equivalent color code instead.. For more information and steps for solving, visit https://motion.dev/troubleshooting/color-not-animatable

---

**Cursor**

This error is from Framer Motion trying to animate an `oklab()` color (generated by Tailwind v4) which it doesn't support. Let me find and fix the animated border color:

```javascriptreact
<motion.div
                  key={feature.label}
                  className="group relative p-4 md:p-5 rounded-xl border bg-white/2 overflow-hidden transition-colors duration-300 hover:border-[#7af0e3]/30"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 * index }}
                  viewport={{ once: true }}
                >
```

Fixed! The error was caused by Framer Motion trying to animate between Tailwind v4's `oklab()` color format and `rgba()`. 

**The fix:**
- Removed `whileHover` animation from Framer Motion
- Set initial border color via inline `style` with rgba format
- Used CSS `transition-colors` + `hover:border-[#7af0e3]/30` for the hover effect instead

The hover animation now works smoothly without the color format conflict.

---

**User**

@app/components/WireframeTorus.js is too complex due to which it is crashing

---

**Cursor**

Let me simplify the component significantly:

```javascriptreact
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Torus() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main torus wireframe */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.6, 16, 32]} />
        <meshBasicMaterial color="#7af0e3" wireframe transparent opacity={0.6} />
      </mesh>

      {/* Inner torus */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.4, 12, 24]} />
        <meshBasicMaterial color="#9f7aea" wireframe transparent opacity={0.25} />
      </mesh>

      {/* Orbital ring */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.01, 8, 48]} />
        <meshBasicMaterial color="#7af0e3" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function WireframeTorus() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Torus />
      </Canvas>
    </div>
  );
}

```

Done! I've simplified `WireframeTorus.js` significantly:

**Removed (causing performance issues):**
- `Float` component (adds computational overhead)
- 12 sphere data points
- 4 connecting lines (were creating new `BufferGeometry` on every render — big problem!)
- Grid floor
- Extra ring geometries
- `THREE` import

**Kept (simplified):**
- Main torus wireframe (reduced segments: 16×32)
- Inner torus wireframe (reduced segments: 12×24)
- Single orbital ring

**Added optimizations:**
- `powerPreference: "low-power"` for GPU
- `dpr={[1, 1.5]}` to limit pixel ratio
- Removed unnecessary `ambientLight` (not needed for `meshBasicMaterial`)

The component is now ~50 lines vs ~138 and should run smoothly without crashing.

---

**User**

still crashing after few seconds @app/components/WireframeTorus.js 

---

**Cursor**

Let me make it even simpler - removing the animation frame loop which might be causing memory issues:

```javascriptreact
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Torus() {
  const meshRef = useRef();

  // Memoize geometry to prevent recreation
  const geometry = useMemo(() => new THREE.TorusGeometry(2, 0.5, 16, 32), []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2.5, 0, 0]} geometry={geometry}>
      <meshBasicMaterial color="#7af0e3" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

export default function WireframeTorus() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: true,
        }}
        dpr={1}
        frameloop="demand"
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setAnimationLoop((time) => {
            gl.render(gl.domElement, time);
          });
        }}
      >
        <Torus />
      </Canvas>
    </div>
  );
}

```

Actually, let me try an even simpler approach - using CSS for the rotation instead:

```javascriptreact
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Torus() {
  return (
    <group rotation={[Math.PI / 2.5, 0, 0]}>
      <mesh>
        <torusGeometry args={[2, 0.5, 16, 32]} />
        <meshBasicMaterial color="#7af0e3" wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function WireframeTorus() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: false, alpha: true }}
        dpr={1}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Torus />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

```

I've simplified it further:

**Changes:**
- Removed `useFrame` hook entirely (was running every frame)
- Using `OrbitControls` with `autoRotate` instead (more optimized)
- Single mesh only
- Added `Suspense` for proper loading
- Disabled antialias for performance
- Set `dpr={1}` to prevent high-DPI rendering

If it still crashes, let me know and I can replace it with a pure CSS/SVG animation which won't have any WebGL overhead.

---

**User**

the backgroundof @app/components/Hero.js and @app/components/Mission.js is not merging and not continuous so fix it. don't remove any grid just merge the Y grid lines together

---

**Cursor**

The issue is that both sections have different grid sizes and positions. I'll make them consistent and use fixed positioning so the grids align:

```javascriptreact
{/* Animated grid background - fixed to viewport for continuity */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        aria-hidden
      >
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,240,227,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,240,227,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0",
          }}
        />
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,240,227,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,240,227,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "300px 300px",
            backgroundPosition: "0 0",
          }}
        />
      </div>
```

```javascriptreact
{/* Grid background - fixed to viewport for continuity with Hero */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        aria-hidden
      >
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,240,227,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,240,227,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0",
          }}
        />
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,240,227,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,240,227,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "300px 300px",
            backgroundPosition: "0 0",
          }}
        />
      </div>
```

Now let me clean up the unused `gridY` variable from both files:

```javascriptreact
const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
```

```javascriptreact
const visualY = useTransform(scrollYProgress, [0, 1], ["12%", "-6%"]);
```

Done! The grids are now continuous between Hero and Mission sections.

**Changes made:**
1. **Fixed positioning** — Changed from `absolute` to `fixed` so grids are relative to viewport, not each section
2. **Same grid sizes** — Both now use 60px fine grid and 300px coarse grid
3. **Same opacity/colors** — Consistent `opacity-50` and same rgba values
4. **Explicit background-position** — Both set to `0 0` so they align perfectly

The grid lines now seamlessly continue as you scroll from Hero into Mission.

---

**User**

instead of using green color use shades of #5900A7

---

**Cursor**

I'll update the color scheme from green (#7af0e3) to purple (#5900A7) shades across all files:

```tailwindcss
@import "tailwindcss";

:root {
  --background: #05070f;
  --background-2: #0b1020;
  --foreground: #e7edf9;
  --muted: #9fb3c9;
  --accent: #8b5cf6;
  --accent-dark: #5900A7;
  --grid: rgba(255, 255, 255, 0.06);
  --panel: rgba(255, 255, 255, 0.02);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-poppins);
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

body {
  background: radial-gradient(
      circle at 20% 20%,
      rgba(89, 0, 167, 0.12),
      transparent 30%
    ),
    radial-gradient(
      circle at 80% 10%,
      rgba(139, 92, 246, 0.1),
      transparent 32%
    ),
    linear-gradient(140deg, var(--background), var(--background-2) 55%, #0c1226);
  color: var(--foreground);
  font-family: var(--font-poppins), "Poppins", system-ui, -apple-system,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Soft grid utility for the tech aesthetic */
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to right, var(--grid) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.4),
    transparent 70%
  );
  opacity: 0.65;
  pointer-events: none;
}

/* Glassy surfaces + subtle borders */
.panel {
  background: var(--panel);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(14px);
}

.divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.22),
    transparent
  );
}

.glow-dot {
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 9999px;
  filter: blur(70px);
  opacity: 0.5;
  background: radial-gradient(
    circle,
    rgba(89, 0, 167, 0.35),
    transparent 60%
  );
}

/* Custom animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Selection color */
::selection {
  background-color: rgba(139, 92, 246, 0.4);
  color: white;
}

```

```javascriptreact
#8b5cf6
```

```javascriptreact
rgba(139,92,246
```

```javascriptreact
#8b5cf6
```

```javascriptreact
rgba(139,92,246
```

```javascriptreact
#8b5cf6
```

```javascriptreact
#8b5cf6
```

```javascriptreact
#8b5cf6
```

```javascriptreact
#8b5cf6
```

```javascriptreact
rgba(139,92,246
```

Done! I've updated the entire color scheme from green (#7af0e3) to purple (#8b5cf6) shades across all files:

**Updated files:**
- `globals.css` — New accent colors, gradient orbs, selection color
- `Hero.js` — All accent colors, grid lines, status indicators
- `Mission.js` — All accent colors, grid lines, UI elements
- `Bottleneck.js` — SVG icons, accent colors, hover effects
- `Header.js` — Logo text, status indicator, button
- `WireframeSphere.js` — 3D wireframe colors
- `WireframeTorus.js` — 3D wireframe color

**Color palette now:**
- Primary accent: `#8b5cf6` (bright purple)
- Secondary: `#9f7aea` (lighter purple, kept for depth)
- Dark accent: `#5900A7` (used in gradients)
- Grid rgba: `rgba(139,92,246,...)` (purple-tinted grids)

---

**User**

decrease the opacity of the dots in @app/components/Bottleneck.js background

---

**Cursor**

```javascriptreact
backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1.2px, transparent 1.2px)`,
```

Done! Reduced the dots opacity from `0.5` to `0.15` — they're now much more subtle and won't overpower the content.

---

**User**

put another @app/components/WireframeSphere.js in @app/components/Hero.js in the left side of background over the existing backgroud like it will be visible half and non interactive.

---

**Cursor**

```javascriptreact
{/* Gradient orbs */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8b5cf6]/8 rounded-full blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9f7aea]/10 rounded-full blur-[100px]"
        aria-hidden
      />

      {/* Background decorative sphere - left side, half visible */}
      <div
        className="absolute -left-[250px] md:-left-[300px] lg:-left-[350px] top-1/2 -translate-y-1/2 w-[500px] md:w-[600px] lg:w-[700px] h-[500px] md:h-[600px] lg:h-[700px] opacity-20 pointer-events-none"
        aria-hidden
      >
        <WireframeSphere />
      </div>

      {/* Content */}
```

Done! I've added a decorative `WireframeSphere` on the left side of the Hero background:

**Properties:**
- **Position:** Extends off the left edge (`-left-[250px]` to `-left-[350px]` depending on screen size)
- **Centered vertically:** `top-1/2 -translate-y-1/2`
- **Size:** 500px–700px depending on viewport
- **Opacity:** `opacity-20` — subtle background element
- **Non-interactive:** `pointer-events-none` so it won't interfere with content

The sphere will appear as a half-visible decorative element behind the content, adding depth to the background.

---

**User**

increase the opacity little bit

---

**Cursor**

```javascriptreact
className="absolute -left-[250px] md:-left-[300px] lg:-left-[350px] top-1/2 -translate-y-1/2 w-[500px] md:w-[600px] lg:w-[700px] h-[500px] md:h-[600px] lg:h-[700px] opacity-35 pointer-events-none"
```

Done! Increased the opacity from `opacity-20` to `opacity-35` — the decorative sphere is now more visible.

---

**User**

and increase the width of the viewer of background @app/components/WireframeSphere.js 

