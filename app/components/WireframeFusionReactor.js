"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function FusionReactor({ wireframeColor = "#8b5cf6" }) {
  const groupRef = useRef();
  const plasmaRef = useRef();
  const magnetRef = useRef();

  // Main torus (tokamak chamber)
  const torusGeometry = useMemo(() => {
    const points = [];
    const majorRadius = 1.5;
    const minorRadius = 0.5;
    const majorSegments = 32;
    const minorSegments = 16;

    for (let i = 0; i < majorSegments; i++) {
      const theta1 = (i / majorSegments) * Math.PI * 2;
      const theta2 = ((i + 1) / majorSegments) * Math.PI * 2;

      for (let j = 0; j < minorSegments; j++) {
        const phi1 = (j / minorSegments) * Math.PI * 2;
        const phi2 = ((j + 1) / minorSegments) * Math.PI * 2;

        // Current ring point
        const x1 =
          (majorRadius + minorRadius * Math.cos(phi1)) * Math.cos(theta1);
        const y1 = minorRadius * Math.sin(phi1);
        const z1 =
          (majorRadius + minorRadius * Math.cos(phi1)) * Math.sin(theta1);

        // Next point on same ring
        const x2 =
          (majorRadius + minorRadius * Math.cos(phi2)) * Math.cos(theta1);
        const y2 = minorRadius * Math.sin(phi2);
        const z2 =
          (majorRadius + minorRadius * Math.cos(phi2)) * Math.sin(theta1);

        // Point on next ring
        const x3 =
          (majorRadius + minorRadius * Math.cos(phi1)) * Math.cos(theta2);
        const y3 = minorRadius * Math.sin(phi1);
        const z3 =
          (majorRadius + minorRadius * Math.cos(phi1)) * Math.sin(theta2);

        // Ring segments
        points.push(new THREE.Vector3(x1, y1, z1));
        points.push(new THREE.Vector3(x2, y2, z2));

        // Connecting segments (every 4th)
        if (j % 4 === 0) {
          points.push(new THREE.Vector3(x1, y1, z1));
          points.push(new THREE.Vector3(x3, y3, z3));
        }
      }
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Inner plasma ring
  const plasmaGeometry = useMemo(() => {
    const points = [];
    const radius = 1.5;
    const segments = 48;

    for (let i = 0; i < segments; i++) {
      const angle1 = (i / segments) * Math.PI * 2;
      const angle2 = ((i + 1) / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle1) * radius,
          0,
          Math.sin(angle1) * radius
        )
      );
      points.push(
        new THREE.Vector3(
          Math.cos(angle2) * radius,
          0,
          Math.sin(angle2) * radius
        )
      );
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Magnetic field coils (vertical rings around torus)
  const coilsGeometry = useMemo(() => {
    const points = [];
    const numCoils = 12;
    const coilRadius = 0.8;

    for (let c = 0; c < numCoils; c++) {
      const angle = (c / numCoils) * Math.PI * 2;
      const centerX = Math.cos(angle) * 1.5;
      const centerZ = Math.sin(angle) * 1.5;

      for (let i = 0; i < 16; i++) {
        const phi1 = (i / 16) * Math.PI * 2;
        const phi2 = ((i + 1) / 16) * Math.PI * 2;

        // Create vertical ring at this position
        const x1 = centerX + Math.cos(phi1) * coilRadius * Math.cos(angle);
        const y1 = Math.sin(phi1) * coilRadius;
        const z1 = centerZ + Math.cos(phi1) * coilRadius * Math.sin(angle);

        const x2 = centerX + Math.cos(phi2) * coilRadius * Math.cos(angle);
        const y2 = Math.sin(phi2) * coilRadius;
        const z2 = centerZ + Math.cos(phi2) * coilRadius * Math.sin(angle);

        points.push(new THREE.Vector3(x1, y1, z1));
        points.push(new THREE.Vector3(x2, y2, z2));
      }
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Outer containment ring
  const containmentGeometry = useMemo(() => {
    const points = [];
    const radius = 2.2;
    const segments = 48;

    // Top ring
    for (let i = 0; i < segments; i++) {
      const angle1 = (i / segments) * Math.PI * 2;
      const angle2 = ((i + 1) / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle1) * radius,
          0.6,
          Math.sin(angle1) * radius
        )
      );
      points.push(
        new THREE.Vector3(
          Math.cos(angle2) * radius,
          0.6,
          Math.sin(angle2) * radius
        )
      );
    }

    // Bottom ring
    for (let i = 0; i < segments; i++) {
      const angle1 = (i / segments) * Math.PI * 2;
      const angle2 = ((i + 1) / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle1) * radius,
          -0.6,
          Math.sin(angle1) * radius
        )
      );
      points.push(
        new THREE.Vector3(
          Math.cos(angle2) * radius,
          -0.6,
          Math.sin(angle2) * radius
        )
      );
    }

    // Vertical supports
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          0.6,
          Math.sin(angle) * radius
        )
      );
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          -0.6,
          Math.sin(angle) * radius
        )
      );
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Energy beams (injection ports)
  const beamsGeometry = useMemo(() => {
    const points = [];
    const numBeams = 4;

    for (let i = 0; i < numBeams; i++) {
      const angle = (i / numBeams) * Math.PI * 2 + Math.PI / 4;
      const startX = Math.cos(angle) * 2.5;
      const startZ = Math.sin(angle) * 2.5;
      const endX = Math.cos(angle) * 1.5;
      const endZ = Math.sin(angle) * 1.5;

      points.push(new THREE.Vector3(startX, 0, startZ));
      points.push(new THREE.Vector3(endX, 0, endZ));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
    if (plasmaRef.current) {
      plasmaRef.current.rotation.y += 0.02;
    }
    if (magnetRef.current) {
      magnetRef.current.rotation.y -= 0.005;
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 8, 0, 0]}>
      {/* Main torus chamber */}
      <lineSegments geometry={torusGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.6} />
      </lineSegments>

      {/* Plasma ring */}
      <group ref={plasmaRef}>
        <lineSegments geometry={plasmaGeometry}>
          <lineBasicMaterial color={wireframeColor} transparent opacity={0.9} />
        </lineSegments>
      </group>

      {/* Magnetic coils */}
      <group ref={magnetRef}>
        <lineSegments geometry={coilsGeometry}>
          <lineBasicMaterial
            color={wireframeColor}
            transparent
            opacity={0.35}
          />
        </lineSegments>
      </group>

      {/* Containment structure */}
      <lineSegments geometry={containmentGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.5} />
      </lineSegments>

      {/* Energy beams */}
      <lineSegments geometry={beamsGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.7} />
      </lineSegments>

      {/* Center point */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color={wireframeColor} transparent opacity={0.8} />
      </mesh>

      {/* Injection port indicators */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 2.5, 0, Math.sin(angle) * 2.5]}
          >
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial
              color={wireframeColor}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function WireframeFusionReactor() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [4, 2.5, 4], fov: 45 }}
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
        <FusionReactor />
      </Canvas>
    </div>
  );
}
