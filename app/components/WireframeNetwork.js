"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Pulse packets that travel along connections
function DataPackets({ connections, color }) {
    const packetsRef = useRef();
    const packetCount = 20;
    
    // Create initial packet state
    const packets = useMemo(() => {
        return Array.from({ length: packetCount }).map(() => ({
            currentLineIndex: Math.floor(Math.random() * connections.length),
            progress: Math.random(),
            speed: 0.005 + Math.random() * 0.01
        }));
    }, [connections]);

    useFrame(() => {
        if (!packetsRef.current || connections.length === 0) return;
        
        const positions = packetsRef.current.geometry.attributes.position.array;
        
        packets.forEach((packet, i) => {
            packet.progress += packet.speed;
            
            if (packet.progress >= 1) {
                packet.progress = 0;
                packet.currentLineIndex = Math.floor(Math.random() * connections.length);
            }
            
            const line = connections[packet.currentLineIndex];
            const start = line.start;
            const end = line.end;
            
            // Interpolate position
            positions[i * 3] = start.x + (end.x - start.x) * packet.progress;
            positions[i * 3 + 1] = start.y + (end.y - start.y) * packet.progress;
            positions[i * 3 + 2] = start.z + (end.z - start.z) * packet.progress;
        });
        
        packetsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={packetsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={packetCount}
                    array={new Float32Array(packetCount * 3)}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#ffffff"
                size={0.12}
                transparent
                opacity={0.9}
                sizeAttenuation
            />
        </points>
    );
}

function NetworkNodes({ count = 15, color = "#8b5cf6" }) {
  const groupRef = useRef();
  const { mouse, viewport } = useThree();

  // Generate node positions in a spherical cluster
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        // Uniform sphere distribution
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 3 + Math.random() * 1; // Slightly larger spread
      
      temp.push({
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        scale: 0.06 + Math.random() * 0.08,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  // Generate connections between nearby nodes
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 3.5) { // Increased connection distance
          lines.push({
            start: nodes[i].position.clone(),
            end: nodes[j].position.clone(),
            opacity: Math.max(0.1, 1 - dist / 3.5) * 0.4,
          });
        }
      }
    }
    return lines;
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Auto rotation
      groupRef.current.rotation.y = t * 0.05;
      
      // Mouse interaction (parallax)
      const targetRotX = (mouse.y * viewport.height) / 100;
      const targetRotY = (mouse.x * viewport.width) / 100;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -targetRotY * 0.5, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[node.scale, 12, 12]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Connections */}
      {connections.map((conn, i) => {
        const points = [conn.start, conn.end];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={`line-${i}`} geometry={geometry}>
            <lineBasicMaterial color={color} transparent opacity={conn.opacity} />
          </line>
        );
      })}
      
      {/* Pulse Packets */}
      <DataPackets connections={connections} color={color} />

      {/* Central core - "The Mission" */}
      <mesh>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export default function WireframeNetwork() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <NetworkNodes />
      </Canvas>
    </div>
  );
}
