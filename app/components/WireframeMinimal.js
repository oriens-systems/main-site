"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Simple rotating wireframe cube with subtle motion
function MinimalCube({ color = "#8b5cf6" }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Very slow rotation only
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1 + 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={2}>
      {/* Main wireframe box */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} />
        <lineBasicMaterial color={color} transparent opacity={0.5} />
      </lineSegments>
      
      {/* Inner smaller box */}
      <lineSegments rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.2, 1.2, 1.2)]} />
        <lineBasicMaterial color={color} transparent opacity={0.25} />
      </lineSegments>
      
      {/* Corner nodes - reduced geometry */}
      {[[-1,-1,-1],[1,-1,1],[-1,1,1],[1,1,-1]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function WireframeMinimal() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "low-power",
          stencil: false,
          depth: true
        }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <MinimalCube />
      </Canvas>
    </div>
  );
}
