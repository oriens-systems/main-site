"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Dodecahedron({ wireframeColor = "#8b5cf6" }) {
  const groupRef = useRef();

  // Create dodecahedron edges
  const edgesGeometry = useMemo(() => {
    const geometry = new THREE.DodecahedronGeometry(1.5);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  // Inner dodecahedron
  const innerEdgesGeometry = useMemo(() => {
    const geometry = new THREE.DodecahedronGeometry(0.8);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  // Orbital rings at different angles
  const orbitalRings = useMemo(() => {
    const rings = [];
    const ringRadius = 2;
    
    // XY plane ring
    const ring1Points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      ring1Points.push(new THREE.Vector3(Math.cos(angle) * ringRadius, Math.sin(angle) * ringRadius, 0));
    }
    rings.push(new THREE.BufferGeometry().setFromPoints(ring1Points));
    
    // Tilted ring
    const ring2Points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      const x = Math.cos(angle) * ringRadius;
      const y = Math.sin(angle) * ringRadius * 0.5;
      const z = Math.sin(angle) * ringRadius * 0.866;
      ring2Points.push(new THREE.Vector3(x, y, z));
    }
    rings.push(new THREE.BufferGeometry().setFromPoints(ring2Points));
    
    return rings;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.003;
      groupRef.current.rotation.y += 0.004;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer dodecahedron */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.8} />
      </lineSegments>

      {/* Inner dodecahedron */}
      <lineSegments geometry={innerEdgesGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.4} />
      </lineSegments>

      {/* Orbital rings */}
      {orbitalRings.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial color={wireframeColor} transparent opacity={0.2} />
        </line>
      ))}

      {/* Center point */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial color={wireframeColor} transparent opacity={1} />
      </mesh>

      {/* Axis indicator points */}
      {[
        [0, 1.8, 0],
        [0, -1.8, 0],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={wireframeColor} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function WireframeDodecahedron() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3.5, 2.5, 3.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Dodecahedron />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}