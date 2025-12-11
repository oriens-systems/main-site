"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function Sphere() {
  const meshRef = useRef();
  const wireframeRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = t * 0.15;
      wireframeRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* Main wireframe sphere */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2, 2]} />
          <meshBasicMaterial
            color="#7af0e3"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Inner sphere with lower detail */}
        <mesh ref={wireframeRef} scale={0.7}>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial
            color="#9f7aea"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Core glow */}
        <mesh scale={0.15}>
          <sphereGeometry args={[2, 16, 16]} />
          <meshBasicMaterial color="#7af0e3" transparent opacity={0.8} />
        </mesh>

        {/* Outer ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.8, 0.01, 16, 100]} />
          <meshBasicMaterial color="#7af0e3" transparent opacity={0.4} />
        </mesh>

        {/* Secondary ring */}
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.5, 0.008, 16, 80]} />
          <meshBasicMaterial color="#9f7aea" transparent opacity={0.25} />
        </mesh>

        {/* Latitude lines */}
        {[0.5, 1, 1.5].map((y, i) => (
          <group key={i}>
            <mesh position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[Math.sqrt(4 - y * y) - 0.01, Math.sqrt(4 - y * y), 64]} />
              <meshBasicMaterial
                color="#7af0e3"
                transparent
                opacity={0.15}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh position={[0, -y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[Math.sqrt(4 - y * y) - 0.01, Math.sqrt(4 - y * y), 64]} />
              <meshBasicMaterial
                color="#7af0e3"
                transparent
                opacity={0.15}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef();
  const count = 100;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 3.5 + Math.random() * 1.5;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7af0e3"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function WireframeSphere() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Sphere />
        <Particles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
