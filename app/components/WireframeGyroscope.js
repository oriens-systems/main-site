"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// A precision gyroscope - minimal, mechanical, balanced
function Gyroscope({ color = "#8b5cf6" }) {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Mouse parallax
      const targetRotX = (mouse.y * viewport.height) / 100;
      const targetRotY = (mouse.x * viewport.width) / 100;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.03);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, t * 0.1 + targetRotY, 0.03);
    }
    
    // Counter-rotating rings for gyroscope effect
    if (ring1Ref.current) ring1Ref.current.rotation.x = t * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.y = -t * 0.4;
    if (ring3Ref.current) ring3Ref.current.rotation.z = t * 0.3;
  });

  return (
    <group ref={groupRef} scale={1.5}>
      {/* Outer Ring */}
      <group ref={ring1Ref}>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[2.5, 0.04, 16, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
        {/* Pivot points */}
        <mesh position={[2.5, 0, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
        <mesh position={[-2.5, 0, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Middle Ring */}
      <group ref={ring2Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.035, 16, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
        {/* Pivot points */}
        <mesh position={[0, 1.8, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, -1.8, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Inner Ring */}
      <group ref={ring3Ref}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.1, 0.03, 16, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
        {/* Pivot points */}
        <mesh position={[0, 0, 1.1]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
        <mesh position={[0, 0, -1.1]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Central Core */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
      </mesh>

      {/* XYZ Axis Lines */}
      <group>
        {/* X - Red */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.01, 0.01, 3, 8]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.4} />
        </mesh>
        {/* Y - Green */}
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 3, 8]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.4} />
        </mesh>
        {/* Z - Blue */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 3, 8]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

export default function WireframeGyroscope() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Gyroscope />
      </Canvas>
    </div>
  );
}
