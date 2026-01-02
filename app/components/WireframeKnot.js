"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Knot({ wireframeColor = "#8b5cf6" }) {
  const groupRef = useRef();

  // Create torus knot geometry
  const edgesGeometry = useMemo(() => {
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 8, 2, 3);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  // Create path curve for additional visualization
  const pathCurve = useMemo(() => {
    const points = [];
    const p = 2;
    const q = 3;
    const radius = 1;
    const tube = 0.3;

    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * Math.PI * 2;
      const r = radius + tube * Math.cos(q * t);
      const x = r * Math.cos(p * t);
      const y = r * Math.sin(p * t);
      const z = tube * Math.sin(q * t);
      points.push(new THREE.Vector3(x, y, z));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Orbital rings
  const orbitalRings = useMemo(() => {
    const rings = [];

    // XY plane ring
    const ring1Points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      ring1Points.push(
        new THREE.Vector3(Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0)
      );
    }
    rings.push(new THREE.BufferGeometry().setFromPoints(ring1Points));

    // XZ plane ring
    const ring2Points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      ring2Points.push(
        new THREE.Vector3(Math.cos(angle) * 1.8, 0, Math.sin(angle) * 1.8)
      );
    }
    rings.push(new THREE.BufferGeometry().setFromPoints(ring2Points));

    return rings;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.003;
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main torus knot */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.8} />
      </lineSegments>

      {/* Path curve overlay */}
      <line geometry={pathCurve}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.5} />
      </line>

      {/* Orbital rings */}
      {orbitalRings.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial color={wireframeColor} transparent opacity={0.2} />
        </line>
      ))}

      {/* Center point */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color={wireframeColor} transparent opacity={1} />
      </mesh>
    </group>
  );
}

export default function WireframeKnot() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [4, 2, 4], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Knot />
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
