"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Satellite({ wireframeColor = "#8b5cf6" }) {
  const groupRef = useRef();

  // Main body (hexagonal prism)
  const bodyGeometry = useMemo(() => {
    const points = [];
    const radius = 0.4;
    const height = 1.2;
    
    // Create hexagonal top and bottom
    for (let i = 0; i < 6; i++) {
      const angle1 = (i / 6) * Math.PI * 2;
      const angle2 = ((i + 1) / 6) * Math.PI * 2;
      const x1 = Math.cos(angle1) * radius;
      const z1 = Math.sin(angle1) * radius;
      const x2 = Math.cos(angle2) * radius;
      const z2 = Math.sin(angle2) * radius;
      
      // Top hexagon
      points.push(new THREE.Vector3(x1, height/2, z1));
      points.push(new THREE.Vector3(x2, height/2, z2));
      
      // Bottom hexagon
      points.push(new THREE.Vector3(x1, -height/2, z1));
      points.push(new THREE.Vector3(x2, -height/2, z2));
      
      // Vertical edges
      points.push(new THREE.Vector3(x1, height/2, z1));
      points.push(new THREE.Vector3(x1, -height/2, z1));
    }
    
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Solar panels
  const solarPanelGeometry = useMemo(() => {
    const points = [];
    const panelWidth = 1.8;
    const panelHeight = 0.8;
    const offset = 0.5;
    
    // Left panel
    points.push(new THREE.Vector3(-offset, panelHeight/2, 0));
    points.push(new THREE.Vector3(-offset - panelWidth, panelHeight/2, 0));
    points.push(new THREE.Vector3(-offset - panelWidth, panelHeight/2, 0));
    points.push(new THREE.Vector3(-offset - panelWidth, -panelHeight/2, 0));
    points.push(new THREE.Vector3(-offset - panelWidth, -panelHeight/2, 0));
    points.push(new THREE.Vector3(-offset, -panelHeight/2, 0));
    points.push(new THREE.Vector3(-offset, -panelHeight/2, 0));
    points.push(new THREE.Vector3(-offset, panelHeight/2, 0));
    
    // Left panel grid
    for (let i = 1; i < 4; i++) {
      const x = -offset - (panelWidth * i / 4);
      points.push(new THREE.Vector3(x, panelHeight/2, 0));
      points.push(new THREE.Vector3(x, -panelHeight/2, 0));
    }
    points.push(new THREE.Vector3(-offset, 0, 0));
    points.push(new THREE.Vector3(-offset - panelWidth, 0, 0));
    
    // Right panel
    points.push(new THREE.Vector3(offset, panelHeight/2, 0));
    points.push(new THREE.Vector3(offset + panelWidth, panelHeight/2, 0));
    points.push(new THREE.Vector3(offset + panelWidth, panelHeight/2, 0));
    points.push(new THREE.Vector3(offset + panelWidth, -panelHeight/2, 0));
    points.push(new THREE.Vector3(offset + panelWidth, -panelHeight/2, 0));
    points.push(new THREE.Vector3(offset, -panelHeight/2, 0));
    points.push(new THREE.Vector3(offset, -panelHeight/2, 0));
    points.push(new THREE.Vector3(offset, panelHeight/2, 0));
    
    // Right panel grid
    for (let i = 1; i < 4; i++) {
      const x = offset + (panelWidth * i / 4);
      points.push(new THREE.Vector3(x, panelHeight/2, 0));
      points.push(new THREE.Vector3(x, -panelHeight/2, 0));
    }
    points.push(new THREE.Vector3(offset, 0, 0));
    points.push(new THREE.Vector3(offset + panelWidth, 0, 0));
    
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Antenna dish
  const antennaGeometry = useMemo(() => {
    const points = [];
    const segments = 16;
    const radius = 0.35;
    
    // Dish circle
    for (let i = 0; i < segments; i++) {
      const angle1 = (i / segments) * Math.PI * 2;
      const angle2 = ((i + 1) / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle1) * radius, 0.6 + 0.15, Math.sin(angle1) * radius + 0.3));
      points.push(new THREE.Vector3(Math.cos(angle2) * radius, 0.6 + 0.15, Math.sin(angle2) * radius + 0.3));
    }
    
    // Antenna arm
    points.push(new THREE.Vector3(0, 0.6, 0));
    points.push(new THREE.Vector3(0, 0.6 + 0.15, 0.3));
    
    // Feed horn
    points.push(new THREE.Vector3(0, 0.6 + 0.15, 0.3));
    points.push(new THREE.Vector3(0, 0.6 + 0.15 + 0.2, 0.3));
    
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Orbital ring
  const orbitGeometry = useMemo(() => {
    const points = [];
    const segments = 48;
    const radius = 2.8;
    
    for (let i = 0; i < segments; i++) {
      const angle1 = (i / segments) * Math.PI * 2;
      const angle2 = ((i + 1) / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle1) * radius, 0, Math.sin(angle1) * radius));
      points.push(new THREE.Vector3(Math.cos(angle2) * radius, 0, Math.sin(angle2) * radius));
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
      {/* Main body */}
      <lineSegments geometry={bodyGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.9} />
      </lineSegments>
      
      {/* Solar panels */}
      <lineSegments geometry={solarPanelGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.7} />
      </lineSegments>
      
      {/* Antenna */}
      <lineSegments geometry={antennaGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.8} />
      </lineSegments>
      
      {/* Orbital ring */}
      <group rotation={[Math.PI / 6, 0, Math.PI / 8]}>
        <lineSegments geometry={orbitGeometry}>
          <lineBasicMaterial color={wireframeColor} transparent opacity={0.15} />
        </lineSegments>
      </group>
      
      {/* Corner points on body */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.4, 0.6, Math.sin(angle) * 0.4]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={wireframeColor} transparent opacity={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function WireframeSatellite() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3.5, 2, 3.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Satellite />
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