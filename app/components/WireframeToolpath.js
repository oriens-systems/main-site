"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Trail, Float, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

function PartGeometry() {
  return (
    <group>
      {/* The main part being machined - Abstract complex aerospace shape */}
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </mesh>
      {/* Inner solidified core */}
      <mesh>
        <torusKnotGeometry args={[1, 0.28, 128, 32]} />
        <meshBasicMaterial 
          color="#0b1020" 
          transparent 
          opacity={0.9} 
        />
      </mesh>
    </group>
  );
}

function ToolHead({ speed = 1, isActive = true }) {
  const toolRef = useRef();
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));

  // Generate a complex path for the tool to follow
  const pathRadius = 1.3;
  
  useFrame((state) => {
    if (!isActive) return;
    
    const t = state.clock.getElapsedTime() * speed;
    
    // Parametric curve equation for toolpath
    const x = Math.sin(t * 1) * pathRadius;
    const y = Math.cos(t * 1.5) * (pathRadius * 0.8);
    const z = Math.sin(t * 0.5) * (pathRadius * 0.5);
    
    const newPos = new THREE.Vector3(x, y, z);
    
    if (toolRef.current) {
      toolRef.current.position.copy(newPos);
      toolRef.current.lookAt(0, 0, 0); // Tool always faces center
    }
    
    setPosition(newPos);
  });

  return (
    <group ref={toolRef}>
      {/* Tool Tip */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.05, 0.2, 8]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* Tool Body */}
      <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
        <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Spindle */}
      <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.5} />
      </mesh>

      {/* Glowing Trail */}
      {isActive && (
        <Trail
          width={2}
          length={12}
          color={new THREE.Color("#8b5cf6")}
          attenuation={(t) => t * t}
        >
          <mesh visible={false}>
            <sphereGeometry args={[0.01]} />
          </mesh>
        </Trail>
      )}
      
      {/* Sparks/Cutting point light */}
      {isActive && (
        <pointLight 
          color="#d8b4fe" 
          intensity={2} 
          distance={1} 
          decay={2} 
        />
      )}
    </group>
  );
}

function Scene({ speed, isActive }) {
  const groupRef = useRef();

  useFrame((state) => {
    // Slowly rotate the entire part
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <PartGeometry />
        <ToolHead speed={speed} isActive={isActive} />
      </Float>
    </group>
  );
}

export default function WireframeToolpath({ speed = 1, isActive = true }) {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Scene speed={speed} isActive={isActive} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
