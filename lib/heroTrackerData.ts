import { sightingsData } from "./sightingsData";
import keralaBoundaryGeo from "@/public/data/kerala-boundary.json";

export interface HeroWaypoint {
  id: string;
  label: string;
  lat: number;
  lng: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface RoadEdge {
  fromLabel: string;
  toLabel: string;
  path: Point[];
}

// Real Kerala coordinates, so the hero's tour and every marker line up with the
// same geography as the Normal (Leaflet) map — not an invented grid.
const MAINLAND_BOUNDS = { latMin: 8.55, latMax: 11.85, lngMin: 75.5, lngMax: 77.1 };
const REF_LAT = 10.2;
const KM_PER_DEG_LAT = 111.32;
const KM_PER_DEG_LNG = KM_PER_DEG_LAT * Math.cos((REF_LAT * Math.PI) / 180);

// One isometric grid cell = this many real kilometers, on BOTH axes — this is
// what keeps the illustration proportioned like actual Kerala instead of a
// squashed/stretched invented grid.
const KM_PER_CELL = 14;

const lngRangeKm = (MAINLAND_BOUNDS.lngMax - MAINLAND_BOUNDS.lngMin) * KM_PER_DEG_LNG;
const latRangeKm = (MAINLAND_BOUNDS.latMax - MAINLAND_BOUNDS.latMin) * KM_PER_DEG_LAT;

export const HERO_TRACKER_CONFIG = {
  moveDurationMs: 4200,
  dwellMs: 3200,
  gridCols: Math.ceil(lngRangeKm / KM_PER_CELL) + 2,
  gridRows: Math.ceil(latRangeKm / KM_PER_CELL) + 2,
  tileWidth: 52,
  tileHeight: 27,
  originX: 640,
  originY: 90,
};

/** Deterministic pseudo-random generator so the illustration is stable across reloads. */
export function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// A true 1:1 isometric skew (col and row weighted equally on both axes) pulls
// east-west movement into the vertical axis just as much as north-south does —
// which visually dragged inland/eastern places (like Idukki) far "south" of
// coastal places at the same real latitude (like Kochi), scrambling the read.
// Kerala's real shape is dominantly north-south, so row (south-distance) stays
// full-weight on Y while col (east-distance) is damped — north-south stays the
// map's dominant vertical axis, the way an actual map of Kerala reads, with
// just enough of col's pull left over for a subtle isometric tilt.
const NORTH_SOUTH_DOMINANCE = 0.38;

/** Projects a (col, row) — grid cell OR any continuous equivalent — to iso pixel space. */
export function projectIso(col: number, row: number): Point {
  const { tileWidth, tileHeight, originX, originY } = HERO_TRACKER_CONFIG;
  return {
    x: originX + (col - row) * (tileWidth / 2),
    y: originY + (col * NORTH_SOUTH_DOMINANCE + row) * (tileHeight / 2),
  };
}

/** Projects a real mainland Kerala lat/lng onto the isometric grid, to real-world scale. */
export function projectGeo(lat: number, lng: number): Point {
  const uKm = (lng - MAINLAND_BOUNDS.lngMin) * KM_PER_DEG_LNG;
  const vKm = (MAINLAND_BOUNDS.latMax - lat) * KM_PER_DEG_LAT;
  return projectIso(uKm / KM_PER_CELL + 1, vKm / KM_PER_CELL + 1);
}

/** Lakshadweep sits far offshore, well outside the mainland lng range — fixed spot off the west edge. */
export function projectOffshore(): Point {
  return projectIso(-4, HERO_TRACKER_CONFIG.gridRows * 0.55);
}

const OFFSHORE_LNG_THRESHOLD = 74;

/** Projects any tracked point (sighting/villain), routing offshore points to the fixed island spot. */
export function projectPoint(lat: number, lng: number): Point {
  return lng < OFFSHORE_LNG_THRESHOLD ? projectOffshore() : projectGeo(lat, lng);
}

// The real Kerala state outline (same source data as the Normal Leaflet map's
// mask), projected into iso-pixel space — used both to draw the state's actual
// silhouette and to keep buildings/trees inside it instead of a filler rectangle.
const boundaryRing = (
  keralaBoundaryGeo as unknown as { geometry: { coordinates: [number, number][][][] } }
).geometry.coordinates[0][0];

export const keralaOutlinePoints: Point[] = boundaryRing.map(([lng, lat]) => projectGeo(lat, lng));

/** Standard ray-casting point-in-polygon test. */
export function pointInPolygon(pt: Point, poly: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x;
    const yi = poly[i].y;
    const xj = poly[j].x;
    const yj = poly[j].y;
    const intersect = yi > pt.y !== yj > pt.y && pt.x < ((xj - xi) * (pt.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// The hero's patrol route: a north-to-south sweep of the mainland sighting
// locations, then back — these are also the road-graph nodes (see roadEdges
// below), so the marker only ever travels along a drawn road.
const TOUR_ORDER = ["s2", "s3", "s4", "s1", "s5", "s6"];

export const heroTrackerWaypoints: HeroWaypoint[] = TOUR_ORDER.map((id) => {
  const s = sightingsData.find((x) => x.id === id)!;
  return { id: s.id, label: s.location, lat: s.lat, lng: s.lng };
});

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Real roads rarely run dead straight — nudge each edge's midpoint sideways a little
 *  (proportionally, deterministically) so routes read as roads, not ruler lines. */
function bentPath(a: Point, b: Point, seed: number): Point[] {
  const len = distance(a, b);
  const dx = (b.x - a.x) / (len || 1);
  const dy = (b.y - a.y) / (len || 1);
  const nx = -dy;
  const ny = dx;
  const offset = (seededRandom(seed)() - 0.5) * len * 0.16;
  const mid = { x: (a.x + b.x) / 2 + nx * offset, y: (a.y + b.y) / 2 + ny * offset };
  return [a, mid, b];
}

export const heroRoadEdges: RoadEdge[] = heroTrackerWaypoints.map((w, i) => {
  const next = heroTrackerWaypoints[(i + 1) % heroTrackerWaypoints.length];
  const a = projectGeo(w.lat, w.lng);
  const b = projectGeo(next.lat, next.lng);
  return { fromLabel: w.label, toLabel: next.label, path: bentPath(a, b, i * 97 + 13) };
});

/** A point at fractional distance t (0-1) along a multi-segment path, at roughly constant speed. */
export function pointOnPath(path: Point[], t: number): Point {
  const segLens = path.slice(1).map((p, i) => distance(path[i], p));
  const total = segLens.reduce((a, b) => a + b, 0);
  let target = Math.max(0, Math.min(1, t)) * total;
  for (let i = 0; i < segLens.length; i++) {
    const segLen = segLens[i];
    if (target <= segLen || i === segLens.length - 1) {
      const segT = segLen > 0 ? Math.min(1, target / segLen) : 1;
      const a = path[i];
      const b = path[i + 1];
      return { x: a.x + (b.x - a.x) * segT, y: a.y + (b.y - a.y) * segT };
    }
    target -= segLen;
  }
  return path[path.length - 1];
}
