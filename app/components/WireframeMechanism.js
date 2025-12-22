"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Engine Block
function EngineBlock() {
  return (
    <group>
      {/* Main block body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.5, 1.8, 1.2]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.25} />
      </mesh>
      {/* Cylinder bank - left */}
      <mesh position={[-0.8, 1.2, 0]} rotation={[0, 0, Math.PI / 8]}>
        <boxGeometry args={[1.8, 1.2, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.2} />
      </mesh>
      {/* Cylinder bank - right */}
      <mesh position={[0.8, 1.2, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <boxGeometry args={[1.8, 1.2, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.2} />
      </mesh>
      {/* Oil pan */}
      <mesh position={[0, -1.1, 0]}>
        <boxGeometry args={[3, 0.4, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Cylinder with piston
function Cylinder({ position, rotation, crankAngle, offset = 0 }) {
  const pistonRef = useRef();
  const rodRef = useRef();
  const crankPinRef = useRef();

  useFrame(() => {
    const angle = crankAngle + offset;
    const stroke = 0.4;
    const rodLength = 0.8;

    // Calculate piston position based on crank angle
    const crankY = Math.cos(angle) * stroke;
    const pistonY = crankY + Math.sqrt(rodLength * rodLength - Math.pow(Math.sin(angle) * stroke, 2)) * 0.5;

    if (pistonRef.current) {
      pistonRef.current.position.y = pistonY + 0.6;
    }

    // Connecting rod angle
    if (rodRef.current) {
      const rodAngle = Math.asin((Math.sin(angle) * stroke) / rodLength);
      rodRef.current.rotation.z = rodAngle;
      rodRef.current.position.y = pistonY * 0.5 + 0.1;
    }

    if (crankPinRef.current) {
      crankPinRef.current.position.x = Math.sin(angle) * stroke;
      crankPinRef.current.position.y = Math.cos(angle) * stroke;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Cylinder wall */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 1.2, 12, 1, true]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Piston */}
      <mesh ref={pistonRef} position={[0, 1, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 12]} />
        <meshBasicMaterial color="#9f7aea" wireframe transparent opacity={0.6} />
      </mesh>

      {/* Piston rings */}
      <mesh ref={pistonRef} position={[0, 1.05, 0]}>
        <torusGeometry args={[0.25, 0.02, 8, 16]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.5} />
      </mesh>

      {/* Connecting rod */}
      <mesh ref={rodRef} position={[0, 0.3, 0]}>
        <boxGeometry args={[0.08, 0.9, 0.06]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.5} />
      </mesh>

      {/* Crank pin (visual connection point) */}
      <mesh ref={crankPinRef} position={[0, -0.2, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#9f7aea" wireframe transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// Crankshaft with proper throws
function Crankshaft({ scrollProgress = 0 }) {
  const crankRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const angle = t * 2 + scrollProgress * 4;
    
    if (crankRef.current) {
      crankRef.current.rotation.z = angle;
    }
  });

  return (
    <group position={[0, -0.8, 0]}>
      {/* Main journals */}
      <mesh ref={crankRef}>
        <group>
          {/* Main shaft */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 2.5, 8]} />
            <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.5} />
          </mesh>

          {/* Crank throws */}
          {[-0.8, 0, 0.8].map((z, i) => (
            <group key={i} position={[0, 0, z]} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
              {/* Crank web */}
              <mesh position={[0.2, 0, 0]}>
                <boxGeometry args={[0.35, 0.15, 0.2]} />
                <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.4} />
              </mesh>
              {/* Crank pin */}
              <mesh position={[0.35, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.25, 8]} />
                <meshBasicMaterial color="#9f7aea" wireframe transparent opacity={0.5} />
              </mesh>
              {/* Counterweight */}
              <mesh position={[-0.25, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.15, 0.15, 8]} />
                <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.3} />
              </mesh>
            </group>
          ))}
        </group>
      </mesh>
    </group>
  );
}

// Camshaft
function Camshaft({ position, scrollProgress = 0 }) {
  const camRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (camRef.current) {
      // Camshaft rotates at half crankshaft speed
      camRef.current.rotation.z = (t + scrollProgress * 2);
    }
  });

  return (
    <group position={position}>
      <mesh ref={camRef} rotation={[Math.PI / 2, 0, 0]}>
        {/* Cam shaft */}
        <cylinderGeometry args={[0.06, 0.06, 1.5, 8]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Cam lobes */}
      {[-0.4, 0, 0.4].map((z, i) => (
        <mesh key={i} position={[0.08, 0, z]} rotation={[0, 0, (i * Math.PI) / 2]}>
          <boxGeometry args={[0.12, 0.08, 0.1]} />
          <meshBasicMaterial color="#9f7aea" wireframe transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// Timing Chain/Belt
function TimingChain({ scrollProgress = 0 }) {
  const chainRef = useRef();

  const chainPath = useMemo(() => {
    const points = [];
    // Create chain path around sprockets
    for (let i = 0; i <= 32; i++) {
      const t = (i / 32) * Math.PI * 2;
      const x = Math.cos(t) * 0.3;
      const y = Math.sin(t) * 0.8 + 0.4;
      points.push(new THREE.Vector3(x, y, 0));
    }
    return new THREE.CatmullRomCurve3(points, true);
  }, []);

  const chainGeometry = useMemo(() => {
    return new THREE.TubeGeometry(chainPath, 32, 0.02, 8, true);
  }, [chainPath]);

  return (
    <group position={[-1.5, 0, 0.8]}>
      <mesh geometry={chainGeometry}>
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Top sprocket */}
      <mesh position={[0, 1.2, 0]}>
        <torusGeometry args={[0.15, 0.03, 8, 16]} />
        <meshBasicMaterial color="#9f7aea" wireframe transparent opacity={0.5} />
      </mesh>
      {/* Bottom sprocket */}
      <mesh position={[0, -0.4, 0]}>
        <torusGeometry args={[0.25, 0.04, 8, 16]} />
        <meshBasicMaterial color="#9f7aea" wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// Intake/Exhaust Manifold
function Manifold({ position, side = "left" }) {
  const pipes = side === "left" ? [-0.4, 0, 0.4] : [-0.4, 0, 0.4];
  const xOffset = side === "left" ? -0.6 : 0.6;

  return (
    <group position={position}>
      {/* Main collector */}
      <mesh position={[xOffset * 1.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 1.2, 8]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.35} />
      </mesh>
      {/* Runner pipes */}
      {pipes.map((z, i) => (
        <mesh key={i} position={[xOffset, 0, z]} rotation={[0, 0, side === "left" ? -Math.PI / 6 : Math.PI / 6]}>
          <cylinderGeometry args={[0.06, 0.08, 0.5, 8]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// Valve Cover
function ValveCover({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[1.6, 0.25, 0.9]} />
        <meshBasicMaterial color="#9f7aea" wireframe transparent opacity={0.3} />
      </mesh>
      {/* Breather cap */}
      <mesh position={[0.4, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.15, 8]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Flywheel
function Flywheel({ position, scrollProgress = 0 }) {
  const wheelRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (wheelRef.current) {
      wheelRef.current.rotation.z = t * 2 + scrollProgress * 4;
    }
  });

  return (
    <group ref={wheelRef} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 24]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Ring gear teeth indication */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.03, 8, 48]} />
        <meshBasicMaterial color="#9f7aea" wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function Scene({ scrollProgress }) {
  const groupRef = useRef();
  const [crankAngle, setCrankAngle] = useState(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    setCrankAngle(t * 2 + scrollProgress * 4);
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.PI / 6 + scrollProgress * 0.3;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0]} scale={1.2}>
      {/* Engine Block */}
      <EngineBlock />

      {/* V6 Cylinders - Left Bank */}
      <Cylinder 
        position={[-0.8, 0.5, -0.35]} 
        rotation={[0, 0, Math.PI / 8]} 
        crankAngle={crankAngle}
        offset={0}
      />
      <Cylinder 
        position={[-0.8, 0.5, 0]} 
        rotation={[0, 0, Math.PI / 8]} 
        crankAngle={crankAngle}
        offset={Math.PI * 2 / 3}
      />
      <Cylinder 
        position={[-0.8, 0.5, 0.35]} 
        rotation={[0, 0, Math.PI / 8]} 
        crankAngle={crankAngle}
        offset={Math.PI * 4 / 3}
      />

      {/* V6 Cylinders - Right Bank */}
      <Cylinder 
        position={[0.8, 0.5, -0.35]} 
        rotation={[0, 0, -Math.PI / 8]} 
        crankAngle={crankAngle}
        offset={Math.PI / 3}
      />
      <Cylinder 
        position={[0.8, 0.5, 0]} 
        rotation={[0, 0, -Math.PI / 8]} 
        crankAngle={crankAngle}
        offset={Math.PI}
      />
      <Cylinder 
        position={[0.8, 0.5, 0.35]} 
        rotation={[0, 0, -Math.PI / 8]} 
        crankAngle={crankAngle}
        offset={Math.PI * 5 / 3}
      />

      {/* Crankshaft */}
      <Crankshaft scrollProgress={scrollProgress} />

      {/* Camshafts */}
      <Camshaft position={[-0.9, 1.6, 0]} scrollProgress={scrollProgress} />
      <Camshaft position={[0.9, 1.6, 0]} scrollProgress={scrollProgress} />

      {/* Valve Covers */}
      <ValveCover position={[-0.8, 1.85, 0]} rotation={[0, 0, Math.PI / 8]} />
      <ValveCover position={[0.8, 1.85, 0]} rotation={[0, 0, -Math.PI / 8]} />

      {/* Timing Chain */}
      <TimingChain scrollProgress={scrollProgress} />

      {/* Manifolds */}
      <Manifold position={[-1.2, 1, 0]} side="left" />
      <Manifold position={[1.2, 1, 0]} side="right" />

      {/* Flywheel */}
      <Flywheel position={[0, -0.8, -1]} scrollProgress={scrollProgress} />
    </group>
  );
}

export default function WireframeMechanism({ scrollProgress = 0 }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
