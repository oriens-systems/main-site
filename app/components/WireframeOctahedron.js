"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Octahedron({ wireframeColor = "#8b5cf6" }) {
  const groupRef = useRef();

  // Create octahedron edges
  const edgesGeometry = useMemo(() => {
    const geometry = new THREE.OctahedronGeometry(1.5);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  // Inner octahedron
  const innerEdgesGeometry = useMemo(() => {
    const geometry = new THREE.OctahedronGeometry(0.8);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  // Axis lines through center
  const axisLines = useMemo(() => {
    const points = [
      new THREE.Vector3(0, -1.8, 0),
      new THREE.Vector3(0, 1.8, 0),
      new THREE.Vector3(-1.8, 0, 0),
      new THREE.Vector3(1.8, 0, 0),
      new THREE.Vector3(0, 0, -1.8),
      new THREE.Vector3(0, 0, 1.8),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.004;
      groupRef.current.rotation.y += 0.006;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer octahedron */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.8} />
      </lineSegments>

      {/* Inner octahedron */}
      <lineSegments geometry={innerEdgesGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.4} />
      </lineSegments>

      {/* Axis lines */}
      <lineSegments geometry={axisLines}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.25} />
      </lineSegments>

      {/* Vertex points */}
      {[
        [0, 1.5, 0],
        [0, -1.5, 0],
        [1.5, 0, 0],
        [-1.5, 0, 0],
        [0, 0, 1.5],
        [0, 0, -1.5],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color={wireframeColor} transparent opacity={0.9} />
        </mesh>
      ))}

      {/* Center point */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color={wireframeColor} transparent opacity={1} />
      </mesh>
    </group>
  );
}

export default function WireframeOctahedron() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3, 2, 3], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Octahedron />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}