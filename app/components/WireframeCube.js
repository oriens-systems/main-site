"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Cube({ wireframeColor = "#8b5cf6" }) {
  const groupRef = useRef();

  // Create cube edges geometry
  const edgesGeometry = useMemo(() => {
    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    return new THREE.EdgesGeometry(boxGeometry);
  }, []);

  // Create inner cube edges
  const innerEdgesGeometry = useMemo(() => {
    const boxGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    return new THREE.EdgesGeometry(boxGeometry);
  }, []);

  // Create connecting lines between cubes
  const connectionLines = useMemo(() => {
    const points = [];
    const corners = [
      [1, 1, 1],
      [1, 1, -1],
      [1, -1, 1],
      [1, -1, -1],
      [-1, 1, 1],
      [-1, 1, -1],
      [-1, -1, 1],
      [-1, -1, -1],
    ];

    corners.forEach(([x, y, z]) => {
      points.push(new THREE.Vector3(x * 0.6, y * 0.6, z * 0.6));
      points.push(new THREE.Vector3(x, y, z));
    });

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.003;
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer cube */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.8} />
      </lineSegments>

      {/* Inner cube */}
      <lineSegments geometry={innerEdgesGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.4} />
      </lineSegments>

      {/* Connection lines */}
      <lineSegments geometry={connectionLines}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.3} />
      </lineSegments>

      {/* Corner points - outer */}
      {[
        [1, 1, 1],
        [1, 1, -1],
        [1, -1, 1],
        [1, -1, -1],
        [-1, 1, 1],
        [-1, 1, -1],
        [-1, -1, 1],
        [-1, -1, -1],
      ].map(([x, y, z], i) => (
        <mesh key={`outer-${i}`} position={[x, y, z]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={wireframeColor} transparent opacity={0.9} />
        </mesh>
      ))}

      {/* Corner points - inner */}
      {[
        [0.6, 0.6, 0.6],
        [0.6, 0.6, -0.6],
        [0.6, -0.6, 0.6],
        [0.6, -0.6, -0.6],
        [-0.6, 0.6, 0.6],
        [-0.6, 0.6, -0.6],
        [-0.6, -0.6, 0.6],
        [-0.6, -0.6, -0.6],
      ].map(([x, y, z], i) => (
        <mesh key={`inner-${i}`} position={[x, y, z]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={wireframeColor} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function WireframeCube() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [4, 3, 4], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Cube />
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