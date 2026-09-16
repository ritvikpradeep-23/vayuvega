"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { CostumeEra } from "@/lib/costumeData";

// Same hologram look as the tracker's Suits tab: one shared cyan wireframe
// rig, and amber gear that changes shape per era.
const RIG_COLOR = "#4dfff0";
const GEAR_COLOR = "#C99A4A";

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

function EraExtras({ era }: { era: CostumeEra }) {
  const torus = (r: number, tube: number) => new THREE.TorusGeometry(r, tube, 8, 24);
  const box = (x: number, y: number, z: number) => new THREE.BoxGeometry(x, y, z);

  switch (era) {
    case "flood-coat":
      // No external markings — the kasavu border is sewn hidden inside the collar.
      return <WireMesh geometry={torus(0.19, 0.007)} color={GEAR_COLOR} position={[0, 1.19, 0]} rotation={[Math.PI / 2, 0, 0]} />;
    case "windbreaker":
      // Gold piping visible at the cuffs, for the first time.
      return (
        <group>
          {[-0.34, 0.34].map((x) => (
            <WireMesh key={x} geometry={torus(0.055, 0.01)} color={GEAR_COLOR} position={[x, 0.34, 0]} rotation={[Math.PI / 2, 0, 0]} />
          ))}
          {[-0.11, 0.11].map((x) => (
            <WireMesh key={x} geometry={torus(0.065, 0.01)} color={GEAR_COLOR} position={[x, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]} />
          ))}
        </group>
      );
    case "waymark":
      // Kasavu grows into a full chest band; reinforced gloves and boots.
      return (
        <group>
          <WireMesh geometry={box(0.5, 0.09, 0.28)} color={GEAR_COLOR} position={[0, 0.9, 0]} />
          {[-0.34, 0.34].map((x) => (
            <WireMesh key={`g${x}`} geometry={box(0.15, 0.09, 0.15)} color={GEAR_COLOR} position={[x, 0.32, 0]} />
          ))}
          {[-0.11, 0.11].map((x) => (
            <WireMesh key={`b${x}`} geometry={box(0.09, 0.08, 0.14)} color={GEAR_COLOR} position={[x, 0.04, 0.02]} />
          ))}
        </group>
      );
    case "eye-form":
      // Kasavu trim runs the full seam line, not just the chest.
      return (
        <group>
          {[-0.22, 0.22].map((x) => (
            <WireMesh key={x} geometry={box(0.015, 0.58, 0.015)} color={GEAR_COLOR} position={[x, 0.86, 0.13]} />
          ))}
          <WireMesh geometry={box(0.015, 1.3, 0.015)} color={GEAR_COLOR} position={[0, 0.75, 0.13]} />
        </group>
      );
    case "storm-skin":
      // Woven through structural seams, chest to sleeve — the most visible it's ever been.
      return (
        <group>
          {[-0.22, 0.22].map((x) => (
            <WireMesh key={x} geometry={box(0.015, 0.58, 0.015)} color={GEAR_COLOR} position={[x, 0.86, 0.13]} />
          ))}
          {[-0.34, 0.34].map((x) => (
            <WireMesh key={`a${x}`} geometry={box(0.012, 0.54, 0.012)} color={GEAR_COLOR} position={[x, 0.58, 0.06]} rotation={[0, 0, x < 0 ? 0.14 : -0.14]} />
          ))}
          <WireMesh geometry={torus(0.08, 0.014)} color={GEAR_COLOR} position={[0, 0.95, 0.15]} />
          <WireMesh geometry={box(0.015, 1.3, 0.015)} color={GEAR_COLOR} position={[0, 0.75, 0.13]} />
        </group>
      );
  }
}

function CostumeFigure({ era }: { era: CostumeEra }) {
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

      {[-0.34, 0.34].map((x) => (
        <group key={`arm-${x}`}>
          <WireMesh geometry={upperLimb} position={[x, 0.78, 0]} rotation={[0, 0, x < 0 ? 0.14 : -0.14]} />
          <WireMesh geometry={joint} position={[x, 0.63, 0]} rotation={[Math.PI / 2, 0, 0]} />
          <WireMesh geometry={lowerLimb} position={[x, 0.47, 0]} rotation={[0, 0, x < 0 ? 0.06 : -0.06]} />
        </group>
      ))}

      {[-0.23, 0.23].map((x) => (
        <WireMesh key={`sh-${x}`} geometry={joint} position={[x, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]} />
      ))}

      {[-0.11, 0.11].map((x) => (
        <group key={`leg-${x}`}>
          <WireMesh geometry={upperLeg} position={[x, 0.42, 0]} />
          <WireMesh geometry={joint} position={[x, 0.27, 0]} rotation={[Math.PI / 2, 0, 0]} />
          <WireMesh geometry={lowerLeg} position={[x, 0.13, 0]} />
        </group>
      ))}

      {[-0.11, 0.11].map((x) => (
        <WireMesh key={`hip-${x}`} geometry={joint} position={[x, 0.58, 0]} rotation={[Math.PI / 2, 0, 0]} />
      ))}

      <EraExtras era={era} />
    </group>
  );
}

export default function CostumeModel3D({ era }: { era: CostumeEra }) {
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAutoRotate(!mq.matches);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [1.7, 1.3, 2.1], fov: 32 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#0b1622"]} />

        <group position={[0, -0.75, 0]}>
          <CostumeFigure era={era} />
        </group>

        <gridHelper args={[2.4, 10, RIG_COLOR, "#1c3049"]} position={[0, -0.749, 0]} />

        {[0.5, 0.7].map((r, i) => (
          <mesh key={r} position={[0, -0.748, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[r, r + 0.01, 64]} />
            <meshBasicMaterial color={RIG_COLOR} transparent opacity={i === 0 ? 0.55 : 0.25} toneMapped={false} />
          </mesh>
        ))}

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
          color: "#8FA3B8",
          pointerEvents: "none",
        }}
      >
        DRAG TO ROTATE
      </span>
    </div>
  );
}
