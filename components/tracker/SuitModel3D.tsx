"use client";

import { useEffect, useRef, useState } from "react";
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
  thattu: { base: "#3a3226", baseDark: "#211c14", accent: "#8b8aa8" },
  "kera-tech": { base: "#4a3420", baseDark: "#2e2012", accent: "#4dfff0" },
  "kayal-stealth": { base: "#17181a", baseDark: "#0c0d0e", accent: "#2fa0a0" },
  "kaithapoo-storm": { base: "#4a4d52", baseDark: "#2e3033", accent: "#ffe14d" },
  "theyyam-integrated": { base: "#6e1e24", baseDark: "#4a1418", accent: "#d4af37" },
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
            <mesh key={`x${i}`} position={[0, y, 0.15]} rotation={[0, 0, rot]}>
              <boxGeometry args={[0.42, 0.014, 0.01]} />
              <meshStandardMaterial color={accent} roughness={0.9} />
            </mesh>
          ))}
          {/* salvaged bicycle-chain joints */}
          {[
            [-0.34, 0.42],
            [0.34, 0.42],
            [-0.11, 0.05],
            [0.11, 0.05],
          ].map(([x, y], i) => (
            <mesh key={`j${i}`} position={[x, y, 0.08]}>
              <torusGeometry args={[0.045, 0.012, 8, 16]} />
              <meshStandardMaterial color={accent} metalness={0.6} roughness={0.4} />
            </mesh>
          ))}
        </group>
      );
    case "kera-tech":
      return (
        <group>
          {[0.65, 0.82, 1.0, 1.17].map((y) => (
            <mesh key={y} position={[0, y, 0.145]}>
              <boxGeometry args={[0.03, 0.06, 0.01]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.9} toneMapped={false} />
            </mesh>
          ))}
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              position={[side * 0.42, 0.66, -0.04]}
              rotation={[0, 0, side * -0.55]}
            >
              <coneGeometry args={[0.02, 0.38, 3]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} toneMapped={false} />
            </mesh>
          ))}
        </group>
      );
    case "kayal-stealth":
      return (
        <group>
          <mesh position={[0.34, 0.36, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.06, 0.013, 8, 24]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} toneMapped={false} />
          </mesh>
          <PulseGlow color={accent} position={[0.34, 0.36, 0.03]} />
          {[-0.11, 0.11].map((x) => (
            <mesh key={x} position={[x, 0.02, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.05, 0.06, 12]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} toneMapped={false} />
            </mesh>
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
          <mesh position={[0, 0.86, -0.16]} rotation={[0, Math.PI, 0]}>
            <torusGeometry args={[0.3, 0.03, 8, 24, Math.PI * 0.6]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} toneMapped={false} />
          </mesh>
          <mesh position={[0.02, 0.9, -0.16]}>
            <extrudeGeometry args={[bolt, { depth: 0.02, bevelEnabled: false }]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.9} toneMapped={false} />
          </mesh>
          {[-0.34, 0.34].map((x) => (
            <mesh key={x} position={[x, 0.58, 0.05]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.08, 0.018, 8, 20]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} toneMapped={false} />
            </mesh>
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
              <mesh
                key={i}
                position={[Math.sin(angle) * 0.22, 1.56 + Math.cos(angle) * 0.1, -0.04]}
                rotation={[0, 0, -angle]}
              >
                <coneGeometry args={[0.02, 0.22, 4]} />
                <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} toneMapped={false} />
              </mesh>
            );
          })}
          {/* HUD lenses */}
          {[-0.05, 0.05].map((x) => (
            <mesh key={x} position={[x, 1.37, 0.15]}>
              <sphereGeometry args={[0.02, 12, 12]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1} toneMapped={false} />
            </mesh>
          ))}
          {/* temple-brass joint rings */}
          {[
            [-0.34, 0.58],
            [0.34, 0.58],
            [-0.11, 0.55],
            [0.11, 0.55],
          ].map(([x, y], i) => (
            <mesh key={i} position={[x, y, 0]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.075, 0.014, 8, 20]} />
              <meshStandardMaterial color={accent} metalness={0.7} roughness={0.3} emissive={accent} emissiveIntensity={0.3} toneMapped={false} />
            </mesh>
          ))}
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
