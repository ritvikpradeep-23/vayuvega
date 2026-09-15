"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { TrackerSuitId } from "@/lib/trackerSuitsData";

// One shared hologram look for every suit: the base rig always reads as the
// same cyan wireframe body, and only the suit-specific gear (amber) changes
// shape from suit to suit — matching the hologram-bay reference.
const RIG_COLOR = "#4dfff0";
const GEAR_COLOR = "#ffb000";

function WireMesh({
  geometry,
  color = RIG_COLOR,
  position,
  rotation,
}: {
  geometry: THREE.BufferGeometry;
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 1), [geometry]);
  return (
    <lineSegments position={position} rotation={rotation} geometry={edges}>
      <lineBasicMaterial color={color} transparent opacity={0.9} />
    </lineSegments>
  );
}

function PulseRing({ color, position }: { color: string; position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const mat = ref.current?.material as THREE.MeshBasicMaterial | undefined;
    if (mat) mat.opacity = 0.4 + Math.sin(clock.elapsedTime * 2.4) * 0.35;
  });
  return (
    <mesh ref={ref} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.05, 0.065, 24]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} toneMapped={false} />
    </mesh>
  );
}

function SuitExtras({ suitId }: { suitId: TrackerSuitId }) {
  const torus = (r: number, tube: number, arc?: number) =>
    new THREE.TorusGeometry(r, tube, 8, 24, arc ?? Math.PI * 2);
  const box = (x: number, y: number, z: number) => new THREE.BoxGeometry(x, y, z);
  const cone = (r: number, h: number, seg = 4) => new THREE.ConeGeometry(r, h, seg);

  switch (suitId) {
    case "thattu":
      return (
        <group>
          {/* coir-rope webbing lattice across the chest */}
          {[
            [Math.PI / 4, 0.75],
            [-Math.PI / 4, 0.75],
            [Math.PI / 4, 0.97],
            [-Math.PI / 4, 0.97],
          ].map(([rot, y], i) => (
            <WireMesh
              key={`x${i}`}
              geometry={box(0.42, 0.05, 0.02)}
              color={GEAR_COLOR}
              position={[0, y, 0.15]}
              rotation={[0, 0, rot]}
            />
          ))}
          {/* salvaged bicycle-chain joints */}
          {[
            [-0.34, 0.42],
            [0.34, 0.42],
            [-0.11, 0.05],
            [0.11, 0.05],
          ].map(([x, y], i) => (
            <WireMesh key={`j${i}`} geometry={torus(0.045, 0.012)} color={GEAR_COLOR} position={[x, y, 0.08]} />
          ))}
        </group>
      );
    case "kera-tech":
      return (
        <group>
          {[0.65, 0.82, 1.0, 1.17].map((y) => (
            <WireMesh key={y} geometry={box(0.05, 0.09, 0.02)} color={GEAR_COLOR} position={[0, y, 0.145]} />
          ))}
          {[-1, 1].map((side) => (
            <WireMesh
              key={side}
              geometry={cone(0.03, 0.38, 3)}
              color={GEAR_COLOR}
              position={[side * 0.42, 0.66, -0.04]}
              rotation={[0, 0, side * -0.55]}
            />
          ))}
        </group>
      );
    case "kayal-stealth":
      return (
        <group>
          <WireMesh geometry={torus(0.06, 0.013)} color={GEAR_COLOR} position={[0.34, 0.36, 0.03]} rotation={[Math.PI / 2, 0, 0]} />
          <PulseRing color={GEAR_COLOR} position={[0.34, 0.36, 0.035]} />
          {[-0.11, 0.11].map((x) => (
            <WireMesh key={x} geometry={cone(0.05, 0.08, 12)} color={GEAR_COLOR} position={[x, 0.02, -0.02]} rotation={[Math.PI / 2, 0, 0]} />
          ))}
        </group>
      );
    case "kaithapoo-storm": {
      const bolt = new THREE.Shape();
      bolt.moveTo(0, 0.22);
      bolt.lineTo(-0.06, 0.03);
      bolt.lineTo(0.015, 0.03);
      bolt.lineTo(-0.045, -0.22);
      bolt.lineTo(0.075, -0.01);
      bolt.lineTo(0, -0.01);
      bolt.lineTo(0, 0.22);
      return (
        <group>
          <WireMesh
            geometry={torus(0.3, 0.03, Math.PI * 0.6)}
            color={GEAR_COLOR}
            position={[0, 0.86, -0.16]}
            rotation={[0, Math.PI, 0]}
          />
          <WireMesh
            geometry={new THREE.ExtrudeGeometry(bolt, { depth: 0.02, bevelEnabled: false })}
            color={GEAR_COLOR}
            position={[0.02, 0.9, -0.16]}
          />
          {[-0.34, 0.34].map((x) => (
            <WireMesh key={x} geometry={torus(0.08, 0.018)} color={GEAR_COLOR} position={[x, 0.58, 0.05]} rotation={[0, 0, Math.PI / 2]} />
          ))}
        </group>
      );
    }
    case "theyyam-integrated":
      return (
        <group>
          {/* Theyyam-inspired headdress, radiating from the crown */}
          {Array.from({ length: 7 }).map((_, i) => {
            const angle = (i / 6) * Math.PI - Math.PI / 2;
            return (
              <WireMesh
                key={i}
                geometry={cone(0.02, 0.22, 4)}
                color={GEAR_COLOR}
                position={[Math.sin(angle) * 0.22, 1.56 + Math.cos(angle) * 0.1, -0.04]}
                rotation={[0, 0, -angle]}
              />
            );
          })}
          {/* HUD lenses */}
          {[-0.05, 0.05].map((x) => (
            <WireMesh key={x} geometry={new THREE.SphereGeometry(0.02, 8, 6)} color={GEAR_COLOR} position={[x, 1.37, 0.15]} />
          ))}
          {/* temple-brass joint rings */}
          {[
            [-0.34, 0.58],
            [0.34, 0.58],
            [-0.11, 0.55],
            [0.11, 0.55],
          ].map(([x, y], i) => (
            <WireMesh key={i} geometry={torus(0.075, 0.014)} color={GEAR_COLOR} position={[x, y, 0]} rotation={[0, 0, Math.PI / 2]} />
          ))}
        </group>
      );
  }
}

