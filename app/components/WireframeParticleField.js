"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField({ count = 80, color = "#8b5cf6" }) {
  const meshRef = useRef();
  const linesRef = useRef();

  // Generate random particle positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
        ],
        speed: 0.002 + Math.random() * 0.003,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  // Create buffer geometry for points
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    particles.forEach((p, i) => {
      positions[i * 3] = p.position[0];
      positions[i * 3 + 1] = p.position[1];
      positions[i * 3 + 2] = p.position[2];
      sizes[i] = 0.03 + Math.random() * 0.04;
    });

    return { positions, sizes };
  }, [particles, count]);

  // Animate particles with gentle floating motion
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      const posArray = meshRef.current.geometry.attributes.position.array;

      particles.forEach((p, i) => {
        // Gentle floating motion
        posArray[i * 3] = p.position[0] + Math.sin(time * p.speed * 50 + p.offset) * 0.3;
        posArray[i * 3 + 1] = p.position[1] + Math.cos(time * p.speed * 30 + p.offset) * 0.2;
        posArray[i * 3 + 2] = p.position[2] + Math.sin(time * p.speed * 40 + p.offset * 2) * 0.15;
      });

      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Update connection lines
    if (linesRef.current && meshRef.current) {
      const posArray = meshRef.current.geometry.attributes.position.array;
      const linePositions = [];

      // Connect nearby particles
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 2.5) {
            linePositions.push(
              posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
              posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
            );
          }
        }
      }

      linesRef.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
    }
  });

  return (
    <group rotation={[0.1, 0, 0]}>
      {/* Particles */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.08}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color={color} transparent opacity={0.15} />
      </lineSegments>

      {/* Ambient glow spheres at key points */}
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 4,
          ]}
        >
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingRing({ radius = 3, color = "#8b5cf6" }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
      ringRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.2;
    }
  });

  return (
    <group ref={ringRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[radius * 0.7, 0.015, 8, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export default function WireframeParticleField() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ParticleField />
        <FloatingRing />
      </Canvas>
    </div>
  );
}
