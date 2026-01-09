"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function ConstructionRing({ radius, speed, rotationAxis, segments = 8, color = "#8b5cf6" }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
        ringRef.current.rotation.x += rotationAxis[0] * speed;
        ringRef.current.rotation.y += rotationAxis[1] * speed;
        ringRef.current.rotation.z += rotationAxis[2] * speed;
    }
  });

  const geometry = useMemo(() => {
    const points = [];
    // Create segmented ring
    for (let i = 0; i < segments; i++) {
        const startAngle = (i / segments) * Math.PI * 2;
        const endAngle = ((i + 0.7) / segments) * Math.PI * 2; // Gap between segments
        
        const curvePath = new THREE.CurvePath();
        const curve = new THREE.EllipseCurve(
            0, 0,
            radius, radius,
            startAngle, endAngle,
            false,
            0
        );
        const pts = curve.getPoints(10);
        points.push(...pts);
        // Add disconnect to stop lines connecting segments (naive approach needs segments separate)
    }
    // Better approach for segments: return array of geometries or multiple lines
    return null; 
  }, [radius, segments]);

  // Alternate approach: Render multiple arc segments
  return (
    <group ref={ringRef}>
      {Array.from({ length: segments }).map((_, i) => {
        const angle = (i / segments) * Math.PI * 2;
        const arcLength = (Math.PI * 2) / segments * 0.7; // 70% fill
        
        // Arc geometry
        const arcPoints = [];
        const resolution = 12;
        for(let j=0; j<=resolution; j++) {
            const theta = angle + (j/resolution) * arcLength;
            arcPoints.push(new THREE.Vector3(Math.cos(theta)*radius, Math.sin(theta)*radius, 0));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(arcPoints);

        return (
            <group key={i}>
                <line geometry={geometry}>
                    <lineBasicMaterial color={color} transparent opacity={0.6} />
                </line>
                {/* Construction Nodes at ends of segments */}
                <mesh position={[Math.cos(angle)*radius, Math.sin(angle)*radius, 0]}>
                    <boxGeometry args={[0.08, 0.08, 0.08]} />
                    <meshBasicMaterial color={color} wireframe />
                </mesh>
                <mesh position={[Math.cos(angle + arcLength)*radius, Math.sin(angle + arcLength)*radius, 0]}>
                    <boxGeometry args={[0.08, 0.08, 0.08]} />
                    <meshBasicMaterial color={color} wireframe />
                </mesh>
            </group>
        )
      })}
    </group>
  );
}

function CoreModule() {
    const meshRef = useRef();
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if(meshRef.current) {
            meshRef.current.rotation.y = t * 0.5;
            meshRef.current.rotation.z = t * 0.2;
        }
    });

    return (
        <group ref={meshRef}>
            <mesh>
                <icosahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.8} />
            </mesh>
            <mesh scale={0.6}>
                <octahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.4} />
            </mesh>
        </group>
    )
}

function FloatingModules() {
    const groupRef = useRef();
    
    useFrame((state) => {
        if(groupRef.current) {
            groupRef.current.rotation.y += 0.05; // Orbit entire swarm
        }
    });

    return (
        <group ref={groupRef}>
            {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const radius = 3.5;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const y = Math.sin(angle * 3) * 1.5; // Wave pattern

                return (
                    <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1}>
                        <group position={[x, y, z]}>
                            <mesh>
                                <boxGeometry args={[0.3, 0.3, 0.3]} />
                                <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.4} />
                            </mesh>
                             {/* Connector line to center? Maybe too messy. */}
                        </group>
                    </Float>
                );
            })}
        </group>
    );
}

function AssemblyScene() {
    return (
        <group scale={0.7} rotation={[0.4, 0, 0]}>
            <CoreModule />
            
            {/* Inner Ring - X axis rotation approx */}
            <ConstructionRing 
                radius={1.8} 
                speed={0.005} 
                rotationAxis={[1, 0.2, 0]} 
                segments={3} 
                color="#8b5cf6"
            />
            
            {/* Middle Ring - Y/Z hybrid */}
            <ConstructionRing 
                radius={2.6} 
                speed={0.004} 
                rotationAxis={[0.2, 1, 0.2]} 
                segments={5} 
                color="#a78bfa"
            />
            
            {/* Outer Ring - Z axis dominant */}
            <ConstructionRing 
                radius={3.8} 
                speed={0.003} 
                rotationAxis={[0, 0.2, 1]} 
                segments={6} 
                color="#7c3aed"
            />

            <FloatingModules />
        </group>
    );
}

export default function WireframeOrbitalAssembly() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <AssemblyScene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
