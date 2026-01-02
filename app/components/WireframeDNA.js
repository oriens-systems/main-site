"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function DNA({ wireframeColor = "#8b5cf6" }) {
  const groupRef = useRef();

  // Create double helix
  const { helix1, helix2, connections } = useMemo(() => {
    const helix1Points = [];
    const helix2Points = [];
    const connectionPoints = [];
    
    const turns = 3;
    const height = 4;
    const radius = 0.8;
    const segments = 100;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = (t - 0.5) * height;
      const angle = t * Math.PI * 2 * turns;

      // First helix
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      helix1Points.push(new THREE.Vector3(x1, y, z1));

      // Second helix (offset by PI)
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      helix2Points.push(new THREE.Vector3(x2, y, z2));

      // Connections (every 10 segments)
      if (i % 10 === 0) {
        connectionPoints.push(new THREE.Vector3(x1, y, z1));
        connectionPoints.push(new THREE.Vector3(x2, y, z2));
      }
    }

    return {
      helix1: new THREE.BufferGeometry().setFromPoints(helix1Points),
      helix2: new THREE.BufferGeometry().setFromPoints(helix2Points),
      connections: new THREE.BufferGeometry().setFromPoints(connectionPoints),
    };
  }, []);

  // Node points on helixes
  const nodePositions = useMemo(() => {
    const positions = [];
    const turns = 3;
    const height = 4;
    const radius = 0.8;
    
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const y = (t - 0.5) * height;
      const angle = t * Math.PI * 2 * turns;

      positions.push({
        pos1: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        pos2: [Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius],
      });
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* First helix strand */}
      <line geometry={helix1}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.9} />
      </line>

      {/* Second helix strand */}
      <line geometry={helix2}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.9} />
      </line>

      {/* Connections between strands */}
      <lineSegments geometry={connections}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.4} />
      </lineSegments>

      {/* Node points */}
      {nodePositions.map((node, i) => (
        <group key={i}>
          <mesh position={node.pos1}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color={wireframeColor} transparent opacity={0.9} />
          </mesh>
          <mesh position={node.pos2}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color={wireframeColor} transparent opacity={0.9} />
          </mesh>
          {/* Connection midpoint */}
          <mesh position={[
            (node.pos1[0] + node.pos2[0]) / 2,
            (node.pos1[1] + node.pos2[1]) / 2,
            (node.pos1[2] + node.pos2[2]) / 2,
          ]}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color={wireframeColor} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function WireframeDNA() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3, 1, 3], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <DNA />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}