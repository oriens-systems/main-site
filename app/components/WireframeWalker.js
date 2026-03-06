"use client";

import { Suspense, useRef, useMemo } from "react";
import { colors } from "@/lib/colors";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

function Model() {
  const groupRef = useRef();
  const gltf = useLoader(GLTFLoader, "/walker/walker.gltf");

  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colors.accent),
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });

    clone.traverse((node) => {
      if (node.isMesh) {
        node.material = wireframeMaterial.clone();
        node.frustumCulled = false;
      }
    });

    return clone;
  }, [gltf]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.position.y =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} scale={0.12} />
      </Center>
    </group>
  );
}

function Fallback() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[1.5, 0]} />
      <meshBasicMaterial color={colors.accent} wireframe transparent opacity={0.5} />
    </mesh>
  );
}

export default function WireframeWalker() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1} />
        <Suspense fallback={<Fallback />}>
          <Model />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}

