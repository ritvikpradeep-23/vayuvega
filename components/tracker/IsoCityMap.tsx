import type { ReactNode } from "react";
import { heroTrackerWaypoints, HERO_TRACKER_CONFIG, projectIso } from "@/lib/heroTrackerData";

const { gridCols, gridRows, tileWidth: TW, tileHeight: TH } = HERO_TRACKER_CONFIG;
const HW = TW / 2;
const HH = TH / 2;

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
  { col: 5, row: 3 },
  { col: 2, row: 1 },
];

const AVENUE_ROW = 0;
const AVENUE_COL = 8;

function isNearWaypoint(col: number, row: number) {
  return heroTrackerWaypoints.some((w) => Math.abs(w.col - col) <= 1 && Math.abs(w.row - row) <= 1);
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
      if (row === AVENUE_ROW || col === AVENUE_COL) continue;
      if (isNearWaypoint(col, row) && !isLandmark) continue;
      const skipRoll = rand();
      if (!isLandmark && skipRoll < 0.22) continue;
      const h = isLandmark ? 58 + rand() * 14 : 22 + rand() * 30;
      buildings.push({ col, row, h, landmark: isLandmark });
    }
  }

  const extents = buildings.map((b) => projectIso(b.col, b.row));
  const waypointPts = heroTrackerWaypoints.map((w) => projectIso(w.col, w.row));
  const allPts = [...extents, ...waypointPts];
  const minX = Math.min(...allPts.map((p) => p.x)) - 60;
  const maxX = Math.max(...allPts.map((p) => p.x)) + 60;
  const minY = Math.min(...allPts.map((p) => p.y)) - 100;
  const maxY = Math.max(...allPts.map((p) => p.y)) + 40;

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
        points={`${minX},${minY} ${minX + 130},${minY} ${minX + 40},${maxY} ${minX},${maxY}`}
        fill="url(#isoWater)"
      />

      {[
        [minX + 220, minY + 60],
        [maxX - 180, minY + 40],
        [minX + 340, maxY - 60],
      ].map(([cx, cy], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={110} ry={55} fill="url(#isoCloud)" />
      ))}

      {/* street guides along the cleared avenue row/col */}
      <line
        x1={projectIso(0, AVENUE_ROW).x}
        y1={projectIso(0, AVENUE_ROW).y}
        x2={projectIso(gridCols - 1, AVENUE_ROW).x}
        y2={projectIso(gridCols - 1, AVENUE_ROW).y}
        stroke="#123a3c"
        strokeWidth={3}
      />
      <line
        x1={projectIso(AVENUE_COL, 0).x}
        y1={projectIso(AVENUE_COL, 0).y}
        x2={projectIso(AVENUE_COL, gridRows - 1).x}
        y2={projectIso(AVENUE_COL, gridRows - 1).y}
        stroke="#123a3c"
        strokeWidth={3}
      />

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
