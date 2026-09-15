"use client";

import { useEffect, useRef, useState } from "react";
import { heroRoadEdges, HERO_TRACKER_CONFIG, pointOnPath, projectPoint } from "@/lib/heroTrackerData";
import { sightingsData, type SightingStatus } from "@/lib/sightingsData";
import { villainsData } from "@/lib/villainsData";
import { IsoCityMap } from "./IsoCityMap";
import styles from "./tracker.module.css";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const STATUS_COLOR: Record<SightingStatus, string> = {
  Resolved: "#22c55e",
  Reported: "#eab308",
  "On It": "#f97316",
};

type Phase = "moving" | "dwelling";

export default function HeroTrackerView() {
  const [edgeIdx, setEdgeIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("moving");
  const [pos, setPos] = useState(() => heroRoadEdges[0].path[0]);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const reducedMotionRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    let cancelled = false;
    const edge = heroRoadEdges[edgeIdx];
    const endPt = edge.path[edge.path.length - 1];

    if (phase === "dwelling") {
      setPos(endPt);
      setTrail([]);
      const timer = setTimeout(() => {
        if (cancelled) return;
        setEdgeIdx((edgeIdx + 1) % heroRoadEdges.length);
        setPhase("moving");
      }, HERO_TRACKER_CONFIG.dwellMs);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }

    if (reducedMotionRef.current) {
      setPos(endPt);
      setTrail([]);
      const timer = setTimeout(() => {
        if (!cancelled) setPhase("dwelling");
      }, 150);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }

    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / HERO_TRACKER_CONFIG.moveDurationMs);
      const eased = easeInOutCubic(t);
      const p = pointOnPath(edge.path, eased);
      setPos(p);
      setTrail((prev) => [...prev, p].slice(-12));
      if (t < 1 && !cancelled) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (!cancelled) {
        setPhase("dwelling");
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [edgeIdx, phase]);

  const edge = heroRoadEdges[edgeIdx];

  return (
    <div className={styles.isoWrap}>
      <IsoCityMap className={styles.isoSvg}>
        {sightingsData.map((s) => {
          const p = projectPoint(s.lat, s.lng);
          const color = STATUS_COLOR[s.status];
          return (
            <g key={s.id}>
              <circle cx={p.x} cy={p.y} r={7} fill="none" stroke={color} strokeWidth={1.4} opacity={0.55} />
              <circle cx={p.x} cy={p.y} r={3.4} fill={color} />
            </g>
          );
        })}

        {villainsData.map((v) => {
          const p = projectPoint(v.defeatedLocation.lat, v.defeatedLocation.lng);
          const atLarge = v.status === "At Large";
          return (
            <g key={v.id}>
              {atLarge && <circle cx={p.x} cy={p.y} r={9} fill="none" stroke="#ef4444" strokeWidth={1.4} opacity={0.5} />}
              <circle
                cx={p.x}
                cy={p.y}
                r={4}
                fill={atLarge ? "#ef4444" : "#6f9a95"}
                stroke={atLarge ? "#ef4444" : "#2a5a58"}
                strokeWidth={1}
              />
            </g>
          );
        })}

        {trail.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="#4dfff0" opacity={((i + 1) / trail.length) * 0.5} />
        ))}
        <g transform={`translate(${pos.x}, ${pos.y})`}>
          <ellipse cx={0} cy={11} rx={17} ry={6} fill="#000" opacity={0.35} />
          <circle cx={0} cy={0} r={13} fill="#0c2223" stroke="#4dfff0" strokeWidth={2} />
          <path d="M -5 2 a5 5 0 1 1 3.5 -8.5" stroke="#4dfff0" strokeWidth={1.8} fill="none" />
        </g>
      </IsoCityMap>

      <div className={styles.isoTopBar}>
        <div className={styles.isoLegend}>
          <span><i style={{ background: "#22c55e" }} /> Resolved</span>
          <span><i style={{ background: "#eab308" }} /> Reported</span>
          <span><i style={{ background: "#f97316" }} /> On It</span>
          <span><i style={{ background: "#ef4444" }} /> Villain</span>
        </div>

        <div className={styles.isoHud}>
          <span className={styles.isoHudChip}>WIND · SW 6KM/H</span>
          <span className={styles.isoHudChip}>SIGNAL CLEAR</span>
        </div>
      </div>

      <div className={styles.isoRail}>
        <span className={`${styles.isoRailDot} ${phase === "moving" ? styles.isoRailDotActive : ""}`} />
        <span className={styles.isoRailDot} />
        <span className={styles.isoRailDot} />
      </div>

      <p className={styles.isoStatusLine}>
        {phase === "moving" ? `En route to ${edge.toLabel}` : `Holding at ${edge.toLabel}`}
      </p>
    </div>
  );
}
