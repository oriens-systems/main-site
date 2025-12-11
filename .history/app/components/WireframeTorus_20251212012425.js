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
