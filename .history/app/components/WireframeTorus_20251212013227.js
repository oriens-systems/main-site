"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

function Torus() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2.5, 0, 0]}>
      <torusGeometry args={[2, 0.5, 12, 24]} />
      <meshBasicMaterial color="#7af0e3" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

// Cleanup component to properly dispose resources
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

export default function WireframeTorus() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
          preserveDrawingBuffer: false,
        }}
        dpr={1}
        frameloop="always"
        style={{ background: "transparent" }}
      >
        <Torus />
        <SceneCleanup />
      </Canvas>
    </div>
  );
}