function SuitFigure({ suitId }: { suitId: TrackerSuitId }) {
  const torso = useMemo(() => new THREE.BoxGeometry(0.46, 0.58, 0.26), []);
  const head = useMemo(() => new THREE.IcosahedronGeometry(0.17, 1), []);
  const upperLimb = useMemo(() => new THREE.CylinderGeometry(0.065, 0.06, 0.28, 8), []);
  const lowerLimb = useMemo(() => new THREE.CylinderGeometry(0.06, 0.05, 0.26, 8), []);
  const upperLeg = useMemo(() => new THREE.CylinderGeometry(0.08, 0.07, 0.3, 8), []);
  const lowerLeg = useMemo(() => new THREE.CylinderGeometry(0.07, 0.06, 0.26, 8), []);
  const joint = useMemo(() => new THREE.TorusGeometry(0.045, 0.008, 6, 16), []);

  return (
    <group>
      <WireMesh geometry={torso} position={[0, 0.86, 0]} />
      <WireMesh geometry={head} position={[0, 1.36, 0]} />

      {/* arms: upper + elbow joint + forearm */}
      {[-0.34, 0.34].map((x) => (
        <group key={`arm-${x}`}>
          <WireMesh geometry={upperLimb} position={[x, 0.78, 0]} rotation={[0, 0, x < 0 ? 0.14 : -0.14]} />
          <WireMesh geometry={joint} position={[x, 0.63, 0]} rotation={[Math.PI / 2, 0, 0]} />
          <WireMesh geometry={lowerLimb} position={[x, 0.47, 0]} rotation={[0, 0, x < 0 ? 0.06 : -0.06]} />
        </group>
      ))}

      {/* shoulder joints */}
      {[-0.23, 0.23].map((x) => (
        <WireMesh key={`sh-${x}`} geometry={joint} position={[x, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]} />
      ))}

      {/* legs: thigh + knee joint + shin */}
      {[-0.11, 0.11].map((x) => (
        <group key={`leg-${x}`}>
          <WireMesh geometry={upperLeg} position={[x, 0.42, 0]} />
          <WireMesh geometry={joint} position={[x, 0.27, 0]} rotation={[Math.PI / 2, 0, 0]} />
          <WireMesh geometry={lowerLeg} position={[x, 0.13, 0]} />
        </group>
      ))}

      {/* hip joints */}
      {[-0.11, 0.11].map((x) => (
        <WireMesh key={`hip-${x}`} geometry={joint} position={[x, 0.58, 0]} rotation={[Math.PI / 2, 0, 0]} />
      ))}

      <SuitExtras suitId={suitId} />
    </group>
  );
}

export default function SuitModel3D({ suitId }: { suitId: TrackerSuitId }) {
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAutoRotate(!mq.matches);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [1.7, 1.3, 2.1], fov: 32 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#050b0c"]} />

        <group position={[0, -0.75, 0]}>
          <SuitFigure suitId={suitId} />
        </group>

        {/* perspective hologram floor */}
        <gridHelper args={[2.4, 10, RIG_COLOR, "#123a3c"]} position={[0, -0.749, 0]} />

        {/* light-ring pedestal */}
        {[0.5, 0.7].map((r, i) => (
          <mesh key={r} position={[0, -0.748, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[r, r + 0.01, 64]} />
            <meshBasicMaterial color={RIG_COLOR} transparent opacity={i === 0 ? 0.55 : 0.25} toneMapped={false} />
          </mesh>
        ))}

        {/* soft grounding shadow */}
        <mesh position={[0, -0.747, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.42, 32]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.35} />
        </mesh>

        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={1.5}
          maxDistance={3.2}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate={autoRotate}
          autoRotateSpeed={1.4}
          enableDamping
        />
      </Canvas>
      <span
        style={{
          position: "absolute",
          bottom: 8,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "0.6rem",
          letterSpacing: "0.08em",
          color: "var(--text-dim)",
          pointerEvents: "none",
        }}
      >
        DRAG TO ROTATE
      </span>
    </div>
  );
}
