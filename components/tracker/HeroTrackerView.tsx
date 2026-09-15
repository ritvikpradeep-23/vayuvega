"use client";

import { useEffect, useRef, useState } from "react";
import { heroTrackerWaypoints, HERO_TRACKER_CONFIG, projectIso } from "@/lib/heroTrackerData";
import { IsoCityMap } from "./IsoCityMap";
import styles from "./tracker.module.css";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type Phase = "moving" | "dwelling";

export default function HeroTrackerView() {
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1 % heroTrackerWaypoints.length);
  const [phase, setPhase] = useState<Phase>("moving");
  const [pos, setPos] = useState(() => {
    const p = heroTrackerWaypoints[0];
    return projectIso(p.col, p.row);
  });
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const reducedMotionRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    let cancelled = false;
    const from = heroTrackerWaypoints[fromIdx];
    const to = heroTrackerWaypoints[toIdx];
    const fromPt = projectIso(from.col, from.row);
    const toPt = projectIso(to.col, to.row);

    if (phase === "dwelling") {
      setPos(toPt);
      setTrail([]);
      const timer = setTimeout(() => {
        if (cancelled) return;
        setFromIdx(toIdx);
        setToIdx((toIdx + 1) % heroTrackerWaypoints.length);
        setPhase("moving");
      }, HERO_TRACKER_CONFIG.dwellMs);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }

    if (reducedMotionRef.current) {
      setPos(toPt);
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
      const x = fromPt.x + (toPt.x - fromPt.x) * eased;
      const y = fromPt.y + (toPt.y - fromPt.y) * eased;
      setPos({ x, y });
      setTrail((prev) => [...prev, { x, y }].slice(-10));
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
  }, [fromIdx, toIdx, phase]);

  const destination = heroTrackerWaypoints[toIdx];

  return (
    <div className={styles.isoWrap}>
      <IsoCityMap className={styles.isoSvg}>
        {trail.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="#4dfff0" opacity={((i + 1) / trail.length) * 0.5} />
        ))}
        <g transform={`translate(${pos.x}, ${pos.y})`}>
          <ellipse cx={0} cy={11} rx={17} ry={6} fill="#000" opacity={0.35} />
          <circle cx={0} cy={0} r={13} fill="#0c2223" stroke="#4dfff0" strokeWidth={2} />
          <path d="M -5 2 a5 5 0 1 1 3.5 -8.5" stroke="#4dfff0" strokeWidth={1.8} fill="none" />
        </g>
      </IsoCityMap>

      <div className={styles.isoHud}>
        <span className={styles.isoHudChip}>WIND · SW 6KM/H</span>
        <span className={styles.isoHudChip}>SIGNAL CLEAR</span>
      </div>

      <div className={styles.isoRail}>
        <span className={`${styles.isoRailDot} ${phase === "moving" ? styles.isoRailDotActive : ""}`} />
        <span className={styles.isoRailDot} />
        <span className={styles.isoRailDot} />
      </div>

      <p className={styles.isoStatusLine}>
        {phase === "moving" ? `En route to ${destination.label}` : `Holding at ${destination.label}`}
      </p>
    </div>
  );
}
