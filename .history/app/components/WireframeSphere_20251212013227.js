"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

function Sphere() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.08) * 0.15;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main wireframe sphere */}
      <mesh>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial
          color="#7af0e3"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Orbital ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.01, 8, 32]} />
        <meshBasicMaterial color="#7af0e3" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Cleanup component
function SceneCleanup() {
  const { gl, scene } = useThree();

  useEffect(() => {
    return () => {
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      gl.dispose();
    };
  }, [gl, scene]);

  return null;
}

export default function WireframeSphere() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
        dpr={1}
        style={{ background: "transparent" }}
      >
        <Sphere />
        <SceneCleanup />
      </Canvas>
    </div>
  );
}
