"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function PartGeometry() {
  return (
    <group>
      {/* The main part being machined - Simplified geometry */}
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 64, 16]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </mesh>
    </group>
  );
}

function ToolHead({ speed = 1, isActive = true }) {
  const toolRef = useRef();
  const pathRadius = 1.3;
  
  useFrame((state) => {
    if (!isActive || !toolRef.current) return;
    
    const t = state.clock.getElapsedTime() * speed;
    
    // Parametric curve equation for toolpath
    const x = Math.sin(t * 1) * pathRadius;
    const y = Math.cos(t * 1.5) * (pathRadius * 0.8);
    const z = Math.sin(t * 0.5) * (pathRadius * 0.5);
    
    toolRef.current.position.set(x, y, z);
    toolRef.current.lookAt(0, 0, 0);
  });

  return (
    <group ref={toolRef}>
      {/* Tool Tip - Simplified */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.05, 0.2, 6]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Tool Body */}
      <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 6]} />
        <meshBasicMaterial color="#64748b" />
      </mesh>

      {/* Spindle */}
      <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 6]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function Scene({ speed, isActive }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <PartGeometry />
      <ToolHead speed={speed} isActive={isActive} />
    </group>
  );
}

export default function WireframeToolpath({ speed = 1, isActive = true }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "low-power",
          stencil: false,
          depth: true
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <Scene speed={speed} isActive={isActive} />
      </Canvas>
    </div>
  );
}
