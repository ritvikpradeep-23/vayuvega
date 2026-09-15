"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import type { TrackerSuitId } from "@/lib/trackerSuitsData";

interface SuitTheme {
  base: string;
  baseDark: string;
  accent: string;
}

const SUIT_THEME: Record<TrackerSuitId, SuitTheme> = {
  "monsoon-weave": { base: "#2d3a3c", baseDark: "#1a2223", accent: "#4dfff0" },
  "kayal-stealth": { base: "#17181a", baseDark: "#0c0d0e", accent: "#f5a623" },
  "onam-festival": { base: "#9c2b33", baseDark: "#6e1e24", accent: "#d4af37" },
  "signal-storm": { base: "#2c2560", baseDark: "#1c1740", accent: "#ff7a30" },
  "backup-stitch": { base: "#2d3a3c", baseDark: "#1a2223", accent: "#7fb8b0" },
};

function PulseGlow({ color, position }: { color: string; position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const mat = ref.current?.material as THREE.MeshStandardMaterial | undefined;
    if (mat) mat.emissiveIntensity = 0.6 + Math.sin(clock.elapsedTime * 2.4) * 0.5;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.045, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} toneMapped={false} />
    </mesh>
  );
}

function SuitExtras({ suitId, accent }: { suitId: TrackerSuitId; accent: string }) {
  const patchGeom = useMemo(() => new THREE.BoxGeometry(0.22, 0.18, 0.02), []);

  switch (suitId) {
    case "monsoon-weave":
      return (
        <group>
          {[0.68, 0.86, 1.04].map((y) => (
            <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.3, 0.012, 8, 32]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} toneMapped={false} />
            </mesh>
          ))}
          <mesh position={[0, 0.95, 0.15]}>
            <torusGeometry args={[0.07, 0.014, 8, 24]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1} toneMapped={false} />
          </mesh>
        </group>
      );
    case "kayal-stealth":
      return (
        <group>
          <mesh position={[0, 1.42, -0.05]}>
            <sphereGeometry args={[0.21, 16, 16]} />
            <meshStandardMaterial color="#0c0d0e" roughness={0.9} />
          </mesh>
          <PulseGlow color={accent} position={[0, 0.95, 0.16]} />
        </group>
      );
    case "onam-festival":
      return (
        <group>
          {[-0.34, 0.34].map((x) => (
            <mesh key={x} position={[x, 0.58, 0]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.09, 0.016, 8, 24]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} toneMapped={false} />
            </mesh>
          ))}
          <mesh position={[0, 1.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.26, 0.02, 8, 32]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0.95, 0.15]}>
            <torusGeometry args={[0.07, 0.014, 8, 24]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1} toneMapped={false} />
          </mesh>
        </group>
      );
    case "signal-storm": {
      const bolt = new THREE.Shape();
      bolt.moveTo(0, 0.3);
      bolt.lineTo(-0.08, 0.05);
      bolt.lineTo(0.02, 0.05);
      bolt.lineTo(-0.06, -0.3);
      bolt.lineTo(0.1, -0.02);
      bolt.lineTo(0, -0.02);
      bolt.lineTo(0, 0.3);
      return (
        <group>
          <mesh position={[-0.04, 0.95, 0.16]}>
            <extrudeGeometry args={[bolt, { depth: 0.03, bevelEnabled: false }]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.9} toneMapped={false} />
          </mesh>
          {[-0.34, 0.34].map((x) => (
            <mesh key={x} position={[x, 0.58, 0.05]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.08, 0.018, 8, 20]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.7} toneMapped={false} />
            </mesh>
          ))}
        </group>
      );
    }
    case "backup-stitch":
      return (
        <group position={[0.05, 0.95, 0.15]}>
          <mesh geometry={patchGeom}>
            <meshStandardMaterial color="#3a5450" roughness={0.8} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[patchGeom]} />
            <lineBasicMaterial color={accent} />
          </lineSegments>
        </group>
      );
  }
}

function SuitFigure({ suitId }: { suitId: TrackerSuitId }) {
  const theme = SUIT_THEME[suitId];
  return (
    <group>
      {[-0.11, 0.11].map((x) => (
        <RoundedBox key={x} args={[0.16, 0.55, 0.16]} radius={0.04} position={[x, 0.275, 0]}>
          <meshStandardMaterial color={theme.baseDark} roughness={0.6} metalness={0.2} />
        </RoundedBox>
      ))}
      <RoundedBox args={[0.5, 0.62, 0.28]} radius={0.07} position={[0, 0.86, 0]}>
        <meshStandardMaterial color={theme.base} roughness={0.55} metalness={0.25} />
      </RoundedBox>
      {[-0.34, 0.34].map((x) => (
        <RoundedBox
          key={x}
          args={[0.14, 0.56, 0.14]}
          radius={0.04}
          position={[x, 0.58, 0]}
          rotation={[0, 0, x < 0 ? 0.1 : -0.1]}
        >
          <meshStandardMaterial color={theme.base} roughness={0.55} metalness={0.25} />
        </RoundedBox>
      ))}
      <RoundedBox args={[0.32, 0.32, 0.32]} radius={0.09} position={[0, 1.36, 0]}>
        <meshStandardMaterial color={theme.baseDark} roughness={0.5} metalness={0.15} />
      </RoundedBox>
      <SuitExtras suitId={suitId} accent={theme.accent} />
    </group>
  );
}

export default function SuitModel3D({ suitId }: { suitId: TrackerSuitId }) {
  const theme = SUIT_THEME[suitId];
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAutoRotate(!mq.matches);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [1.8, 1.4, 2.2], fov: 32 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#050b0c"]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} color="#eafffb" />
        <pointLight position={[-2, 1.2, -1]} intensity={0.6} color={theme.accent} />

        <group position={[0, -0.75, 0]}>
          <SuitFigure suitId={suitId} />
        </group>

        {[0.55, 0.78].map((r, i) => (
          <mesh key={r} position={[0, -0.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[r, r + 0.012, 64]} />
            <meshBasicMaterial color={theme.accent} transparent opacity={i === 0 ? 0.5 : 0.25} toneMapped={false} />
          </mesh>
        ))}

        <ContactShadows position={[0, -0.75, 0]} opacity={0.5} scale={3} blur={2.2} far={2} />

        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={1.6}
          maxDistance={3.4}
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
