"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

function Model() {
  const groupRef = useRef();
  const gltf = useLoader(GLTFLoader, "/transportmode/Transport.gltf");

  // Clone the scene so we can modify it safely
  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    // Create wireframe material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });

    // Apply wireframe to all meshes
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
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} scale={0.35} />
      </Center>
    </group>
  );
}

function Fallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#8b5cf6" wireframe />
    </mesh>
  );
}

export default function WireframeTransportShuttle() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 10, 45], fov: 50 }}
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
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
