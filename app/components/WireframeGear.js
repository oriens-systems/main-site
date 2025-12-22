"use client";

import { Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Gear() {
  const groupRef = useRef();
  
  // Create gear shape geometry
  const gearShape = useMemo(() => {
    const shape = new THREE.Shape();
    const teeth = 12;
    const innerRadius = 1.2;
    const outerRadius = 2;
    const toothHeight = 0.4;
    
    for (let i = 0; i < teeth; i++) {
      const angle1 = (i / teeth) * Math.PI * 2;
      const angle2 = ((i + 0.3) / teeth) * Math.PI * 2;
      const angle3 = ((i + 0.5) / teeth) * Math.PI * 2;
      const angle4 = ((i + 0.8) / teeth) * Math.PI * 2;
      
      const r1 = outerRadius;
      const r2 = outerRadius + toothHeight;
      
      if (i === 0) {
        shape.moveTo(Math.cos(angle1) * r1, Math.sin(angle1) * r1);
      }
      
      shape.lineTo(Math.cos(angle2) * r1, Math.sin(angle2) * r1);
      shape.lineTo(Math.cos(angle2) * r2, Math.sin(angle2) * r2);
      shape.lineTo(Math.cos(angle3) * r2, Math.sin(angle3) * r2);
      shape.lineTo(Math.cos(angle3) * r1, Math.sin(angle3) * r1);
      shape.lineTo(Math.cos(angle4) * r1, Math.sin(angle4) * r1);
    }
    
    shape.closePath();
    
    // Add center hole
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
    
    return shape;
  }, []);

  const extrudeSettings = {
    steps: 1,
    depth: 0.3,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 2,
  };

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.003;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.3, 0, 0]}>
      {/* Main gear */}
      <mesh position={[0, 0, -0.15]}>
        <extrudeGeometry args={[gearShape, extrudeSettings]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Inner ring detail */}
      <mesh>
        <torusGeometry args={[0.6, 0.08, 8, 24]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Center hub */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 12]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      
      {/* Spokes */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={i}
          rotation={[Math.PI / 2, 0, (i / 6) * Math.PI * 2]}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 0.8,
            Math.sin((i / 6) * Math.PI * 2) * 0.8,
            0,
          ]}
        >
          <boxGeometry args={[0.6, 0.08, 0.08]} />
          <meshBasicMaterial
            color="#8b5cf6"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function WireframeGear({ className = "" }) {
  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: false, alpha: true }}
        dpr={1}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Gear />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
