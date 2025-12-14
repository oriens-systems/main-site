"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Torus() {
  return (
    <group rotation={[Math.PI / 2.5, 0, 0]}>
      <mesh>
        <torusGeometry args={[2, 0.5, 16, 32]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

export default function WireframeTorus() {
  return (
    <div className="h-full" style={{ width: "110%" }}>
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
