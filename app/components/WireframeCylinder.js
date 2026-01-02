"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Cylinder({ wireframeColor = "#8b5cf6" }) {
  const groupRef = useRef();

  // Create cylinder edges
  const edgesGeometry = useMemo(() => {
    const geometry = new THREE.CylinderGeometry(1, 1, 2.5, 16);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  // Inner cylinder
  const innerEdgesGeometry = useMemo(() => {
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 12);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  // Horizontal ring sections
  const ringGeometries = useMemo(() => {
    const rings = [];
    const levels = [-0.8, 0, 0.8];
    
    levels.forEach((y) => {
      const points = [];
      const segments = 24;
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * 1, y, Math.sin(angle) * 1));
      }
      rings.push(new THREE.BufferGeometry().setFromPoints(points));
    });
    
    return rings;
  }, []);

  // Vertical connection lines
  const verticalLines = useMemo(() => {
    const points = [];
    const segments = 8;
    
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle);
      const z = Math.sin(angle);
      points.push(new THREE.Vector3(x, -1.25, z));
      points.push(new THREE.Vector3(x, 1.25, z));
    }
    
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer cylinder */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.8} />
      </lineSegments>

      {/* Inner cylinder */}
      <lineSegments geometry={innerEdgesGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.4} />
      </lineSegments>

      {/* Horizontal rings */}
      {ringGeometries.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial color={wireframeColor} transparent opacity={0.3} />
        </line>
      ))}

      {/* Vertical lines */}
      <lineSegments geometry={verticalLines}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.25} />
      </lineSegments>

      {/* Top center point */}
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={wireframeColor} transparent opacity={0.9} />
      </mesh>

      {/* Bottom center point */}
      <mesh position={[0, -1.25, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={wireframeColor} transparent opacity={0.9} />
      </mesh>

      {/* Center point */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={wireframeColor} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export default function WireframeCylinder() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3, 2, 3], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Cylinder />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.7}
        />
      </Canvas>
    </div>
  );
}