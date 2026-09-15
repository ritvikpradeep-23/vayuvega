import type { ReactNode } from "react";
import {
  heroTrackerWaypoints,
  heroRoadEdges,
  HERO_TRACKER_CONFIG,
  projectIso,
  projectOffshore,
  projectPoint,
  seededRandom,
  type Point,
} from "@/lib/heroTrackerData";
import { sightingsData } from "@/lib/sightingsData";
import { villainsData } from "@/lib/villainsData";

const { gridCols, gridRows, tileWidth: TW, tileHeight: TH } = HERO_TRACKER_CONFIG;
const HW = TW / 2;
const HH = TH / 2;
const CLEAR_RADIUS = TW * 0.72;
const ROAD_BUFFER = TW * 0.42;

const LANDMARK_CELLS = [
  { col: Math.round(gridCols * 0.72), row: Math.round(gridRows * 0.18) },
  { col: Math.round(gridCols * 0.22), row: Math.round(gridRows * 0.78) },
];

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function distanceToSegment(p: Point, a: Point, b: Point) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return distance(p, a);
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  return distance(p, { x: a.x + t * dx, y: a.y + t * dy });
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

interface Cell {
  col: number;
  row: number;
  kind: "building" | "tree" | "rock";
  h?: number;
  landmark?: boolean;
}

// Everything below is deterministic and independent of props/state, so it's
// computed once at module load — not on every animation frame while the hero moves.
const waypointPixelPts: Point[] = heroTrackerWaypoints.map((w) => projectPoint(w.lat, w.lng));

const cells: Cell[] = (() => {
  const rand = seededRandom(42);
  const out: Cell[] = [];

  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const isLandmark = LANDMARK_CELLS.some((l) => l.col === col && l.row === row);
      const pt = projectIso(col, row);
      const nearWaypoint = waypointPixelPts.some((w) => distance(w, pt) < CLEAR_RADIUS);
      const nearRoad = heroRoadEdges.some(
        (e) =>
          distanceToSegment(pt, e.path[0], e.path[1]) < ROAD_BUFFER ||
          distanceToSegment(pt, e.path[1], e.path[2]) < ROAD_BUFFER
      );
      if ((nearWaypoint || nearRoad) && !isLandmark) continue;

      const roll = rand();
      if (isLandmark) {
        out.push({ col, row, kind: "building", h: 60 + rand() * 16, landmark: true });
      } else if (roll < 0.42) {
        out.push({ col, row, kind: "building", h: 20 + rand() * 30 });
      } else if (roll < 0.68) {
        out.push({ col, row, kind: "tree" });
      } else if (roll < 0.74) {
        out.push({ col, row, kind: "rock" });
      }
      // else: left clear as open ground
    }
  }
  return out;
})();

export function IsoCityMap({ className = "", children }: { className?: string; children?: ReactNode }) {
  const sightingPts = sightingsData.map((s) => projectPoint(s.lat, s.lng));
  const villainPts = villainsData.map((v) => projectPoint(v.defeatedLocation.lat, v.defeatedLocation.lng));
  const edgePts = heroRoadEdges.flatMap((e) => e.path);
  const offshorePt = projectOffshore();
  const cellPts = cells.map((c) => projectIso(c.col, c.row));

  const allPts = [...cellPts, ...edgePts, ...sightingPts, ...villainPts, offshorePt];
  const minX = Math.min(...allPts.map((p) => p.x)) - 80;
  const maxX = Math.max(...allPts.map((p) => p.x)) + 80;
  const minY = Math.min(...allPts.map((p) => p.y)) - 130;
  const maxY = Math.max(...allPts.map((p) => p.y)) + 60;

  const kozhikode = sightingsData.find((s) => s.id === "s3")!;
  const seaLaneFrom = projectPoint(kozhikode.lat, kozhikode.lng);

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
        points={`${minX},${minY} ${minX + 180},${minY} ${minX + 55},${maxY} ${minX},${maxY}`}
        fill="url(#isoWater)"
      />

      {/* a couple of small boats on the coastal water, purely decorative */}
      {[
        [minX + 60, minY + (maxY - minY) * 0.22],
        [minX + 100, minY + (maxY - minY) * 0.46],
      ].map(([bx, by], i) => (
        <g key={`boat-${i}`} transform={`translate(${bx}, ${by})`}>
          <polygon points="-9,3 9,3 5,8 -5,8" fill="#1c4644" stroke="#4dfff0" strokeWidth={0.6} opacity={0.8} />
          <line x1={0} y1={3} x2={0} y2={-7} stroke="#4dfff0" strokeWidth={0.8} opacity={0.7} />
        </g>
      ))}

      {[
        [minX + 300, minY + 80],
        [maxX - 260, minY + 60],
        [minX + 460, maxY - 100],
        [maxX - 420, maxY - 140],
      ].map(([cx, cy], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={150} ry={75} fill="url(#isoCloud)" />
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

      {/* real roads: the hero's patrol route, gently bent, drawn from real waypoints */}
      {heroRoadEdges.map((e, i) => (
        <polyline
          key={`road-${i}`}
          points={e.path.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="#1c4644"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {heroRoadEdges.map((e, i) => (
        <polyline
          key={`road-c-${i}`}
          points={e.path.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="#123a3c"
          strokeWidth={1}
          strokeDasharray="6 6"
          strokeLinejoin="round"
        />
      ))}

      {cells
        .slice()
        .sort((a, b) => a.col + a.row - (b.col + b.row))
        .map((c) => {
          const { x, y } = projectIso(c.col, c.row);
          if (c.kind === "building") {
            const polys = buildingPolys(x, y, c.h ?? 24);
            const stroke = c.landmark ? "#ffb000" : "#2a5a58";
            const roofFill = c.landmark ? "#3a2a10" : "#0f2f30";
            const leftFill = c.landmark ? "#241a0a" : "#08191a";
            const rightFill = c.landmark ? "#4a3414" : "#123a3c";
            return (
              <g key={`${c.col}-${c.row}`}>
                <polygon points={polys.left} fill={leftFill} stroke={stroke} strokeWidth={1} />
                <polygon points={polys.right} fill={rightFill} stroke={stroke} strokeWidth={1} />
                <polygon points={polys.roof} fill={roofFill} stroke={stroke} strokeWidth={1.2} />
              </g>
            );
          }
          if (c.kind === "tree") {
            return (
              <g key={`${c.col}-${c.row}`} transform={`translate(${x}, ${y})`}>
                <ellipse cx={0} cy={2} rx={6} ry={2.4} fill="#000" opacity={0.3} />
                <rect x={-1.4} y={-4} width={2.8} height={7} fill="#2a1c10" />
                <polygon points="0,-24 9,-6 -9,-6" fill="#0f3d2e" stroke="#1f6b4d" strokeWidth={0.8} />
                <polygon points="0,-17 7,-3 -7,-3" fill="#125237" stroke="#2a8f63" strokeWidth={0.6} />
              </g>
            );
          }
          return (
            <polygon
              key={`${c.col}-${c.row}`}
              points={`${x - 8},${y + 2} ${x - 2},${y - 6} ${x + 6},${y - 4} ${x + 8},${y + 3} ${x - 1},${y + 5}`}
              fill="#1c2b2a"
              stroke="#3a5a56"
              strokeWidth={0.8}
            />
          );
        })}

      {children}
    </svg>
  );
}
