"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Torus() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main torus wireframe */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.6, 16, 32]} />
        <meshBasicMaterial
          color="#7af0e3"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Inner torus */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.4, 12, 24]} />
        <meshBasicMaterial
          color="#9f7aea"
          wireframe
          transparent
          opacity={0.25}
        />
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
