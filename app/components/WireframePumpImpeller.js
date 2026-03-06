"use client";

import { useRef, useEffect, useMemo } from "react";
import { colors } from "@/lib/colors";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function PumpImpeller() {
  const groupRef = useRef();
  const { scene } = useGLTF("/pumpmodel/pumpimpeller.gltf");

  useEffect(() => {
    // Apply simple wireframe material - no adding children to avoid infinite loop
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: colors.accent,
          wireframe: true,
          transparent: true,
          opacity: 0.5,
        });
      }
    });
  }, [scene]);

  // Linear Y-axis rotation animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group 
      ref={groupRef} 
      scale={0.005} 
      rotation={[0.3, 0, -Math.PI / 4]}
      position={[0, 0.5, 0]}
    >
      {/* Offset to center the model (Y center is around -150 in model space) */}
      <group position={[0, 150, 0]}>
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
        color={colors.accent}
        size={0.04}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

export default function WireframePumpImpeller() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <PumpImpeller />
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
useGLTF.preload("/pumpmodel/pumpimpeller.gltf");
