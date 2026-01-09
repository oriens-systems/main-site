"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// An Armillary Sphere - classic astronomical/scientific instrument
function ArmillarySphere({ color = "#8b5cf6" }) {
  const groupRef = useRef();
  const innerRingRef = useRef();
  const outerRingRef = useRef();
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Mouse parallax
      const targetRotX = (mouse.y * viewport.height) / 80;
      const targetRotY = (mouse.x * viewport.width) / 80;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX + 0.3, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    }
    
    // Animate nested rings at different speeds
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = t * 0.3;
      innerRingRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y = t * 0.15;
    }
  });

  const ringMaterial = (opacity = 0.5) => (
    <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
  );

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Outermost Ring - Ecliptic */}
      <group ref={outerRingRef} rotation={[Math.PI / 12, 0, 0]}>
        <mesh>
          <torusGeometry args={[3, 0.03, 8, 64]} />
          {ringMaterial(0.4)}
        </mesh>
        {/* Degree markers */}
        {[...Array(24)].map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 3, Math.sin(angle) * 3, 0]}>
              <boxGeometry args={[0.02, 0.15, 0.02]} />
              <meshBasicMaterial color={color} transparent opacity={0.3} />
            </mesh>
          );
        })}
      </group>

      {/* Middle Ring - Equator */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.4, 0.025, 8, 64]} />
          {ringMaterial(0.5)}
        </mesh>
      </group>

      {/* Inner Ring - Meridian */}
      <group ref={innerRingRef}>
        <mesh>
          <torusGeometry args={[1.8, 0.02, 8, 64]} />
          {ringMaterial(0.6)}
        </mesh>
        {/* Cross struts */}
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 3.6, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.01, 0.01, 3.6, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Polar Axis */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 4.5, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>

      {/* Central Earth Sphere */}
      <mesh>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>

      {/* Pole Caps */}
      <mesh position={[0, 2.25, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, -2.25, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>

      {/* Latitude Lines (horizontal bands) */}
      {[-0.8, 0, 0.8].map((yPos, i) => (
        <group key={i} position={[0, yPos * 1.5, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[Math.sqrt(1 - yPos * yPos) * 1.5, 0.008, 8, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function WireframeArmillary() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ArmillarySphere />
      </Canvas>
    </div>
  );
}
