"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function RocketNozzle() {
  const groupRef = useRef();
  const { scene } = useGLTF("/rocketmodel/rocketnozzle.gltf");

  useEffect(() => {
    // Clone the scene to avoid modifying the cached original
    scene.traverse((child) => {
      if (child.isMesh) {
        // Apply wireframe material
        child.material = new THREE.MeshBasicMaterial({
          color: "#8b5cf6",
          wireframe: true,
          transparent: true,
          opacity: 0.6,
        });
      }
    });
  }, [scene]);

  // Linear Y-axis rotation animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15 + Math.PI / 2;
    }
  });

  return (
    <group 
      ref={groupRef} 
      scale={0.0025} 
      rotation={[Math.PI, 0.5, 0]}
      position={[0, 0, 0]}
    >
      {/* Offset to center the model (Z center is around -1300 in model space) */}
      <group position={[0, 0, 1300]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

function Particles() {
  const particlesRef = useRef();
  const count = 25;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 2;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
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
        color="#8b5cf6"
        size={0.04}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

export default function WireframeRocketNozzle() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <RocketNozzle />
        <Particles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/rocketmodel/rocketnozzle.gltf");
