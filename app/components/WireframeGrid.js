"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GridPlane({ scrollProgress = 0 }) {
  const meshRef = useRef();
  const linesRef = useRef();

  // Create grid geometry
  const gridGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const size = 10;
    const divisions = 20;
    const step = size / divisions;

    // Horizontal lines
    for (let i = 0; i <= divisions; i++) {
      const y = -size / 2 + i * step;
      vertices.push(-size / 2, y, 0);
      vertices.push(size / 2, y, 0);
    }

    // Vertical lines
    for (let i = 0; i <= divisions; i++) {
      const x = -size / 2 + i * step;
      vertices.push(x, -size / 2, 0);
      vertices.push(x, size / 2, 0);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    return geometry;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      // Rotation based on scroll and time
      meshRef.current.rotation.x = Math.PI / 4 + scrollProgress * 0.5;
      meshRef.current.rotation.z = t * 0.05 + scrollProgress * 0.3;
      
      // Scale pulse
      const scale = 1 + Math.sin(t * 0.5) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main grid */}
      <lineSegments geometry={gridGeometry}>
        <lineBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.3}
        />
      </lineSegments>

      {/* Center cross highlight */}
      <mesh>
        <ringGeometry args={[0.8, 1, 4]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>

      {/* Corner markers */}
      {[[-4, -4], [-4, 4], [4, -4], [4, 4]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0]}>
          <circleGeometry args={[0.15, 16]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}

      {/* Moving scan line */}
      <mesh position={[0, Math.sin(Date.now() * 0.001) * 4, 0.01]}>
        <planeGeometry args={[10, 0.02]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

function FloatingNodes({ scrollProgress = 0 }) {
  const groupRef = useRef();
  const nodesRef = useRef([]);

  const nodePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 12; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 2,
        speed: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.z = scrollProgress * 0.2;
    }

    nodesRef.current.forEach((node, i) => {
      if (node) {
        const pos = nodePositions[i];
        node.position.y = pos.y + Math.sin(t * pos.speed + pos.phase) * 0.3;
        node.scale.setScalar(0.8 + Math.sin(t * pos.speed * 2 + pos.phase) * 0.2);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => (nodesRef.current[i] = el)}
          position={[pos.x, pos.y, pos.z]}
        >
          <octahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function ConnectionLines({ scrollProgress = 0 }) {
  const linesRef = useRef();

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    // Create connecting lines
    const points = [
      [-3, -2, 0], [0, 3, 0],
      [0, 3, 0], [4, 1, 0],
      [-4, 2, 0], [2, -3, 0],
      [-2, -4, 0], [3, 4, 0],
    ];
    
    points.forEach(p => vertices.push(...p));
    
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    
    return geometry;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.material.opacity = 0.15 + scrollProgress * 0.1;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={lineGeometry}>
      <lineBasicMaterial
        color="#8b5cf6"
        transparent
        opacity={0.2}
      />
    </lineSegments>
  );
}

function Scene({ scrollProgress }) {
  return (
    <>
      <GridPlane scrollProgress={scrollProgress} />
      <FloatingNodes scrollProgress={scrollProgress} />
      <ConnectionLines scrollProgress={scrollProgress} />
    </>
  );
}

export default function WireframeGrid({ scrollProgress = 0 }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
