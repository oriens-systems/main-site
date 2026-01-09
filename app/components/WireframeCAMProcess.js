"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// A stylized representation of CAM: A part with visible toolpaths
function MachinedPart({ color = "#8b5cf6" }) {
  const groupRef = useRef();
  const toolRef = useRef();
  const pathProgress = useRef(0);

  // The "stock" block
  const stockGeometry = useMemo(() => {
    return new THREE.BoxGeometry(3, 1.5, 2);
  }, []);

  // Pocket feature cut into the stock
  const pocketGeometry = useMemo(() => {
    return new THREE.BoxGeometry(2, 0.8, 1.2);
  }, []);

  // Generate spiral toolpath points (simplified pocket clearing pattern)
  const toolpathPoints = useMemo(() => {
    const points = [];
    const layers = 3;
    const passesPerLayer = 4;
    const startX = -0.8, endX = 0.8;
    const startZ = -0.4, endZ = 0.4;
    const stepover = (endZ - startZ) / passesPerLayer;
    
    for (let layer = 0; layer < layers; layer++) {
      const y = 0.75 - (layer * 0.25); // Descending into the pocket
      
      for (let pass = 0; pass <= passesPerLayer; pass++) {
        const z = startZ + (pass * stepover);
        const direction = pass % 2 === 0 ? 1 : -1;
        
        if (direction === 1) {
          points.push(new THREE.Vector3(startX, y, z));
          points.push(new THREE.Vector3(endX, y, z));
        } else {
          points.push(new THREE.Vector3(endX, y, z));
          points.push(new THREE.Vector3(startX, y, z));
        }
      }
    }
    return points;
  }, []);

  const toolpathGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(toolpathPoints);
  }, [toolpathPoints]);

  // Animate the tool along the path
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }

    if (toolRef.current && toolpathPoints.length > 1) {
      pathProgress.current += delta * 0.15;
      if (pathProgress.current > 1) pathProgress.current = 0;

      const totalPoints = toolpathPoints.length;
      const currentIndex = Math.floor(pathProgress.current * (totalPoints - 1));
      const nextIndex = Math.min(currentIndex + 1, totalPoints - 1);
      const t = (pathProgress.current * (totalPoints - 1)) % 1;

      const currentPoint = toolpathPoints[currentIndex];
      const nextPoint = toolpathPoints[nextIndex];

      toolRef.current.position.lerpVectors(currentPoint, nextPoint, t);
    }
  });

  return (
    <group ref={groupRef} rotation={[0.3, 0.5, 0]}>
      {/* Stock Material (Outer wireframe) */}
      <mesh geometry={stockGeometry}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[stockGeometry]} />
        <lineBasicMaterial color={color} transparent opacity={0.5} />
      </lineSegments>

      {/* Pocket Feature (the machined cavity) */}
      <group position={[0, 0.35, 0]}>
        <mesh geometry={pocketGeometry}>
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[pocketGeometry]} />
          <lineBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </lineSegments>
      </group>

      {/* Toolpath visualization */}
      <line geometry={toolpathGeometry}>
        <lineBasicMaterial color="#22c55e" transparent opacity={0.6} />
      </line>

      {/* Cutting Tool */}
      <group ref={toolRef} position={[0, 0.75, 0]}>
        {/* Tool shank */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.8} />
        </mesh>
        {/* Tool tip (end mill) */}
        <mesh>
          <cylinderGeometry args={[0.06, 0.08, 0.15, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.9} />
        </mesh>
        {/* Cutting glow */}
        <pointLight color={color} intensity={0.5} distance={1} />
      </group>

      {/* Datum/Origin indicator */}
      <group position={[-1.7, -0.9, 1.2]}>
        {/* X axis */}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, 0.4, 0, 0])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#ef4444" />
        </line>
        {/* Y axis */}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, 0, 0.4, 0])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#22c55e" />
        </line>
        {/* Z axis */}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, 0, 0, 0.4])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3b82f6" />
        </line>
      </group>
    </group>
  );
}

export default function WireframeCAMProcess() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [4, 3, 4], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <MachinedPart />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
