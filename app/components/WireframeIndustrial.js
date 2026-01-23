"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

// Simple rotating gear using TorusGeometry
function Gear({ position, scale, speed, direction }) {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed * direction;
    if (meshRef.current) {
      meshRef.current.rotation.z = t;
    }
    if (innerRef.current) {
      innerRef.current.rotation.z = t;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.12, 6, 20]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={innerRef}>
        <ringGeometry args={[0.25, 0.45, 10]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

// Floating cube component
function FloatingCube({ position, scale, speed, index }) {
  const meshRef = useRef();
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

// Particles
function Particles({ count = 60 }) {
  const pointsRef = useRef();
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8b5cf6"
        size={0.1}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  // Generate cubes
  const cubes = useMemo(() => {
    const items = [];
    for (let i = 0; i < 10; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 3 - 2,
        ],
        scale: 0.15 + Math.random() * 0.25,
        speed: 0.2 + Math.random() * 0.3,
      });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Gears at different positions */}
      <Gear position={[-4.5, 1.5, 0]} scale={1.3} speed={0.2} direction={1} />
      <Gear position={[-2.5, -0.5, -1]} scale={0.9} speed={0.3} direction={-1} />
      <Gear position={[4.5, 1, 0]} scale={1.6} speed={0.15} direction={1} />
      <Gear position={[2.5, -1.5, -1]} scale={0.7} speed={0.35} direction={-1} />
      
      {/* Floating cubes */}
      {cubes.map((cube, i) => (
        <FloatingCube key={i} {...cube} index={i} />
      ))}
      
      {/* Particles */}
      <Particles count={50} />
    </group>
  );
}

export default function WireframeIndustrial() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}