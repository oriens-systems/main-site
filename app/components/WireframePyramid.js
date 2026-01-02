"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Pyramid({ wireframeColor = "#8b5cf6" }) {
  const groupRef = useRef();

  // Create pyramid vertices
  const pyramidGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const h = 1.8; // height
    const b = 1.5; // base half-width

    // Vertices: apex and 4 base corners
    const vertices = new Float32Array([
      // Base square
      -b, 0, -b,
      b, 0, -b,
      b, 0, -b,
      b, 0, b,
      b, 0, b,
      -b, 0, b,
      -b, 0, b,
      -b, 0, -b,
      // Edges to apex
      -b, 0, -b,
      0, h, 0,
      b, 0, -b,
      0, h, 0,
      b, 0, b,
      0, h, 0,
      -b, 0, b,
      0, h, 0,
    ]);

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  // Inner pyramid (smaller)
  const innerPyramidGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const h = 1.0;
    const b = 0.85;
    const yOffset = 0.3;

    const vertices = new Float32Array([
      -b, yOffset, -b,
      b, yOffset, -b,
      b, yOffset, -b,
      b, yOffset, b,
      b, yOffset, b,
      -b, yOffset, b,
      -b, yOffset, b,
      -b, yOffset, -b,
      -b, yOffset, -b,
      0, h + yOffset, 0,
      b, yOffset, -b,
      0, h + yOffset, 0,
      b, yOffset, b,
      0, h + yOffset, 0,
      -b, yOffset, b,
      0, h + yOffset, 0,
    ]);

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  // Horizontal rings
  const ringsGeometry = useMemo(() => {
    const points = [];
    const levels = [0.5, 1.0, 1.4];
    const h = 1.8;
    const b = 1.5;

    levels.forEach((level) => {
      const ratio = 1 - level / h;
      const size = b * ratio;
      points.push(
        new THREE.Vector3(-size, level, -size),
        new THREE.Vector3(size, level, -size),
        new THREE.Vector3(size, level, -size),
        new THREE.Vector3(size, level, size),
        new THREE.Vector3(size, level, size),
        new THREE.Vector3(-size, level, size),
        new THREE.Vector3(-size, level, size),
        new THREE.Vector3(-size, level, -size)
      );
    });

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Outer pyramid */}
      <lineSegments geometry={pyramidGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.8} />
      </lineSegments>

      {/* Inner pyramid */}
      <lineSegments geometry={innerPyramidGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.4} />
      </lineSegments>

      {/* Horizontal rings */}
      <lineSegments geometry={ringsGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.3} />
      </lineSegments>

      {/* Apex point */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color={wireframeColor} transparent opacity={1} />
      </mesh>

      {/* Base corner points */}
      {[
        [-1.5, 0, -1.5],
        [1.5, 0, -1.5],
        [1.5, 0, 1.5],
        [-1.5, 0, 1.5],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={wireframeColor} transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Inner apex */}
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={wireframeColor} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function WireframePyramid() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [4, 3, 4], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Pyramid />
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