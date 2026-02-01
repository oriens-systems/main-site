"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Shield({ wireframeColor = "#8b5cf6" }) {
  const groupRef = useRef();
  const innerGroupRef = useRef();

  // Shield shape (curved pentagon)
  const shieldGeometry = useMemo(() => {
    const points = [];
    const scale = 1.3;

    // Shield outline - curved top, pointed bottom
    const shieldPoints = [
      [-0.8, 0.9],
      [-0.95, 0.3],
      [-0.7, -0.5],
      [0, -1.2],
      [0.7, -0.5],
      [0.95, 0.3],
      [0.8, 0.9],
    ];

    // Create curved top
    for (let i = 0; i < 8; i++) {
      const t = i / 7;
      const x = -0.8 + t * 1.6;
      const y = 0.9 + Math.sin(t * Math.PI) * 0.3;
      shieldPoints.unshift([x, y]);
    }

    // Connect the points
    for (let i = 0; i < shieldPoints.length; i++) {
      const [x1, y1] = shieldPoints[i];
      const [x2, y2] = shieldPoints[(i + 1) % shieldPoints.length];
      points.push(new THREE.Vector3(x1 * scale, y1 * scale, 0));
      points.push(new THREE.Vector3(x2 * scale, y2 * scale, 0));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Inner shield layers
  const innerShieldGeometry = useMemo(() => {
    const points = [];
    const scales = [0.75, 0.5];

    scales.forEach((scale) => {
      const shieldPoints = [];

      // Curved top
      for (let i = 0; i < 8; i++) {
        const t = i / 7;
        const x = -0.8 + t * 1.6;
        const y = 0.9 + Math.sin(t * Math.PI) * 0.3;
        shieldPoints.push([x, y]);
      }

      shieldPoints.push(
        [0.8, 0.9],
        [0.95, 0.3],
        [0.7, -0.5],
        [0, -1.2],
        [-0.7, -0.5],
        [-0.95, 0.3],
        [-0.8, 0.9]
      );

      for (let i = 0; i < shieldPoints.length; i++) {
        const [x1, y1] = shieldPoints[i];
        const [x2, y2] = shieldPoints[(i + 1) % shieldPoints.length];
        points.push(
          new THREE.Vector3(x1 * scale * 1.3, y1 * scale * 1.3, 0.05)
        );
        points.push(
          new THREE.Vector3(x2 * scale * 1.3, y2 * scale * 1.3, 0.05)
        );
      }
    });

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Cross pattern inside
  const crossGeometry = useMemo(() => {
    const points = [];

    // Vertical line
    points.push(new THREE.Vector3(0, 1.1, 0.1));
    points.push(new THREE.Vector3(0, -0.9, 0.1));

    // Horizontal line
    points.push(new THREE.Vector3(-0.7, 0.3, 0.1));
    points.push(new THREE.Vector3(0.7, 0.3, 0.1));

    // Diagonal supports
    points.push(new THREE.Vector3(-0.5, 0.8, 0.1));
    points.push(new THREE.Vector3(0, 0.3, 0.1));
    points.push(new THREE.Vector3(0.5, 0.8, 0.1));
    points.push(new THREE.Vector3(0, 0.3, 0.1));
    points.push(new THREE.Vector3(-0.4, -0.3, 0.1));
    points.push(new THREE.Vector3(0, -0.9, 0.1));
    points.push(new THREE.Vector3(0.4, -0.3, 0.1));
    points.push(new THREE.Vector3(0, -0.9, 0.1));

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Radar waves emanating
  const radarGeometry = useMemo(() => {
    const points = [];
    const waves = 3;

    for (let w = 0; w < waves; w++) {
      const radius = 0.6 + w * 0.4;
      const segments = 16;
      const startAngle = -Math.PI / 3;
      const endAngle = Math.PI / 3;

      for (let i = 0; i < segments; i++) {
        const angle1 = startAngle + (i / segments) * (endAngle - startAngle);
        const angle2 =
          startAngle + ((i + 1) / segments) * (endAngle - startAngle);
        points.push(
          new THREE.Vector3(
            Math.sin(angle1) * radius,
            Math.cos(angle1) * radius + 0.2,
            -0.3 - w * 0.2
          )
        );
        points.push(
          new THREE.Vector3(
            Math.sin(angle2) * radius,
            Math.cos(angle2) * radius + 0.2,
            -0.3 - w * 0.2
          )
        );
      }
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Hexagonal grid overlay
  const hexGridGeometry = useMemo(() => {
    const points = [];
    const hexSize = 0.25;

    for (let row = -2; row <= 2; row++) {
      for (let col = -2; col <= 2; col++) {
        const xOffset = col * hexSize * 1.5;
        const yOffset = row * hexSize * 1.732 + (col % 2) * hexSize * 0.866;

        // Check if within shield bounds (roughly)
        if (Math.abs(xOffset) < 0.9 && yOffset > -1.0 && yOffset < 1.0) {
          for (let i = 0; i < 6; i++) {
            const angle1 = (i / 6) * Math.PI * 2;
            const angle2 = ((i + 1) / 6) * Math.PI * 2;
            points.push(
              new THREE.Vector3(
                xOffset + Math.cos(angle1) * hexSize * 0.4,
                yOffset + Math.sin(angle1) * hexSize * 0.4,
                0.15
              )
            );
            points.push(
              new THREE.Vector3(
                xOffset + Math.cos(angle2) * hexSize * 0.4,
                yOffset + Math.sin(angle2) * hexSize * 0.4,
                0.15
              )
            );
          }
        }
      }
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
    if (innerGroupRef.current) {
      innerGroupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main shield outline */}
      <lineSegments geometry={shieldGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.9} />
      </lineSegments>

      {/* Inner shield layers */}
      <lineSegments geometry={innerShieldGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.4} />
      </lineSegments>

      {/* Cross pattern */}
      <lineSegments geometry={crossGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.6} />
      </lineSegments>

      {/* Hex grid */}
      <lineSegments geometry={hexGridGeometry}>
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.2} />
      </lineSegments>

      {/* Radar waves */}
      <group ref={innerGroupRef}>
        <lineSegments geometry={radarGeometry}>
          <lineBasicMaterial color={wireframeColor} transparent opacity={0.3} />
        </lineSegments>
      </group>

      {/* Center point */}
      <mesh position={[0, 0.1, 0.15]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color={wireframeColor} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

export default function WireframeShield() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
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
        <Shield />
      </Canvas>
    </div>
  );
}
