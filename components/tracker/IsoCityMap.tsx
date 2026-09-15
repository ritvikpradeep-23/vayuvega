import type { ReactNode } from "react";
import {
  heroTrackerWaypoints,
  HERO_TRACKER_CONFIG,
  projectIso,
  projectGeo,
  projectOffshore,
  projectPoint,
} from "@/lib/heroTrackerData";
import { sightingsData } from "@/lib/sightingsData";
import { villainsData } from "@/lib/villainsData";

const { gridCols, gridRows, tileWidth: TW, tileHeight: TH } = HERO_TRACKER_CONFIG;
const HW = TW / 2;
const HH = TH / 2;
const CLEAR_RADIUS = TW * 0.68;

// Deterministic pseudo-random so the illustration is stable across reloads.
function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const LANDMARK_CELLS = [
  { col: 8, row: 1 },
  { col: 2, row: 6 },
];

const waypointPts = heroTrackerWaypoints.map((w) => projectGeo(w.lat, w.lng));
const offshorePt = projectOffshore();
const roadEdges: [{ x: number; y: number }, { x: number; y: number }][] = heroTrackerWaypoints.map((w, i) => {
  const next = heroTrackerWaypoints[(i + 1) % heroTrackerWaypoints.length];
  return [projectGeo(w.lat, w.lng), projectGeo(next.lat, next.lng)];
});
// The dashed sea lane out to Lakshadweep — not a road, so the hero never travels it.
const seaLaneFrom = projectGeo(
  heroTrackerWaypoints.find((w) => w.id === "s3")!.lat,
  heroTrackerWaypoints.find((w) => w.id === "s3")!.lng
);

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function buildingPolys(bx: number, by: number, h: number) {
  const roof = [
    [bx, by - h - HH],
    [bx + HW, by - h],
    [bx, by - h + HH],
    [bx - HW, by - h],
  ];
  const left = [
    [bx - HW, by - h],
    [bx, by - h + HH],
    [bx, by + HH],
    [bx - HW, by],
  ];
  const right = [
    [bx, by - h + HH],
    [bx + HW, by - h],
    [bx + HW, by],
    [bx, by + HH],
  ];
  const toPts = (pts: number[][]) => pts.map((p) => p.join(",")).join(" ");
  return { roof: toPts(roof), left: toPts(left), right: toPts(right) };
}

export function IsoCityMap({ className = "", children }: { className?: string; children?: ReactNode }) {
  const rand = seededRandom(42);
  const buildings: { col: number; row: number; h: number; landmark: boolean }[] = [];

  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const isLandmark = LANDMARK_CELLS.some((l) => l.col === col && l.row === row);
      const pt = projectIso(col, row);
      const nearWaypoint = waypointPts.some((w) => distance(w, pt) < CLEAR_RADIUS);
      if (nearWaypoint && !isLandmark) continue;
      const skipRoll = rand();
      if (!isLandmark && skipRoll < 0.2) continue;
      const h = isLandmark ? 60 + rand() * 16 : 22 + rand() * 32;
      buildings.push({ col, row, h, landmark: isLandmark });
    }
  }

  const sightingPts = sightingsData.map((s) => projectPoint(s.lat, s.lng));
  const villainPts = villainsData.map((v) => projectPoint(v.defeatedLocation.lat, v.defeatedLocation.lng));
  const buildingPts = buildings.map((b) => projectIso(b.col, b.row));
  const allPts = [...buildingPts, ...waypointPts, ...sightingPts, ...villainPts, offshorePt];
  const minX = Math.min(...allPts.map((p) => p.x)) - 70;
  const maxX = Math.max(...allPts.map((p) => p.x)) + 70;
  const minY = Math.min(...allPts.map((p) => p.y)) - 110;
  const maxY = Math.max(...allPts.map((p) => p.y)) + 50;

  return (
    <svg
      viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="isoCloud" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0d2b2c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0d2b2c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="isoWater" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#03181c" />
          <stop offset="100%" stopColor="#062a2e" />
        </linearGradient>
      </defs>

      <rect x={minX} y={minY} width={maxX - minX} height={maxY - minY} fill="#071214" />

      <polygon
        points={`${minX},${minY} ${minX + 160},${minY} ${minX + 50},${maxY} ${minX},${maxY}`}
        fill="url(#isoWater)"
      />

      {[
        [minX + 260, minY + 70],
        [maxX - 220, minY + 50],
        [minX + 400, maxY - 80],
      ].map(([cx, cy], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={130} ry={65} fill="url(#isoCloud)" />
      ))}

      {/* dashed sea lane out to the offshore marker — flavor only, not a road the hero uses */}
      <line
        x1={seaLaneFrom.x}
        y1={seaLaneFrom.y}
        x2={offshorePt.x}
        y2={offshorePt.y}
        stroke="#2a5a58"
        strokeWidth={2}
        strokeDasharray="3 6"
      />

      {/* real roads: the hero's patrol route, drawn from the same waypoints it travels between */}
      {roadEdges.map(([a, b], i) => (
        <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#1c4644" strokeWidth={5} strokeLinecap="round" />
      ))}
      {roadEdges.map(([a, b], i) => (
        <line
          key={`c-${i}`}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke="#123a3c"
          strokeWidth={1}
          strokeDasharray="6 6"
        />
      ))}

      {buildings
        .sort((a, b) => a.col + a.row - (b.col + b.row))
        .map((b) => {
          const { x, y } = projectIso(b.col, b.row);
          const polys = buildingPolys(x, y, b.h);
          const stroke = b.landmark ? "#ffb000" : "#2a5a58";
          const roofFill = b.landmark ? "#3a2a10" : "#0f2f30";
          const leftFill = b.landmark ? "#241a0a" : "#08191a";
          const rightFill = b.landmark ? "#4a3414" : "#123a3c";
          return (
            <g key={`${b.col}-${b.row}`}>
              <polygon points={polys.left} fill={leftFill} stroke={stroke} strokeWidth={1} />
              <polygon points={polys.right} fill={rightFill} stroke={stroke} strokeWidth={1} />
              <polygon points={polys.roof} fill={roofFill} stroke={stroke} strokeWidth={1.2} />
            </g>
          );
        })}

      {children}
    </svg>
  );
}
