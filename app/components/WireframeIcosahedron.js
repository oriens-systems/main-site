"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Icosahedron({ wireframeColor = "#8b5cf6" }) {
  const groupRef = useRef();

  // Create icosahedron edges
  const edgesGeometry = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1.4);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  // Inner icosahedron
  const innerEdgesGeometry = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(0.7);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  // Connection lines between inner and outer
  const connectionLines = useMemo(() => {
    const outerGeo = new THREE.IcosahedronGeometry(1.4);
    const innerGeo = new THREE.IcosahedronGeometry(0.7);
    const outerPositions = outerGeo.attributes.position;
    const innerPositions = innerGeo.attributes.position;
    
    const points = [];
    const usedVertices = new Set();
    
    for (let i = 0; i < outerPositions.count; i++) {
      const x = outerPositions.getX(i);
      const y = outerPositions.getY(i);
      const z = outerPositions.getZ(i);
      const key = `${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}`;
      
      if (!usedVertices.has(key)) {
        usedVertices.add(key);
        points.push(new THREE.Vector3(x, y, z));
        points.push(new THREE.Vector3(x * 0.5, y * 0.5, z * 0.5));
      }
    }
    
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
      {/* Outer icosahedron */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.8} />
      </lineSegments>

      {/* Inner icosahedron */}
      <lineSegments geometry={innerEdgesGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.35} />
      </lineSegments>

      {/* Connection lines */}
      <lineSegments geometry={connectionLines}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.2} />
      </lineSegments>

      {/* Center point */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color={wireframeColor} transparent opacity={1} />
      </mesh>
    </group>
  );
}

export default function WireframeIcosahedron() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3, 2, 3], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ 
          alpha: true, 
          antialias: false,
          powerPreference: "low-power",
          stencil: false,
          depth: true
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <Icosahedron />
      </Canvas>
    </div>
  );
}
